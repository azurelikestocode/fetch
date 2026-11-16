import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xs bg-zinc-850/80 ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-zinc-850 bg-zinc-950 p-6 rounded-xs flex flex-col justify-between space-y-6 animate-pulse">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="h-48 bg-[#09090b] border border-zinc-850 rounded-xs mb-6 flex items-center justify-center p-4">
          <Skeleton className="h-24 w-3/4 rounded-xs" />
        </div>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-3 w-5/6 mb-1" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="h-9 w-full rounded-xs" />
    </div>
  );
}
