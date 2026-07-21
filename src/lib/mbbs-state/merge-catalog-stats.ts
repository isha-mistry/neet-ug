import { aggregateCatalogSeatBreakdown } from "@/lib/mbbs/catalog-aggregates";
import type { CollegeRecord } from "@/types/college";
import type { MbbsStateConfig } from "./types";

/** Overlay college/seat counts from the live catalog onto static editorial config. */
export function mergeMbbsStateConfigWithCatalog(
  config: MbbsStateConfig,
  colleges: CollegeRecord[]
): MbbsStateConfig {
  const breakdown = aggregateCatalogSeatBreakdown(colleges, config.slug);
  return {
    ...config,
    stats: {
      ...breakdown,
      ...config.stats,
    },
  };
}
