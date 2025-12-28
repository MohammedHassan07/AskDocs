import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyEmailOtp } from "@/services/auth.service";

export async function POST(req: Request) {
    try {
        const { userId, otp } = await req.json();

        if (!userId || !otp) {
            return NextResponse.json(
                { message: "User ID and OTP are required" },
                { status: 400 }
            );
        }

        await connectDB();

        await verifyEmailOtp({ userId, otp });

        return NextResponse.json({
            message: "Email verified successfully",
        });
    } catch (error: any) {
        if (error.message === "INVALID_OR_EXPIRED_OTP") {
            return NextResponse.json(
                { message: "Invalid or expired OTP" },
                { status: 400 }
            );
        }

        console.error("OTP verification error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
