"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function NexusHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00F0FF]/5 blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="bg-gradient-to-r from-white via-[#00F0FF] to-[#8B5CF6] bg-clip-text text-6xl font-bold leading-tight text-transparent md:text-8xl"
        >
          Intelligence Without Limits
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg text-zinc-400"
        >
          Nexus AI pioneers the next generation of artificial intelligence,
          building systems that learn, adapt, and evolve in real-time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-10 flex gap-4">
          <a
            href="#platform"
            className="rounded-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-8 py-3 font-semibold text-black transition hover:scale-105"
          >
            Explore Platform
          </a>
          <a
            href="#docs"
            className="rounded-full border border-white/20 px-8 py-3 text-white transition hover:bg-white/5"
          >
            View Documentation
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
