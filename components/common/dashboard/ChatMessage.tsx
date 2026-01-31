import { ChatMessageType } from "@/types/chat";
import { useEffect, useRef } from "react";


export default function ChatMessage({
  role,
  type,
  content,
  fileName,
}: ChatMessageType) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [content]);

  const isUser = role === "user";

  return (
    <div className="w-full flex">
      <div
        className={`max-w-2xl rounded-lg px-4 py-2 text-sm ${isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted"
          }`}
      >
        {type === "text" && content}

        {type === "file" && (
          <div className="flex items-center gap-2">
            📄 <span>{fileName}</span>
          </div>
        )}
      </div>
      <div ref={bottomRef} />

    </div>
  );
}
