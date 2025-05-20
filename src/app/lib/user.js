import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { hash } from "bcryptjs";
import crypto from "crypto";

// Configure database and collection
const DB_NAME = "ValueMediaProject";
const COLLECTION = "users";

// Get MongoDB database
async function getDatabase() {
  try {
    const client = await clientPromise;
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
}

// Get user by email
export async function getUserByEmail(email) {
  try {
    const db = await getDatabase();
    return db.collection(COLLECTION).findOne({ email: email.toLowerCase() });
  } catch (error) {
    console.error("getUserByEmail error:", error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(id) {
  try {
    const db = await getDatabase();
    return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("getUserById error:", error);
    throw error;
  }
}

// Create new user (updated with isDoctor field)
export async function createUser(userData) {
  try {
    const { firstName, lastName, email, phone, password } = userData;
    
    const db = await getDatabase();
    
    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user document
    const newUser = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      isVerified: false,
      isDoctor: false, // Add this line for the appointment system
      verificationToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION).insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  } catch (error) {
    console.error("createUser error:", error);
    throw error;
  }
}

// Add a function to verify email
export async function verifyUserEmail(token) {
  try {
    const db = await getDatabase();
    
    // Find user with token
    const user = await db.collection(COLLECTION).findOne({
      verificationToken: token
    });
    
    if (!user) {
      throw new Error("Invalid verification token");
    }
    
    // Update user as verified
    await db.collection(COLLECTION).updateOne(
      { _id: user._id },
      { 
        $set: { 
          isVerified: true,
          updatedAt: new Date()
        },
        $unset: { verificationToken: "" }
      }
    );
    
    return true;
  } catch (error) {
    console.error("verifyUserEmail error:", error);
    throw error;
  }
}

// Create reset token
export async function createResetToken(email) {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token expires in 1 hour
    
    const db = await getDatabase();
    await db.collection(COLLECTION).updateOne(
      { email: email.toLowerCase() },
      { $set: { resetToken: token, resetTokenExpires: expires } }
    );
    
    return token;
  } catch (error) {
    console.error("createResetToken error:", error);
    throw error;
  }
}

// Reset password
export async function resetPassword(token, newPassword) {
  try {
    const db = await getDatabase();
    
    // Find user with token
    const user = await db.collection(COLLECTION).findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() }
    });
    
    if (!user) {
      throw new Error("Invalid or expired token");
    }
    
    // Hash new password
    const hashedPassword = await hash(newPassword, 10);
    
    // Update user
    await db.collection(COLLECTION).updateOne(
      { _id: user._id },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        },
        $unset: { resetToken: "", resetTokenExpires: "" }
      }
    );
    
    return true;
  } catch (error) {
    console.error("resetPassword error:", error);
    throw error;
  }
}

// Update user doctor status (new function for appointment system)
export async function updateUserDoctorStatus(userId, isDoctorStatus) {
  try {
    const db = await getDatabase();
    
    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          isDoctor: isDoctorStatus,
          updatedAt: new Date()
        }
      }
    );
    
    return result;
  } catch (error) {
    console.error("updateUserDoctorStatus error:", error);
    throw error;
  }
}