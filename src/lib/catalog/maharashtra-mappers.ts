import { normalizeMatchKey } from "@/lib/catalog/normalize-match-key";

export const MH_ACADEMIC_YEAR = 2025;

export function mhInstituteTypeToCollegeType(instituteType: string): string {
  const t = instituteType.trim().toLowerCase();
  if (t.includes("aiims")) return "aiims";
  if (t.includes("esic")) return "government";
  if (t.includes("state government")) return "government";
  if (t.includes("private")) return "private";
  return "private";
}

/** Normalize dump college names for matching (typos / spacing). */
export function normalizeMhDumpNameForMatch(raw: string): string {
  return raw
    .replace(/\\n/g, " ")
    .replace(/MedicalScience/gi, "Medical Science")
    .replace(/\s+/g, " ")
    .trim();
}

export function mhFeeCategory(raw: string): string {
  const c = raw.trim();
  if (!c) return "";
  const u = c.toUpperCase();
  if (u === "SEB") return "SEBC";
  if (u === "OPEN") return "Open";
  return u;
}

export function mhFeeGenderSeatType(
  collegeType: string,
  gender: string,
): string {
  const isGovt = collegeType.trim().toLowerCase() === "govt";
  if (!isGovt) return "PVT";
  const g = gender.trim().toLowerCase();
  if (g === "female") return "GOVT_F";
  if (g === "male") return "GOVT_M";
  return "GOVT";
}

type CollegeWithAliases = {
  collegeId: number;
  name: string;
  aliases: { matchKey: string; rawName: string }[];
};

export function resolveMhCollegeId(
  rawName: string,
  colleges: CollegeWithAliases[],
): number | null {
  const clean = normalizeMhDumpNameForMatch(rawName);
  const key = normalizeMatchKey(clean);

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

    const cityPart = clean.split(",").pop()?.trim();
    if (cityPart) {
      const cityTokens = normalizeMatchKey(cityPart)
        .split(" ")
        .filter((t) => t.length > 2);
      if (cityTokens.length > 0 && !cityTokens.some((t) => ck.includes(t))) {
        continue;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestId = c.collegeId;
    }
  }

  return bestId;
}

/** Seat matrix columns in `maharashtra_seat_data` COPY row order. */
export const MH_SEAT_BUCKET_COLUMNS: readonly [
  bucketCode: string,
  fieldIndex: number,
][] = [
  ["aiq", 3],
  ["state_quota", 4],
  ["esic_ip", 5],
  ["nri_quota", 6],
  ["open", 7],
  ["sc", 8],
  ["st", 9],
  ["obc", 10],
  ["vj", 11],
  ["nt", 12],
  ["def", 13],
  ["seb", 14],
  ["ews", 15],
  ["mk", 16],
  ["iq_quota", 17],
] as const;

/**
 * CAP seat-type / quota slice for `cutoffs.quota` (institutional, women, defence, etc.).
 */
export function maharashtraCutoffQuotaLabel(seatType: string): string {
  const s = seatType.trim();
  const u = s.toUpperCase();
  if (u === "I.Q." || u === "IQ") return "Institutional Quota";
  if (u.includes("(W)")) return "Women";
  if (u.startsWith("DEF") || u.includes("DEF")) return "Defence";
  if (u.startsWith("EM")) return "Economic Weaker";
  return "";
}
