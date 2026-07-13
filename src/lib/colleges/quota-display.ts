import type { CollegeSeatMatrix } from "@/types/college";
import { applyNetStateQuotaDisplay } from "@/lib/catalog/seat-matrix-from-snapshot";

export interface SeatDistributionChip {
  label: string;
  quota: string;
  seats: string;
  variant: "brand" | "success";
}

function matrixForDisplay(matrix: CollegeSeatMatrix): CollegeSeatMatrix {
  return applyNetStateQuotaDisplay(matrix);
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

function chipsFromSingleMatrix(matrix: CollegeSeatMatrix): SeatDistributionChip[] {
  const chips: SeatDistributionChip[] = [];
  if (matrix.aiq > 0) chips.push(chip("AIQ", matrix.aiq, chips.length));
  if (matrix.stateQuota > 0) {
    chips.push(chip("State", matrix.stateQuota, chips.length));
  }
  if (matrix.goiQuota > 0) chips.push(chip("GOI", matrix.goiQuota, chips.length));
  if (matrix.esic > 0) chips.push(chip("ESIC", matrix.esic, chips.length));
  if (matrix.management > 0) {
    chips.push(chip("MQ", matrix.management, chips.length));
  }
  if (matrix.nri > 0) chips.push(chip("NRI", matrix.nri, chips.length));
  if (matrix.iqQuota > 0) chips.push(chip("IQ", matrix.iqQuota, chips.length));
  return chips;
}

function chipsFromDualMatrices(
  seatMatrix: CollegeSeatMatrix,
  mccSeatMatrix: CollegeSeatMatrix,
): SeatDistributionChip[] {
  const state = matrixForDisplay(seatMatrix);
  const mcc = matrixForDisplay(mccSeatMatrix);
  const chips: SeatDistributionChip[] = [];

  const aiq = mcc.aiq > 0 ? mcc.aiq : state.aiq;
  if (aiq > 0) chips.push(chip("AIQ", aiq, chips.length));
  if (state.stateQuota > 0) {
    chips.push(chip("State", state.stateQuota, chips.length));
  }
  if (state.goiQuota > 0) chips.push(chip("GOI", state.goiQuota, chips.length));
  if (state.esic > 0) chips.push(chip("ESIC", state.esic, chips.length));
  if (state.management > 0) {
    chips.push(chip("MQ", state.management, chips.length));
  }
  if (state.nri > 0) chips.push(chip("NRI", state.nri, chips.length));
  if (state.iqQuota > 0) chips.push(chip("IQ", state.iqQuota, chips.length));

  return chips;
}

/** Listing tiles: AIQ, state, ESIC, MQ, NRI, etc. Supports split state + MCC matrices. */
export function seatQuotaChipsFromMatrix(
  seatMatrix?: CollegeSeatMatrix,
  mccSeatMatrix?: CollegeSeatMatrix,
): SeatDistributionChip[] {
  if (seatMatrix && mccSeatMatrix) {
    return chipsFromDualMatrices(seatMatrix, mccSeatMatrix);
  }
  const single = seatMatrix ?? mccSeatMatrix;
  if (!single) return [];
  return chipsFromSingleMatrix(matrixForDisplay(single));
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

function splitQuotaAndSeats(part: string): { quota: string; seats: string } {
  const match = part.trim().match(/^(\S+)\s+(.+)$/);
  if (!match) return { quota: part.trim(), seats: "" };
  return { quota: match[1], seats: match[2] };
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

/** Quota line for college header (state + optional MCC matrix). */
export function formatCollegeQuotaLine(
  seatMatrix?: CollegeSeatMatrix,
  mccSeatMatrix?: CollegeSeatMatrix,
  fallbackQuotaInfo?: string,
): string {
  const chips = seatMatrix || mccSeatMatrix
    ? seatQuotaChipsFromMatrix(seatMatrix, mccSeatMatrix)
    : parseSeatDistributionChips(fallbackQuotaInfo ?? "");

  if (chips.length > 0) {
    return chips.map((c) => `${c.quota} ${c.seats}`).join(" · ");
  }
  return fallbackQuotaInfo?.trim() || "";
}
