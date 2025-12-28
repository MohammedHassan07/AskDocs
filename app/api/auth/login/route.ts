import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { loginUser } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await loginUser({ email, password });

    return NextResponse.json({
      message: "Login successful",
      user,
    });
    
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (error.message === "EMAIL_NOT_VERIFIED") {
      return NextResponse.json(
        { message: "Email not verified" },
        { status: 403 }
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
