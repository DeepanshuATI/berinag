import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export const signToken = (payload, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: options.expiresIn || "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token) => jwt.decode(token);

export default { signToken, verifyToken, decodeToken };


