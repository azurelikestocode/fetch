import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "subtle" | "outline";
}

export function Badge({ className, variant = "subtle", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-[var(--radius)] transition-colors select-none";

  const variantStyles = {
    solid: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs",
    subtle: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20",
    outline: "border border-[var(--border)] text-zinc-300 bg-transparent",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}
