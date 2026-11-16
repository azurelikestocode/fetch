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

  "breadcrumbs": {
    id: "breadcrumbs",
    name: "Architectural Breadcrumb Trail",
    category: "navigation",
    description: "Hairline path navigation bar with active route highlight and slash separators.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "root", label: "Root Level", type: "text", defaultValue: "Platform" },
      { key: "section", label: "Section", type: "text", defaultValue: "Workspaces" },
      { key: "page", label: "Active Page", type: "text", defaultValue: "Customizer Studio" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(
        "nav",
        {
          style: {
            borderRadius: `${tokens.radius}px`,
            borderColor: tokens.border,
            backgroundColor: tokens.surface,
          },
          className: "px-3 py-2 border inline-flex items-center gap-2 text-xs font-mono shadow-xs",
        },
        React.createElement("span", { className: "text-zinc-500 hover:text-zinc-300 cursor-pointer" }, props.root || "Platform"),
        React.createElement("span", { className: "text-zinc-700" }, "/"),
        React.createElement("span", { className: "text-zinc-500 hover:text-zinc-300 cursor-pointer" }, props.section || "Workspaces"),
        React.createElement("span", { className: "text-zinc-700" }, "/"),
        React.createElement("span", { style: { color: tokens.primary }, className: "font-semibold" }, props.page || "Customizer Studio")
      );
    },
    generateJsx: (props, tokens) => {
      return `<nav className="px-3 py-2 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] inline-flex items-center gap-2 text-xs font-mono shadow-xs">
  <span className="text-zinc-500">${escapeText(props.root || "Platform")}</span>
  <span className="text-zinc-700">/</span>
  <span className="text-zinc-500">${escapeText(props.section || "Workspaces")}</span>
  <span className="text-zinc-700">/</span>
  <span className="text-[${tokens.primary}] font-semibold">${escapeText(props.page || "Customizer Studio")}</span>
</nav>`;
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

  "rating-widget": {
    id: "rating-widget",
    name: "Interactive Feedback Rating",
    category: "forms",
    description: "Compact feedback widget with 5-star rating selection, comment input, and submit trigger.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Widget Title", type: "text", defaultValue: "How was your experience?" },
      { key: "subtitle", label: "Subtitle", type: "text", defaultValue: "Your feedback helps shape our product roadmap." },
      { key: "rating", label: "Default Star Rating", type: "select", defaultValue: "5", options: ["1", "2", "3", "4", "5"] },
      { key: "buttonText", label: "Button Text", type: "text", defaultValue: "Submit Feedback" },
    ],
    renderComponent: (props, tokens) => {
      const rating = parseInt(props.rating || "5", 10);
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-xl max-w-sm w-full space-y-3.5 text-white",
        },
        React.createElement("div", { className: "text-xs font-bold text-white" }, props.title || "How was your experience?"),
        React.createElement("p", { className: "text-[11px] text-zinc-400 leading-relaxed font-normal" }, props.subtitle || "Your feedback helps shape our product roadmap."),
        React.createElement(
          "div",
          { className: "flex items-center gap-1.5 py-1" },
          [1, 2, 3, 4, 5].map((star) =>
            React.createElement(
              "span",
              {
                key: star,
                style: { color: star <= rating ? tokens.primary : "#52525b" },
                className: "text-base cursor-pointer select-none",
              },
              "★"
            )
          )
        ),
        React.createElement("input", {
          type: "text",
          placeholder: "Share optional details...",
          className: "w-full px-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500",
        }),
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
          props.buttonText || "Submit Feedback"
        )
      );
    },
    generateJsx: (props, tokens) => {
      const rating = parseInt(props.rating || "5", 10);
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3.5 text-white">
  <div className="text-xs font-bold text-white">${escapeText(props.title || "How was your experience?")}</div>
  <p className="text-[11px] text-zinc-400 leading-relaxed">${escapeText(props.subtitle || "Your feedback helps shape our product roadmap.")}</p>
  <div className="flex items-center gap-1.5 py-1">
    ${[1, 2, 3, 4, 5].map(star => `<span className="text-base cursor-pointer ${star <= rating ? `text-[${tokens.primary}]` : 'text-zinc-600'}">★</span>`).join("\n    ")}
  </div>
  <input type="text" placeholder="Share optional details..." className="w-full px-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-[${tokens.radius}px] text-white placeholder-zinc-500 focus:outline-none" />
  <button className="w-full py-1.5 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px]">${escapeText(props.buttonText || "Submit Feedback")}</button>
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

  "segment-picker": {
    id: "segment-picker",
    name: "Segmented Control Pills",
    category: "elements",
    description: "Multi-option segmented button group with active surface indicator.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "activeOption", label: "Active Option", type: "select", defaultValue: "Monthly", options: ["Monthly", "Quarterly", "Yearly", "Lifetime"] },
      { key: "option1", label: "Option 1", type: "text", defaultValue: "Monthly" },
      { key: "option2", label: "Option 2", type: "text", defaultValue: "Quarterly" },
      { key: "option3", label: "Option 3", type: "text", defaultValue: "Yearly" },
      { key: "option4", label: "Option 4", type: "text", defaultValue: "Lifetime" },
    ],
    renderComponent: (props, tokens) => {
      const active = props.activeOption || "Monthly";
      const options = [props.option1 || "Monthly", props.option2 || "Quarterly", props.option3 || "Yearly", props.option4 || "Lifetime"];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-1.5 border inline-flex items-center gap-1 shadow-md select-none",
        },
        options.map((opt) => {
          const isActive = opt.toLowerCase() === active.toLowerCase();
          return React.createElement(
            "button",
            {
              key: opt,
              style: isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
                  }
                : undefined,
              className: `px-3 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                isActive ? "shadow-sm font-semibold" : "text-zinc-400 hover:text-white"
              }`,
            },
            opt
          );
        })
      );
    },
    generateJsx: (props, tokens) => {
      const active = props.activeOption || "Monthly";
      const options = [props.option1 || "Monthly", props.option2 || "Quarterly", props.option3 || "Yearly", props.option4 || "Lifetime"];
      return `<div className="p-1.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] inline-flex items-center gap-1 shadow-md">
  ${options.map(opt => {
    const isActive = opt.toLowerCase() === active.toLowerCase();
    return `<button className="px-3 py-1.5 text-xs font-medium ${isActive ? `bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${Math.max(0, tokens.radius - 2)}px] shadow-sm font-semibold` : 'text-zinc-400 hover:text-white'}">${escapeText(opt)}</button>`;
  }).join("\n  ")}
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

  "banner-alert": {
    id: "banner-alert",
    name: "Announcement Banner",
    category: "elements",
    description: "High-contrast announcement strip with accent badge, message text, and action trigger.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "tag", label: "Badge Label", type: "text", defaultValue: "ANNOUNCEMENT" },
      { key: "message", label: "Message Text", type: "text", defaultValue: "Fetch v2.0 is live with 31+ production UI components." },
      { key: "actionText", label: "Action Link", type: "text", defaultValue: "Explore Studio" },
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
          className: "p-3 border shadow-md max-w-xl w-full flex items-center justify-between gap-3 text-white text-xs",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-2.5 truncate" },
          React.createElement(
            "span",
            {
              style: { backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` },
              className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs border shrink-0",
            },
            props.tag || "ANNOUNCEMENT"
          ),
          React.createElement("span", { className: "text-zinc-300 font-normal truncate" }, props.message || "Fetch v2.0 is live.")
        ),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
            },
            className: "px-3 py-1 text-xs font-medium cursor-pointer transition-all hover:opacity-90 shrink-0",
          },
          props.actionText || "Explore Studio"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-md max-w-xl w-full flex items-center justify-between gap-3 text-white text-xs">
  <div className="flex items-center gap-2.5 truncate">
    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs border bg-[${tokens.primary}]/10 text-[${tokens.primary}] border-[${tokens.primary}]/30 shrink-0">${escapeText(props.tag || "ANNOUNCEMENT")}</span>
    <span className="text-zinc-300 font-normal truncate">${escapeText(props.message || "Fetch v2.0 is live.")}</span>
  </div>
  <button className="px-3 py-1 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${Math.max(0, tokens.radius - 2)}px] shrink-0">${escapeText(props.actionText || "Explore Studio")}</button>
