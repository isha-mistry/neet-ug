import "server-only";
import { cache } from "react";
import { getAllColleges } from "@/lib/data/colleges";
import { getStateMapStats, type StateMapStat } from "@/lib/data/state-map-stats";
import { getAllStates } from "@/lib/data/states";
import { aggregateCatalogSeatBreakdown } from "@/lib/mbbs/catalog-aggregates";
import { FOCUS_STATE_SLUGS, mbbsStatePath } from "@/lib/mbbs-state/constants";

export interface StateMapRichStat extends StateMapStat {
  govtColleges: number;
  govtSeats: number;
  pvtColleges: number;
  pvtSeats: number;
  aiqSeats: number;
  stateQuotaSeats: number;
  privateSeatSharePct: number;
  competitionLevel: string;
  counselingAuthority: string | null;
  counselingPortal: string | null;
  hasMbbsGuide: boolean;
  mbbsGuideHref: string | null;
  insight: string;
}

const COUNSELING_BY_SLUG: Record<string, { authority: string; portal: string }> = {
  gujarat: { authority: "ACPUGMEC", portal: "medadmgujarat.org" },
  rajasthan: { authority: "RUHS / REAP", portal: "ruhsraj.org" },
  "madhya-pradesh": { authority: "DMET MP", portal: "dme.mponline.gov.in" },
  maharashtra: { authority: "Maharashtra CET Cell", portal: "cetcell.mahacet.org" },
  karnataka: { authority: "KEA", portal: "kea.kar.nic.in" },
  "tamil-nadu": { authority: "TN DMER", portal: "tnmedicalselection.net" },
  telangana: { authority: "Kaloji Narayana Rao UHS", portal: "knruhs.telangana.gov.in" },
  "uttar-pradesh": { authority: "UPDGME", portal: "updgme.in" },
  kerala: { authority: "CEE Kerala", portal: "cee.kerala.gov.in" },
  delhi: { authority: "MCC (AIQ) + IPU/state", portal: "mcc.nic.in" },
  "west-bengal": { authority: "WBUHS", portal: "wbmcc.nic.in" },
  bihar: { authority: "BCECEB", portal: "bceceboard.bihar.gov.in" },
  orissa: { authority: "Odisha DMET", portal: "ojee.nic.in" },
};

function pickInsight(
  stat: StateMapStat,
  breakdown: ReturnType<typeof aggregateCatalogSeatBreakdown>,
  maxSeats: number,
  maxColleges: number
): string {
  if (stat.collegeCount === 0) return "No colleges in our catalog yet";
  if (breakdown.pvtColleges === 0 && breakdown.govtColleges > 0) {
    return "Government-only MBBS — predictable fees, limited private fallback";
  }
  if (stat.totalSeats >= maxSeats && maxSeats > 0) {
    return "Largest MBBS seat pool in our catalog";
  }
  if (stat.collegeCount >= maxColleges && maxColleges > 0) {
    return "Most medical colleges listed for this state";
  }
  const privateShare =
    breakdown.totalSeats > 0
      ? (breakdown.pvtSeats / breakdown.totalSeats) * 100
      : 0;
  if (privateShare >= 65) {
    return "Private-heavy — compare management fees & hospital attach early";
  }
  if (breakdown.govtSeats / Math.max(1, breakdown.totalSeats) >= 0.55) {
    return "Strong government capacity — domicile quota is key";
  }
  if (FOCUS_STATE_SLUGS.includes(stat.slug as (typeof FOCUS_STATE_SLUGS)[number])) {
    return "Detailed Dravio guide — cutoffs, domicile & fees";
  }
  return "85% state quota (domicile) · 15% AIQ via MCC";
}

function buildOneRichStat(
  stat: StateMapStat,
  breakdown: ReturnType<typeof aggregateCatalogSeatBreakdown>,
  competitionLevel: string,
  maxSeats: number,
  maxColleges: number
): StateMapRichStat {
  const counseling = COUNSELING_BY_SLUG[stat.slug] ?? null;
  const hasMbbsGuide = FOCUS_STATE_SLUGS.includes(
    stat.slug as (typeof FOCUS_STATE_SLUGS)[number]
  );
  const privateSeatSharePct =
    breakdown.totalSeats > 0
      ? Math.round((breakdown.pvtSeats / breakdown.totalSeats) * 100)
      : 0;

  return {
    ...stat,
    govtColleges: breakdown.govtColleges,
    govtSeats: breakdown.govtSeats,
    pvtColleges: breakdown.pvtColleges,
    pvtSeats: breakdown.pvtSeats,
    aiqSeats: breakdown.aiqSeats,
    stateQuotaSeats: breakdown.stateQuotaSeats,
    privateSeatSharePct,
    competitionLevel,
    counselingAuthority: counseling?.authority ?? null,
    counselingPortal: counseling?.portal ?? null,
    hasMbbsGuide,
    mbbsGuideHref: hasMbbsGuide ? mbbsStatePath(stat.slug) : null,
    insight: pickInsight(stat, breakdown, maxSeats, maxColleges),
  };
}

export const getRichStateMapStats = cache(async (): Promise<StateMapRichStat[]> => {
  const [base, colleges, states] = await Promise.all([
    getStateMapStats(),
    getAllColleges(),
    getAllStates(),
  ]);

  const competitionBySlug = new Map(states.map((s) => [s.slug, s.competitionLevel]));
  const maxSeats = Math.max(0, ...base.map((s) => s.totalSeats));
  const maxColleges = Math.max(0, ...base.map((s) => s.collegeCount));

  return base.map((stat) => {
    const breakdown = aggregateCatalogSeatBreakdown(colleges, stat.slug);
    const competitionLevel = competitionBySlug.get(stat.slug) ?? "Medium";
    return buildOneRichStat(stat, breakdown, competitionLevel, maxSeats, maxColleges);
  });
});
