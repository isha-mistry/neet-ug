import { normalizeMatchKey } from "@/lib/catalog/normalize-match-key";

export const MP_ACADEMIC_YEAR = 2025;

export function mpInstituteTypeToCollegeType(instituteType: string): string {
  const t = instituteType.trim().toLowerCase();
  if (t.includes("aiims")) return "aiims";
  if (t.includes("esic")) return "government";
  if (t.includes("state government")) return "government";
  if (t.includes("private")) return "private";
  return "private";
}

/** Map mp_data `fee_type` to fee_line_items.seat_type (distinct from GQ/MQ). */
export function mpFeeTypeToSeatType(feeType: string): string {
  const t = feeType.trim().toLowerCase();
  if (t === "nri") return "NRI";
  if (t === "scholarship") return "SCH";
  return "REG";
}

export function mpFeeCategory(raw: string): string {
  const c = raw.trim();
  if (!c) return "";
  return c.toUpperCase();
}

type CollegeWithAliases = {
  collegeId: number;
  name: string;
  aliases: { matchKey: string; rawName: string }[];
};

/**
 * Match spine colleges to dump names without a canonical map; dump spelling wins.
 */
export function resolveMpCollegeId(
  rawName: string,
  colleges: CollegeWithAliases[],
): number | null {
  const key = normalizeMatchKey(rawName);
  for (const c of colleges) {
    if (normalizeMatchKey(c.name) === key) return c.collegeId;
    for (const a of c.aliases) {
      if (a.matchKey === key || normalizeMatchKey(a.rawName) === key) {
        return c.collegeId;
      }
    }
  }

  const dumpTokens = key.split(" ").filter((t) => t.length > 2);
  if (dumpTokens.length === 0) return null;

  let bestId: number | null = null;
  let bestScore = 0;

  for (const c of colleges) {
    const ck = normalizeMatchKey(c.name);
    let score = 0;
    for (const t of dumpTokens) {
      if (ck.includes(t)) score += 1;
    }
    if (score < 3) continue;

    const cityPart = rawName.split(",").pop()?.trim();
    if (cityPart) {
      const cityKey = normalizeMatchKey(cityPart);
      const cityTokens = cityKey.split(" ").filter((t) => t.length > 2);
      const cityHit = cityTokens.some((t) => ck.includes(t));
      if (cityTokens.length > 0 && !cityHit) continue;
    }

    if (score > bestScore) {
      bestScore = score;
      bestId = c.collegeId;
    }
  }

  return bestId;
}

export const MP_SEAT_BUCKET_COLUMNS: readonly [bucketCode: string, fieldIndex: number][] =
  [
    ["aiq", 3],
    ["goi_quota", 4],
    ["state_quota", 5],
    ["esic_ip", 6],
    ["nri_quota", 7],
    ["open", 8],
    ["sc", 9],
    ["st", 10],
    ["obc", 11],
    ["ews", 12],
    ["mqt_quota", 13],
    ["mbc", 14],
    ["pwd", 15],
    ["sainik", 16],
    ["ff", 17],
    ["gs", 18],
  ] as const;
