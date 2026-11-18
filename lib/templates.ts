import React from "react";
import { ThemeTokens, THEME_PRESETS } from "./tokens";

export interface TemplateProperty {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "boolean";
  defaultValue: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ComponentTemplate {
  id: string;
  name: string;
  category: "elements" | "components" | "forms" | "navigation";
  description: string;
  defaultTokens: ThemeTokens;
  configurableProps: TemplateProperty[];
  renderComponent: (props: Record<string, any>, tokens: ThemeTokens) => React.ReactNode;
  generateJsx: (props: Record<string, any>, tokens: ThemeTokens) => string;
}

function escapeAttr(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeText(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const TEMPLATES: Record<string, ComponentTemplate> = {
"auth-card": {
    id: "auth-card",
    name: "Authentication Card",
    category: "components",
    description: "Complete sign-in section with email, password fields, and primary submit action.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Header Title", type: "text", defaultValue: "Access Console" },
      { key: "subtitle", label: "Subtitle", type: "text", defaultValue: "Sign in with your enterprise credentials." },
      { key: "buttonText", label: "CTA Button", type: "text", defaultValue: "Authenticate" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-6 border shadow-lg max-w-sm w-full text-[#fafafa] space-y-4 min-w-0 break-words",
        },
        React.createElement("div", { className: "space-y-1 min-w-0" },
          React.createElement("h3", { className: "text-base font-semibold tracking-tight break-words" }, props.title || "Access Console"),
          React.createElement("p", { className: "text-xs text-zinc-400 break-words" }, props.subtitle || "Sign in with your enterprise credentials.")
        ),
        React.createElement("div", { className: "space-y-3" },
          React.createElement("div", { className: "space-y-1 min-w-0" },
            React.createElement("label", { className: "text-[11px] font-medium text-zinc-300 break-words" }, "Email Address"),
            React.createElement("input", {
              type: "email",
              placeholder: "developer@fetch.dev",
              readOnly: true,
              style: {
                borderRadius: `${tokens.radius}px`,
                borderColor: tokens.border,
                backgroundColor: tokens.background,
              },
              className: "w-full h-8 px-2.5 text-xs border focus:outline-none",
            })
          ),
          React.createElement("div", { className: "space-y-1 min-w-0" },
            React.createElement("label", { className: "text-[11px] font-medium text-zinc-300 break-words" }, "Access Key"),
            React.createElement("input", {
              type: "password",
              placeholder: "••••••••••••",
              readOnly: true,
              style: {
                borderRadius: `${tokens.radius}px`,
                borderColor: tokens.border,
                backgroundColor: tokens.background,
              },
              className: "w-full h-8 px-2.5 text-xs border focus:outline-none",
            })
          )
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-2 px-3 text-xs font-medium hover:opacity-90 transition-all cursor-pointer mt-2",
          },
          props.buttonText || "Authenticate"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-6 shadow-lg max-w-sm w-full text-[#fafafa] space-y-4 min-w-0 break-words">
  <div className="space-y-1 min-w-0">
    <h3 className="text-base font-semibold tracking-tight break-words">${escapeText(props.title || "Access Console")}</h3>
    <p className="text-xs text-zinc-400 break-words">${escapeText(props.subtitle || "Sign in with your enterprise credentials.")}</p>
  </div>
  <div className="space-y-3">
    <div className="space-y-1 min-w-0">
      <label className="text-[11px] font-medium text-zinc-300 break-words">Email Address</label>
      <input type="email" placeholder="developer@fetch.dev" className="w-full h-8 px-2.5 text-xs bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px]" />
    </div>
    <div className="space-y-1 min-w-0">
      <label className="text-[11px] font-medium text-zinc-300 break-words">Access Key</label>
      <input type="password" placeholder="••••••••••••" className="w-full h-8 px-2.5 text-xs bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px]" />
    </div>
  </div>
  <button className="w-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] py-2 px-3 text-xs font-medium hover:opacity-90 transition-all mt-2">
    ${escapeText(props.buttonText || "Authenticate")}
  </button>
</div>`;
    },
  },

"pricing-card": {
    id: "pricing-card",
    name: "Tiered Pricing Card",
    category: "components",
    description: "Subscription tier container with feature checklist, highlighted price, and primary checkout CTA.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "planName", label: "Plan Name", type: "text", defaultValue: "Pro Developer" },
      { key: "price", label: "Price", type: "text", defaultValue: "$29" },
      { key: "interval", label: "Billing Interval", type: "text", defaultValue: "/ month" },
      { key: "badgeText", label: "Highlight Badge", type: "text", defaultValue: "Popular" },
      { key: "buttonText", label: "CTA Button", type: "text", defaultValue: "Get Started with Pro" },
    ],
    renderComponent: (props, tokens) => {
      const features = ["Unlimited components", "Design token sync", "Full-source Tailwind export", "Dedicated Discord support"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-6 border shadow-xl max-w-sm w-full text-[#fafafa] space-y-5 transition-all duration-200 hover:border-zinc-700",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono" }, props.planName || "Pro Developer"),
          props.badgeText &&
            React.createElement(
              "span",
              {
                style: {
                  borderRadius: `${tokens.radius}px`,
                  color: tokens.primary,
                  backgroundColor: `color-mix(in srgb, ${tokens.primary} 14%, transparent)`,
                  borderColor: `color-mix(in srgb, ${tokens.primary} 30%, transparent)`,
                },
                className: "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border font-semibold",
              },
              props.badgeText
            )
        ),
        React.createElement(
          "div",
          { className: "flex items-baseline gap-1" },
          React.createElement("span", { className: "text-3xl font-extrabold font-mono tracking-tight text-white" }, props.price || "$29"),
          React.createElement("span", { className: "text-xs text-zinc-500 font-mono" }, props.interval || "/ month")
        ),
        React.createElement(
          "ul",
          { className: "space-y-2 text-xs text-zinc-400 font-normal border-t border-zinc-800/80 pt-4" },
          features.map((f, i) =>
            React.createElement(
              "li",
              { key: i, className: "flex items-center gap-2" },
              React.createElement("span", { style: { color: tokens.primary }, className: "font-mono font-bold text-xs" }, "✓"),
              React.createElement("span", null, f)
            )
          )
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-2.5 px-3 text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer mt-2 shadow-xs",
          },
          props.buttonText || "Get Started with Pro"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-6 shadow-xl max-w-sm w-full text-[#fafafa] space-y-5">
  <div className="flex items-center justify-between">
    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">${escapeText(props.planName || "Pro Developer")}</span>
    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-[${tokens.primary}]/30 bg-[${tokens.primary}]/15 text-[${tokens.primary}] font-semibold rounded-[${tokens.radius}px]">
      ${escapeText(props.badgeText || "Popular")}
    </span>
  </div>
  <div className="flex items-baseline gap-1">
    <span className="text-3xl font-extrabold font-mono tracking-tight text-white">${escapeText(props.price || "$29")}</span>
    <span className="text-xs text-zinc-500 font-mono">${escapeText(props.interval || "/ month")}</span>
  </div>
  <ul className="space-y-2 text-xs text-zinc-400 font-normal border-t border-zinc-800/80 pt-4">
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}] font-mono font-bold">✓</span> Unlimited components</li>
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}] font-mono font-bold">✓</span> Design token sync</li>
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}] font-mono font-bold">✓</span> Full-source Tailwind export</li>
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}] font-mono font-bold">✓</span> Dedicated Discord support</li>
  </ul>
  <button className="w-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] py-2.5 px-3 text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all">
    ${escapeText(props.buttonText || "Get Started with Pro")}
  </button>
</div>`;
    },
  },

"command-menu": {
    id: "command-menu",
    name: "Command Palette Trigger",
    category: "forms",
    description: "Search modal trigger bar with keyboard shortcut tag and subtle hairline focus ring.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "placeholder", label: "Search Placeholder", type: "text", defaultValue: "Search documentation or commands..." },
      { key: "shortcut", label: "Shortcut Chip", type: "text", defaultValue: "⌘K" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.background,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "w-full max-w-sm h-10 px-3.5 border flex items-center justify-between text-xs text-zinc-400 shadow-xs transition-all duration-200 hover:border-zinc-700 cursor-pointer group",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-2.5 truncate" },
          React.createElement("span", { className: "text-zinc-500 font-mono text-sm" }, "⌕"),
          React.createElement("span", { className: "truncate text-zinc-400 group-hover:text-zinc-200 font-mono text-[11px]" }, props.placeholder || "Search documentation or commands...")
        ),
        React.createElement(
          "kbd",
          {
            style: {
              borderRadius: `${Math.max(2, tokens.radius - 4)}px`,
            },
            className: "text-[10px] font-mono px-1.5 py-0.5 border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-200 shrink-0",
          },
          props.shortcut || "⌘K"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<button className="w-full max-w-sm h-10 px-3.5 bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px] flex items-center justify-between text-xs text-zinc-400 shadow-xs hover:border-zinc-700 cursor-pointer">
  <div className="flex items-center gap-2.5 truncate">
    <span className="text-zinc-500 font-mono text-sm">⌕</span>
    <span className="truncate text-zinc-400 font-mono text-[11px]">${escapeText(props.placeholder || "Search documentation or commands...")}</span>
  </div>
  <kbd className="text-[10px] font-mono px-1.5 py-0.5 border border-zinc-800 bg-zinc-900 text-zinc-400 rounded-[${Math.max(2, tokens.radius - 4)}px]">${escapeText(props.shortcut || "⌘K")}</kbd>
</button>`;
    },
  },

"cookie-banner": {
    id: "cookie-banner",
    name: "Privacy & Cookie Consent",
    category: "elements",
    description: "Compact bottom floating banner with essential telemetry explanation and dual action buttons.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Heading", type: "text", defaultValue: "Telemetry & Privacy" },
      { key: "description", label: "Policy Text", type: "text", defaultValue: "We use strictly necessary cookies to ensure optimal edge token distribution." },
      { key: "buttonText", label: "Accept Button", type: "text", defaultValue: "Accept All" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xl max-w-sm w-full space-y-3",
        },
        React.createElement("div", { className: "text-xs font-semibold text-white" }, props.title || "Telemetry & Privacy"),
        React.createElement("p", { className: "text-[11px] text-zinc-400 leading-relaxed" }, props.description || "We use strictly necessary cookies to ensure optimal edge token distribution."),
        React.createElement(
          "div",
          { className: "flex items-center gap-2 pt-1" },
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
                borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
              },
              className: "flex-1 py-1.5 px-3 text-xs font-medium cursor-pointer",
            },
            props.buttonText || "Accept All"
          ),
          React.createElement(
            "button",
            {
              style: {
                borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
              },
              className: "py-1.5 px-3 text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer",
            },
            "Decline"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3">
  <div className="text-xs font-semibold text-white">${escapeText(props.title || "Telemetry & Privacy")}</div>
  <p className="text-[11px] text-zinc-400 leading-relaxed">${escapeText(props.description || "")}</p>
  <div className="flex items-center gap-2 pt-1">
    <button className="flex-1 py-1.5 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${Math.max(2, tokens.radius - 2)}px]">${escapeText(props.buttonText || "Accept All")}</button>
    <button className="py-1.5 px-3 text-xs text-zinc-400 hover:text-white border border-zinc-800 rounded-[${Math.max(2, tokens.radius - 2)}px]">Decline</button>
  </div>
</div>`;
    },
  },

"file-dropzone": {
    id: "file-dropzone",
    name: "Interactive File Dropzone",
    category: "forms",
    description: "Dashed drag-and-drop container for uploading assets, SVG tokens, and configurations.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Dropzone Heading", type: "text", defaultValue: "Upload Design Tokens" },
      { key: "hint", label: "File Hint", type: "text", defaultValue: "JSON, TOML, or CSS tokens up to 10MB" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-6 border-2 border-dashed max-w-sm w-full flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:border-zinc-600 transition-colors",
        },
        React.createElement("div", {
          style: { color: tokens.primary },
          className: "font-mono font-bold text-lg mb-1",
        }, "↑"),
        React.createElement("div", { className: "text-xs font-semibold text-white" }, props.title || "Upload Design Tokens"),
        React.createElement("p", { className: "text-[11px] text-zinc-500 font-mono" }, props.hint || "JSON, TOML, or CSS tokens up to 10MB")
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border-2 border-dashed border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-sm w-full flex flex-col items-center justify-center text-center space-y-2 cursor-pointer">
  <div className="font-mono font-bold text-lg text-[${tokens.primary}] mb-1">↑</div>
  <div className="text-xs font-semibold text-white">${escapeText(props.title || "Upload Design Tokens")}</div>
  <p className="text-[11px] text-zinc-500 font-mono">${escapeText(props.hint || "JSON, TOML, or CSS tokens up to 10MB")}</p>
</div>`;
    },
  },

"action-dock": {
    id: "action-dock",
    name: "Floating Action Dock",
    category: "navigation",
    description: "macOS-style floating dock island with active status dots and tooltips.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "item1", label: "Item 1", type: "text", defaultValue: "Home" },
      { key: "item2", label: "Item 2", type: "text", defaultValue: "Components" },
      { key: "item3", label: "Item 3", type: "text", defaultValue: "Studio" },
      { key: "item4", label: "Item 4", type: "text", defaultValue: "Settings" },
    ],
    renderComponent: (props, tokens) => {
      const items = [props.item1 || "Home", props.item2 || "Components", props.item3 || "Studio", props.item4 || "Settings"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: "9999px",
          },
          className: "px-3 py-1.5 border shadow-2xl inline-flex items-center gap-1",
        },
        items.map((item, idx) => {
          const isActive = idx === 1;
          return React.createElement(
            "button",
            {
              key: item,
              style: isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                  }
                : {},
              className: `px-3 py-1 rounded-full text-xs font-medium font-mono transition-all cursor-pointer ${
                isActive ? "shadow-xs" : "text-zinc-400 hover:text-white"
              }`,
            },
            item
          );
        })
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="px-3 py-1.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-full shadow-2xl inline-flex items-center gap-1">
  <button className="px-3 py-1 rounded-full text-xs font-medium font-mono text-zinc-400">${escapeText(props.item1 || "Home")}</button>
  <button className="px-3 py-1 rounded-full text-xs font-medium font-mono bg-[${tokens.primary}] text-[${tokens.primaryForeground}] shadow-xs">${escapeText(props.item2 || "Components")}</button>
  <button className="px-3 py-1 rounded-full text-xs font-medium font-mono text-zinc-400">${escapeText(props.item3 || "Studio")}</button>
</div>`;
    },
  },

"api-key-vault": {
    id: "api-key-vault",
    name: "Secure API Key Vault",
    category: "components",
    description: "Cryptographic API key manager with hidden token mask, one-click copy, expiration countdown, and granular permission chips.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "keyName", label: "Key Identifier", type: "text", defaultValue: "Production AI Gateway" },
      { key: "maskedKey", label: "Masked Secret", type: "text", defaultValue: "sk_live_9f8a...••••••••" },
      { key: "environment", label: "Target Env", type: "text", defaultValue: "Production" },
      { key: "expiresIn", label: "Expiration", type: "text", defaultValue: "90 days" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xl max-w-sm w-full space-y-3 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement("span", { style: { backgroundColor: tokens.primary }, className: "w-2 h-2 rounded-full shadow-xs" }),
            React.createElement("span", { className: "text-xs font-semibold text-zinc-100 font-mono" }, props.keyName || "Production AI Gateway")
          ),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 text-[9px] font-mono rounded-full border border-emerald-900 bg-emerald-950/60 text-emerald-400" },
            props.environment || "Production"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-850 font-mono text-[11px]" },
          React.createElement("span", { className: "text-zinc-300 tracking-wider" }, props.maskedKey || "sk_live_9f8a...••••••••"),
          React.createElement(
            "button",
            {
              style: { color: tokens.primary },
              className: "text-[10px] uppercase font-bold hover:underline cursor-pointer",
            },
            "Copy"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-850" },
          React.createElement("span", null, `Expires: ${props.expiresIn || "90 days"}`),
          React.createElement("span", { className: "text-red-400 hover:underline cursor-pointer" }, "Revoke Key")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3 text-white">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[${tokens.primary}]" />
      <span className="text-xs font-semibold text-zinc-100 font-mono">${escapeText(props.keyName || "Production AI Gateway")}</span>
    </div>
    <span className="px-2 py-0.5 text-[9px] font-mono rounded-full border border-emerald-900 bg-emerald-950/60 text-emerald-400">${escapeText(props.environment || "Production")}</span>
  </div>
  <div className="flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-800 font-mono text-[11px]">
    <span className="text-zinc-300 tracking-wider">${escapeText(props.maskedKey || "sk_live_9f8a...••••••••")}</span>
    <button className="text-[10px] text-[${tokens.primary}] uppercase font-bold">Copy</button>
  </div>
  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-800">
    <span>Expires: ${escapeText(props.expiresIn || "90 days")}</span>
    <span className="text-red-400 cursor-pointer">Revoke Key</span>
  </div>
</div>`;
    },
  },

"feature-grid": {
    id: "feature-grid",
    name: "Feature Highlights Grid",
    category: "components",
    description: "Responsive 3-card architectural feature grid with badge, header, interactive card focus, and icon accents.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "heading", label: "Section Heading", type: "text", defaultValue: "Architectural Precision" },
      { key: "card1Title", label: "Card 1 Title", type: "text", defaultValue: "Type Safe" },
      { key: "card1Desc", label: "Card 1 Description", type: "text", defaultValue: "100% strict TypeScript types with zero ambient overhead." },
      { key: "card2Title", label: "Card 2 Title", type: "text", defaultValue: "Zero Runtime" },
      { key: "card2Desc", label: "Card 2 Description", type: "text", defaultValue: "Self-contained Tailwind JSX with zero extra npm packages." },
      { key: "card3Title", label: "Card 3 Title", type: "text", defaultValue: "Deep Theming" },
      { key: "card3Desc", label: "Card 3 Description", type: "text", defaultValue: "Live token adjustments with 28+ Google Fonts and HSV palette." },
    ],
    renderComponent: (props, tokens) => {
      const cards = [
        { title: props.card1Title || "Type Safe", desc: "100% strict TS types & zero ambient overhead.", tag: "01" },
        { title: props.card2Title || "Zero Runtime", desc: "Pure Tailwind JSX with zero extra bloat.", tag: "02" },
        { title: props.card3Title || "Deep Theming", desc: "Real-time token adjustments & HSV palettes.", tag: "03" },
      ];
      return React.createElement(
        "div",
        { className: "w-full max-w-[340px] space-y-3 text-white select-none" },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5" },
            React.createElement("span", {
              style: { backgroundColor: tokens.primary },
              className: "w-1.5 h-1.5 rounded-full shadow-xs",
            }),
            React.createElement("span", { className: "text-xs font-bold tracking-tight text-white font-mono" }, props.heading || "Architectural Precision")
          ),
          React.createElement("span", { className: "text-[9px] font-mono text-zinc-500 uppercase tracking-widest" }, "Features")
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-3 gap-2" },
          cards.map((c, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: {
                  backgroundColor: tokens.surface,
                  borderColor: tokens.border,
                  borderRadius: `${tokens.radius}px`,
                },
                className: "p-2.5 border shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors group",
              },
              React.createElement(
                "div",
                { className: "space-y-1" },
                React.createElement(
                  "div",
                  {
                    style: { color: tokens.primary },
                    className: "text-[10px] font-mono font-bold",
                  },
                  c.tag
                ),
                React.createElement("div", { className: "text-xs font-semibold text-white tracking-tight" }, c.title),
                React.createElement("p", { className: "text-[9px] text-zinc-400 leading-snug font-normal line-clamp-3 pt-0.5" }, c.desc)
              )
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Zap, Sliders } from "lucide-react";

export interface FeatureItem {
  tag: string;
  title: string;
  desc: string;
  stat: string;
}

export interface FeatureGridProps {
  heading?: string;
  features?: FeatureItem[];
  className?: string;
}

export function FeatureGrid({
  heading = "${escapeText(props.heading || "Architectural Precision")}",
  features = [
    { tag: "01", title: "${escapeText(props.card1Title || "Type Safe")}", desc: "${escapeText(props.card1Desc || "100% strict TypeScript types with zero ambient overhead.")}", stat: "100% Strict" },
    { tag: "02", title: "${escapeText(props.card2Title || "Zero Runtime")}", desc: "${escapeText(props.card2Desc || "Self-contained Tailwind JSX with zero extra npm packages.")}", stat: "0kb Extra" },
    { tag: "03", title: "${escapeText(props.card3Title || "Deep Theming")}", desc: "${escapeText(props.card3Desc || "Live token adjustments with 28+ Google Fonts and HSV palette.")}", stat: "Live Sync" },
  ],
  className = "",
}: FeatureGridProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section className={\`w-full max-w-2xl space-y-4 text-white select-none \${className}\`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] shadow-[0_0_8px_${tokens.primary}]" />
          <h3 className="text-sm font-bold tracking-tight text-white font-mono">{heading}</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Capabilities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {features.map((item, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <div
              key={item.tag}
              onClick={() => setSelectedIdx(isSelected ? null : idx)}
              className={\`p-4 bg-[${tokens.surface}] border rounded-[${tokens.radius}px] shadow-sm flex flex-col justify-between space-y-3 cursor-pointer transition-all duration-200 \${
                isSelected
                  ? "border-[${tokens.primary}] ring-1 ring-[${tokens.primary}]/40 -translate-y-0.5"
                  : "border-[${tokens.border}] hover:border-zinc-700 hover:-translate-y-0.5"
              }\`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[${tokens.primary}]">{item.tag}</span>
                <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900/80">
                  {item.stat}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>{isSelected ? "Active Focus" : "Click to Inspect"}</span>
                <span className="text-[${tokens.primary}]">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureGrid;`;
    },
  },

"changelog-entry": {
    id: "changelog-entry",
    name: "Changelog Release Card",
    category: "components",
    description: "Product release update card with version badge, date, highlights, and link action.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "version", label: "Version Tag", type: "text", defaultValue: "v2.4.0" },
      { key: "date", label: "Release Date", type: "text", defaultValue: "November 2026" },
      { key: "title", label: "Release Title", type: "text", defaultValue: "Interactive Canvas & Dynamic Typography" },
      { key: "item1", label: "Bullet 1", type: "text", defaultValue: "Interactive clicks across all canvas components" },
      { key: "item2", label: "Bullet 2", type: "text", defaultValue: "Searchable Google Fonts library with 28+ typefaces" },
      { key: "item3", label: "Bullet 3", type: "text", defaultValue: "2D HSV color spectrum with precision hue slider" },
    ],
    renderComponent: (props, tokens) => {
      const bullets = [
        props.item1 || "Interactive clicks across canvas components",
        props.item2 || "Searchable Google Fonts library",
        props.item3 || "2D HSV color spectrum picker",
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-6 border shadow-xl max-w-md w-full space-y-4 text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "span",
            {
              style: { backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` },
              className: "px-2 py-0.5 text-xs font-mono font-bold rounded-xs border",
            },
            props.version || "v2.4.0"
          ),
          React.createElement("span", { className: "text-xs font-mono text-zinc-500" }, props.date || "November 2026")
        ),
        React.createElement("h3", { className: "text-sm font-bold text-white tracking-tight" }, props.title || "Interactive Canvas & Dynamic Typography"),
        React.createElement(
          "ul",
          { className: "space-y-1.5 text-xs text-zinc-400" },
          bullets.map((b, i) =>
            React.createElement(
              "li",
              { key: i, className: "flex items-center gap-2" },
              React.createElement("span", { style: { color: tokens.primary }, className: "font-mono font-bold text-[11px]" }, "•"),
              React.createElement("span", { className: "truncate" }, b)
            )
          )
        ),
        React.createElement(
          "div",
          { className: "pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs" },
          React.createElement("span", { className: "text-zinc-500 font-mono text-[11px]" }, "Coral / Hack Club Release"),
          React.createElement("span", { style: { color: tokens.primary }, className: "font-medium hover:underline cursor-pointer" }, "Read Notes →")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full space-y-4 text-white">
  <div className="flex items-center justify-between">
    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-xs border bg-[${tokens.primary}]/10 text-[${tokens.primary}] border-[${tokens.primary}]/30">${escapeText(props.version || "v2.4.0")}</span>
    <span className="text-xs font-mono text-zinc-500">${escapeText(props.date || "November 2026")}</span>
  </div>
  <h3 className="text-sm font-bold text-white tracking-tight">${escapeText(props.title || "Interactive Canvas & Dynamic Typography")}</h3>
  <ul className="space-y-1.5 text-xs text-zinc-400">
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}]">•</span><span>${escapeText(props.item1 || "Interactive clicks across canvas components")}</span></li>
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}]">•</span><span>${escapeText(props.item2 || "Searchable Google Fonts library")}</span></li>
    <li className="flex items-center gap-2"><span className="text-[${tokens.primary}]">•</span><span>${escapeText(props.item3 || "2D HSV color spectrum picker")}</span></li>
  </ul>
  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
    <span className="text-zinc-500 font-mono text-[11px]">Release Archive</span>
    <span className="text-[${tokens.primary}] font-medium cursor-pointer">Read Notes →</span>
  </div>
</div>`;
    },
  },

"virtual-card": {
    id: "virtual-card",
    name: "Fintech Virtual Debit Card",
    category: "components",
    description: "High-finish virtual corporate expense card with holographic shimmer, contactless EMV chip, embossed digits, and live freeze toggle.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "cardHolder", label: "Cardholder Name", type: "text", defaultValue: "AZURE ARCHITECT" },
      { key: "cardTier", label: "Tier Badge", type: "text", defaultValue: "Platinum Fleet" },
      { key: "lastFour", label: "Card Digits", type: "text", defaultValue: "8842" },
      { key: "expiry", label: "Expiration Date", type: "text", defaultValue: "09/29" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${Math.max(tokens.radius, 14)}px`,
            background: `linear-gradient(135deg, ${tokens.surface} 0%, color-mix(in srgb, ${tokens.primary} 22%, #09090b) 60%, #000 100%)`,
            boxShadow: `0 16px 36px -8px rgba(0,0,0,0.7), 0 0 24px ${tokens.primary}18`,
          },
          className: "p-4 border max-w-[290px] w-full space-y-3.5 text-white select-none relative overflow-hidden",
        },
        /* Diagonal holographic specular sheen */
        React.createElement("div", {
          className: "absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-12 pointer-events-none",
        }),
        React.createElement(
          "div",
          { className: "flex items-center justify-between relative z-10" },
          React.createElement(
            "span",
            { className: "text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5" },
            React.createElement("span", {
              style: { backgroundColor: tokens.primary },
              className: "w-1.5 h-1.5 rounded-full shadow-xs",
            }),
            props.cardTier || "Platinum Fleet"
          ),
          React.createElement(
            "div",
            { className: "flex items-center -space-x-1" },
            React.createElement("div", {
              style: { backgroundColor: tokens.primary },
              className: "w-4 h-4 rounded-full opacity-90 shadow-xs",
            }),
            React.createElement("div", {
              className: "w-4 h-4 rounded-full bg-zinc-400/60 opacity-80 backdrop-blur-xs",
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between pt-1 relative z-10" },
          /* Realistic EMV Chip */
          React.createElement(
            "div",
            { className: "w-8 h-6 rounded-xs bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/60 p-1 flex flex-col justify-between shadow-xs" },
            React.createElement("div", { className: "border-b border-amber-700/60 h-1.5 w-full" }),
            React.createElement("div", { className: "border-t border-amber-700/60 h-1.5 w-full" })
          ),
          /* Contactless Waves SVG */
          React.createElement(
            "svg",
            { className: "w-4 h-4 text-zinc-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
            React.createElement("path", { d: "M8.5 4.5a14 14 0 0 1 0 15" }),
            React.createElement("path", { d: "M12.5 7.5a9 9 0 0 1 0 9" }),
            React.createElement("path", { d: "M16.5 10.5a4 4 0 0 1 0 3" })
          )
        ),
        React.createElement(
          "div",
          { className: "font-mono text-[13px] tracking-[0.22em] text-zinc-100 font-bold relative z-10 drop-shadow-sm" },
          `•••• •••• •••• ${props.lastFour || "8842"}`
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[9px] font-mono pt-1 border-t border-white/10 relative z-10 text-zinc-400" },
          React.createElement("div", null,
            React.createElement("div", { className: "text-[7px] text-zinc-500 uppercase tracking-wider" }, "Cardholder"),
            React.createElement("div", { className: "font-semibold text-zinc-100 tracking-wider" }, props.cardHolder || "AZURE ARCHITECT")
          ),
          React.createElement("div", { className: "text-right" },
            React.createElement("div", { className: "text-[7px] text-zinc-500 uppercase tracking-wider" }, "Valid Thru"),
            React.createElement("div", { className: "font-semibold text-zinc-100" }, props.expiry || "09/29")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState } from "react";
import { Lock, Unlock, Copy, Check, Eye, EyeOff } from "lucide-react";

export interface VirtualCardProps {
  cardHolder?: string;
  cardTier?: string;
  lastFour?: string;
  expiry?: string;
  balance?: string;
  spendingLimit?: string;
  className?: string;
}

export function VirtualCard({
  cardHolder = "${escapeText(props.cardHolder || "AZURE ARCHITECT")}",
  cardTier = "${escapeText(props.cardTier || "Platinum Fleet")}",
  lastFour = "${escapeText(props.lastFour || "8842")}",
  expiry = "${escapeText(props.expiry || "09/29")}",
  balance = "$4,850.00",
  spendingLimit = "$10,000.00",
  className = "",
}: VirtualCardProps) {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullCardNumber = \`4242 •••• •••• \${lastFour}\`;

  const copyCard = () => {
    navigator.clipboard?.writeText(\`424242424242\${lastFour}\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={\`w-full max-w-sm space-y-3 select-none \${className}\`}>
      {/* Physical-Feel Virtual Card Container */}
      <div
        className={\`p-5 border rounded-[${Math.max(tokens.radius, 16)}px] shadow-2xl space-y-5 text-white relative overflow-hidden transition-all duration-300 \${
          isFrozen ? "opacity-60 saturate-50 border-red-900/50" : "border-[${tokens.border}]"
        }\`}
        style={{
          backgroundColor: "${tokens.surface}",
          background: \`linear-gradient(135deg, ${tokens.surface} 0%, color-mix(in srgb, ${tokens.primary} 24%, #09090b) 60%, #000 100%)\`,
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 24px ${tokens.primary}20",
        }}
      >
        {/* Holographic Specular Highlight */}
        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-12 pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] shadow-[0_0_8px_${tokens.primary}]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">{cardTier}</span>
          </div>
          <div className="flex items-center -space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-[${tokens.primary}] opacity-90 shadow-xs" />
            <div className="w-5 h-5 rounded-full bg-zinc-400/60 backdrop-blur-xs" />
          </div>
        </div>

        {/* EMV Microchip & Contactless Waves */}
        <div className="flex items-center justify-between pt-1 relative z-10">
          <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/80 p-1 flex flex-col justify-between shadow-md">
            <div className="border-b border-amber-700/60 h-2 w-full" />
            <div className="border-t border-amber-700/60 h-2 w-full" />
          </div>
          <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8.5 4.5a14 14 0 0 1 0 15" />
            <path d="M12.5 7.5a9 9 0 0 1 0 9" />
            <path d="M16.5 10.5a4 4 0 0 1 0 3" />
          </svg>
        </div>

        {/* Card Number */}
        <div className="font-mono text-base tracking-[0.25em] text-zinc-100 font-bold relative z-10 drop-shadow-sm flex items-center justify-between">
          <span>{fullCardNumber}</span>
          <button
            onClick={copyCard}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            title="Copy card number"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Footer Details */}
        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10 relative z-10 text-zinc-300">
          <div>
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Cardholder</div>
            <div className="font-semibold text-white tracking-wider">{cardHolder}</div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest">CVV</div>
              <div className="font-semibold text-white flex items-center gap-1">
                <span>{showCvv ? "742" : "•••"}</span>
                <button onClick={() => setShowCvv(!showCvv)} className="text-zinc-500 hover:text-white">
                  {showCvv ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Expires</div>
              <div className="font-semibold text-white">{expiry}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Controls Strip */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500">Spend:</span>
          <span className="text-white font-semibold">{balance}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">{spendingLimit}</span>
        </div>
        <button
          onClick={() => setIsFrozen(!isFrozen)}
          className={\`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all cursor-pointer \${
            isFrozen
              ? "border-red-900 bg-red-950/80 text-red-400 font-bold"
              : "border-zinc-800 bg-zinc-900 hover:text-white"
          }\`}
        >
          {isFrozen ? <Lock className="w-3 h-3 text-red-400" /> : <Unlock className="w-3 h-3 text-zinc-400" />}
          <span>{isFrozen ? "Card Frozen" : "Freeze Card"}</span>
        </button>
      </div>
    </div>
  );
}

export default VirtualCard;`;
    },
  },

"metric-sparkline": {
    id: "metric-sparkline",
    name: "Metric KPI Sparkline Card",
    category: "components",
    description: "Executive telemetry metric card with embedded SVG sparkline trend curve and growth delta.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Metric Title", type: "text", defaultValue: "Monthly API Calls" },
      { key: "value", label: "Metric Value", type: "text", defaultValue: "4,829,190" },
      { key: "delta", label: "Growth Delta", type: "text", defaultValue: "+34.2%" },
      { key: "timeframe", label: "Timeframe", type: "text", defaultValue: "Last 30 Days" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-xl max-w-sm w-full space-y-4 text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-xs font-mono text-zinc-400 font-medium" }, props.title || "Monthly API Calls"),
          React.createElement(
            "span",
            {
              style: { backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` },
              className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs border",
            },
            props.delta || "+34.2%"
          )
        ),
        React.createElement("div", { className: "text-2xl font-bold font-mono tracking-tight text-white" }, props.value || "4,829,190"),
        React.createElement(
          "div",
          { className: "h-14 w-full pt-1" },
          React.createElement(
            "svg",
            { viewBox: "0 0 200 48", className: "w-full h-full" },
            React.createElement("path", {
              d: "M 6 38 C 45 38, 70 30, 100 24 C 130 18, 155 14, 192 10 L 192 46 L 6 46 Z",
              fill: `${tokens.primary}18`,
            }),
            React.createElement("path", {
              d: "M 6 38 C 45 38, 70 30, 100 24 C 130 18, 155 14, 192 10",
              fill: "none",
              stroke: tokens.primary,
              strokeWidth: "2.5",
              strokeLinecap: "round",
            }),
            React.createElement("circle", { cx: "192", cy: "10", r: "6", fill: tokens.primary, opacity: "0.25" }),
            React.createElement("circle", { cx: "192", cy: "10", r: "3", fill: tokens.primary })
          )
        ),
        React.createElement("div", { className: "text-[10px] font-mono text-zinc-500 text-right" }, props.timeframe || "Last 30 Days")
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-4 text-white">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono text-zinc-400">${escapeText(props.title || "Monthly API Calls")}</span>
    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs border bg-[${tokens.primary}]/10 text-[${tokens.primary}] border-[${tokens.primary}]/30">${escapeText(props.delta || "+34.2%")}</span>
  </div>
  <div className="text-2xl font-bold font-mono tracking-tight text-white">${escapeText(props.value || "4,829,190")}</div>
  <div className="h-14 w-full">
    <svg viewBox="0 0 200 48" className="w-full h-full">
      <path d="M 6 38 C 45 38, 70 30, 100 24 C 130 18, 155 14, 192 10 L 192 46 L 6 46 Z" fill="${tokens.primary}" fillOpacity="0.12" />
      <path d="M 6 38 C 45 38, 70 30, 100 24 C 130 18, 155 14, 192 10" fill="none" stroke="${tokens.primary}" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="192" cy="10" r="3" fill="${tokens.primary}" />
    </svg>
  </div>
  <div className="text-[10px] font-mono text-zinc-500 text-right">${escapeText(props.timeframe || "Last 30 Days")}</div>
</div>`;
    },
  },

"system-incident-banner": {
    id: "system-incident-banner",
    name: "Real-Time System Incident Alert",
    category: "components",
    description: "Operational status notification banner displaying degraded services, incident severity level, live resolution ETA, and subscribe trigger.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "serviceName", label: "Impacted Component", type: "text", defaultValue: "Edge Compute & CDN" },
      { key: "statusText", label: "Severity Status", type: "text", defaultValue: "Partial Degradation" },
      { key: "incidentId", label: "Incident Ticket", type: "text", defaultValue: "INC-4091" },
      { key: "updateTime", label: "Timestamp", type: "text", defaultValue: "4 mins ago" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
            borderLeft: "4px solid #f59e0b",
          },
          className: "p-3.5 border shadow-xl max-w-[310px] w-full space-y-2.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5 min-w-0" },
            React.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" }),
            React.createElement("span", { className: "text-xs font-semibold text-white font-mono truncate" }, props.serviceName || "Edge Compute & CDN")
          ),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 text-[9px] font-mono rounded-full border border-amber-900 bg-amber-950/70 text-amber-400 font-bold shrink-0 shadow-xs" },
            props.statusText || "Degraded"
          )
        ),
        React.createElement(
          "p",
          { className: "text-[11px] text-zinc-300 font-normal leading-relaxed line-clamp-2" },
          "Elevated latency and gateway retries on US-East edge nodes. Traffic auto-failover in progress."
        ),
        /* Incident Lifecycle Progress Track (Segmented) */
        React.createElement(
          "div",
          { className: "space-y-1.5 pt-1 border-t border-zinc-850" },
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5 h-1.5 w-full" },
            React.createElement("div", { className: "flex-1 h-full rounded-full bg-amber-500" }),
            React.createElement("div", { className: "flex-1 h-full rounded-full bg-amber-500" }),
            React.createElement("div", { className: "flex-1 h-full rounded-full bg-amber-400 animate-pulse" }),
            React.createElement("div", { className: "flex-1 h-full rounded-full bg-zinc-800" })
          ),
          React.createElement(
            "div",
            { className: "flex items-center justify-between text-[8px] font-mono" },
            React.createElement(
              "span",
              { className: "text-amber-400 font-bold flex items-center gap-1" },
              React.createElement("span", { className: "w-1 h-1 rounded-full bg-amber-400 animate-ping" }),
              "Active: Monitoring Failover"
            ),
            React.createElement("span", { className: "text-zinc-500" }, "Stage 3 of 4")
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-1 border-t border-zinc-850" },
          React.createElement("span", null, `${props.incidentId || "INC-4091"} • ${props.updateTime || "4m ago"}`),
          React.createElement("span", { style: { color: tokens.primary }, className: "hover:underline cursor-pointer font-medium" }, "Status Page →")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState } from "react";
import { AlertTriangle, Bell, BellOff, ExternalLink, RefreshCw } from "lucide-react";

export interface IncidentAlertProps {
  serviceName?: string;
  statusText?: string;
  incidentId?: string;
  updateTime?: string;
  description?: string;
  statusPageUrl?: string;
  className?: string;
}

export function IncidentAlert({
  serviceName = "${escapeText(props.serviceName || "Edge Compute & CDN")}",
  statusText = "${escapeText(props.statusText || "Partial Degradation")}",
  incidentId = "${escapeText(props.incidentId || "INC-4091")}",
  updateTime = "${escapeText(props.updateTime || "4 mins ago")}",
  description = "Elevated latency and 502 gateway timeouts observed in US-East-1 edge points of presence. Traffic auto-failover is actively running.",
  statusPageUrl = "#",
  className = "",
}: IncidentAlertProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [activeStage, setActiveStage] = useState(2); // 0: Investigating, 1: Identified, 2: Monitoring, 3: Resolved

  const stages = [
    { label: "Investigate", done: true },
    { label: "Identify", done: true },
    { label: "Monitoring", active: true },
    { label: "Resolved", pending: true },
  ];

  return (
    <div
      className={\`p-4 bg-[${tokens.surface}] border border-[${tokens.border}] border-l-4 border-l-amber-500 rounded-[${tokens.radius}px] shadow-2xl max-w-md w-full space-y-3 text-white select-none \${className}\`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold text-white font-mono truncate">{serviceName}</span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-amber-900 bg-amber-950/70 text-amber-400 font-bold shrink-0">
          {statusText}
        </span>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed font-normal">{description}</p>

      {/* Real-Time Lifecycle Phase Tracker */}
      <div className="grid grid-cols-4 gap-1 py-1.5 border-y border-zinc-800 text-[10px] font-mono">
        {stages.map((st, i) => (
          <div
            key={st.label}
            className={\`text-center py-1 rounded \${
              i < activeStage
                ? "bg-zinc-850 text-zinc-400"
                : i === activeStage
                ? "bg-amber-950/60 border border-amber-800 text-amber-400 font-bold"
                : "text-zinc-600"
            }\`}
          >
            {st.label} {i < activeStage ? "✓" : ""}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-0.5">
        <span>
          Ticket: <strong className="text-zinc-200">{incidentId}</strong> • {updateTime}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSubscribed(!subscribed)}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Toggle notification alerts"
          >
            {subscribed ? <BellOff className="w-3.5 h-3.5 text-amber-400" /> : <Bell className="w-3.5 h-3.5" />}
            <span className="text-[10px]">{subscribed ? "Alerts On" : "Subscribe"}</span>
          </button>
          <a
            href={statusPageUrl}
            className="flex items-center gap-1 text-[${tokens.primary}] hover:underline cursor-pointer"
          >
            <span>Status</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default IncidentAlert;`;
    },
  },

"multiplayer-presence": {
    id: "multiplayer-presence",
    name: "Collaborative Multiplayer Presence",
    category: "elements",
    description: "Figma and Notion style live collaborative presence indicator with active editing indicators, user cursor avatars, and broadcast state.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "activeCount", label: "Active Editors", type: "text", defaultValue: "4 online" },
      { key: "statusNote", label: "Sync State", type: "text", defaultValue: "Live Multiplayer" },
    ],
    renderComponent: (props, tokens) => {
      const users = [
        { initials: "AZ", bg: tokens.primary, name: "Azure", role: "Editing" },
        { initials: "FL", bg: "#10b981", name: "Felix", role: "Viewing" },
        { initials: "RX", bg: "#f59e0b", name: "Rachel", role: "Viewing" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3 border shadow-xl max-w-[310px] w-full space-y-2.5 text-white select-none",
        },
        /* Top sync header */
        React.createElement(
          "div",
          { className: "flex items-center justify-between pb-1.5 border-b border-zinc-850 text-[9px] font-mono" },
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5 text-zinc-300 font-semibold truncate" },
            React.createElement("span", {
              style: { backgroundColor: tokens.primary },
              className: "w-1.5 h-1.5 rounded-full shadow-xs shrink-0",
            }),
            "Doc: Sprint Architecture"
          ),
          React.createElement(
            "span",
            { className: "text-emerald-400 flex items-center gap-1 shrink-0 font-bold" },
            React.createElement("span", { className: "w-1 h-1 rounded-full bg-emerald-400 animate-pulse" }),
            "Live (8ms)"
          )
        ),
        /* Avatars with status */
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center -space-x-1.5 shrink-0" },
            users.map((u, i) =>
              React.createElement(
                "div",
                {
                  key: i,
                  style: { backgroundColor: u.bg },
                  className: "w-6 h-6 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-xs relative",
                  title: `${u.name} (${u.role})`,
                },
                u.initials,
                i === 0 &&
                  React.createElement("span", {
                    className: "absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-zinc-950",
                  })
              )
            ),
            React.createElement(
              "div",
              { className: "w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-300 flex items-center justify-center text-[8px] font-mono font-bold" },
              "+2"
            )
          ),
          React.createElement(
            "div",
            { className: "text-right" },
            React.createElement("div", { className: "text-[11px] font-semibold text-zinc-100 leading-tight" }, props.activeCount || "4 online"),
            React.createElement("div", { className: "text-[9px] font-mono text-zinc-500 leading-tight" }, "3 peers in canvas")
          )
        ),
        /* Simulated cursor preview box */
        React.createElement(
          "div",
          { className: "relative h-8 w-full bg-zinc-900/60 rounded-xs overflow-hidden flex items-center justify-between px-3 text-[9px] font-mono border border-zinc-800/40" },
          /* Floating Cursor 1 */
          React.createElement(
            "div",
            {
              style: { color: tokens.primary },
              className: "flex items-center gap-1 absolute left-3 top-1.5 animate-pulse",
            },
            React.createElement("span", null, "↖"),
            React.createElement(
              "span",
              {
                style: { backgroundColor: tokens.primary, color: tokens.primaryForeground },
                className: "px-1.5 py-0.5 rounded text-[8px] font-bold shadow-xs",
              },
              "Azure (editing)"
            )
          ),
          /* Floating Cursor 2 */
          React.createElement(
            "div",
            { className: "flex items-center gap-1 text-emerald-400 absolute right-3 bottom-1.5" },
            React.createElement("span", null, "↖"),
            React.createElement("span", { className: "px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500 text-zinc-950 shadow-xs" }, "Felix")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState } from "react";
import { Users, Radio, MousePointer, Eye } from "lucide-react";

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  color: string;
  status: "editing" | "viewing" | "idle";
  cursor?: { x: number; y: number };
}

export interface MultiplayerPresenceProps {
  documentName?: string;
  collaborators?: Collaborator[];
  onFollowUser?: (userId: string) => void;
  className?: string;
}

export function MultiplayerPresence({
  documentName = "Doc: Sprint Architecture",
  collaborators = [
    { id: "1", name: "Azure", initials: "AZ", color: "${tokens.primary}", status: "editing", cursor: { x: 35, y: 40 } },
    { id: "2", name: "Felix", initials: "FL", color: "#10b981", status: "viewing", cursor: { x: 75, y: 70 } },
    { id: "3", name: "Rachel", initials: "RX", color: "#f59e0b", status: "viewing" },
  ],
  onFollowUser,
  className = "",
}: MultiplayerPresenceProps) {
  const [followingId, setFollowingId] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(true);

  const toggleFollow = (id: string) => {
    const next = followingId === id ? null : id;
    setFollowingId(next);
    if (next) onFollowUser?.(next);
  };

  return (
    <div className={\`p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-2xl max-w-sm w-full space-y-3 text-white select-none \${className}\`}>
      {/* Top Session Sync Status */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold truncate">
          <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] shadow-[0_0_8px_${tokens.primary}]" />
          <span>{documentName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sync (8ms)</span>
        </div>
      </div>

      {/* Collaborator Avatars & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center -space-x-2">
          {collaborators.map((user) => {
            const isFollowed = followingId === user.id;
            return (
              <button
                key={user.id}
                onClick={() => toggleFollow(user.id)}
                style={{ backgroundColor: user.color }}
                className={\`w-8 h-8 rounded-full border-2 border-zinc-950 text-white flex items-center justify-center text-xs font-mono font-bold transition-transform cursor-pointer hover:scale-110 hover:z-20 relative \${
                  isFollowed ? "ring-2 ring-white scale-105 z-10" : ""
                }\`}
                title={\`\${user.name} (\${user.status}) - Click to follow\`}
              >
                {user.initials}
                {user.status === "editing" && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-zinc-950" />
                )}
              </button>
            );
          })}
          <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-850 text-zinc-300 flex items-center justify-center text-[10px] font-mono font-bold">
            +2
          </div>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs font-semibold text-white">{collaborators.length + 2} Active</div>
          <div className="text-[10px] text-zinc-500">
            {followingId ? \`Following \${collaborators.find((c) => c.id === followingId)?.name}\` : "Click avatar to follow"}
          </div>
        </div>
      </div>

      {/* Live Peer Cursors Simulated Canvas */}
      <div className="relative h-16 w-full bg-zinc-950/80 border border-zinc-850 rounded-xs overflow-hidden p-2 text-xs font-mono">
        {collaborators
          .filter((c) => c.cursor)
          .map((c) => (
            <div
              key={c.id}
              style={{ left: \`\${c.cursor?.x}%\`, top: \`\${c.cursor?.y}%\` }}
              className="absolute flex items-center gap-1 transition-all duration-300"
            >
              <MousePointer style={{ color: c.color }} className="w-3.5 h-3.5 fill-current" />
              <span
                style={{ backgroundColor: c.color }}
                className="px-1.5 py-0.5 rounded text-[8px] font-bold text-zinc-950 shadow-xs"
              >
                {c.name} {c.status === "editing" ? "(editing)" : ""}
              </span>
            </div>
          ))}
      </div>

      {/* Broadcast Toggle Strip */}
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-850">
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3 text-zinc-500" />
          <span>Multiplayer Canvas</span>
        </span>
        <button
          onClick={() => setIsBroadcasting(!isBroadcasting)}
          className="flex items-center gap-1 text-[${tokens.primary}] hover:underline cursor-pointer"
        >
          <Radio className="w-3 h-3" />
          <span>{isBroadcasting ? "Broadcasting On" : "Broadcast Paused"}</span>
        </button>
      </div>
    </div>
  );
}

export default MultiplayerPresence;`;
    },
  },

"otp-code-input": {
    id: "otp-code-input",
    name: "6-Digit MFA Verification Code",
    category: "forms",
    description: "Segmented multi-factor authentication passcode input with focus ring glow, masked PIN bullets, and auto-resend timer countdown.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "recipientMask", label: "Recipient Notice", type: "text", defaultValue: "az***@users.github.com" },
      { key: "resendSeconds", label: "Resend Countdown", type: "text", defaultValue: "42s" },
    ],
    renderComponent: (props, tokens) => {
      const digits = ["8", "4", "2", "•", "", ""];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-xl max-w-sm w-full space-y-4 text-white text-center select-none",
        },
        React.createElement(
          "div",
          { className: "space-y-1" },
          React.createElement("div", { className: "text-xs font-semibold text-white tracking-tight" }, "Two-Factor Verification"),
          React.createElement("div", { className: "text-[10px] font-mono text-zinc-500" }, `Code sent to ${props.recipientMask || "az***@users.github.com"}`)
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-center gap-2" },
          digits.map((d, i) => {
            const isCursor = i === 3;
            return React.createElement(
              "div",
              {
                key: i,
                style: isCursor ? { borderColor: tokens.primary, boxShadow: `0 0 10px ${tokens.primary}40` } : undefined,
                className: `w-9 h-11 rounded-xs border bg-zinc-950 flex items-center justify-center font-mono font-bold text-sm ${
                  isCursor ? "border-2 text-white" : d ? "border-zinc-800 text-zinc-100" : "border-zinc-850 text-zinc-600"
                }`,
              },
              d || ""
            );
          })
        ),
        React.createElement(
          "div",
          { className: "text-[10px] font-mono text-zinc-500" },
          "Didn't receive code? ",
          React.createElement("span", { style: { color: tokens.primary }, className: "hover:underline cursor-pointer" }, `Resend in ${props.resendSeconds || "42s"}`)
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-4 text-white text-center">
  <div className="space-y-1">
    <div className="text-xs font-semibold text-white">Two-Factor Verification</div>
    <div className="text-[10px] font-mono text-zinc-500">Code sent to ${escapeText(props.recipientMask || "az***@users.github.com")}</div>
  </div>
  <div className="flex items-center justify-center gap-2">
    <div className="w-9 h-11 rounded-xs border border-zinc-800 bg-zinc-950 flex items-center justify-center font-mono font-bold text-sm">8</div>
    <div className="w-9 h-11 rounded-xs border border-zinc-800 bg-zinc-950 flex items-center justify-center font-mono font-bold text-sm">4</div>
    <div className="w-9 h-11 rounded-xs border border-zinc-800 bg-zinc-950 flex items-center justify-center font-mono font-bold text-sm">2</div>
    <div className="w-9 h-11 rounded-xs border-2 border-[${tokens.primary}] bg-zinc-950 flex items-center justify-center font-mono font-bold text-sm">•</div>
    <div className="w-9 h-11 rounded-xs border border-zinc-850 bg-zinc-950 flex items-center justify-center font-mono text-zinc-600 font-bold" />
    <div className="w-9 h-11 rounded-xs border border-zinc-850 bg-zinc-950 flex items-center justify-center font-mono text-zinc-600 font-bold" />
  </div>
  <div className="text-[10px] font-mono text-zinc-500">
    Didn't receive code? <span className="text-[${tokens.primary}] cursor-pointer">Resend in ${escapeText(props.resendSeconds || "42s")}</span>
  </div>
</div>`;
    },
  },

"ai-prompt-bar": {
    id: "ai-prompt-bar",
    name: "AI Copilot Prompt Bar",
    category: "forms",
    description: "Multimodal AI chat bar with model selector pill, web search toggle, token counter, and send CTA.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "placeholder", label: "Prompt Placeholder", type: "text", defaultValue: "Ask anything, brainstorm code, or paste diff..." },
      { key: "modelName", label: "Model Chip", type: "text", defaultValue: "Claude 3.5 Sonnet" },
      { key: "tokensEstimate", label: "Token Estimate", type: "text", defaultValue: "~128 tokens" },
      { key: "webSearch", label: "Web Search Active", type: "boolean", defaultValue: true },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${Math.max(tokens.radius, 12)}px`,
          },
          className: "p-3.5 border shadow-2xl max-w-md w-full space-y-3 text-white transition-all",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            {
              style: { borderColor: `${tokens.primary}40`, backgroundColor: `${tokens.primary}15` },
              className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono",
            },
            React.createElement("span", { style: { backgroundColor: tokens.primary }, className: "w-1.5 h-1.5 rounded-full animate-pulse" }),
            React.createElement("span", { className: "text-zinc-200" }, props.modelName || "Claude 3.5 Sonnet")
          ),
          React.createElement(
            "span",
            { className: "text-[10px] font-mono text-zinc-500" },
            props.tokensEstimate || "~128 tokens"
          )
        ),
        React.createElement(
          "div",
          { className: "relative min-h-[44px] flex items-center px-1" },
          React.createElement(
            "input",
            {
              type: "text",
              readOnly: true,
              placeholder: props.placeholder || "Ask anything, brainstorm code, or paste diff...",
              className: "w-full bg-transparent text-xs text-zinc-300 placeholder-zinc-500 font-sans outline-none select-none cursor-text",
            }
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between pt-1 border-t border-zinc-800" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(
              "span",
              {
                className: `px-2 py-1 rounded-xs text-[10px] font-mono flex items-center gap-1 border ${
                  props.webSearch !== false
                    ? "border-emerald-800/80 bg-emerald-950/50 text-emerald-300"
                    : "border-zinc-800 text-zinc-500"
                }`,
              },
              "🌐 Web Search"
            ),
            React.createElement(
              "span",
              { className: "px-2 py-1 rounded-xs text-[10px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer" },
              "📎 Attach"
            )
          ),
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
                borderRadius: `${tokens.radius}px`,
              },
              className: "h-7 px-3 text-xs font-mono font-medium flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all shadow-xs",
            },
            React.createElement("span", null, "Send"),
            React.createElement("span", { className: "font-mono text-[10px]" }, "↑")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${Math.max(tokens.radius, 12)}px] shadow-2xl max-w-md w-full space-y-3 text-white">
  <div className="flex items-center justify-between">
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[${tokens.primary}]/40 bg-[${tokens.primary}]/15 text-[11px] font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-[${tokens.primary}] animate-pulse" />
      <span className="text-zinc-200">${escapeText(props.modelName || "Claude 3.5 Sonnet")}</span>
    </div>
    <span className="text-[10px] font-mono text-zinc-500">${escapeText(props.tokensEstimate || "~128 tokens")}</span>
  </div>
  <div className="min-h-[44px] flex items-center px-1">
    <input type="text" readOnly placeholder="${escapeAttr(props.placeholder || "Ask anything, brainstorm code, or paste diff...")}" className="w-full bg-transparent text-xs text-zinc-300 placeholder-zinc-500 font-sans outline-none" />
  </div>
  <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
    <div className="flex items-center gap-2">
      <span className="px-2 py-1 rounded-xs text-[10px] font-mono flex items-center gap-1 border border-emerald-800 bg-emerald-950/50 text-emerald-300">🌐 Web Search</span>
      <span className="px-2 py-1 rounded-xs text-[10px] font-mono text-zinc-500">📎 Attach</span>
    </div>
    <button className="h-7 px-3 text-xs font-mono font-medium flex items-center gap-1 bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] hover:opacity-90 active:scale-95">
      <span>Send</span>
      <span className="font-mono text-[10px]">↑</span>
    </button>
  </div>
</div>`;
    },
  },

"code-diff-viewer": {
    id: "code-diff-viewer",
    name: "Interactive Code Diff Viewer",
    category: "components",
    description: "Visual git diff comparison block with line numbers, additions/deletions stats, and file path chip.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "filePath", label: "File Path", type: "text", defaultValue: "src/auth/session.ts" },
      { key: "oldLine", label: "Removed Line", type: "text", defaultValue: "- const token = cookieStore.get('auth_token');" },
      { key: "newLine", label: "Added Line", type: "text", defaultValue: "+ const session = await auth.verifySessionToken(token);" },
      { key: "stats", label: "Stats Label", type: "text", defaultValue: "+1 line, -1 line" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "border shadow-xl max-w-md w-full overflow-hidden text-xs font-mono select-none",
        },
        React.createElement(
          "div",
          { className: "px-3.5 py-2 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-[11px]" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2 text-zinc-300" },
            React.createElement("span", { className: "text-zinc-500" }, "📄"),
            React.createElement("span", { className: "font-semibold" }, props.filePath || "src/auth/session.ts")
          ),
          React.createElement(
            "span",
            { className: "text-[10px] text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded-2xs bg-zinc-900" },
            props.stats || "+1 line, -1 line"
          )
        ),
        React.createElement(
          "div",
          { className: "p-2 space-y-1 bg-[#09090b] text-[11px] leading-relaxed" },
          React.createElement(
            "div",
            { className: "px-2 py-1 rounded-xs bg-red-950/40 text-red-300 border border-red-900/40 flex items-center gap-2 truncate" },
            React.createElement("span", { className: "text-red-500 select-none font-bold" }, "-"),
            React.createElement("span", { className: "truncate" }, props.oldLine || "- const token = cookieStore.get('auth_token');")
          ),
          React.createElement(
            "div",
            { className: "px-2 py-1 rounded-xs bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 flex items-center gap-2 truncate" },
            React.createElement("span", { className: "text-emerald-500 select-none font-bold" }, "+"),
            React.createElement("span", { className: "truncate" }, props.newLine || "+ const session = await auth.verifySessionToken(token);")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="border border-[${tokens.border}] bg-[${tokens.surface}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full overflow-hidden text-xs font-mono">
  <div className="px-3.5 py-2 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-[11px]">
    <div className="flex items-center gap-2 text-zinc-300">
      <span>📄</span>
      <span className="font-semibold">${escapeText(props.filePath || "src/auth/session.ts")}</span>
    </div>
    <span className="text-[10px] text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded-xs bg-zinc-900">${escapeText(props.stats || "+1 line, -1 line")}</span>
  </div>
  <div className="p-2 space-y-1 bg-[#09090b] text-[11px] leading-relaxed">
    <div className="px-2 py-1 rounded-xs bg-red-950/40 text-red-300 border border-red-900/40 flex items-center gap-2">
      <span className="text-red-500 font-bold">-</span>
      <span className="truncate">${escapeText(props.oldLine || "- const token = cookieStore.get('auth_token');")}</span>
    </div>
    <div className="px-2 py-1 rounded-xs bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 flex items-center gap-2">
      <span className="text-emerald-500 font-bold">+</span>
      <span className="truncate">${escapeText(props.newLine || "+ const session = await auth.verifySessionToken(token);")}</span>
    </div>
  </div>
</div>`;
    },
  },

"usage-quota-meter": {
    id: "usage-quota-meter",
    name: "SaaS Quota & Compute Meter",
    category: "components",
    description: "Real-time compute and API quota progress card with warning threshold and upgrade CTA.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Metric Title", type: "text", defaultValue: "Monthly Compute Quota" },
      { key: "usage", label: "Used Units", type: "text", defaultValue: "84,200" },
      { key: "total", label: "Total Limit", type: "text", defaultValue: "100,000" },
      { key: "percentage", label: "Percentage %", type: "number", defaultValue: 84 },
      { key: "resetDays", label: "Reset In", type: "text", defaultValue: "6 days" },
    ],
    renderComponent: (props, tokens) => {
      const pct = Math.min(100, Math.max(0, Number(props.percentage) || 84));
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-xl max-w-sm w-full space-y-3.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-xs font-mono uppercase tracking-wider text-zinc-400" }, props.title || "Monthly Compute Quota"),
          React.createElement("span", { className: "text-xs font-bold text-white font-mono" }, `${pct}%`)
        ),
        React.createElement(
          "div",
          { className: "h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800" },
          React.createElement("div", {
            style: {
              width: `${pct}%`,
              backgroundColor: pct > 80 ? "#f59e0b" : tokens.primary,
            },
            className: "h-full rounded-full transition-all duration-500",
          })
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-0.5" },
          React.createElement("span", null, `${props.usage || "84,200"} / ${props.total || "100,000"} reqs`),
          React.createElement("span", { className: "text-zinc-500" }, `Resets in ${props.resetDays || "6 days"}`)
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-1.5 px-3 text-xs font-medium cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]",
          },
          "Upgrade Quota Limit"
        )
      );
    },
    generateJsx: (props, tokens) => {
      const pct = Math.min(100, Math.max(0, Number(props.percentage) || 84));
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3.5 text-white">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">${escapeText(props.title || "Monthly Compute Quota")}</span>
    <span className="text-xs font-bold text-white font-mono">${pct}%</span>
  </div>
  <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
    <div style={{ width: "${pct}%" }} className="h-full rounded-full bg-[${pct > 80 ? '#f59e0b' : tokens.primary}]" />
  </div>
  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
    <span>${escapeText(props.usage || "84,200")} / ${escapeText(props.total || "100,000")} reqs</span>
    <span className="text-zinc-500">Resets in ${escapeText(props.resetDays || "6 days")}</span>
  </div>
  <button className="w-full py-1.5 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] hover:opacity-90">
    Upgrade Quota Limit
  </button>
</div>`;
    },
  },

"kanban-task-card": {
    id: "kanban-task-card",
    name: "Agile Kanban Task Card",
    category: "components",
    description: "Interactive issue ticket card with priority status tag, branch tag, checklist counter, and assignee avatar.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "issueId", label: "Issue Key", type: "text", defaultValue: "FETCH-1082" },
      { key: "title", label: "Task Title", type: "text", defaultValue: "Implement PKCE OAuth Security Standard" },
      { key: "priority", label: "Priority", type: "select", defaultValue: "Urgent", options: ["Urgent", "High", "Normal", "Low"] },
      { key: "branch", label: "Git Branch", type: "text", defaultValue: "feat/pkce-auth" },
      { key: "subtasks", label: "Checklist", type: "text", defaultValue: "4/5 subtasks" },
      { key: "assignee", label: "Assignee Initials", type: "text", defaultValue: "AZ" },
    ],
    renderComponent: (props, tokens) => {
      const priorityColors: Record<string, string> = {
        Urgent: "bg-red-950/80 text-red-300 border-red-800",
        High: "bg-amber-950/80 text-amber-300 border-amber-800",
        Normal: "bg-blue-950/80 text-blue-300 border-blue-800",
        Low: "bg-zinc-900 text-zinc-400 border-zinc-800",
      };
      const pColor = priorityColors[props.priority || "Urgent"] || priorityColors.Urgent;

      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-lg max-w-sm w-full space-y-3 text-white select-none transition-all hover:border-zinc-700",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-[10px] font-mono font-bold text-zinc-500 tracking-wider" }, props.issueId || "FETCH-1082"),
          React.createElement(
            "span",
            { className: `text-[10px] font-mono px-2 py-0.5 rounded-xs border font-semibold ${pColor}` },
            props.priority || "Urgent"
          )
        ),
        React.createElement("h4", { className: "text-xs font-semibold text-white leading-snug" }, props.title || "Implement PKCE OAuth Security Standard"),
        React.createElement(
          "div",
          { className: "flex items-center gap-2 text-[10px] font-mono text-zinc-400" },
          React.createElement("span", { className: "px-1.5 py-0.5 rounded-xs bg-zinc-900 border border-zinc-800 flex items-center gap-1" },
            "🌿",
            props.branch || "feat/pkce-auth"
          ),
          React.createElement("span", { className: "text-zinc-500" }, props.subtasks || "4/5 subtasks")
        ),
        React.createElement(
          "div",
          { className: "pt-2 border-t border-zinc-800 flex items-center justify-between text-xs" },
          React.createElement("span", { className: "text-[11px] font-mono text-emerald-400 flex items-center gap-1" },
            React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }),
            "In Review"
          ),
          React.createElement(
            "div",
            {
              style: { backgroundColor: tokens.primary, color: tokens.primaryForeground },
              className: "w-6 h-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center border border-white/20 shadow-xs",
            },
            props.assignee || "AZ"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-sm w-full space-y-3 text-white">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono font-bold text-zinc-500">${escapeText(props.issueId || "FETCH-1082")}</span>
    <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs border border-red-800 bg-red-950/80 text-red-300 font-semibold">${escapeText(props.priority || "Urgent")}</span>
  </div>
  <h4 className="text-xs font-semibold text-white leading-snug">${escapeText(props.title || "Implement PKCE OAuth Security Standard")}</h4>
  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
    <span className="px-1.5 py-0.5 rounded-xs bg-zinc-900 border border-zinc-800">🌿 ${escapeText(props.branch || "feat/pkce-auth")}</span>
    <span className="text-zinc-500">${escapeText(props.subtasks || "4/5 subtasks")}</span>
  </div>
  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      In Review
    </span>
    <div className="w-6 h-6 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] font-mono text-[10px] font-bold flex items-center justify-center">
      ${escapeText(props.assignee || "AZ")}
    </div>
  </div>
</div>`;
    },
  },

