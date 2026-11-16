import React from "react";
import Link from "next/link";
import { ArrowRight, Sliders } from "lucide-react";
import { ComponentTemplate } from "../../lib/templates";

interface TemplateCardProps {
  template: ComponentTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  // Determine if template needs scaling to fit thumbnail preview without clipping
  const isLargeComponent = ["auth-card", "pricing-card", "bento-card", "card", "stat-card"].includes(template.id);

  return (
    <div className="border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/70 transition-all duration-300 group rounded-xs">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 rounded-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-indigo-400 transition-colors"></span>
            {template.category}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">ID: {template.id}</span>
        </div>

        {/* Live Preview Box with Architectural Grid & Non-Clipping Scaled Center */}
        <div className="h-48 flex items-center justify-center p-4 bg-[#09090b] border border-zinc-850 rounded-xs mb-6 overflow-hidden pointer-events-none select-none relative group-hover:border-zinc-700/80 transition-colors">
          {/* Subtle dot matrix pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

          {/* Centered preview container */}
          <div
            className={`w-full flex items-center justify-center transition-transform duration-300 ${
              isLargeComponent ? "scale-[0.74] group-hover:scale-[0.77] origin-center" : "scale-95 group-hover:scale-100"
            }`}
          >
            {template.renderComponent({}, template.defaultTokens)}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-[#fafafa] mb-1.5 group-hover:text-white transition-colors">
          {template.name}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6 min-h-[36px]">
          {template.description}
        </p>
      </div>

      <Link
        href={`/studio/${template.id}`}
        className="inline-flex items-center justify-between w-full h-9 px-3.5 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/70 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white rounded-xs transition-all duration-200 active:scale-[0.98]"
      >
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <Sliders className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          Customize Template
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
      </Link>
    </div>
  );
}
