"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StateCollegeTableRow } from "@/lib/mbbs-state/types";
import {
  guideTableClass,
  guideTableCollegeListColsClass,
  guideTableWrapClass,
} from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";

type TypeFilter = "all" | "Government" | "Private" | "Central (AIIMS)" | "Deemed University";
type SortKey = "name" | "seats";

interface StateCollegeTableProps {
  rows: StateCollegeTableRow[];
}

export function StateCollegeTable({ rows }: StateCollegeTableProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("seats");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const cities = useMemo(() => {
    const set = new Set(rows.map((r) => r.city).filter(Boolean));
    return [...set].sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (cityFilter !== "all" && r.city !== cityFilter) return false;
      if (q && !r.name.toLowerCase().includes(q)) return false;
      return true;
    });
    list.sort((a, b) => {
      if (sortKey === "name") {
        return sortDir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortDir === "asc"
        ? a.totalSeats - b.totalSeats
        : b.totalSeats - a.totalSeats;
    });
    return list;
  }, [rows, query, typeFilter, cityFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
          <span className="font-semibold text-on-surface">Search college</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="College name…"
            className="rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-on-surface">Type</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            <option value="all">All</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Central (AIIMS)">Central</option>
            <option value="Deemed University">Deemed</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-on-surface">City</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="max-w-[180px] rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-xs text-on-surface-variant">
        Showing {formatNumber(filtered.length)} of {formatNumber(rows.length)} colleges
      </p>
      <div className={guideTableWrapClass}>
        <table
          className={cn(
            guideTableClass,
            guideTableCollegeListColsClass,
            "min-w-[960px] text-xs sm:text-sm"
          )}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>
                <button
                  type="button"
                  onClick={() => toggleSort("name")}
                  className={cn(
                    "inline-flex w-full items-center justify-start gap-1 font-bold transition-colors",
                    sortKey === "name" ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  College {sortKey === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>Type</th>
              <th>City</th>
              <th>University</th>
              <th>
                <button
                  type="button"
                  onClick={() => toggleSort("seats")}
                  className={cn(
                    "inline-flex w-full items-center justify-end gap-1 font-bold transition-colors",
                    sortKey === "seats" ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  Seats {sortKey === "seats" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>AIQ</th>
              <th>State</th>
              <th>MQ</th>
              <th>NRI</th>
              <th>NMC</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.slug}>
                <td className="tabular-nums text-on-surface-variant">{i + 1}</td>
                <td className="max-w-[220px] font-medium">
                  <Link href={`/colleges/${row.slug}`} className="text-primary hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td>{row.type}</td>
                <td>{row.city}</td>
                <td className="max-w-[160px] text-on-surface-variant">{row.university}</td>
                <td className="tabular-nums font-semibold">{formatNumber(row.totalSeats)}</td>
                <td className="tabular-nums">{formatNumber(row.aiqSeats)}</td>
                <td className="tabular-nums">{formatNumber(row.stateSeats)}</td>
                <td className="tabular-nums">{formatNumber(row.mqSeats)}</td>
                <td className="tabular-nums">{formatNumber(row.nriSeats)}</td>
                <td>{row.nmcStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
