// models/Document.ts
import mongoose, { Schema, Types } from "mongoose";

const DocumentSchema = new Schema(
  {
    chatId: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    uploadedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: String,
    fileName: String,
    filePath: String,
    mimeType: String,
    size: Number,
    status: {
      type: String,
      enum: ["uploaded", "processed"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
