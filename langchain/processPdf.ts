import { loadPdf } from "./loaders/pdf.loader";
import { textSplitter } from "./splitters/text.splitter";
import { googleEmbeddings } from "./embeddings/google.embeddings";
import { storeEmbeddings } from "./vectorstores/mongo.vector";
import Document from "@/models/Document";
import fs from 'fs/promises'

export async function processPdfDocument(documentId: string) {

  const doc = await Document.findById(documentId);

  if (!doc) throw new Error("Document not found");

  try {

    await Document.findByIdAndUpdate(documentId, {
      status: "processing",
    });

    const pages = await loadPdf(doc.filePath);

    pages.forEach((doc, index) => {
      doc.metadata.pageNumber = index + 1;

      doc.pageContent = normalizeText(doc.pageContent);
    });

    console.log(pages)

    const chunks = await textSplitter.splitDocuments(pages);

    const metadata = chunks.map((chunk) => ({
      chatId: doc.chatId,
      documentId: doc._id,
      pageNumber: chunk.metadata.loc?.pageNumber ?? null,
      source: "pdf",
    }));

    const cleanedChunks = chunks.filter(chunk => {
      const text = chunk.pageContent.toLowerCase();

      return (
        text.length > 200 &&
        !text.includes("lecture notes") &&
        !text.includes("college of engineering") &&
        !text.includes("iso 9001") &&
        !text.includes("approved by aicte")
      );
    });

    const text = cleanedChunks.map(doc => doc.pageContent).join('\n\n');

    await fs.writeFile('./temp.txt', text, 'utf-8');

    const embeddings = await googleEmbeddings.embedDocuments(
      cleanedChunks.map((c) => c.pageContent)
    );

    await storeEmbeddings(embeddings, chunks, metadata);

    await Document.findByIdAndUpdate(documentId, {
      status: "processed",
    });

  } catch (error) {

    await Document.findByIdAndUpdate(documentId, {
      status: "failed",
    });
    throw error;
  }
}

function normalizeText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}