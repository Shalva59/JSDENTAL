// File: /js/sendEmail.js

import nodemailer from 'nodemailer'

export async function sendBookingEmail(bookingData) {
  const {
    doctor,
    doctorName,
    service,
    serviceName,
    date,
    time,
    patientInfo: { firstName, lastName, phone, email, isNewPatient, isUrgent, notes },
  } = bookingData

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'შენიGmail@gmail.com', // აქ ჩაწერე შენი იმეილი, რომლითაც აგზავნი
      pass: 'mudhsroetflojfvw',     // App Password
    },
  })

  const mailOptions = {
    from: email || 'no-reply@booking.com',
    to: 'shakosmail12345@gmail.com', // ექიმის იმეილი (შენი)
    subject: '📬 ახალი ჯავშანი პაციენტისგან',
    text: `📌 ახალი ჯავშანი მიღებულია:

👤 პაციენტი: ${firstName} ${lastName}
📧 იმეილი: ${email || 'არ მიუთითებია'}
📞 ნომერი: ${phone}
📋 სერვისი: ${serviceName}
🩺 ექიმი: ${doctorName}
📅 თარიღი: ${new Date(date).toLocaleDateString()}
🕒 დრო: ${time}
🆕 ახალი პაციენტი: ${isNewPatient === 'new' ? 'კი' : 'არა'}
⚠️ გადაუდებელი: ${isUrgent ? 'კი' : 'არა'}
✏️ შენიშვნები: ${notes || 'არ არის'}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('❌ Email error:', error)
    return { success: false, error: error.message }
  }
}
