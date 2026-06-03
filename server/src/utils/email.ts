import nodemailer from 'nodemailer';

export const sendContactEmail = async (name: string, email: string, message: string): Promise<boolean> => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'deveshpandagre9502@gmail.com';

  if (!emailUser || !emailPass) {
    console.warn('⚠️ SMTP Email credentials (EMAIL_USER/EMAIL_PASS) not set in .env. Skipping email dispatch.');
    return false;
  }

  try {
    // Create a transporter using Gmail SMTP or general SMTP
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${name} (Portfolio)" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `🎮 New Guild Invitation from ${name} on Pixel Portfolio`,
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; background-color: #CADC9F; color: #2C3A1E; padding: 20px; border: 4px solid #2C3A1E; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 3px solid #2C3A1E; padding-bottom: 10px; margin-top: 0; font-size: 18px; font-weight: bold;">
            [ NEW GUILD INVITATION RECEIVED ]
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px; font-size: 14px;">PLAYER:</td>
              <td style="padding: 6px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; font-size: 14px;">EMAIL:</td>
              <td style="padding: 6px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #2C3A1E; text-decoration: underline;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="background-color: #8B956D; color: #fff; padding: 15px; border: 3px solid #2C3A1E;">
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 12px; border-bottom: 1px solid #fff; padding-bottom: 4px;">MESSAGE TRANSMISSION:</div>
            <pre style="font-family: 'Courier New', Courier, monospace; white-space: pre-wrap; margin: 0; font-size: 14px; line-height: 1.5;">${message}</pre>
          </div>
          <div style="margin-top: 20px; font-size: 10px; text-align: center; border-top: 1px solid #2C3A1E; padding-top: 10px;">
            © Devesh Kumar Pandagre PORTFOLIO · SYSTEM STATUS: ONLINE
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✉️ Contact form email successfully dispatched from ${email} to ${receiverEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to dispatch contact form email:', error);
    return false;
  }
};
