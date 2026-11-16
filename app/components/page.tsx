"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "../../components/landing/navbar";
import { EditorialFooter } from "../../components/landing/editorial-footer";
import { CatalogHeader } from "../../components/catalog/catalog-header";
import { TemplateCard } from "../../components/catalog/template-card";
import { TEMPLATES } from "../../lib/templates";
import { useAuth } from "../../context/auth-context";

const CATEGORIES = ["all", "elements", "components", "forms", "navigation"];

export default function CatalogPage() {
  const { isAuthenticated } = useAuth();
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

        {!isAuthenticated && (
          <div className="mb-8 p-4 border border-zinc-800 bg-zinc-950/80 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-6 h-6 rounded-xs bg-zinc-900 border border-zinc-700/80 flex items-center justify-center flex-shrink-0">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <p>
                <span className="font-semibold text-white">Guest Preview:</span> 12 foundational components are free to inspect. 28 advanced templates are blurred for members.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xs bg-white hover:bg-zinc-200 text-[#09090b] text-[11px] font-mono uppercase tracking-wider font-semibold flex-shrink-0 transition-all active:scale-[0.98]"
            >
              <span>Want more? Register!</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

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

