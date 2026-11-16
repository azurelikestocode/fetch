import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

export default function StudioLoading() {
  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-[#09090b] text-[#fafafa]">
      {/* Top Header Skeleton */}
      <header className="h-14 border-b border-zinc-850 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-36 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-7 rounded-xs" />
          <Skeleton className="w-24 h-7 rounded-xs" />
        </div>
      </header>

      {/* Main Workspace Skeleton */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Inspector Sidebar Skeleton */}
        <aside className="w-full md:w-[360px] border-r border-zinc-850 p-5 space-y-6 bg-zinc-950 shrink-0">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-12 h-3" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-24 h-3" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-8 rounded-xs" />
              <Skeleton className="h-8 rounded-xs" />
              <Skeleton className="h-8 rounded-xs" />
              <Skeleton className="h-8 rounded-xs" />
            </div>
          </div>
          <div className="space-y-3 pt-3 border-t border-zinc-850">
            <Skeleton className="w-24 h-3" />
            <Skeleton className="h-6 w-full rounded-xs" />
          </div>
          <div className="space-y-3 pt-3 border-t border-zinc-850">
            <Skeleton className="w-32 h-3" />
            <Skeleton className="h-10 w-full rounded-xs" />
          </div>
        </aside>

        {/* Viewport Canvas Skeleton */}
        <main className="flex-1 flex items-center justify-center p-8 bg-[#09090b]">
          <div className="border border-zinc-850 bg-zinc-950 p-8 rounded-xs max-w-md w-full space-y-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-32 rounded-xs" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-full h-8 rounded-xs" />
          </div>
        </main>
      </div>
    </div>
  );
}
