"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import ChatMessage from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { uploadChatPdf } from "@/services/chat.service";
import { ChatMessageType } from "@/types/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const handleFileUpload = async (file: File) => {
    const tempId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        role: "user",
        type: "file",
        fileName: file.name,
        status: "uploading",
      },
    ]);

    try {
      const fileMessage = await uploadChatPdf(file);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? { ...msg, ...fileMessage, status: "done" }
            : msg
        )
      );

      toast.success("PDF uploaded successfully");
    } catch (error: any) {
      console.log(error)
      toast.error(error.message);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
      </div>

      <div className="border-t p-4">
        <ChatInput onFileSelect={handleFileUpload} />
      </div>
    </div>
  );
}
