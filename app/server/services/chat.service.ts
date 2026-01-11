import Chat from "@/models/Chat";
import Message from "@/models/Message";
import { Types } from "mongoose";
import { embedQuery } from "../../../langchain/embeddings/query.embeddings";
import { searchSimilarDocs } from "../../../langchain/vectorstores/vectorSearch";
import { buildContext } from "../../../langchain/context/buildContext";
import { llm } from "../../../langchain/LLM/googleGenAI";
import { ragPrompt } from "../../../langchain/prompts/rag.prompt";

export async function createChat(userId: string, title?: string) {
  return Chat.create({
    userId,
    title: title || "New Chat",
  });
}

export async function getUserChats(userId: string) {
  return Chat.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();
}

export async function getChatMessages(chatId: string) {
  return Message.find({ chatId })
    .sort({ createdAt: 1 })
    .lean();
}

export async function addMessageToChat({
  chatId,
  role,
  type,
  content,
  fileName,
  filePath,
}: {
  chatId: string;
  role: "user" | "assistant";
  type: "text" | "file";
  content?: string;
  fileName?: string;
  filePath?: string;
}) {
  return Message.create({
    chatId: new Types.ObjectId(chatId),
    role,
    type,
    content,
    fileName,
    filePath,
  });
}

export async function askQuestionAndSave({
  chatId,
  question,
}: {
  chatId: string;
  question: string;
}) {

  const queryEmbedding = await embedQuery(question);

  const docs = await searchSimilarDocs(queryEmbedding, chatId);

  let answer = "I don't know";

  if (docs.length) {
    const context = buildContext(docs);

    const prompt = await ragPrompt.format({
      context,
      question,
    });

    const response = await llm.invoke(prompt);
    
    if (typeof response.content === "string") {
      answer = response.content;
    } else {
      answer = response.content
        .map((block: any) => block.text ?? "")
        .join("");
    }
  }

  const aiMessage = await addMessageToChat({
    chatId,
    role: "assistant",
    type: "text",
    content: answer,
  });

  return aiMessage;
}

