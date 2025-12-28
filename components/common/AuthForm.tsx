"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

type AuthMode = "login" | "register";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const { login, register, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      await login({ email, password });
    } else {
      await register({ name, email, password });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">
          {mode === "login" ? "Login" : "Register"}
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">

          {mode === 'register' &&
            <Input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          }

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />



          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "login" ? "Login" : "Register"}
          </Button>

          <Link href={`${mode === 'login' ? '/register': '/login'} `} >{mode === 'login' ? 'register': 'login'}</Link>
        </form>
      </CardContent>
    </Card>
  );
}
