import { MessageSquare } from "lucide-react";

const dummyChats = [
  "Invoice PDF Analysis",
  "Medical Report",
  "Research Paper",
  "Meeting Notes",
];

export default function ChatList() {
  return (
    <div className="space-y-2 overflow-y-auto">
      {dummyChats.map((chat, idx) => (
        <button
          key={idx}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition"
        >
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{chat}</span>
        </button>
      ))}
    </div>
  );
}
