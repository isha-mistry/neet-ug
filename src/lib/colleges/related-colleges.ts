import type { CollegeRecord } from "@/types/college";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";

function anchorRank(record: CollegeRecord): number {
  const latest = pickDisplayCutoff(record, {});
  return latest?.rank ?? Number.MAX_SAFE_INTEGER;
}

/** Peer colleges in the same state, ranked by cutoff proximity to the current college. */
export function pickRelatedColleges(
  current: CollegeRecord,
  catalog: CollegeRecord[],
  limit = 4
): CollegeRecord[] {
  const anchor = anchorRank(current);

  return catalog
    .filter((c) => c.slug !== current.slug)
    .filter(
      (c) =>
        c.stateSlug === current.stateSlug ||
        c.collegeType === current.collegeType
    )
    .sort((a, b) => {
      const stateBoost =
        Number(b.stateSlug === current.stateSlug) -
        Number(a.stateSlug === current.stateSlug);
      if (stateBoost !== 0) return stateBoost;
      const diffA = Math.abs(anchorRank(a) - anchor);
      const diffB = Math.abs(anchorRank(b) - anchor);
      if (diffA !== diffB) return diffA - diffB;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}
