import { getChatMessages } from "../../../../server/services/chat.service";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { addMessageToChat } from "../../../../server/services/chat.service";
import { getAuthUser } from "@/app/lib/auth";


export async function GET(
    req: Request,
   { params }: { params: Promise<{ chatId: string }> }
) {
    await connectDB();

    const { chatId } = await params;

    const user = await getAuthUser();
    // if (!user) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const messages = await getChatMessages(chatId);
    return NextResponse.json(messages);
}

export async function POST(
    req: Request,
   
   { params }: { params: Promise<{ chatId: string }> }
) {
    await connectDB();
    const { chatId } = await params;


    const user = await getAuthUser();
    //   if (!user) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //   }

    const body = await req.json();
    console.log(body)
    
    const message = await addMessageToChat({
        chatId: chatId,
        role: body.role,
        type: body.type,
        content: body.content,
        fileName: body.fileName,
        filePath: body.filePath,
    });

    return NextResponse.json(message);
}
