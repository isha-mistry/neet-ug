import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  /** Optional emphasized phrase rendered in brand primary (like marketing heroes). */
  titleEmphasis?: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** When true, adds spacing below the site navbar (for pages without `RpMarketingHero`). */
  belowNav?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  titleEmphasis,
  description,
  actions,
  align = "left",
  className,
  belowNav = false,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        belowNav && "ms-content-below-nav",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex max-w-3xl flex-col gap-3">
        {eyebrow ? (
          <span className="inline-flex w-fit items-center rounded-md border border-primary/15 bg-primary-fixed/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="rp-hero-title max-w-3xl text-balance">
          {title}
          {titleEmphasis ? <em>{titleEmphasis}</em> : null}
        </h1>
        {description ? (
          <p className="rp-hero-lede max-w-2xl text-balance">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
