"use client";

import { motion } from "framer-motion";
import SearchBox from "./search-box";
import { cn } from "@/lib/utils";
import { Theme } from "@/types";

interface HeroProps {
  onSearch: (query: string, focusMode: string) => void;
  theme?: Theme;
}

export default function Hero({ onSearch, theme = "dark" }: HeroProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-start px-6 pt-6 pb-12 text-center max-w-4xl mx-auto w-full select-none">
      <div className={cn(
      "flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 transition-colors duration-200",
      theme === "dark" ? "text-white" : "text-[#111827]"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-7xl text-center space-y-8"
      >
        <div className="relative group pt-4">
          <SearchBox onSearch={onSearch} theme={theme} />
        </div>

      </motion.div>
    </div>
    </section>
  );
}
