"use client";

import { motion, Variants } from "framer-motion";

const technologies: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "WebGL",
  "CUDA",
  "PyTorch",
  "TensorFlow",
  "Transformers",
  "Kubernetes",
  "GraphQL",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function NexusTechnology() {
  return (
    <section id="technology" className="py-32 px-6">
      {/* Decorative gradient divider */}
      <div className="mb-20 flex justify-center">
        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-widest text-[#8B5CF6] mb-4">
          Technology
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Powered by Innovation
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {technologies.map((tech) => (
          <motion.span
            key={tech}
            variants={pillVariants}
            className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-zinc-300 hover:border-[#8B5CF6]/40 hover:text-white hover:bg-white/[0.06] transition-all duration-300 cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
