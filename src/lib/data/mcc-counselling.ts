import rawData from "@/data/mcc-counselling-guide.json";

export interface MccAbbreviation {
  abbr: string;
  full: string;
}

export interface MccChapterIndexEntry {
  chapter: number;
  title: string;
  sections?: string[];
  href: string;
}

export interface MccReservationCategory {
  category: string;
  percentage: string;
}

export interface MccConversionRule {
  from: string;
  to: string;
}

export interface MccCounsellingRound {
  id: string;
  name: string;
  description: string;
}

export interface MccScopeItem {
  category: string;
  institutions: string;
}

export interface MccCentralInstitute {
  id: string;
  name: string;
  colleges?: string;
  aiqShare?: string;
  institutionalShare?: string;
  institutionalRule?: string;
  reservationPolicy?: string;
  cwNote?: string;
  roster?: string;
}

export interface MccChapterBase {
  chapter: number;
  slug: string;
  title: string;
  summary: string;
  eligibility?: string[];
  reservationPolicy?: string | { note?: string; minorityNote?: string; openSeats?: string; internalQuota?: string };
  conversionAlgorithm?: string | MccConversionRule[];
  conversionNote?: string;
  conversionExtra?: MccConversionRule[];
  roster?: string;
  nominationNote?: string;
  advisory?: string;
  foreignNationalNote?: string;
  seatMatrix?: string;
  stateQuotaNote?: string;
  openSeatsDomicileFree?: string[];
  disclaimers?: string[];
  cwConversion?: MccConversionRule[];
  institutes?: MccCentralInstitute[];
  internalProcess?: string;
  process?: string[];
  reservationNote?: string;
}

export interface MccCounsellingGuide {
  meta: {
    title: string;
    academicYear: string;
    source: string;
    sourceUrl: string;
    documentNote: string;
  };
  candidateGuidelines: string[];
  abbreviations: MccAbbreviation[];
  chapterIndex: MccChapterIndexEntry[];
  introduction: {
    title: string;
    summary: string;
    points: string[];
  };
  roleOfMcc: {
    title: string;
    summary: string;
    scope: MccScopeItem[];
    limitation: string;
  };
  centralReservation: {
    title: string;
    categories: MccReservationCategory[];
  };
  standardConversion: MccConversionRule[];
  ociParity: {
    judgment: string;
    summary: string;
  };
  counsellingRounds: {
    count: number;
    rounds: MccCounsellingRound[];
  };
  chapters: {
    aiq: MccChapterBase;
    deemed: MccChapterBase;
    aiims: MccChapterBase;
    esic: MccChapterBase;
    centralUniversities: MccChapterBase;
    amu: MccChapterBase;
    bhu: MccChapterBase;
    afmc: MccChapterBase;
    jipmer: MccChapterBase;
  };
}

export const mccCounsellingGuide = rawData as unknown as MccCounsellingGuide;

export function getMccChapterConversionRules(
  chapter: MccChapterBase,
): MccConversionRule[] {
  const algo = chapter.conversionAlgorithm;
  if (Array.isArray(algo)) {
    return algo;
  }

  const base = [...mccCounsellingGuide.standardConversion];
  if (algo === "standardWithNri") {
    return [...base, { from: "NRI", to: "UR" }];
  }
  if (algo === "standardWithForeign" && chapter.conversionExtra) {
    return [...base, ...chapter.conversionExtra];
  }
  if (algo === "standard") {
    return base;
  }
  return base;
}

export function getCentralReservationCategories(): MccReservationCategory[] {
  return mccCounsellingGuide.centralReservation.categories;
}
