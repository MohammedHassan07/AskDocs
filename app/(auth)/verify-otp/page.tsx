import AuthForm from "@/components/common/AuthForm";
import { redirect } from "next/navigation";

interface VerifyOtpPageProps {
    searchParams: {
        userId?: string;
    };
}

export default async function VerifyOtpPage({ searchParams }: VerifyOtpPageProps) {

    const { userId } = await searchParams;

    console.log(userId)
    if (!userId) {
        redirect("/register");
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <AuthForm mode="verify-otp" userId={userId} />
        </div>
    );
}
