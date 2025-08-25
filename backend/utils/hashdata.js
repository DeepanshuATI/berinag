import bcrypt from "bcryptjs";

const DEFAULT_SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10", 10);

export const hashData = async (plain, saltRounds = DEFAULT_SALT_ROUNDS) => {
  if (typeof plain !== "string" || plain.length === 0) {
    throw new Error("hashData: plain must be a non-empty string");
  }
  const rounds = Number.isInteger(saltRounds) && saltRounds > 0 ? saltRounds : DEFAULT_SALT_ROUNDS;
  return bcrypt.hash(plain, rounds);
};

export const compareHash = async (plain, hashed) => {
  if (typeof plain !== "string" || typeof hashed !== "string") return false;
  return bcrypt.compare(plain, hashed);
};

export default { hashData, compareHash };


