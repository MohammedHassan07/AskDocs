import DashboardLayout from "@/components/common/dashboard/DashboardLayout";
import ChatWindow from "@/components/common/dashboard/ChatWindow";

interface PageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: PageProps) {

  const { chatId } = await params
  return (
    <DashboardLayout>
      <ChatWindow chatId={chatId} />
    </DashboardLayout>
  );
}
