import { parsePhoneNumberFromString } from "libphonenumber-js";

export const normalizeToE164 = (raw, defaultCountry = "IN") => {
  if (!raw) return null;
  const p = parsePhoneNumberFromString(raw, defaultCountry);
  if (!p || !p.isValid()) return null;
  return p.number; 
};
