"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sliders } from "lucide-react";
import { TEMPLATES } from "../../lib/templates";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut (Ctrl+K or Cmd+K) and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return Object.values(TEMPLATES).slice(0, 10);
    return Object.values(TEMPLATES)
      .filter((t) => {
        return (
          t.name.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        );
      })
      .slice(0, 10);
  }, [query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered]);

  const handleSelect = (templateId: string) => {
    setIsOpen(false);
    setQuery("");
    if (typeof window !== "undefined") {
      window.location.href = `/studio/${templateId}`;
    }
  };

  // Keyboard navigation for results
  const handleKeyDownInDialog = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].id);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Component Quick Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-xs animate-fade-in"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div
        onKeyDown={handleKeyDownInDialog}
        className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/40 shrink-0">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 47 components (e.g. heatmap, waveform, dock)..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 border border-zinc-800 rounded-xs bg-zinc-900 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-zinc-900/60 flex-1">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xs text-left transition-colors cursor-pointer group ${
                    isSelected ? "bg-zinc-900 border border-zinc-700/80" : "border border-transparent hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-zinc-800 border-zinc-600 text-white"
                          : "bg-zinc-950 border-zinc-850 text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-zinc-100 group-hover:text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 truncate">
                        ID: {item.id} • {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 group-hover:text-indigo-400 shrink-0 pl-2">
                    <span className="hidden sm:inline">Customize</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs font-mono text-zinc-500">
              No components matching "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-[10px] font-mono text-zinc-500 shrink-0">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open Studio</span>
          </div>
          <span>47 Components Loaded</span>
        </div>
      </div>
    </div>
  );
}
