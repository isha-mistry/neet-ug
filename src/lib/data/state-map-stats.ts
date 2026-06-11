import "server-only";
import { cache } from "react";
import { getStateDirectoryItems } from "./directory";

export interface StateMapStat {
  slug: string;
  name: string;
  collegeCount: number;
  totalSeats: number;
  /** Populated on MBBS India map (catalog + counseling). */
  govtColleges?: number;
  govtSeats?: number;
  pvtColleges?: number;
  pvtSeats?: number;
  aiqSeats?: number;
  stateQuotaSeats?: number;
  privateSeatSharePct?: number;
  competitionLevel?: string;
  counselingAuthority?: string | null;
  counselingPortal?: string | null;
  hasMbbsGuide?: boolean;
  mbbsGuideHref?: string | null;
  insight?: string;
}

export const getStateMapStats = cache(async (): Promise<StateMapStat[]> => {
  const states = await getStateDirectoryItems();
  return states.map(({ slug, name, collegeCount, totalSeats }) => ({
    slug,
    name,
    collegeCount,
    totalSeats,
  }));
});
