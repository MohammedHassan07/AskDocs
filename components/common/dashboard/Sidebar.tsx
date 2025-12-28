"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatList from "./ChatList";

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r flex-col p-3">
        <Button className="mb-4 gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <ChatList />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetContent side="left" className="w-72 p-3">
          <Button className="mb-4 gap-2 w-full">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <ChatList />
        </SheetContent>
      </Sheet>
    </>
  );
}
