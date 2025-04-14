// File: /src/app/api/sendbookingemail/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const bookingData = await req.json();
    
    const {
      doctorName,
      serviceName,
      date,
      time,
      patientInfo: { firstName, lastName, phone, email, isNewPatient, isUrgent, notes },
    } = bookingData;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shakosmail12345@gmail.com", // თქვენი Gmail მისამართი
        pass: "mudhsroetflojfvw",       // App Password
      },
    });

    const mailOptions = {
      from: email || "no-reply@booking.com",
      to: "shakosmail12345@gmail.com", // ექიმის იმეილი (თქვენი)
      subject: "📬 ახალი ჯავშანი პაციენტისგან",
      text: `📌 ახალი ჯავშანი მიღებულია:

👤 პაციენტი: ${firstName} ${lastName}
📧 იმეილი: ${email || "არ მიუთითებია"}
📞 ნომერი: ${phone}
📋 სერვისი: ${serviceName}
🩺 ექიმი: ${doctorName}
📅 თარიღი: ${new Date(date).toLocaleDateString()}
🕒 დრო: ${time}
🆕 ახალი პაციენტი: ${isNewPatient === "new" ? "კი" : "არა"}
⚠️ გადაუდებელი: ${isUrgent ? "კი" : "არა"}
✏️ შენიშვნები: ${notes || "არ არის"}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    });
  }
}