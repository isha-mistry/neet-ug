import type { ListingQuota } from "@/types/filters";
import type { StateQuotaRow } from "./types";

export function filterStateQuotaRowsByQuota(
  rows: StateQuotaRow[],
  quota: ListingQuota | "all",
): StateQuotaRow[] {
  if (quota === "all") return rows;
  return rows.filter((r) => r.quota === quota);
}
