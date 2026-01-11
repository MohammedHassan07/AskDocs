import { googleEmbeddings } from "./google.embeddings";

export async function embedQuery(query: string) {
  return googleEmbeddings.embedQuery(query);
}
