import { loadPdf } from "./loaders/pdf.loader";
import { textSplitter } from "./splitters/text.splitter";
import { googleEmbeddings } from "./embeddings/google.embeddings";
import { storeEmbeddings } from "./vectorstores/mongo.vector";
import Document  from "@/models/Document";

export async function processPdfDocument(documentId: string) {

  const doc = await Document.findById(documentId);

  if (!doc) throw new Error("Document not found");

  try {

    await Document.findByIdAndUpdate(documentId, {
      status: "processing",
    });

    const pages = await loadPdf(doc.filePath);

    const chunks = await textSplitter.splitDocuments(pages);

    const metadata = chunks.map((chunk) => ({
      chatId: doc.chatId,
      documentId: doc._id,
      pageNumber: chunk.metadata.loc?.pageNumber ?? null,
      source: "pdf",
    }));

    const embeddings = await googleEmbeddings.embedDocuments(
      chunks.map((c) => c.pageContent)
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
