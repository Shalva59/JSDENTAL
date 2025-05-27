import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { 
  getConversationById,
  updateConversation
} from "../../../lib/messages";
import { getUserByEmail } from "../../../lib/user";
import { ObjectId } from "mongodb";

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

    return NextResponse.json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error("Get conversation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
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
  
      // Only doctors can approve conversations
      if (!user.isDoctor) {
        return NextResponse.json(
          { error: "Only doctors can update conversation status" },
          { status: 403 }
        );
      }
  
      // Wait for params to be resolved
      const params = await context.params;
      const conversationId = params.id;
      
      // Fetch the conversation first
      const conversation = await getConversationById(conversationId);
      
      // Then check if it exists
      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
  
      // Check if doctor has access to this conversation
      if (conversation.doctorId !== parseInt(user.doctorId)) {
        return NextResponse.json(
          { error: "Access denied" },
          { status: 403 }
        );
      }
  
      const body = await request.json();
      const { approved } = body;
  
      await updateConversation(conversationId, { approved });
  
      return NextResponse.json({
        success: true,
        message: `Conversation ${approved ? 'approved' : 'updated'} successfully`
      });
  
    } catch (error) {
      console.error("Update conversation error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }