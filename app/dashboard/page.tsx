import DashboardLayout from "@/components/common/dashboard/DashboardLayout";
import ChatWindow from "@/components/common/dashboard/ChatWindow";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ChatWindow chatId="jdf" />
    </DashboardLayout>
  );
}
