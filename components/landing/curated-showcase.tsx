"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sliders, Lock } from "lucide-react";
import { TEMPLATES } from "../../lib/templates";
import { useAuth } from "../../context/auth-context";

const FEATURED_IDS = [
  "action-dock",
  "pricing-card",
  "bento-card",
  "auth-card",
  "feature-grid",
  "stat-ring",
];

const CATEGORY_LABELS: Record<string, string> = {
  elements: "Elements",
  components: "Cards & Blocks",
  forms: "Forms",
  navigation: "Navigation",
};

export function CuratedShowcase() {
  const { isTemplateLocked } = useAuth();
  const featured = FEATURED_IDS.map((id) => TEMPLATES[id]).filter(Boolean);

  const getScaleClass = (id: string) => {
    switch (id) {
      case "pricing-card":
        return "scale-[0.52] max-w-[280px]";
      case "bento-card":
      case "auth-card":
      case "feature-grid":
        return "scale-[0.60] max-w-[290px]";
      case "stat-ring":
        return "scale-[0.72] max-w-[290px]";
      case "action-dock":
        return "scale-[0.80] max-w-[320px]";
      default:
        return "scale-[0.75] max-w-[300px]";
    }
  };

  return (
    <section id="featured" className="py-24 border-b border-zinc-800/80 bg-[#09090b] scroll-mt-20">
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

        {/* 6-Card Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-zinc-800/80 divide-y md:divide-y-0 gap-[1px] bg-zinc-800/80">
          {featured.map((template) => {
            const isLocked = isTemplateLocked(template.id);
            return (
              <div key={template.id} className="p-8 flex flex-col justify-between bg-[#09090b] hover:bg-zinc-950/80 transition-all duration-300 group relative">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-xs bg-zinc-900/60 group-hover:border-zinc-700 transition-colors">
                      {CATEGORY_LABELS[template.category] || template.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600">ID: {template.id}</span>
                  </div>

                  {/* Clean Non-Overflowing Preview Box */}
                  <div className="h-48 flex items-center justify-center p-4 bg-[#09090b] border border-zinc-850 group-hover:border-zinc-700 rounded-xs mb-6 overflow-hidden relative transition-colors duration-300">
                    <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
                    <div className={`w-full flex items-center justify-center origin-center pointer-events-none select-none ${getScaleClass(template.id)} ${
                      isLocked ? "filter blur-[3px] opacity-40 transition-all" : ""
                    }`}>
                      {template.renderComponent({}, template.defaultTokens)}
                    </div>

                    {isLocked && (
                      <div className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-[5px] flex flex-col items-center justify-center p-4 text-center z-10">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-750 flex items-center justify-center mb-2 shadow-lg">
                          <Lock className="w-4 h-4 text-zinc-300" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300 font-semibold mb-0.5">
                          Members Only
                        </span>
                        <span className="text-xs text-zinc-400 font-medium">
                          Want more? Register!
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-[#fafafa] mb-1.5">{template.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6">{template.description}</p>
                </div>

                {isLocked ? (
                  <Link
                    href={`/register?redirect=/studio/${template.id}`}
                    className="inline-flex items-center justify-between w-full py-2.5 px-3 border border-zinc-750 hover:border-zinc-500 bg-zinc-900/90 hover:bg-zinc-850 text-xs font-medium text-zinc-200 hover:text-white rounded-xs transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Lock className="w-3 h-3 text-zinc-400" />
                      Want more? Register!
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white">Unlock →</span>
                  </Link>
                ) : (
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
