import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <ChatMessage role="user" content="Explain this PDF" />
        <ChatMessage role="assistant" content="Sure! This document talks about..." />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <textarea
          placeholder="Ask a question..."
          className="w-full resize-none rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={2}
        />
      </div>
    </div>
  );
}
