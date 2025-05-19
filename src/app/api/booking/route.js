import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Track if primary account failed (persists between requests)
let primaryAccountFailed = false;

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
    
    // Format a nice email
    const patientFullName = `${patientInfo.firstName} ${patientInfo.lastName}`;
    
    const clinicEmailHtml = `
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
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0;">Patient Information</h3>
          <p><strong>Name:</strong> ${patientFullName}</p>
          <p><strong>Phone:</strong> ${patientInfo.phone}</p>
          <p><strong>Email:</strong> ${patientInfo.email || 'Not provided'}</p>
          <p><strong>Notes:</strong> ${patientInfo.notes || 'None'}</p>
        </div>
        
        <p>Please confirm this appointment with the patient.</p>
      </div>
    `;
    
    const patientEmailHtml = patientInfo.email ? `
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
    ` : null;
    
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
        
        // Email to clinic
        await transporter.sendMail({
          from: fromEmail,
          to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER,
          subject: `New Dental Appointment - ${patientFullName}`,
          html: clinicEmailHtml,
        });
        
        // Confirmation email to patient (if email is provided)
        if (patientInfo.email && patientEmailHtml) {
          await transporter.sendMail({
            from: fromEmail,
            to: patientInfo.email,
            subject: "Your Dental Appointment Confirmation",
            html: patientEmailHtml,
          });
        }
        
        // Email sent successfully
        emailSent = true;
        primaryAccountFailed = (accountType === 'backup');
        console.log(`Booking email sent successfully using ${accountType} account`);
        
      } catch (err) {
        lastError = err;
        console.error(`Failed to send booking email with ${accountType} account:`, err);
        
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