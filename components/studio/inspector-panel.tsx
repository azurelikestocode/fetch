"use client";

import React from "react";
import { Sliders, Palette, Type, RotateCcw } from "lucide-react";
import { Slider } from "../ui/slider";
import { ComponentTemplate } from "../../lib/templates";
import { ThemeTokens, COLOR_SWATCHES } from "../../lib/tokens";

interface InspectorPanelProps {
  template: ComponentTemplate;
  tokens: ThemeTokens;
  props: Record<string, any>;
  onTokenChange: (tokens: Partial<ThemeTokens>) => void;
  onPropChange: (key: string, value: any) => void;
  onReset: () => void;
}

export function InspectorPanel({
  template,
  tokens,
  props,
  onTokenChange,
  onPropChange,
  onReset,
}: InspectorPanelProps) {
  return (
    <aside className="w-full lg:w-80 border-r border-zinc-800/80 bg-zinc-950 overflow-y-auto p-5 shrink-0 space-y-8">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
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

      {/* Geometry / Corner Radius */}
      <div className="space-y-3">
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

      {/* Colors / Accent Swatches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
            <Palette className="w-3.5 h-3.5 text-zinc-400" />
            Primary Brand Accent
          </span>
          <span className="font-mono text-zinc-400 uppercase text-[11px]">{tokens.primary}</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.value}
              onClick={() => onTokenChange({ primary: swatch.value, primaryForeground: swatch.foreground })}
              aria-label={swatch.name}
              className={`w-6 h-6 rounded-xs transition-transform cursor-pointer relative flex items-center justify-center ${
                tokens.primary.toLowerCase() === swatch.value.toLowerCase()
                  ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110"
                  : "hover:scale-105 opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: swatch.value }}
            />
          ))}
        </div>
      </div>

      {/* Template-Specific Content & Typography Controls */}
      <div className="space-y-4 pt-4 border-t border-zinc-800/80">
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
                            : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
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
