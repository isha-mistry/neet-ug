import "server-only";
import { cache } from "react";
import { getStateDirectoryItems } from "./directory";

export interface StateMapStat {
  slug: string;
  name: string;
  collegeCount: number;
  totalSeats: number;
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
