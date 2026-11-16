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

  // Rating Feedback Widget Interactive Preview
  if (template.id === "rating-widget") {
    return <RatingWidgetCanvas props={props} tokens={tokens} />;
  }

  // Segmented Control Pills Interactive Preview
  if (template.id === "segment-picker") {
    return <SegmentPickerCanvas props={props} tokens={tokens} />;
  }

  // Spotlight Search Bar Interactive Preview
  if (template.id === "search-bar-popover") {
    return <SearchBarPopoverCanvas props={props} tokens={tokens} />;
  }

  // Announcement Banner Interactive Preview
  if (template.id === "banner-alert") {
    return <BannerAlertCanvas props={props} tokens={tokens} />;
  }

  // Changelog Release Card Interactive Preview
  if (template.id === "changelog-entry") {
    return <ChangelogEntryCanvas props={props} tokens={tokens} />;
  }

  // Feature Highlights Grid Interactive Preview
  if (template.id === "feature-grid") {
    return <FeatureGridCanvas props={props} tokens={tokens} />;
  }

  // Slider Stepper Interactive Preview
  if (template.id === "slider-stepper") {
    return <SliderStepperCanvas props={props} tokens={tokens} />;
  }

  // Modal Dialog Interactive Preview
  if (template.id === "modal-dialog") {
    return <ModalDialogCanvas props={props} tokens={tokens} />;
  }

  // Color Palette Swatch Interactive Preview
  if (template.id === "color-palette-swatch") {
    return <ColorPaletteSwatchCanvas props={props} tokens={tokens} />;
  }

  // Empty State Interactive Preview
  if (template.id === "empty-state") {
    return <EmptyStateCanvas props={props} tokens={tokens} />;
  }

  // Keyboard Shortcut Strip Interactive Preview
  if (template.id === "kbd-shortcut-strip") {
    return <KbdShortcutStripCanvas props={props} tokens={tokens} />;
  }

  // User Table Row Interactive Preview
  if (template.id === "user-table-row") {
    return <UserTableRowCanvas props={props} tokens={tokens} />;
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

function RatingWidgetCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [rating, setRating] = useState(parseInt(props.rating || "5", 10));
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-5 border shadow-xl max-w-sm w-full space-y-3.5 text-white"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-white">{props.title || "How was your experience?"}</div>
        {submitted && <span className="text-[10px] font-mono text-emerald-400">✓ Submitted</span>}
      </div>
      <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
        {props.subtitle || "Your feedback helps shape our product roadmap."}
      </p>
      <div className="flex items-center gap-1.5 py-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            style={{ color: star <= rating ? tokens.primary : "#52525b" }}
            className="text-lg cursor-pointer select-none transition-transform hover:scale-125 focus:outline-none"
          >
            ★
          </button>
        ))}
        <span className="text-xs font-mono text-zinc-500 ml-1.5">{rating}/5</span>
      </div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share optional details..."
        className="w-full px-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
      />
      <button
        type="button"
        onClick={() => {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 2500);
        }}
        style={{
          backgroundColor: tokens.primary,
          color: tokens.primaryForeground,
          borderRadius: `${tokens.radius}px`,
        }}
        className="w-full py-1.5 px-3 text-xs font-medium cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {submitted ? "Feedback Received!" : props.buttonText || "Submit Feedback"}
      </button>
    </div>
  );
}

function SegmentPickerCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [selected, setSelected] = useState(props.activeOption || "Monthly");
  const options = [props.option1 || "Monthly", props.option2 || "Quarterly", props.option3 || "Yearly", props.option4 || "Lifetime"];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-1.5 border inline-flex items-center gap-1 shadow-md select-none"
    >
      {options.map((opt) => {
        const isActive = opt.toLowerCase() === selected.toLowerCase();
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(opt)}
            style={
              isActive
                ? {
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
                  }
                : undefined
            }
            className={`px-3 py-1.5 text-xs font-medium cursor-pointer transition-all ${
              isActive ? "shadow-sm font-semibold" : "text-zinc-400 hover:text-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SearchBarPopoverCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(props.tag1 || "Components");
  const tags = [props.tag1 || "Components", props.tag2 || "Tokens", props.tag3 || "Docs"];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-3 border shadow-2xl max-w-md w-full space-y-2.5 text-white"
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-950/80 border border-zinc-800/80 rounded-xs">
        <span className="text-zinc-500 text-xs font-mono">⌕</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={props.placeholder || "Type a command or search..."}
          className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none min-w-0"
        />
        <span className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xs shrink-0">
          {props.shortcut || "⌘K"}
        </span>
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Jump to:</span>
        {tags.map((tag) => {
          const isChosen = tag === selectedTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              style={
                isChosen
                  ? { backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` }
                  : undefined
              }
              className={`px-2 py-0.5 text-[10px] font-mono rounded-xs border cursor-pointer transition-colors ${
                !isChosen ? "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white" : ""
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BannerAlertCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-white border border-dashed border-zinc-800 rounded-xs cursor-pointer"
      >
        + Restore Banner Preview
      </button>
    );
  }

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-3 border shadow-md max-w-xl w-full flex items-center justify-between gap-3 text-white text-xs"
    >
      <div className="flex items-center gap-2.5 truncate">
        <span
          style={{ backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` }}
          className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-xs border shrink-0"
        >
          {props.tag || "ANNOUNCEMENT"}
        </span>
        <span className="text-zinc-300 font-normal truncate">{props.message || "Fetch v2.0 is live."}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          style={{
            backgroundColor: tokens.primary,
            color: tokens.primaryForeground,
            borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
          }}
          className="px-3 py-1 text-xs font-medium cursor-pointer transition-all hover:opacity-90"
        >
          {props.actionText || "Explore Studio"}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-zinc-500 hover:text-white text-xs px-1 cursor-pointer font-mono"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function ChangelogEntryCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [expanded, setExpanded] = useState(false);
  const bullets = [
    props.item1 || "Interactive clicks across canvas components",
    props.item2 || "Searchable Google Fonts library",
    props.item3 || "2D HSV color spectrum picker",
  ];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-6 border shadow-xl max-w-md w-full space-y-4 text-white"
    >
      <div className="flex items-center justify-between">
        <span
          style={{ backgroundColor: `${tokens.primary}20`, color: tokens.primary, borderColor: `${tokens.primary}40` }}
          className="px-2 py-0.5 text-xs font-mono font-bold rounded-xs border"
        >
          {props.version || "v2.4.0"}
        </span>
        <span className="text-xs font-mono text-zinc-500">{props.date || "November 2026"}</span>
      </div>
      <h3 className="text-sm font-bold text-white tracking-tight">
        {props.title || "Interactive Canvas & Dynamic Typography"}
      </h3>
      <ul className="space-y-1.5 text-xs text-zinc-400">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-2">
            <span style={{ color: tokens.primary }} className="font-mono font-bold text-[11px]">
              •
            </span>
            <span className="truncate">{b}</span>
          </li>
        ))}
      </ul>
      {expanded && (
        <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xs text-[11px] text-zinc-400 font-mono space-y-1">
          <div>Commit: 94baf5b</div>
          <div>All 26 tests verified green.</div>
          <div>Next.js 15.5.29 Turbopack engine.</div>
        </div>
      )}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="text-zinc-500 font-mono text-[11px]">Coral / Hack Club Release</span>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ color: tokens.primary }}
          className="font-medium hover:underline cursor-pointer"
        >
          {expanded ? "Hide Details ↑" : "Read Notes →"}
        </button>
      </div>
    </div>
  );
}

function FeatureGridCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cards = [
    { title: props.card1Title || "Type Safe", desc: props.card1Desc || "100% strict TypeScript types.", tag: "01" },
    { title: props.card2Title || "Zero Runtime", desc: props.card2Desc || "Self-contained Tailwind JSX.", tag: "02" },
    { title: props.card3Title || "Deep Theming", desc: props.card3Desc || "Live token adjustments.", tag: "03" },
  ];

  return (
    <div className="w-full max-w-xl space-y-4 text-white">
      <div className="text-sm font-bold tracking-tight text-white mb-2">
        {props.heading || "Architectural Precision"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cards.map((c, i) => {
          const isSelected = activeCard === i;
          return (
            <div
              key={i}
              onClick={() => setActiveCard(isSelected ? null : i)}
              style={{
                backgroundColor: tokens.surface,
                borderColor: isSelected ? tokens.primary : tokens.border,
                borderRadius: `${tokens.radius}px`,
              }}
              className="p-4 border shadow-sm space-y-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div
                style={{ color: tokens.primary }}
                className="text-[11px] font-mono font-bold flex items-center justify-between"
              >
                <span>{c.tag}</span>
                {isSelected && <span className="text-[10px]">ACTIVE</span>}
              </div>
              <div className="text-xs font-semibold text-white">{c.title}</div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">{c.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SliderStepperCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [val, setVal] = useState(Number(props.value) || 64);

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-5 border shadow-xl max-w-sm w-full space-y-3.5 text-white select-none"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-zinc-300">{props.label || "Worker Concurrency"}</span>
        <span
          style={{ color: tokens.primary, borderColor: `${tokens.primary}40` }}
          className="font-mono font-bold text-xs px-2 py-0.5 rounded-xs border bg-zinc-950"
        >
          {val} {props.unit || "instances"}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="128"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
      />
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <button onClick={() => setVal(16)} className="hover:text-white cursor-pointer">16</button>
        <button onClick={() => setVal(32)} className="hover:text-white cursor-pointer">32</button>
        <button onClick={() => setVal(64)} className="hover:text-white cursor-pointer">64 (Def)</button>
        <button onClick={() => setVal(96)} className="hover:text-white cursor-pointer">96</button>
        <button onClick={() => setVal(128)} className="hover:text-white cursor-pointer">128 (Max)</button>
      </div>
    </div>
  );
}

function ModalDialogCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-6 border shadow-2xl max-w-md w-full space-y-4 text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold">
          <span className="px-1.5 py-0.5 rounded-xs bg-rose-500/10 border border-rose-500/30">⚠ DESTRUCTIVE</span>
          <span className="text-zinc-500">ID: sec_98x1</span>
        </div>
        {status && <span className="text-[10px] font-mono text-emerald-400">{status}</span>}
      </div>
      <h3 className="text-sm font-bold text-white tracking-tight">{props.title || "Revoke API Secret"}</h3>
      <p className="text-xs text-zinc-400 leading-relaxed font-normal">{props.message || "This action cannot be undone."}</p>
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80">
        <button
          onClick={() => {
            setStatus("Dismissed");
            setTimeout(() => setStatus(null), 2000);
          }}
          className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-xs border border-zinc-800 hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          {props.cancelText || "Keep Active"}
        </button>
        <button
          onClick={() => {
            setStatus("Revoked Successfully");
            setTimeout(() => setStatus(null), 2500);
          }}
          style={{
            backgroundColor: tokens.primary,
            color: tokens.primaryForeground,
            borderRadius: `${Math.max(0, tokens.radius - 2)}px`,
          }}
          className="px-3 py-1.5 text-xs font-semibold rounded-xs cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {props.confirmText || "Revoke Secret"}
        </button>
      </div>
    </div>
  );
}

function ColorPaletteSwatchCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const swatches = [
    { shade: "100", hex: "#E0E7FF" },
    { shade: "300", hex: "#A5B4FC" },
    { shade: "500", hex: props.baseHex || tokens.primary },
    { shade: "700", hex: "#4338CA" },
    { shade: "900", hex: "#312E81" },
  ];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-xl max-w-sm w-full space-y-3 text-white select-none"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-white tracking-tight">{props.paletteName || "Brand Palette"}</div>
        {copiedHex && <span className="text-[10px] font-mono text-emerald-400">Copied {copiedHex}!</span>}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {swatches.map((s) => (
          <div
            key={s.shade}
            onClick={() => {
              navigator.clipboard?.writeText(s.hex);
              setCopiedHex(s.hex);
              setTimeout(() => setCopiedHex(null), 1500);
            }}
            className="space-y-1.5 text-center cursor-pointer group"
          >
            <div
              style={{ backgroundColor: s.hex }}
              className="h-12 w-full rounded-xs border border-white/10 group-hover:scale-105 group-hover:border-white transition-all shadow-inner"
            />
            <div className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">{s.shade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyStateCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-8 border-2 border-dashed max-w-md w-full flex flex-col items-center justify-center text-center space-y-3.5 text-white"
    >
      <div
        style={{ backgroundColor: `${tokens.primary}15`, color: tokens.primary, borderColor: `${tokens.primary}30` }}
        className="w-12 h-12 rounded-full border flex items-center justify-center font-mono text-xl"
      >
        ✦
      </div>
      <div className="text-sm font-bold text-white tracking-tight">{props.title || "No Deployments Active"}</div>
      <p className="text-xs text-zinc-400 leading-relaxed font-normal max-w-xs">
        {props.description || "Connect a repository to get started."}
      </p>
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
        style={{
          backgroundColor: tokens.primary,
          color: tokens.primaryForeground,
          borderRadius: `${tokens.radius}px`,
        }}
        className="px-4 py-2 text-xs font-medium cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {loading ? "Initializing..." : props.buttonText || "Create Deployment"}
      </button>
    </div>
  );
}

function KbdShortcutStripCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const shortcuts = [
    { key: props.key1 || "⌘K", desc: props.desc1 || "Search" },
    { key: props.key2 || "⌘J", desc: props.desc2 || "Terminal" },
    { key: props.key3 || "⌘S", desc: props.desc3 || "Export" },
    { key: props.key4 || "ESC", desc: props.desc4 || "Close" },
  ];

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-4 border shadow-lg max-w-md w-full space-y-3 text-white select-none"
    >
      <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
        {props.heading || "Quick Commands"}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shortcuts.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveKey(s.key);
              setTimeout(() => setActiveKey(null), 1000);
            }}
            className={`flex items-center justify-between p-2 rounded-xs border text-xs cursor-pointer transition-all ${
              activeKey === s.key ? "bg-zinc-800 border-zinc-600 scale-[1.02]" : "bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700"
            }`}
          >
            <span className="text-zinc-300 font-normal">{s.desc}</span>
            <span
              style={{ color: tokens.primary, borderColor: `${tokens.primary}40` }}
              className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border rounded-xs shadow-xs"
            >
              {s.key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function UserTableRowCanvas({ props, tokens }: { props: Record<string, any>; tokens: ThemeTokens }) {
  const [status, setStatus] = useState(props.status || "Active");
  const cycleStatus = () => {
    if (status === "Active") setStatus("Pending");
    else if (status === "Pending") setStatus("Suspended");
    else setStatus("Active");
  };

  return (
    <div
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.border,
        borderRadius: `${tokens.radius}px`,
      }}
      className="p-3.5 border shadow-sm max-w-lg w-full flex items-center justify-between gap-4 text-white select-none"
    >
      <div className="flex items-center gap-3 truncate">
        <div
          style={{ backgroundColor: `${tokens.primary}25`, color: tokens.primary }}
          className="w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-white/10"
        >
          {(props.name || "A")[0].toUpperCase()}
        </div>
        <div className="truncate">
          <div className="text-xs font-semibold text-white truncate">{props.name || "Azure Code"}</div>
          <div className="text-[11px] text-zinc-500 font-mono truncate">{props.email || "developer@fetch.dev"}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="px-2 py-0.5 text-[10px] font-mono rounded-xs border border-zinc-800 bg-zinc-950 text-zinc-400">
          {props.role || "Admin"}
        </span>
        <button
          onClick={cycleStatus}
          style={{ color: tokens.primary }}
          title="Click to cycle status"
          className="text-[10px] font-mono flex items-center gap-1 cursor-pointer hover:underline"
        >
          <span style={{ backgroundColor: tokens.primary }} className="w-1.5 h-1.5 rounded-full animate-pulse" />
          {status}
        </button>
      </div>
    </div>
  );
}
