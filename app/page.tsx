"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import FloatingGrid from "@/components/floating-grid";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ChatView from "@/components/chat-view";

import { ParticleCanvas } from "@/components/ParticleCanvas";
import Background from "@/components/Background";

interface Thread {
  id: string;
  title: string;
  date: string;
}

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: "sample-1", title: "Kinetic Quantum Visualizations in React", date: "May 23" },
    { id: "sample-2", title: "Visual spring formulas and cognitive study cards", date: "May 22" },
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [activeFocusMode, setActiveFocusMode] = useState<string>("all");

  const handleSearchSubmit = (queryText: string, focusMode: string) => {
    setActiveQuery(queryText);
    setActiveFocusMode(focusMode);

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
  };

  const handleNewThread = () => {
    setActiveQuery(null);
    setActiveThreadId(null);
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
  };

  return (
    <main className="relative flex h-screen w-screen overflow-hidden bg-black text-white font-sans">
      {/* Background radial fog layer */}
      <Background />

      {/* WebGL Particle Background */}
      <ParticleCanvas
        maxParticles={1000}
        particleSizeMin={2}
        particleSizeMax={5}
        speedScale={2}
      />

      {/* Cinematic animated grid particles background */}
      <FloatingGrid />

      {/* Sidebar Controls */}
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={handleSelectThread}
        onNewThread={handleNewThread}
      />

      {/* Main Content Pane */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden bg-zinc-950/20">
        {activeQuery === null ? (
          <>
            {/* Show Home Hero Panel */}
            <Navbar />
            <div className="flex flex-1 items-center justify-center">
              <Hero onSearch={handleSearchSubmit} />
            </div>
          </>
        ) : (
          /* Show Active Search Synthesis View */
          <ChatView
            initialQuery={activeQuery}
            initialFocusMode={activeFocusMode}
            onReset={handleNewThread}
            onThreadCreated={handleThreadCreated}
          />
        )}
      </div>
    </main>
  );
}
