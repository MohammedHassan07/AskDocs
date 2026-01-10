import mongoose, { Schema, Types } from "mongoose";

export interface ChatDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<ChatDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat ||
  mongoose.model<ChatDocument>("Chat", ChatSchema);