"audio-waveform-player": {
    id: "audio-waveform-player",
    name: "Voice Note Waveform Player",
    category: "elements",
    description: "Interactive voice memo audio system with real-time waveform scrubbing, speed toggle, play/pause state, and playback counter.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "speakerName", label: "Speaker Name", type: "text", defaultValue: "Sarah Jenkins" },
      { key: "timeElapsed", label: "Time Elapsed", type: "text", defaultValue: "01:24" },
      { key: "totalDuration", label: "Total Length", type: "text", defaultValue: "02:45" },
      { key: "speed", label: "Playback Speed", type: "select", defaultValue: "1.5x", options: ["1.0x", "1.5x", "2.0x"] },
    ],
    renderComponent: (props, tokens) => {
      const barHeights = [30, 55, 75, 40, 90, 100, 65, 35, 80, 95, 50, 25, 70, 85, 45, 90, 60, 30, 75, 90, 40, 65, 80, 50, 30, 60, 40, 20];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${Math.max(tokens.radius, 14)}px`,
          },
          className: "p-3.5 border shadow-2xl max-w-[280px] w-full space-y-2.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2 min-w-0" },
            React.createElement(
              "div",
              { className: "relative shrink-0" },
              React.createElement(
                "div",
                {
                  style: { backgroundColor: tokens.primary, color: tokens.primaryForeground },
                  className: "w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-xs",
                },
                (props.speakerName || "SJ").slice(0, 2).toUpperCase()
              ),
              React.createElement("span", {
                className: "absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-zinc-950",
              })
            ),
            React.createElement(
              "div",
              { className: "min-w-0" },
              React.createElement("div", { className: "text-xs font-semibold text-zinc-100 truncate leading-tight" }, props.speakerName || "Sarah Jenkins"),
              React.createElement("div", { className: "text-[9px] text-zinc-500 font-mono leading-tight" }, "Voice Note • 48 kHz")
            )
          ),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-[10px] font-mono text-zinc-400 font-medium shrink-0" },
            props.speed || "1.5x"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-end gap-[2px] h-7 w-full py-0.5" },
          barHeights.map((h, i) =>
            React.createElement("div", {
              key: i,
              style: {
                height: `${h}%`,
                backgroundColor: i < 14 ? tokens.primary : "#3f3f46",
              },
              className: "flex-1 rounded-full transition-all",
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between pt-0.5" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(
              "button",
              {
                style: { backgroundColor: tokens.primary, color: tokens.primaryForeground },
                className: "w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-md text-[10px] pl-0.5 cursor-pointer hover:scale-105 transition-transform",
              },
              "▶"
            ),
            React.createElement(
              "div",
              { className: "flex items-center gap-1 text-[10px] font-mono" },
              React.createElement("span", { style: { color: tokens.primary }, className: "font-medium" }, props.timeElapsed || "01:24"),
              React.createElement("span", { className: "text-zinc-600" }, "/"),
              React.createElement("span", { className: "text-zinc-400" }, props.totalDuration || "02:45")
            )
          ),
          React.createElement(
            "span",
            { className: "text-[10px] font-mono text-zinc-500 flex items-center gap-1" },
            React.createElement("span", { className: "w-1 h-1 rounded-full bg-zinc-600" }),
            "HD"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export interface VoiceNotePlayerProps {
  speakerName?: string;
  initialElapsed?: string;
  totalDuration?: string;
  speed?: "1.0x" | "1.5x" | "2.0x";
  className?: string;
}

export function VoiceNotePlayer({
  speakerName = "${escapeText(props.speakerName || "Sarah Jenkins")}",
  initialElapsed = "${escapeText(props.timeElapsed || "01:24")}",
  totalDuration = "${escapeText(props.totalDuration || "02:45")}",
  speed: initialSpeed = "${escapeText(props.speed || "1.5x")}",
  className = "",
}: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<"1.0x" | "1.5x" | "2.0x">(initialSpeed as any);
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(84); // 01:24
  const totalSeconds = 165; // 02:45

  useEffect(() => {
    if (!isPlaying) return;
    const rate = speed === "2.0x" ? 2 : speed === "1.5x" ? 1.5 : 1;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= totalSeconds ? 0 : prev + 1));
    }, 1000 / rate);
    return () => clearInterval(interval);
  }, [isPlaying, speed, totalSeconds]);

  const toggleSpeed = () => {
    setSpeed((prev) => (prev === "1.0x" ? "1.5x" : prev === "1.5x" ? "2.0x" : "1.0x"));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const rem = (s % 60).toString().padStart(2, "0");
    return \`\${m}:\${rem}\`;
  };

  const barHeights = [30, 55, 75, 40, 90, 100, 65, 35, 80, 95, 50, 25, 70, 85, 45, 90, 60, 30, 75, 90, 40, 65, 80, 50, 30, 60, 40, 20];
  const activeCount = Math.floor((seconds / totalSeconds) * barHeights.length);

  return (
    <div className={\`p-3.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${Math.max(tokens.radius, 14)}px] shadow-2xl max-w-[280px] w-full space-y-2.5 text-white select-none \${className}\`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative shrink-0">
            <div className="w-6 h-6 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-mono text-[10px] font-bold shadow-xs">
              {speakerName.slice(0, 2).toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-zinc-950" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-100 truncate leading-tight">{speakerName}</div>
            <div className="text-[9px] text-zinc-500 font-mono leading-tight">Voice Note • 48 kHz</div>
          </div>
        </div>
        <button
          onClick={toggleSpeed}
          className="px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors"
        >
          {speed}
        </button>
      </div>

      <div className="flex items-end gap-[2px] h-7 w-full py-0.5">
        {barHeights.map((h, i) => (
          <button
            key={i}
            onClick={() => setSeconds(Math.floor((i / barHeights.length) * totalSeconds))}
            style={{ height: \`\${h}%\` }}
            className={\`flex-1 rounded-full transition-all \${
              i < activeCount ? "bg-[${tokens.primary}]" : "bg-zinc-800 hover:bg-zinc-700"
            }\`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            <span className="text-[${tokens.primary}] font-medium">{formatTime(seconds)}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">{totalDuration}</span>
          </div>
        </div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default VoiceNotePlayer;`;
    },
  },

