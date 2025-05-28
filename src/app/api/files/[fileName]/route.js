// src/app/api/files/[fileName]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getFile, getThumbnail } from "../../../lib/fileStorage";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const { fileName } = params;
    const url = new URL(request.url);
    const thumbnail = url.searchParams.get('thumbnail') === 'true';
    
    // Get file from disk
    const fileBuffer = thumbnail && fileName.startsWith('thumb_') ? 
      await getThumbnail(fileName) : 
      await getFile(fileName);
    
    // Set appropriate headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Determine content type
    let contentType = 'application/octet-stream';
    if (fileName.match(/\.(jpg|jpeg)$/i)) contentType = 'image/jpeg';
    else if (fileName.match(/\.png$/i)) contentType = 'image/png';
    else if (fileName.match(/\.gif$/i)) contentType = 'image/gif';
    else if (fileName.match(/\.pdf$/i)) contentType = 'application/pdf';
    
    headers.set('Content-Type', contentType);
    
    return new NextResponse(fileBuffer, { headers });
    
  } catch (error) {
    console.error("File serving error:", error);
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }
}