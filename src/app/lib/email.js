import nodemailer from 'nodemailer';

// Create reusable transporter
export async function createTransporter() {
  // For port 587, we need explicit TLS configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: false, // true for 465, false for other ports like 587
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    requireTLS: true, // Force using TLS
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
  });
  
  return transporter;
}

export async function sendEmail({ to, subject, html, text }) {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}