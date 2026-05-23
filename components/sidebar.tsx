"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  Compass, 
  Library, 
  ChevronLeft, 
  ChevronRight, 
  Globe,
  Terminal,
  HelpCircle,
  TrendingUp,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


interface Thread {
  id: string;
  title: string;
  date: string;
}

interface SidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
}

export default function Sidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative flex h-screen flex-col border-r border-zinc-900 bg-zinc-950/65 backdrop-blur-xl z-20 shrink-0 select-none",
        isCollapsed ? "items-center" : "px-4"
      )}
    >
      {/* Brand Header */}
      <div className={cn(
        "flex h-20 items-center justify-between",
        isCollapsed ? "justify-center w-full" : "px-2"
      )}>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <GraduationCap className="h-5 w-5 text-zinc-100 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-white">
              EDURENDER
            </span>
          </motion.div>
        )}
        {isCollapsed && (
          <GraduationCap className="h-6 w-6 text-white hover:scale-105 transition-transform" onClick={onNewThread} />
        )}
      </div>

      {/* New Thread Button */}
      <div className={cn("mb-6", isCollapsed ? "px-1" : "px-2")}>
        <Button
          onClick={onNewThread}
          variant="outline"
          className={cn(
            "w-full rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition duration-200 flex items-center justify-center gap-2",
            isCollapsed ? "h-11 w-11 p-0 rounded-full" : "h-11 justify-start px-4"
          )}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span className="text-xs font-medium">New Thread</span>}
        </Button>
      </div>

      {/* Navigation Library Link List */}
      {!isCollapsed && (
        <div className="px-2 mb-6 space-y-1.5">
          <Link href="/chat" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-indigo-400 hover:text-indigo-200 bg-indigo-950/20 border border-indigo-950 hover:bg-indigo-950/40 hover:border-indigo-800/50 transition text-left text-xs font-medium cursor-pointer">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              <span>Chat Workspace</span>
            </div>
            <span className="text-[9px] bg-indigo-500 text-white font-mono px-1 py-0.2 rounded font-bold">NEW</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/30 transition text-left text-xs font-medium">
            <Compass className="h-4 w-4 text-zinc-500" />
            <span>Discover</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/30 transition text-left text-xs font-medium">
            <Library className="h-4 w-4 text-zinc-500" />
            <span>Library</span>
          </button>
        </div>
      )}

      {/* Chat History Section */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {!isCollapsed && threads.length > 0 && (
          <p className="px-3 text-[10px] font-semibold tracking-wider text-zinc-600 uppercase mb-2">
            Recent Threads
          </p>
        )}
        <div className="space-y-1">
          {threads.map((thread) => {
            const isActive = thread.id === activeThreadId;
            return (
              <button
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl transition duration-200 text-left",
                  isCollapsed ? "h-11 w-11 justify-center p-0 rounded-full" : "px-3 py-2.5",
                  isActive
                    ? "bg-zinc-900/80 text-white border border-zinc-800"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30 border border-transparent"
                )}
              >
                <MessageSquare className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-zinc-500")} />
                {!isCollapsed && (
                  <span className="text-xs truncate block font-medium">
                    {thread.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle Sidebar Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[50%] h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition z-50 cursor-pointer shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Footer Navigation */}
      <div className={cn(
        "border-t border-zinc-900 py-4 flex flex-col gap-1",
        isCollapsed ? "items-center w-full" : "px-2"
      )}>
        <button className={cn(
          "flex items-center gap-3 text-zinc-500 hover:text-zinc-300 transition text-left text-xs font-medium rounded-lg",
          isCollapsed ? "h-10 w-10 justify-center p-0" : "px-3 py-2"
        )}>
          <HelpCircle className="h-4 w-4" />
          {!isCollapsed && <span>Help</span>}
        </button>
        <button className={cn(
          "flex items-center gap-3 text-zinc-500 hover:text-zinc-300 transition text-left text-xs font-medium rounded-lg",
          isCollapsed ? "h-10 w-10 justify-center p-0" : "px-3 py-2"
        )}>
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </motion.aside>
  );
}
