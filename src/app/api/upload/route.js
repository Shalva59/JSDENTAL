// src/app/api/upload/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "../../lib/user";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // You'll need to install this: npm install uuid

const STORAGE_PATH = "/mnt/onestorage/jcdental/attachments";

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

    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    
    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 50MB)" },
        { status: 400 }
      );
    }
    
    // Create unique filename to avoid collisions
    const fileId = uuidv4();
    const originalName = file.name;
    const fileExtension = path.extname(originalName);
    const fileName = `${fileId}${fileExtension}`;
    
    // Create directory for the conversation if it doesn't exist
    const conversationId = formData.get("conversationId");
    const uploadPath = path.join(STORAGE_PATH, conversationId);
    
    try {
      await mkdir(uploadPath, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
    
    // Write file to disk
    const filePath = path.join(uploadPath, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);
    
    // Return file metadata
    return NextResponse.json({
      success: true,
      fileId: fileId,
      fileName: originalName,
      filePath: `/api/attachments/${conversationId}/${fileName}`,
      fileType: file.type,
      fileSize: file.size
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "File upload failed" },
      { status: 500 }
    );
  }
}