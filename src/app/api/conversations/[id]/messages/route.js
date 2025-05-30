import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { 
  getConversationById,
  getMessagesByConversation,
  createMessage,
  markMessagesAsRead
} from "../../../../lib/messages";
import { getUserByEmail } from "../../../../lib/user";

export async function GET(request, context) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
  
      const user = await getUserByEmail(session.user.email);
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
  
      // Wait for params to be resolved
      const params = await context.params;
      const conversationId = params.id;
      
      const conversation = await getConversationById(conversationId);
      
      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
  
      // Check if user has access to this conversation
      const hasAccess = 
        (user.isDoctor && conversation.doctorId === parseInt(user.doctorId)) ||
        (!user.isDoctor && conversation.userId.toString() === user._id.toString());
      
      if (!hasAccess) {
        return NextResponse.json(
          { error: "Access denied" },
          { status: 403 }
        );
      }
  
      // Mark messages as read
      const receiverType = user.isDoctor ? "doctor" : "user";
      await markMessagesAsRead(conversationId, receiverType);
  
      // Get messages
      const messages = await getMessagesByConversation(conversationId);
  
      return NextResponse.json({
        success: true,
        messages,
        conversation
      });
  
    } catch (error) {
      console.error("Get messages error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

// Update src/app/api/conversations/[id]/messages/route.js
export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const params = await context.params;
    const conversationId = params.id;
    
    // ... validation code ...

    const formData = await request.formData();
    const content = formData.get('content') || '';
    const files = formData.getAll('files');
    
    const attachments = [];
    
    // Process files
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.size) continue;
        
        if (file.size > 50 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size exceeds 50MB limit" },
            { status: 400 }
          );
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Don't convert to base64, pass buffer directly
        attachments.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: buffer // Pass buffer, not base64
        });
      }
    }

    const senderType = user.isDoctor ? "doctor" : "user";
    
    const messageData = {
      conversationId,
      senderId: user._id,
      senderType,
      content,
      attachments
    };

    const message = await createMessage(messageData);
    
    // Don't include file data in response
    const responseMessage = {
      ...message,
      attachments: message.attachments.map(att => ({
        ...att,
        data: undefined // Remove data from response
      }))
    };

    return NextResponse.json({
      success: true,
      message: responseMessage
    });

  } catch (error) {
    console.error("Create message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}