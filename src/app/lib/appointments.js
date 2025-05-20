import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "ValueMediaProject";
const APPOINTMENTS_COLLECTION = "appointments";
const NOTIFICATIONS_COLLECTION = "notifications";

async function getDatabase() {
  try {
    const client = await clientPromise;
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
}

// Create new appointment
export async function createAppointment(appointmentData) {
  try {
    const db = await getDatabase();
    
    const newAppointment = {
      ...appointmentData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(APPOINTMENTS_COLLECTION).insertOne(newAppointment);
    return { ...newAppointment, _id: result.insertedId };
  } catch (error) {
    console.error("createAppointment error:", error);
    throw error;
  }
}

// Get appointments by user ID
export async function getAppointmentsByUser(userId) {
  try {
    const db = await getDatabase();
    return db.collection(APPOINTMENTS_COLLECTION)
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getAppointmentsByUser error:", error);
    throw error;
  }
}

// Get appointments by doctor ID
export async function getAppointmentsByDoctor(doctorId) {
  try {
    const db = await getDatabase();
    return db.collection(APPOINTMENTS_COLLECTION)
      .find({ doctorId: parseInt(doctorId) })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getAppointmentsByDoctor error:", error);
    throw error;
  }
}

// Update appointment status
export async function updateAppointmentStatus(appointmentId, updateData) {
  try {
    const db = await getDatabase();
    
    const result = await db.collection(APPOINTMENTS_COLLECTION).updateOne(
      { _id: new ObjectId(appointmentId) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    
    return result;
  } catch (error) {
    console.error("updateAppointmentStatus error:", error);
    throw error;
  }
}

// Get appointment by ID
export async function getAppointmentById(appointmentId) {
  try {
    const db = await getDatabase();
    return db.collection(APPOINTMENTS_COLLECTION).findOne({ 
      _id: new ObjectId(appointmentId) 
    });
  } catch (error) {
    console.error("getAppointmentById error:", error);
    throw error;
  }
}

// Check daily appointment limit for user
export async function getUserAppointmentsToday(userId) {
  try {
    const db = await getDatabase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const count = await db.collection(APPOINTMENTS_COLLECTION).countDocuments({
      userId: new ObjectId(userId),
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    return count;
  } catch (error) {
    console.error("getUserAppointmentsToday error:", error);
    throw error;
  }
}

// Notifications functions
export async function createNotification(notificationData) {
  try {
    const db = await getDatabase();
    
    const notification = {
      ...notificationData,
      isRead: false,
      createdAt: new Date(),
    };
    
    const result = await db.collection(NOTIFICATIONS_COLLECTION).insertOne(notification);
    return { ...notification, _id: result.insertedId };
  } catch (error) {
    console.error("createNotification error:", error);
    throw error;
  }
}

export async function getNotificationsByUser(userId) {
  try {
    const db = await getDatabase();
    return db.collection(NOTIFICATIONS_COLLECTION)
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("getNotificationsByUser error:", error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const db = await getDatabase();
    return db.collection(NOTIFICATIONS_COLLECTION).updateOne(
      { _id: new ObjectId(notificationId) },
      { $set: { isRead: true } }
    );
  } catch (error) {
    console.error("markNotificationAsRead error:", error);
    throw error;
  }
}

export async function getUnreadNotificationsCount(userId) {
  try {
    const db = await getDatabase();
    return db.collection(NOTIFICATIONS_COLLECTION).countDocuments({
      userId: new ObjectId(userId),
      isRead: false
    });
  } catch (error) {
    console.error("getUnreadNotificationsCount error:", error);
    throw error;
  }
}