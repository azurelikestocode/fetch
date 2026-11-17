"use client";

import React, { useState } from "react";
import {
  Sliders,
  Palette,
  Type,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  ChevronDown,
  ChevronUp,
  Wand2,
  Sun,
  Shield,
  Box,
  Baseline,
  SunMedium,
  Frame,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { ComponentTemplate } from "../../lib/templates";
import { ThemeTokens, COLOR_SWATCHES, THEME_PRESETS } from "../../lib/tokens";
import { VisualColorPicker } from "./color-picker";
import { FontPicker } from "./font-picker";

interface InspectorPanelProps {
  template: ComponentTemplate;
  tokens: ThemeTokens;
  props: Record<string, any>;
  onTokenChange: (tokens: Partial<ThemeTokens>) => void;
  onPropChange: (key: string, value: any) => void;
  onReset: () => void;
}

const SURFACE_PRESETS = [
  { name: "Zinc Slate", value: "#18181b" },
  { name: "Pitch Black", value: "#09090b" },
  { name: "Deep Navy", value: "#0f172a" },
  { name: "Neutral Dark", value: "#171717" },
];

export function InspectorPanel({
  template,
  tokens,
  props,
  onTokenChange,
  onPropChange,
  onReset,
}: InspectorPanelProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentSimulation = props.simulatedState || "default";

  const handleApplyPreset = (presetKey: string) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      onTokenChange({ ...preset.tokens });
    }
  };

  return (
    <aside className="w-full md:w-[360px] border-r border-zinc-800/80 bg-zinc-950 overflow-y-auto custom-scrollbar p-5 shrink-0 space-y-7 h-full select-none">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          Component Inspector
        </span>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Design Theme Presets */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Wand2 className="w-3.5 h-3.5 text-zinc-400" />
            Style Preset
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handleApplyPreset(key)}
              className="h-7 px-2 text-[10px] font-mono rounded-xs border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: preset.tokens.primary }}
              />
              <span className="truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Geometry / Corner Radius */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
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
          onValueChange={(val) => onTokenChange({ radius: val[0] })}
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-1">
          <button onClick={() => onTokenChange({ radius: 0 })} className="hover:text-zinc-300 cursor-pointer">
            Sharp (0px)
          </button>
          <button onClick={() => onTokenChange({ radius: 6 })} className="hover:text-zinc-300 cursor-pointer">
            Subtle (6px)
          </button>
          <button onClick={() => onTokenChange({ radius: 12 })} className="hover:text-zinc-300 cursor-pointer">
            Smooth (12px)
          </button>
          <button onClick={() => onTokenChange({ radius: 24 })} className="hover:text-zinc-300 cursor-pointer">
            Pill (24px)
          </button>
        </div>
      </div>

      {/* Typography & Fonts Section */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Baseline className="w-3.5 h-3.5 text-zinc-400" />
            Typography & Font Family
          </span>
          <span className="font-mono text-zinc-400 text-[10px] uppercase truncate max-w-[130px]">
            {tokens.customFont || tokens.fontFamily || "sans"}
          </span>
        </div>

        {/* Interactive Google Fonts Library & Search */}
        <FontPicker
          currentFont={tokens.customFont}
          onSelectFont={(fontName) => onTokenChange({ customFont: fontName, fontFamily: "custom" })}
          onReset={() => onTokenChange({ customFont: undefined, fontFamily: "sans" })}
        />

        {/* Letter Spacing (Tracking) */}
        <div className="space-y-1 pt-1">
          <label className="text-[10px] font-mono text-zinc-500 uppercase">Letter Spacing (Tracking)</label>
          <div className="grid grid-cols-3 gap-1">
            {["tight", "normal", "wide"].map((track) => (
              <button
                key={track}
                onClick={() => onTokenChange({ letterSpacing: track as any })}
                className={`h-6 text-[10px] font-mono uppercase rounded-xs border transition-colors cursor-pointer ${
                  (tokens.letterSpacing || "normal") === track
                    ? "bg-zinc-800 text-white border-zinc-600 font-semibold"
                    : "border-zinc-850 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Font Weight */}
        <div className="space-y-1 pt-1">
          <label className="text-[10px] font-mono text-zinc-500 uppercase">Font Weight</label>
          <div className="grid grid-cols-4 gap-1">
            {["normal", "medium", "semibold", "bold"].map((w) => (
              <button
                key={w}
                onClick={() => onTokenChange({ fontWeight: w as any })}
                className={`h-6 text-[9px] font-mono uppercase rounded-xs border transition-colors cursor-pointer ${
                  (tokens.fontWeight || "medium") === w
                    ? "bg-zinc-800 text-white border-zinc-600 font-semibold"
                    : "border-zinc-850 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shadows, Elevation & Glow Aura */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <SunMedium className="w-3.5 h-3.5 text-zinc-400" />
            Elevation & Shadow
          </span>
          <span className="font-mono text-zinc-400 text-[10px] uppercase">{tokens.shadow || "sm"}</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[
            { id: "none", label: "Flat" },
            { id: "sm", label: "Subtle" },
            { id: "lg", label: "Floating" },
            { id: "glow", label: "Glow" },
          ].map((sh) => (
            <button
              key={sh.id}
              onClick={() => onTokenChange({ shadow: sh.id as any })}
              className={`h-7 text-[10px] font-mono uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                (tokens.shadow || "sm") === sh.id
                  ? "bg-zinc-800 text-white border-zinc-600 font-semibold"
                  : "border-zinc-850 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {sh.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colors / Primary Brand Accent & Draggable Spectrum */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Palette className="w-3.5 h-3.5 text-zinc-400" />
            Primary Brand Accent
          </span>
          <span className="font-mono text-zinc-400 uppercase text-[11px]">{tokens.primary}</span>
        </div>

        {/* Preset Color Swatches */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.value}
              onClick={() => onTokenChange({ primary: swatch.value, primaryForeground: swatch.foreground })}
              title={swatch.name}
              aria-label={swatch.name}
              className={`h-6 rounded-xs transition-all cursor-pointer relative flex items-center justify-center ${
                tokens.primary.toLowerCase() === swatch.value.toLowerCase()
                  ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-105"
                  : "hover:scale-105 opacity-80 hover:opacity-100 border border-zinc-800"
              }`}
              style={{ backgroundColor: swatch.value }}
            />
          ))}
        </div>

        {/* Toggleable Visual 2D Color Spectrum Box & Hue Slider */}
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-full h-8 px-2.5 rounded-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-xs border border-zinc-700"
              style={{ backgroundColor: tokens.primary }}
            />
            <span>{showColorPicker ? "Hide Color Spectrum" : "Open 2D Color Spectrum"}</span>
          </span>
          {showColorPicker ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showColorPicker && (
          <VisualColorPicker
            color={tokens.primary}
            onChange={(hex, isLight) =>
              onTokenChange({
                primary: hex,
                primaryForeground: isLight ? "#09090b" : "#ffffff",
              })
            }
          />
        )}

        {/* Live A11y WCAG Contrast Ratio Meter */}
        {(() => {
          const getLuminance = (hex: string) => {
            const clean = hex.replace("#", "");
            const r = parseInt(clean.substring(0, 2), 16) / 255;
            const g = parseInt(clean.substring(2, 4), 16) / 255;
            const b = parseInt(clean.substring(4, 6), 16) / 255;
            const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
          };
          try {
            const l1 = getLuminance(tokens.primary);
            const l2 = getLuminance(tokens.primaryForeground || "#ffffff");
            const ratio = Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 10) / 10;
            const isAAA = ratio >= 7;
            const isAA = ratio >= 4.5;
            return (
              <div className="p-2 rounded-xs border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-zinc-500" />
                  <span>WCAG Contrast:</span>
                  <span className="text-white font-bold">{ratio}:1</span>
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded-2xs font-semibold ${
                    isAAA
                      ? "border border-emerald-800 bg-emerald-950 text-emerald-400"
                      : isAA
                      ? "border border-cyan-800 bg-cyan-950 text-cyan-400"
                      : "border border-amber-800 bg-amber-950 text-amber-400"
                  }`}
                >
                  {isAAA ? "AAA PASS" : isAA ? "AA PASS" : "AA LARGE"}
                </span>
              </div>
            );
          } catch {
            return null;
          }
        })()}
      </div>

      {/* Surface Tone Presets */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            Surface Tone
          </span>
          <span className="font-mono text-zinc-400 uppercase text-[11px]">{tokens.surface}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SURFACE_PRESETS.map((surf) => (
            <button
              key={surf.value}
              onClick={() => onTokenChange({ surface: surf.value })}
              className={`h-8 px-2.5 rounded-xs border text-left text-[11px] font-mono transition-all cursor-pointer flex items-center gap-2 ${
                tokens.surface === surf.value
                  ? "border-zinc-500 bg-zinc-900 text-white"
                  : "border-zinc-850 bg-zinc-950/80 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="w-3 h-3 rounded-xs border border-zinc-700" style={{ backgroundColor: surf.value }}></span>
              <span className="truncate">{surf.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive State Simulator */}
      <div className="space-y-3 pt-2 border-t border-zinc-850">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Activity className="w-3.5 h-3.5 text-zinc-400" />
            Simulate State
          </span>
          <span className="font-mono text-zinc-500 text-[10px] uppercase">{currentSimulation}</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {["default", "hover", "active", "disabled"].map((st) => (
            <button
              key={st}
              onClick={() => onPropChange("simulatedState", st)}
              className={`h-7 text-[10px] font-mono uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                currentSimulation === st
                  ? "bg-zinc-800 text-white border-zinc-600 font-semibold"
                  : "border-zinc-850 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Template-Specific Content & Properties */}
      <div className="space-y-4 pt-2 border-t border-zinc-850 pb-8">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
          <Type className="w-3.5 h-3.5" />
          <span>Content & Properties</span>
        </div>

        <div className="space-y-3">
          {template.configurableProps.map((field) => {
            const val = props[field.key] ?? field.defaultValue;

            if (field.type === "select" && field.options) {
              return (
                <div key={field.key} className="space-y-1">
                  <label className="text-xs text-zinc-400 font-mono text-[11px] block">{field.label}</label>
                  <div className="flex items-center gap-1.5">
                    {field.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => onPropChange(field.key, opt)}
                        className={`h-7 px-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs border transition-colors cursor-pointer ${
                          val === opt
                            ? "bg-zinc-800 text-white border-zinc-600"
                            : "border-zinc-850 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            if (field.type === "boolean") {
              return (
                <div key={field.key} className="flex items-center justify-between pt-1">
                  <label className="text-xs text-zinc-400 font-mono text-[11px]">{field.label}</label>
                  <input
                    type="checkbox"
                    checked={Boolean(val)}
                    onChange={(e) => onPropChange(field.key, e.target.checked)}
                    className="h-4 w-4 rounded-xs border-zinc-800 bg-zinc-900 text-white focus:ring-0 cursor-pointer"
                  />
                </div>
              );
            }

            // Default: text input
            return (
              <div key={field.key} className="space-y-1">
                <label className="text-xs text-zinc-400 font-mono text-[11px] block">{field.label}</label>
                <input
                  type="text"
                  value={String(val || "")}
                  onChange={(e) => onPropChange(field.key, e.target.value)}
                  className="w-full h-8 px-2.5 text-xs text-[#fafafa] bg-zinc-900 border border-zinc-800 rounded-xs focus:outline-none focus:border-zinc-600 font-mono text-[11px]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