"deploy-pipeline-status": {
    id: "deploy-pipeline-status",
    name: "CI/CD Pipeline Tracker",
    category: "components",
    description: "Multi-stage deployment workflow visualization displaying Build, Lint, Test, and Production steps with status pulses.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "commitSha", label: "Commit Hash", type: "text", defaultValue: "e94b21d" },
      { key: "branch", label: "Branch", type: "text", defaultValue: "main" },
      { key: "deployEnv", label: "Target Environment", type: "text", defaultValue: "Production (us-east-1)" },
      { key: "duration", label: "Elapsed Time", type: "text", defaultValue: "1m 42s" },
    ],
    renderComponent: (props, tokens) => {
      const steps = [
        { label: "Build", status: "passed", icon: "✓" },
        { label: "Lint", status: "passed", icon: "✓" },
        { label: "Test", status: "passed", icon: "✓" },
        { label: "Deploy", status: "running", icon: "●" },
      ];

      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xl max-w-md w-full space-y-3.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-xs" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2 font-mono text-[11px]" },
            React.createElement("span", { className: "text-zinc-500" }, "commit"),
            React.createElement("span", { className: "text-white font-bold" }, props.commitSha || "e94b21d"),
            React.createElement("span", { className: "px-1.5 py-0.2 rounded-xs bg-zinc-900 border border-zinc-800 text-zinc-400" }, props.branch || "main")
          ),
          React.createElement("span", { className: "text-[10px] font-mono text-zinc-500" }, props.duration || "1m 42s")
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-4 gap-2 pt-1" },
          steps.map((st, i) =>
            React.createElement(
              "div",
              {
                key: i,
                className: `p-2 rounded-xs border text-center space-y-1 ${
                  st.status === "passed"
                    ? "border-emerald-900/60 bg-emerald-950/30 text-emerald-300"
                    : "border-indigo-800/80 bg-indigo-950/40 text-indigo-300 animate-pulse"
                }`,
              },
              React.createElement("div", { className: "text-xs font-mono font-bold" }, st.icon),
              React.createElement("div", { className: "text-[10px] font-mono uppercase tracking-wider" }, st.label)
            )
          )
        ),
        React.createElement(
          "div",
          { className: "text-[10px] font-mono text-zinc-400 pt-1 flex items-center justify-between border-t border-zinc-800" },
          React.createElement("span", null, `Deploying to ${props.deployEnv || "Production (us-east-1)"}`),
          React.createElement("span", { className: "text-emerald-400 flex items-center gap-1" },
            React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }),
            "Healthy"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full space-y-3.5 text-white">
  <div className="flex items-center justify-between text-xs">
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className="text-zinc-500">commit</span>
      <span className="text-white font-bold">${escapeText(props.commitSha || "e94b21d")}</span>
      <span className="px-1.5 py-0.2 rounded-xs bg-zinc-900 border border-zinc-800 text-zinc-400">${escapeText(props.branch || "main")}</span>
    </div>
    <span className="text-[10px] font-mono text-zinc-500">${escapeText(props.duration || "1m 42s")}</span>
  </div>
  <div className="grid grid-cols-4 gap-2 pt-1">
    <div className="p-2 rounded-xs border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 text-center space-y-1">
      <div className="text-xs font-mono font-bold">✓</div>
      <div className="text-[10px] font-mono uppercase tracking-wider">Build</div>
    </div>
    <div className="p-2 rounded-xs border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 text-center space-y-1">
      <div className="text-xs font-mono font-bold">✓</div>
      <div className="text-[10px] font-mono uppercase tracking-wider">Lint</div>
    </div>
    <div className="p-2 rounded-xs border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 text-center space-y-1">
      <div className="text-xs font-mono font-bold">✓</div>
      <div className="text-[10px] font-mono uppercase tracking-wider">Test</div>
    </div>
    <div className="p-2 rounded-xs border border-indigo-800 bg-indigo-950/40 text-indigo-300 text-center space-y-1 animate-pulse">
      <div className="text-xs font-mono font-bold">●</div>
      <div className="text-[10px] font-mono uppercase tracking-wider">Deploy</div>
    </div>
  </div>
