"use client";

import React, { useState } from "react";
import { X, Copy, Check, Code2, Download, FileCode, CheckCircle2 } from "lucide-react";
import { copyToClipboard } from "../../lib/utils";

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tailwindJsx: string;
  themeCss: string;
  templateId?: string;
  templateName?: string;
}

export function CodeExportModal({
  isOpen,
  onClose,
  tailwindJsx,
  themeCss,
  templateId = "component",
  templateName = "Component",
}: CodeExportModalProps) {
  const [activeTab, setActiveTab] = useState<"tailwind" | "html" | "tokens" | "typescript">("tailwind");
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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

  const componentPascalName = templateId
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  const fullReactComponent = `import React from "react";

export interface ${componentPascalName}Props {
  className?: string;
}

export function ${componentPascalName}({ className = "" }: ${componentPascalName}Props) {
  return (
    ${tailwindJsx.split("\n").join("\n    ")}
  );
}

export default ${componentPascalName};
`;

  const rawHtml = tailwindJsx
    .replace(/className=/g, "class=")
    .replace(/\{`([^`]+)`\}/g, '"$1"')
    .replace(/onClick=\{[^\}]+\}/g, "");

  const typeScriptDef = `// TypeScript Props Definition for ${templateName}
export interface ${componentPascalName}Config {
  id: "${templateId}";
  name: "${templateName}";
  tokens: {
    primary: string;
    surface: string;
    border: string;
    radius: number;
    fontFamily: string;
  };
}
`;

  const getCode = () => {
    switch (activeTab) {
      case "tailwind":
        return fullReactComponent;
      case "html":
        return rawHtml;
      case "tokens":
        return themeCss;
      case "typescript":
        return typeScriptDef;
      default:
        return fullReactComponent;
    }
  };

  const currentCode = getCode();

  const handleCopy = async () => {
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `${templateId}.tsx`;
    const blob = new Blob([fullReactComponent], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl border border-zinc-800 bg-zinc-950 rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="h-12 border-b border-zinc-800 px-4 flex items-center justify-between shrink-0 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-zinc-400" />
            <h2 id="export-dialog-title" className="text-xs font-mono font-semibold text-[#fafafa] uppercase tracking-wider">
              Export Production Code — {templateName}
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

        {/* Tab Switcher & Actions */}
        <div className="border-b border-zinc-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto py-0.5" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "tailwind"}
              onClick={() => setActiveTab("tailwind")}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "tailwind"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              React (.tsx)
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "html"}
              onClick={() => setActiveTab("html")}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "html"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Raw HTML
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "tokens"}
              onClick={() => setActiveTab("tokens")}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "tokens"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              CSS Variables
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "typescript"}
              onClick={() => setActiveTab("typescript")}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                activeTab === "typescript"
                  ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              TypeScript
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-xs border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              {downloaded ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Download className="w-3 h-3 text-zinc-400" />}
              <span>{downloaded ? "Downloaded!" : "Download .tsx"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] text-xs font-mono font-medium tracking-wide uppercase transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>
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

