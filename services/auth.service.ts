import User from "@/models/User";
import OTP from "@/models/OTP";
import { hashPassword, comparePassword } from "@/lib/hash";
import { generateOTP } from "@/lib/otp";
import { sendOTP } from "@/lib/mail";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";

interface LoginInput {
  email: string;
  password: string;
}


interface VerifyOtpInput {
  userId: string;
  otp: string;
}

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {

  await connectDB()
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isVerified) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  if (existingUser && !existingUser.isVerified) {
    // await OTP.deleteMany({ userId: existingUser._id });

    const otp = generateOTP()

    await OTP.create({
      userId: existingUser._id,
      otp,
    });

    existingUser.verificationExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await existingUser.save();

    // send email here
    await sendOTP(email, otp)

    return {
      message: "Verification OTP resent",
      userId: existingUser._id,
    };
  }

  const hashedPassword = await hashPassword(password)

  const user = await User.create({
    email,
    passwordHash: hashedPassword,
    isVerified: false,
    verificationExpiresAt: new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ),
  });

  const otp = generateOTP()

  await OTP.create({
    userId: user._id,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  // send email here
  await sendOTP(email, otp)


  return {
    message: "Registration successful, verify your email",
    userId: user._id,
  };
}

export async function loginUser({ email, password }: LoginInput) {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!user.isVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }
  
  const isPasswordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // ⚠️ No token / session here yet
  // This will be handled by NextAuth later
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}

export async function verifyEmailOtp({
  userId,
  otp,
}: VerifyOtpInput) {

  await connectDB()
  const record = await OTP.findOne({
    userId: new Types.ObjectId(userId),
    otp,
  });

  if (!record) {
    throw new Error("INVALID_OR_EXPIRED_OTP");
  }

  await User.findByIdAndUpdate(userId, {
    isVerified: true,
  });

  return true;
}