</div>`;
    },
  },

"multi-step-stepper": {
    id: "multi-step-stepper",
    name: "Multi-Step Onboarding Stepper",
    category: "navigation",
    description: "Horizontal step progress indicator with completed checkmarks, current step spotlight, and step summary.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "step1", label: "Step 1 Label", type: "text", defaultValue: "Workspace" },
      { key: "step2", label: "Step 2 Label", type: "text", defaultValue: "Integrations" },
      { key: "step3", label: "Step 3 Label", type: "text", defaultValue: "Team Access" },
      { key: "currentStep", label: "Current Step (1-3)", type: "select", defaultValue: "2", options: ["1", "2", "3"] },
    ],
    renderComponent: (props, tokens) => {
      const cur = parseInt(props.currentStep || "2", 10);
      const steps = [
        { label: props.step1 || "Workspace", num: 1 },
        { label: props.step2 || "Integrations", num: 2 },
        { label: props.step3 || "Team Access", num: 3 },
      ];

      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-lg max-w-md w-full select-none text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between relative" },
          steps.map((st, i) => {
            const isDone = st.num < cur;
            const isCurrent = st.num === cur;
            return React.createElement(
              "div",
              { key: i, className: "flex-1 flex flex-col items-center relative text-center" },
              React.createElement(
                "div",
                {
                  style: {
                    backgroundColor: isDone || isCurrent ? tokens.primary : "#18181b",
                    color: isDone || isCurrent ? tokens.primaryForeground : "#71717a",
                    borderColor: isCurrent ? tokens.primary : tokens.border,
                  },
                  className: "w-7 h-7 rounded-full border flex items-center justify-center text-xs font-mono font-bold z-10 shadow-xs mb-1.5 transition-colors",
                },
                isDone ? "✓" : st.num
              ),
              React.createElement(
                "span",
                { className: `text-[11px] font-mono ${isCurrent ? "text-white font-bold" : "text-zinc-500"}` },
                st.label
              )
            );
          })
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-md w-full text-white">
  <div className="flex items-center justify-between">
    <div className="flex-1 flex flex-col items-center">
      <div className="w-7 h-7 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center text-xs font-mono font-bold mb-1.5">✓</div>
      <span className="text-[11px] font-mono text-zinc-400">${escapeText(props.step1 || "Workspace")}</span>
    </div>
    <div className="flex-1 flex flex-col items-center">
      <div className="w-7 h-7 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] border border-[${tokens.primary}] flex items-center justify-center text-xs font-mono font-bold mb-1.5">2</div>
      <span className="text-[11px] font-mono text-white font-bold">${escapeText(props.step2 || "Integrations")}</span>
    </div>
    <div className="flex-1 flex flex-col items-center">
      <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center text-xs font-mono font-bold mb-1.5">3</div>
      <span className="text-[11px] font-mono text-zinc-500">${escapeText(props.step3 || "Team Access")}</span>
    </div>
  </div>
</div>`;
    },
  },

