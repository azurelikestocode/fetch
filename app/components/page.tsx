"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "../../components/landing/navbar";
import { EditorialFooter } from "../../components/landing/editorial-footer";
import { CatalogHeader } from "../../components/catalog/catalog-header";
import { TemplateCard } from "../../components/catalog/template-card";
import { TEMPLATES } from "../../lib/templates";

const CATEGORIES = ["all", "primitives", "patterns", "forms"];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = useMemo(() => {
    return Object.values(TEMPLATES).filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.id.toLowerCase().includes(searchQuery.toLowerCase());

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
        />

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
