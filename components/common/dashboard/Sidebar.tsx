"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatList from "./ChatList";
export const dummyChats = [
  {
    _id: "696221878827e2d267433e11", // your specified ID
    title: "Intro to Data Science",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "696221878827e2d267433e12",
    title: "Medical Report",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "696221878827e2d267433e13",
    title: "Research Paper",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "696221878827e2d267433e14",
    title: "Meeting Notes",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "696221878827e2d267433e15",
    title: "Project Proposal",
    updatedAt: new Date().toISOString(),
  },
];


export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r flex-col p-3">
        <Button className="mb-4 gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <ChatList chats={dummyChats} />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetContent side="left" className="w-72 p-3">
          <Button className="mb-4 gap-2 w-full">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <ChatList chats={dummyChats} />
        </SheetContent>
      </Sheet>
    </>
  );
}
