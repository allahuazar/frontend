"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Thread, Theme } from "@/types";
import { useWindowSize } from "@/hooks/use-window-size";

interface SidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  theme?: Theme;
}

export default function Sidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
  isMobileOpen = false,
  onCloseMobile,
  theme = "dark"
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile, isTablet } = useWindowSize();

  // Auto-collapse sidebar on tablet view
  useEffect(() => {
    if (isTablet && !isMobile) {
      setIsCollapsed(true);
    } else if (!isTablet) {
      setIsCollapsed(false);
    }
  }, [isTablet, isMobile]);

  return (
    <motion.aside
      initial={false}
      animate={
        isMobile
          ? { x: isMobileOpen ? 0 : -260, width: 260 }
          : { x: 0, width: isCollapsed ? 72 : 240 }
      }
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "flex h-screen flex-col border-r shrink-0 select-none",
        theme === "dark" 
          ? "border-zinc-900 bg-zinc-950/95 backdrop-blur-xl text-white" 
          : "border-zinc-200 bg-white text-black shadow-sm",
        isMobile
          ? "fixed inset-y-0 left-0 z-50 shadow-2xl px-4 w-[260px]"
          : "relative z-20 px-4",
        !isMobile && isCollapsed ? "items-center" : ""
      )}
    >
      {/* Brand Header */}
      <div className={cn(
        "flex h-20 items-center shrink-0",
        (!isMobile && isCollapsed) ? "justify-center" : "justify-between px-2"
      )}>
        <motion.div 
          layout
          className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
        >
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-transform active:scale-90 cursor-pointer shrink-0",
            theme === "dark" ? "bg-zinc-900 border border-zinc-800 text-white" : "bg-[#F7F7F8] border border-[#E5E7EB] text-black"
          )} onClick={onNewThread}>
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          
          <AnimatePresence mode="popLayout" initial={false}>
            {(isMobile || !isCollapsed) && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.15 }}
                className={cn(
                  "text-sm font-bold tracking-tight truncate",
                  theme === "dark" ? "text-white" : "text-[#111827]"
                )}
              >
                EDURENDER
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {isMobile && onCloseMobile && (
          <button 
            onClick={onCloseMobile} 
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 cursor-pointer shrink-0",
              theme === "dark" ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-[#F7F7F8] text-black hover:bg-[#E5E7EB]"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* New Thread Button */}
      <div className={cn("mb-6 shrink-0", (!isMobile && isCollapsed) ? "px-1" : "px-2")}>
        <Button
          onClick={onNewThread}
          variant="outline"
          className={cn(
            "w-full rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden",
            theme === "dark" 
              ? "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/80 hover:text-white" 
              : "border-zinc-200 bg-[#F7F7F8] text-zinc-800 hover:bg-[#E5E7EB] hover:text-black",
            (!isMobile && isCollapsed) ? "h-11 w-11 p-0 rounded-full" : "h-11 justify-start px-4"
          )}
        >
          <Plus className="h-4 w-4 shrink-0" />
          <AnimatePresence>
            {(isMobile || !isCollapsed) && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xs font-medium whitespace-nowrap"
              >
                New Thread
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Chat History Section */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {(isMobile || !isCollapsed) && threads.length > 0 && (
          <p className={cn("px-3 text-[10px] font-semibold tracking-wider uppercase mb-2", theme === "dark" ? "text-zinc-600" : "text-zinc-400")}>
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
                  (!isMobile && isCollapsed) ? "h-11 w-11 justify-center p-0 rounded-full" : "px-3 py-2.5",
                  isActive
                    ? (theme === "dark" ? "bg-zinc-900/80 text-white border border-zinc-800" : "bg-[#F7F7F8] text-black border border-[#E5E7EB] shadow-sm")
                    : (theme === "dark" ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30 border border-transparent" : "text-zinc-600 hover:bg-[#F7F7F8] hover:text-black border border-transparent")
                )}
              >
                <MessageSquare className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : (theme === "dark" ? "text-zinc-500" : "text-zinc-400"))} />
                <AnimatePresence>
                  {(isMobile || !isCollapsed) && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-xs truncate block font-medium whitespace-nowrap"
                    >
                      {thread.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle Sidebar Collapse Button (Hidden on Mobile) */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border flex items-center justify-center transition-all z-50 cursor-pointer shadow-lg active:scale-90",
            theme === "dark" 
              ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white" 
              : "border-zinc-200 bg-white text-zinc-500 hover:text-black"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      )}

      {/* Profile Section */}
      <div className={cn(
        "border-t pt-4 pb-6 flex flex-col gap-1 shrink-0",
        theme === "dark" ? "border-zinc-900" : "border-zinc-100",
        (!isMobile && isCollapsed) ? "items-center w-full" : "px-2"
      )}>
        <button className={cn(
          "flex items-center gap-3 transition text-left text-xs font-medium rounded-lg group",
          theme === "dark" ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40" : "text-zinc-600 hover:bg-[#F7F7F8] hover:text-black",
          (!isMobile && isCollapsed) ? "h-11 w-11 justify-center p-0" : "px-3 py-2.5"
        )}>
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
            SK
          </div>
          <AnimatePresence>
            {(isMobile || !isCollapsed) && (
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="flex flex-col min-w-0"
              >
                <span className="truncate">Seena K.P</span>
                <span className="text-[10px] text-zinc-400 font-normal truncate">Personal Plan</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        
        <button className={cn(
          "flex items-center gap-3 transition text-left text-xs font-medium rounded-lg",
          theme === "dark" ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40" : "text-zinc-600 hover:bg-[#F7F7F8] hover:text-black",
          (!isMobile && isCollapsed) ? "h-10 w-10 justify-center p-0" : "px-3 py-1.5"
        )}>
          <Settings className={cn("h-4 w-4", theme === "dark" ? "text-zinc-500" : "text-zinc-400")} />
          <AnimatePresence>
            {(isMobile || !isCollapsed) && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
