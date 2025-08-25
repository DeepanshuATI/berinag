import twilio from "twilio";

const hasTwilioCreds = Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM);
const client = hasTwilioCreds ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

export const sendSms = async ({ to, body }) => {
  if (!to) throw new Error("sendSms: 'to' is required");
  if (!body) throw new Error("sendSms: 'body' is required");
  if (!client) throw new Error("Twilio not configured: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM");
  return client.messages.create({ from: process.env.TWILIO_FROM, to, body });
};

export const sendSmsOtp = async ({ to, otp }) => {
  const body = `Your verification code is ${otp}. It expires in 10 minutes.`;
  return sendSms({ to, body });
};

export default { sendSms, sendSmsOtp };


