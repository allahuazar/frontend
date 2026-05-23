"use client";

import { motion, Variants } from "framer-motion";
import { Brain, Zap, Atom, type LucideIcon } from "lucide-react";

interface FeatureCard {
  title: string;
  icon: LucideIcon;
  description: string;
}

const features: FeatureCard[] = [
  {
    title: "Neural Processing",
    icon: Brain,
    description:
      "Advanced neural networks that process information at unprecedented speeds, mimicking the complexity of the human brain.",
  },
  {
    title: "Real-Time Learning",
    icon: Zap,
    description:
      "Systems that continuously learn and adapt from new data streams, evolving their capabilities in real-time.",
  },
  {
    title: "Quantum Ready",
    icon: Atom,
    description:
      "Future-proof architecture designed to seamlessly integrate with quantum computing infrastructure.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function NexusFeatures() {
  return (
    <section id="features" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-widest text-[#00F0FF] mb-4">
          Powerful Capabilities
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Built for the Future
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#00F0FF]/30 transition-all duration-500 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF]/10 to-[#8B5CF6]/10 border border-white/10">
                <Icon className="h-6 w-6 text-[#00F0FF] group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
