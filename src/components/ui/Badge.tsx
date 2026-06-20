import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "brand" | "safe" | "warn" | "risk" | "risky" | "neutral" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-primary-fixed text-primary",
  safe: "bg-tertiary-fixed text-tertiary",
  warn: "bg-secondary-fixed text-secondary",
  risk: "bg-error-container text-error",
  risky: "bg-error-container text-error",
  neutral: "bg-surface-container-high text-on-surface-variant",
  muted: "bg-surface text-outline",
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
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
