"use client";

import React from "react";
import { Sparkles, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatTurn, Source } from "@/types";
import MarkdownAnswer from "./markdown-answer";
import SourcesPanel from "../sources-panel";

interface MessageTurnProps {
  turn: ChatTurn;
  theme?: "dark" | "light";
  onCopy: (id: string, content: string) => void;
  copiedId: string | null;
}

export default function MessageTurn({ 
  turn, 
  theme = "dark", 
  onCopy, 
  copiedId 
}: MessageTurnProps) {
  const isUser = turn.role === "user";

  return (
    <div className={cn(
      "w-full max-w-3xl mx-auto flex flex-col gap-3",
      isUser ? "border-b border-zinc-900/40 pb-5" : ""
    )}>
      {/* Turn Author Info */}
      <div className="flex items-center gap-2 select-none">
        <div className={cn(
          "flex h-6 w-6 items-center justify-center rounded-lg border text-[10px] font-bold shadow-sm",
          isUser 
            ? "bg-zinc-900 border-zinc-800 text-zinc-300"
            : "bg-white border-zinc-200 text-black"
        )}>
          {isUser ? "U" : <Sparkles className="h-3 w-3" />}
        </div>
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
          {isUser ? "Query" : "EDURENDER Answer"}
        </span>
        {isUser && turn.focusMode && (
          <span className={cn(
            "text-[9px] border px-1.5 py-0.5 rounded-full font-mono font-medium capitalize",
            theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-white border-zinc-100 text-zinc-400"
          )}>
            Focus: {turn.focusMode}
          </span>
        )}
      </div>

      {/* Turn Content */}
      <div className="pl-2 sm:pl-8">
        {isUser ? (
          <div className={cn(
            "inline-block rounded-2xl px-4 py-2.5 shadow-sm font-medium text-sm leading-relaxed max-w-[95%] sm:max-w-[90%] select-text transition-all",
            theme === "dark" ? "bg-white/85 text-black/70" : "bg-black text-white"
          )}>
            {turn.content}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Render static sources inside turn */}
            {turn.sources && turn.sources.length > 0 && (
              <SourcesPanel sources={turn.sources} theme={theme} />
            )}
            
            {/* Format detailed markdown syntheses */}
            <div className={cn(
              "rounded-2xl shadow-sm select-text transition-all duration-200",
              theme === "dark" 
                ? "bg-zinc-900/40 border border-zinc-800/40 p-4 sm:p-5 backdrop-blur-xl" 
                : "bg-[#F7F7F8] border border-[#E5E7EB] p-5 sm:p-6"
            )}>
              <MarkdownAnswer content={turn.content} sources={turn.sources || []} theme={theme} />
            </div>
          </div>
        )}
      </div>

      {/* Assistant Feedback / Copy Actions */}
      {!isUser && (
        <div className="flex items-center gap-4 pl-2 sm:pl-8 pt-2 select-none">
          <button 
            onClick={() => onCopy(turn.id, turn.content)}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
          >
            {copiedId === turn.id ? (
              <>
                <Check className="h-3 w-3 text-emerald-500 animate-scale" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer">
            <ThumbsUp className="h-3 w-3" />
          </button>
          <button className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer">
            <ThumbsDown className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
