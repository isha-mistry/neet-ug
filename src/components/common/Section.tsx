import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "soft" | "wash";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  as?: "section" | "div";
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-surface",
  soft: "ms-gradient-soft",
  wash: "ms-gradient-wash",
};

export function Section({
  tone = "default",
  as: Component = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Component
      className={cn("py-10 md:py-16", toneClasses[tone], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
