import React from "react";
import Link from "next/link";
import { ArrowRight, Sliders, Layers } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-zinc-850 bg-zinc-950 p-8 sm:p-14 rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle architectural dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Start Building Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#fafafa] mb-3">
              Craft interfaces with architectural precision.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              Explore 40+ live-configurable components, adjust design tokens and Google Fonts in real time, and copy pure self-contained Tailwind code directly into your stack.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <Link
              href="/studio/action-dock"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] font-medium text-xs tracking-wide uppercase transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Open Studio</span>
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xs border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 font-medium text-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              <span>All 40 Components</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
