import React from "react";
import { Skeleton, SkeletonCard } from "../../components/ui/skeleton";

export default function CatalogLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      {/* Header placeholder */}
      <header className="h-16 border-b border-zinc-850 px-6 flex items-center justify-between">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-48 h-8 rounded-xs" />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Catalog Header Skeleton */}
        <div className="border-b border-zinc-850 pb-10 mb-12 space-y-4">
          <Skeleton className="w-32 h-3" />
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-96 h-4" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <Skeleton className="w-full sm:w-80 h-10 rounded-xs" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-9 rounded-xs" />
              <Skeleton className="w-20 h-9 rounded-xs" />
              <Skeleton className="w-24 h-9 rounded-xs" />
            </div>
          </div>
        </div>

        {/* 6 Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
