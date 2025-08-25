import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true }, 
    password: { type: String, required: true },

    
    isVerified: { type: Boolean, default: false },

    
    twoFactorEnabled: { type: Boolean, default: true },
    twoFactorMethod: { type: String, enum: ["email", "sms"], default: "email" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
