import mongoose from "mongoose";

const waterUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  amountLiters: { type: Number, required: true },
  notes: String,
}, { timestamps: true });

export default mongoose.model("WaterUsage", waterUsageSchema);
