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
  category: "primitives" | "patterns" | "forms" | "navigation";
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
  button: {
    id: "button",
    name: "Primary Action Button",
    category: "primitives",
    description: "High-contrast action button with configurable label, padding, and corner radius.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "label", label: "Button Text", type: "text", defaultValue: "Get Started" },
      { key: "size", label: "Size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"] },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
    renderComponent: (props, tokens) => {
      const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      }[props.size as "sm" | "md" | "lg"] || "px-4 py-2 text-sm";

      return React.createElement(
        "button",
        {
          disabled: props.disabled,
          style: {
            backgroundColor: tokens.primary,
            color: tokens.primaryForeground,
            borderRadius: `${tokens.radius}px`,
          },
          className: `inline-flex items-center justify-center font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses}`,
        },
        props.label || "Get Started"
      );
    },
    generateJsx: (props, tokens) => {
      const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      }[props.size as "sm" | "md" | "lg"] || "px-4 py-2 text-sm";

      return `<button className="bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] ${sizeClasses} inline-flex items-center justify-center font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50">
  ${escapeText(props.label || "Get Started")}
</button>`;
    },
  },

  card: {
    id: "card",
    name: "Elevated Content Card",
    category: "primitives",
    description: "Architectural content container with surface contrast, title, description, and action footer.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Card Title", type: "text", defaultValue: "System Architecture" },
      { key: "description", label: "Description", type: "text", defaultValue: "Modular primitives engineered for high performance." },
      { key: "badgeText", label: "Badge Label", type: "text", defaultValue: "v1.0 Ready" },
      { key: "buttonText", label: "Button Label", type: "text", defaultValue: "Explore Docs" },
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
          className: "p-6 border shadow-sm max-w-sm w-full text-[#fafafa] min-w-0 break-words",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between mb-4" },
          React.createElement(
            "span",
            {
              style: {
                borderRadius: `${tokens.radius}px`,
                color: tokens.primary,
                borderColor: `color-mix(in srgb, ${tokens.primary} 30%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${tokens.primary} 12%, transparent)`,
              },
              className: "text-[11px] font-mono px-2 py-0.5 border font-semibold",
            },
            props.badgeText || "v1.0 Ready"
          )
        ),
        React.createElement("h3", { className: "text-lg font-semibold tracking-tight mb-1.5 break-words" }, props.title || "System Architecture"),
        React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed mb-6 break-words" }, props.description || "Modular primitives engineered for high performance."),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "w-full py-2 px-3 text-xs font-medium hover:opacity-90 transition-all cursor-pointer",
          },
          props.buttonText || "Explore Docs"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-6 shadow-sm max-w-sm w-full text-[#fafafa] min-w-0 break-words">
  <div className="flex items-center justify-between mb-4">
    <span className="text-[11px] font-mono px-2 py-0.5 border border-[${tokens.primary}]/30 bg-[${tokens.primary}]/10 text-[${tokens.primary}] font-semibold rounded-[${tokens.radius}px]">
      ${escapeText(props.badgeText || "v1.0 Ready")}
    </span>
  </div>
  <h3 className="text-lg font-semibold tracking-tight mb-1.5 break-words">${escapeText(props.title || "System Architecture")}</h3>
  <p className="text-xs text-zinc-400 leading-relaxed mb-6 break-words">${escapeText(props.description || "Modular primitives engineered for high performance.")}</p>
  <button className="w-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] py-2 px-3 text-xs font-medium hover:opacity-90 transition-all">
    ${escapeText(props.buttonText || "Explore Docs")}
  </button>
</div>`;
    },
  },

  input: {
    id: "input",
    name: "Form Input Field",
    category: "forms",
    description: "Clean input field with label, placeholder, and focus highlight.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "label", label: "Field Label", type: "text", defaultValue: "Deployment Domain" },
      { key: "placeholder", label: "Placeholder", type: "text", defaultValue: "app.fetch.dev" },
      { key: "helperText", label: "Helper Text", type: "text", defaultValue: "Enter your production hostname." },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        { className: "space-y-1.5 w-full max-w-sm min-w-0" },
        React.createElement("label", { className: "text-xs font-medium text-zinc-300 break-words" }, props.label || "Deployment Domain"),
        React.createElement("input", {
          type: "text",
          placeholder: props.placeholder || "app.fetch.dev",
          readOnly: true,
          style: {
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
            backgroundColor: `${tokens.background}`,
          },
          className: "w-full h-9 px-3 text-xs text-[#fafafa] border focus:outline-none focus:ring-1",
        }),
        props.helperText && React.createElement("p", { className: "text-[11px] text-zinc-500 break-words" }, props.helperText)
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="space-y-1.5 w-full max-w-sm min-w-0">
  <label className="text-xs font-medium text-zinc-300 break-words">${escapeText(props.label || "Deployment Domain")}</label>
  <input
    type="text"
    placeholder="${escapeAttr(props.placeholder || "app.fetch.dev")}"
    className="w-full h-9 px-3 text-xs text-[#fafafa] bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px] focus:outline-none focus:ring-2 focus:ring-[${tokens.primary}]"
  />
  <p className="text-[11px] text-zinc-500 break-words">${escapeText(props.helperText || "")}</p>
</div>`;
    },
  },

  badge: {
    id: "badge",
    name: "Status Indicator Badge",
    category: "primitives",
    description: "Compact tag for status indicators, categories, and version chips.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "label", label: "Badge Label", type: "text", defaultValue: "Operational" },
      { key: "variant", label: "Variant", type: "select", defaultValue: "subtle", options: ["solid", "subtle", "outline"] },
    ],
    renderComponent: (props, tokens) => {
      const variant = props.variant || "subtle";
      const isSolid = variant === "solid";
      const isOutline = variant === "outline";

      const style: React.CSSProperties = {
        borderRadius: `${tokens.radius}px`,
        backgroundColor: isSolid
          ? tokens.primary
          : isOutline
          ? "transparent"
          : `color-mix(in srgb, ${tokens.primary} 12%, transparent)`,
        color: isSolid ? tokens.primaryForeground : isOutline ? "#e4e4e7" : tokens.primary,
        borderColor: isOutline ? tokens.border : isSolid ? "transparent" : `color-mix(in srgb, ${tokens.primary} 25%, transparent)`,
      };

      return React.createElement(
        "span",
        {
          style,
          className: "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold border select-none break-words",
        },
        props.label || "Operational"
      );
    },
    generateJsx: (props, tokens) => {
      const variant = props.variant || "subtle";
      let variantClasses = `bg-[${tokens.primary}]/10 text-[${tokens.primary}] border border-[${tokens.primary}]/20`;

      if (variant === "solid") {
        variantClasses = `bg-[${tokens.primary}] text-[${tokens.primaryForeground}] border-transparent`;
      } else if (variant === "outline") {
        variantClasses = `bg-transparent text-[#e4e4e7] border border-[${tokens.border}]`;
      }

      return `<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-[${tokens.radius}px] ${variantClasses} select-none">
  ${escapeText(props.label || "Operational")}
</span>`;
    },
  },

  "auth-card": {
    id: "auth-card",
    name: "Authentication Card",
    category: "patterns",
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

  "stat-card": {
    id: "stat-card",
    name: "Metric KPI Card",
    category: "patterns",
    description: "Executive metric indicator featuring KPI value, percentage delta, and title.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Metric Title", type: "text", defaultValue: "Monthly Component Invocations" },
      { key: "value", label: "KPI Metric", type: "text", defaultValue: "1,248,390" },
      { key: "delta", label: "Delta Growth", type: "text", defaultValue: "+24.8%" },
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
          className: "p-5 border shadow-sm max-w-sm w-full text-[#fafafa] space-y-3 min-w-0 break-words transition-all duration-200 hover:border-zinc-700 hover:shadow-md",
        },
        React.createElement("div", { className: "flex items-center justify-between min-w-0" },
          React.createElement("span", { className: "text-xs font-medium text-zinc-400 break-words" }, props.title || "Monthly Component Invocations"),
          React.createElement(
            "span",
            {
              style: {
                borderRadius: `${tokens.radius}px`,
                color: tokens.primary,
                backgroundColor: `color-mix(in srgb, ${tokens.primary} 12%, transparent)`,
              },
              className: "text-[11px] font-mono px-2 py-0.5 font-semibold shrink-0 ml-2",
            },
            props.delta || "+24.8%"
          )
        ),
        React.createElement("div", { className: "text-2xl font-bold font-mono tracking-tight break-words" }, props.value || "1,248,390")
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-5 shadow-sm max-w-sm w-full text-[#fafafa] space-y-3 min-w-0 break-words transition-all duration-200 hover:border-zinc-700">
  <div className="flex items-center justify-between min-w-0">
    <span className="text-xs font-medium text-zinc-400 break-words">${escapeText(props.title || "Monthly Component Invocations")}</span>
    <span className="text-[11px] font-mono px-2 py-0.5 rounded-[${tokens.radius}px] bg-[${tokens.primary}]/10 text-[${tokens.primary}] font-semibold shrink-0 ml-2">
      ${escapeText(props.delta || "+24.8%")}
    </span>
  </div>
  <div className="text-2xl font-bold font-mono tracking-tight break-words">${escapeText(props.value || "1,248,390")}</div>
</div>`;
    },
  },

  "bento-card": {
    id: "bento-card",
    name: "Architectural Bento Card",
    category: "patterns",
    description: "Multi-layered feature spotlight container with sub-metrics, status chip, and subtle gradient border.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "tag", label: "Category Tag", type: "text", defaultValue: "Edge Infrastructure" },
      { key: "title", label: "Title", type: "text", defaultValue: "Autonomous CDN Rebalancing" },
      { key: "description", label: "Description", type: "text", defaultValue: "Real-time traffic orchestration routing queries to regional nodes within 12ms." },
      { key: "stat", label: "Stat Highlight", type: "text", defaultValue: "99.99%" },
      { key: "statLabel", label: "Stat Label", type: "text", defaultValue: "Target SLA Uptime" },
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
          className: "p-6 border shadow-lg max-w-sm w-full text-[#fafafa] flex flex-col justify-between space-y-5 transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5 group",
        },
        React.createElement(
          "div",
          { className: "space-y-3" },
          React.createElement(
            "span",
            {
              style: {
                borderRadius: `${tokens.radius}px`,
                color: tokens.primary,
                backgroundColor: `color-mix(in srgb, ${tokens.primary} 12%, transparent)`,
                borderColor: `color-mix(in srgb, ${tokens.primary} 25%, transparent)`,
              },
              className: "inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border font-semibold",
            },
            props.tag || "Edge Infrastructure"
          ),
          React.createElement("h3", { className: "text-base font-semibold tracking-tight text-white group-hover:text-zinc-100" }, props.title || "Autonomous CDN Rebalancing"),
          React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed font-normal" }, props.description || "Real-time traffic orchestration routing queries to regional nodes within 12ms.")
        ),
        React.createElement(
          "div",
          { className: "pt-4 border-t border-zinc-800/80 flex items-baseline justify-between" },
          React.createElement("span", { className: "text-[11px] font-mono text-zinc-500 uppercase tracking-wider" }, props.statLabel || "Target SLA Uptime"),
          React.createElement(
            "span",
            {
              style: { color: tokens.primary },
              className: "text-xl font-bold font-mono tracking-tight",
            },
            props.stat || "99.99%"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-6 shadow-lg max-w-sm w-full text-[#fafafa] flex flex-col justify-between space-y-5 transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5">
  <div className="space-y-3">
    <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-[${tokens.primary}]/25 bg-[${tokens.primary}]/10 text-[${tokens.primary}] font-semibold rounded-[${tokens.radius}px]">
      ${escapeText(props.tag || "Edge Infrastructure")}
    </span>
    <h3 className="text-base font-semibold tracking-tight text-white">${escapeText(props.title || "Autonomous CDN Rebalancing")}</h3>
    <p className="text-xs text-zinc-400 leading-relaxed font-normal">${escapeText(props.description || "Real-time traffic orchestration routing queries to regional nodes within 12ms.")}</p>
  </div>
  <div className="pt-4 border-t border-zinc-800/80 flex items-baseline justify-between">
    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">${escapeText(props.statLabel || "Target SLA Uptime")}</span>
    <span className="text-xl font-bold font-mono tracking-tight text-[${tokens.primary}]">${escapeText(props.stat || "99.99%")}</span>
  </div>
</div>`;
    },
  },

  "pricing-card": {
    id: "pricing-card",
    name: "Tiered Pricing Card",
    category: "patterns",
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

  "notification": {
    id: "notification",
    name: "Interactive Notification Toast",
    category: "primitives",
    description: "Compact floating status toast with active indicator dot, message, and action link.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "message", label: "Toast Message", type: "text", defaultValue: "Deployment successful. Edge nodes synced." },
      { key: "actionLabel", label: "Action Link", type: "text", defaultValue: "View Logs" },
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
          className: "inline-flex items-center gap-3 px-4 py-2.5 border shadow-lg text-xs font-medium text-[#fafafa] max-w-md transition-all duration-200 hover:border-zinc-700",
        },
        React.createElement("span", {
          style: { backgroundColor: tokens.primary },
          className: "w-2 h-2 rounded-full animate-pulse shrink-0",
        }),
        React.createElement("span", { className: "text-zinc-300 font-normal truncate" }, props.message || "Deployment successful. Edge nodes synced."),
        React.createElement(
          "span",
          {
            style: { color: tokens.primary },
            className: "text-[11px] font-mono font-semibold hover:underline shrink-0 cursor-pointer ml-auto",
          },
          props.actionLabel || "View Logs"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg text-xs font-medium text-[#fafafa] max-w-md">
  <span className="w-2 h-2 rounded-full bg-[${tokens.primary}] animate-pulse shrink-0"></span>
  <span className="text-zinc-300 font-normal truncate">${escapeText(props.message || "Deployment successful. Edge nodes synced.")}</span>
  <a href="#" className="text-[11px] font-mono font-semibold text-[${tokens.primary}] hover:underline shrink-0 ml-auto">${escapeText(props.actionLabel || "View Logs")}</a>
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

  "switch": {
    id: "switch",
    name: "Tactile Toggle Switch",
    category: "primitives",
    description: "Fluid state toggle with tactile thumb transition and accompanying label/subtext.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "label", label: "Setting Title", type: "text", defaultValue: "Automatic Token Synchronization" },
      { key: "description", label: "Subtext", type: "text", defaultValue: "Propagate changes instantly across active workspaces." },
      { key: "checked", label: "Initial State (Active)", type: "boolean", defaultValue: true },
    ],
    renderComponent: (props, tokens) => {
      const isChecked = props.checked ?? true;
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xs max-w-sm w-full flex items-center justify-between gap-4 transition-all hover:border-zinc-700",
        },
        React.createElement(
          "div",
          { className: "space-y-0.5" },
          React.createElement("div", { className: "text-xs font-semibold text-white font-mono" }, props.label || "Automatic Token Synchronization"),
          React.createElement("div", { className: "text-[11px] text-zinc-400 leading-tight" }, props.description || "Propagate changes instantly across active workspaces.")
        ),
        React.createElement(
          "div",
          {
            style: {
              backgroundColor: isChecked ? tokens.primary : "#27272a",
              borderRadius: "9999px",
            },
            className: "w-10 h-5.5 p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer relative",
          },
          React.createElement("div", {
            className: `w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              isChecked ? "translate-x-4.5" : "translate-x-0"
            }`,
          })
        )
      );
    },
    generateJsx: (props, tokens) => {
      const isChecked = props.checked ?? true;
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-sm w-full flex items-center justify-between gap-4">
  <div className="space-y-0.5">
    <div className="text-xs font-semibold text-white font-mono">${escapeText(props.label || "Automatic Token Synchronization")}</div>
    <div className="text-[11px] text-zinc-400 leading-tight">${escapeText(props.description || "Propagate changes instantly across active workspaces.")}</div>
  </div>
  <button role="switch" aria-checked="${isChecked}" className="w-10 h-5.5 p-0.5 rounded-full ${isChecked ? `bg-[${tokens.primary}]` : 'bg-zinc-800'} transition-colors duration-200 ease-in-out shrink-0 relative">
    <span className="block w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isChecked ? 'translate-x-4.5' : 'translate-x-0'}"></span>
  </button>
</div>`;
    },
  },

  "tabs": {
    id: "tabs",
    name: "Segmented Tab Bar",
    category: "navigation",
    description: "Tactile pill-based navigation tabs with high-contrast active state and smooth transitions.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "tab1", label: "Tab 1 Label", type: "text", defaultValue: "Overview" },
      { key: "tab2", label: "Tab 2 Label", type: "text", defaultValue: "Analytics" },
      { key: "tab3", label: "Tab 3 Label", type: "text", defaultValue: "Deployments" },
    ],
    renderComponent: (props, tokens) => {
      const tabs = [props.tab1 || "Overview", props.tab2 || "Analytics", props.tab3 || "Deployments"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-1 border inline-flex items-center gap-1 shadow-xs",
        },
        tabs.map((tab, idx) => {
          const isActive = idx === 0;
          return React.createElement(
            "button",
            {
              key: tab,
              style: isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
                  }
                : {
                    borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
                  },
              className: `px-3 py-1.5 text-xs font-medium font-mono transition-all cursor-pointer ${
                isActive ? "shadow-xs" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`,
            },
            tab
          );
        })
      );
    },
    generateJsx: (props, tokens) => {
      const tabs = [props.tab1 || "Overview", props.tab2 || "Analytics", props.tab3 || "Deployments"];
      return `<div className="p-1 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] inline-flex items-center gap-1 shadow-xs">
  <button className="px-3 py-1.5 text-xs font-medium font-mono rounded-[${Math.max(2, tokens.radius - 2)}px] bg-[${tokens.primary}] text-[${tokens.primaryForeground}] shadow-xs">
    ${escapeText(tabs[0])}
  </button>
  <button className="px-3 py-1.5 text-xs font-medium font-mono rounded-[${Math.max(2, tokens.radius - 2)}px] text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all">
    ${escapeText(tabs[1])}
  </button>
  <button className="px-3 py-1.5 text-xs font-medium font-mono rounded-[${Math.max(2, tokens.radius - 2)}px] text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all">
    ${escapeText(tabs[2])}
  </button>
</div>`;
    },
  },
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
