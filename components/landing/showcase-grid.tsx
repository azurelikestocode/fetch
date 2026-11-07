"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useTokenTheme } from "../../hooks/use-token-theme";
import { THEME_PRESETS } from "../../lib/tokens";
import { Layers, CheckCircle2, AlertCircle } from "lucide-react";

export function ShowcaseGrid() {
  const { tokens, activePreset, setPreset, styleObject } = useTokenTheme("default");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="showcase" className="py-20 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Component Showcase</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              The Foundational Primitives
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Each component below dynamically reacts to your chosen design tokens.
            </p>
          </div>

          {/* Quick preset pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
            {Object.values(THEME_PRESETS).map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activePreset === p.id
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Component Grid */}
        <div
          className="fetch-preview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={styleObject}
        >
          {/* 1. Button Showcase */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="subtle">Primitive 01</Badge>
                <span className="text-[11px] font-mono text-zinc-500">Button</span>
              </div>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Primary, secondary, outline, and ghost variants with focus states.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono">
              Bound to: --primary, --radius
            </CardFooter>
          </Card>

          {/* 2. Badge Showcase */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="subtle">Primitive 02</Badge>
                <span className="text-[11px] font-mono text-zinc-500">Badge</span>
              </div>
              <CardTitle>Status Badges</CardTitle>
              <CardDescription>Compact tags with high-contrast foregrounds and subtle tinting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="solid">Solid Active</Badge>
                <Badge variant="subtle">Subtle Soft</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono">
              Bound to: --primary, --radius
            </CardFooter>
          </Card>

          {/* 3. Input Showcase */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="subtle">Primitive 03</Badge>
                <span className="text-[11px] font-mono text-zinc-500">Input</span>
              </div>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Accessible inputs with primary focus ring and error indicators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Input placeholder="Default input state..." />
                <Input placeholder="Error input state..." error defaultValue="Invalid API Token" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono">
              Bound to: --border, --radius, --primary
            </CardFooter>
          </Card>

          {/* 4. Card Showcase */}
          <Card className="flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="subtle">Primitive 04</Badge>
                <span className="text-[11px] font-mono text-zinc-500">Card</span>
              </div>
              <CardTitle>Surface Container</CardTitle>
              <CardDescription>
                Elevated surfaces responding to background contrast, border strokes, and radius.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-[var(--radius)] border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Accessibility</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Screen-reader friendly markup with comprehensive ARIA bindings.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-[var(--radius)] border border-zinc-800 bg-zinc-900/60 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Runtime Cost</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Powered by lightweight CSS custom properties with pure Tailwind classes.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono">
              Bound to: --surface, --border, --radius
            </CardFooter>
          </Card>

          {/* 5. Dialog Showcase */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="subtle">Primitive 05</Badge>
                <span className="text-[11px] font-mono text-zinc-500">Dialog</span>
              </div>
              <CardTitle>Modal Overlay</CardTitle>
              <CardDescription>
                Accessible dialog primitive with backdrop blur and focus trapping.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary" className="w-full">
                    Trigger Dialog Modal
                  </Button>
                </DialogTrigger>
                <DialogContent style={styleObject}>
                  <DialogHeader>
                    <DialogTitle>Live Configured Modal</DialogTitle>
                    <DialogDescription>
                      Notice how the modal surface, corner radius, and action buttons inherit your active theme tokens.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-3 bg-zinc-900/60 rounded-[var(--radius)] border border-zinc-800 text-xs font-mono text-zinc-300">
                    --radius: {tokens.radius}px;
                    <br />
                    --primary: {tokens.primary};
                  </div>
                  <DialogFooter>
                    <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                      Close
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
                      Confirm Action
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="border-t border-zinc-800/60 pt-4 text-[11px] text-zinc-500 font-mono">
              Bound to: --surface, --radius, --primary
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

