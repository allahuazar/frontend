"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Source } from "@/types";

interface MarkdownAnswerProps {
  content: string;
  sources: Source[];
  theme?: "dark" | "light";
}

export default function MarkdownAnswer({ 
  content, 
  sources, 
  theme = "dark" 
}: MarkdownAnswerProps) {
  
  const renderFormattedAnswer = (text: string, currentSources: Source[]) => {
    const parts = text.split(/(\[\d+\])/g);
    
    return parts.map((part, index) => {
      const citationMatch = part.match(/\[(\d+)\]/);
      if (citationMatch) {
        const sourceId = citationMatch[1];
        return (
          <span 
            key={index}
            className={cn(
              "inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full border mx-0.5 cursor-help transition-all",
              theme === "dark" 
                ? "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white" 
                : "bg-white border-black text-black"
            )}
            title={currentSources.find(s => s.id === sourceId)?.title || `Source ${sourceId}`}
          >
            {sourceId}
          </span>
        );
      }

      // Simple Markdown-like formatting for bold/lists
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className={theme === "dark" ? "text-white" : "text-black"}>{part.slice(2, -2)}</strong>;
      }
      
      if (part.startsWith("# ")) {
        return <h1 key={index} className={cn("text-xl font-bold mt-4 mb-2", theme === "dark" ? "text-white" : "text-black")}>{part.slice(2)}</h1>;
      }
      
      if (part.startsWith("## ")) {
        return <h2 key={index} className={cn("text-lg font-bold mt-4 mb-2", theme === "dark" ? "text-zinc-100" : "text-black")}>{part.slice(3)}</h2>;
      }

      // Handle blockquotes/lists
      if (part.startsWith("- ")) {
        return <li key={index} className="ml-4 list-disc">{part.slice(2)}</li>;
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={cn(
      "prose prose-sm max-w-none leading-relaxed font-normal antialiased",
      theme === "dark" 
        ? "prose-invert text-zinc-300" 
        : "prose-slate text-[#111827] prose-headings:text-[#111827] prose-strong:text-[#111827] prose-code:text-[#111827]"
    )}>
      {renderFormattedAnswer(content, sources)}
    </div>
  );
}
