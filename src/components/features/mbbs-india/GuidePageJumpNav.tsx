"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface GuideJumpItem {
  id: string;
  label: string;
}

function useActiveJumpSection(jumpSections: readonly GuideJumpItem[]) {
  const sectionKey = jumpSections.map((s) => s.id).join("|");
  const [activeId, setActiveId] = useState<string>(jumpSections[0]?.id ?? "");

  useEffect(() => {
    const sectionIds = sectionKey.split("|").filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (elements.length === 0) return;

    const pickActive = () => {
      const anchor = window.scrollY + 120;
      let current = elements[0]!.id;
      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= anchor) current = el.id;
      }
      setActiveId(current);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);

    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [sectionKey]);

  return activeId;
}

export function GuidePageJumpNav({
  variant,
  jumpSections,
}: {
  variant: "horizontal" | "sidebar";
  jumpSections: readonly GuideJumpItem[];
}) {
  const activeId = useActiveJumpSection(jumpSections);

  const baseLink =
    variant === "sidebar"
      ? "block rounded-lg px-3 py-2 text-sm font-semibold leading-snug transition-colors"
      : "whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors";

  const inactiveLink =
    variant === "sidebar"
      ? "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
      : "text-on-surface-variant hover:bg-primary hover:text-on-primary";

  const activeLink =
    variant === "sidebar"
      ? "text-primary underline decoration-primary decoration-2 underline-offset-[6px]"
      : "bg-primary text-on-primary";

  if (variant === "sidebar") {
    return (
      <nav aria-label="On this page" className="py-2">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-outline">
          On this page
        </p>
        <ul className="flex flex-col gap-0.5 border-l border-outline-variant">
          {jumpSections.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(baseLink, isActive ? activeLink : inactiveLink)}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <ul className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {jumpSections.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className={cn(baseLink, isActive ? activeLink : inactiveLink)}
              aria-current={isActive ? "location" : undefined}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
