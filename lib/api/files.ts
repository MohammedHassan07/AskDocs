import { apiFetch } from "@/lib/api/client";

export async function uploadPdfFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch("/api/files/upload", {
    method: "POST",
    body: formData,
    headers: {}, // IMPORTANT: browser set boundary
  });
}
