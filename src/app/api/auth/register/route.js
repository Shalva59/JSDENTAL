import { createUser } from "../../../lib/user";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password, confirmPassword, language } = body;

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

    // Default language if none provided
    const userLanguage = language || 'en';

    // Create user
    const user = await createUser({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    // Send verification email in the user's language
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${user.verificationToken}`;
    
    // Email subject and content based on language
    let emailSubject = "Verify Your Email - JC Dental";
    let emailText = `Please click the following link to verify your email: ${verificationUrl}`;
    let emailHtml = `
      <div>
        <h1>Welcome to JC Dental!</h1>
        <p>Thank you for registering. Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you did not sign up for an account, you can ignore this email.</p>
      </div>
    `;
    
    // Set language-specific content
    if (userLanguage === 'ru') {
      emailSubject = "Подтвердите вашу электронную почту - JC Dental";
      emailText = `Пожалуйста, нажмите на следующую ссылку для подтверждения вашего электронного адреса: ${verificationUrl}`;
      emailHtml = `
        <div>
          <h1>Добро пожаловать в JC Dental!</h1>
          <p>Спасибо за регистрацию. Пожалуйста, нажмите на ссылку ниже, чтобы подтвердить ваш адрес электронной почты:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Подтвердить почту</a>
          <p>Если вы не регистрировались, вы можете игнорировать это письмо.</p>
        </div>
      `;
    } else if (userLanguage === 'ka') {
      emailSubject = "დაადასტურეთ თქვენი ელფოსტა - JC Dental";
      emailText = `გთხოვთ, დააკლიკოთ ბმულს თქვენი ელფოსტის დასადასტურებლად: ${verificationUrl}`;
      emailHtml = `
        <div>
          <h1>კეთილი იყოს თქვენი მობრძანება JC Dental-ში!</h1>
          <p>მადლობა რეგისტრაციისთვის. გთხოვთ, დააკლიკოთ ქვემოთ მოცემულ ბმულს თქვენი ელფოსტის მისამართის დასადასტურებლად:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">ელფოსტის დადასტურება</a>
          <p>თუ თქვენ არ დარეგისტრირებულხართ, შეგიძლიათ უგულებელყოთ ეს წერილი.</p>
        </div>
      `;
    } else if (userLanguage === 'he') {
      emailSubject = "אמת את הדוא\"ל שלך - JC Dental";
      emailText = `אנא לחץ על הקישור הבא כדי לאמת את כתובת הדוא\"ל שלך: ${verificationUrl}`;
      emailHtml = `
        <div dir="rtl">
          <h1>ברוך הבא ל-JC Dental!</h1>
          <p>תודה על ההרשמה. אנא לחץ על הקישור למטה כדי לאמת את כתובת הדוא"ל שלך:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">אימות דוא"ל</a>
          <p>אם לא נרשמת לחשבון, אתה יכול להתעלם מהודעת דוא"ל זו.</p>
        </div>
      `;
    }

    // Create email transporter and send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
tls: {
    minVersion: 'TLSv1.2', // Enforce TLS 1.2 or higher
  },
  debug: true,
  logger: true,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: "Registration successful! Please check your email to verify your account." 
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