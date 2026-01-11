import { PromptTemplate } from "@langchain/core/prompts";

export const ragPrompt = new PromptTemplate({
    template: `
You are a helpful assistant.
Answer the question strictly using the provided context.
If the answer is not in the context, say "I don't know".

Context:
{context}

Question:
{question}

Answer:
`,
    inputVariables: ["context", "question"],
});
