"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </Sheet>

        <h1 className="text-lg font-semibold">
          ChatPDF AI
        </h1>
      </div>

      <Button variant="ghost" size="sm" className="gap-2">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