"activity-heatmap": {
    id: "activity-heatmap",
    name: "Activity Heatmap Matrix",
    category: "components",
    description: "GitHub-style telemetry contribution matrix with multi-tier density coloring, legend chips, and total count KPI.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "totalEvents", label: "Total Events", type: "text", defaultValue: "2,418 events" },
      { key: "periodLabel", label: "Period", type: "text", defaultValue: "Last 90 days" },
    ],
    renderComponent: (props, tokens) => {
      const sampleLevels = [
        0, 1, 2, 0, 3, 1, 0, 2, 4, 1, 0, 3, 2, 0,
        1, 0, 2, 3, 1, 0, 4, 2, 0, 1, 3, 0, 1, 2,
        0, 3, 1, 4, 2, 0, 1, 0, 3, 2, 4, 1, 0, 2,
        2, 1, 0, 3, 0, 4, 2, 1, 0, 3, 1, 2, 0, 4,
        1, 0, 3, 2, 4, 1, 0, 2, 3, 0, 1, 4, 2, 0,
        0, 2, 1, 0, 3, 2, 4, 0, 1, 3, 2, 0, 4, 1,
        3, 1, 0, 4, 2, 0, 1, 3, 2, 4, 0, 1, 2, 3,
      ];

      const getBg = (level: number) => {
        if (level === 0) return "#18181b";
        if (level === 1) return `color-mix(in srgb, ${tokens.primary} 30%, #18181b)`;
        if (level === 2) return `color-mix(in srgb, ${tokens.primary} 55%, #18181b)`;
        if (level === 3) return `color-mix(in srgb, ${tokens.primary} 80%, #18181b)`;
        return tokens.primary;
      };

      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xl max-w-md w-full space-y-2.5 select-none text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-xs" },
          React.createElement("span", { className: "font-semibold text-white font-mono" }, props.totalEvents || "2,418 events"),
          React.createElement("span", { className: "text-[10px] font-mono text-zinc-500" }, props.periodLabel || "Last 90 days")
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-2 justify-center py-1" },
          React.createElement(
            "div",
            { className: "flex flex-col justify-between text-[8px] font-mono text-zinc-500 h-[92px] py-0.5 select-none shrink-0" },
            React.createElement("span", null, "Mon"),
            React.createElement("span", null, "Wed"),
            React.createElement("span", null, "Fri")
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateRows: "repeat(7, 10px)",
                gridAutoFlow: "column",
                gap: "4px",
              },
              className: "overflow-hidden",
            },
            sampleLevels.map((lvl, i) =>
              React.createElement("div", {
                key: i,
                style: { backgroundColor: getBg(lvl) },
                className: "w-2.5 h-2.5 rounded-2xs transition-transform hover:scale-125 cursor-pointer",
              })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-end gap-1.5 text-[9px] font-mono text-zinc-500 pt-0.5" },
          React.createElement("span", null, "Less"),
          [0, 1, 2, 3, 4].map((l) =>
            React.createElement("span", {
              key: l,
              style: { backgroundColor: getBg(l) },
              className: "w-2 h-2 rounded-2xs inline-block",
            })
          ),
          React.createElement("span", null, "More")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full space-y-2.5 text-white">
  <div className="flex items-center justify-between text-xs font-mono">
    <span className="font-semibold text-white">${escapeText(props.totalEvents || "2,418 events")}</span>
    <span className="text-[10px] text-zinc-500">${escapeText(props.periodLabel || "Last 90 days")}</span>
  </div>
  <div className="flex items-center gap-2 justify-center py-1">
    <div className="flex flex-col justify-between text-[8px] font-mono text-zinc-500 h-[92px] py-0.5 shrink-0">
      <span>Mon</span>
      <span>Wed</span>
      <span>Fri</span>
    </div>
    <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 10px)', gridAutoFlow: 'column', gap: '4px' }} className="overflow-hidden">
      <div className="w-2.5 h-2.5 rounded-2xs bg-zinc-900" />
      <div className="w-2.5 h-2.5 rounded-2xs bg-[${tokens.primary}]/40" />
      <div className="w-2.5 h-2.5 rounded-2xs bg-[${tokens.primary}]" />
    </div>
  </div>
  <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono text-zinc-500">
    <span>Less</span>
    <span className="w-2 h-2 rounded-2xs bg-zinc-900 inline-block" />
    <span className="w-2 h-2 rounded-2xs bg-[${tokens.primary}]/40 inline-block" />
    <span className="w-2 h-2 rounded-2xs bg-[${tokens.primary}] inline-block" />
    <span>More</span>
  </div>
