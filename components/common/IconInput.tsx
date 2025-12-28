"use client";

import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface IconInputProps {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
}

export default function IconInput({
  icon: Icon,
  type = "text",
  placeholder,
}: IconInputProps) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        type={type}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}
