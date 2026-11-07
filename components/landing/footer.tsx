import React from "react";
import { Sparkles, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-sm text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-white">Fetch</span>
          <span className="text-xs text-zinc-500">
            — Live-configurable UI components for web developers.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            Twitter
          </a>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
}

