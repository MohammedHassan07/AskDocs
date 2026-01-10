
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const googleEmbeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
//   apiKey: process.env.GOOGLE_API_KEY!,
});

