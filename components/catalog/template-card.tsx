import React from "react";
import Link from "next/link";
import { ArrowRight, Sliders } from "lucide-react";
import { ComponentTemplate } from "../../lib/templates";

interface TemplateCardProps {
  template: ComponentTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-xs">
            {template.category}
          </span>
          <span className="text-[11px] font-mono text-zinc-600">ID: {template.id}</span>
        </div>

        {/* Live Preview Box */}
        <div className="h-44 flex items-center justify-center p-4 bg-[#09090b] border border-zinc-850 rounded-xs mb-6 overflow-hidden pointer-events-none select-none">
          {template.renderComponent({}, template.defaultTokens)}
        </div>

        <h3 className="text-sm font-semibold text-[#fafafa] mb-1.5">{template.name}</h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6">{template.description}</p>
      </div>

      <Link
        href={`/studio/${template.id}`}
        className="inline-flex items-center justify-between w-full h-9 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-850 text-xs font-medium text-zinc-300 hover:text-white rounded-xs transition-colors"
      >
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <Sliders className="w-3 h-3 text-zinc-500" />
          Customize Template
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
