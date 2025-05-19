import { getUserByEmail, createResetToken } from "../../../lib/user";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email"; // Import our custom email helper

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      // Don't reveal that the user doesn't exist for security
      return NextResponse.json(
        { success: true, message: "If an account with that email exists, a password reset link has been sent" },
        { status: 200 }
      );
    }

    // Create reset token
    const token = await createResetToken(email);

    const resetUrl = `${process.env.NEXTAUTH_URL}/pages/authorization/reset-password?token=${token}`;

    // Use our custom email helper instead of nodemailer
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: ${resetUrl}`,
      html: `
        <div>
          <h1>Password Reset Request</h1>
          <p>Please click the following link to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "If an account with that email exists, a password reset link has been sent" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}