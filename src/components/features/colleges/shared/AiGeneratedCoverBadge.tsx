import { cn } from "@/lib/utils";

interface AiGeneratedCoverBadgeProps {
  className?: string;
  /** Smaller label on listing card thumbnails. */
  compact?: boolean;
}

export function AiGeneratedCoverBadge({
  className,
  compact = false,
}: AiGeneratedCoverBadgeProps) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-1.5 right-1.5 z-[2] rounded-sm border border-white/10 bg-black/25 px-1.5 py-px font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-[3px]",
        compact ? "text-[7px] leading-tight" : "text-[9px] leading-snug",
        className
      )}
      aria-label="AI generated illustration"
    >
      AI Generated
    </span>
  );
}
