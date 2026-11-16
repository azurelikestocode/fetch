"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, Check, Sparkles, X } from "lucide-react";

export interface FontOption {
  name: string;
  category: "sans" | "display" | "serif" | "mono";
  popular?: boolean;
}

export const GOOGLE_FONTS: FontOption[] = [
  // Sans-Serif
  { name: "Inter", category: "sans", popular: true },
  { name: "Geist", category: "sans", popular: true },
  { name: "Plus Jakarta Sans", category: "sans", popular: true },
  { name: "Outfit", category: "sans", popular: true },
  { name: "Manrope", category: "sans" },
  { name: "DM Sans", category: "sans" },
  { name: "Sora", category: "sans" },
  { name: "Montserrat", category: "sans" },
  { name: "Work Sans", category: "sans" },
  { name: "Poppins", category: "sans" },

  // Tech & Display
  { name: "Space Grotesk", category: "display", popular: true },
  { name: "Syne", category: "display", popular: true },
  { name: "Archivo", category: "display" },
  { name: "Orbitron", category: "display" },
  { name: "Chakra Petch", category: "display" },
  { name: "Uncut Sans", category: "display" },

  // Editorial & Serif
  { name: "Playfair Display", category: "serif", popular: true },
  { name: "Lora", category: "serif", popular: true },
  { name: "Cinzel", category: "serif", popular: true },
  { name: "Cormorant Garamond", category: "serif" },
  { name: "Fraunces", category: "serif" },
  { name: "Newsreader", category: "serif" },
  { name: "Bodoni Moda", category: "serif" },

  // Monospace
  { name: "JetBrains Mono", category: "mono", popular: true },
  { name: "Fira Code", category: "mono", popular: true },
  { name: "Space Mono", category: "mono" },
  { name: "IBM Plex Mono", category: "mono" },
];

interface FontPickerProps {
  currentFont?: string;
  onSelectFont: (fontName: string) => void;
  onReset: () => void;
}

export function FontPicker({ currentFont, onSelectFont, onReset }: FontPickerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredFonts = useMemo(() => {
    return GOOGLE_FONTS.filter((font) => {
      const matchesCategory = selectedCategory === "all" || font.category === selectedCategory;
      const matchesSearch = font.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const exactMatchExists = useMemo(() => {
    return GOOGLE_FONTS.some((f) => f.name.toLowerCase() === search.trim().toLowerCase());
  }, [search]);

  return (
    <div className="space-y-2">
      {/* Search Input with Clear Button */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isExpanded) setIsExpanded(true);
          }}
          onFocus={() => setIsExpanded(true)}
          placeholder="Search 28+ Google Fonts or type any name..."
          className="w-full h-8 pl-8 pr-7 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xs text-[#fafafa] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
        {["all", "sans", "display", "serif", "mono"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`h-5 px-2 text-[10px] font-mono uppercase rounded-xs transition-colors shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? "bg-zinc-800 text-white font-semibold border border-zinc-700"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Font List Container */}
      <div className="border border-zinc-850 rounded-xs bg-zinc-950/60 max-h-48 overflow-y-auto custom-scrollbar p-1 space-y-0.5">
        {filteredFonts.map((font) => {
          const isSelected = currentFont === font.name;
          return (
            <button
              key={font.name}
              type="button"
              onClick={() => {
                onSelectFont(font.name);
                setSearch("");
              }}
              className={`w-full h-7 px-2.5 rounded-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
                isSelected
                  ? "bg-zinc-800 text-white font-medium border border-zinc-700"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs truncate">{font.name}</span>
                {font.popular && (
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xs">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-mono uppercase text-zinc-600">{font.category}</span>
                {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
              </div>
            </button>
          );
        })}

        {/* Custom Font Prompt if user typed something custom */}
        {search.trim().length > 0 && !exactMatchExists && (
          <button
            type="button"
            onClick={() => {
              onSelectFont(search.trim());
              setSearch("");
            }}
            className="w-full p-2 rounded-xs bg-indigo-950/40 border border-indigo-900/60 hover:bg-indigo-900/40 text-left transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs text-indigo-200">
                Apply custom font &ldquo;<span className="font-semibold text-white">{search.trim()}</span>&rdquo;
              </span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 shrink-0">Google Fonts</span>
          </button>
        )}

        {filteredFonts.length === 0 && search.trim().length === 0 && (
          <div className="p-3 text-center text-xs text-zinc-600 font-mono">No fonts found</div>
        )}
      </div>

      {/* External Link to Browse Google Fonts */}
      <div className="flex items-center justify-between pt-1 px-1 text-[10px] font-mono text-zinc-500">
        <a
          href="https://fonts.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-zinc-300 underline underline-offset-2 transition-colors"
        >
          <span>Browse 1,700+ Google Fonts</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
        {currentFont && (
          <button
            type="button"
            onClick={onReset}
            className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 cursor-pointer"
          >
            Reset to Default
          </button>
        )}
      </div>
    </div>
  );
}
