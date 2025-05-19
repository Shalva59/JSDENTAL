import { getUserByEmail, createResetToken } from "../../../lib/user";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Track if primary account failed (persists between requests)
let primaryAccountFailed = false;

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
    
    const emailHtml = `
      <div>
        <h1>Password Reset Request</h1>
        <p>Please click the following link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      </div>
    `;
    
    const emailText = `Please click the following link to reset your password: ${resetUrl}`;
    
    // Try to send email with primary or backup account
    let emailSent = false;
    let lastError = null;
    
    // Determine which account to try first
    const accountsToTry = primaryAccountFailed ? 
      ['backup', 'primary'] : 
      ['primary', 'backup'];
    
    for (const accountType of accountsToTry) {
      if (emailSent) break;
      
      try {
        const username = accountType === 'primary' ? 
          process.env.EMAIL_SERVER_USER : 
          process.env.EMAIL_SERVER_USER_BACKUP;
          
        const password = accountType === 'primary' ? 
          process.env.EMAIL_SERVER_PASSWORD : 
          process.env.EMAIL_SERVER_PASSWORD_BACKUP;
          
        const fromEmail = accountType === 'primary' ? 
          process.env.EMAIL_FROM : 
          process.env.EMAIL_FROM_BACKUP;
        
        // Skip if backup credentials are not configured
        if (accountType === 'backup' && (!username || !password)) {
          console.log('Backup email not configured, skipping');
          continue;
        }
        
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT),
          secure: false,
          auth: {
            user: username,
            pass: password,
          },
          tls: {
            minVersion: 'TLSv1.2',
          },
        });
        
        await transporter.sendMail({
          from: fromEmail,
          to: email,
          subject: "Password Reset Request",
          text: emailText,
          html: emailHtml,
        });
        
        // Email sent successfully
        emailSent = true;
        primaryAccountFailed = (accountType === 'backup');
        console.log(`Password reset email sent successfully using ${accountType} account`);
        
      } catch (err) {
        lastError = err;
        console.error(`Failed to send password reset email with ${accountType} account:`, err);
        
        // Update failure tracking
        if (accountType === 'primary') {
          primaryAccountFailed = true;
        }
      }
    }
    
    if (!emailSent) {
      throw lastError || new Error('Failed to send email with all accounts');
    }
    
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