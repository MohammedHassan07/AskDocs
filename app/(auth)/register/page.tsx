import AuthForm from "@/components/common/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <AuthForm mode="register" />
    </div>
  );
}
