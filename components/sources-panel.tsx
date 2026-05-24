"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Source } from "@/types";

interface SourcesPanelProps {
  sources: Source[];
  theme?: "dark" | "light";
}

export default function SourcesPanel({ sources, theme = "dark" }: SourcesPanelProps) {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  return (
    <div className="w-full space-y-3">
      {/* Sources Panel Header */}
      <div className="flex items-center gap-2 select-none transition-colors duration-200">
        <Globe className={cn("h-4 w-4", theme === "dark" ? "text-zinc-500" : "text-[#111827]")} />
        <h3 className={cn("text-xs font-semibold uppercase tracking-wider", theme === "dark" ? "text-zinc-400" : "text-[#111827]")}>
          Sources
        </h3>
        <span className={cn(
          "text-[10px] border px-1.5 py-0.5 rounded-md font-mono transition-all",
          theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-[#F7F7F8] border-[#E5E7EB] text-zinc-500"
        )}>
          {sources.length} sources found
        </span>
      </div>

      {/* Grid of source cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 select-none">
        {sources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedSource(source)}
            className={cn(
              "group flex flex-col justify-between rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden",
              theme === "dark" 
                ? "border-zinc-900 bg-zinc-950/45 hover:bg-zinc-900/50 hover:border-zinc-800" 
                : "border-[#E5E7EB] bg-[#F7F7F8] hover:bg-[#E5E7EB]/50 hover:shadow-sm"
            )}
          >
            <div className="flex flex-col gap-1 p-3 h-full">
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "h-4 w-4 rounded flex items-center justify-center shrink-0",
                  theme === "dark" ? "bg-zinc-800" : "bg-white border border-[#E5E7EB]"
                )}>
                  {source.favicon ? (
                    <img src={source.favicon} alt="" className="h-2.5 w-2.5" />
                  ) : (
                    <Globe className="h-2.5 w-2.5 text-zinc-500" />
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium truncate",
                  theme === "dark" ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-500 group-hover:text-[#111827]"
                )}>
                  {source.siteName}
                </span>
              </div>
              <h4 className={cn(
                "text-[11px] font-semibold line-clamp-2 leading-snug",
                theme === "dark" ? "text-zinc-200 group-hover:text-white" : "text-[#111827]"
              )}>
                {source.title}
              </h4>
            </div>
            
            <div className="px-3 pb-3 flex items-center gap-1 text-[9px] text-zinc-500">
               <span className="truncate max-w-[85%] font-mono opacity-60">
                 {(() => {
                   try { return new URL(source.url).hostname; } catch(e) { return source.url; }
                 })()}
               </span>
               <ChevronRight className="h-2.5 w-2.5 shrink-0 opacity-40" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Snippet Modal Drawer */}
      <AnimatePresence>
        {selectedSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative w-full max-w-lg rounded-[24px] border p-6 shadow-2xl overflow-hidden transition-all duration-200",
                theme === "dark" ? "border-zinc-800 bg-zinc-950" : "border-[#E5E7EB] bg-white"
              )}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSource(null)}
                className={cn(
                  "absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition cursor-pointer",
                  theme === "dark" ? "bg-zinc-800 text-zinc-400 hover:text-white" : "bg-[#F7F7F8] text-zinc-500 hover:text-[#111827]"
                )}
              >
                <X className="h-4 w-4" />
              </button>

              {/* Source Header details */}
              <div className="space-y-1.5 mt-2 transition-colors duration-200">
                <span className={cn(
                  "text-[10px] border px-2 py-0.5 rounded-full font-mono transition-all",
                  theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-[#F7F7F8] text-zinc-600 border-[#E5E7EB]"
                )}>
                  {selectedSource.siteName}
                </span>
                <h3 className={cn(
                  "text-base font-semibold leading-snug pt-1 transition-colors",
                  theme === "dark" ? "text-white" : "text-[#111827]"
                )}>
                  {selectedSource.title}
                </h3>
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs transition font-mono pt-1",
                    theme === "dark" ? "text-zinc-400 hover:text-white" : "text-indigo-600 hover:underline"
                  )}
                >
                  <span className="truncate max-w-[280px]">{selectedSource.url}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Snippet body text */}
              <div className={cn("mt-5 border-t pt-4 transition-all duration-200", theme === "dark" ? "border-zinc-900" : "border-zinc-100")}>
                <h4 className={cn("text-[10px] font-semibold tracking-wider uppercase mb-2", theme === "dark" ? "text-zinc-500" : "text-zinc-400")}>
                  Extracted Context
                </h4>
                <p className={cn(
                  "text-sm leading-relaxed font-normal p-4 rounded-xl border overflow-y-auto max-h-[220px] transition-all",
                  theme === "dark" ? "bg-zinc-900/30 text-zinc-300 border-zinc-900/60" : "bg-[#F7F7F8] text-[#111827] border-[#E5E7EB]"
                )}>
                  {selectedSource.snippet}
                </p>
              </div>

              {/* Footer action */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSource(null)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer",
                    theme === "dark" ? "bg-white text-black hover:bg-zinc-200" : "bg-[#111827] text-white hover:bg-black"
                  )}
                >
                  Close context
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
