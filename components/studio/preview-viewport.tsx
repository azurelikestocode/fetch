"use client";

import React from "react";
import { ComponentTemplate } from "../../lib/templates";
import { ThemeTokens } from "../../lib/tokens";

interface PreviewViewportProps {
  template: ComponentTemplate;
  tokens: ThemeTokens;
  props: Record<string, any>;
  viewport: "desktop" | "tablet" | "mobile";
}

export function PreviewViewport({
  template,
  tokens,
  props,
  viewport,
}: PreviewViewportProps) {
  const widthClasses = {
    desktop: "w-full max-w-4xl",
    tablet: "w-full max-w-[768px]",
    mobile: "w-full max-w-[375px]",
  }[viewport];

  return (
    <div className="flex-1 bg-[#09090b] overflow-auto p-6 sm:p-12 flex flex-col items-center justify-center relative min-h-[500px]">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Viewport Frame */}
      <div
        className={`transition-all duration-300 mx-auto flex items-center justify-center p-8 sm:p-12 border border-zinc-800/80 rounded-xs bg-zinc-950/70 shadow-2xl relative z-10 ${widthClasses}`}
      >
        <div className="fetch-preview w-full flex items-center justify-center">
          {template.renderComponent(props, tokens)}
        </div>
      </div>

      <div className="mt-4 text-[11px] font-mono text-zinc-600 uppercase tracking-widest z-10">
        Viewport: {viewport} {viewport === "mobile" ? "(375px)" : viewport === "tablet" ? "(768px)" : "(100%)"}
      </div>
    </div>
  );
}

