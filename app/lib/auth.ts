import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getAuthUser() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    await connectDB();

    const user = await User.findById(decoded.userId)
      .select("_id email name")
      .lean();

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  } catch {
    return null;
  }
}
