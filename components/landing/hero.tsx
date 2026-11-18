import React from "react";
import { HeroPlayground } from "./hero-playground";
import { ArrowRight, Github, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fetch v1.0: Live Configurable Primitives</span>
        </div>

        {/* Hero Title & Subhead */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Build and Customize UI Components in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Real-Time
          </span>
          .
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Visually tweak design tokens, preview live components, and copy clean, accessible code into your Next.js and Tailwind projects with zero lock-in.
        </p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#playground"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
          >
            Explore Components
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium text-sm transition-all active:scale-[0.98]"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Interactive Playground Anchor */}
        <div id="playground" className="mt-16 pt-2">
          <HeroPlayground />
        </div>
      </div>
    </section>
  );
}

