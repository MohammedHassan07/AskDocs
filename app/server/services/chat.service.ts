import Chat from "@/models/Chat";
import Message from "@/models/Message";
import { Types } from "mongoose";

export async function createChat(userId: string, title?: string) {
  return Chat.create({
    userId,
    title: title || "New Chat",
  });
}

export async function getUserChats(userId: string) {
  return Chat.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();
}

export async function getChatMessages(chatId: string) {
  return Message.find({ chatId })
    .sort({ createdAt: 1 })
    .lean();
}

export async function addMessageToChat({
  chatId,
  role,
  type,
  content,
  fileName,
  filePath,
}: {
  chatId: string;
  role: "user" | "assistant";
  type: "text" | "file";
  content?: string;
  fileName?: string;
  filePath?: string;
}) {
  return Message.create({
    chatId: new Types.ObjectId(chatId),
    role,
    type,
    content,
    fileName,
    filePath,
  });
}
