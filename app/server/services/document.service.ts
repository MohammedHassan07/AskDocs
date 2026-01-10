import  Document  from "@/models/Document";
import { processPdfDocument } from "@/langchain/processPdf";

export async function createDocument(data: {
  chatId: string;
  fileName: string;
  filePath: string;
  mimeType: string;
}) {
    
  const doc = await Document.create(data);

  processPdfDocument(doc._id.toString()).catch(console.error);

  return doc;
}
