import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "brand" | "safe" | "risky" | "neutral" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-900",
  safe: "bg-brand-400 text-brand-800",
  risky: "bg-risky-surface text-risky",
  neutral: "bg-surface-muted text-text-secondary ring-1 ring-inset ring-border",
  muted: "bg-surface text-text-muted ring-1 ring-inset ring-border",
};

export function Badge({
  tone = "brand",
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
        toneClasses[tone],
        className
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
