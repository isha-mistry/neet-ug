import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import {
  neetIconTileClass,
  neetRiskSurfaceClass,
  neetSuccessSurfaceClass,
} from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface ListItem {
  icon?: string;
  item: string;
}

interface AllowedProhibitedCardProps {
  /** Items shown in the success card */
  allowed: ListItem[];
  /** Items shown in the risk card */
  prohibited: ListItem[];
  allowedTitle?: string;
  prohibitedTitle?: string;
  /** Optional footnote text shown below the prohibited card */
  footnote?: string;
}

export function AllowedProhibitedCard({
  allowed,
  prohibited,
  allowedTitle = "Allowed",
  prohibitedTitle = "Not Allowed",
  footnote,
}: AllowedProhibitedCardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card
        padded={false}
        className={cn("p-6", neetSuccessSurfaceClass)}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className={cn(neetIconTileClass, "h-10 w-10 bg-tertiary-fixed text-tertiary")}>
            <MaterialSymbol name="check_circle" size="sm" />
          </span>
          <h3 className="text-[16.5px] font-extrabold tracking-[-0.01em] text-on-surface">
            {allowedTitle}
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {allowed.map((el, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-on-surface-variant">
              <MaterialSymbol name="chevron_right" size="sm" className="mt-0.5 shrink-0 text-tertiary" />
              {el.item}
            </li>
          ))}
        </ul>
      </Card>

      <Card padded={false} className={cn("p-6", neetRiskSurfaceClass)}>
        <div className="mb-4 flex items-center gap-3">
          <span className={cn(neetIconTileClass, "h-10 w-10 bg-error-container text-error")}>
            <MaterialSymbol name="block" size="sm" />
          </span>
          <h3 className="text-[16.5px] font-extrabold tracking-[-0.01em] text-on-surface">
            {prohibitedTitle}
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {prohibited.map((el, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-on-surface-variant">
              <MaterialSymbol name="chevron_right" size="sm" className="mt-0.5 shrink-0 text-error" />
              {el.item}
            </li>
          ))}
        </ul>
        {footnote && (
          <div className="mt-4 border-t border-error/20 pt-4">
            <p className="text-xs leading-relaxed text-on-error-container">
              <strong className="font-bold">Important:</strong> {footnote}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}