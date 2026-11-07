"use client";

import React, { useState } from "react";
import { X, Copy, Check, Code2 } from "lucide-react";
import { copyToClipboard } from "../../lib/utils";

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tailwindJsx: string;
  themeCss: string;
}

export function CodeExportModal({
  isOpen,
  onClose,
  tailwindJsx,
  themeCss,
}: CodeExportModalProps) {
  const [activeTab, setActiveTab] = useState<"tailwind" | "tokens">("tailwind");
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCode = activeTab === "tailwind" ? tailwindJsx : themeCss;

  const handleCopy = async () => {
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl border border-zinc-800 bg-zinc-950 rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="h-12 border-b border-zinc-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-zinc-400" />
            <h2 id="export-dialog-title" className="text-xs font-mono font-semibold text-[#fafafa] uppercase tracking-wider">
              Export Production Code
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher & Copy Action */}
        <div className="border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-1.5" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "tailwind"}
              onClick={() => setActiveTab("tailwind")}
              className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "tailwind"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Tailwind JSX (Self-Contained)
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "tokens"}
              onClick={() => setActiveTab("tokens")}
              className={`px-3 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "tokens"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Theme CSS Variables
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] text-xs font-mono font-medium tracking-wide uppercase transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-auto flex-1 bg-[#09090b]">
          <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

