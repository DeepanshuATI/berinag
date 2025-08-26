import express from "express";
import {
  register,
  verifyOtp,
  login,
  verifyLoginOtp,
  update2fa,
  me,
  resendOtp,
  resendLoginOtp
} from "../controllers/auth.controller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);         
router.post("/login", login);               
router.post("/login-verify", verifyLoginOtp); 
router.post("/2fa", update2fa);
router.get("/me", auth, me);
router.post("/resend-login-otp", resendLoginOtp);             

export default router;