</div>`;
    },
  },

"floating-glass-nav": {
    id: "floating-glass-nav",
    name: "Floating Glass Island Navbar",
    category: "navigation",
    description: "macOS-style floating dynamic island header with frosted glass backdrop blur, active pill tab indicator, and Cmd+K trigger.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "logo", label: "Logo Text", type: "text", defaultValue: "Fetch" },
      { key: "activeTab", label: "Active Tab", type: "select", defaultValue: "App", options: ["App", "Metrics", "Docs"] },
      { key: "status", label: "Status Chip", type: "text", defaultValue: "Online" },
    ],
    renderComponent: (props, tokens) => {
      const tabs = ["App", "Metrics", "Docs"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: `${tokens.surface}f0`,
            borderColor: tokens.border,
            boxShadow: `0 12px 30px -5px rgba(0, 0, 0, 0.6), 0 0 16px ${tokens.primary}20`,
          },
          className: "px-2.5 py-1 border backdrop-blur-xl rounded-full max-w-[275px] w-full flex items-center justify-between gap-1.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-1.5 font-mono font-bold text-[11px] shrink-0 pl-1" },
          React.createElement("span", {
            style: { backgroundColor: tokens.primary },
            className: "w-2 h-2 rounded-full shadow-xs shrink-0",
          }),
          React.createElement("span", { className: "tracking-tight text-zinc-100" }, props.logo || "Fetch")
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-0.5 text-[10px] font-mono shrink-0" },
          tabs.map((tab) => {
            const isActive = tab === (props.activeTab || "App");
            return React.createElement(
              "span",
              {
                key: tab,
                style: isActive
                  ? { backgroundColor: tokens.primary, color: tokens.primaryForeground }
                  : {},
                className: `px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  isActive ? "font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                }`,
              },
              tab
            );
          })
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-1 shrink-0 pr-0.5" },
          React.createElement(
            "span",
            {
              className: "px-1.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-[9px] font-mono text-zinc-400 flex items-center gap-0.5",
            },
            React.createElement("span", null, "⌘"),
            React.createElement("span", null, "K")
          ),
          React.createElement("span", {
            className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0",
            title: props.status || "Online",
          })
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState, useEffect } from "react";

export interface FloatingIslandNavProps {
  logo?: string;
  tabs?: string[];
  initialTab?: string;
  statusLabel?: string;
  onTabChange?: (tab: string) => void;
  onSearchOpen?: () => void;
  className?: string;
}

export function FloatingIslandNav({
  logo = "${escapeText(props.logo || "Fetch")}",
  tabs = ["App", "Metrics", "Docs"],
  initialTab = "${escapeText(props.activeTab || "App")}",
  statusLabel = "${escapeText(props.status || "Online")}",
  onTabChange,
  onSearchOpen,
  className = "",
}: FloatingIslandNavProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearchOpen?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchOpen]);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <nav className={\`inline-flex items-center justify-between gap-1.5 px-2.5 py-1 bg-[${tokens.surface}]/90 border border-[${tokens.border}] rounded-full shadow-2xl backdrop-blur-xl max-w-[275px] w-full text-white select-none \${className}\`}>
      {/* Brand Cluster */}
      <div className="flex items-center gap-1.5 font-mono font-bold text-[11px] shrink-0 pl-1">
        <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] shadow-[0_0_8px_${tokens.primary}]" />
        <span className="tracking-tight text-zinc-100">{logo}</span>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-0.5 text-[10px] font-mono shrink-0">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => handleSelectTab(tab)}
              className={\`px-2 py-0.5 rounded-full transition-all cursor-pointer \${
                isActive
                  ? "bg-[${tokens.primary}] text-[${tokens.primaryForeground}] font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }\`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Action Shortcut */}
      <div className="flex items-center gap-1 shrink-0 pr-0.5">
        <button
          onClick={onSearchOpen}
          title="Quick search (Cmd+K)"
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-[9px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>⌘</span>
          <span>K</span>
        </button>
        <span
          className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"
          title={statusLabel}
        />
      </div>
    </nav>
  );
}

export default FloatingIslandNav;`;
    },
  },

