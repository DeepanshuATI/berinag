import nodemailer from "nodemailer";
import twilio from "twilio";
import bcrypt from "bcryptjs";


const hasEmailCreds = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
const mailTransporter = hasEmailCreds ? nodemailer.createTransport({
  service: "gmail",
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
}) : null;

const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export const genOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
export const inMinutes = (mins) => Date.now() + mins * 60 * 1000;

export const hashOtp = async (otp) => bcrypt.hash(otp, 10);
export const verifyOtpHash = async (otp, hash) => bcrypt.compare(otp, hash);

  export const sendEmailOtp = async ({ to, otp, subject = "Your OTP" }) => {
  if (!hasEmailCreds) {
    console.log(`[DEV] Email OTP would be sent to ${to}: ${otp}`);
    return; 
  }
  
  try {
    await mailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: `Your OTP is ${otp}. It expires in 10 minutes.`
    });
  } catch (error) {
    console.error('Email send error:', error.message);
    throw new Error("Failed to send email. Please check your email configuration.");
  }
};

export const sendSmsOtp = async ({ to, otp }) => {
  if (!twilioClient) {
    console.log(`[DEV] SMS OTP would be sent to ${to}: ${otp}`);
    return; 
  }
  
  try {
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}. It expires in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
  } catch (error) {
    console.error('SMS send error:', error.message);
    throw new Error("Failed to send SMS. Please check your Twilio configuration.");
  }
};
