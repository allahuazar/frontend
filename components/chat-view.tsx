"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Sub-components
import ChatHeader from "./chat/chat-header";
import MessageList from "./chat/message-list";
import SearchBox from "./search-box";
import SourcesPanel from "./sources-panel";
import MarkdownAnswer from "./chat/markdown-answer";

// Global Types
import { ChatTurn, Source, Theme } from "@/types";

interface ChatViewProps {
  initialQuery: string;
  initialFocusMode: string;
  onReset: () => void;
  onThreadCreated?: (title: string, id: string) => void;
  onToggleSidebar?: () => void;
  theme?: Theme;
}

// Pre-packaged simulated search data
function getSimulatedData(query: string, focusMode: string): {
  sources: Source[];
  steps: string[];
  answer: string;
} {
  const queryLower = query.toLowerCase();

  const baseResponse = {
    steps: [
      `Formulating semantic intent: "${query}"`,
      "Scanning curated academic datasets",
      "Reading peer-reviewed findings",
      "Synthesizing objective evaluation"
    ],
    sources: [
      {
        id: "src1",
        title: "Modern UI Architecture and Modularity",
        url: "https://example.com/modularity",
        siteName: "Dev Engineering",
        snippet: "Modular design ensures that complex systems remain maintainable over time by decoupling unrelated logic blocks."
      },
      {
        id: "src2",
        title: "Clean Code: Hooks and Typed Systems",
        url: "https://example.com/clean-code",
        siteName: "Stack Insights",
        snippet: "Centralizing types and extracting reusable hooks significantly reduces boilerplate and potential runtime errors."
      }
    ],
    answer: `Refactoring to a **modular architecture** [1] involves extracting shared patterns into specialized components. By leveraging **TypeScript interfaces** [2] and centralized **hooks**, the application becomes significantly more robust and easier to scale across teams.`
  };

  return baseResponse;
}

export default function ChatView({
  initialQuery,
  initialFocusMode,
  onReset,
  onThreadCreated,
  onToggleSidebar,
  theme = "dark"
}: ChatViewProps) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [currentSteps, setCurrentSteps] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [activeSources, setActiveSources] = useState<Source[]>([]);
  const [copiedTurnId, setCopiedTurnId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Generate and Stream Answer Flow
  const executeSearch = async (queryText: string, mode: string) => {
    setIsSearching(true);
    setStreamedText("");
    setCurrentSteps([]);

    const simulated = getSimulatedData(queryText, mode);

    // 1. Stream searching steps
    for (let i = 0; i < simulated.steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCurrentSteps((prev) => [...prev, simulated.steps[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSearching(false);
    setActiveSources(simulated.sources);

    // 2. Stream answer text
    const words = simulated.answer.split(" ");
    let currentResponse = "";
    
    for (let j = 0; j < words.length; j++) {
      await new Promise((resolve) => setTimeout(resolve, 25));
      currentResponse += (j === 0 ? "" : " ") + words[j];
      setStreamedText(currentResponse);
    }

    // Save turn
    const newTurn: ChatTurn = {
      id: Math.random().toString(),
      role: "assistant",
      content: simulated.answer,
      sources: simulated.sources
    };

    setTurns((prev) => [...prev, newTurn]);
    setStreamedText("");
    setActiveSources([]);
    setCurrentSteps([]);
  };

  // Run initial search
  useEffect(() => {
    setTurns([{ id: "init-user", role: "user", content: initialQuery, focusMode: initialFocusMode }]);
    executeSearch(initialQuery, initialFocusMode);
    
    if (onThreadCreated) {
      onThreadCreated(initialQuery, "thread-" + Date.now());
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, streamedText, currentSteps]);

  const handleFollowUpSearch = (queryText: string, mode: string) => {
    const userTurn: ChatTurn = {
      id: Math.random().toString(),
      role: "user",
      content: queryText,
      focusMode: mode
    };
    setTurns((prev) => [...prev, userTurn]);
    executeSearch(queryText, mode);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTurnId(id);
    setTimeout(() => setCopiedTurnId(null), 2000);
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden select-none">
      <ChatHeader 
        theme={theme} 
        onToggleSidebar={onToggleSidebar} 
        onReset={onReset} 
      />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-20">
        <MessageList 
          turns={turns} 
          theme={theme} 
          onCopy={handleCopy} 
          copiedId={copiedTurnId} 
        />

        {/* Real-time Streaming State overlay */}
        <AnimatePresence>
          {(isSearching || streamedText) && (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 px-4 sm:px-8 pl-2 sm:pl-8">
              {/* Phase 1: Search animations */}
              {isSearching && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border border-zinc-700 border-t-white" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                      EDURENDER Search In Progress...
                    </span>
                  </div>

                  <div className="space-y-2 border-l border-zinc-900/60 pl-3 pt-1">
                    {currentSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs text-zinc-500"
                      >
                        <span className="h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-light">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phase 2: Live text streamer */}
              {streamedText && (
                <div className="space-y-6">
                  {activeSources.length > 0 && (
                    <SourcesPanel sources={activeSources} theme={theme} />
                  )}

                  <div className={cn(
                    "rounded-2xl border shadow-sm select-text transition-all duration-200",
                    theme === "dark" 
                      ? "bg-zinc-900/30 border-zinc-800/30 backdrop-blur-xl" 
                      : "bg-[#F7F7F8] border-[#E5E7EB]"
                  )}>
                    <MarkdownAnswer content={streamedText} sources={activeSources} theme={theme} />
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Recursive Follow-up Search Container */}
      <div className={cn(
        "border-t px-4 sm:px-8 py-5 z-10 shrink-0 transition-all duration-200",
        theme === "dark" 
          ? "border-zinc-900 bg-zinc-950/20 backdrop-blur-md" 
          : "border-[#E5E7EB] bg-white/70 backdrop-blur-md"
      )}>
        <div className="w-full max-w-[85rem] mx-auto px-4 sm:px-8">
          <SearchBox
            onSearch={handleFollowUpSearch}
            placeholder="Ask Edurender"
            isCompact={true}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
