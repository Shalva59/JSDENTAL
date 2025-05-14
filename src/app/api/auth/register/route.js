import { createUser } from "../../../lib/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Registration request received:", { ...body, password: "[REDACTED]" });
    
    const { firstName, lastName, email, phone, password, confirmPassword } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password) {
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

    // Create user
    const user = await createUser({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    console.log("User created successfully:", { email });
    
    return NextResponse.json(
      { 
        success: true,
        message: "User registered successfully" 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error.message);
    console.error("Full error:", error);
    
    if (error.message === "User already exists with this email") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        error: "Registration failed: " + error.message 
      },
      { status: 500 }
    );
  }
}