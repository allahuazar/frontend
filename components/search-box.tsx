"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Globe, GraduationCap, Code, PenTool, Play, FileUp, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  onSearch: (query: string, focusMode: string) => void;
  placeholder?: string;
  initialValue?: string;
  isCompact?: boolean;
}

const FOCUS_MODES = [
  { id: "all", name: "All", icon: Globe, description: "Search the entire web" },
  { id: "academic", name: "Academic", icon: GraduationCap, description: "Search peer-reviewed papers" },
  { id: "code", name: "Code", icon: Code, description: "Search github & coding docs" },
  { id: "writing", name: "Writing", icon: PenTool, description: "Generate text without search" },
  { id: "youtube", name: "YouTube", icon: Play, description: "Search inside videos" },
];

export default function SearchBox({
  onSearch,
  placeholder = "Ask EDURENDER anything...",
  initialValue = "",
  isCompact = false,
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
        "group w-full transition duration-300",
        isCompact 
          ? "rounded-xl border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-2xl px-3 py-2 flex items-center gap-2"
          : "rounded-2xl border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-2xl p-4 flex flex-col gap-3"
      )}
    >
      <div className="flex items-start w-full gap-3">
        {!isCompact && (
          <div className="mt-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950/40 border border-zinc-900/30">
            <Sparkles className="h-3.5 w-3.5 text-zinc-500 group-focus-within:text-white/60 transition duration-200" />
          </div>
        )}

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
            "w-full bg-transparent text-sm text-white/40 placeholder:text-white/20 outline-none resize-none min-h-[20px] max-h-[200px] font-sans leading-relaxed pt-1.5",
            isCompact ? "h-7 pt-1" : ""
          )}
        />

        {isCompact && (
          <button
            type="submit"
            disabled={!query.trim()}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer shrink-0"
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {!isCompact && (
        <div className="flex flex-wrap items-center justify-between border-t border-zinc-900/60 pt-3 mt-1 select-none">
          {/* Focus Modes list */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {FOCUS_MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedFocus === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedFocus(mode.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200",
                    isSelected
                      ? "bg-zinc-800/80 text-white border border-zinc-700/50 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border border-transparent"
                  )}
                  title={mode.description}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{mode.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right utility buttons: Attach and Search submit */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition duration-200 cursor-pointer"
              title="Attach screenshot or document"
            >
              <FileUp className="h-4 w-4" />
            </button>

            <button
              type="submit"
              disabled={!query.trim()}
              className={cn(
                "flex h-9 px-4 items-center gap-1.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition duration-200 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:pointer-events-none cursor-pointer"
              )}
            >
              <span>Search</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
