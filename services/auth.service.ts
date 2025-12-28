import User from "@/models/User";
import OTP from "@/models/OTP";
import { hashPassword, comparePassword } from "@/lib/hash";
import { generateOTP } from "@/lib/otp";
import { sendOTP } from "@/lib/mail";

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: { name: string, email: string, password: string }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("USER_EXISTS");
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        passwordHash,
    });

    const otp = generateOTP();
    await OTP.create({
        userId: user._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOTP(email, otp);

    return { userId: user._id };
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

