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
    
    const conversation = await getConversationById(conversationId);
    
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const hasAccess = 
      (user.isDoctor && conversation.doctorId === parseInt(user.doctorId)) ||
      (!user.isDoctor && conversation.userId.toString() === user._id.toString());
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // Check if the conversation is approved or if the user is a doctor
    if (!conversation.approved && !user.isDoctor) {
      const messages = await getMessagesByConversation(conversationId);
      const userMessages = messages.filter(msg => msg.senderType === "user");
      
      if (userMessages.length >= 1) {
        return NextResponse.json(
          { error: "Conversation must be approved by the doctor before sending more messages" },
          { status: 403 }
        );
      }
    }

    // Handle multipart form data for files
    const formData = await request.formData();
    
    const content = formData.get('content') || '';
    const files = formData.getAll('files');
    
    const attachments = [];
    
    // Process files (if any)
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.size) continue; // Skip if not a file
        
        // Check file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size exceeds 50MB limit" },
            { status: 400 }
          );
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString('base64');
        
        attachments.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          createdAt: new Date()
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

    return NextResponse.json({
      success: true,
      message
    });

  } catch (error) {
    console.error("Create message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}