</div>`;
    },
  },

  "kbd-shortcut-strip": {
    id: "kbd-shortcut-strip",
    name: "Keyboard Shortcut Cheatsheet",
    category: "elements",
    description: "High-contrast keyboard shortcut cheatsheet strip for developer toolbars and modals.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "heading", label: "Toolbar Heading", type: "text", defaultValue: "Quick Commands" },
      { key: "key1", label: "Key 1", type: "text", defaultValue: "⌘K" },
      { key: "desc1", label: "Action 1", type: "text", defaultValue: "Search" },
      { key: "key2", label: "Key 2", type: "text", defaultValue: "⌘J" },
      { key: "desc2", label: "Action 2", type: "text", defaultValue: "Terminal" },
      { key: "key3", label: "Key 3", type: "text", defaultValue: "⌘S" },
      { key: "desc3", label: "Action 3", type: "text", defaultValue: "Export" },
      { key: "key4", label: "Key 4", type: "text", defaultValue: "ESC" },
      { key: "desc4", label: "Action 4", type: "text", defaultValue: "Close" },
    ],
    renderComponent: (props, tokens) => {
      const shortcuts = [
        { key: props.key1 || "⌘K", desc: props.desc1 || "Search" },
        { key: props.key2 || "⌘J", desc: props.desc2 || "Terminal" },
        { key: props.key3 || "⌘S", desc: props.desc3 || "Export" },
        { key: props.key4 || "ESC", desc: props.desc4 || "Close" },
      ];
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-4 border shadow-lg max-w-md w-full space-y-3 text-white select-none",
        },
        React.createElement("div", { className: "text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider" }, props.heading || "Quick Commands"),
        React.createElement(
          "div",
          { className: "grid grid-cols-2 gap-2" },
          shortcuts.map((s, i) =>
            React.createElement(
              "div",
              {
                key: i,
                className: "flex items-center justify-between p-2 rounded-xs bg-zinc-950/70 border border-zinc-800/80 text-xs",
              },
              React.createElement("span", { className: "text-zinc-300 font-normal" }, s.desc),
              React.createElement(
                "span",
                {
                  style: { color: tokens.primary, borderColor: `${tokens.primary}40` },
                  className: "px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border rounded-xs shadow-xs",
                },
                s.key
              )
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-md w-full space-y-3 text-white">
  <div className="text-xs font-mono font-bold text-zinc-400 uppercase">${escapeText(props.heading || "Quick Commands")}</div>
  <div className="grid grid-cols-2 gap-2">
    <div className="flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-800 text-xs">
      <span className="text-zinc-300">${escapeText(props.desc1 || "Search")}</span>
      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-[${tokens.primary}]/40 text-[${tokens.primary}] rounded-xs">${escapeText(props.key1 || "⌘K")}</span>
    </div>
    <div className="flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-800 text-xs">
      <span className="text-zinc-300">${escapeText(props.desc2 || "Terminal")}</span>
      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-[${tokens.primary}]/40 text-[${tokens.primary}] rounded-xs">${escapeText(props.key2 || "⌘J")}</span>
    </div>
    <div className="flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-800 text-xs">
      <span className="text-zinc-300">${escapeText(props.desc3 || "Export")}</span>
      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-[${tokens.primary}]/40 text-[${tokens.primary}] rounded-xs">${escapeText(props.key3 || "⌘S")}</span>
    </div>
    <div className="flex items-center justify-between p-2 rounded-xs bg-zinc-950 border border-zinc-800 text-xs">
      <span className="text-zinc-300">${escapeText(props.desc4 || "Close")}</span>
      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-[${tokens.primary}]/40 text-[${tokens.primary}] rounded-xs">${escapeText(props.key4 || "ESC")}</span>
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
            { viewBox: "0 0 200 48", className: "w-full h-full overflow-visible" },
            React.createElement("path", {
              d: "M 0 40 Q 30 38, 60 25 T 120 18 T 160 8 T 200 2",
              fill: "none",
              stroke: tokens.primary,
              strokeWidth: "2.5",
              strokeLinecap: "round",
            }),
            React.createElement("circle", { cx: "200", cy: "2", r: "3.5", fill: tokens.primary })
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
      <path d="M 0 40 Q 30 38, 60 25 T 120 18 T 160 8 T 200 2" fill="none" stroke="${tokens.primary}" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="200" cy="2" r="3.5" fill="${tokens.primary}" />
    </svg>
  </div>
  <div className="text-[10px] font-mono text-zinc-500 text-right">${escapeText(props.timeframe || "Last 30 Days")}</div>
</div>`;
    },
  },

  "skeleton-loader": {
    id: "skeleton-loader",
    name: "Shimmering Skeleton Loader",
    category: "elements",
    description: "Wireframe content skeleton placeholder with pulsing layout blocks.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "cardTitle", label: "Preview Header", type: "text", defaultValue: "Content Loading..." },
      { key: "lineCount", label: "Text Lines", type: "select", defaultValue: "3", options: ["2", "3", "4"] },
      { key: "showAvatar", label: "Show Avatar", type: "boolean", defaultValue: true },
    ],
    renderComponent: (props, tokens) => {
      const count = parseInt(props.lineCount || "3", 10);
      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          },
          className: "p-5 border shadow-md max-w-sm w-full space-y-4 text-white animate-pulse",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-3" },
          props.showAvatar !== false &&
            React.createElement("div", {
              style: { backgroundColor: `${tokens.primary}30` },
              className: "w-9 h-9 rounded-full shrink-0",
            }),
          React.createElement(
            "div",
            { className: "space-y-1.5 flex-1" },
            React.createElement("div", { className: "h-3.5 bg-zinc-800 rounded-xs w-3/4" }),
            React.createElement("div", { className: "h-2.5 bg-zinc-850 rounded-xs w-1/2" })
          )
        ),
        React.createElement(
          "div",
          { className: "space-y-2 pt-1" },
          Array.from({ length: count }).map((_, i) =>
            React.createElement("div", {
              key: i,
              style: { width: i === count - 1 ? "60%" : "100%" },
              className: "h-3 bg-zinc-850 rounded-xs",
            })
          )
        ),
        React.createElement("div", {
          style: {
            backgroundColor: tokens.primary,
            borderRadius: `${tokens.radius}px`,
            opacity: 0.35,
          },
          className: "h-8 w-full",
        })
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-md max-w-sm w-full space-y-4 text-white animate-pulse">
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-[${tokens.primary}]/30 shrink-0" />
    <div className="space-y-1.5 flex-1">
      <div className="h-3.5 bg-zinc-800 rounded-xs w-3/4" />
      <div className="h-2.5 bg-zinc-850 rounded-xs w-1/2" />
    </div>
  </div>
  <div className="space-y-2 pt-1">
    <div className="h-3 bg-zinc-850 rounded-xs w-full" />
    <div className="h-3 bg-zinc-850 rounded-xs w-full" />
    <div className="h-3 bg-zinc-850 rounded-xs w-3/5" />
  </div>
  <div className="h-8 w-full bg-[${tokens.primary}]/35 rounded-[${tokens.radius}px]" />
