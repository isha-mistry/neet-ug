import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
      className={`rounded-lg border shadow-sm p-6 ${
        bgVariant === "subtle"
          ? "border-clinical-outline bg-clinical-surface-low/70"
          : "border-clinical-outline bg-clinical-surface"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-surface-low text-clinical-muted ring-1 ring-clinical-outline/50">
          <MaterialSymbol name={iconName} size="sm" />
        </span>
        <h3 className="text-sm font-extrabold text-clinical-navy">{title}</h3>
      </div>

      {description && (
        <p className="mb-3 text-xs leading-relaxed text-clinical-muted">
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
            } gap-2.5 text-xs text-clinical-muted`}
          >
            {listType === "numbered-round" && (
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clinical-blue text-[10px] font-extrabold text-white">
                {i + 1}
              </span>
            )}
            {listType === "numbered-square" && (
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-clinical-outline bg-clinical-surface-low text-[10px] font-extrabold text-clinical-blue">
                {i + 1}
              </span>
            )}
            {listType === "checkmarks" && (
              <MaterialSymbol
                name="check"
                size="sm"
                className="text-clinical-blue shrink-0 mt-0.5"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
