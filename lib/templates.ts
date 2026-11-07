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
          className: "p-5 border shadow-sm max-w-sm w-full text-[#fafafa] space-y-3 min-w-0 break-words",
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
      return `<div className="bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] p-5 shadow-sm max-w-sm w-full text-[#fafafa] space-y-3 min-w-0 break-words">
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
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
