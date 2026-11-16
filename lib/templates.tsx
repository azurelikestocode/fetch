"use client";

import React, { useState } from "react";
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

// ==========================================
// Interactive Components for Live Studio & Canvas
// ==========================================

function InteractiveButton({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [clicks, setClicks] = useState(0);
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[props.size as "sm" | "md" | "lg"] || "px-4 py-2 text-sm";

  return (
    <button
      disabled={props.disabled}
      onClick={() => setClicks((c) => c + 1)}
      style={{
        backgroundColor: tokens.primary,
        color: tokens.primaryForeground,
        borderRadius: `${tokens.radius}px`,
      }}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses}`}
    >
      <span>{props.label || "Get Started"}</span>
      {clicks > 0 && (
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/25">
          +{clicks}
        </span>
      )}
    </button>
  );
}

function InteractiveSwitch({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [isChecked, setIsChecked] = useState(props.checked ?? true);
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-xs max-w-sm w-full flex items-center justify-between gap-4 transition-all hover:border-zinc-700 cursor-pointer select-none"
    >
      <div className="space-y-0.5 min-w-0">
        <div className="text-xs font-semibold text-white font-mono truncate">{props.label || "Automatic Token Synchronization"}</div>
        <div className="text-[11px] text-zinc-400 leading-tight truncate">{props.description || "Propagate changes instantly across active workspaces."}</div>
      </div>
      <div
        style={{
          backgroundColor: isChecked ? tokens.primary : "#27272a",
          borderRadius: "9999px",
        }}
        className="w-10 h-5.5 p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer relative"
      >
        <div
          className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            isChecked ? "translate-x-4.5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

function InteractiveTabs({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [props.tab1 || "Overview", props.tab2 || "Analytics", props.tab3 || "Deployments"];
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-1 border inline-flex items-center gap-1 shadow-xs select-none"
    >
      {tabs.map((tab, idx) => {
        const isActive = idx === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(idx)}
            style={
              isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
                  }
                : {
                    borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
                  }
            }
            className={`px-3 py-1.5 text-xs font-medium font-mono transition-all cursor-pointer ${
              isActive ? "shadow-xs font-semibold" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function InteractiveAvatarStack({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const isImageMode = props.avatarMode !== "initials";
  const avatarList = [
    {
      url: props.avatar1 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
      initials: "AZ",
      name: "Alex Zhang",
    },
    {
      url: props.avatar2 || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
      initials: "RX",
      name: "Rachel Xia",
    },
    {
      url: props.avatar3 || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
      initials: "FL",
      name: "Felix Lin",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-xs max-w-sm w-full flex items-center justify-between gap-4 select-none"
    >
      <div className="space-y-0.5 min-w-0">
        <div className="text-xs font-semibold text-white font-mono truncate">{props.teamName || "Core Architecture Team"}</div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
          <span style={{ backgroundColor: tokens.primary }} className="w-1.5 h-1.5 rounded-full shrink-0" />
          <span className="truncate">{activeHover ? `Active: ${activeHover}` : props.memberCount || "4 active contributors"}</span>
        </div>
      </div>
      <div className="flex items-center -space-x-2 shrink-0">
        {avatarList.map((m, i) => {
          const isUrl = isImageMode && (m.url.startsWith("http") || m.url.startsWith("/"));
          return (
            <div
              key={i}
              onMouseEnter={() => setActiveHover(m.name)}
              onMouseLeave={() => setActiveHover(null)}
              className="relative group/avatar cursor-pointer"
            >
              {isUrl ? (
                <img
                  src={m.url}
                  alt={m.name}
                  className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover shrink-0 hover:scale-115 hover:z-20 transition-transform shadow-xs"
                />
              ) : (
                <div
                  style={i === 0 ? { backgroundColor: tokens.primary, color: tokens.primaryForeground } : { backgroundColor: "#27272a", color: "#e4e4e7" }}
                  className="w-7 h-7 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 hover:scale-115 hover:z-20 transition-transform"
                >
                  {m.initials}
                </div>
              )}
            </div>
          );
        })}
        <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
          {props.extraBadge || "+3"}
        </div>
      </div>
    </div>
  );
}

function InteractiveAccordion({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-xs max-w-sm w-full space-y-2 text-[#fafafa] select-none transition-all"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer hover:opacity-90"
      >
        <h4 className="text-xs font-semibold tracking-tight">{props.question || "How does real-time token synchronization work?"}</h4>
        <span
          style={{ color: tokens.primary }}
          className={`text-xs font-mono font-bold ml-2 transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`}
        >
          ▲
        </span>
      </div>
      {isOpen && (
        <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-2 animate-in fade-in">
          {props.answer || "CSS custom variables are injected directly into the component scope, updating immediately without re-rendering or bundle reloads."}
        </p>
      )}
    </div>
  );
}

function InteractiveNewsletterCard({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-5 border shadow-xl w-full max-w-[340px] space-y-3.5 box-border"
    >
      <div>
        <div className="text-sm font-semibold text-white tracking-tight">{props.title || "Engineering Dispatch"}</div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">Monthly deep dives into design token engines and low-level web performance.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) setSubmitted(true);
        }}
        className="flex items-center gap-2 w-full min-w-0"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="developer@fetch.dev"
          style={{
            borderRadius: `${tokens.radius}px`,
            borderColor: tokens.border,
            backgroundColor: tokens.background,
          }}
          className="min-w-0 flex-1 h-8 px-2.5 text-xs border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors"
        />
        <button
          type="submit"
          style={{
            backgroundColor: tokens.primary,
            color: tokens.primaryForeground,
            borderRadius: `${tokens.radius}px`,
          }}
          className="h-8 px-3 text-xs font-medium cursor-pointer shrink-0 transition-opacity hover:opacity-90 active:scale-95 whitespace-nowrap"
        >
          {submitted ? "Subscribed!" : props.buttonText || "Subscribe"}
        </button>
      </form>
      {submitted && (
        <p className="text-[11px] text-emerald-400 font-mono">✓ Check your inbox to confirm.</p>
      )}
    </div>
  );
}

function InteractiveRadioGroup({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const items = [
    { title: props.opt1 || "Serverless Edge", sub: "Global sub-15ms execution" },
    { title: props.opt2 || "Dedicated Cluster", sub: "Isolated VPC & reserved CPU" },
  ];
  return (
    <div className="space-y-2 max-w-sm w-full select-none">
      {items.map((item, idx) => {
        const isSelected = idx === selectedIdx;
        return (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            style={{
              backgroundColor: tokens.surface,
              borderColor: isSelected ? tokens.primary : tokens.border,
              borderRadius: `${tokens.radius}px`,
            }}
            className={`p-3.5 border flex items-center justify-between cursor-pointer transition-colors ${
              isSelected ? "ring-1 ring-offset-0" : ""
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-white font-mono">{item.title}</div>
              <div className="text-[11px] text-zinc-400">{item.sub}</div>
            </div>
            <div
              style={isSelected ? { borderColor: tokens.primary } : { borderColor: "#3f3f46" }}
              className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
            >
              {isSelected && (
                <div style={{ backgroundColor: tokens.primary }} className="w-2 h-2 rounded-full" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InteractiveActionDock({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [activeIdx, setActiveIdx] = useState(1);
  const items = [
    props.item1 || "Home",
    props.item2 || "Components",
    props.item3 || "Studio",
    props.item4 || "Settings",
  ];
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: "9999px",
      }}
      className="px-3 py-1.5 border shadow-2xl inline-flex items-center gap-1.5 transition-all select-none"
    >
      {items.map((item, idx) => {
        const isActive = idx === activeIdx;
        return (
          <button
            key={`${item}-${idx}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(idx);
            }}
            style={
              isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                  }
                : {}
            }
            className={`px-3.5 py-1 rounded-full text-xs font-medium font-mono transition-all cursor-pointer ${
              isActive
                ? "shadow-sm scale-[1.04]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function InteractiveCookieBanner({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-xl max-w-sm w-full space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-white">{props.title || "Telemetry & Privacy"}</div>
          <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
            {props.description || "We use strictly necessary cookies to ensure optimal edge token distribution."}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-mono text-zinc-500">
          {status ? `Status: ${status}` : "Consent pending"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStatus("Declined")}
            style={{ borderRadius: `${Math.max(2, tokens.radius - 2)}px` }}
            className="py-1 px-2.5 text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setStatus("Accepted")}
            style={{
              backgroundColor: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: `${Math.max(2, tokens.radius - 2)}px`,
            }}
            className="py-1 px-3 text-xs font-medium cursor-pointer"
          >
            {props.buttonText || "Accept All"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InteractiveProfileCard({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [connected, setConnected] = useState(false);
  const avatarUrl = props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face";
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-5 border shadow-xl max-w-xs w-full space-y-4"
    >
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={props.name || "Azure"}
          className="w-11 h-11 rounded-full object-cover border-2 border-zinc-800 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white truncate">{props.name || "Azure"}</div>
          <div className="text-xs text-zinc-400 font-mono truncate">{props.handle || "@azurelikestocode"}</div>
        </div>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">{props.bio || "Building live-configurable UI engines."}</p>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] font-mono text-zinc-500">25 repositories</span>
        <button
          type="button"
          onClick={() => setConnected(!connected)}
          style={{
            backgroundColor: connected ? "#27272a" : tokens.primary,
            color: connected ? "#e4e4e7" : tokens.primaryForeground,
            borderRadius: `${tokens.radius}px`,
          }}
          className="px-3 py-1 text-xs font-medium cursor-pointer transition-all active:scale-95"
        >
          {connected ? "Connected ✓" : "Connect"}
        </button>
      </div>
    </div>
  );
}

function InteractiveTestimonialCard({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const avatarUrl = props.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face";
  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-6 border shadow-xl max-w-sm w-full space-y-4"
    >
      <p className="text-xs text-zinc-300 leading-relaxed italic">
        &ldquo;{props.quote || "Fetch eliminated token drift across our entire frontend design engineering team."}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
        <img
          src={avatarUrl}
          alt={props.author || "Marcus Aurel"}
          className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0"
        />
        <div>
          <div className="text-xs font-semibold text-white">{props.author || "Marcus Aurel"}</div>
          <div className="text-[11px] text-zinc-500 font-mono">{props.role || "VP of Product at Hyperlink"}</div>
        </div>
      </div>
    </div>
  );
}

function InteractiveCommandMenu({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm space-y-2 select-none">
      <div
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: tokens.background,
          borderColor: tokens.border,
          borderRadius: `${tokens.radius}px`,
        }}
        className="w-full h-10 px-3.5 border flex items-center justify-between text-xs text-zinc-400 shadow-xs transition-all duration-200 hover:border-zinc-700 cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 truncate">
          <span className="text-zinc-500 font-mono text-sm">⌕</span>
          <span className="truncate text-zinc-400 group-hover:text-zinc-200 font-mono text-[11px]">
            {props.placeholder || "Search documentation or commands..."}
          </span>
        </div>
        <kbd
          style={{
            borderRadius: `${Math.max(2, tokens.radius - 4)}px`,
          }}
          className="text-[10px] font-mono px-1.5 py-0.5 border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-200 shrink-0"
        >
          {props.shortcut || "⌘K"}
        </kbd>
      </div>
      {open && (
        <div
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.border,
            borderRadius: `${tokens.radius}px`,
          }}
          className="p-2 border shadow-2xl divide-y divide-zinc-800 animate-in fade-in"
        >
          {["Generate Tailwind Code", "Export Token JSON", "Switch Theme Preset"].map((cmd) => (
            <div
              key={cmd}
              className="px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 cursor-pointer rounded-xs flex items-center justify-between"
            >
              <span>{cmd}</span>
              <span className="text-[10px] font-mono text-zinc-600">Run</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InteractiveFileDropzone({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <div
      onClick={() => setFileName(fileName ? null : "tokens.config.json (3.8 KB)")}
      style={{
        backgroundColor: tokens.surface,
        borderColor: fileName ? tokens.primary : tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-6 border-2 border-dashed max-w-sm w-full flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:border-zinc-600 transition-colors select-none"
    >
      <div
        style={{ color: tokens.primary }}
        className="font-mono font-bold text-lg mb-1"
      >
        {fileName ? "✓" : "↑"}
      </div>
      <div className="text-xs font-semibold text-white">
        {fileName ? `Loaded: ${fileName}` : props.title || "Upload Design Tokens"}
      </div>
      <p className="text-[11px] text-zinc-500 font-mono">
        {fileName ? "Click to clear file" : props.hint || "JSON, TOML, or CSS tokens up to 10MB"}
      </p>
    </div>
  );
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
      return React.createElement(InteractiveButton, { props, tokens });
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
      return React.createElement(InteractiveCommandMenu, { props, tokens });
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
      return React.createElement(InteractiveSwitch, { props, tokens });
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
      return React.createElement(InteractiveTabs, { props, tokens });
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
    category: "primitives",
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
      return React.createElement(InteractiveAvatarStack, { props, tokens });
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
    category: "patterns",
    description: "Expandable content section with chevron rotation and surface accent highlight.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "question", label: "Question Header", type: "text", defaultValue: "How does real-time token synchronization work?" },
      { key: "answer", label: "Expanded Answer", type: "text", defaultValue: "CSS custom variables are injected directly into the component scope, updating immediately without re-rendering or bundle reloads." },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(InteractiveAccordion, { props, tokens });
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
    category: "patterns",
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
    category: "patterns",
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
    category: "primitives",
    description: "Compact bottom floating banner with essential telemetry explanation and dual action buttons.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "title", label: "Heading", type: "text", defaultValue: "Telemetry & Privacy" },
      { key: "description", label: "Policy Text", type: "text", defaultValue: "We use strictly necessary cookies to ensure optimal edge token distribution." },
      { key: "buttonText", label: "Accept Button", type: "text", defaultValue: "Accept All" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(InteractiveCookieBanner, { props, tokens });
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
    category: "patterns",
    description: "High-craft user review box with author portrait initials, quote text, and role tag.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "quote", label: "Quote Text", type: "text", defaultValue: "Fetch eliminated token drift across our entire frontend design engineering team." },
      { key: "author", label: "Author Name", type: "text", defaultValue: "Marcus Aurel" },
      { key: "role", label: "Author Role", type: "text", defaultValue: "VP of Product at Hyperlink" },
      { key: "avatarUrl", label: "Author Portrait URL", type: "text", defaultValue: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(InteractiveTestimonialCard, { props, tokens });
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-6 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-lg max-w-sm w-full space-y-4">
  <p className="text-xs text-zinc-300 leading-relaxed italic">&ldquo;${escapeText(props.quote || "")}&rdquo;</p>
  <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/80">
    <img src="${escapeAttr(props.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face")}" alt="${escapeAttr(props.author || "Marcus Aurel")}" className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0" />
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
    category: "patterns",
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
      return React.createElement(InteractiveNewsletterCard, { props, tokens });
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-[340px] w-full space-y-3.5">
  <div className="text-sm font-semibold text-white tracking-tight">${escapeText(props.title || "Engineering Dispatch")}</div>
  <p className="text-xs text-zinc-400 leading-relaxed">Monthly deep dives into design token engines and low-level web performance.</p>
  <form className="flex items-center gap-2 w-full min-w-0">
    <input type="email" placeholder="developer@fetch.dev" className="min-w-0 flex-1 h-8 px-2.5 text-xs bg-[${tokens.background}] border border-[${tokens.border}] rounded-[${tokens.radius}px] text-white focus:outline-none" />
    <button type="submit" className="h-8 px-3 text-xs font-medium bg-[${tokens.primary}] text-[${tokens.primaryForeground}] rounded-[${tokens.radius}px] shrink-0 whitespace-nowrap">${escapeText(props.buttonText || "Subscribe")}</button>
  </form>
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
      return React.createElement(InteractiveRadioGroup, { props, tokens });
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
      return React.createElement(InteractiveFileDropzone, { props, tokens });
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
      return React.createElement(InteractiveActionDock, { props, tokens });
    },
    generateJsx: (props, tokens) => {
      return `<div className="px-3 py-1.5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-full shadow-2xl inline-flex items-center gap-1.5">
  <button className="px-3.5 py-1 rounded-full text-xs font-medium font-mono text-zinc-400 hover:text-white">${escapeText(props.item1 || "Home")}</button>
  <button className="px-3.5 py-1 rounded-full text-xs font-medium font-mono bg-[${tokens.primary}] text-[${tokens.primaryForeground}] shadow-sm">${escapeText(props.item2 || "Components")}</button>
  <button className="px-3.5 py-1 rounded-full text-xs font-medium font-mono text-zinc-400 hover:text-white">${escapeText(props.item3 || "Studio")}</button>
  <button className="px-3.5 py-1 rounded-full text-xs font-medium font-mono text-zinc-400 hover:text-white">${escapeText(props.item4 || "Settings")}</button>
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
    category: "patterns",
    description: "Compact creator passport with avatar, status chip, repository counter, and connect button.",
    defaultTokens: { ...THEME_PRESETS.default.tokens },
    configurableProps: [
      { key: "name", label: "Developer Name", type: "text", defaultValue: "Azure" },
      { key: "handle", label: "GitHub Handle", type: "text", defaultValue: "@azurelikestocode" },
      { key: "bio", label: "Bio Tagline", type: "text", defaultValue: "Building live-configurable UI engines." },
      { key: "avatarUrl", label: "Avatar Image URL", type: "text", defaultValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face" },
    ],
    renderComponent: (props, tokens) => {
      return React.createElement(InteractiveProfileCard, { props, tokens });
    },
    generateJsx: (props, tokens) => {
      return `<div className="p-5 bg-[${tokens.surface}] border border-[${tokens.border}] rounded-[${tokens.radius}px] shadow-xl max-w-sm w-full space-y-4 text-white">
  <div className="flex items-center gap-3">
    <img src="${escapeAttr(props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face")}" alt="${escapeAttr(props.name || "Azure")}" className="w-10 h-10 rounded-full object-cover border-2 border-zinc-800 shrink-0" />
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
};

export function getTemplateById(id: string): ComponentTemplate | undefined {
  return TEMPLATES[id];
}
