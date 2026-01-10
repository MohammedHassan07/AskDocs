import { Schema, model, models } from "mongoose";

const VectorEmbeddingSchema = new Schema(
  {
    embedding: {
      type: [Number],
      required: true,
      index: "2dsphere", // or vector index if using Atlas
    },
    content: String,
    metadata: {
      chatId: Schema.Types.ObjectId,
      documentId: Schema.Types.ObjectId,
      pageNumber: Number,
      source: String,
    },
  },
  { timestamps: true }
);

export const VectorEmbedding =
  models.VectorEmbedding || model("VectorEmbedding", VectorEmbeddingSchema);