"telemetry-donut-dial": {
    id: "telemetry-donut-dial",
    name: "Telemetry Donut KPI Dial",
    category: "components",
    description: "Circular telemetry metric dial with multi-color SVG segments, center KPI stat, and categorical breakdown chips.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "metricTitle", label: "Metric Title", type: "text", defaultValue: "Uptime SLA Target" },
      { key: "kpiValue", label: "KPI Stat", type: "text", defaultValue: "99.98%" },
      { key: "statusLabel", label: "Status Chip", type: "text", defaultValue: "Optimal" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[300px] w-full space-y-3 text-white select-none",
        },
        /* Header */
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-1.5" },
            React.createElement("span", {
              style: { backgroundColor: tokens.primary },
              className: "w-1.5 h-1.5 rounded-full shadow-xs",
            }),
            React.createElement("span", { className: "text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300" }, props.metricTitle || "Uptime SLA")
          ),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 rounded-full border border-emerald-900 bg-emerald-950/80 text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1" },
            React.createElement("span", { className: "w-1 h-1 rounded-full bg-emerald-400 animate-pulse" }),
            props.statusLabel || "Optimal"
          )
        ),
        /* Circular Multi-Arc Donut */
        React.createElement(
          "div",
          { className: "flex items-center justify-center py-1" },
          React.createElement(
            "div",
            { className: "relative w-28 h-28 flex items-center justify-center" },
            React.createElement(
              "svg",
              { className: "w-full h-full -rotate-90 drop-shadow-md", viewBox: "0 0 100 100" },
              React.createElement("circle", { cx: "50", cy: "50", r: "38", stroke: "#27272a", strokeWidth: "7", fill: "none" }),
              React.createElement("circle", {
                cx: "50",
                cy: "50",
                r: "38",
                stroke: tokens.primary,
                strokeWidth: "7",
                strokeDasharray: "238.76",
                strokeDashoffset: "24",
                strokeLinecap: "round",
                fill: "none",
              }),
              React.createElement("circle", {
                cx: "50",
                cy: "50",
                r: "38",
                stroke: "#10b981",
                strokeWidth: "7",
                strokeDasharray: "238.76",
                strokeDashoffset: "215",
                strokeLinecap: "round",
                fill: "none",
              })
            ),
            React.createElement(
              "div",
              { className: "absolute flex flex-col items-center justify-center text-center" },
              React.createElement("span", { className: "text-lg font-bold font-mono tracking-tight text-white leading-none" }, props.kpiValue || "99.98%"),
              React.createElement("span", { className: "text-[8px] font-mono text-zinc-400 uppercase tracking-widest mt-1 font-medium" }, "SLA Rate")
            )
          )
        ),
        /* Telemetry breakdown (Clean Minimal Divider, Anti-Slop) */
        React.createElement(
          "div",
          { className: "grid grid-cols-3 divide-x divide-zinc-800/80 text-center pt-2.5 border-t border-zinc-800/60 text-[9px] font-mono" },
          React.createElement("div", { className: "px-1" },
            React.createElement("div", { className: "text-zinc-500 text-[8px] uppercase tracking-wider" }, "24h Avg"),
            React.createElement("div", { className: "font-semibold text-zinc-100 text-[11px] pt-0.5" }, "99.99%")
          ),
          React.createElement("div", { className: "px-1" },
            React.createElement("div", { className: "text-zinc-500 text-[8px] uppercase tracking-wider" }, "P99"),
            React.createElement("div", { className: "font-semibold text-zinc-100 text-[11px] pt-0.5" }, "12ms")
          ),
          React.createElement("div", { className: "px-1" },
            React.createElement("div", { className: "text-zinc-500 text-[8px] uppercase tracking-wider" }, "Incidents"),
            React.createElement("div", { className: "font-semibold text-emerald-400 text-[11px] pt-0.5" }, "0 Active")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `"use client";

import React, { useState } from "react";
import { Activity, ShieldCheck, ArrowDownRight, Clock } from "lucide-react";

export interface TelemetryDonutDialProps {
  metricTitle?: string;
  kpiValue?: string;
  statusLabel?: string;
  className?: string;
}

export function TelemetryDonutDial({
  metricTitle = "${escapeText(props.metricTitle || "Uptime SLA Target")}",
  kpiValue = "${escapeText(props.kpiValue || "99.98%")}",
  statusLabel = "${escapeText(props.statusLabel || "Optimal")}",
  className = "",
}: TelemetryDonutDialProps) {
  const [selectedMetric, setSelectedMetric] = useState<"uptime" | "latency" | "budget">("uptime");

  const metricData = {
    uptime: { value: kpiValue, sub: "SLA RATE", avg: "99.99%", p99: "12ms", burn: "0.02%", offset: 24 },
    latency: { value: "12.4ms", sub: "P99 AVG", avg: "8.1ms", p99: "12.4ms", burn: "-2.1ms", offset: 60 },
    budget: { value: "4h 19m", sub: "ERROR BUDGET", avg: "94.2%", p99: "100%", burn: "0.8h", offset: 15 },
  };

  const current = metricData[selectedMetric];

  return (
    <div className={\`p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-2xl max-w-sm w-full space-y-4 text-white select-none \${className}\`}>
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] shadow-[0_0_8px_${tokens.primary}]" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">{metricTitle}</h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-full border border-emerald-900 bg-emerald-950/80 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{statusLabel}</span>
        </span>
      </div>

      {/* Metric Mode Filter Tabs */}
      <div className="flex items-center gap-1 p-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono">
        {(["uptime", "latency", "budget"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedMetric(tab)}
            className={\`flex-1 py-1 rounded transition-colors uppercase font-medium cursor-pointer \${
              selectedMetric === tab ? "bg-[${tokens.primary}] text-[${tokens.primaryForeground}] font-bold" : "text-zinc-400 hover:text-white"
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Circular Multi-Segment Donut Dial */}
      <div className="flex items-center justify-center py-2">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" stroke="#27272a" strokeWidth="7" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="${tokens.primary}"
              strokeWidth="7"
              strokeDasharray="238.76"
              strokeDashoffset={current.offset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-500"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#10b981"
              strokeWidth="7"
              strokeDasharray="238.76"
              strokeDashoffset="210"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold font-mono tracking-tight text-white leading-none">{current.value}</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">{current.sub}</span>
          </div>
        </div>
      </div>

      {/* 3-Cell Telemetry Stats Grid */}
      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-zinc-850 text-xs font-mono">
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-850">
          <div className="text-[10px] text-zinc-500">24h Average</div>
          <div className="font-semibold text-white mt-0.5">{current.avg}</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-850">
          <div className="text-[10px] text-zinc-500">P99 Latency</div>
          <div className="font-semibold text-white mt-0.5">{current.p99}</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/60 border border-zinc-850">
          <div className="text-[10px] text-zinc-500">Incidents</div>
          <div className="font-semibold text-emerald-400 mt-0.5">0 Active</div>
        </div>
      </div>
    </div>
  );
}

export default TelemetryDonutDial;`;
    },
  },

  "secret-rotation-modal": {
    id: "secret-rotation-modal",
    name: "Automated Secret & Key Rotation",
    category: "forms",
    description: "Automated encryption key and secret rotation manager with dual-key grace periods, rotation schedules, and instant dry-run triggers.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "secretName", label: "Secret Identifier", type: "text", defaultValue: "PROD_PAYMENT_PRIVATE_KEY" },
      { key: "currentVersion", label: "Active Version", type: "text", defaultValue: "v3.1.0" },
      { key: "rotationCycleDays", label: "Rotation Cycle", type: "select", defaultValue: "90", options: ["30", "60", "90", "180"] },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[290px] w-full text-white select-none space-y-3",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-xs font-semibold" }, "Security Policy"),
          React.createElement("span", { className: "text-[10px] font-mono text-zinc-500" }, props.currentVersion || "v3.1.0")
        ),
        React.createElement(
          "div",
          null,
          React.createElement("h4", { className: "text-xs font-mono font-bold text-white truncate" }, props.secretName || "PROD_PAYMENT_PRIVATE_KEY"),
          React.createElement("p", { className: "text-[11px] text-zinc-400 mt-1 leading-snug" }, "Automatic rotation runs every " + (props.rotationCycleDays || "90") + " days with zero downtime dual-key overlap.")
        ),
        React.createElement(
          "div",
          { className: "p-2 rounded-xs bg-zinc-950/80 border border-zinc-800 space-y-1 font-mono text-[10px]" },
          React.createElement("div", { className: "flex justify-between text-zinc-400" },
            React.createElement("span", null, "Dual-Key Grace:"),
            React.createElement("span", { className: "text-emerald-400 font-bold" }, "24 Hours Active")
          ),
          React.createElement("div", { className: "flex justify-between text-zinc-400" },
            React.createElement("span", null, "Next Scheduled:"),
            React.createElement("span", { className: "text-zinc-200" }, "In 14 Days")
          )
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-1.5 px-3 text-xs font-mono font-semibold transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer",
          },
          "Rotate Secret Immediately"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-4 shadow-2xl max-w-[290px] w-full text-white select-none space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-xs font-semibold">
      Security Policy
    </span>
    <span className="text-[10px] font-mono text-zinc-500">${escapeText(props.currentVersion || "v3.1.0")}</span>
  </div>
  <div>
    <h4 className="text-xs font-mono font-bold text-white truncate">${escapeText(props.secretName || "PROD_PAYMENT_PRIVATE_KEY")}</h4>
    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
      Automatic rotation runs every ${escapeText(props.rotationCycleDays || "90")} days with zero downtime dual-key overlap.
    </p>
  </div>
  <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800 space-y-1 font-mono text-[10px]">
    <div className="flex justify-between text-zinc-400">
      <span>Dual-Key Grace:</span>
      <span className="text-emerald-400 font-bold">24 Hours Active</span>
    </div>
    <div className="flex justify-between text-zinc-400">
      <span>Next Scheduled:</span>
      <span className="text-zinc-200">In 14 Days</span>
    </div>
  </div>
  <button className="w-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] py-1.5 px-3 text-xs font-mono font-semibold transition-all hover:opacity-90 active:scale-[0.98]">
    Rotate Secret Immediately
  </button>
