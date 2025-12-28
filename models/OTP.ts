import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.OTP ||
  mongoose.model("OTP", otpSchema);
