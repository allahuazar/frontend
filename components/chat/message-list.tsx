"use client";

import React from "react";
import { ChatTurn } from "@/types";
import MessageTurn from "./message-turn";

interface MessageListProps {
  turns: ChatTurn[];
  theme?: "dark" | "light";
  onCopy: (id: string, content: string) => void;
  copiedId: string | null;
}

export default function MessageList({ 
  turns, 
  theme = "dark", 
  onCopy, 
  copiedId 
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-8 scrollbar-none">
      {turns.map((turn) => (
        <MessageTurn
          key={turn.id}
          turn={turn}
          theme={theme}
          onCopy={onCopy}
          copiedId={copiedId}
        />
      ))}
    </div>
  );
}
