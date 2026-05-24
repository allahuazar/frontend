"use client";

import { cn } from "@/lib/utils";

interface BackgroundProps {
  theme?: "dark" | "light";
}

export default function Background({ theme = "dark" }: BackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none transition-opacity duration-700">
      {/* Fog / vignette layer */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700",
        theme === "dark" 
          ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)] opacity-40" 
          : "bg-white opacity-100"
      )} />
      
      {/* Grain / Noise Texture Overlay */}
      <div className={cn(
        "absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-noise",
        theme === "dark" ? "brightness-150" : "brightness-100"
      )} />
    </div>
  );
}
