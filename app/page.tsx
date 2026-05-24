"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ChatView from "@/components/chat-view";
import Background from "@/components/Background";
import { Thread, Theme } from "@/types";



export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: "sample-1", title: "Kinetic Quantum Visualizations in React", date: "May 23" },
    { id: "sample-2", title: "Visual spring formulas and cognitive study cards", date: "May 22" },
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [activeFocusMode, setActiveFocusMode] = useState<string>("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const handleSearchSubmit = (queryText: string, focusMode: string) => {
    setActiveQuery(queryText);
    setActiveFocusMode(focusMode);
    setIsMobileSidebarOpen(false);

    // Create a new thread representation
    const newThreadId = "thread-" + Date.now();
    const newThread: Thread = {
      id: newThreadId,
      title: queryText,
      date: "Today"
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
  };

  const handleSelectThread = (threadId: string) => {
    const thread = threads.find((t) => t.id === threadId);
    if (thread) {
      setActiveThreadId(threadId);
      setActiveQuery(thread.title);
      setActiveFocusMode("all");
    }
    setIsMobileSidebarOpen(false);
  };

  const handleNewThread = () => {
    setActiveQuery(null);
    setActiveThreadId(null);
    setIsMobileSidebarOpen(false);
  };

  // Helper when ChatView adds or triggers a thread creation internally
  const handleThreadCreated = (title: string, id: string) => {
    // If not already in the thread list, add it
    if (!threads.some((t) => t.title === title)) {
      const newThread: Thread = {
        id,
        title,
        date: "Today"
      };
      setThreads((prev) => {
        if (prev.some((t) => t.title === title)) return prev;
        return [newThread, ...prev];
      });
      setActiveThreadId(id);
    }
    setIsMobileSidebarOpen(false);
  };

  return (
    <main className={cn(
      "relative flex h-screen w-screen overflow-hidden font-sans transition-all duration-200",
      theme === "dark" ? "bg-black text-white" : "light bg-white text-black"
    )}>
      {/* Background radial fog layer */}
      <Background theme={theme} />


      {/* Mobile Sidebar Backdrop Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Controls */}
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={handleSelectThread}
        onNewThread={handleNewThread}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        theme={theme}
      />

      {/* Main Content Pane */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {activeQuery === null ? (
          <>
            {/* Show Home Hero Panel */}
            <Navbar 
              onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
              theme={theme}
              onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <div className="flex flex-1 items-center justify-center">
              <Hero onSearch={handleSearchSubmit} theme={theme} />
            </div>
          </>
        ) : (
          /* Show Active Search Synthesis View */
          <ChatView
            initialQuery={activeQuery}
            initialFocusMode={activeFocusMode}
            onReset={handleNewThread}
            onThreadCreated={handleThreadCreated}
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            theme={theme}
          />
        )}
      </div>
    </main>
  );
}
