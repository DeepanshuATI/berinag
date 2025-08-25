export const generateOtp = (digits = 6) => {
  const length = Number.isInteger(digits) && digits > 0 ? digits : 6;
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

export const expiresInMinutes = (minutes = 10) => {
  const mins = Number.isFinite(minutes) && minutes > 0 ? minutes : 10;
  return Date.now() + mins * 60 * 1000;
};

export default generateOtp;


