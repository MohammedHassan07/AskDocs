import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/app/lib/auth";
import { savePdfToLocal } from "@/lib/storage/local.storage";
import Document from "@/models/Document";
import Message from "@/models/Message";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 400 });
  }

  const stored = await savePdfToLocal(file);

  const document = await Document.create({
    chatId,
    uploadedBy: user.id,
    originalName: file.name,
    fileName: stored.name,
    filePath: stored.path,
    mimeType: file.type,
    size: file.size,
  });

  const message = await Message.create({
    chatId,
    role: "user",
    type: "file",
    documentId: document._id,
  });

  return NextResponse.json({
    id: message._id,
    role: "user",
    type: "file",
    fileName: file.name,
    documentId: document._id,
    status: "done",
  });
}
