import React from "react";
import { Sliders } from "lucide-react";
import { HeroPlayground } from "./hero-playground";

export function InteractivePlaygroundSection() {
  return (
    <section id="playground" className="py-24 border-b border-zinc-800/80 bg-[#09090b] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono uppercase tracking-widest mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Live Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#fafafa]">
              Interactive Canvas Playground
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-xs font-mono">
            Test tokens, corner radius, and color swatches live with instant code export.
          </p>
        </div>

        <HeroPlayground />
      </div>
    </section>
  );
}
