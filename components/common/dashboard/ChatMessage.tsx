import { ChatMessageType } from "@/types/chat";

export default function ChatMessage({
  role,
  type,
  content,
  fileName,
  status,
}: ChatMessageType) {
  const isUser = role === "user";

  return (
    <div className={`max-w-2xl ${isUser ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`rounded-lg px-4 py-2 text-sm ${
          isUser ? "bg-primary text-white" : "bg-muted"
        }`}
      >
        {type === "file" ? (
          <div>
            📄 {fileName}
            {status === "uploading" && (
              <span className="ml-2 text-xs opacity-70">Uploading...</span>
            )}
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
