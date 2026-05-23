"use client";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Fog / vignette layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)] opacity-40" />
    </div>
  );
}
