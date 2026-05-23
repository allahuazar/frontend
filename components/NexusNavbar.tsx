"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export default function NexusNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "bg-[#0A0A0F]/90" : "bg-[#0A0A0F]/80"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#00F0FF]" />
          <span className="bg-gradient-to-r from-[#00F0FF] to-white bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            Nexus AI
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#get-started"
          onClick={(e) => handleSmoothScroll(e, "#get-started")}
          className="rounded-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-5 py-2 text-sm font-medium text-white transition hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </motion.nav>
  );
}
