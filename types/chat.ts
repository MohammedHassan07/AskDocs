export type ChatMessageType = {
  id: string;
  role: "user" | "assistant";
  type: "text" | "file";
  content?: string;
  fileName?: string;
  status?: "uploading" | "done";
};
