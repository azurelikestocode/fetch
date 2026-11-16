"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { copyToClipboard } from "../../lib/utils";

export function Quickstart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const snippets = [
    {
      title: "1. Install Dependencies",
      code: "npm install @radix-ui/react-dialog @radix-ui/react-slider clsx tailwind-merge lucide-react",
    },
    {
      title: "2. Add Token Variables to globals.css",
      code: `:root {
  --primary: #6366f1;
  --primary-foreground: #ffffff;
  --background: #09090b;
  --surface: #18181b;
  --border: #27272a;
  --radius: 8px;
}`,
    },
    {
      title: "3. Copy Components & Use Immediately",
      code: `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function App() {
  return (
    <Card className="p-6">
      <Button variant="primary">Launch App</Button>
    </Card>
  );
}`,
    },
  ];

  const handleCopy = async (code: string, index: number) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section id="quickstart" className="py-20 border-t border-zinc-900 bg-zinc-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Quickstart</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Get started in 60 seconds
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Fetch components belong to you. No hidden runtime or telemetry.
          </p>
        </div>

        <div className="space-y-6">
          {snippets.map((s, idx) => (
            <div
              key={s.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-300">{s.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(s.code, idx)}
                  className="h-7 px-2.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <pre className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

