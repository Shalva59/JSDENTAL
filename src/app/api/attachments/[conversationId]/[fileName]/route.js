// src/app/api/attachments/[conversationId]/[fileName]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { readFile } from "fs/promises";
import path from "path";

const STORAGE_PATH = "/mnt/onestorage/jcdental/attachments";

export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { conversationId, fileName } = context.params;
    
    // Security check to prevent path traversal
    if (fileName.includes("..") || conversationId.includes("..")) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }
    
    const filePath = path.join(STORAGE_PATH, conversationId, fileName);
    
    try {
      const fileBuffer = await readFile(filePath);
      
      // Determine content type based on file extension
      const ext = path.extname(fileName).toLowerCase();
      let contentType = "application/octet-stream";
      
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".gif") contentType = "image/gif";
      else if (ext === ".pdf") contentType = "application/pdf";
      // Add more content types as needed
      
      // Create a Response with the file content and appropriate headers
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400", // Cache for 24 hours
          "Content-Disposition": `inline; filename="${fileName}"`,
        },
      });
    } catch (error) {
      if (error.code === "ENOENT") {
        return NextResponse.json(
          { error: "File not found" },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("File retrieval error:", error);
    return NextResponse.json(
      { error: "File retrieval failed" },
      { status: 500 }
    );
  }
}