"use client";

import React from "react";
import { Sparkles, Github, ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Fetch</span>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-sm">
            alpha
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#playground" className="hover:text-white transition-colors">
            Playground
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-white transition-colors">
            Components
          </a>
          <a href="#quickstart" className="hover:text-white transition-colors">
            Quickstart
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="#playground"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-white border border-zinc-700/80 shadow-xs transition-all cursor-pointer"
          >
            Launch Studio
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
}

