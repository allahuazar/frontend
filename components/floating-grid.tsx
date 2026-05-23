"use client";

import { motion } from "framer-motion";

export default function FloatingGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none select-none">
      {/* Mesh Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" 
        style={{
          maskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      {/* Futuristic radial glow spots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,16,24,0.7),transparent_70%)]" />

      {/* Floating weightless Antigravity blur bodies */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[15%] top-[10%] h-[550px] w-[550px] rounded-full bg-indigo-500/5 blur-[120px] animate-float-slower"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[10%] bottom-[15%] h-[600px] w-[600px] rounded-full bg-zinc-400/5 blur-[130px] animate-float-faster"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[150px]"
      />
    </div>
  );
}
