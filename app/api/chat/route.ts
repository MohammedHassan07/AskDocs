import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createChat, getUserChats } from "../../server/services/chat.service";
import { getAuthUser } from "@/app/lib/auth"; // 

export async function POST() {
  await connectDB();

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const chat = await createChat('695134ffa8ef7cb250ae9f13'); // TODO: add title also, also remove this Id  after implementing nextAuth

  return NextResponse.json(chat);
}

export async function GET() {
  await connectDB();

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const chats = await getUserChats(user.id);
  return NextResponse.json(chats);
}
