import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { saveFile } from './fileStorage';

const DB_NAME = "ValueMediaProject";
const CONVERSATIONS_COLLECTION = "conversations";
const MESSAGES_COLLECTION = "messages";

async function getDatabase() {
  try {
    const client = await clientPromise;
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
}

// Create a new conversation
export async function createConversation(conversationData) {
  try {
    const db = await getDatabase();
    
    // Check if a conversation already exists between the user and doctor
    const existingConversation = await db.collection(CONVERSATIONS_COLLECTION).findOne({
      userId: new ObjectId(conversationData.userId),
      doctorId: parseInt(conversationData.doctorId)
    });
    
    if (existingConversation) {
      return existingConversation;
    }
    
    const newConversation = {
      ...conversationData,
      approved: conversationData.approved || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(CONVERSATIONS_COLLECTION).insertOne(newConversation);
    return { ...newConversation, _id: result.insertedId };
  } catch (error) {
    console.error("createConversation error:", error);
    throw error;
  }
}

// Get conversations for a user
export async function getConversationsByUser(userId) {
  try {
    const db = await getDatabase();
    return db.collection(CONVERSATIONS_COLLECTION)
      .find({ userId: new ObjectId(userId) })
      .sort({ updatedAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getConversationsByUser error:", error);
    throw error;
  }
}

// Get conversations for a doctor
export async function getConversationsByDoctor(doctorId) {
  try {
    const db = await getDatabase();
    return db.collection(CONVERSATIONS_COLLECTION)
      .find({ doctorId: parseInt(doctorId) })
      .sort({ updatedAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getConversationsByDoctor error:", error);
    throw error;
  }
}

// Get a specific conversation
export async function getConversationById(conversationId) {
  try {
    const db = await getDatabase();
    return db.collection(CONVERSATIONS_COLLECTION).findOne({ 
      _id: new ObjectId(conversationId) 
    });
  } catch (error) {
    console.error("getConversationById error:", error);
    throw error;
  }
}

// Update conversation (for approval)
export async function updateConversation(conversationId, updateData) {
  try {
    const db = await getDatabase();
    
    const result = await db.collection(CONVERSATIONS_COLLECTION).updateOne(
      { _id: new ObjectId(conversationId) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    
    return result;
  } catch (error) {
    console.error("updateConversation error:", error);
    throw error;
  }
}

// Create a new message
// Fix the createMessage function to ensure conversationId is stored as ObjectId
export async function createMessage(messageData) {
  try {
    const db = await getDatabase();
    
    // Process attachments - save to disk instead of storing base64
    const processedAttachments = [];
    if (messageData.attachments && messageData.attachments.length > 0) {
      for (const attachment of messageData.attachments) {
        // Convert base64 to buffer
        const buffer = Buffer.from(attachment.data, 'base64');
        
        // Save to disk
        const fileInfo = await saveFile(buffer, attachment.name, attachment.type);
        
        // Store only metadata in DB
        processedAttachments.push({
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          fileName: fileInfo.fileName,
          thumbnailName: fileInfo.thumbnailName,
          createdAt: new Date()
        });
      }
    }
    
    const newMessage = {
      ...messageData,
      conversationId: new ObjectId(messageData.conversationId),
      timestamp: new Date(),
      read: false,
      attachments: processedAttachments // Only metadata
    };
    
    const result = await db.collection(MESSAGES_COLLECTION).insertOne(newMessage);
    
    // Update conversation
    await db.collection(CONVERSATIONS_COLLECTION).updateOne(
      { _id: new ObjectId(messageData.conversationId) },
      { 
        $set: { 
          lastMessage: messageData.content || (processedAttachments.length > 0 ? "📎 Attachment" : ""),
          lastMessageTime: new Date(),
          lastMessageSender: messageData.senderType,
          updatedAt: new Date()
        }
      }
    );
    
    return { ...newMessage, _id: result.insertedId };
  } catch (error) {
    console.error("createMessage error:", error);
    throw error;
  }
}

// Add pagination to getMessagesByConversation
export async function getMessagesByConversation(conversationId, page = 1, limit = 50) {
  try {
    const db = await getDatabase();
    const skip = (page - 1) * limit;
    
    const messages = await db.collection(MESSAGES_COLLECTION)
      .find({ conversationId: new ObjectId(conversationId) })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Reverse to get chronological order
    return messages.reverse();
  } catch (error) {
    console.error("getMessagesByConversation error:", error);
    throw error;
  }
}

// Get messages for a conversation
export async function getMessagesByConversation(conversationId) {
    try {
      const db = await getDatabase();
      return db.collection(MESSAGES_COLLECTION)
        .find({ conversationId: new ObjectId(conversationId) })
        .sort({ timestamp: 1 })
        .toArray();
    } catch (error) {
      console.error("getMessagesByConversation error:", error);
      throw error;
    }
}

// Mark messages as read
export async function markMessagesAsRead(conversationId, receiverType) {
  try {
    const db = await getDatabase();
    
    // Determine which messages to mark as read based on the receiver
    const senderType = receiverType === "user" ? "doctor" : "user";
    
    const result = await db.collection(MESSAGES_COLLECTION).updateMany(
      { 
        conversationId: new ObjectId(conversationId), 
        senderType: senderType,
        read: false
      },
      { $set: { read: true } }
    );
    
    return result;
  } catch (error) {
    console.error("markMessagesAsRead error:", error);
    throw error;
  }
}

// Get unread message count for a user
export async function getUnreadMessageCountForUser(userId) {
  try {
    const db = await getDatabase();
    
    // Get all user's conversations
    const conversations = await db.collection(CONVERSATIONS_COLLECTION)
      .find({ userId: new ObjectId(userId) })
      .toArray();
    
    const conversationIds = conversations.map(conv => conv._id);
    
    // Count messages sent by doctors that haven't been read
    const count = await db.collection(MESSAGES_COLLECTION).countDocuments({
      conversationId: { $in: conversationIds },
      senderType: "doctor",
      read: false
    });
    
    return count;
  } catch (error) {
    console.error("getUnreadMessageCountForUser error:", error);
    throw error;
  }
}

// Get unread message count for a doctor
export async function getUnreadMessageCountForDoctor(doctorId) {
  try {
    const db = await getDatabase();
    
    // Get all doctor's conversations
    const conversations = await db.collection(CONVERSATIONS_COLLECTION)
      .find({ doctorId: parseInt(doctorId) })
      .toArray();
    
    const conversationIds = conversations.map(conv => conv._id);
    
    // Count messages sent by users that haven't been read
    const count = await db.collection(MESSAGES_COLLECTION).countDocuments({
      conversationId: { $in: conversationIds },
      senderType: "user",
      read: false
    });
    
    return count;
  } catch (error) {
    console.error("getUnreadMessageCountForDoctor error:", error);
    throw error;
  }
}