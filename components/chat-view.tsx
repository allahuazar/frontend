"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  Globe, 
  ChevronRight, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Check,
  BrainCircuit,
  MessageSquareCode,
  ArrowUpRight,
  Cpu
} from "lucide-react";
import SourcesPanel, { Source } from "./sources-panel";
import SearchBox from "./search-box";
import { cn } from "@/lib/utils";

interface ChatTurn {
  id: string;
  role: "user" | "assistant";
  content: string;
  focusMode?: string;
  sources?: Source[];
  steps?: string[];
}

interface ChatViewProps {
  initialQuery: string;
  initialFocusMode: string;
  onReset: () => void;
  onThreadCreated?: (title: string, id: string) => void;
}

// Pre-packaged simulated search data based on keywords
function getSimulatedData(query: string, focusMode: string): {
  sources: Source[];
  steps: string[];
  answer: string;
} {
  const queryLower = query.toLowerCase();

  if (queryLower.includes("edurender") || queryLower.includes("learning") || queryLower.includes("quantum") || queryLower.includes("physics") || queryLower.includes("education")) {
    return {
      steps: [
        "Analyzing pedagogical intent and critical educational nodes",
        "Querying academic repositories for interactive rendering standards",
        "Collating 4 peer-reviewed visual-learning papers",
        "Synthesizing EDURENDER interactive visualization modules"
      ],
      sources: [
        {
          id: "src1",
          title: "EDURENDER: Generative Visualizations for High-Dimensional Classroom Topics",
          url: "https://edurender.org/docs/pedagogical-pipelines",
          siteName: "EDURENDER Docs",
          snippet: "EDURENDER leverages declarative spring systems and Canvas graphics to represent complex equations in weightless floating frames. This dynamic visual loop reduces student cognitive load and increases retention rates by 34%."
        },
        {
          id: "src2",
          title: "Cognitive Load and Kinetic Physics Simulations in Real-Time Web Apps",
          url: "https://ieee-explore.org/document/cognitive-physics-sim",
          siteName: "IEEE Academic",
          snippet: "Web-based dynamic simulations bypass dry textbook equations by letting students interact directly with variables. Keeping render calculations off the main thread ensures seamless interaction rates on tablets."
        },
        {
          id: "src3",
          title: "Framer Motion and Springs in Interactive Mathematics Diagrams",
          url: "https://uxdesign.cc/interactive-math-springs-framer",
          siteName: "UX Collective",
          snippet: "Applying spring physical boundaries (stiffness: 180, damping: 20) to mathematical components allows students to feel physics forces intuitively through touch drag interfaces."
        },
        {
          id: "src4",
          title: "Next.js 15 & shadcn/ui: Engineering Futuristic Academic Portals",
          url: "https://vercel.com/blog/futuristic-academic-portals-nextjs",
          siteName: "Vercel Engineering",
          snippet: "Next.js Server Components combined with glassmorphism sheets provide a highly responsive, cinematic framework for modern educational AI tools that need to load assets incrementally."
        }
      ],
      answer: `# EDURENDER AI — Futuristic Visual Learning

To implement **EDURENDER-style cognitive visualizations** in a student portal, we leverage interactive spring physical variables [3], low-latency graphics canvas boundaries [2], and modular glassmorphic citation components [1] that let students query data incrementally.

Here is a standard configuration that achieves this futuristic study aesthetic:

## 1. Visual spring coordinates
Always render interactive visual diagrams (like quantum probability states or gravitational orbits) using spring damping formulas rather than rigid static lines. This helps students feel physical mass and forces intuitively [3].

## 2. Dynamic study card component
We configure the custom learning canvas inside our global styles [4]. By utilizing translucent glass boundaries, we can maintain readability without visual clutter [1]:

\`\`\`css
/* Futuristic translucent study pane */
.edu-glass-panel {
  isolation: isolate;
  background: rgba(9, 9, 11, 0.45);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
\`\`\`

## 3. Kinetic Quantum Visualizer
By combining **Framer Motion** with modular React hooks, we can build a responsive, gravity-neutral orbit diagram for students to manipulate:

\`\`\`tsx
import { motion } from "framer-motion";

export const QuantumVisualizer = ({ energyLevel }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 10 / energyLevel, ease: "linear" }}
    className="edu-glass-panel h-48 w-48 rounded-full border border-zinc-800 flex items-center justify-center"
  >
    <div className="h-4 w-4 bg-white rounded-full animate-ping" />
  </motion.div>
);
\`\`\`

This setup ensures that complex science models operate with fluid spring response speeds while maintaining high accessibility standards across mobile tablet devices [2].`
    };
  }

  // Fallback generic search response
  const capitalized = query.charAt(0).toUpperCase() + query.slice(1);
  return {
    steps: [
      `Formulating semantic intent: "${query}"`,
      `Scanning internet for indices related to "${query}"`,
      `Reading 5 verified articles and pages`,
      "Synthesizing objective review details"
    ],
    sources: [
      {
        id: "srca",
        title: `${capitalized} — Wikipedia entry and overview`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        siteName: "Wikipedia",
        snippet: `${capitalized} represents a key conceptual node. The domain studies structures, design variables, and modern integrations that impact current development pipelines.`
      },
      {
        id: "srcb",
        title: `Comprehensive research and modern findings on ${capitalized}`,
        url: "https://medium.com/tech-innovation/modern-findings",
        siteName: "Tech Innovation",
        snippet: `Evaluating ${query} reveals critical workflows that developers can adopt. High-performance standards emphasize early initialization, clean hooks, and modular UI configurations.`
      },
      {
        id: "srcc",
        title: "Optimized designs and user interactive interfaces guide",
        url: "https://uxdesign.cc/interactive-ui-best-practices",
        siteName: "UX Collective",
        snippet: "Modern digital interfaces thrive on micro-interactions. Responsive hover animations, clean borders, and clear citations improve credibility and maintain user attention."
      }
    ],
    answer: `# Deep Analysis of: ${capitalized}

We explored multiple online resources [1][2] to assemble a verified synthesis regarding your query. Here is a breakdown of key aspects:

## Key Considerations
1. **Interactive Integration:** Providing users with responsive pathways (e.g. expandable cards, citations) drastically increases UX credibility [3].
2. **Modular Composition:** Keeping components separated, decoupled, and cleanly structured ensures scalability [2].
3. **Hardware Acceleration:** Leverage CSS composites over heavy script computations for rendering complex views [3].

## Custom Implementation Concept
Here is a premium boilerplate outline to modularize your data structure:

\`\`\`typescript
interface UnifiedMetrics {
  title: string;
  value: number;
  isActive: boolean;
}

export function evaluateData(input: string): UnifiedMetrics {
  return {
    title: input.toUpperCase(),
    value: Math.floor(Math.random() * 100),
    isActive: true
  };
}
\`\`\`

Please feel free to ask follow-up questions to explore specific sections of this evaluation! [1]`
  };
}

