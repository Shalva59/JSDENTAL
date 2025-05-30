import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb"; // Add this import
import { 
  createConversation, 
  getConversationsByUser, 
  getConversationsByDoctor,
  getUnreadMessageCountForUser,
  getUnreadMessageCountForDoctor,
  createMessage
} from "../../lib/messages";
import { getUserByEmail, getDoctorByDoctorId, getUserById } from "../../lib/user";

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
    const { doctorId, initialMessage, userId, isPatientInitiated } = body;

    // For patient starting conversation OR when explicit flag is set
    if (!user.isDoctor || isPatientInitiated) {
      // Get doctor info to store doctor name
      let doctorName = "Doctor";
      try {
        const doctorUser = await getDoctorByDoctorId(doctorId);
        if (doctorUser) {
          doctorName = `${doctorUser.firstName} ${doctorUser.lastName}`;
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
      
      // Create a conversation with authenticated user ID
      const conversationData = {
        userId: user._id,
        doctorId: parseInt(doctorId),
        doctorName: doctorName,
        patientName: `${user.firstName} ${user.lastName}`,
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
      
      // Get patient info
      let patientName = "Patient";
      try {
        const patientUser = await getUserById(userId);
        if (patientUser) {
          patientName = `${patientUser.firstName} ${patientUser.lastName}`;
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
  
      // Create an auto-approved conversation
      const conversationData = {
        userId: new ObjectId(userId),
        doctorId: parseInt(user.doctorId),
        doctorName: `${user.firstName} ${user.lastName}`,
        patientName: patientName,
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