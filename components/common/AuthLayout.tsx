import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
