import { Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";

export function ChatInput({
  onSend,
  onFileSelect,
}: {
  onSend?: (message: string) => void;
  onFileSelect: (file: File) => void;
}) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim() || !onSend) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-md hover:bg-muted"
      >
        <Paperclip size={18} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
        placeholder="Ask a question..."
        className="flex-1 resize-none rounded-md border p-3"
      />

      <button
        onClick={handleSend}
        disabled={!onSend}
        className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
