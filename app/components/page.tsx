"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "../../components/landing/navbar";
import { EditorialFooter } from "../../components/landing/editorial-footer";
import { CatalogHeader } from "../../components/catalog/catalog-header";
import { TemplateCard } from "../../components/catalog/template-card";
import { TEMPLATES } from "../../lib/templates";

const CATEGORIES = ["all", "elements", "components", "forms", "navigation"];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: Object.keys(TEMPLATES).length };
    Object.values(TEMPLATES).forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return Object.values(TEMPLATES).filter((template) => {
      const matchesSearch =
        !q ||
        template.name.toLowerCase().includes(q) ||
        template.description.toLowerCase().includes(q) ||
        template.id.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" || template.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <CatalogHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
          categoryCounts={categoryCounts}
        />

        {/* Quick Filter Collections */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 text-xs font-mono text-zinc-400">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider shrink-0">Quick Topics:</span>
          {[
            { label: "AI & Copilots", query: "ai" },
            { label: "CI/CD & DevOps", query: "pipeline" },
            { label: "Telemetry & SLA", query: "telemetry" },
            { label: "Security & Vault", query: "vault" },
            { label: "Multiplayer", query: "multiplayer" },
            { label: "Navigation", query: "nav" },
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setSearchQuery(tag.query);
                setSelectedCategory("all");
              }}
              className={`px-2.5 py-1 rounded-xs border text-[11px] shrink-0 transition-colors cursor-pointer ${
                searchQuery.toLowerCase() === tag.query.toLowerCase()
                  ? "bg-zinc-800 text-white border-zinc-600 font-semibold"
                  : "border-zinc-850 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white"
              }`}
            >
              {tag.label}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-2 py-1 text-[11px] text-zinc-500 hover:text-red-400 transition-colors cursor-pointer underline"
            >
              Clear
            </button>
          )}
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-zinc-850 rounded-xs bg-zinc-950/40">
            <p className="text-sm font-mono text-zinc-400 mb-2">No matching components found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-mono text-zinc-500 hover:text-white underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <EditorialFooter />
    </div>
  );
}

