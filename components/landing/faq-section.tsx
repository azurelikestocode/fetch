"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How is Fetch different from traditional UI component libraries?",
    answer:
      "Unlike traditional libraries that require installing an npm package and adapting to rigid wrapper APIs, Fetch gives you a visual studio to customize design tokens (colors, radii, spacing, and fonts) and exports 100% self-contained Tailwind JSX and CSS. You own the code completely.",
  },
  {
    question: "Do I need to install an npm package to use Fetch components?",
    answer:
      "No. Fetch produces zero-dependency copy-paste code. All classes are standard Tailwind CSS utilities, with optional accessible headless foundations like Radix UI for interactive states.",
  },
  {
    question: "How does the live Google Fonts integration work?",
    answer:
      "The customizer studio includes a curated collection of 28+ Google Fonts spanning Sans, Serif, Monospace, and Display styles. Selecting a font dynamically loads the stylesheet and injects the corresponding CSS font-family into the component preview and exported code.",
  },
  {
    question: "Can I customize the primary color using any custom hex?",
    answer:
      "Yes. In addition to our curated dark theme presets (Zinc Slate, Pitch Black, Deep Navy), the Studio includes a full 2D HSV color spectrum box and rainbow hue slider to select any accent color with automatic high-contrast foreground calculation.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono uppercase tracking-widest mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Developer Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#fafafa]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs text-zinc-400 font-normal">
            Everything you need to know about Fetch architecture and workflow.
          </p>
        </div>

        <div className="border border-zinc-850 rounded-xs divide-y divide-zinc-850 bg-zinc-950/60">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-zinc-900/40 transition-colors cursor-pointer select-none"
                >
                  <span className="text-sm font-medium text-[#fafafa] pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed font-normal border-t border-zinc-900/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
