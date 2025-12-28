interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-2xl ${
        isUser ? "ml-auto text-right" : "mr-auto"
      }`}
    >
      <div
        className={`inline-block px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
