import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
  /** Applies standard rank-predictor panel padding (`rp-fbody`) */
  padded?: boolean;
}

/** Card shell aligned with rank-predictor `rp-fcard` panels */
export function DetailPanel({
  children,
  className,
  bodyClassName,
  style,
  padded = true,
}: DetailPanelProps) {
  return (
    <div className={cn("rp-fcard", className)} style={style}>
      <div className={cn(padded && "rp-fbody", bodyClassName)}>{children}</div>
    </div>
  );
}

interface DetailSubsectionHeadProps {
  title: string;
  className?: string;
}

/** In-panel subsection title (fee blocks, table groups) */
export function DetailSubsectionHead({
  title,
  className,
}: DetailSubsectionHeadProps) {
  return (
    <div
      className={cn(
        "border-b border-outline-variant bg-linear-to-br from-primary-fixed to-surface-container-lowest px-6 py-3.5",
        className
      )}
    >
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
        {title}
      </h3>
    </div>
  );
}
