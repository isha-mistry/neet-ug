import type { CollegeSeatMatrix } from "@/types/college";

export interface SeatDistributionChip {
  label: string;
  quota: string;
  seats: string;
  variant: "brand" | "success";
}

function chip(
  quota: string,
  seats: number,
  index: number,
): SeatDistributionChip {
  return {
    label: `${quota} ${seats}`,
    quota,
    seats: String(seats),
    variant: index % 2 === 0 ? "brand" : "success",
  };
}

/** Listing tiles: AIQ, state, ESIC, MQ, and NRI when present. */
export function seatQuotaChipsFromMatrix(
  matrix: CollegeSeatMatrix,
): SeatDistributionChip[] {
  const chips: SeatDistributionChip[] = [];
  if (matrix.aiq > 0) chips.push(chip("AIQ", matrix.aiq, chips.length));
  if (matrix.goiQuota > 0) {
    chips.push(chip("GOI", matrix.goiQuota, chips.length));
  }
  if (matrix.stateQuota > 0) {
    chips.push(chip("State", matrix.stateQuota, chips.length));
  }
  if (matrix.esic > 0) chips.push(chip("ESIC", matrix.esic, chips.length));
  if (matrix.management > 0) {
    chips.push(chip("MQ", matrix.management, chips.length));
  }
  if (matrix.nri > 0) chips.push(chip("NRI", matrix.nri, chips.length));
  if (matrix.iqQuota > 0) {
    chips.push(chip("IQ", matrix.iqQuota, chips.length));
  }
  return chips;
}

function listingQuotaHead(
  part: string,
): "aiq" | "state" | "esic" | "mq" | "nri" | null {
  const lower = part.trim().toLowerCase();
  if (lower.startsWith("aiq")) return "aiq";
  if (lower.startsWith("state")) return "state";
  if (lower.startsWith("esic")) return "esic";
  if (lower.startsWith("mq") || lower.startsWith("management")) return "mq";
  if (lower.startsWith("nri")) return "nri";
  return null;
}

/** Fallback when only `quotaInfo` text is available (no assembled matrix). */
export function parseSeatDistributionChips(
  quotaInfo: string,
): SeatDistributionChip[] {
  const parts = quotaInfo.split("/").map((p) => p.trim()).filter(Boolean);
  const order: Record<
    "aiq" | "state" | "esic" | "mq" | "nri",
    string | null
  > = {
    aiq: null,
    state: null,
    esic: null,
    mq: null,
    nri: null,
  };

  for (const part of parts) {
    const kind = listingQuotaHead(part);
    if (kind) order[kind] = part;
  }

  const ordered = (["aiq", "state", "esic", "mq", "nri"] as const)
    .map((k) => order[k])
    .filter((p): p is string => Boolean(p));

  if (ordered.length === 0) return [];

  return ordered.map((part, index) => {
    const parsed = splitQuotaAndSeats(part);
    const quota =
      parsed.quota.toLowerCase() === "management" ? "MQ" : parsed.quota;
    return {
      label: part,
      quota,
      seats: parsed.seats,
      variant: index % 2 === 0 ? "brand" : "success",
    };
  });
}

function splitQuotaAndSeats(part: string): { quota: string; seats: string } {
  const match = part.trim().match(/^(\S+)\s+(.+)$/);
  if (!match) return { quota: part.trim(), seats: "" };
  return { quota: match[1], seats: match[2] };
}
