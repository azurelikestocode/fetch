import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "subtle" | "outline";
}

export function Badge({ className, variant = "subtle", style, children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-[var(--radius)] transition-colors select-none";

  const variantStyles = {
    solid: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs",
    subtle: "text-[var(--primary)] border",
    outline: "border border-[var(--border)] text-zinc-300 bg-transparent",
  };

  const subtleStyle: React.CSSProperties =
    variant === "subtle"
      ? {
          backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
          borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
        }
      : {};

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{ ...subtleStyle, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
