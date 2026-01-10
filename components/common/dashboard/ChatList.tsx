"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatSummary} from "@/types/chat";

interface ChatListProps {
  chats: ChatSummary[];
  // onNewChat?: () => void;
}

export default function ChatList({ chats }: ChatListProps) {
  const params = useParams();
  const activeChatId = params.chatId as string | undefined;

  return (
    <div className="space-y-1 overflow-y-auto">
      {chats.map((chat) => {
        const isActive = chat._id === activeChatId;

        return (
          <Link
            key={chat._id}
            href={`/dashboard/chat/${chat._id}`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition",
              "hover:bg-muted",
              isActive && "bg-muted font-medium"
            )}
          >
            <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{chat.title}</span>
          </Link>
        );
      })}

      {chats.length === 0 && (
        <p className="text-xs text-muted-foreground px-3 py-2">
          No chats yet
        </p>
      )}
    </div>
  );
}
