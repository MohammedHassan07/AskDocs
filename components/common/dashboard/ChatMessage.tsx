import { ChatMessageType } from "@/types/chat";

export default function ChatMessage({
  role,
  type,
  content,
  fileName,
}: ChatMessageType) {
  const isUser = role === "user";

  return (
    <div className={`max-w-2xl ${isUser ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`rounded-lg px-4 py-2 text-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {type === "text" && content}
        {type === "file" && (
          <div className="flex items-center gap-2">
            📄 <span>{fileName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
