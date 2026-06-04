export interface SeatDistributionChip {
  label: string;
  quota: string;
  seats: string;
  variant: "brand" | "success";
}

function isAiqOrStateQuotaPart(part: string): boolean {
  const head = part.trim().split(/\s+/)[0]?.toLowerCase();
  return head === "aiq" || head === "state";
}

/** AIQ and State quota seats only (excludes Open, SC, ST, SEBC, EWS, MQ, NRI, etc.). */
export function parseSeatDistributionChips(
  quotaInfo: string
): SeatDistributionChip[] {
  const parts = quotaInfo.split("/").map((p) => p.trim()).filter(Boolean);
  const quotaParts = parts.filter(isAiqOrStateQuotaPart);
  if (quotaParts.length === 0) return [];

  return quotaParts.map((part, index) => {
    const parsed = splitQuotaAndSeats(part);
    return {
      label: part,
      quota: parsed.quota,
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
