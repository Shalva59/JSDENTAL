import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { 
  createConversation, 
  getConversationsByUser, 
  getConversationsByDoctor,
  getUnreadMessageCountForUser,
  getUnreadMessageCountForDoctor,
  createMessage
} from "../../lib/messages";
import { getUserByEmail, getDoctorByDoctorId } from "../../lib/user";

export async function GET(request) {
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

    const url = new URL(request.url);
    const countOnly = url.searchParams.get('countOnly') === 'true';
    
    if (countOnly) {
      let unreadCount;
      if (user.isDoctor) {
        unreadCount = await getUnreadMessageCountForDoctor(user.doctorId);
      } else {
        unreadCount = await getUnreadMessageCountForUser(user._id);
      }
      
      return NextResponse.json({
        success: true,
        unreadCount
      });
    }

    let conversations;
    
    if (user.isDoctor) {
      // If user is a doctor, get conversations for that doctor
      conversations = await getConversationsByDoctor(user.doctorId);
    } else {
      // If regular user, get their conversations
      conversations = await getConversationsByUser(user._id);
    }

    return NextResponse.json({
      success: true,
      conversations,
      isDoctor: user.isDoctor
    });

  } catch (error) {
    console.error("Get conversations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
  
      const body = await request.json();
      const { doctorId, initialMessage, userId, patientName, isPatientInitiated } = body;
  
      // For patient starting conversation OR when explicit flag is set
        // For patient starting conversation
        if (!user.isDoctor || isPatientInitiated) {
            // Create a conversation with authenticated user ID
            const conversationData = {
            userId: user._id,
            doctorId: parseInt(doctorId),
            approved: false,
            lastMessage: initialMessage,
            lastMessageTime: new Date(),
            lastMessageSender: "user"
            };
        
            const conversation = await createConversation(conversationData);
        
            // Create the initial message
            if (initialMessage) {
            const messageData = {
                conversationId: conversation._id,
                senderId: user._id,
                senderType: "user",
                content: initialMessage
            };
            
            // Use the imported createMessage function directly
            await createMessage(messageData);
            }
        
            return NextResponse.json({
            success: true,
            conversation,
            message: "Conversation created successfully"
            });
        } 
        // For doctor starting conversation
        else {
            if (!userId) {
            return NextResponse.json(
                { error: "Patient ID is required" },
                { status: 400 }
            );
            }
        
            // Create an auto-approved conversation
            const conversationData = {
            userId: new ObjectId(userId),
            doctorId: parseInt(user.doctorId),
            approved: true,
            lastMessage: initialMessage || "",
            lastMessageTime: new Date(),
            lastMessageSender: initialMessage ? "doctor" : ""
            };
        
            const conversation = await createConversation(conversationData);
        
            // Create the initial message if provided
            if (initialMessage) {
            const messageData = {
                conversationId: conversation._id,
                senderId: user._id,
                senderType: "doctor",
                content: initialMessage
            };
            
            // Use the imported createMessage function directly
            await createMessage(messageData);
            }
        
            return NextResponse.json({
            success: true,
            conversation,
            message: "Conversation created successfully"
            });
        }
  
    } catch (error) {
      console.error("Create conversation error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }