import { VectorEmbedding } from "@/models/VectorEmbeddings";
import { Types } from "mongoose";

export async function searchSimilarDocs(
  queryEmbedding: number[],
  chatId?: string
) {
  const vectorSearchStage: any = {
    $vectorSearch: {
      index: "vector_index",
      path: "embedding",
      queryVector: queryEmbedding,
      numCandidates: 100,
      limit: 5,
    },
  };

  if (chatId) {
    vectorSearchStage.$vectorSearch.filter = {
      "metadata.chatId": new Types.ObjectId(chatId),
    };
  }

  const pipeline = [
    vectorSearchStage,
    {
      $project: {
        content: 1,
        metadata: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ];

  return VectorEmbedding.aggregate(pipeline);
}
