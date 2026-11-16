import React from "react";

export function MetricsStrip() {
  const metrics = [
    { value: "40+", label: "Production Components", sub: "Modular & fully typed" },
    { value: "28+", label: "Google Font Families", sub: "Sans, Serif, Mono & Display" },
    { value: "0 kb", label: "Runtime Dependencies", sub: "Pure self-contained Tailwind" },
    { value: "100%", label: "Code Ownership", sub: "Direct copy-paste JSX & CSS" },
  ];

  return (
    <section className="border-b border-zinc-800/80 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-850 border-x border-zinc-850">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-semibold font-mono tracking-tight text-[#fafafa] mb-1">
                {m.value}
              </div>
              <div className="text-xs font-semibold text-zinc-300 mb-0.5">{m.label}</div>
              <div className="text-[11px] text-zinc-500 font-mono">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
