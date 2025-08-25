import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html, from }) => {
  const mailFrom = from || process.env.EMAIL_FROM || process.env.EMAIL_USER;
  if (!to) throw new Error("sendEmail: 'to' is required");
  if (!subject) throw new Error("sendEmail: 'subject' is required");

  return transporter.sendMail({ from: mailFrom, to, subject, text, html });
};

export const sendEmailOtp = async ({ to, otp, subject = "Your OTP" }) => {
  const text = `Your verification code is ${otp}. It expires in 10 minutes.`;
  const html = `<p>Your verification code is <b>${otp}</b>. It expires in 10 minutes.</p>`;
  return sendEmail({ to, subject, text, html });
};

export default { sendEmail, sendEmailOtp };


