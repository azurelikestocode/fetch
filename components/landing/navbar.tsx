"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Github } from "lucide-react";

export function Navbar() {
  const pathname = usePathname() || "";
  const isComponentsPage = pathname.startsWith("/components");
  const isStudioPage = pathname.startsWith("/studio");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-xs bg-[#fafafa] flex items-center justify-center text-[#09090b] shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#fafafa]">Fetch</span>
          <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.2 rounded-xs">
            v2.0
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
          <Link
            href="/components"
            className={`transition-colors hover:text-white ${
              isComponentsPage ? "text-white font-medium underline underline-offset-8 decoration-zinc-600" : ""
            }`}
          >
            Components
          </Link>
          <Link
            href="/studio/button"
            className={`transition-colors hover:text-white ${
              isStudioPage ? "text-white font-medium underline underline-offset-8 decoration-zinc-600" : ""
            }`}
          >
            Studio
          </Link>
          <a href="/#philosophy" className="hover:text-white transition-colors">
            Philosophy
          </a>
          <a href="/#featured" className="hover:text-white transition-colors">
            Featured
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/azurelikestocode/fetch"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors hidden sm:block"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            href="/components"
            className="h-8 px-3.5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] text-xs font-medium tracking-wide uppercase transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Explore Components</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
