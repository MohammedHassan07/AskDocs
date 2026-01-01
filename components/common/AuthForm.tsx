"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register" | "verify-otp";

export default function AuthForm({
  mode,
  userId,
}: {
  mode: AuthMode;
  userId?: string;
}) {
  const router = useRouter();
  const { login, register, verifyOtp, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const validateInputs = () => {
    if (mode === "register" && !name) {
      toast.error("Name is required");
      return false;
    }

    if ((mode === "login" || mode === "register") && (!email || !password)) {
      toast.error("Email and password are required");
      return false;
    }

    if (mode === "verify-otp" && !otp) {
      toast.error("OTP is required");
      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      if (mode === "login") {
        await login({ email, password });
        toast.success("Login successful");
        router.replace("/Dashboard");
      }

      if (mode === "register") {
        const res: any = await register({ name, email, password });
        toast.success("OTP sent to email");
        router.replace(`/verify-otp?userId=${res.userId}`);
      }

      if (mode === "verify-otp") {
        await verifyOtp({ userId: userId!, otp });
        toast.success("Email verified successfully");
        router.replace("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center capitalize">
          {mode.replace("-", " ")}
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">

          {mode === "register" && (
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {(mode === "login" || mode === "register") && (
            <>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {mode === "verify-otp" && (
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>

          {mode === "login" && (
            <Link href="/register" className="block text-center text-sm">
              Don&apos;t have an account? Register
            </Link>
          )}

          {mode === "register" && (
            <Link href="/login" className="block text-center text-sm">
              Already have an account? Login
            </Link>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
