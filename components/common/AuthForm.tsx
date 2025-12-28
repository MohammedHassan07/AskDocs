"use client";

import Link from "next/link";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";
import IconInput from "@/components/common/IconInput";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";

  return (
    <AuthLayout
      title={isLogin ? "Welcome Back" : "Create Account"}
      subtitle={
        isLogin
          ? "Sign in to your account"
          : "Sign up to get started"
      }
    >
      {/* Name - only for register */}
      {!isLogin && (
        <IconInput
          icon={User}
          placeholder="Full name"
        />
      )}

      {/* Email */}
      <IconInput
        icon={Mail}
        type="email"
        placeholder="Email address"
      />

      {/* Password */}
      <IconInput
        icon={Lock}
        type="password"
        placeholder="Password"
      />

      {/* Submit */}
      <Button className="w-full gap-2">
        {isLogin ? (
          <>
            <LogIn className="h-4 w-4" />
            Login
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Register
          </>
        )}
      </Button>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </p>
    </AuthLayout>
  );
}
