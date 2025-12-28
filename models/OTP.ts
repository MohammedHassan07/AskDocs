import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: String,

    ttl: { type: Date, default: Date.now, expires: 600 }
  },
  { timestamps: true }
);

export default mongoose.models.OTP ||
  mongoose.model("OTP", otpSchema);
