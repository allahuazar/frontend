"use client";

import React from "react";
import { Menu, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  theme?: "dark" | "light";
  onToggleSidebar?: () => void;
  onReset: () => void;
}

export default function ChatHeader({ 
  theme = "dark", 
  onToggleSidebar, 
  onReset 
}: ChatHeaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-between border-b px-4 sm:px-8 h-14 z-10 shrink-0 transition-all duration-200",
      theme === "dark" 
        ? "border-zinc-900 bg-zinc-950/20 backdrop-blur-md" 
        : "border-[#E5E7EB] bg-white/70 backdrop-blur-md"
    )}>
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className={cn(
              "p-2 rounded-lg transition md:hidden",
              theme === "dark" ? "text-zinc-400 hover:bg-zinc-900" : "text-zinc-600 hover:bg-[#F7F7F8]"
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className={cn(
          "text-[10px] font-bold uppercase tracking-[0.1em]",
          theme === "dark" ? "text-zinc-500" : "text-zinc-400"
        )}>
          Conversation History
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 active:scale-95",
            theme === "dark" 
              ? "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white" 
              : "border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F7F7F8] shadow-sm"
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New</span>
        </button>
      </div>
    </div>
  );
}
