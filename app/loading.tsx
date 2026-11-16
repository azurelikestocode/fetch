import React from "react";
import { Skeleton } from "../components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col">
      {/* Header Skeleton */}
      <header className="h-16 border-b border-zinc-850 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-xs" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-24 h-8 rounded-xs" />
        </div>
      </header>

      {/* Hero Skeleton */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <Skeleton className="w-36 h-6 rounded-xs" />
        <Skeleton className="w-3/4 h-16 rounded-xs" />
        <Skeleton className="w-1/2 h-6 rounded-xs" />
        <div className="flex items-center gap-4 pt-4">
          <Skeleton className="w-40 h-11 rounded-xs" />
          <Skeleton className="w-32 h-11 rounded-xs" />
        </div>

        {/* 4-Item Metrics Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-zinc-850">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </main>
    </div>
  );
}
