import { exec } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function sendEmail({ to, subject, html, text }) {
  try {
    console.log(`Sending email to ${to}`);
    
    // Create a temporary file for the email body
    const tempFilePath = `/tmp/email-${Date.now()}.html`;
    
    // Write the HTML content to the temp file
    await writeFile(tempFilePath, html);
    
    // Use the mail command directly
    await execPromise(`mail -s "${subject}" -a "Content-Type: text/html" ${to} < ${tempFilePath}`);
    
    // Clean up the temp file
    await unlink(tempFilePath);
    
    console.log('Email sent successfully using system mail command');
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}