</div>`;
    },
  },

  "log-stream-console": {
    id: "log-stream-console",
    name: "Serverless Live Log Streamer",
    category: "components",
    description: "Streaming serverless logs console with real-time log level filtering (INFO, WARN, ERROR), timestamp formatting, and auto-scroll control.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "serviceName", label: "Service Name", type: "text", defaultValue: "api-gateway-edge" },
      { key: "logLevel", label: "Filter Level", type: "select", defaultValue: "all", options: ["all", "info", "warn", "error"] },
      { key: "clusterRegion", label: "Region", type: "text", defaultValue: "us-east-va" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3.5 border shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between border-b border-zinc-800/80 pb-2" },
          React.createElement("div", { className: "flex items-center gap-1.5" },
            React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
            React.createElement("span", { className: "text-xs font-bold text-white" }, props.serviceName || "api-gateway-edge")
          ),
          React.createElement("span", { className: "text-[10px] text-zinc-500" }, props.clusterRegion || "us-east-va")
        ),
        React.createElement(
          "div",
          { className: "space-y-1 text-[10px] bg-zinc-950 p-2 rounded-xs border border-zinc-855/80" },
          React.createElement("div", { className: "flex gap-1.5 text-zinc-400" },
            React.createElement("span", { className: "text-zinc-600 shrink-0" }, "14:22:01"),
            React.createElement("span", { className: "text-emerald-400 shrink-0 font-bold" }, "INFO"),
            React.createElement("span", { className: "truncate text-zinc-300" }, "HTTP 200 GET /v1/tokens 18ms")
          ),
          React.createElement("div", { className: "flex gap-1.5 text-zinc-400" },
            React.createElement("span", { className: "text-zinc-600 shrink-0" }, "14:22:04"),
            React.createElement("span", { className: "text-amber-400 shrink-0 font-bold" }, "WARN"),
            React.createElement("span", { className: "truncate text-zinc-300" }, "High heap allocation 78% limit")
          ),
          React.createElement("div", { className: "flex gap-1.5 text-zinc-400" },
            React.createElement("span", { className: "text-zinc-600 shrink-0" }, "14:22:09"),
            React.createElement("span", { className: "text-emerald-400 shrink-0 font-bold" }, "INFO"),
            React.createElement("span", { className: "truncate text-zinc-300" }, "Worker thread pool scaled to 12")
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[10px] text-zinc-500 pt-1" },
          React.createElement("span", null, "Auto-scroll: Active"),
          React.createElement("span", { className: "text-emerald-400 font-semibold" }, "3 events/sec")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-3.5 shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5">
  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-xs font-bold text-white">${escapeText(props.serviceName || "api-gateway-edge")}</span>
    </div>
    <span className="text-[10px] text-zinc-500">${escapeText(props.clusterRegion || "us-east-va")}</span>
  </div>
  <div className="space-y-1 text-[10px] bg-zinc-950 p-2 rounded border border-zinc-855/80">
    <div className="flex gap-1.5 text-zinc-400">
      <span className="text-zinc-600 shrink-0">14:22:01</span>
      <span className="text-emerald-400 shrink-0 font-bold">INFO</span>
      <span className="truncate text-zinc-300">HTTP 200 GET /v1/tokens 18ms</span>
    </div>
    <div className="flex gap-1.5 text-zinc-400">
      <span className="text-zinc-600 shrink-0">14:22:04</span>
      <span className="text-amber-400 shrink-0 font-bold">WARN</span>
      <span className="truncate text-zinc-300">High heap allocation 78% limit</span>
    </div>
    <div className="flex gap-1.5 text-zinc-400">
      <span className="text-zinc-600 shrink-0">14:22:09</span>
      <span className="text-emerald-400 shrink-0 font-bold">INFO</span>
      <span className="truncate text-zinc-300">Worker thread pool scaled to 12</span>
    </div>
  </div>
  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
    <span>Auto-scroll: Active</span>
    <span className="text-emerald-400 font-semibold">3 events/sec</span>
  </div>
</div>`;
    },
  },

  "feature-flag-matrix": {
    id: "feature-flag-matrix",
    name: "Runtime Feature Flag Controller",
    category: "components",
    description: "Runtime feature flag and graduated rollout controller with percentage-based sliders, environment isolation, and emergency kill-switches.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "flagKey", label: "Flag Identifier", type: "text", defaultValue: "enable_vector_rag_pipeline" },
      { key: "rolloutPercentage", label: "Rollout Percentage", type: "number", defaultValue: 45, min: 0, max: 100 },
      { key: "environment", label: "Target Environment", type: "select", defaultValue: "production", options: ["production", "staging", "development"] },
    ],
    renderComponent: (props, tokens) => {
      const pct = props.rolloutPercentage ?? 45;
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[290px] w-full text-white select-none space-y-3",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-xs font-semibold" }, props.environment || "production"),
          React.createElement("span", { className: "text-[11px] font-mono font-bold text-white" }, pct + "% Live")
        ),
        React.createElement(
          "div",
          null,
          React.createElement("h4", { className: "text-xs font-mono font-bold text-white truncate" }, props.flagKey || "enable_vector_rag_pipeline"),
          React.createElement("div", { className: "w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2.5 border border-zinc-800" },
            React.createElement("div", {
              style: { width: `${pct}%`, backgroundColor: tokens.primary },
              className: "h-full transition-all duration-300",
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[10px] font-mono" },
          React.createElement("span", { className: "text-zinc-400" }, "Target Segments: Beta Users"),
          React.createElement("button", { className: "text-red-400 hover:text-red-300 font-bold cursor-pointer" }, "Kill Switch")
        )
      );
    },
    generateJsx: (props, tokens) => {
      const pct = props.rolloutPercentage ?? 45;
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-4 shadow-2xl max-w-[290px] w-full text-white select-none space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-xs font-semibold">
      ${escapeText(props.environment || "production")}
    </span>
    <span className="text-[11px] font-mono font-bold text-white">${pct}% Live</span>
  </div>
  <div>
    <h4 className="text-xs font-mono font-bold text-white truncate">${escapeText(props.flagKey || "enable_vector_rag_pipeline")}</h4>
    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2.5 border border-zinc-800">
      <div style={{ width: "${pct}%" }} className="h-full bg-[${tokens.primary}] transition-all duration-300" />
    </div>
  </div>
  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[10px] font-mono">
    <span className="text-zinc-400">Target Segments: Beta Users</span>
    <button className="text-red-400 hover:text-red-300 font-bold">Kill Switch</button>
  </div>
</div>`;
    },
  },

  "webhook-event-inspector": {
    id: "webhook-event-inspector",
    name: "Webhook Delivery & Retry Inspector",
    category: "components",
    description: "Webhook event delivery observer with HTTP status badges, payload verification checks, latency timers, and retry controls.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "eventName", label: "Event Type", type: "text", defaultValue: "checkout.session.completed" },
      { key: "httpStatus", label: "HTTP Status", type: "select", defaultValue: "200", options: ["200", "504", "400", "429"] },
      { key: "latencyMs", label: "Delivery Latency", type: "text", defaultValue: "142ms" },
    ],
    renderComponent: (props, tokens) => {
      const isSuccess = (props.httpStatus || "200") === "200";
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3.5 border shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", {
            className: `text-[10px] font-bold px-2 py-0.5 rounded-xs border ${
              isSuccess ? "text-emerald-400 bg-emerald-950/60 border-emerald-800" : "text-rose-400 bg-rose-950/60 border-rose-800"
            }`
          }, (props.httpStatus || "200") + (isSuccess ? " OK" : " ERR")),
          React.createElement("span", { className: "text-[10px] text-zinc-500" }, props.latencyMs || "142ms")
        ),
        React.createElement(
          "div",
          null,
          React.createElement("div", { className: "text-xs font-bold text-white truncate" }, props.eventName || "checkout.session.completed"),
          React.createElement("div", { className: "text-[10px] text-zinc-500 mt-0.5" }, "Signature: sha256_e4f9b2... verified")
        ),
        React.createElement(
          "div",
          { className: "p-2 rounded-xs bg-zinc-950 border border-zinc-850 text-[10px] text-zinc-400 flex items-center justify-between" },
          React.createElement("span", null, "Payload: 1.84 KB JSON"),
          React.createElement("button", {
            style: { color: tokens.primary },
            className: "font-bold hover:underline cursor-pointer",
          }, "Resend Webhook")
        )
      );
    },
    generateJsx: (props, tokens) => {
      const isSuccess = (props.httpStatus || "200") === "200";
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-3.5 shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-bold px-2 py-0.5 rounded ${
      isSuccess ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800" : "text-rose-400 bg-rose-950/60 border-rose-800"
    }">
      ${escapeText(props.httpStatus || "200")}${isSuccess ? " OK" : " ERR"}
    </span>
    <span className="text-[10px] text-zinc-500">${escapeText(props.latencyMs || "142ms")}</span>
  </div>
  <div>
    <div className="text-xs font-bold text-white truncate">${escapeText(props.eventName || "checkout.session.completed")}</div>
    <div className="text-[10px] text-zinc-500 mt-0.5">Signature: sha256_e4f9b2... verified</div>
  </div>
  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 text-[10px] text-zinc-400 flex items-center justify-between">
    <span>Payload: 1.84 KB JSON</span>
    <button className="font-bold text-[${tokens.primary}] hover:underline">Resend Webhook</button>
  </div>
</div>`;
    },
  },

  "query-metrics-analyzer": {
    id: "query-metrics-analyzer",
    name: "Database Query Plan Analyzer",
    category: "components",
    description: "Visual query execution planner with stage breakdown (Index Scan, Hash Join, Sort), latency metrics, cache hit ratio, and optimization hints.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "queryName", label: "Query Identifier", type: "text", defaultValue: "SELECT * FROM workspace_audit_events" },
      { key: "executionTimeMs", label: "Execution Time", type: "text", defaultValue: "3.4ms" },
      { key: "cacheHitRatio", label: "Cache Hit Ratio", type: "text", defaultValue: "98.2%" },
      { key: "rowsScanned", label: "Rows Scanned", type: "text", defaultValue: "1,420" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-3",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between border-b border-zinc-800/80 pb-2" },
          React.createElement("div", { className: "flex items-center gap-1.5" },
            React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
            React.createElement("span", { className: "text-xs font-bold text-white" }, "Query Plan Inspector")
          ),
          React.createElement("span", {
            style: { color: tokens.primary },
            className: "text-[11px] font-bold",
          }, props.executionTimeMs || "3.4ms")
        ),
        React.createElement(
          "div",
          { className: "p-2 rounded-xs bg-zinc-950 border border-zinc-850 text-[11px] truncate text-zinc-300" },
          props.queryName || "SELECT * FROM workspace_audit_events"
        ),
        React.createElement(
          "div",
          { className: "space-y-1.5 text-[10px]" },
          React.createElement("div", { className: "flex items-center justify-between text-zinc-400" },
            React.createElement("span", null, "1. Index Scan on idx_tenant_id"),
            React.createElement("span", { className: "text-emerald-400 font-semibold" }, "0.8ms")
          ),
          React.createElement("div", { className: "w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden" },
            React.createElement("div", { style: { width: "25%", backgroundColor: tokens.primary }, className: "h-full" })
          ),
          React.createElement("div", { className: "flex items-center justify-between text-zinc-400 pt-0.5" },
            React.createElement("span", null, "2. Hash Join on users.id"),
            React.createElement("span", { className: "text-emerald-400 font-semibold" }, "1.9ms")
          ),
          React.createElement("div", { className: "w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden" },
            React.createElement("div", { style: { width: "60%", backgroundColor: tokens.primary }, className: "h-full" })
          )
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 text-[10px]" },
          React.createElement("div", { className: "p-1.5 rounded bg-zinc-950/60 border border-zinc-850" },
            React.createElement("div", { className: "text-zinc-500" }, "Cache Hit Ratio"),
            React.createElement("div", { className: "font-bold text-emerald-400 mt-0.5" }, props.cacheHitRatio || "98.2%")
          ),
          React.createElement("div", { className: "p-1.5 rounded bg-zinc-950/60 border border-zinc-850" },
            React.createElement("div", { className: "text-zinc-500" }, "Rows Scanned"),
            React.createElement("div", { className: "font-bold text-white mt-0.5" }, props.rowsScanned || "1,420")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-4 shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-3">
  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-xs font-bold text-white">Query Plan Inspector</span>
    </div>
    <span className="text-[11px] font-bold text-[${tokens.primary}]">${escapeText(props.executionTimeMs || "3.4ms")}</span>
  </div>
  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 text-[11px] truncate text-zinc-300">
    ${escapeText(props.queryName || "SELECT * FROM workspace_audit_events")}
  </div>
  <div className="space-y-1.5 text-[10px]">
    <div className="flex items-center justify-between text-zinc-400">
      <span>1. Index Scan on idx_tenant_id</span>
      <span className="text-emerald-400 font-semibold">0.8ms</span>
    </div>
    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
      <div style={{ width: "25%" }} className="h-full bg-[${tokens.primary}]" />
    </div>
    <div className="flex items-center justify-between text-zinc-400 pt-0.5">
      <span>2. Hash Join on users.id</span>
      <span className="text-emerald-400 font-semibold">1.9ms</span>
    </div>
    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
      <div style={{ width: "60%" }} className="h-full bg-[${tokens.primary}]" />
    </div>
  </div>
  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 text-[10px]">
    <div className="p-1.5 rounded bg-zinc-950/60 border border-zinc-850">
      <div className="text-zinc-500">Cache Hit Ratio</div>
      <div className="font-bold text-emerald-400 mt-0.5">${escapeText(props.cacheHitRatio || "98.2%")}</div>
    </div>
    <div className="p-1.5 rounded bg-zinc-950/60 border border-zinc-850">
      <div className="text-zinc-500">Rows Scanned</div>
      <div className="font-bold text-white mt-0.5">${escapeText(props.rowsScanned || "1,420")}</div>
    </div>
  </div>
</div>`;
    },
  },

  "event-audit-trail": {
    id: "event-audit-trail",
    name: "Security Audit Trail Ledger",
    category: "components",
    description: "Cryptographically verified security audit trail ledger with actor identity chips, IP addresses, immutable action timestamps, and diff inspection.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "actorName", label: "Actor Name", type: "text", defaultValue: "alex.engineer@acme.corp" },
      { key: "actionType", label: "Action Executed", type: "text", defaultValue: "ROLE_PERMISSION_ELEVATION" },
      { key: "ipAddress", label: "Source IP", type: "text", defaultValue: "192.0.2.45 (US-West)" },
      { key: "status", label: "Audit Status", type: "select", defaultValue: "VERIFIED", options: ["VERIFIED", "FLAGGED", "REVOKED"] },
    ],
    renderComponent: (props, tokens) => {
      const isVerified = (props.status || "VERIFIED") === "VERIFIED";
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", {
            className: `text-[10px] font-bold px-2 py-0.5 rounded-xs border ${
              isVerified ? "text-emerald-400 bg-emerald-950/60 border-emerald-800" : "text-amber-400 bg-amber-950/60 border-amber-800"
            }`
          }, props.status || "VERIFIED"),
          React.createElement("span", { className: "text-[10px] text-zinc-500" }, "Immutable Hash")
        ),
        React.createElement(
          "div",
          null,
          React.createElement("div", { className: "text-xs font-bold text-white truncate" }, props.actionType || "ROLE_PERMISSION_ELEVATION"),
          React.createElement("div", { className: "text-[10px] text-zinc-400 mt-0.5 truncate" }, "Actor: " + (props.actorName || "alex.engineer@acme.corp"))
        ),
        React.createElement(
          "div",
          { className: "p-2 rounded bg-zinc-950 border border-zinc-850 space-y-1 text-[10px]" },
          React.createElement("div", { className: "flex justify-between text-zinc-400" },
            React.createElement("span", null, "Client IP:"),
            React.createElement("span", { className: "text-zinc-200" }, props.ipAddress || "192.0.2.45 (US-West)")
          ),
          React.createElement("div", { className: "flex justify-between text-zinc-400" },
            React.createElement("span", null, "SHA-256:"),
            React.createElement("span", { className: "text-zinc-500 truncate max-w-[130px]" }, "7f8a9e2d4c1b0...")
          )
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-1.5 px-3 text-xs font-semibold hover:opacity-90 transition-all cursor-pointer",
          },
          "Inspect Changeset Diff"
        )
      );
    },
    generateJsx: (props, tokens) => {
      const isVerified = (props.status || "VERIFIED") === "VERIFIED";
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-4 shadow-2xl max-w-[320px] w-full text-white font-mono select-none space-y-2.5">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-bold px-2 py-0.5 rounded ${
      isVerified ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800" : "text-amber-400 bg-amber-950/60 border-amber-800"
    }">
      ${escapeText(props.status || "VERIFIED")}
    </span>
    <span className="text-[10px] text-zinc-500">Immutable Hash</span>
  </div>
  <div>
    <div className="text-xs font-bold text-white truncate">${escapeText(props.actionType || "ROLE_PERMISSION_ELEVATION")}</div>
    <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Actor: ${escapeText(props.actorName || "alex.engineer@acme.corp")}</div>
  </div>
  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 space-y-1 text-[10px]">
    <div className="flex justify-between text-zinc-400">
      <span>Client IP:</span>
      <span className="text-zinc-200">${escapeText(props.ipAddress || "192.0.2.45 (US-West)")}</span>
    </div>
    <div className="flex justify-between text-zinc-400">
      <span>SHA-256:</span>
      <span className="text-zinc-500 truncate max-w-[130px]">7f8a9e2d4c1b0...</span>
    </div>
  </div>
  <button className="w-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] py-1.5 px-3 text-xs font-semibold hover:opacity-90 transition-all">
    Inspect Changeset Diff
  </button>
</div>`;
    },
  },

  "rate-limiter-budget": {
    id: "rate-limiter-budget",
    name: "API Rate Limiter & Token Bucket",
    category: "components",
    description: "Token bucket rate limiter system with visual drain and refill meter, burst capacity limits, remaining quota countdown, and client throttling rules.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "tierName", label: "Rate Limit Tier", type: "text", defaultValue: "Scale Tier (10,000 req/min)" },
      { key: "remainingTokens", label: "Remaining Budget", type: "number", defaultValue: 8420 },
      { key: "totalBucketCapacity", label: "Bucket Capacity", type: "number", defaultValue: 10000 },
      { key: "resetInSeconds", label: "Reset Window", type: "text", defaultValue: "14s" },
    ],
    renderComponent: (props, tokens) => {
      const remaining = props.remainingTokens ?? 8420;
      const total = props.totalBucketCapacity ?? 10000;
      const pct = Math.min(100, Math.round((remaining / total) * 100));
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-2xl max-w-[310px] w-full text-white font-mono select-none space-y-3",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-xs font-semibold" }, "Token Bucket"),
          React.createElement("span", { className: "text-[10px] text-zinc-500" }, "Reset in " + (props.resetInSeconds || "14s"))
        ),
        React.createElement(
          "div",
          null,
          React.createElement("div", { className: "text-xs font-bold text-white truncate" }, props.tierName || "Scale Tier (10,000 req/min)"),
          React.createElement("div", { className: "flex items-baseline justify-between mt-2" },
            React.createElement("span", { className: "text-lg font-bold text-white" }, remaining.toLocaleString()),
            React.createElement("span", { className: "text-xs text-zinc-500" }, "/ " + total.toLocaleString() + " reqs")
          ),
          React.createElement("div", { className: "w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-1 border border-zinc-800" },
            React.createElement("div", {
              style: { width: `${pct}%`, backgroundColor: tokens.primary },
              className: "h-full transition-all duration-300",
            })
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[10px] text-zinc-400" },
          React.createElement("span", null, "Burst Limit: 500 req/sec"),
          React.createElement("span", { className: "text-emerald-400 font-semibold" }, "Status: Optimal")
        )
      );
    },
    generateJsx: (props, tokens) => {
      const remaining = props.remainingTokens ?? 8420;
      const total = props.totalBucketCapacity ?? 10000;
      const pct = Math.min(100, Math.round((remaining / total) * 100));
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-4 shadow-2xl max-w-[310px] w-full text-white font-mono select-none space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-xs font-semibold">
      Token Bucket
    </span>
    <span className="text-[10px] text-zinc-500">Reset in ${escapeText(props.resetInSeconds || "14s")}</span>
  </div>
  <div>
    <div className="text-xs font-bold text-white truncate">${escapeText(props.tierName || "Scale Tier (10,000 req/min)")}</div>
    <div className="flex items-baseline justify-between mt-2">
      <span className="text-lg font-bold text-white">${remaining.toLocaleString()}</span>
      <span className="text-xs text-zinc-500">/ ${total.toLocaleString()} reqs</span>
    </div>
    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-1 border border-zinc-800">
      <div style={{ width: "${pct}%" }} className="h-full bg-[${tokens.primary}] transition-all duration-300" />
    </div>
  </div>
  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[10px] text-zinc-400">
    <span>Burst Limit: 500 req/sec</span>
    <span className="text-emerald-400 font-semibold">Status: Optimal</span>
  </div>
</div>`;
    },
  }
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
