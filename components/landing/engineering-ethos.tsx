import React from "react";
import { Sliders, ShieldCheck, Box, Terminal } from "lucide-react";

export function EngineeringEthos() {
  const pillars = [
    {
      num: "01",
      title: "Granular Token Control",
      description: "Fine-tune corner radius, surface colors, typography weight, and padding per component or globally across your design system.",
      icon: Sliders,
    },
    {
      num: "02",
      title: "Self-Contained Output",
      description: "Every template exports 100% self-contained Tailwind classes. Zero runtime CSS-in-JS overhead, no wrapper dependencies.",
      icon: Terminal,
    },
    {
      num: "03",
      title: "WAI-ARIA Accessibility",
      description: "Built upon accessible, unstyled component foundations ensuring comprehensive screen-reader support, focus trapping, and keyboard controls.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Architectural Symmetry",
      description: "Engineered with strict grid alignments and high-contrast monochrome surfaces designed for modern, high-end developer tooling.",
      icon: Box,
    },
  ];

  return (
    <section id="philosophy" className="py-24 border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#fafafa]">
              Engineering Ethos
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-xs font-mono">
            Designed for teams who prioritize performance, ownership, and visual fidelity.
          </p>
        </div>

        {/* 4-Quadrant Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-zinc-800/80 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
          <div className="divide-y divide-zinc-800/80">
            {pillars.slice(0, 2).map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.num} className="p-8 sm:p-12 hover:bg-zinc-950/40 transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-zinc-500 font-semibold">{p.num}</span>
                    <Icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h3 className="text-base font-semibold text-[#fafafa] mb-2">{p.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">{p.description}</p>
                </div>
              );
            })}
          </div>

          <div className="divide-y divide-zinc-800/80">
            {pillars.slice(2, 4).map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.num} className="p-8 sm:p-12 hover:bg-zinc-950/40 transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-zinc-500 font-semibold">{p.num}</span>
                    <Icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h3 className="text-base font-semibold text-[#fafafa] mb-2">{p.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

