import { getAllColleges } from "@/lib/data/colleges";
import type { CollegeRecord } from "@/types/college";

export type CollegeDataQualityFlag = NonNullable<
  CollegeRecord["dataQuality"]
>[number];

export interface CollegeQualityRow {
  slug: string;
  name: string;
  stateSlug: string;
  flags: string[];
}

export interface CollegeQualitySummary {
  totalColleges: number;
  gujaratColleges: number;
  withCutoffs: number;
  withFees: number;
  withGujaratCutoffs: number;
  withGujaratFees: number;
  flagged: CollegeQualityRow[];
  byFlag: Record<string, CollegeQualityRow[]>;
}

function hasFlag(college: CollegeRecord, flag: string): boolean {
  return college.dataQuality?.includes(flag) ?? false;
}

export async function getCollegeQualitySummary(): Promise<CollegeQualitySummary> {
  const colleges = await getAllColleges();
  const flagged: CollegeQualityRow[] = [];
  const byFlag: Record<string, CollegeQualityRow[]> = {};

  for (const college of colleges) {
    const flags = college.dataQuality ?? [];
    if (!flags.length) continue;
    const row = {
      slug: college.slug,
      name: college.name,
      stateSlug: college.stateSlug,
      flags,
    };
    flagged.push(row);
    for (const flag of flags) {
      if (!byFlag[flag]) byFlag[flag] = [];
      byFlag[flag].push(row);
    }
  }

  flagged.sort((a, b) => a.name.localeCompare(b.name));

  return {
    totalColleges: colleges.length,
    gujaratColleges: colleges.filter((c) => c.stateSlug === "gujarat").length,
    withCutoffs: colleges.filter((c) => c.cutoffs.length > 0).length,
    withFees: colleges.filter((c) => c.fees.totalAnnual > 0).length,
    withGujaratCutoffs: colleges.filter((c) =>
      hasFlag(c, "HAS_GUJARAT_CUTOFFS")
    ).length,
    withGujaratFees: colleges.filter((c) => hasFlag(c, "HAS_GUJARAT_FEES"))
      .length,
    flagged,
    byFlag,
  };
}
