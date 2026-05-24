"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Sparkles,
  Send,
  User,
  Settings,
  HelpCircle,
  Brain,
  ChevronRight,
  TrendingUp,
  X,
  Check,
  Zap,
  ArrowLeft,
  ArrowUpRight,
  MessageSquare,
  Activity,
  Cpu,
  Menu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const INITIAL_CHATS: Chat[] = [
  {
    id: "landing-page",
    title: "Landing page ideas",
    messages: [
      { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" },
      { id: "2", role: "user", content: "I want some modern landing page ideas for our AI platform." },
      {
        id: "3",
        role: "assistant",
        content: `Here are three modern, high-converting landing page concepts for an AI-powered platform:

### 1. The Interactive Sandbox (Kinetic Rendering)
Place a fully functioning, scaled-down version of your AI model directly in the hero section. Let visitors enter a prompt or manipulate UI sliders to "feel" the speed and utility of your tool within 3 seconds of landing. 

### 2. The Narrative Scroll (Glassmorphic Storytelling)
Use scroll-driven animations where the hero sections morphs seamlessly. Background grid layers shift, text fades up, and a glass-paneled mock-up of the application rotates into focus as the user scrolls, creating a premium visual journey.

### 3. The Minimalist Dark Terminal (Cybernetic Style)
A stark, high-contrast pitch-black screen with glowing indigo and cyan accents. The headline dynamically types itself out, followed by a command-line interface where users can type natural language commands to explore features. Include micro-animations for keyboard shortcuts.`
      }
    ]
  },
  {
    id: "onboarding-flow",
    title: "AI onboarding flow",
    messages: [
      { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" },
      { id: "2", role: "user", content: "I want a modern AI interface similar to ChatGPT." },
      {
        id: "3",
        role: "assistant",
        content: `Here are the core sections you should include:

* **Clean sidebar navigation** to manage historical threads.
* **Minimal AI chat layout** prioritizing whitespace and crisp typography.
* **Dark futuristic design** with glowing accents and glassmorphic surfaces.
* **Streaming response animation** to make the assistant feel alive and immediate.
* **Prompt suggestions** that let users get started with a single click.`
      }
    ]
  },
  {
    id: "marketing-copy",
    title: "Marketing copy",
    messages: [
      { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" },
      { id: "2", role: "user", content: "Suggest some high-converting hooks for our educational product." },
      {
        id: "3",
        role: "assistant",
        content: `Here are four high-converting marketing hooks tailored for **EduRender**:

1. **"Textbooks are static. Your learning shouldn't be."**
   * *Angle:* Pain point contrast. Highlights the leap from traditional linear reading to interactive kinetic physics simulations.
2. **"Understand high-dimensional math in 15 seconds."**
   * *Angle:* Speed & efficiency. Focuses on immediate comprehension through visual cognitive spring systems.
3. **"The ultimate visual copilot for engineering classrooms."**
   * *Angle:* Authority & niche mapping. Speaks directly to technical students and educators wanting modern tools.
4. **"Stop memorizing. Start feeling the formulas."**
   * *Angle:* Experiential learning. Focuses on the unique spring physical properties that let students interact with values.`
      }
    ]
  },
  {
    id: "product-strategy",
    title: "Product strategy",
    messages: [
      { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" },
      { id: "2", role: "user", content: "What is our Q3 product roadmap looking like?" },
      {
        id: "3",
        role: "assistant",
        content: `For Q3, our strategy is centered around **collaborative visual hubs** and **low-latency WebGL components**:

* **Milestone A (July):** Expose interactive charts as shareable URLs so multiple students can co-operate.
* **Milestone B (August):** Launch the custom Canvas micro-spring layout builder for teachers.
* **Milestone C (September):** Release localized offline sync packages utilizing WebAssembly layers.`
      }
    ]
  },
  {
    id: "ui-inspiration",
    title: "UI inspiration",
    messages: [
      { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" }
    ]
  }
];

const SUGGESTIONS = [
  { text: "landing page designs", label: "Generate beautiful, futuristic landing page designs" },
  { text: "modern onboarding flow", label: "Create a modern onboarding flow for an AI SaaS app" },
  { text: "marketing hooks", label: "Write a high-converting hook list for Web3 engineers" },
  { text: "product roadmap roadmap", label: "Draft a Q3 product strategy roadmap for EduRender" }
];

export default function AIChatInterface() {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>("onboarding-flow");
  const [inputVal, setInputVal] = useState("");
  const [isReasoning, setIsReasoning] = useState(false);
  const [reasoningProgress, setReasoningProgress] = useState<string[]>([]);
  const [streamedText, setStreamedText] = useState("");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, streamedText, isReasoning, reasoningProgress]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Select Chat
  const selectChat = (id: string) => {
    setActiveChatId(id);
    setStreamedText("");
    setIsReasoning(false);
    setIsMobileSidebarOpen(false);
  };

  // Handle New Chat
  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: "New Conversation",
      messages: [
        { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" }
      ]
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setStreamedText("");
    setIsReasoning(false);
    setIsMobileSidebarOpen(false);
  };

  // Handle Delete Chat
  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChats = chats.filter((c) => c.id !== id);
    setChats(updatedChats);

    // If deleting active chat, select next available or create new one
    if (activeChatId === id) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
      } else {
        const newChatId = `chat-${Date.now()}`;
        const newChat: Chat = {
          id: newChatId,
          title: "New Conversation",
          messages: [
            { id: "1", role: "assistant", content: "Welcome to EduRender AI. How can I help you today?" }
          ]
        };
        setChats([newChat]);
        setActiveChatId(newChatId);
      }
    }
  };

  // Custom AI response logic
  const getSimulatedResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    if (queryLower.includes("landing page")) {
      return `Here are some advanced concepts for your landing page:

* **Particle Canvas Hero:** Let nodes respond to pointer movements, visualizing data connectivity.
* **Glassmorphic Sheets:** Create layered content that feels organic.
* **Micro-interactions:** Add interactive pricing toggle animations to boost conversions.`;
    }
    if (queryLower.includes("onboarding") || queryLower.includes("chatgpt")) {
      return `To make a gorgeous conversational interface:

1. **Spring-physics Animations:** Use Framer Motion for highly physical, smooth panel scaling.
2. **Backdrop Blurs:** Utilize CSS backdrop-filter tags to display layered grids below panels.
3. **Responsive Drawers:** Ensure mobile users can swipe open the chat history.`;
    }
    if (queryLower.includes("marketing") || queryLower.includes("hook")) {
      return `Here is a high-converting marketing framework:

* **The Visual Hook:** "Stop looking at dry data. See it breathe."
* **Value Metric:** Focus on how real-time rendering saves engineers 40% of standard debugger layout cycles.
* **Call to Action:** Sleek neon glowing button labeled "Compile Your First Stream — Free".`;
    }
    if (queryLower.includes("product") || queryLower.includes("roadmap") || queryLower.includes("strategy")) {
      return `EduRender Q3 Engineering Strategy:

1. **WebGL Multi-agent Hubs:** Support parallel rendering nodes.
2. **Zero-latency WebSockets:** Synchronize learning canvases in real-time.
3. **Cross-platform Integration:** Compile modules easily into React Native.`;
    }

    return `I received your prompt: **"${query}"**! 

Here is an analysis regarding this topic:
* **Interactive Design:** Utilizing visual spring variables and low-latency canvas graphics ensures visual excellence.
* **User Engagement:** Real-time fluid rendering and glassmorphic boundaries raise accessibility standards.
* **Scalability:** Next.js Server Components load large assets incrementally, keeping interactions smooth.

Let me know what specific section we should expand next!`;
  };

  // Handle Send Message
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setIsMobileSidebarOpen(false);

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text
    };

    let updatedChats = chats.map((chat) => {
      if (chat.id === activeChatId) {
        // Update title if it's the default title
        const title = chat.title === "New Conversation" ? (text.length > 22 ? text.substring(0, 20) + "..." : text) : chat.title;
        return {
          ...chat,
          title,
          messages: [...chat.messages, userMsg]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInputVal("");

    // Start reasoning phase
    setIsReasoning(true);
    setReasoningProgress([]);

    const steps = [
      "Parsing user prompt details...",
      "Searching index libraries for custom visual frameworks...",
      "Analyzing pedagogical metrics...",
      "Compiling tailored EduRender assistant answers..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setReasoningProgress((prev) => [...prev, steps[i]]);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsReasoning(false);

    // Start streaming phase
    const responseText = getSimulatedResponse(text);
    const words = responseText.split(" ");
    let tempText = "";

    for (let j = 0; j < words.length; j++) {
      await new Promise((resolve) => setTimeout(resolve, 35));
      tempText += (j === 0 ? "" : " ") + words[j];
      setStreamedText(tempText);
    }

    // Save final response in chat history
    const assistantMsg: Message = {
      id: `msg-${Date.now()}-ai`,
      role: "assistant",
      content: responseText
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMsg]
          };
        }
        return chat;
      })
    );

    setStreamedText("");
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-[#0A0A0F] text-zinc-200 overflow-hidden font-sans relative">

      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/65 backdrop-blur-md md:hidden transition-all duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={
          isMobile
            ? { x: isMobileSidebarOpen ? 0 : -288, width: 288 }
            : { x: 0, width: isSidebarCollapsed ? 80 : 288 }
        }
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "border-r border-zinc-900 bg-zinc-950/95 backdrop-blur-xl flex flex-col shrink-0 select-none",
          isMobile
            ? "fixed inset-y-0 left-0 z-40 shadow-2xl"
            : "relative z-10 bg-zinc-950/75"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-zinc-900 px-4">
          <AnimatePresence mode="wait">
            {(isMobile || !isSidebarCollapsed) ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2.5 pl-2"
              >
                <div className="h-7 w-7 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-100 leading-none">
                    EduRender
                  </h2>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto"
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <Brain className="h-5 w-5 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Home Link Shortcut / Mobile Close X Button */}
          {isMobile ? (
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900/50 transition cursor-pointer"
              title="Close Sidebar"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          ) : (
            !isSidebarCollapsed && (
              <Link
                href="/"
                className="flex items-center gap-1 text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded-md transition duration-200"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Search Hub</span>
              </Link>
            )
          )}
        </div>

        {/* New Chat CTA */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold py-3 transition shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[3px]" />
            {(isMobile || !isSidebarCollapsed) && <span className="text-xs">New Chat</span>}
          </button>
        </div>

        {/* Dynamic Chats List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-900">
          {(isMobile || !isSidebarCollapsed) && chats.length > 0 && (
            <p className="px-3 text-[10px] font-bold tracking-wider text-zinc-500 uppercase select-none mb-1">
              Conversations
            </p>
          )}
          <div className="space-y-1">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={`w-full group flex items-center justify-between rounded-xl p-3 text-left transition duration-200 border ${
                    isActive
                      ? "bg-zinc-900/60 text-white border-zinc-800 shadow-inner"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/20 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <MessageSquare className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-400"}`} />
                    {(isMobile || !isSidebarCollapsed) && (
                      <span className="text-xs font-medium truncate pr-2">
                        {chat.title}
                      </span>
                    )}
                  </div>

                  {(isMobile || !isSidebarCollapsed) && (
                    <span
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-800/80 rounded-md text-zinc-500 hover:text-rose-400 transition cursor-pointer shrink-0"
                      title="Delete thread"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Collapse Toggle (Hidden on Mobile) */}
        {!isMobile && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-500 hover:text-white transition z-50 cursor-pointer shadow-lg"
          >
            <ChevronRight className={`h-3 w-3 transform transition-transform duration-300 ${isSidebarCollapsed ? "" : "rotate-180"}`} />
          </button>
        )}

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-900/80 flex flex-col gap-1 text-[11px] text-zinc-500">
          {(isMobile || !isSidebarCollapsed) ? (
            <div className="flex items-center justify-between">
              <span>EduRender AI © 2026</span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-zinc-600 bg-zinc-900 border border-zinc-800/60 px-1.5 py-0.5 rounded">
                SECURE
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col z-10 overflow-hidden relative">
        {/* Top Header Banner */}
        <header className="border-b border-zinc-900 px-4 sm:px-6 py-4 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            {isMobile ? (
              <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900/50 transition cursor-pointer md:hidden mr-1"
                title="Open Sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            ) : (
              isSidebarCollapsed && (
                <Link
                  href="/"
                  className="flex items-center justify-center h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white transition duration-200 mr-2"
                  title="Go back to home"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              )
            )}
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
                {activeChat.title}
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              </h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider font-semibold uppercase mt-0.5">
                Active thread • Context synched
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Upgrade CTA */}
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-indigo-400 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] transition duration-300 text-xs font-semibold cursor-pointer active:scale-95"
            >
              <Zap className="h-3.5 w-3.5 fill-indigo-400/25 group-hover:fill-white" />
              <span>Upgrade</span>
            </button>

            <div className="relative group">
              <button className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                U
              </button>
            </div>
          </div>
        </header>

        {/* Conversations Container */}
        <section className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-8 scrollbar-thin scrollbar-thumb-zinc-900 select-text">
          {activeChat.messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-4 items-start ${isUser ? "justify-end" : ""}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/5 mt-0.5 select-none shrink-0">
                    <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                  </div>
                )}

                {/* Message Box */}
                <div className="max-w-2xl relative group">
                  <div
                    className={`rounded-2xl p-5 shadow-lg border relative ${
                      isUser
                        ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-500/30"
                        : "bg-zinc-900/40 border-zinc-900/80 text-zinc-300 backdrop-blur-xl"
                    }`}
                  >
                    {/* Rendered message text / markdown outlines */}
                    <div className="text-[13px] leading-relaxed font-light space-y-3">
                      {msg.content.split("\n\n").map((para, pIdx) => {
                        // Highlight Headers
                        if (para.startsWith("### ")) {
                          return (
                            <h3 key={pIdx} className="text-sm font-bold text-white pt-2">
                              {para.substring(4)}
                            </h3>
                          );
                        }
                        // Bullet point detection
                        if (para.includes("* ")) {
                          return (
                            <ul key={pIdx} className="space-y-2 pl-4 list-disc list-inside text-zinc-300">
                              {para.split("\n").map((li, liIdx) => {
                                const cleanLi = li.replace("* ", "").trim();
                                if (!cleanLi) return null;
                                return (
                                  <li key={liIdx} className="font-light text-zinc-300">
                                    {cleanLi}
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }
                        // Number list detection
                        if (/^\d+\.\s/.test(para)) {
                          return (
                            <ol key={pIdx} className="space-y-2 pl-4 list-decimal list-inside text-zinc-300">
                              {para.split("\n").map((li, liIdx) => {
                                const cleanLi = li.replace(/^\d+\.\s/, "").trim();
                                if (!cleanLi) return null;
                                return (
                                  <li key={liIdx} className="font-light text-zinc-300">
                                    {cleanLi}
                                  </li>
                                );
                              })}
                            </ol>
                          );
                        }
                        return <p key={pIdx}>{para}</p>;
                      })}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyText(msg.id, msg.content)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-white px-2 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer select-none"
                  >
                    {copiedId === msg.id ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Copied
                      </span>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-semibold shadow-inner mt-0.5 select-none shrink-0">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {/* Reasoning / Synthesis Phase */}
          <AnimatePresence>
            {isReasoning && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex gap-4 items-start"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-950/40 border border-indigo-500/25 flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-indigo-400 animate-spin" />
                </div>

                <div className="max-w-xl bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 shadow-inner backdrop-blur-md">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">
                      EduRender Synth Reasoning...
                    </p>
                  </div>
                  <div className="space-y-1.5 border-l border-zinc-900 pl-3">
                    {reasoningProgress.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs text-zinc-500"
                      >
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Streamed Text Response */}
          <AnimatePresence>
            {streamedText && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-start"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                </div>

                <div className="max-w-2xl bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
                  <div className="text-[13px] leading-relaxed font-light space-y-3 typing-cursor select-text">
                    {streamedText.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("### ")) {
                        return (
                          <h3 key={pIdx} className="text-sm font-bold text-white pt-2">
                            {para.substring(4)}
                          </h3>
                        );
                      }
                      if (para.includes("* ")) {
                        return (
                          <ul key={pIdx} className="space-y-2 pl-4 list-disc list-inside text-zinc-300">
                            {para.split("\n").map((li, liIdx) => {
                              const cleanLi = li.replace("* ", "").trim();
                              if (!cleanLi) return null;
                              return <li key={liIdx}>{cleanLi}</li>;
                            })}
                          </ul>
                        );
                      }
                      if (para.includes("1. ")) {
                        return (
                          <ol key={pIdx} className="space-y-2 pl-4 list-decimal list-inside text-zinc-300">
                            {para.split("\n").map((li, liIdx) => {
                              const cleanLi = li.replace(/^\d+\.\s/, "").trim();
                              if (!cleanLi) return null;
                              return <li key={liIdx}>{cleanLi}</li>;
                            })}
                          </ol>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </section>

        {/* Empty Chat suggestions overlay */}
        {activeChat.messages.length === 1 && !isReasoning && !streamedText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-center space-y-6 pointer-events-auto"
            >
              <div className="h-12 w-12 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center mx-auto shadow-xl">
                <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  EduRender Creative Engine
                </h2>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  Click a template suggestion below to accelerate your visual research and educational synthesis.
                </p>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.label)}
                    className="flex flex-col text-left p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-800 transition duration-200 cursor-pointer text-xs"
                  >
                    <span className="font-semibold text-indigo-400 flex items-center gap-1.5 uppercase font-mono text-[9px] mb-1">
                      {sug.text}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                    <span className="text-zinc-400 font-light leading-snug">
                      {sug.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Input Box */}
        <div className="border-t border-zinc-900 p-5 bg-zinc-950/20 backdrop-blur-md shrink-0 select-none">
          <div className="max-w-3xl mx-auto relative">
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl flex items-center pl-5 pr-3 py-3 shadow-2xl focus-within:border-indigo-500/50 transition">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(inputVal);
                }}
                disabled={isReasoning || !!streamedText}
                placeholder="Ask EduRender AI anything..."
                className="flex-1 bg-transparent outline-none text-xs text-zinc-200 placeholder:text-zinc-600 disabled:opacity-50"
              />

              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim() || isReasoning || !!streamedText}
                className="ml-3 h-9 w-9 rounded-xl bg-white hover:bg-zinc-100 disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-700 transition flex items-center justify-center font-medium shrink-0 shadow active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 stroke-[2.5px]" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 mt-2.5 text-center leading-normal">
              EduRender processes variables and citations to produce pedagogical solutions. Press Enter to dispatch.
            </p>
          </div>
        </div>
      </main>

      {/* Subscription / Upgrade Modal */}
      <AnimatePresence>
        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl z-10"
            >
              {/* Decorative side lights */}
              <div className="absolute -top-32 -right-32 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 h-64 w-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="text-center space-y-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 font-mono tracking-widest uppercase">
                  EduRender Premium
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Unlock Infinite Academic Reasoning
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  Upgrade your workspace today to query higher-dimensional math nodes and access real-time WebGL widgets.
                </p>
              </div>

              {/* Plan Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Standard Free tier */}
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        EduBase
                      </h4>
                      <p className="text-2xl font-bold text-white mt-1">
                        $0 <span className="text-xs font-normal text-zinc-500">/ mo</span>
                      </p>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400 font-light pl-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-zinc-600" />
                        <span>Basic canvas visualizations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-zinc-600" />
                        <span>3-turn dialogue memory</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-zinc-600" />
                        <span>Standard API query queue</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    disabled
                    className="w-full mt-6 py-2.5 rounded-xl border border-zinc-800 text-zinc-500 text-xs font-semibold select-none cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                </div>

                {/* Pro Tier Upgrade */}
                <div className="p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-zinc-950 flex flex-col justify-between relative">
                  {/* Popular tag */}
                  <span className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-md bg-indigo-500 text-white text-[8px] font-bold tracking-widest uppercase shadow">
                    Popular
                  </span>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                        EduPro Synth
                      </h4>
                      <p className="text-2xl font-bold text-white mt-1">
                        $29 <span className="text-xs font-normal text-indigo-400">/ mo</span>
                      </p>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-300 font-light pl-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-indigo-400" />
                        <span>Infinite 3D WebGL formulas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-indigo-400" />
                        <span>Unlimited context memory</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-indigo-400" />
                        <span>Zero-latency priority rendering</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-indigo-400" />
                        <span>Multi-agent reasoning models</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      alert("Thank you for upgrading! Subscribing to premium synthetic nodes...");
                      setIsUpgradeModalOpen(false);
                    }}
                    className="w-full mt-6 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold transition shadow-lg active:scale-95 cursor-pointer"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
