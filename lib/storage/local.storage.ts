import fs from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function savePdfToLocal(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileId = crypto.randomUUID();
  const fileName = `${fileId}.pdf`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  fs.writeFileSync(filePath, buffer);

  return {
    id: fileId,
    name: file.name,
    path: filePath,
  };
}
