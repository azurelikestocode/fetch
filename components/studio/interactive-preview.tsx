"use client";

import React, { useState } from "react";
import { ComponentTemplate } from "../../lib/templates";
import { ThemeTokens } from "../../lib/tokens";

interface InteractivePreviewProps {
  template: ComponentTemplate;
  props: Record<string, any>;
  tokens: ThemeTokens;
}

export function InteractivePreview({ template, props, tokens }: InteractivePreviewProps) {
  // Action Dock Interactive Preview
  if (template.id === "action-dock") {
    return <ActionDockCanvas props={props} tokens={tokens} />;
  }

  // Tabs Interactive Preview
  if (template.id === "tabs") {
    return <TabsCanvas props={props} tokens={tokens} />;
  }

  // Toggle Switch Interactive Preview
  if (template.id === "switch") {
    return <SwitchCanvas props={props} tokens={tokens} />;
  }

  // FAQ Accordion Interactive Preview
  if (template.id === "accordion") {
    return <AccordionCanvas props={props} tokens={tokens} />;
  }

  // Segmented Radio Group Interactive Preview
  if (template.id === "radio-group") {
    return <RadioGroupCanvas props={props} tokens={tokens} />;
  }

  // Newsletter Card Interactive Preview with No Overflow
  if (template.id === "newsletter-card") {
    return <NewsletterCanvas props={props} tokens={tokens} />;
  }

  // Avatar Stack with Custom Image Support and Tooltips
  if (template.id === "avatar-stack") {
    return <AvatarStackCanvas props={props} tokens={tokens} />;
  }

  // Cookie Consent Banner Interactive Preview
  if (template.id === "cookie-banner") {
    return <CookieBannerCanvas props={props} tokens={tokens} />;
  }

  // Command Menu Interactive Preview
  if (template.id === "command-menu") {
    return <CommandMenuCanvas props={props} tokens={tokens} />;
  }

  // File Dropzone Interactive Preview
  if (template.id === "file-dropzone") {
    return <FileDropzoneCanvas props={props} tokens={tokens} />;
  }

  // Profile Card Interactive Preview
  if (template.id === "profile-card") {
    return <ProfileCardCanvas props={props} tokens={tokens} />;
  }

  // Testimonial Card Interactive Preview
  if (template.id === "testimonial-card") {
    return <TestimonialCardCanvas props={props} tokens={tokens} />;
  }

  // Action Button Interactive Preview
  if (template.id === "button") {
    return <ButtonCanvas props={props} tokens={tokens} />;
  }

  // Fallback to template's standard render
  return <>{template.renderComponent(props, tokens)}</>;
}

// -------------------------------------------------------------
// Component-Specific Interactive Canvas Implementations
// -------------------------------------------------------------

function ActionDockCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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

function TabsCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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

function SwitchCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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
        <div className="text-xs font-semibold text-white font-mono truncate">
          {props.label || "Automatic Token Synchronization"}
        </div>
        <div className="text-[11px] text-zinc-400 leading-tight truncate">
          {props.description || "Propagate changes instantly across active workspaces."}
        </div>
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

function AccordionCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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
        <h4 className="text-xs font-semibold tracking-tight">
          {props.question || "How does real-time token synchronization work?"}
        </h4>
        <span
          style={{ color: tokens.primary }}
          className={`text-xs font-mono font-bold ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          ▲
        </span>
      </div>
      {isOpen && (
        <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-2 animate-in fade-in">
          {props.answer ||
            "CSS custom variables are injected directly into the component scope, updating immediately without re-rendering or bundle reloads."}
        </p>
      )}
    </div>
  );
}

function RadioGroupCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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

function NewsletterCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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
        <div className="text-sm font-semibold text-white tracking-tight">
          {props.title || "Engineering Dispatch"}
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
          Monthly deep dives into design token engines and low-level web performance.
        </p>
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

function AvatarStackCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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
        <div className="text-xs font-semibold text-white font-mono truncate">
          {props.teamName || "Core Architecture Team"}
        </div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
          <span style={{ backgroundColor: tokens.primary }} className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" />
          <span className="truncate">
            {activeHover ? `Member: ${activeHover}` : props.memberCount || "4 active contributors"}
          </span>
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
                  style={
                    i === 0
                      ? { backgroundColor: tokens.primary, color: tokens.primaryForeground }
                      : { backgroundColor: "#27272a", color: "#e4e4e7" }
                  }
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

function CookieBannerCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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

function CommandMenuCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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

function FileDropzoneCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
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
      <div style={{ color: tokens.primary }} className="font-mono font-bold text-lg mb-1">
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

function ProfileCardCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [connected, setConnected] = useState(false);
  const avatarUrl =
    props.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face";

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

function TestimonialCardCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const avatarUrl =
    props.avatarUrl ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face";

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

function ButtonCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [clicks, setClicks] = useState(0);
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[props.size as "sm" | "md" | "lg" || "md"];

  return (
    <div className="flex flex-col items-center gap-2">
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
      {clicks > 0 && (
        <span className="text-[10px] font-mono text-zinc-500 animate-fade-in">
          Clicked {clicks} {clicks === 1 ? "time" : "times"}
        </span>
      )}
    </div>
  );
}
