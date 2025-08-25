const E164_REGEX = /^\+[1-9]\d{9,14}$/;

export const isValidPhoneE164 = (phone) => {
  if (typeof phone !== "string") return false;
  return E164_REGEX.test(phone.trim());
};

export default { isValidPhoneE164 };


