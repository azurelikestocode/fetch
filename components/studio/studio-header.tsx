"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Tablet, Smartphone, Copy, Check, Search } from "lucide-react";
import { ComponentTemplate } from "../../lib/templates";
import { CommandPalette } from "../common/command-palette";

interface StudioHeaderProps {
  template: ComponentTemplate;
  activeViewport: "desktop" | "tablet" | "mobile";
  onViewportChange: (viewport: "desktop" | "tablet" | "mobile") => void;
  onOpenCode: () => void;
  copied: boolean;
}

export function StudioHeader({
  template,
  activeViewport,
  onViewportChange,
  onOpenCode,
  copied,
}: StudioHeaderProps) {
  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950 px-4 flex items-center justify-between shrink-0">
      {/* Left: Back Link & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors p-1.5 rounded-xs hover:bg-zinc-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Directory</span>
        </Link>
        <span className="text-zinc-700">/</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-zinc-500 border border-zinc-800 px-1.5 py-0.2 rounded-xs">
            {template.category}
          </span>
          <span className="text-xs font-semibold text-[#fafafa] tracking-tight">{template.name}</span>
        </div>
      </div>

      {/* Center: Viewport Switcher */}
      <div className="hidden md:flex items-center border border-zinc-800 rounded-xs bg-zinc-900/60 p-0.5">
        <button
          onClick={() => onViewportChange("desktop")}
          aria-label="Desktop Viewport"
          className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
            activeViewport === "desktop" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onViewportChange("tablet")}
          aria-label="Tablet Viewport"
          className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
            activeViewport === "tablet" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onViewportChange("mobile")}
          aria-label="Mobile Viewport"
          className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
            activeViewport === "mobile" ? "bg-zinc-800 text-white shadow-xs" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Export / Copy Code */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-command-palette"));
          }}
          className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-xs border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-mono transition-colors cursor-pointer"
          title="Switch template (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Switch</span>
          <kbd className="text-[10px] px-1 py-0.5 bg-zinc-950 border border-zinc-800 rounded-xs text-zinc-500">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={onOpenCode}
          className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy Code"}</span>
        </button>
      </div>
      <CommandPalette />
    </header>
  );
}

