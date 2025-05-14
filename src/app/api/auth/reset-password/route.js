import { resetPassword } from "../../../lib/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, password, confirmPassword } = body;

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Reset the password
    await resetPassword(token, password);

    return NextResponse.json(
      { 
        success: true, 
        message: "Password has been reset successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    
    if (error.message === "Invalid or expired token") {
      return NextResponse.json(
        { error: "Password reset link is invalid or has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}