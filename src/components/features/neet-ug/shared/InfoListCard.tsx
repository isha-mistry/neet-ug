import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetCardClass, neetIconTileClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface InfoListCardProps {
  iconName: string;
  title: string;
  description?: string;
  items: string[];
  listType?: "numbered-round" | "numbered-square" | "checkmarks";
  layoutType?: "column" | "grid";
  bgVariant?: "default" | "subtle";
}

export function InfoListCard({
  iconName,
  title,
  description,
  items,
  listType = "numbered-round",
  layoutType = "column",
  bgVariant = "default",
}: InfoListCardProps) {
  const isGrid = layoutType === "grid";

  return (
    <div
      className={cn(neetCardClass, bgVariant === "subtle" && "bg-surface-container-low")}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className={cn(neetIconTileClass, "h-10 w-10")}>
          <MaterialSymbol name={iconName} size="sm" />
        </span>
        <h3 className="text-[16.5px] font-extrabold tracking-[-0.01em] text-on-surface">{title}</h3>
      </div>

      {description && (
        <p className="mb-4 text-sm leading-[1.6] text-on-surface-variant">
          {description}
        </p>
      )}

      <ul
        className={
          isGrid
            ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5"
            : "flex flex-col gap-2.5"
        }
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex ${
              listType === "checkmarks" ? "items-center" : "items-start"
            } gap-2.5 text-sm leading-relaxed text-on-surface-variant`}
          >
            {listType === "numbered-round" && (
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-on-primary">
                {i + 1}
              </span>
            )}
            {listType === "numbered-square" && (
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-outline-variant bg-primary-fixed text-[10px] font-extrabold text-primary">
                {i + 1}
              </span>
            )}
            {listType === "checkmarks" && (
              <MaterialSymbol
                name="check"
                size="sm"
                className="mt-0.5 shrink-0 text-primary"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
