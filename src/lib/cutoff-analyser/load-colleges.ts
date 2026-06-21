import "server-only";
import { getAllColleges } from "@/lib/data/colleges";
import { FOCUS_STATE_SLUGS } from "./constants";
import { toAnalyserCollege } from "./serialize";
import type { AnalyserCollege, FocusStateSlug } from "./types";

export async function loadAnalyserColleges(): Promise<AnalyserCollege[]> {
  const all = await getAllColleges();
  return all
    .filter((c) => FOCUS_STATE_SLUGS.includes(c.stateSlug as FocusStateSlug))
    .map(toAnalyserCollege);
}

export function buildFeeCollegesByState(
  colleges: AnalyserCollege[],
): Partial<Record<FocusStateSlug, AnalyserCollege[]>> {
  const out: Partial<Record<FocusStateSlug, AnalyserCollege[]>> = {};
  for (const slug of FOCUS_STATE_SLUGS) {
    out[slug] = colleges
      .filter((c) => c.stateSlug === slug && c.totalAnnualFee > 0)
      .sort((a, b) => a.totalAnnualFee - b.totalAnnualFee)
      .slice(0, 30);
  }
  return out;
}
