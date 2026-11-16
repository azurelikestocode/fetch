import React from "react";
import { Sliders, Code2, Boxes, Zap } from "lucide-react";

export function Features() {
  const pillars = [
    {
      step: "01",
      title: "Choose Components",
      description:
        "Built on accessible, unstyled component foundations. Full keyboard navigation and WAI-ARIA compliance built in from the start.",
      icon: Boxes,
    },
    {
      step: "02",
      title: "Tune Design Tokens",
      description:
        "Adjust colors, corner radius, surface depths, and padding visually with instant live feedback on actual interactive components.",
      icon: Sliders,
    },
    {
      step: "03",
      title: "Copy & Own Your Code",
      description:
        "Copy self-contained Tailwind classes or global CSS variable themes. No proprietary dependencies or vendor lock-in.",
      icon: Code2,
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-zinc-900 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for developer velocity.
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            From design exploration to production code in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

