import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ACCESS_TTL = process.env.ACCESS_TTL || "15m";
const REFRESH_TTL_DAYS = parseInt(process.env.REFRESH_TTL_DAYS || "7", 10);

export const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });

export const issueTempOtpJwt = (userId) =>
  jwt.sign({ id: userId, stage: "otp" }, process.env.JWT_SECRET, { expiresIn: "15m" });

export const newRefreshTokenPair = async () => {
  const token = crypto.randomBytes(48).toString("base64url");
  const tokenHash = await bcrypt.hash(token, 10);
  const jti = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  return { token, tokenHash, jti, expiresAt };
};

export const verifyRefreshToken = async (provided, storedHash) => bcrypt.compare(provided, storedHash);
