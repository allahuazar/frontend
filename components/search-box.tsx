"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Globe, GraduationCap, Code, PenTool, Play, Plus, Mic, ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  onSearch: (query: string, focusMode: string) => void;
  placeholder?: string;
  initialValue?: string;
  isCompact?: boolean;
  theme?: "dark" | "light";
}

const FOCUS_MODES = [
  { id: "all", name: "All", icon: Globe, description: "Search the entire web" },
];

export default function SearchBox({
  onSearch,
  placeholder = "Ask Edurender",
  initialValue = "",
  isCompact = false,
  theme = "dark",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea heights to feel like a high-quality editor
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), selectedFocus);
      setQuery("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={containerRef}
      className={cn(
        "group w-full transition-all duration-300",
        isCompact 
          ? "rounded-full border px-3 py-1.5 flex items-center gap-2"
          : "rounded-[26px] border flex items-center gap-2 transition-all duration-300",
        theme === "dark" 
          ? "border-zinc-800/40 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl" 
          : "border-[#E5E7EB] bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:border-indigo-500/30"
      )}
    >
      <div className={cn(
        "flex items-center w-full gap-2",
        isCompact ? "px-1" : "px-3 py-1.5"
      )}>
        {/* Plus Button - Left side */}
        <button
          type="button"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer shrink-0",
            theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:bg-[#F7F7F8] hover:text-[#111827]"
          )}
          title="Add files and more"
        >
          <Plus className="h-5 w-5" />
        </button>

        {/* Dynamic Textarea */}
        <div className="flex-1 min-w-0 py-2">
          <textarea
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent text-[15px] outline-none resize-none min-h-[26px] max-h-[200px] font-sans leading-relaxed transition-colors duration-200 py-1.5",
              theme === "dark" ? "text-white/90 placeholder:text-white/30" : "text-[#111827] placeholder:text-zinc-400",
              isCompact ? "h-6 py-0.5" : ""
            )}
          />
        </div>

        {/* Action Buttons - Right side */}
        <div className="flex items-center gap-1 shrink-0">
          {!isCompact && (
            <button
              type="button"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer",
                theme === "dark" ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-500 hover:bg-[#F7F7F8] hover:text-[#111827]"
              )}
              title="Start dictation"
            >
              <Mic className="h-4.5 w-4.5" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim()}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 active:scale-90 disabled:opacity-20 disabled:grayscale disabled:pointer-events-none cursor-pointer",
              theme === "dark" ? "bg-white text-black" : "bg-[#111827] text-white shadow-lg shadow-black/10"
            )}
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </form>
  );
}
