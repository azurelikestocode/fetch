export interface ThemeTokens {
  primary: string;
  primaryForeground: string;
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  radius: number; // in pixels
  fontFamily?: "sans" | "mono" | "serif" | "custom";
  customFont?: string;
  letterSpacing?: "tight" | "normal" | "wide";
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  shadow?: "none" | "sm" | "md" | "lg" | "glow";
  borderWidth?: number;
}

export interface PresetTheme {
  name: string;
  id: string;
  description: string;
  tokens: ThemeTokens;
}

export const THEME_PRESETS: Record<string, PresetTheme> = {
  default: {
    id: "default",
    name: "Default Modern",
    description: "Sleek Indigo with subtle 8px corners on dark slate surface",
    tokens: {
      primary: "#6366f1",
      primaryForeground: "#ffffff",
      background: "#09090b",
      surface: "#18181b",
      surfaceHover: "#27272a",
      border: "#27272a",
      radius: 8,
    },
  },
  emerald: {
    id: "emerald",
    name: "Emerald Tech",
    description: "Clean Emerald accent with modern 6px rounded edges",
    tokens: {
      primary: "#10b981",
      primaryForeground: "#09090b",
      background: "#09090b",
      surface: "#18181b",
      surfaceHover: "#27272a",
      border: "#27272a",
      radius: 6,
    },
  },
  brutalist: {
    id: "brutalist",
    name: "Cyber Brutalist",
    description: "High-contrast Amber accent with sharp 0px corners and bold borders",
    tokens: {
      primary: "#f59e0b",
      primaryForeground: "#000000",
      background: "#000000",
      surface: "#121212",
      surfaceHover: "#1f1f1f",
      border: "#3f3f46",
      radius: 0,
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal Clean",
    description: "Smooth 14px corners with soft monochrome accents",
    tokens: {
      primary: "#e4e4e7",
      primaryForeground: "#09090b",
      background: "#09090b",
      surface: "#18181b",
      surfaceHover: "#27272a",
      border: "#27272a",
      radius: 14,
    },
  },
};

export const COLOR_SWATCHES = [
  { name: "Indigo", value: "#6366f1", foreground: "#ffffff" },
  { name: "Emerald", value: "#10b981", foreground: "#09090b" },
  { name: "Amber", value: "#f59e0b", foreground: "#000000" },
  { name: "Rose", value: "#f43f5e", foreground: "#ffffff" },
  { name: "Violet", value: "#8b5cf6", foreground: "#ffffff" },
  { name: "Cyan", value: "#06b6d4", foreground: "#09090b" },
  { name: "Lime", value: "#84cc16", foreground: "#09090b" },
  { name: "Zinc", value: "#fafafa", foreground: "#09090b" },
];

export function generateThemeCss(tokens: ThemeTokens): string {
  const fontCss = tokens.customFont
    ? `"${tokens.customFont}", sans-serif`
    : tokens.fontFamily === "mono"
    ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    : tokens.fontFamily === "serif"
    ? 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif'
    : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return `/* 1. Add to your globals.css */
:root {
  --primary: ${tokens.primary};
  --primary-foreground: ${tokens.primaryForeground};
  --background: ${tokens.background};
  --surface: ${tokens.surface};
  --surface-hover: ${tokens.surfaceHover};
  --border: ${tokens.border};
  --radius: ${tokens.radius}px;
  --font-family: ${fontCss};
}

/* 2. Component Markup */
<div className="border border-[var(--border)] bg-[var(--surface)] rounded-[var(--radius)] p-6 font-[var(--font-family)]">
  <button className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] px-4 py-2">
    Action
  </button>
</div>`;
}

export function generateTailwindJsx(component: string, tokens: ThemeTokens): string {
  const radClass = `rounded-[${tokens.radius}px]`;
  const bgClass = `bg-[${tokens.primary}]`;
  const textClass = `text-[${tokens.primaryForeground}]`;

  switch (component) {
    case "card":
      return `<div className="border border-[${tokens.border}] bg-[${tokens.surface}] ${radClass} p-6 shadow-sm">
  <div className="flex items-center gap-2 mb-4">
    <span className="px-2.5 py-0.5 text-xs font-semibold ${radClass} ${bgClass}/10 text-[${tokens.primary}]">
      v1.0-alpha
    </span>
  </div>
  <h3 className="text-lg font-semibold text-white">Configurable Card</h3>
  <p className="text-sm text-zinc-400 mt-1 mb-4">Live preview reacting to real-time design tokens.</p>
  <button className="w-full ${bgClass} ${textClass} ${radClass} py-2 px-4 font-medium transition hover:opacity-90">
    Deploy Component
  </button>
</div>`;

    case "button":
    default:
      return `<button className="${bgClass} ${textClass} ${radClass} px-4 py-2 font-medium text-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${tokens.primary}]">
  Click Me
</button>`;
  }
}

