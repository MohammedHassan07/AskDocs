import Image from "next/image";
import DashboardLayout from "@/components/common/dashboard/DashboardLayout";
import ChatWindow from "@/components/common/dashboard/ChatWindow";

import LoginPage from "./(auth)/login/page";
import RegisterPage from "./(auth)/register/page";

export default function Home() {
  return (
    <div>
{/* 
      <DashboardLayout>
        <ChatWindow />
      </DashboardLayout> */}
      {/* <LoginPage /> */}
      <RegisterPage />
    </div>
  );
}
