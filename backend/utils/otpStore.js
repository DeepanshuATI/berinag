const otpStore = new Map();


setInterval(() => {
  const now = Date.now();
  for (const [key, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export const storeOtp = (identifier, otp, expiresInMinutes = 10) => {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  otpStore.set(identifier, {
    otp,
    expiresAt,
    attempts: 0
  });
  return expiresAt;
};

export const verifyOtp = (identifier, otp) => {
  const data = otpStore.get(identifier);
  if (!data) return { valid: false, reason: 'OTP not found' };
  
  if (Date.now() > data.expiresAt) {
    otpStore.delete(identifier);
    return { valid: false, reason: 'OTP expired' };
  }
  
  if (data.attempts >= 3) {
    otpStore.delete(identifier);
    return { valid: false, reason: 'Too many attempts' };
  }
  
  data.attempts++;
  
  if (data.otp === otp) {
    otpStore.delete(identifier);  
    return { valid: true };
  }
  
  return { valid: false, reason: 'Invalid OTP' };
};

export const removeOtp = (identifier) => {
  otpStore.delete(identifier);
};

export default { storeOtp, verifyOtp, removeOtp };
