"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function NexusContact() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl"
      >
        {/* Headline */}
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          <span className="bg-gradient-to-r from-white to-[#00F0FF] bg-clip-text text-transparent">
            Ready to transcend?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-6 mb-12 text-center text-zinc-400">
          Join thousands of organizations already leveraging Nexus AI to push
          the boundaries of what&apos;s possible.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-5 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-[#00F0FF]/50 transition"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-8 py-3.5 text-black font-semibold hover:scale-105 transition-transform whitespace-nowrap"
          >
            Get Started
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-zinc-600">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
