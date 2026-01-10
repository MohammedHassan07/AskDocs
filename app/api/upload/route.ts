import { NextResponse } from "next/server";
import { savePdfToLocal } from "@/lib/storage/local.storage";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { message: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const savedFile = await savePdfToLocal(file);

    return NextResponse.json({
      id: savedFile.id,
      role: "user",
      type: "file",
      fileName: savedFile.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
