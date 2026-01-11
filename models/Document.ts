// models/Document.ts
import mongoose, { Schema, Types } from "mongoose";

interface Document {

  chatId: Types.ObjectId;
  uploadedBy: Types.ObjectId
  originalName: string,
  fileName: string,
  filePath: string,
  mimeType: string,
  size: Number,
  status: string,

  createdAt: string
}

const DocumentSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
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
  mongoose.model<Document>("Document", DocumentSchema);
