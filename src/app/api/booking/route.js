import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      doctor, 
      doctorName, 
      service, 
      serviceName, 
      date, 
      time, 
      patientInfo 
    } = body;

    // Validate required fields
    if (!doctorName || !serviceName || !date || !time || !patientInfo.firstName || !patientInfo.lastName || !patientInfo.phone) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Create a transporter using the same config as your password reset
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: false, // For port 587
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
      // Add these TLS options to resolve the SSL error
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    }
  });

    // Format a nice email
    const patientFullName = `${patientInfo.firstName} ${patientInfo.lastName}`;

    // Email to clinic
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER, // Configure an EMAIL_TO in your .env for the clinic's email
      subject: `New Dental Appointment - ${patientFullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3b82f6;">New Appointment Booking</h2>
          <p>A new appointment has been booked with the following details:</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="margin-top: 0;">Appointment Details</h3>
            <p><strong>Doctor:</strong> ${doctorName}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Urgent Case:</strong> ${patientInfo.isUrgent ? 'Yes' : 'No'}</p>
            <p><strong>Patient Type:</strong> ${patientInfo.isNewPatient === 'new' ? 'New Patient' : 'Returning Patient'}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radiu s: 5px; margin: 15px 0;">
            <h3 style="margin-top: 0;">Patient Information</h3>
            <p><strong>Name:</strong> ${patientFullName}</p>
            <p><strong>Phone:</strong> ${patientInfo.phone}</p>
            <p><strong>Email:</strong> ${patientInfo.email || 'Not provided'}</p>
            <p><strong>Notes:</strong> ${patientInfo.notes || 'None'}</p>
          </div>
          
          <p>Please confirm this appointment with the patient.</p>
        </div>
      `,
    });

    // Confirmation email to patient (if email is provided)
    if (patientInfo.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: patientInfo.email,
        subject: "Your Dental Appointment Confirmation",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #3b82f6;">Appointment Confirmation</h2>
            <p>Dear ${patientFullName},</p>
            <p>Thank you for booking an appointment with JC Dental. Your appointment details are as follows:</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p><strong>Doctor:</strong> ${doctorName}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
            
            <p>Our clinic will contact you shortly to confirm this appointment.</p>
            <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
            
            <p style="margin-top: 30px;">Best regards,</p>
            <p><strong>JC Dental Team</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Booking email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send booking email" },
      { status: 500 }
    );
  }
}