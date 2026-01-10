import mongoose, { Schema, Types } from "mongoose";

export type MessageRole = "user" | "assistant";
export type MessageType = "text" | "file";

export interface MessageDocument {
  _id: Types.ObjectId;
  chatId: Types.ObjectId;
  role: MessageRole;
  type: MessageType;
  content?: string;
  fileName?: string;
  filePath?: string;
  createdAt: Date;
}

const MessageSchema = new Schema(
  {
    chatId: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "file"],
      required: true,
    },
    content: String,

    documentId: {
      type: Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", MessageSchema);
