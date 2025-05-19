import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function sendEmail({ to, subject, text, html }) {
  try {
    console.log(`Sending email to ${to} with subject: ${subject}`);
    
    // Create email content
    const content = `To: ${to}\nSubject: ${subject}\nContent-Type: text/html\n\n${html}`;
    
    // Write to a temp file and pipe to sendmail
    const tempFile = `/tmp/email-${Date.now()}.txt`;
    await execPromise(`echo '${content.replace(/'/g, "'\\''")}' > ${tempFile}`);
    await execPromise(`cat ${tempFile} | /usr/sbin/sendmail -t`);
    await execPromise(`rm ${tempFile}`);
    
    console.log('Email sent successfully using sendmail');
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}