import express from "express";
import {
  register,
  verifyOtp,
  login,
  verifyLoginOtp,
  update2fa
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);         
router.post("/verify-otp", verifyOtp);     
router.post("/login", login);               
router.post("/login-verify", verifyLoginOtp); 
router.post("/2fa", update2fa);             

export default router;
