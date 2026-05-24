"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Theme } from "@/types";

interface NavbarProps {
  onToggleSidebar?: () => void;
  theme?: Theme;
  onThemeToggle?: () => void;
}

export default function Navbar({ onToggleSidebar, theme = "dark", onThemeToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav 
      className={cn(
        "sticky top-0 h-14 border-b z-40 transition-all duration-200 px-4 sm:px-6 flex items-center justify-between shrink-0",
        theme === "dark" 
          ? "border-zinc-900 bg-zinc-950/80 backdrop-blur-md" 
          : "border-[#E5E7EB] bg-white/70 backdrop-blur-md"
      )}
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className={cn(
              "p-2 rounded-lg transition-colors md:hidden",
              theme === "dark" ? "text-zinc-400 hover:bg-zinc-900" : "text-zinc-600 hover:bg-[#F7F7F8]"
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <div className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg shadow-lg transition-colors duration-200",
            theme === "dark" ? "bg-zinc-800 text-white shadow-white/5" : "bg-zinc-100 text-black shadow-black/5"
          )}>
            <GraduationCap className="h-4 w-4" />
          </div>
          <motion.span 
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "text-sm font-bold tracking-tight transition-all duration-300 group-hover:tracking-normal hidden sm:block",
              theme === "dark" ? "text-white" : "text-[#111827]"
            )}
          >
            EDURENDER
          </motion.span>
        </Link>
      </div>

      {/* Simplified Desktop Navigation Link */}
      <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide">
        <Link 
          href="/" 
          className={cn(
            "transition duration-200 cursor-pointer",
            theme === "dark" ? "text-zinc-400 hover:text-white" : "text-black font-bold"
          )}
        >
          Home
        </Link>
        <Link href="/chat" className="hover:text-indigo-400 text-indigo-300 font-bold transition duration-200 cursor-pointer flex items-center gap-1.5">
          <span>AI Chat</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={onThemeToggle}
          className={cn(
            "p-2 rounded-xl border transition-all duration-300 cursor-pointer",
            theme === "dark" 
              ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white" 
              : "bg-white border-black text-black shadow-sm"
          )}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="flex md:hidden items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900/50 transition cursor-pointer"
          title="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-1 border-b p-6 flex flex-col gap-4 text-sm font-medium z-50 shadow-2xl transition-all duration-500",
              theme === "dark" 
                ? "border-zinc-900 bg-zinc-950/95 backdrop-blur-xl text-zinc-400" 
                : "border-zinc-200 bg-white/95 backdrop-blur-xl text-zinc-600"
            )}
          >
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "py-1.5 transition duration-200 border-b",
                theme === "dark" ? "hover:text-white border-zinc-900/50" : "hover:text-black border-zinc-100"
              )}
            >
              Home
            </Link>
            <Link 
              href="/chat" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white py-1.5 transition duration-200 border-b border-zinc-900/50 flex items-center justify-between"
            >
              <span className="text-indigo-300 font-bold">AI Chat</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
