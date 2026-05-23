"use client";

import { motion } from "framer-motion";
import { GraduationCap, Terminal, ArrowUpRight } from "lucide-react";
import Link from "next/link";


export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full items-center justify-between px-8 py-5 border-b border-zinc-900/30 bg-black/10 backdrop-blur-[2px] select-none"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner">
          <GraduationCap className="h-4.5 w-4.5 text-zinc-100 animate-pulse" />
        </div>
        <div className="text-xl font-semibold tracking-wide text-white/70">
          EDURENDER
        </div>
      </div>

      <div className="flex items-center gap-8 text-xs font-semibold tracking-wide text-zinc-400">
        <Link href="/" className="hover:text-white transition duration-200 cursor-pointer">
          Home
        </Link>
        <Link href="/chat" className="hover:text-indigo-400 text-indigo-300 font-bold transition duration-200 cursor-pointer flex items-center gap-1.5">
          <span>AI Chat</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </Link>
        <button className="hover:text-white transition duration-200 cursor-pointer">
          Features
        </button>
        <button className="hover:text-white transition duration-200 cursor-pointer">
          Docs
        </button>
        <button className="hover:text-white transition duration-200 cursor-pointer">
          Pricing
        </button>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition duration-200 cursor-pointer"
        >
          <span>Repository</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </motion.nav>
  );
}
