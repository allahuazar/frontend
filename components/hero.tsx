"use client";

import { motion } from "framer-motion";
import SearchBox from "./search-box";

interface HeroProps {
  onSearch: (query: string, focusMode: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center max-w-4xl mx-auto w-full select-none">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl text-white/60"
      >
        EDURENDER
      </motion.h1>

      {/* Subdescription */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-xl text-zinc-400"
      >
        Learn smarter with an AI-powered education engine.
      </motion.p>

      {/* Search box container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 w-full max-w-2xl"
      >
        <SearchBox onSearch={onSearch} />
      </motion.div>

      {/* Trust factors or quick instructions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.45 }}
        className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-medium text-zinc-600"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          Multi-Agent Web Reranking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          Interactive Citation Clusters
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          Follow-up Thread Memory
        </span>
      </motion.div>
    </section>
  );
}
