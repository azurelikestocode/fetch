"use client";

import React from "react";
import { Search } from "lucide-react";

interface CatalogHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function CatalogHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: CatalogHeaderProps) {
  return (
    <div className="border-b border-zinc-800/80 pb-10 mb-12">
      <div className="max-w-2xl mb-8">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
          Directory & Primitives
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#fafafa] mb-3">
          Component Catalog
        </h1>
        <p className="text-sm text-zinc-400 font-normal">
          Explore our architecture-grade components. Filter by design style or use the search bar to locate specific patterns.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search components, templates, or primitives..."
            className="w-full h-10 pl-9 pr-4 rounded-xs border border-zinc-800 bg-zinc-950 text-xs text-[#fafafa] placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="button"
                onClick={() => onCategoryChange(cat)}
                className={`h-9 px-3.5 text-xs font-mono uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#fafafa] text-[#09090b] border-white font-semibold"
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 bg-zinc-950"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

