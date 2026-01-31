"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ChatMessage from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import {
  getChatMessages,
  sendChatMessage,
  uploadChatPdf,
} from "@/services/chat.service";
import { ChatMessageType } from "@/types/chat";

export default function ChatWindow({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load chat history
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  const handleSendText = async (text: string) => {
    const tempId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        role: "user",
        type: "text",
        content: text,
      },
    ]);

    try {
      // 2️⃣ Send to backend (backend returns AI message ONLY)
      const assistantMessage = await sendChatMessage(chatId, {
        role: "user",
        type: "text",
        content: text,
      });

      // 3️⃣ Append AI message (IMPORTANT)
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      toast.error("Message failed");
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };


  // ✅ FILE MESSAGE
  const handleSendFile = async (file: File) => {
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
      const savedMessage = await uploadChatPdf(chatId, file);

      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? savedMessage : m))
      );

      toast.success("PDF uploaded");
    } catch {
      toast.error("Upload failed");
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  if (loading) return <p className="p-4">Loading chat...</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
      </div>

      <div className="border-t p-4">
        <ChatInput
          onSend={handleSendText}
          onFileSelect={handleSendFile}
        />
      </div>
    </div>
  );
}
