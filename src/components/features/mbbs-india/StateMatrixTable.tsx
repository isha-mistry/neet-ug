"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StateMatrixRow } from "@/lib/mbbs-india/state-matrix";
import {
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableWrapClass,
} from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";

type SortKey = keyof Pick<
  StateMatrixRow,
  | "name"
  | "totalColleges"
  | "totalSeats"
  | "govtColleges"
  | "govtSeats"
  | "privateColleges"
  | "privateSeats"
>;

interface StateMatrixTableProps {
  rows: StateMatrixRow[];
  totals: StateMatrixRow;
}

export function StateMatrixTable({ rows, totals }: StateMatrixTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("totalSeats");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? rows.filter((r) => r.name.toLowerCase().includes(q))
      : [...rows];
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      const na = Number(av);
      const nb = Number(bv);
      return sortDir === "asc" ? na - nb : nb - na;
    });
    return list;
  }, [rows, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function headerCell(key: SortKey, label: string, align: "left" | "right" = "right") {
    const active = sortKey === key;
    return (
      <th scope="col">
        <button
          type="button"
          onClick={() => toggleSort(key)}
          className={cn(
            "inline-flex w-full items-center gap-1 transition-colors",
            align === "left" ? "justify-start" : "justify-end",
            active ? "text-white font-bold" : "text-white/80 hover:text-white"
          )}
        >
          {label}
          {active ? (sortDir === "asc" ? " ↑" : " ↓") : null}
        </button>
      </th>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex max-w-md flex-col gap-1.5 text-sm">
        <span className="font-semibold text-on-surface">Search state or UT</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Gujarat, Karnataka…"
          className="rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
        />
      </label>
      <div className={guideTableWrapClass}>
        <table
          className={cn(
            guideTableClass,
            guideTableLabelNumericColsClass,
            "min-w-[720px] table-fixed"
          )}
        >
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[11%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr>
              {headerCell("name", "State / UT", "left")}
              {headerCell("totalColleges", "Colleges")}
              {headerCell("totalSeats", "Seats")}
              {headerCell("govtColleges", "Govt coll.")}
              {headerCell("govtSeats", "Govt seats")}
              {headerCell("privateColleges", "Pvt coll.")}
              {headerCell("privateSeats", "Pvt seats")}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.slug}>
                <td className="font-medium">
                  <Link href={`/colleges/state/${row.slug}`} className="text-primary hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td className="tabular-nums">{formatNumber(row.totalColleges)}</td>
                <td className="tabular-nums font-semibold text-on-surface">
                  {formatNumber(row.totalSeats)}
                </td>
                <td className="tabular-nums">{formatNumber(row.govtColleges)}</td>
                <td className="tabular-nums">{formatNumber(row.govtSeats)}</td>
                <td className="tabular-nums">{formatNumber(row.privateColleges)}</td>
                <td className="tabular-nums">{formatNumber(row.privateSeats)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-primary-fixed/35 font-semibold text-on-surface">
            <tr className="border-t-2 border-outline-variant">
              <td>{totals.name}</td>
              <td className="tabular-nums">{formatNumber(totals.totalColleges)}</td>
              <td className="tabular-nums">{formatNumber(totals.totalSeats)}</td>
              <td className="tabular-nums">{formatNumber(totals.govtColleges)}</td>
              <td className="tabular-nums">{formatNumber(totals.govtSeats)}</td>
              <td className="tabular-nums">{formatNumber(totals.privateColleges)}</td>
              <td className="tabular-nums">{formatNumber(totals.privateSeats)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
