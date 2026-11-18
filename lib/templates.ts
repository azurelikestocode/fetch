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
  button: {
    id: "button",
    name: "Primary Action Button",
    category: "elements",
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
    category: "elements",
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
    category: "elements",
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

  "stat-card": {
    id: "stat-card",
    name: "Metric KPI Card",
    category: "components",
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
    category: "components",
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

  "notification": {
    id: "notification",
    name: "Interactive Notification Toast",
    category: "elements",
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
    category: "elements",
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

  "avatar-stack": {
    id: "avatar-stack",
    name: "Collaborative Avatar Stack",
    category: "elements",
    description: "Overlapping team member avatars with online presence pulse indicator.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "teamName", label: "Team Label", type: "text", defaultValue: "Core Architecture Team" },
      { key: "memberCount", label: "Status Text", type: "text", defaultValue: "4 active contributors" },
      { key: "avatarMode", label: "Avatar Display", type: "select", defaultValue: "images", options: ["images", "initials"] },
      { key: "avatar1", label: "Avatar 1 Image / Initials", type: "text", defaultValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face" },
      { key: "avatar2", label: "Avatar 2 Image / Initials", type: "text", defaultValue: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
      { key: "avatar3", label: "Avatar 3 Image / Initials", type: "text", defaultValue: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" },
      { key: "extraBadge", label: "Overflow Badge", type: "text", defaultValue: "+3" },
    ],
    renderComponent: (props, tokens) => {
      const isImg = props.avatarMode !== "initials";
      const avatars = [
        { url: props.avatar1 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face", initials: "AZ" },
        { url: props.avatar2 || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", initials: "RX" },
        { url: props.avatar3 || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face", initials: "FL" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-xs max-w-sm w-full flex items-center justify-between gap-4",
        },
        React.createElement(
          "div",
          { className: "space-y-0.5" },
          React.createElement("div", { className: "text-xs font-semibold text-white font-mono" }, props.teamName || "Core Architecture Team"),
          React.createElement("div", { className: "text-[11px] text-zinc-400 flex items-center gap-1.5" },
            React.createElement("span", { style: { backgroundColor: tokens.primary }, className: "w-1.5 h-1.5 rounded-full" }),
            props.memberCount || "4 active contributors"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center -space-x-2" },
          avatars.map((item, i) =>
            isImg
              ? React.createElement("img", {
                  key: i,
                  src: item.url,
                  alt: "Avatar",
                  className: "w-7 h-7 rounded-full border-2 border-zinc-950 object-cover shrink-0",
                })
              : React.createElement(
                  "div",
                  {
                    key: i,
                    style: i === 0 ? { backgroundColor: tokens.primary, color: tokens.primaryForeground } : { backgroundColor: "#27272a", color: "#e4e4e7" },
                    className: "w-7 h-7 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
                  },
                  item.initials
                )
          ),
          React.createElement(
            "div",
            {
              className: "w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
            },
            props.extraBadge || "+3"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      const isImg = props.avatarMode !== "initials";
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-sm w-full flex items-center justify-between gap-4">
  <div className="space-y-0.5">
    <div className="text-xs font-semibold text-white font-mono">${escapeText(props.teamName || "Core Architecture Team")}</div>
    <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[${tokens.primary}]"></span>
      ${escapeText(props.memberCount || "4 active contributors")}
    </div>
  </div>
  <div className="flex items-center -space-x-2">
    ${isImg ? `<img src="${escapeAttr(props.avatar1 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face")}" alt="Member 1" className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" />` : `<div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center text-[10px] font-mono font-bold">AZ</div>`}
    ${isImg ? `<img src="${escapeAttr(props.avatar2 || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face")}" alt="Member 2" className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" />` : `<div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold">RX</div>`}
    ${isImg ? `<img src="${escapeAttr(props.avatar3 || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face")}" alt="Member 3" className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover" />` : `<div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold">FL</div>`}
    <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold">${escapeText(props.extraBadge || "+3")}</div>
  </div>
</div>`;
    },
  },

  "accordion": {
    id: "accordion",
    name: "Interactive FAQ Accordion",
    category: "components",
    description: "Expandable content section with chevron rotation and surface accent highlight.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "question", label: "Question Header", type: "text", defaultValue: "How does real-time token synchronization work?" },
      { key: "answer", label: "Expanded Answer", type: "text", defaultValue: "CSS custom variables are injected directly into the component scope, updating immediately without re-rendering or bundle reloads." },
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
          className: "p-4 border shadow-xs max-w-sm w-full space-y-2 text-[#fafafa]",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between cursor-pointer" },
          React.createElement("h4", { className: "text-xs font-semibold tracking-tight" }, props.question || "How does real-time token synchronization work?"),
          React.createElement("span", { style: { color: tokens.primary }, className: "text-xs font-mono font-bold ml-2" }, "▲")
        ),
        React.createElement(
          "p",
          { className: "text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-2" },
          props.answer || "CSS custom variables are injected directly into the component scope, updating immediately without re-rendering or bundle reloads."
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-sm w-full space-y-2 text-[#fafafa]">
  <div className="flex items-center justify-between cursor-pointer">
    <h4 className="text-xs font-semibold tracking-tight">${escapeText(props.question || "How does real-time token synchronization work?")}</h4>
    <span className="text-[${tokens.primary}] text-xs font-mono font-bold ml-2">▲</span>
  </div>
  <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-2">
    ${escapeText(props.answer || "CSS custom variables are injected directly into the component scope, updating immediately.")}
  </p>
</div>`;
    },
  },

  "stat-ring": {
    id: "stat-ring",
    name: "Radial Progress Dial",
    category: "components",
    description: "Circular completion indicator with KPI percentage, status chip, and glowing border.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "metric", label: "Metric Name", type: "text", defaultValue: "Core Web Vitals" },
      { key: "score", label: "Performance Score", type: "text", defaultValue: "98%" },
      { key: "status", label: "Status Badge", type: "text", defaultValue: "Optimal" },
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
          className: "p-5 border shadow-md max-w-sm w-full flex items-center justify-between gap-4 text-[#fafafa]",
        },
        React.createElement(
          "div",
          { className: "space-y-1" },
          React.createElement("div", { className: "text-xs font-semibold" }, props.metric || "Core Web Vitals"),
          React.createElement(
            "span",
            {
              style: {
                borderRadius: `${tokens.radius}px`,
                color: tokens.primary,
                backgroundColor: `color-mix(in srgb, ${tokens.primary} 15%, transparent)`,
              },
              className: "text-[10px] font-mono px-2 py-0.5 font-semibold",
            },
            props.status || "Optimal"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              borderColor: tokens.primary,
              borderRadius: "9999px",
            },
            className: "w-12 h-12 rounded-full border-3 flex items-center justify-center font-mono font-extrabold text-sm shadow-xs shrink-0",
          },
          props.score || "98%"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-sm w-full flex items-center justify-between gap-4 text-[#fafafa]">
  <div className="space-y-1">
    <div className="text-xs font-semibold">${escapeText(props.metric || "Core Web Vitals")}</div>
    <span className="text-[10px] font-mono px-2 py-0.5 font-semibold rounded-[${tokens.radius}px] bg-[${tokens.primary}]/15 text-[${tokens.primary}]">
      ${escapeText(props.status || "Optimal")}
    </span>
  </div>
  <div className="w-12 h-12 rounded-full border-2 border-[${tokens.primary}] flex items-center justify-center font-mono font-extrabold text-sm shrink-0">
    ${escapeText(props.score || "98%")}
  </div>
</div>`;
    },
  },

  "code-terminal": {
    id: "code-terminal",
    name: "Developer Terminal Window",
    category: "components",
    description: "Monospaced code execution frame with macOS traffic light headers and copy trigger.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "filename", label: "File Name", type: "text", defaultValue: "deploy.config.ts" },
      { key: "command", label: "Code Snippet", type: "text", defaultValue: "npx fetch-ui@latest add button" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: "#0d0e12",
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "border shadow-xl max-w-sm w-full overflow-hidden text-xs font-mono",
        },
        React.createElement(
          "div",
          { className: "px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80" },
          React.createElement("div", { className: "flex items-center gap-1.5" },
            React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500/80" }),
            React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-500/80" }),
            React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500/80" })
          ),
          React.createElement("span", { className: "text-[11px] text-zinc-500" }, props.filename || "deploy.config.ts")
        ),
        React.createElement(
          "div",
          { className: "p-4 text-zinc-300 flex items-center gap-2" },
          React.createElement("span", { style: { color: tokens.primary } }, "$"),
          React.createElement("span", { className: "truncate" }, props.command || "npx fetch-ui@latest add button")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="bg-[#0d0e12] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full overflow-hidden text-xs font-mono">
  <div className="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
    </div>
    <span className="text-[11px] text-zinc-500">${escapeText(props.filename || "deploy.config.ts")}</span>
  </div>
  <div className="p-4 text-zinc-300 flex items-center gap-2">
    <span className="text-[${tokens.primary}]">$</span>
    <span className="truncate">${escapeText(props.command || "npx fetch-ui@latest add button")}</span>
  </div>
</div>`;
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

  "testimonial-card": {
    id: "testimonial-card",
    name: "Editorial Quote Testimonial",
    category: "components",
    description: "High-craft user review box with author portrait initials, quote text, and role tag.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "quote", label: "Quote Text", type: "text", defaultValue: "Fetch eliminated token drift across our entire frontend design engineering team." },
      { key: "author", label: "Author Name", type: "text", defaultValue: "Marcus Aurel" },
      { key: "role", label: "Author Role", type: "text", defaultValue: "VP of Product at Hyperlink" },
      { key: "avatarUrl", label: "Author Portrait URL", type: "text", defaultValue: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
    ],
    renderComponent: (props, tokens) => {
      const avatarUrl = props.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face";
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-6 border shadow-lg max-w-sm w-full space-y-4",
        },
        React.createElement("p", { className: "text-xs text-zinc-300 leading-relaxed italic" }, `"${props.quote || "Fetch eliminated token drift across our entire frontend design engineering team."}"`),
        React.createElement(
          "div",
          { className: "flex items-center gap-3 pt-2 border-t border-zinc-800/80" },
          React.createElement("img", {
            src: avatarUrl,
            alt: props.author || "Marcus Aurel",
            className: "w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0",
          }),
          React.createElement(
            "div",
            null,
            React.createElement("div", { className: "text-xs font-semibold text-white" }, props.author || "Marcus Aurel"),
            React.createElement("div", { className: "text-[11px] text-zinc-500 font-mono" }, props.role || "VP of Product at Hyperlink")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-sm w-full space-y-4">
  <p className="text-xs text-zinc-300 leading-relaxed italic">"${escapeText(props.quote || "")}"</p>
  <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/80">
    <div className="w-8 h-8 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-bold text-xs font-mono shrink-0">MA</div>
    <div>
      <div className="text-xs font-semibold text-white">${escapeText(props.author || "Marcus Aurel")}</div>
      <div className="text-[11px] text-zinc-500 font-mono">${escapeText(props.role || "")}</div>
    </div>
  </div>
</div>`;
    },
  },

  "timeline-stepper": {
    id: "timeline-stepper",
    name: "Step-by-Step Timeline",
    category: "components",
    description: "Vertical chronological progression tracker with verified checkmarks and active pulse.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "step1", label: "Step 1", type: "text", defaultValue: "System Initialization" },
      { key: "step2", label: "Step 2", type: "text", defaultValue: "Reactive Token Propagation" },
      { key: "step3", label: "Step 3", type: "text", defaultValue: "Multi-Zone CDN Sync" },
    ],
    renderComponent: (props, tokens) => {
      const steps = [
        { label: props.step1 || "System Initialization", done: true },
        { label: props.step2 || "Reactive Token Propagation", done: true },
        { label: props.step3 || "Multi-Zone CDN Sync", done: false },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-sm max-w-sm w-full space-y-4",
        },
        steps.map((st, i) =>
          React.createElement(
            "div",
            { key: i, className: "flex items-center gap-3 text-xs" },
            React.createElement(
              "div",
              {
                style: st.done
                  ? { backgroundColor: tokens.primary, color: tokens.primaryForeground }
                  : { backgroundColor: "#27272a", color: "#71717a" },
                className: "w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0",
              },
              st.done ? "✓" : String(i + 1)
            ),
            React.createElement("span", { className: st.done ? "text-zinc-200 font-medium" : "text-zinc-500" }, st.label)
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-sm max-w-sm w-full space-y-4">
  <div className="flex items-center gap-3 text-xs">
    <div className="w-5 h-5 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">✓</div>
    <span className="text-zinc-200 font-medium">${escapeText(props.step1 || "System Initialization")}</span>
  </div>
  <div className="flex items-center gap-3 text-xs">
    <div className="w-5 h-5 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">✓</div>
    <span className="text-zinc-200 font-medium">${escapeText(props.step2 || "Reactive Token Propagation")}</span>
  </div>
  <div className="flex items-center gap-3 text-xs">
    <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">3</div>
    <span className="text-zinc-500">${escapeText(props.step3 || "Multi-Zone CDN Sync")}</span>
  </div>
</div>`;
    },
  },

  "newsletter-card": {
    id: "newsletter-card",
    name: "Architectural Newsletter Box",
    category: "forms",
    description: "High-craft inline email subscribe unit with integrated input and submit button.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Header Title", type: "text", defaultValue: "Engineering Dispatch" },
      { key: "buttonText", label: "Button Label", type: "text", defaultValue: "Subscribe" },
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
          className: "p-5 border shadow-lg max-w-[340px] w-full space-y-3.5",
        },
        React.createElement("div", { className: "text-sm font-semibold text-white tracking-tight" }, props.title || "Engineering Dispatch"),
        React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed" }, "Monthly deep dives into design token engines and low-level web performance."),
        React.createElement(
          "div",
          { className: "flex items-center gap-1.5 w-full min-w-0" },
          React.createElement("input", {
            type: "email",
            placeholder: "developer@fetch.dev",
            readOnly: true,
            style: {
              borderRadius: `${tokens.radius}px`,
              borderColor: tokens.border,
              backgroundColor: tokens.background,
            },
            className: "min-w-0 flex-1 h-8 px-2.5 text-xs border text-white focus:outline-none",
          }),
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
                borderRadius: `${tokens.radius}px`,
              },
              className: "h-8 px-3 text-xs font-medium cursor-pointer shrink-0 whitespace-nowrap",
            },
            props.buttonText || "Subscribe"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-sm w-full space-y-4">
  <div className="text-sm font-semibold text-white tracking-tight">${escapeText(props.title || "Engineering Dispatch")}</div>
  <p className="text-xs text-zinc-400 leading-relaxed">Monthly deep dives into design token engines and low-level web performance.</p>
  <div className="flex items-center gap-1.5">
    <input type="email" placeholder="developer@fetch.dev" className="flex-1 h-8 px-2.5 text-xs bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px] text-white" />
    <button className="h-8 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] shrink-0">${escapeText(props.buttonText || "Subscribe")}</button>
  </div>
</div>`;
    },
  },

  "radio-group": {
    id: "radio-group",
    name: "Segmented Radio Tiles",
    category: "forms",
    description: "Clickable option cards with radio selection indicator and badge highlights.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "opt1", label: "Option 1 Title", type: "text", defaultValue: "Serverless Edge" },
      { key: "opt2", label: "Option 2 Title", type: "text", defaultValue: "Dedicated Cluster" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "div",
        { className: "space-y-2 max-w-sm w-full" },
        [
          { title: props.opt1 || "Serverless Edge", sub: "Global sub-15ms execution", active: true },
          { title: props.opt2 || "Dedicated Cluster", sub: "Isolated VPC & reserved CPU", active: false },
        ].map((item, idx) =>
          React.createElement(
            "div",
            {
              key: idx,
              style: {
                backgroundColor: tokens.surface,
                borderColor: item.active ? tokens.primary : tokens.border,
                borderRadius: `${tokens.radius}px`,
              },
              className: `p-3.5 border flex items-center justify-between cursor-pointer transition-colors ${
                item.active ? "ring-1 ring-offset-0" : ""
              }`,
            },
            React.createElement(
              "div",
              { className: "space-y-0.5" },
              React.createElement("div", { className: "text-xs font-semibold text-white font-mono" }, item.title),
              React.createElement("div", { className: "text-[11px] text-zinc-400" }, item.sub)
            ),
            React.createElement(
              "div",
              {
                style: item.active
                  ? { borderColor: tokens.primary }
                  : { borderColor: "#3f3f46" },
                className: "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
              },
              item.active &&
                React.createElement("div", {
                  style: { backgroundColor: tokens.primary },
                  className: "w-2 h-2 rounded-full",
                })
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="space-y-2 max-w-sm w-full">
  <div className="p-3.5 bg-[${tokens.surface}] border border-[${tokens.primary}] rounded-[${tokens.radius}px] flex items-center justify-between ring-1 ring-[${tokens.primary}]">
    <div>
      <div className="text-xs font-semibold text-white font-mono">${escapeText(props.opt1 || "Serverless Edge")}</div>
      <div className="text-[11px] text-zinc-400">Global sub-15ms execution</div>
    </div>
    <div className="w-4 h-4 rounded-full border border-[${tokens.primary}] flex items-center justify-center shrink-0">
      <div className="w-2 h-2 rounded-full bg-[${tokens.primary}]"></div>
    </div>
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

  "profile-card": {
    id: "profile-card",
    name: "Developer Profile Badge",
    category: "components",
    description: "Compact creator passport with avatar, status chip, repository counter, and connect button.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "name", label: "Developer Name", type: "text", defaultValue: "Azure" },
      { key: "handle", label: "GitHub Handle", type: "text", defaultValue: "@azurelikestocode" },
      { key: "bio", label: "Bio Tagline", type: "text", defaultValue: "Building live-configurable UI engines." },
      { key: "avatarUrl", label: "Avatar Image URL", type: "text", defaultValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face" },
    ],
    renderComponent: (props, tokens) => {
      const avatarUrl = props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face";
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
          { className: "flex items-center gap-3" },
          React.createElement("img", {
            src: avatarUrl,
            alt: props.name || "Azure",
            className: "w-10 h-10 rounded-full object-cover border-2 border-zinc-800 shrink-0",
          }),
          React.createElement(
            "div",
            { className: "truncate" },
            React.createElement("div", { className: "text-xs font-bold truncate" }, props.name || "Azure"),
            React.createElement("div", { className: "text-[11px] text-zinc-500 font-mono truncate" }, props.handle || "@azurelikestocode")
          )
        ),
        React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed font-normal" }, props.bio || "Building live-configurable UI engines."),
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
          "Connect on GitHub"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-4 text-white">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-bold font-mono text-sm shrink-0">A</div>
    <div>
      <div className="text-xs font-bold">${escapeText(props.name || "Azure")}</div>
      <div className="text-[11px] text-zinc-500 font-mono">${escapeText(props.handle || "@azurelikestocode")}</div>
    </div>
  </div>
  <p className="text-xs text-zinc-400 leading-relaxed">${escapeText(props.bio || "")}</p>
  <button className="w-full py-1.5 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px]">Connect on GitHub</button>
</div>`;
    },
  },

  "feature-grid": {
    id: "feature-grid",
    name: "Feature Highlights Grid",
    category: "components",
    description: "Responsive 3-card architectural feature grid with badge, header, and icon accents.",
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
        { title: props.card1Title || "Type Safe", desc: props.card1Desc || "100% strict TypeScript types.", tag: "01" },
        { title: props.card2Title || "Zero Runtime", desc: props.card2Desc || "Self-contained Tailwind JSX.", tag: "02" },
        { title: props.card3Title || "Deep Theming", desc: props.card3Desc || "Live token adjustments.", tag: "03" },
      ];
      return React.createElement(
        "div",
        { className: "w-full max-w-xl space-y-4 text-white" },
        React.createElement("div", { className: "text-sm font-bold tracking-tight text-white mb-2" }, props.heading || "Architectural Precision"),
        React.createElement(
          "div",
          { className: "grid grid-cols-1 sm:grid-cols-3 gap-3" },
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
                className: "p-4 border shadow-sm space-y-2 hover:border-zinc-700 transition-colors",
              },
              React.createElement(
                "div",
                {
                  style: { color: tokens.primary },
                  className: "text-[11px] font-mono font-bold",
                },
                c.tag
              ),
              React.createElement("div", { className: "text-xs font-semibold text-white" }, c.title),
              React.createElement("p", { className: "text-[11px] text-zinc-400 leading-relaxed font-normal" }, c.desc)
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="w-full max-w-xl space-y-4 text-white">
  <div className="text-sm font-bold tracking-tight text-white">${escapeText(props.heading || "Architectural Precision")}</div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] space-y-2">
      <div className="text-[11px] font-mono font-bold text-[${tokens.primary}]">01</div>
      <div className="text-xs font-semibold text-white">${escapeText(props.card1Title || "Type Safe")}</div>
      <p className="text-[11px] text-zinc-400 leading-relaxed">${escapeText(props.card1Desc || "100% strict TypeScript types.")}</p>
    </div>
    <div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] space-y-2">
      <div className="text-[11px] font-mono font-bold text-[${tokens.primary}]">02</div>
      <div className="text-xs font-semibold text-white">${escapeText(props.card2Title || "Zero Runtime")}</div>
      <p className="text-[11px] text-zinc-400 leading-relaxed">${escapeText(props.card2Desc || "Self-contained Tailwind JSX.")}</p>
    </div>
    <div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] space-y-2">
      <div className="text-[11px] font-mono font-bold text-[${tokens.primary}]">03</div>
      <div className="text-xs font-semibold text-white">${escapeText(props.card3Title || "Deep Theming")}</div>
      <p className="text-[11px] text-zinc-400 leading-relaxed">${escapeText(props.card3Desc || "Live token adjustments.")}</p>
    </div>
  </div>
</div>`;
    },
  },

  "search-bar-popover": {
    id: "search-bar-popover",
    name: "Spotlight Search Bar",
    category: "navigation",
    description: "Spotlight command search bar with keyboard shortcut tag and instant filter chips.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "placeholder", label: "Search Placeholder", type: "text", defaultValue: "Type a command or search..." },
      { key: "shortcut", label: "Keyboard Badge", type: "text", defaultValue: "⌘K" },
      { key: "tag1", label: "Filter Tag 1", type: "text", defaultValue: "Components" },
      { key: "tag2", label: "Filter Tag 2", type: "text", defaultValue: "Tokens" },
      { key: "tag3", label: "Filter Tag 3", type: "text", defaultValue: "Docs" },
    ],
    renderComponent: (props, tokens) => {
      const tags = [props.tag1 || "Components", props.tag2 || "Tokens", props.tag3 || "Docs"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3 border shadow-2xl max-w-md w-full space-y-2.5 text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950/80 border border-zinc-800/80 rounded-xs" },
          React.createElement("span", { className: "text-zinc-500 text-xs font-mono" }, "⌕"),
          React.createElement("input", {
            type: "text",
            placeholder: props.placeholder || "Type a command or search...",
            className: "flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none min-w-0",
          }),
          React.createElement(
            "span",
            { className: "px-1.5 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xs shrink-0" },
            props.shortcut || "⌘K"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-1.5 pt-1" },
          React.createElement("span", { className: "text-[10px] font-mono text-zinc-500 uppercase mr-1" }, "Jump to:"),
          tags.map((tag, i) =>
            React.createElement(
              "span",
              {
                key: i,
                style: i === 0 ? { backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` } : undefined,
                className: `px-2 py-0.5 text-[10px] font-mono rounded-xs border cursor-pointer transition-colors ${i !== 0 ? "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white" : ""}`,
              },
              tag
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-2xl max-w-md w-full space-y-2.5 text-white">
  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-[${tokens.radius}px]">
    <span className="text-zinc-500 text-xs font-mono">⌕</span>
    <input type="text" placeholder="${escapeAttr(props.placeholder || "Type a command or search...")}" className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none min-w-0" />
    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xs">${escapeText(props.shortcut || "⌘K")}</span>
  </div>
  <div className="flex items-center gap-1.5 pt-1">
    <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Jump to:</span>
    <span className="px-2 py-0.5 text-[10px] font-mono rounded-xs border bg-[${tokens.primary}]/10 text-[${tokens.primary}] border-[${tokens.primary}]/30">${escapeText(props.tag1 || "Components")}</span>
    <span className="px-2 py-0.5 text-[10px] font-mono rounded-xs border border-zinc-800 bg-zinc-900 text-zinc-400">${escapeText(props.tag2 || "Tokens")}</span>
    <span className="px-2 py-0.5 text-[10px] font-mono rounded-xs border border-zinc-800 bg-zinc-900 text-zinc-400">${escapeText(props.tag3 || "Docs")}</span>
  </div>
</div>`;
    },
  },

  "ai-chat-bubble": {
    id: "ai-chat-bubble",
    name: "AI Copilot Response Bubble",
    category: "components",
    description: "Interactive conversational assistant message with model badge, syntax-highlighted code block, token counter, and helpfulness feedback.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "modelName", label: "Model Identifier", type: "text", defaultValue: "Claude 3.7 Sonnet" },
      { key: "tokenCount", label: "Token KPI", type: "text", defaultValue: "342 tokens" },
      { key: "latency", label: "Response Latency", type: "text", defaultValue: "840ms" },
      { key: "responseText", label: "Response Snippet", type: "text", defaultValue: "Here is your optimized database query:" },
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
            React.createElement(
              "div",
              {
                style: { backgroundColor: tokens.primary, color: tokens.primaryForeground },
                className: "w-6 h-6 rounded-xs flex items-center justify-center font-mono text-[10px] font-bold shadow-xs",
              },
              "AI"
            ),
            React.createElement("span", { className: "text-xs font-semibold text-zinc-100 font-mono" }, props.modelName || "Claude 3.7 Sonnet")
          ),
          React.createElement(
            "span",
            { className: "text-[10px] font-mono text-zinc-500" },
            `${props.tokenCount || "342 tokens"} • ${props.latency || "840ms"}`
          )
        ),
        React.createElement("p", { className: "text-xs text-zinc-300 leading-relaxed font-sans" }, props.responseText || "Here is your optimized database query:"),
        React.createElement(
          "div",
          { className: "p-2.5 rounded-xs bg-zinc-950 border border-zinc-850 font-mono text-[11px] text-zinc-300 overflow-hidden space-y-1" },
          React.createElement("div", { className: "text-[10px] text-zinc-500 uppercase tracking-wider" }, "SQL"),
          React.createElement("div", { className: "text-emerald-400 truncate" }, "SELECT id, p99_latency"),
          React.createElement("div", { className: "text-indigo-400 truncate" }, "FROM telemetry_logs WHERE ok = true;")
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1" },
          React.createElement("span", null, "Helpful response?"),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement("button", { className: "hover:text-white cursor-pointer" }, "👍 Yes"),
            React.createElement("button", { className: "hover:text-white cursor-pointer" }, "👎 No")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3 text-white">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-xs bg-[${tokens.primary}] text-[${tokens.primaryForeground}] flex items-center justify-center font-mono text-[10px] font-bold">AI</div>
      <span className="text-xs font-semibold text-zinc-100 font-mono">${escapeText(props.modelName || "Claude 3.7 Sonnet")}</span>
    </div>
    <span className="text-[10px] font-mono text-zinc-500">${escapeText(props.tokenCount || "342 tokens")} • ${escapeText(props.latency || "840ms")}</span>
  </div>
  <p className="text-xs text-zinc-300 leading-relaxed">${escapeText(props.responseText || "Here is your optimized database query:")}</p>
  <div className="p-2.5 rounded-xs bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300">
    <div className="text-[10px] text-zinc-500 uppercase">SQL</div>
    <div className="text-emerald-400">SELECT id, p99_latency</div>
    <div className="text-indigo-400">FROM telemetry_logs WHERE ok = true;</div>
  </div>
</div>`;
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
            background: `linear-gradient(135deg, ${tokens.surface} 0%, color-mix(in srgb, ${tokens.primary} 20%, #09090b) 100%)`,
          },
          className: "p-5 border shadow-2xl max-w-sm w-full space-y-5 text-white select-none relative overflow-hidden",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-[10px] font-mono uppercase tracking-widest text-zinc-400" }, props.cardTier || "Platinum Fleet"),
          React.createElement(
            "span",
            { style: { color: tokens.primary }, className: "font-mono font-bold text-sm tracking-tighter" },
            "FETCH"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-3" },
          React.createElement("div", { className: "w-8 h-6 rounded-xs bg-amber-400/80 border border-amber-300 flex items-center justify-center text-[9px] font-bold text-zinc-950" }, "CHIP"),
          React.createElement("span", { className: "text-zinc-500 font-mono text-xs" }, "))))")
        ),
        React.createElement(
          "div",
          { className: "font-mono text-sm tracking-widest text-zinc-200" },
          `•••• •••• •••• ${props.lastFour || "8842"}`
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[10px] font-mono pt-1 text-zinc-400" },
          React.createElement("div", null,
            React.createElement("div", { className: "text-[8px] text-zinc-500 uppercase" }, "Cardholder"),
            React.createElement("div", { className: "font-semibold text-zinc-200" }, props.cardHolder || "AZURE ARCHITECT")
          ),
          React.createElement("div", { className: "text-right" },
            React.createElement("div", { className: "text-[8px] text-zinc-500 uppercase" }, "Expires"),
            React.createElement("div", { className: "font-semibold text-zinc-200" }, props.expiry || "09/29")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${Math.max(tokens.radius, 14)}px] shadow-2xl max-w-sm w-full space-y-5 text-white">
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">${escapeText(props.cardTier || "Platinum Fleet")}</span>
    <span className="font-mono font-bold text-sm text-[${tokens.primary}]">FETCH</span>
  </div>
  <div className="flex items-center gap-3">
    <div className="w-8 h-6 rounded-xs bg-amber-400/80 border border-amber-300 text-[9px] font-bold text-zinc-950 flex items-center justify-center">CHIP</div>
    <span className="text-zinc-500 font-mono text-xs">))))</span>
  </div>
  <div className="font-mono text-sm tracking-widest text-zinc-200">• • • •  • • • •  • • • •  ${escapeText(props.lastFour || "8842")}</div>
  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
    <div>
      <div className="text-[8px] text-zinc-500 uppercase">Cardholder</div>
      <div className="font-semibold text-zinc-200">${escapeText(props.cardHolder || "AZURE ARCHITECT")}</div>
    </div>
    <div className="text-right">
      <div className="text-[8px] text-zinc-500 uppercase">Expires</div>
      <div className="font-semibold text-zinc-200">${escapeText(props.expiry || "09/29")}</div>
    </div>
  </div>
</div>`;
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
          },
          className: "p-4 border shadow-xl max-w-md w-full space-y-2.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse" }),
            React.createElement("span", { className: "text-xs font-semibold text-white font-mono" }, props.serviceName || "Edge Compute & CDN")
          ),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 text-[9px] font-mono rounded-full border border-amber-900 bg-amber-950/60 text-amber-400 font-bold" },
            props.statusText || "Partial Degradation"
          )
        ),
        React.createElement(
          "p",
          { className: "text-xs text-zinc-300 font-normal leading-relaxed" },
          "Engineering team is investigating elevated latency across US-East edge nodes. Auto-failover routes deployed."
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-850" },
          React.createElement("span", null, `Ticket: ${props.incidentId || "INC-4091"} • ${props.updateTime || "4 mins ago"}`),
          React.createElement("span", { style: { color: tokens.primary }, className: "hover:underline cursor-pointer" }, "Status Page →")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full space-y-2.5 text-white">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      <span className="text-xs font-semibold text-white font-mono">${escapeText(props.serviceName || "Edge Compute & CDN")}</span>
    </div>
    <span className="px-2 py-0.5 text-[9px] font-mono rounded-full border border-amber-900 bg-amber-950/60 text-amber-400 font-bold">${escapeText(props.statusText || "Partial Degradation")}</span>
  </div>
  <p className="text-xs text-zinc-300">Engineering team is investigating elevated latency across US-East edge nodes.</p>
  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-800">
    <span>Ticket: ${escapeText(props.incidentId || "INC-4091")}</span>
    <span className="text-[${tokens.primary}] cursor-pointer">Status Page →</span>
  </div>
</div>`;
    },
  },

  "model-picker-popover": {
    id: "model-picker-popover",
    name: "LLM Model & Provider Selector",
    category: "forms",
    description: "AI model selector dropdown menu highlighting parameter size, speed benchmark, 1M context badge, and API pricing tier.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "selectedModel", label: "Active Model", type: "text", defaultValue: "Gemini 2.5 Pro" },
      { key: "contextWindow", label: "Context Window", type: "text", defaultValue: "2M Context" },
      { key: "latencyRating", label: "Speed Tier", type: "text", defaultValue: "Ultra Fast" },
    ],
    renderComponent: (props, tokens) => {
      const models = [
        { name: "Gemini 2.5 Pro", desc: "Multimodal reasoning & tools", active: true, badge: "2M" },
        { name: "Claude 3.7 Sonnet", desc: "Deep code analysis & architecture", active: false, badge: "200k" },
        { name: "GPT-4o Omnimodal", desc: "Low latency audio/text pipeline", active: false, badge: "128k" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3 border shadow-2xl max-w-sm w-full space-y-1.5 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "px-2 py-1 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider" },
          React.createElement("span", null, "Select LLM Provider"),
          React.createElement("span", { style: { color: tokens.primary } }, props.contextWindow || "2M Context")
        ),
        models.map((m) =>
          React.createElement(
            "div",
            {
              key: m.name,
              style: m.active
                ? { backgroundColor: `${tokens.primary}18`, borderColor: `${tokens.primary}40` }
                : undefined,
              className: `p-2 rounded-xs border transition-colors cursor-pointer flex items-center justify-between ${
                m.active ? "text-white" : "border-transparent hover:bg-zinc-900/60 text-zinc-300"
              }`,
            },
            React.createElement(
              "div",
              { className: "min-w-0" },
              React.createElement("div", { className: "text-xs font-semibold flex items-center gap-1.5" },
                m.name,
                m.active && React.createElement("span", { style: { backgroundColor: tokens.primary }, className: "w-1.5 h-1.5 rounded-full" })
              ),
              React.createElement("div", { className: "text-[10px] text-zinc-500 font-mono" }, m.desc)
            ),
            React.createElement(
              "span",
              { className: "px-1.5 py-0.5 text-[9px] font-mono border border-zinc-800 rounded bg-zinc-950 text-zinc-400 shrink-0" },
              m.badge
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-2xl max-w-sm w-full space-y-1.5 text-white">
  <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
    <span>Select LLM Provider</span>
    <span className="text-[${tokens.primary}]">${escapeText(props.contextWindow || "2M Context")}</span>
  </div>
  <div className="p-2 rounded-xs border border-[${tokens.primary}]/40 bg-[${tokens.primary}]/10 flex items-center justify-between text-white">
    <div>
      <div className="text-xs font-semibold flex items-center gap-1.5">${escapeText(props.selectedModel || "Gemini 2.5 Pro")} <span className="w-1.5 h-1.5 rounded-full bg-[${tokens.primary}]" /></div>
      <div className="text-[10px] text-zinc-500 font-mono">Multimodal reasoning & tools</div>
    </div>
    <span className="px-1.5 py-0.5 text-[9px] font-mono border border-zinc-800 rounded bg-zinc-950 text-zinc-400">2M</span>
  </div>
</div>`;
    },
  },

  "activity-feed": {
    id: "activity-feed",
    name: "Audit Activity Stream",
    category: "components",
    description: "Chronological event log stream with actor chip, event badge, and timestamp.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Feed Title", type: "text", defaultValue: "System Activity" },
      { key: "event1", label: "Event 1", type: "text", defaultValue: "Production release v2.0 deployed" },
      { key: "actor1", label: "Actor 1", type: "text", defaultValue: "alex@fetch.dev" },
      { key: "event2", label: "Event 2", type: "text", defaultValue: "Updated color tokens in Studio" },
      { key: "actor2", label: "Actor 2", type: "text", defaultValue: "sarah@fetch.dev" },
      { key: "event3", label: "Event 3", type: "text", defaultValue: "Ran Vitest 26-test suite" },
      { key: "actor3", label: "Actor 3", type: "text", defaultValue: "ci-bot" },
    ],
    renderComponent: (props, tokens) => {
      const events = [
        { desc: props.event1 || "Production release deployed", actor: props.actor1 || "alex@fetch.dev", time: "2m ago" },
        { desc: props.event2 || "Updated tokens in Studio", actor: props.actor2 || "sarah@fetch.dev", time: "14m ago" },
        { desc: props.event3 || "Ran test suite", actor: props.actor3 || "ci-bot", time: "1h ago" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-xl max-w-md w-full space-y-4 text-white",
        },
        React.createElement("div", { className: "text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider" }, props.title || "System Activity"),
        React.createElement(
          "div",
          { className: "divide-y divide-zinc-850" },
          events.map((e, idx) =>
            React.createElement(
              "div",
              { key: idx, className: "py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs" },
              React.createElement(
                "div",
                { className: "space-y-0.5 truncate" },
                React.createElement("div", { className: "text-white font-medium truncate" }, e.desc),
                React.createElement("div", { className: "text-[11px] font-mono text-zinc-500 truncate" }, e.actor)
              ),
              React.createElement(
                "span",
                {
                  style: idx === 0 ? { color: tokens.primary } : undefined,
                  className: "text-[10px] font-mono text-zinc-500 shrink-0",
                },
                e.time
              )
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-md w-full space-y-4 text-white">
  <div className="text-xs font-mono font-bold text-zinc-400 uppercase">${escapeText(props.title || "System Activity")}</div>
  <div className="divide-y divide-zinc-800">
    <div className="py-2.5 flex items-start justify-between gap-3 text-xs">
      <div>
        <div className="text-white font-medium">${escapeText(props.event1 || "Production release deployed")}</div>
        <div className="text-[11px] font-mono text-zinc-500">${escapeText(props.actor1 || "alex@fetch.dev")}</div>
      </div>
      <span className="text-[10px] font-mono text-[${tokens.primary}]">2m ago</span>
    </div>
  </div>
</div>`;
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
        { initials: "AZ", bg: tokens.primary, name: "Azure" },
        { initials: "FL", bg: "#10b981", name: "Felix" },
        { initials: "RX", bg: "#f59e0b", name: "Rachel" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-3 border shadow-lg max-w-sm w-full flex items-center justify-between gap-3 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center -space-x-2 shrink-0" },
          users.map((u, i) =>
            React.createElement(
              "div",
              {
                key: i,
                style: { backgroundColor: u.bg },
                className: "w-7 h-7 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-xs",
              },
              u.initials
            )
          ),
          React.createElement(
            "div",
            { className: "w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-850 text-zinc-300 flex items-center justify-center text-[10px] font-mono font-bold" },
            "+2"
          )
        ),
        React.createElement(
          "div",
          { className: "flex-1 text-right" },
          React.createElement("div", { className: "text-xs font-semibold text-zinc-200" }, props.activeCount || "4 online"),
          React.createElement(
            "div",
            { className: "text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1" },
            React.createElement("span", { className: "w-1 h-1 rounded-full bg-emerald-400 animate-pulse" }),
            props.statusNote || "Live Multiplayer"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-sm w-full flex items-center justify-between gap-3 text-white">
  <div className="flex items-center -space-x-2 shrink-0">
    <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-[${tokens.primary}] text-white flex items-center justify-center text-[10px] font-mono font-bold">AZ</div>
    <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-emerald-500 text-white flex items-center justify-center text-[10px] font-mono font-bold">FL</div>
    <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px] font-mono font-bold">+2</div>
  </div>
  <div className="text-right">
    <div className="text-xs font-semibold text-zinc-200">${escapeText(props.activeCount || "4 online")}</div>
    <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1">
      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
      ${escapeText(props.statusNote || "Live Multiplayer")}
    </div>
  </div>
</div>`;
    },
  },

  "modal-dialog": {
    id: "modal-dialog",
    name: "Confirmation Action Dialog",
    category: "components",
    description: "Centered confirmation modal card with title, warning body, and action buttons.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Dialog Title", type: "text", defaultValue: "Revoke API Secret" },
      { key: "message", label: "Warning Message", type: "text", defaultValue: "This action cannot be undone. Active clients using this key will immediately receive 401 Unauthorized." },
      { key: "confirmText", label: "Confirm Button", type: "text", defaultValue: "Revoke Secret" },
      { key: "cancelText", label: "Cancel Button", type: "text", defaultValue: "Keep Active" },
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
          className: "p-6 border shadow-2xl max-w-md w-full space-y-4 text-white",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold" },
          React.createElement("span", { className: "px-1.5 py-0.5 rounded-xs bg-rose-500/10 border border-rose-500/30" }, "⚠ DESTRUCTIVE"),
          React.createElement("span", { className: "text-zinc-500" }, "ID: sec_98x1")
        ),
        React.createElement("h3", { className: "text-sm font-bold text-white tracking-tight" }, props.title || "Revoke API Secret"),
        React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed font-normal" }, props.message || "This action cannot be undone."),
        React.createElement(
          "div",
          { className: "flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80" },
          React.createElement(
            "button",
            {
              className: "px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-xs border border-zinc-800 hover:bg-zinc-900 transition-colors cursor-pointer",
            },
            props.cancelText || "Keep Active"
          ),
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
                borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
              },
              className: "px-3 py-1.5 text-xs font-semibold rounded-xs cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]",
            },
            props.confirmText || "Revoke Secret"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-2xl max-w-md w-full space-y-4 text-white">
  <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold">
    <span className="px-1.5 py-0.5 rounded-xs bg-rose-500/10 border border-rose-500/30">⚠ DESTRUCTIVE</span>
  </div>
  <h3 className="text-sm font-bold text-white tracking-tight">${escapeText(props.title || "Revoke API Secret")}</h3>
  <p className="text-xs text-zinc-400 leading-relaxed">${escapeText(props.message || "This action cannot be undone.")}</p>
  <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
    <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white border border-zinc-800 rounded-xs">${escapeText(props.cancelText || "Keep Active")}</button>
    <button className="px-3 py-1.5 text-xs font-semibold bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-xs">${escapeText(props.confirmText || "Revoke Secret")}</button>
  </div>
</div>`;
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
          { className: "relative min-h-[44px] flex items-center" },
          React.createElement(
            "p",
            { className: "text-xs text-zinc-400 font-sans leading-relaxed select-none" },
            props.placeholder || "Ask anything, brainstorm code, or paste diff..."
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
  <div className="min-h-[44px] flex items-center">
    <p className="text-xs text-zinc-400 font-sans leading-relaxed">${escapeText(props.placeholder || "Ask anything, brainstorm code, or paste diff...")}</p>
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
          className: "p-5 border shadow-xl max-w-sm w-full space-y-4 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement("span", { className: "text-xs font-mono uppercase tracking-wider text-zinc-400" }, props.metricTitle || "Uptime SLA Target"),
          React.createElement(
            "span",
            { className: "px-2 py-0.5 rounded-xs border border-emerald-900 bg-emerald-950/80 text-[10px] font-mono text-emerald-400" },
            props.statusLabel || "Optimal"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center justify-center py-2" },
          React.createElement(
            "div",
            { className: "relative w-28 h-28 flex items-center justify-center" },
            React.createElement(
              "svg",
              { className: "w-full h-full -rotate-90", viewBox: "0 0 100 100" },
              React.createElement("circle", { cx: "50", cy: "50", r: "40", stroke: "#27272a", strokeWidth: "8", fill: "none" }),
              React.createElement("circle", {
                cx: "50",
                cy: "50",
                r: "40",
                stroke: tokens.primary,
                strokeWidth: "8",
                strokeDasharray: "251.2",
                strokeDashoffset: "30",
                strokeLinecap: "round",
                fill: "none",
              })
            ),
            React.createElement(
              "div",
              { className: "absolute flex flex-col items-center justify-center text-center" },
              React.createElement("span", { className: "text-base font-bold font-mono tracking-tight" }, props.kpiValue || "99.98%"),
              React.createElement("span", { className: "text-[9px] font-mono text-zinc-500 uppercase" }, "SLA Rate")
            )
          )
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-3 gap-2 text-center pt-2 border-t border-zinc-850 text-[10px] font-mono" },
          React.createElement("div", null,
            React.createElement("div", { className: "text-zinc-500" }, "24h Avg"),
            React.createElement("div", { className: "font-semibold text-white" }, "99.99%")
          ),
          React.createElement("div", null,
            React.createElement("div", { className: "text-zinc-500" }, "P99 Latency"),
            React.createElement("div", { className: "font-semibold text-white" }, "14ms")
          ),
          React.createElement("div", null,
            React.createElement("div", { className: "text-zinc-500" }, "Incidents"),
            React.createElement("div", { className: "font-semibold text-emerald-400" }, "0")
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-4 text-white">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">${escapeText(props.metricTitle || "Uptime SLA Target")}</span>
    <span className="px-2 py-0.5 rounded-xs border border-emerald-900 bg-emerald-950/80 text-[10px] font-mono text-emerald-400">${escapeText(props.statusLabel || "Optimal")}</span>
  </div>
  <div className="flex items-center justify-center py-2">
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#27272a" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="${tokens.primary}" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="30" strokeLinecap="round" fill="none" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-base font-bold font-mono">${escapeText(props.kpiValue || "99.98%")}</span>
        <span className="text-[9px] font-mono text-zinc-500 uppercase">SLA Rate</span>
      </div>
    </div>
  </div>
</div>`;
    },
  },
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
