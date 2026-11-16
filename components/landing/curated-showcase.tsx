import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sliders } from "lucide-react";
import { TEMPLATES } from "../../lib/templates";

export function CuratedShowcase() {
  const featured = Object.values(TEMPLATES).slice(0, 3);

  return (
    <section id="featured" className="py-24 border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#fafafa]">
              Curated Component Roster
            </h2>
          </div>
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>View All Components</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 3-Column Hairline Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-800/80 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80 bg-[#09090b]">
          {featured.map((template) => {
            const isLarge = ["card", "auth-card", "stat-card", "pricing-card", "bento-card"].includes(template.id);
            return (
              <div key={template.id} className="p-8 flex flex-col justify-between hover:bg-zinc-950/40 transition-colors group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-xs">
                      {template.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600">ID: {template.id}</span>
                  </div>

                  {/* Clean Non-Overflowing Preview Box */}
                  <div className="h-44 flex items-center justify-center p-3 bg-zinc-950/80 border border-zinc-850 rounded-xs mb-6 overflow-hidden pointer-events-none relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                    <div className={`w-full flex items-center justify-center ${isLarge ? "scale-[0.70] origin-center max-w-[280px]" : "scale-90"}`}>
                      {template.renderComponent({}, template.defaultTokens)}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-[#fafafa] mb-1.5">{template.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6">{template.description}</p>
                </div>

                <Link
                  href={`/studio/${template.id}`}
                  className="inline-flex items-center justify-between w-full py-2.5 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-850 text-xs font-medium text-zinc-300 hover:text-white rounded-xs transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Sliders className="w-3 h-3 text-zinc-500" />
                    Customize in Studio
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
