"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, FileText, ChevronRight, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  siteName: string;
}

interface SourcesPanelProps {
  sources: Source[];
}

export default function SourcesPanel({ sources }: SourcesPanelProps) {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  return (
    <div className="w-full space-y-3">
      {/* Sources Panel Header */}
      <div className="flex items-center gap-2 select-none">
        <Globe className="h-4 w-4 text-zinc-500" />
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Sources
        </h3>
        <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md font-mono">
          {sources.length} sources found
        </span>
      </div>

      {/* Grid of source chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 select-none">
        {sources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedSource(source)}
            className="group flex flex-col justify-between p-3 rounded-xl border border-zinc-900 bg-zinc-950/45 hover:bg-zinc-900/50 hover:border-zinc-800 transition duration-200 cursor-pointer text-left"
          >
            <div>
              {/* Site Name and Citation Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 truncate max-w-[80%] font-medium">
                  {source.siteName}
                </span>
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400 font-semibold group-hover:bg-zinc-800/80 group-hover:text-white transition">
                  {index + 1}
                </span>
              </div>
              {/* Source Title */}
              <h4 className="text-xs font-semibold text-zinc-300 group-hover:text-white line-clamp-2 leading-relaxed">
                {source.title}
              </h4>
            </div>

            {/* Micro action details */}
            <div className="flex items-center gap-1 mt-3 text-[10px] text-zinc-600 group-hover:text-zinc-400 transition">
              <span className="truncate max-w-[85%] font-mono">{new URL(source.url).hostname}</span>
              <ChevronRight className="h-3 w-3 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Snippet Modal Drawer */}
      <AnimatePresence>
        {selectedSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl overflow-hidden glass-panel"
            >
              {/* Card top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSource(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg border border-zinc-900 bg-zinc-950/40 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Source Header details */}
              <div className="space-y-1.5 mt-2">
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">
                  {selectedSource.siteName}
                </span>
                <h3 className="text-base font-semibold text-white leading-snug pt-1">
                  {selectedSource.title}
                </h3>
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:underline transition font-mono pt-1"
                >
                  <span>{selectedSource.url}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Snippet body text */}
              <div className="mt-5 border-t border-zinc-900 pt-4">
                <h4 className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase mb-2">
                  Extracted Context
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-light bg-zinc-900/30 p-4 rounded-xl border border-zinc-900/60 overflow-y-auto max-h-[220px]">
                  "... {selectedSource.snippet} ..."
                </p>
              </div>

              {/* Footer action */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSource(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition cursor-pointer"
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
