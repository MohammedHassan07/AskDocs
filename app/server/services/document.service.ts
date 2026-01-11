import { processPdfDocument } from "@/langchain/processPdf";

export async function createDocument(docId: string){
    

  processPdfDocument(docId.toString()).catch(console.error);
}
