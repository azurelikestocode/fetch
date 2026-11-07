import React from "react";
import Link from "next/link";
import { Sparkles, Terminal } from "lucide-react";

export function EditorialFooter() {
  return (
    <footer className="py-16 bg-[#09090b] text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-xs bg-[#fafafa] flex items-center justify-center text-[#09090b]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-[#fafafa] tracking-tight">Fetch Architecture</span>
            <span className="font-mono text-[10px] text-zinc-600">v2.0.0</span>
          </div>

          <div className="flex flex-wrap items-center gap-8 font-mono text-[11px] text-zinc-400">
            <Link href="/components" className="hover:text-white transition-colors">
              Components
            </Link>
            <a href="#philosophy" className="hover:text-white transition-colors">
              Philosophy
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span className="text-zinc-600">MIT Open Source</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
          <span>Crafted with Swiss precision for software engineers.</span>
          <span>Tokyo / Zurich / San Francisco</span>
        </div>
      </div>
    </footer>
  );
}
