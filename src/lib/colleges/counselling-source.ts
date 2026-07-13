/**
 * Canonical `source` tags for fact tables (fees, seats, cutoffs).
 * Mirrors fee_schedules.source — bifurcates MCC vs state counselling at DB level.
 */

export const MCC_CSV_SOURCE = "mcc_csv";
/** Legacy tag from earlier backfill runs — migrated to `mcc_csv`. */
export const MCC_PRODUCTION_SOURCE = "mcc_production";

export const GUJARAT_DUMP_SOURCE = "gujarat_dump";
export const RAJASTHAN_DUMP_SOURCE = "rajasthan_dump";
export const MP_DUMP_SOURCE = "mp_dump";
export const MH_DUMP_SOURCE = "mh_dump";

export const KARNATAKA_DUMP_SOURCE = "karnataka_dump";
export const UP_DUMP_SOURCE = "up_dump";

export const LEGACY_EMPTY_SOURCE = "";

const MCC_FACT_SOURCES = new Set([MCC_CSV_SOURCE, MCC_PRODUCTION_SOURCE]);

const STATE_PRODUCTION_SUFFIX = "_production";
const STATE_DUMP_SUFFIX = "_dump";

const STATE_DUMP_SOURCES = new Set([
  GUJARAT_DUMP_SOURCE,
  RAJASTHAN_DUMP_SOURCE,
  MP_DUMP_SOURCE,
  MH_DUMP_SOURCE,
  KARNATAKA_DUMP_SOURCE,
  UP_DUMP_SOURCE,
  "karnataka_data.sql",
  "up_data.sql",
]);

/** Production state slugs that use `{short}_dump` after backfill. */
export const PRODUCTION_STATE_SLUGS = [
  "gujarat",
  "rajasthan",
  "madhya-pradesh",
  "maharashtra",
] as const;

const PRODUCTION_STATE_FACT_SOURCES: Record<
  (typeof PRODUCTION_STATE_SLUGS)[number],
  string
> = {
  gujarat: GUJARAT_DUMP_SOURCE,
  rajasthan: RAJASTHAN_DUMP_SOURCE,
  "madhya-pradesh": MP_DUMP_SOURCE,
  maharashtra: MH_DUMP_SOURCE,
};

/** @deprecated Use `stateFactSourceForSlug`. */
export function stateProductionSourceForSlug(stateSlug: string): string {
  return (
    stateFactSourceForSlug(stateSlug) ??
    `${stateSlug}${STATE_PRODUCTION_SUFFIX}`
  );
}

export function stateFactSourceForSlug(
  stateSlug: string | undefined | null,
): string | null {
  if (!stateSlug) return null;
  if (
    PRODUCTION_STATE_SLUGS.includes(
      stateSlug as (typeof PRODUCTION_STATE_SLUGS)[number],
    )
  ) {
    return PRODUCTION_STATE_FACT_SOURCES[
      stateSlug as (typeof PRODUCTION_STATE_SLUGS)[number]
    ];
  }
  if (stateSlug === "karnataka") return KARNATAKA_DUMP_SOURCE;
  if (stateSlug === "uttar-pradesh") return UP_DUMP_SOURCE;
  return null;
}

export function isMccFactSource(source: string | undefined | null): boolean {
  return source != null && MCC_FACT_SOURCES.has(source);
}

export function isStateFactSource(source: string | undefined | null): boolean {
  if (source == null || source === "") return false;
  if (isMccFactSource(source)) return false;
  if (STATE_DUMP_SOURCES.has(source)) return true;
  if (source.endsWith(STATE_PRODUCTION_SUFFIX)) return true;
  if (source.endsWith(STATE_DUMP_SUFFIX)) return true;
  return false;
}

/** Preferred state dump source when seeding from SQL files. */
export function stateDumpSourceForSlug(
  stateSlug: string | undefined | null,
): string | null {
  return stateFactSourceForSlug(stateSlug);
}

export function pickPreferredStateSource(
  stateSlug: string,
  sources: string[],
): string | undefined {
  const dump = stateFactSourceForSlug(stateSlug);
  if (dump && sources.includes(dump)) return dump;
  const legacyProduction = `${stateSlug}${STATE_PRODUCTION_SUFFIX}`;
  if (sources.includes(legacyProduction)) return legacyProduction;
  return sources.find((s) => isStateFactSource(s));
}

export function isProductionStateSlug(
  stateSlug: string | undefined | null,
): boolean {
  return (
    stateSlug != null &&
    PRODUCTION_STATE_SLUGS.includes(
      stateSlug as (typeof PRODUCTION_STATE_SLUGS)[number],
    )
  );
}

export function pickPreferredMccSource(sources: string[]): string | undefined {
  if (sources.includes(MCC_CSV_SOURCE)) return MCC_CSV_SOURCE;
  if (sources.includes(MCC_PRODUCTION_SOURCE)) return MCC_PRODUCTION_SOURCE;
  return sources.find((s) => isMccFactSource(s));
}

/** GJ/RJ/MP/MH use `mcc_csv` from backup split; ignore legacy `mcc_production`. */
export function pickPreferredMccSourceForState(
  stateSlug: string,
  sources: string[],
): string | undefined {
  if (isProductionStateSlug(stateSlug)) {
    if (sources.includes(MCC_CSV_SOURCE)) return MCC_CSV_SOURCE;
    return sources.find(
      (s) => isMccFactSource(s) && s !== MCC_PRODUCTION_SOURCE,
    );
  }
  return pickPreferredMccSource(sources);
}
