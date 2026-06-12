/** Normalized cutoff seat_type codes stored in app.cutoffs.seat_type */
export function normalizeRajasthanCutoffSeatType(raw: string): string {
  const t = raw.trim().toLowerCase();
  if (t === "gen. seat" || t === "gen seat") return "GEN";
  if (t === "govt. seat" || t === "govt seat") return "GOVT";
  if (t === "mgmt. seat" || t === "mgmt seat") return "MQ";
  if (t === "nri seat") return "NRI";
  return raw.trim();
}

/** Fee sheet seat_type → fee_line_items.seat_type */
export function mapRajasthanFeeSeatType(raw: string): string {
  const t = raw.trim().toLowerCase();
  if (t === "state quota") return "GQ";
  if (t === "mgt quota") return "MQ";
  if (t === "aiq") return "AIQ";
  if (t === "nri") return "NRI";
  if (t.startsWith("payment")) return "PAYMENT";
  return raw.trim();
}

export function rajasthanCutoffCategory(raw: string): string {
  return raw.trim();
}

export function rajasthanCounsellingQuota(raw: string): string {
  return raw.trim();
}

export function instituteTypeToCollegeType(
  instituteType: string,
  cutoffCollegeType?: string
): string {
  const fromCutoff = cutoffCollegeType?.trim().toLowerCase();
  if (fromCutoff === "government") return "government";
  if (fromCutoff === "private") return "private";

  const t = instituteType.trim().toLowerCase();
  if (t.includes("aiims")) return "aiims";
  if (t.includes("esic")) return "government";
  if (t.includes("state government")) return "government";
  if (t.includes("rajmes") || t.includes("medical education society")) {
    return "government";
  }
  if (t.includes("private")) return "private";
  return "private";
}

export function parseRajasthanOthersFee(
  raw: string
): { amount: number; currency: "INR" | "USD" } | null {
  const s = raw.trim();
  if (!s) return null;
  if (/usd/i.test(s)) return null;
  const n = Number(s.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return { amount: n, currency: "INR" };
}
