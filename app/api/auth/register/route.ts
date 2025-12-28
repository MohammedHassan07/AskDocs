import { registerUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);
    return NextResponse.json(result);
  } catch (err: any) {
    if (err.message === "USER_EXISTS") {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    console.log(err)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
