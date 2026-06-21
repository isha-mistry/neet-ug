"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "admission", label: "Cutoffs" },
  { id: "seats", label: "Seats" },
  { id: "fees", label: "Fees" },
  { id: "clinical", label: "Clinical" },
  { id: "counselling", label: "Counselling" },
] as const;

export function CollegeDetailSectionNav({
  showSeats,
  variant = "all",
}: {
  showSeats: boolean;
  variant?: "all" | "mobile" | "sidebar";
}) {
  const items = SECTIONS.filter((s) => s.id !== "seats" || showSeats);
  const showMobile = variant === "all" || variant === "mobile";
  const showSidebar = variant === "all" || variant === "sidebar";

  return (
    <>
      {showSidebar ? (
        <nav
          aria-label="On this page"
          className="hidden xl:flex flex-col gap-0.5 rounded-[14px] border border-outline-variant bg-surface-container-low p-3"
        >
          <span className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            On this page
          </span>
          {items.map((item) => (
            <SectionLink key={item.id} href={`#${item.id}`} className="px-2 py-1.5">
              {item.label}
            </SectionLink>
          ))}
        </nav>
      ) : null}

      {showMobile ? (
        <nav
          aria-label="Jump to section"
          className="flex gap-2 overflow-x-auto pb-1 xl:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <SectionLink
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-outline-variant bg-surface-container-lowest px-3.5 py-2 text-xs font-bold text-on-surface-variant"
            >
              {item.label}
            </SectionLink>
          ))}
        </nav>
      ) : null}
    </>
  );
}

function SectionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "text-sm font-semibold transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      {children}
    </a>
  );
}
