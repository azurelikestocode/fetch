"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useTokenTheme } from "../../hooks/use-token-theme";
import { COLOR_SWATCHES, THEME_PRESETS, generateTailwindJsx, generateThemeCss } from "../../lib/tokens";
import { Copy, Check, Sparkles, Sliders, Palette, Code2 } from "lucide-react";

export function HeroPlayground() {
  const { tokens, activePreset, setRadius, setColor, setPreset, styleObject } = useTokenTheme("default");
  const [activeTab, setActiveTab] = useState<"tailwind" | "tokens">("tailwind");
  const [copied, setCopied] = useState(false);

  const currentCode =
    activeTab === "tailwind"
      ? generateTailwindJsx("card", tokens)
      : generateThemeCss(tokens);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 md:p-8 shadow-2xl backdrop-blur-md">
      {/* Preset Selector Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--primary)]" style={{ color: tokens.primary }} />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Theme Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.values(THEME_PRESETS).map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                activePreset === p.id
                  ? "bg-zinc-800 text-white shadow-xs border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls on Left, Preview Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Radius Control */}
          <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                Corner Radius
              </span>
              <span className="font-mono text-zinc-400 font-medium">{tokens.radius}px</span>
            </div>
            <Slider
              value={[tokens.radius]}
              min={0}
              max={24}
              step={1}
              onValueChange={(val) => setRadius(val[0])}
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono pt-1">
              <button onClick={() => setRadius(0)} className="hover:text-zinc-300 cursor-pointer">
                Sharp (0px)
              </button>
              <button onClick={() => setRadius(6)} className="hover:text-zinc-300 cursor-pointer">
                Subtle (6px)
              </button>
              <button onClick={() => setRadius(12)} className="hover:text-zinc-300 cursor-pointer">
                Smooth (12px)
              </button>
              <button onClick={() => setRadius(24)} className="hover:text-zinc-300 cursor-pointer">
                Pill (24px)
              </button>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-zinc-400" />
                Primary Accent Color
              </span>
              <span className="font-mono text-zinc-400 uppercase text-[11px]">{tokens.primary}</span>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.value}
                  onClick={() => setColor(swatch.value, swatch.foreground)}
                  aria-label={swatch.name}
                  className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                    tokens.primary.toLowerCase() === swatch.value.toLowerCase()
                      ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: swatch.value }}
                >
                  {tokens.primary.toLowerCase() === swatch.value.toLowerCase() && (
                    <Check
                      className="w-3.5 h-3.5"
                      style={{ color: swatch.foreground }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7">
          <div
            className="fetch-preview p-6 sm:p-8 rounded-xl border border-zinc-800/80 bg-zinc-900/40 relative flex items-center justify-center"
            style={styleObject}
          >
            {/* Live Configurable Card */}
            <Card className="w-full max-w-md shadow-xl backdrop-blur-xs">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="subtle">v1.0-alpha</Badge>
                  <span className="text-[11px] font-mono text-zinc-400">Live Preview</span>
                </div>
                <CardTitle>Configurable Card</CardTitle>
                <CardDescription>
                  Visually tweak tokens above and watch every element update seamlessly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Custom Workspace Label</label>
                  <Input placeholder="e.g. My Next.js Dashboard" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2.5 justify-end">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="primary" size="sm">
                  Deploy Component
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "tailwind"}
              onClick={() => setActiveTab("tailwind")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === "tailwind"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Tailwind JSX
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "tokens"}
              onClick={() => setActiveTab("tokens")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === "tokens"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Theme Tokens
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-8 gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>

        <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed max-h-48">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
}
