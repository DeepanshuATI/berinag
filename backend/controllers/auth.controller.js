import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genOtp, inMinutes, sendEmailOtp, sendSmsOtp } from "../services/opt.service.js";
import { storeOtp, verifyOtp as verifyOtpFromStore } from "../utils/otpStore.js";

const issueJwt = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

const issueTempJwt = (userId) =>
  jwt.sign({ id: userId, stage: "otp" }, process.env.JWT_SECRET, { expiresIn: "15m" });

//register
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, phone, password: hashed,
      twoFactorEnabled: true,
      twoFactorMethod: "email", // Default to email
      isVerified: true // Account is verified immediately
    });

    res.status(201).json({ msg: "Registration successful! You can now login." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Verify account 
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user.isVerified) return res.status(400).json({ msg: "Already verified" });
    
    
    const otpKey = `register_${email}`;
    const result = verifyOtpFromStore(otpKey, otp);
    
    if (!result.valid) {
      return res.status(400).json({ msg: result.reason });
    }

    user.isVerified = true;
    await user.save();

    res.json({ msg: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// login (step 1)
export const login = async (req, res) => {
  try {
    const { email, password, channel } = req.body; 

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (!user.isVerified) return res.status(400).json({ msg: "Account not verified" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    // Always require OTP for login (2FA is mandatory)
    const loginOtp = genOtp();
    const otpKey = `login_${user._id}`;
    storeOtp(otpKey, loginOtp, 10);
    
    const method = channel === "sms" || channel === "email" ? channel : user.twoFactorMethod;

    if (method === "sms") {
      await sendSmsOtp({ to: user.phone, otp: loginOtp });
    } else {
      await sendEmailOtp({ to: user.email, otp: loginOtp, subject: "Your login OTP" });
    }

    const tempToken = issueTempJwt(user._id);
    res.json({ msg: "OTP sent for login verification", tempToken, method });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const verifyLoginOtp = async (req, res) => {
  try {
    const { tempToken, otp } = req.body;
    if (!tempToken || !otp) return res.status(400).json({ msg: "Missing fields" });

    let payload;
    try {
      payload = jwt.verify(tempToken, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ msg: "Invalid or expired temp token" });
    }
    if (payload.stage !== "otp") return res.status(400).json({ msg: "Wrong token stage" });

    const user = await User.findById(payload.id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    
    
    const otpKey = `login_${user._id}`;
    const result = verifyOtpFromStore(otpKey, otp);
    
    if (!result.valid) {
      return res.status(400).json({ msg: result.reason });
    }

    const token = issueJwt(user._id);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const update2fa = async (req, res) => {
  try {
    const { email, enabled, method } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (typeof enabled === "boolean") user.twoFactorEnabled = enabled;
    if (method && ["email", "sms"].includes(method)) user.twoFactorMethod = method;

    await user.save();
    res.json({ msg: "2FA settings updated", twoFactorEnabled: user.twoFactorEnabled, twoFactorMethod: user.twoFactorMethod });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get current user info
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Resend OTP for registration
export const resendOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user.isVerified) return res.status(400).json({ msg: "User already verified" });

    const otp = genOtp();
    const otpKey = `register_${email}`;
    storeOtp(otpKey, otp, 10);

    if (user.twoFactorMethod === "sms") {
      await sendSmsOtp({ to: phone, otp });
    } else {
      await sendEmailOtp({ to: email, otp, subject: "Verify your account" });
    }

    res.json({ msg: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Resend OTP for login
export const resendLoginOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (!user.isVerified) return res.status(400).json({ msg: "Verify your account first" });

    const loginOtp = genOtp();
    const otpKey = `login_${user._id}`;
    storeOtp(otpKey, loginOtp, 10);

    if (user.twoFactorMethod === "sms") {
      await sendSmsOtp({ to: phone, otp: loginOtp });
    } else {
      await sendEmailOtp({ to: email, otp: loginOtp, subject: "Your login OTP" });
    }

    res.json({ msg: "Login OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
