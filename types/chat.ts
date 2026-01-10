export type ChatMessageType = {
  id: string;
  role: "user" | "assistant";
  type: "text" | "file";
  content?: string;
  fileName?: string;
  status?: | "sending"
  | "uploading"
  | "done"
  | "failed";
};

export interface ChatSummary {
  _id: string;
  title: string;
  updatedAt: string;
}