export default function ChatView({
  initialQuery,
  initialFocusMode,
  onReset,
  onThreadCreated
}: ChatViewProps) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [currentSteps, setCurrentSteps] = useState<string[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
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
    setActiveStepIndex(-1);

    // Get simulated data
    const simulated = getSimulatedData(queryText, mode);

    // 1. Stream searching steps sequentially
    for (let i = 0; i < simulated.steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCurrentSteps((prev) => [...prev, simulated.steps[i]]);
      setActiveStepIndex(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSearching(false);
    setActiveSources(simulated.sources);

    // 2. Stream answer text word-by-word
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
      sources: simulated.sources,
      steps: simulated.steps
    };

    setTurns((prev) => [...prev, newTurn]);
    setStreamedText("");
    setActiveSources([]);
    setCurrentSteps([]);
    setActiveStepIndex(-1);
  };

  // Run initial search
  useEffect(() => {
    setTurns([{ id: "init-user", role: "user", content: initialQuery, focusMode: initialFocusMode }]);
    executeSearch(initialQuery, initialFocusMode);
    
    // Callback to inform parent sidebar about title
    if (onThreadCreated) {
      onThreadCreated(initialQuery, "thread-" + Date.now());
    }
  }, []);

  // Auto scroll to bottom during streaming
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

  // Render markdown text inside the answer dynamically, replacing [X] with gorgeous superscript buttons
  const renderFormattedAnswer = (text: string, sources: Source[] = []) => {
    // 1. Format code blocks
    let parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, partIdx) => {
      if (part.startsWith("```")) {
        const match = part.match(/```(\w*)\n([\s\S]*?)```/);
        const lang = match ? match[1] : "code";
        const code = match ? match[2] : part.slice(3, -3);

        return (
          <div key={partIdx} className="my-5 overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/80">
            <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 py-2 text-[10px] font-mono text-zinc-500 font-semibold select-none">
              <span className="uppercase">{lang}</span>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-white" onClick={() => handleCopy(`code-${partIdx}`, code)}>
                <Copy className="h-3 w-3" />
                Copy
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // 2. Format regular headers, lists, bold text, and bracket citations
      let inlineLines = part.split("\n");
      return inlineLines.map((line, lineIdx) => {
        const lineKey = `${partIdx}-${lineIdx}`;
        // Headers
        if (line.startsWith("# ")) {
          return <h1 key={lineKey} className="text-xl font-bold text-white mt-6 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={lineKey} className="text-sm font-bold text-zinc-100 mt-5 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={lineKey} className="text-xs font-bold text-zinc-200 mt-4 mb-2">{line.substring(4)}</h3>;
        }

        // Ordered/Unordered lists
        const isBullet = line.startsWith("- ") || line.startsWith("* ");
        const isNum = /^\d+\.\s/.test(line);

        // Bold formatting
        let content = line;
        const boldRegex = /\*\*(.*?)\*\*/g;
        let boldMatches = [...content.matchAll(boldRegex)];
        let segments: React.ReactNode[] = [];
        let lastIdx = 0;

        // Bracket citation parser [X]
        const citationRegex = /\[(\d+)\]/g;

        const processCitations = (txt: string): React.ReactNode[] => {
          let citSegments: React.ReactNode[] = [];
          let citMatches = [...txt.matchAll(citationRegex)];
          let lastCitIdx = 0;

          if (citMatches.length === 0) {
            return [txt];
          }

          citMatches.forEach((match, idx) => {
            const index = match.index ?? 0;
            const citationNum = match[1];

            // Text preceding citation
            if (index > lastCitIdx) {
              citSegments.push(txt.substring(lastCitIdx, index));
            }

            // Clickable citation badge
            citSegments.push(
              <span 
                key={`cit-${idx}`}
                className="inline-flex items-center justify-center mx-0.5 h-3.5 w-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-[8px] font-semibold text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer align-super"
                title={`Context Source #${citationNum}`}
              >
                {citationNum}
              </span>
            );

            lastCitIdx = index + match[0].length;
          });

          if (lastCitIdx < txt.length) {
            citSegments.push(txt.substring(lastCitIdx));
          }

          return citSegments;
        };

        if (boldMatches.length > 0) {
          boldMatches.forEach((match, idx) => {
            const index = match.index ?? 0;
            const textToBold = match[1];

            if (index > lastIdx) {
              segments.push(...processCitations(content.substring(lastIdx, index)));
            }

            segments.push(<strong key={`bold-${idx}`} className="font-semibold text-white">{textToBold}</strong>);
            lastIdx = index + match[0].length;
          });

          if (lastIdx < content.length) {
            segments.push(...processCitations(content.substring(lastIdx)));
          }
        } else {
          segments = processCitations(content);
        }

        if (isBullet) {
          return (
            <div key={lineKey} className="flex items-start gap-2.5 my-2.5 pl-2 text-xs text-zinc-300 leading-relaxed font-light">
              <span className="h-1.5 w-1.5 mt-1.5 shrink-0 rounded-full bg-zinc-600" />
              <span>{segments}</span>
            </div>
          );
        }

        if (isNum) {
          const matchNum = line.match(/^(\d+)\.\s(.*)/);
          const num = matchNum ? matchNum[1] : "1";
          const rest = matchNum ? matchNum[2] : line;
          return (
            <div key={lineKey} className="flex items-start gap-2.5 my-2.5 pl-2 text-xs text-zinc-300 leading-relaxed font-light">
              <span className="font-semibold text-zinc-500 font-mono text-[11px] mt-0.5">{num}.</span>
              <span>{segments}</span>
            </div>
          );
        }

        return line.trim() === "" ? (
          <div key={lineKey} className="h-3" />
        ) : (
          <p key={lineKey} className="text-xs text-zinc-300 leading-relaxed font-light my-2">{segments}</p>
        );
      });
    });
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden select-none">
      {/* Search Header Banner */}
      <div className="flex items-center justify-between border-b border-zinc-900/60 px-8 py-4 bg-zinc-950/20 backdrop-blur-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
            Search Thread Synthesis
          </span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-950/40 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Search</span>
        </button>
      </div>

      {/* Main Conversation Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-none">
        {turns.map((turn, index) => {
          const isUser = turn.role === "user";
          return (
            <div
              key={turn.id}
              className={cn(
                "w-full max-w-3xl mx-auto flex flex-col gap-3",
                isUser ? "border-b border-zinc-900/40 pb-5" : ""
              )}
            >
              {/* Turn Author Info */}
              <div className="flex items-center gap-2 select-none">
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-lg border text-[10px] font-bold shadow-sm",
                  isUser 
                    ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                    : "bg-white border-zinc-200 text-black"
                )}>
                  {isUser ? "U" : <Sparkles className="h-3 w-3" />}
                </div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                  {isUser ? "Query" : "EDURENDER Answer"}
                </span>
                {isUser && turn.focusMode && (
                  <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full font-mono font-medium capitalize">
                    Focus: {turn.focusMode}
                  </span>
                )}
              </div>

              {/* Turn Content */}
              <div className="pl-8">
                {isUser ? (
                  <div className="inline-block rounded-2xl bg-white/85 text-black/70 px-4 py-2.5 shadow-sm font-medium text-sm leading-relaxed max-w-[90%] select-text">
                    {turn.content}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Render static sources inside turn */}
                    {turn.sources && turn.sources.length > 0 && (
                      <SourcesPanel sources={turn.sources} />
                    )}
                    {/* Format detailed markdown syntheses */}
                    <div className="rounded-2xl bg-zinc-900/30 text-white/50 border border-zinc-800/30 backdrop-blur-xl p-5 shadow-sm select-text">
                      {renderFormattedAnswer(turn.content, turn.sources)}
                    </div>
                  </div>
                )}
              </div>

              {/* Assistant Feedback / Copy Actions */}
              {!isUser && (
                <div className="flex items-center gap-4 pl-8 pt-2 select-none">
                  <button 
                    onClick={() => handleCopy(turn.id, turn.content)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  >
                    {copiedTurnId === turn.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500 animate-scale" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition cursor-pointer">
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Real-time Streaming State overlay */}
        <AnimatePresence>
          {(isSearching || streamedText) && (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 pl-8">
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
                    <SourcesPanel sources={activeSources} />
                  )}

                  <div className="rounded-2xl bg-zinc-900/30 text-white/50 border border-zinc-800/30 backdrop-blur-xl p-5 shadow-sm select-text typing-cursor">
                    {renderFormattedAnswer(streamedText, activeSources)}
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Recursive Follow-up Search Container */}
      <div className="border-t border-zinc-900 px-8 py-5 bg-black z-10 shrink-0">
        <div className="w-full max-w-3xl mx-auto">
          <SearchBox
            onSearch={handleFollowUpSearch}
            placeholder="Ask a follow-up question..."
            isCompact={true}
          />
          <p className="text-[10px] text-zinc-600 mt-2 text-center select-none">
            Enter queries to expand. EDURENDER maintains conversational context for multi-turn evaluations.
          </p>
        </div>
      </div>
    </div>
  );
}
