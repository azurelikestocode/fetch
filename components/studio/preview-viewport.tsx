"use client";

import React, { useState } from "react";
import { Grid, Eye, ZoomIn, ZoomOut, Maximize2, Moon, Sun } from "lucide-react";
import { ComponentTemplate } from "../../lib/templates";
import { ThemeTokens } from "../../lib/tokens";

interface PreviewViewportProps {
  template: ComponentTemplate;
  tokens: ThemeTokens;
  props: Record<string, any>;
  viewport: "desktop" | "tablet" | "mobile";
}

type CanvasBg = "dot-grid" | "mesh" | "pitch-dark" | "studio-light";

export function PreviewViewport({
  template,
  tokens,
  props,
  viewport,
}: PreviewViewportProps) {
  const [canvasBg, setCanvasBg] = useState<CanvasBg>("dot-grid");
  const [zoom, setZoom] = useState<number>(100);

  const widthClasses = {
    desktop: "w-full max-w-3xl",
    tablet: "w-full max-w-[640px]",
    mobile: "w-full max-w-[375px]",
  }[viewport];

  const simulation = props.simulatedState || "default";

  return (
    <div
      className={`flex-1 min-w-0 h-full overflow-auto p-4 sm:p-8 md:p-12 flex flex-col items-center justify-between relative transition-colors duration-300 ${
        canvasBg === "studio-light"
          ? "bg-zinc-100 text-zinc-900"
          : canvasBg === "pitch-dark"
          ? "bg-black text-[#fafafa]"
          : "bg-[#09090b] text-[#fafafa]"
      }`}
    >
      {/* Background patterns */}
      {canvasBg === "dot-grid" && (
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      )}
      {canvasBg === "mesh" && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
      )}
      {canvasBg === "studio-light" && (
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      )}

      {/* Top Floating Viewport Control Toolbar */}
      <div className="w-full max-w-3xl flex items-center justify-between z-20 mb-4 px-2">
        {/* Canvas Background Toggles */}
        <div className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-xs p-1">
          <button
            onClick={() => setCanvasBg("dot-grid")}
            title="Dot Grid Canvas"
            className={`h-6 px-2 text-[10px] font-mono rounded-xs transition-colors flex items-center gap-1 ${
              canvasBg === "dot-grid" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Grid className="w-3 h-3" />
            <span className="hidden sm:inline">Dots</span>
          </button>
          <button
            onClick={() => setCanvasBg("mesh")}
            title="Architectural Mesh"
            className={`h-6 px-2 text-[10px] font-mono rounded-xs transition-colors flex items-center gap-1 ${
              canvasBg === "mesh" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="hidden sm:inline">Mesh</span>
          </button>
          <button
            onClick={() => setCanvasBg("pitch-dark")}
            title="Pitch Black"
            className={`h-6 px-2 text-[10px] font-mono rounded-xs transition-colors flex items-center gap-1 ${
              canvasBg === "pitch-dark" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Moon className="w-3 h-3" />
            <span className="hidden sm:inline">Pitch</span>
          </button>
          <button
            onClick={() => setCanvasBg("studio-light")}
            title="Studio Light Background"
            className={`h-6 px-2 text-[10px] font-mono rounded-xs transition-colors flex items-center gap-1 ${
              canvasBg === "studio-light" ? "bg-zinc-200 text-zinc-900 font-semibold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Sun className="w-3 h-3" />
            <span className="hidden sm:inline">Light</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-xs p-1">
          <button
            onClick={() => setZoom((z) => Math.max(75, z - 25))}
            title="Zoom Out"
            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-mono text-zinc-400 w-10 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(150, z + 25))}
            title="Zoom In"
            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            onClick={() => setZoom(100)}
            title="Reset Zoom"
            className="w-6 h-6 flex items-center justify-center text-zinc-500 hover:text-white transition-colors ml-1 border-l border-zinc-800"
          >
            <Maximize2 className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Stage Frame */}
      <div
        className={`transition-all duration-300 mx-auto my-auto flex items-center justify-center p-8 sm:p-14 border rounded-xs shadow-2xl relative z-10 ${widthClasses} ${
          canvasBg === "studio-light"
            ? "border-zinc-300 bg-white/90 shadow-zinc-200"
            : "border-zinc-800/80 bg-zinc-950/80 shadow-black/80"
        }`}
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center center",
        }}
      >
        {/* Subtle accent glow reflection when brand color is active */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xs opacity-15 transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 40px ${tokens.primary}`,
          }}
        />

        <div
          className={`fetch-preview w-full flex items-center justify-center transition-all duration-300 ${
            simulation === "hover"
              ? "scale-[1.02] filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              : simulation === "active"
              ? "scale-[0.98]"
              : simulation === "disabled"
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          {template.renderComponent(props, tokens)}
        </div>
      </div>

      {/* Bottom Dimension Indicator */}
      <div className="mt-4 flex items-center gap-3 text-[11px] font-mono text-zinc-500 uppercase tracking-widest z-10">
        <span>Viewport: {viewport}</span>
        <span className="text-zinc-700">|</span>
        <span>
          {viewport === "mobile" ? "375 × 667" : viewport === "tablet" ? "768 × 1024" : "Responsive Full"}
        </span>
        {simulation !== "default" && (
          <>
            <span className="text-zinc-700">|</span>
            <span className="text-amber-400 font-semibold">State: {simulation}</span>
          </>
        )}
      </div>
    </div>
  );
}
