import { apiFetch } from "@/lib/api/client";
import { ChatMessageType } from "@/types/chat";

export async function uploadChatPdf(chatId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/chat/${chatId}/upload`, {
    method: "POST",
    body: formData,
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    if (contentType?.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.message);
    }
    throw new Error("Upload failed");
  }

  if (!contentType?.includes("application/json")) {
    throw new Error("Invalid server response");
  }

  return res.json();
}


export async function getChatMessages(chatId: string) {
  return apiFetch<ChatMessageType[]>(`/api/chat/${chatId}/messages`);
}

export async function sendChatMessage(
  chatId: string,
  data: {}
) {

  return apiFetch<ChatMessageType>(`/api/chat/${chatId}/messages`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