</div>`;
    },
  },

  "empty-state": {
    id: "empty-state",
    name: "Zero-Data Empty State",
    category: "components",
    description: "Architectural empty state container with icon, message, and call-to-action button.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Heading", type: "text", defaultValue: "No Deployments Active" },
      { key: "description", label: "Body Text", type: "text", defaultValue: "Connect a GitHub repository or trigger a manual pipeline build to get started." },
      { key: "buttonText", label: "Button Label", type: "text", defaultValue: "Create Deployment" },
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
          className: "p-8 border-2 border-dashed max-w-md w-full flex flex-col items-center justify-center text-center space-y-3.5 text-white",
        },
        React.createElement(
          "div",
          {
            style: { backgroundColor: `${tokens.primary}15`, color: tokens.primary, borderColor: `${tokens.primary}30` },
            className: "w-12 h-12 rounded-full border flex items-center justify-center font-mono text-xl",
          },
          "✦"
        ),
        React.createElement("div", { className: "text-sm font-bold text-white tracking-tight" }, props.title || "No Deployments Active"),
        React.createElement("p", { className: "text-xs text-zinc-400 leading-relaxed font-normal max-w-xs" }, props.description || "Connect a repository to get started."),
        React.createElement(
          "button",
          {
            style: {
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${tokens.radius}px`,
            },
            className: "px-4 py-2 text-xs font-medium cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]",
          },
          props.buttonText || "Create Deployment"
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-8 bg-[${tokens.surface}] border-2 border-dashed border-[${tokens.border}] rounded-[${tokens.radius}px] max-w-md w-full flex flex-col items-center justify-center text-center space-y-3.5 text-white">
  <div className="w-12 h-12 rounded-full border border-[${tokens.primary}]/30 bg-[${tokens.primary}]/15 text-[${tokens.primary}] flex items-center justify-center font-mono text-xl">✦</div>
  <div className="text-sm font-bold text-white tracking-tight">${escapeText(props.title || "No Deployments Active")}</div>
  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">${escapeText(props.description || "Connect a repository to get started.")}</p>
  <button className="px-4 py-2 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px]">${escapeText(props.buttonText || "Create Deployment")}</button>
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

  "color-palette-swatch": {
    id: "color-palette-swatch",
    name: "Design Token Swatch Grid",
    category: "elements",
    description: "Multi-shade tonal palette card showcasing 5 tint steps and hex values.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "paletteName", label: "Palette Title", type: "text", defaultValue: "Brand Indigo" },
      { key: "baseHex", label: "Base Color", type: "text", defaultValue: "#6366F1" },
    ],
    renderComponent: (props, tokens) => {
      const swatches = [
        { shade: "100", hex: "#E0E7FF" },
        { shade: "300", hex: "#A5B4FC" },
        { shade: "500", hex: props.baseHex || tokens.primary },
        { shade: "700", hex: "#4338CA" },
        { shade: "900", hex: "#312E81" },
      ];
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
        React.createElement("div", { className: "text-xs font-bold text-white tracking-tight" }, props.paletteName || "Brand Palette"),
        React.createElement(
          "div",
          { className: "grid grid-cols-5 gap-1.5" },
          swatches.map((s) =>
            React.createElement(
              "div",
              { key: s.shade, className: "space-y-1.5 text-center cursor-pointer group" },
              React.createElement("div", {
                style: { backgroundColor: s.hex },
                className: "h-12 w-full rounded-xs border border-white/10 group-hover:scale-105 transition-transform",
              }),
              React.createElement("div", { className: "text-[10px] font-mono text-zinc-400" }, s.shade)
            )
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-4 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3 text-white">
  <div className="text-xs font-bold text-white tracking-tight">${escapeText(props.paletteName || "Brand Palette")}</div>
  <div className="grid grid-cols-5 gap-1.5">
    <div className="h-12 bg-[#E0E7FF] rounded-xs" />
    <div className="h-12 bg-[#A5B4FC] rounded-xs" />
    <div className="h-12 bg-[${tokens.primary}] rounded-xs" />
    <div className="h-12 bg-[#4338CA] rounded-xs" />
    <div className="h-12 bg-[#312E81] rounded-xs" />
  </div>
</div>`;
    },
  },

  "slider-stepper": {
    id: "slider-stepper",
    name: "Granular Step Slider",
    category: "forms",
    description: "Range slider input container with numerical badge and quick jump buttons.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "label", label: "Setting Name", type: "text", defaultValue: "Worker Concurrency" },
      { key: "value", label: "Default Value", type: "number", defaultValue: 64, min: 1, max: 128 },
      { key: "unit", label: "Unit Label", type: "text", defaultValue: "instances" },
    ],
    renderComponent: (props, tokens) => {
      const val = Number(props.value) || 64;
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
          { className: "flex items-center justify-between text-xs" },
          React.createElement("span", { className: "font-semibold text-zinc-300" }, props.label || "Worker Concurrency"),
          React.createElement(
            "span",
            {
              style: { color: tokens.primary, borderColor: `${tokens.primary}40` },
              className: "font-mono font-bold text-xs px-2 py-0.5 rounded-xs border bg-zinc-950",
            },
            `${val} ${props.unit || "instances"}`
          )
        ),
        React.createElement("input", {
          type: "range",
          min: "1",
          max: "128",
          defaultValue: val,
          className: "w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg",
        }),
        React.createElement(
          "div",
          { className: "flex justify-between text-[10px] font-mono text-zinc-500" },
          React.createElement("span", null, "1 min"),
          React.createElement("span", null, "64 def"),
          React.createElement("span", null, "128 max")
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-3.5 text-white">
  <div className="flex items-center justify-between text-xs">
    <span className="font-semibold text-zinc-300">${escapeText(props.label || "Worker Concurrency")}</span>
    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-xs border border-[${tokens.primary}]/40 text-[${tokens.primary}] bg-zinc-950">${props.value || 64} ${escapeText(props.unit || "instances")}</span>
  </div>
  <input type="range" min="1" max="128" defaultValue="${props.value || 64}" className="w-full cursor-pointer h-1.5 bg-zinc-800 rounded-lg" />
  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
    <span>1 min</span>
    <span>128 max</span>
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

  "user-table-row": {
    id: "user-table-row",
    name: "Data Table Member Row",
    category: "elements",
    description: "Enterprise table data row with avatar, name, email, role badge, status indicator, and action ellipsis.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "name", label: "Full Name", type: "text", defaultValue: "Azure Code" },
      { key: "email", label: "Email Address", type: "text", defaultValue: "developer@fetch.dev" },
      { key: "role", label: "User Role", type: "text", defaultValue: "Admin" },
      { key: "status", label: "Account Status", type: "select", defaultValue: "Active", options: ["Active", "Pending", "Suspended"] },
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
          className: "p-3.5 border shadow-sm max-w-lg w-full flex items-center justify-between gap-4 text-white select-none",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-3 truncate" },
          React.createElement(
            "div",
            {
              style: { backgroundColor: `${tokens.primary}25`, color: tokens.primary },
              className: "w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-white/10",
            },
            (props.name || "A")[0].toUpperCase()
          ),
          React.createElement(
            "div",
            { className: "truncate" },
            React.createElement("div", { className: "text-xs font-semibold text-white truncate" }, props.name || "Azure Code"),
            React.createElement("div", { className: "text-[11px] text-zinc-500 font-mono truncate" }, props.email || "developer@fetch.dev")
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-3 shrink-0" },
          React.createElement(
            "span",
            { className: "px-2 py-0.5 text-[10px] font-mono rounded-xs border border-zinc-800 bg-zinc-950 text-zinc-400" },
            props.role || "Admin"
          ),
          React.createElement(
            "span",
            {
              style: { color: tokens.primary },
              className: "text-[10px] font-mono flex items-center gap-1",
            },
            React.createElement("span", {
              style: { backgroundColor: tokens.primary },
              className: "w-1.5 h-1.5 rounded-full animate-pulse",
            }),
            props.status || "Active"
          )
        )
      );
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-3.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-sm max-w-lg w-full flex items-center justify-between gap-4 text-white">
  <div className="flex items-center gap-3 truncate">
    <div className="w-8 h-8 rounded-full bg-[${tokens.primary}]/25 text-[${tokens.primary}] font-mono font-bold text-xs flex items-center justify-center shrink-0">${(props.name || "A")[0].toUpperCase()}</div>
    <div className="truncate">
      <div className="text-xs font-semibold text-white">${escapeText(props.name || "Azure Code")}</div>
      <div className="text-[11px] text-zinc-500 font-mono">${escapeText(props.email || "developer@fetch.dev")}</div>
    </div>
  </div>
  <div className="flex items-center gap-3 shrink-0">
    <span className="px-2 py-0.5 text-[10px] font-mono rounded-xs border border-zinc-800 bg-zinc-950 text-zinc-400">${escapeText(props.role || "Admin")}</span>
    <span className="text-[10px] font-mono text-[${tokens.primary}] flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[${tokens.primary}]" />
      ${escapeText(props.status || "Active")}
    </span>
  </div>
</div>`;
    },
  },
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
