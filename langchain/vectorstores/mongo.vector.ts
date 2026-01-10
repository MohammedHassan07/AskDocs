import { VectorEmbedding } from "@/models/VectorEmbeddings";

export async function storeEmbeddings(
  embeddings: number[][],
  documents: any[],
  metadataList: any[]
) {
  const records = embeddings.map((embedding, i) => ({
    embedding,
    content: documents[i].pageContent,
    metadata: metadataList[i],
  }));

  await VectorEmbedding.insertMany(records);
}
