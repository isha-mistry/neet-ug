import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex max-w-3xl flex-col gap-3">
        {eyebrow ? (
          <span className="inline-flex w-fit items-center rounded-full bg-brand-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm ring-1 ring-brand-200/50">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
