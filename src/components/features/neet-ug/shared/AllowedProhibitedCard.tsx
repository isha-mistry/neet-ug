import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface ListItem {
  icon?: string;
  item: string;
}

interface AllowedProhibitedCardProps {
  /** Items shown in the green "allowed" card */
  allowed: ListItem[];
  /** Items shown in the red "prohibited" card */
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Allowed */}
      <Card
        padded={false}
        className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <MaterialSymbol name="check_circle" size="sm" />
          </span>
          <h3 className="font-extrabold text-emerald-900 text-sm">{allowedTitle}</h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {allowed.map((el, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
              {el.icon ? (
                <div className="w-6 h-6 rounded-md bg-white border border-emerald-100 flex items-center justify-center shrink-0">
                  <MaterialSymbol
                    name={el.icon}
                    size="sm"
                    className="text-emerald-600 text-[14px]"
                  />
                </div>
              ) : (
                <MaterialSymbol
                  name="check"
                  size="sm"
                  className="text-emerald-600 shrink-0 mt-0.5"
                />
              )}
              {el.item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Prohibited */}
      <Card
        padded={false}
        className="rounded-2xl border border-rose-100 bg-rose-50/30 p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
            <MaterialSymbol name="block" size="sm" />
          </span>
          <h3 className="font-extrabold text-rose-900 text-sm">{prohibitedTitle}</h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {prohibited.map((el, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
              {el.icon ? (
                <div className="w-6 h-6 rounded-md bg-white border border-rose-100 flex items-center justify-center shrink-0">
                  <MaterialSymbol
                    name={el.icon}
                    size="sm"
                    className="text-rose-500 text-[14px]"
                  />
                </div>
              ) : (
                <MaterialSymbol
                  name="close"
                  size="sm"
                  className="text-rose-500 shrink-0 mt-0.5"
                />
              )}
              {el.item}
            </li>
          ))}
        </ul>
        {footnote && (
          <div className="mt-4 pt-4 border-t border-rose-100">
            <p className="text-[11px] text-rose-700 leading-relaxed">
              <strong>Important:</strong> {footnote}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
