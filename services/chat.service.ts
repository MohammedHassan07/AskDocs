export async function uploadChatPdf(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/chat/upload", {
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
