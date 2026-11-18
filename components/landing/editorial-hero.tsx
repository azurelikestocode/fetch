import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function EditorialHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>FETCH ARCHITECTURE • 2026</span>
        </div>

        {/* Crisp Monochromatic Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#fafafa] max-w-4xl leading-[1.08] mb-6">
          Live-configurable UI components built for architectural precision.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10 font-normal">
          Visually tune design tokens, Google Fonts, and color palettes across production-ready UI components and layouts. Zero runtime styling overhead, no vendor lock-in, and pure self-contained code.
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/components"
            className="inline-flex items-center gap-2.5 h-11 px-5 rounded-sm bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] font-medium text-xs tracking-wide uppercase transition-colors"
          >
            <span>Explore Components</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-sm border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/80 text-zinc-300 font-medium text-xs font-mono transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span>npx fetch add</span>
          </a>
        </div>
      </div>
    </section>
  );
}

