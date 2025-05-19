import nodemailer from 'nodemailer';

// Track which account failed recently
let primaryAccountFailed = false;

export async function sendEmail({ to, subject, html, text }) {
  // Try primary account first (unless it just failed)
  const accounts = primaryAccountFailed ? 
    [createBackupTransporter, createPrimaryTransporter] : 
    [createPrimaryTransporter, createBackupTransporter];
  
  let error = null;
  
  // Try each account in sequence
  for (const createTransporter of accounts) {
    try {
      const transporter = createTransporter();
      
      await transporter.sendMail({
        from: transporter.options.auth.user,
        to,
        subject,
        text: text || '',
        html: html || '',
      });
      
      // Reset failure flag if success
      primaryAccountFailed = createTransporter === createBackupTransporter;
      console.log(`Email sent successfully using ${primaryAccountFailed ? 'backup' : 'primary'} account`);
      return { success: true };
    } catch (err) {
      error = err;
      console.error(`Failed to send with ${createTransporter === createPrimaryTransporter ? 'primary' : 'backup'} account:`, err.message);
      
      // If this is the primary account failing, mark it for next time
      if (createTransporter === createPrimaryTransporter) {
        primaryAccountFailed = true;
      }
      
      // Continue to try the next account
    }
  }
  
  // If we get here, all accounts failed
  console.error('All email accounts failed to send:', error);
  throw error;
}

function createPrimaryTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
      minVersion: 'TLSv1.2',
    },
  });
}

function createBackupTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER_BACKUP,
      pass: process.env.EMAIL_SERVER_PASSWORD_BACKUP,
    },
    tls: {
      minVersion: 'TLSv1.2',
    },
  });
}