import * as XLSX from "xlsx";
import { getAllColleges } from "@/lib/data/colleges";
import {
  cutoffMatchesListingQuota,
  parseMainCounsellingRound,
  pickPreferredRoundCutoff,
} from "@/lib/colleges/cutoff-context";
import { matchesSelectedCategory } from "@/lib/colleges/categories";
import type { CollegePredictorUnlockedResult } from "@/lib/college-predictor/types";
import type {
  CollegeCutoff,
  CollegeFees,
  CollegeRecord,
  CollegeSeatMatrix,
} from "@/types/college";
import type { CollegeSummary } from "@/types/listing";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { CategoryFilter } from "@/lib/colleges/categories";

function blankSeatCols(prefix: string) {
  return {
    [`${prefix} AIQ seats`]: "",
    [`${prefix} State quota seats`]: "",
    [`${prefix} Management seats`]: "",
    [`${prefix} NRI seats`]: "",
    [`${prefix} ESIC seats`]: "",
    [`${prefix} GOI seats`]: "",
    [`${prefix} IQ seats`]: "",
  };
}

function seatCols(prefix: string, matrix: CollegeSeatMatrix | undefined) {
  if (!matrix) return blankSeatCols(prefix);
  return {
    [`${prefix} AIQ seats`]: matrix.aiq || "",
    [`${prefix} State quota seats`]: matrix.stateQuota || "",
    [`${prefix} Management seats`]: matrix.management || "",
    [`${prefix} NRI seats`]: matrix.nri || "",
    [`${prefix} ESIC seats`]: matrix.esic || "",
    [`${prefix} GOI seats`]: matrix.goiQuota || "",
    [`${prefix} IQ seats`]: matrix.iqQuota || "",
  };
}

function feeCols(fees: CollegeFees | undefined) {
  if (!fees) {
    return {
      Tuition: "",
      Hostel: "",
      "Hostel (AC)": "",
      "Hostel (non-AC)": "",
      Mess: "",
      Misc: "",
      "Admission fee": "",
      "Security deposit": "",
      Library: "",
      University: "",
      Transport: "",
      Exam: "",
      "Govt quota annual (INR)": "",
      "Management quota annual (INR)": "",
      "NRI fee": "",
      "NRI currency": "",
      "Total course fee": "",
    };
  }

  const qb = fees.quotaBreakdown;
  const nriAmount = qb?.nri?.amount ?? fees.nriFees ?? "";
  const nriCurrency = qb?.nri?.currency ?? fees.nriCurrency ?? "";

  return {
    Tuition: fees.tuition || fees.gqFees || "",
    Hostel: fees.hostelFees ?? fees.hostel ?? "",
    "Hostel (AC)": fees.hostelAcFees ?? "",
    "Hostel (non-AC)": fees.hostelNonAcFees ?? "",
    Mess: fees.messFees ?? "",
    Misc: fees.misc || "",
    "Admission fee": fees.admissionFees ?? "",
    "Security deposit": fees.securityDeposit ?? "",
    Library: fees.libraryFees ?? "",
    University: fees.universityFees ?? "",
    Transport: fees.transportFees ?? "",
    Exam: fees.examFees ?? "",
    "Govt quota annual (INR)":
      qb?.govtQuotaAnnualInr || fees.gqFees || "",
    "Management quota annual (INR)":
      qb?.managementQuotaAnnualInr || fees.mqFees || "",
    "NRI fee": nriAmount,
    "NRI currency": nriCurrency,
    "Total course fee": fees.totalCourse || "",
  };
}

/** PwD / PH horizontal variants stored as separate DB categories (e.g. SEPH, SCPH). */
function isPwdDbCategory(dbCategory?: string | null): boolean {
  const value = (dbCategory ?? "").trim().toLowerCase();
  if (!value) return false;
  return /(?:^|[^a-z])(?:ph|pwd|pwbd)(?:$|[^a-z])/.test(value) || /ph$/.test(value);
}

function sameDbCategory(a?: string | null, b?: string | null): boolean {
  return (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();
}

function categoryFilterForNeet(category: NeetCategory): CategoryFilter | null {
  if (category === "pwbd") return null;
  if (
    category === "general" ||
    category === "ews" ||
    category === "obc" ||
    category === "sc" ||
    category === "st"
  ) {
    return category;
  }
  return null;
}

/**
 * Prefer the non-PwD DB row for social categories (OBC vs OBC-PwD / SEPH).
 * Falls back to the preferred round cutoff used by the predictor.
 */
function findMatchedCutoff(
  record: CollegeRecord,
  category: NeetCategory,
  pool: "state" | "aiq",
): CollegeCutoff | null {
  if (!record.cutoffs.length) return null;
  const latestYear = Math.max(...record.cutoffs.map((c) => c.year));
  const filter = categoryFilterForNeet(category);

  let candidates = record.cutoffs.filter((c) => {
    if (c.year !== latestYear) return false;
    if (!cutoffMatchesListingQuota(c, pool)) return false;
    if (category === "pwbd") {
      return c.category === "pwbd" || isPwdDbCategory(c.dbCategory);
    }
    if (!filter) return false;
    if (!matchesSelectedCategory(c, filter)) return false;
    // Keep social-category exports on the base DB category, not PH/PwD siblings.
    if (isPwdDbCategory(c.dbCategory)) return false;
    return true;
  });

  if (!candidates.length) {
    candidates = record.cutoffs.filter((c) => {
      if (c.year !== latestYear) return false;
      if (!cutoffMatchesListingQuota(c, pool)) return false;
      if (category === "pwbd") {
        return c.category === "pwbd" || isPwdDbCategory(c.dbCategory);
      }
      return filter ? matchesSelectedCategory(c, filter) : false;
    });
  }

  return pickPreferredRoundCutoff(candidates);
}

function roundRanksForDbCategory(
  record: CollegeRecord,
  matched: CollegeCutoff,
  pool: "state" | "aiq",
): { r1: string | number; r2: string | number; r3: string | number; year: number | "" } {
  const year = matched.year;
  const dbCategory = matched.dbCategory?.trim() || "";

  const poolCutoffs = record.cutoffs.filter((c) => {
    if (c.year !== year) return false;
    if (!cutoffMatchesListingQuota(c, pool)) return false;
    if (dbCategory) return sameDbCategory(c.dbCategory, dbCategory);
    // No DB category on matched row — stay on the same Neet category, still exclude PwD mix-ins.
    if (matched.category && c.category !== matched.category) return false;
    if (isPwdDbCategory(c.dbCategory) !== isPwdDbCategory(matched.dbCategory)) {
      return false;
    }
    return true;
  });

  const byRound: Record<1 | 2 | 3, CollegeCutoff | undefined> = {
    1: undefined,
    2: undefined,
    3: undefined,
  };
  for (const cutoff of poolCutoffs) {
    const round = parseMainCounsellingRound(cutoff.round);
    if (!round) continue;
    const prev = byRound[round];
    const rank = cutoff.closingRank ?? cutoff.rank ?? 0;
    const prevRank = prev?.closingRank ?? prev?.rank ?? 0;
    if (!prev || rank >= prevRank) byRound[round] = cutoff;
  }

  const rankOf = (c?: CollegeCutoff) =>
    c ? c.closingRank ?? c.rank ?? "" : "";

  return {
    r1: rankOf(byRound[1]),
    r2: rankOf(byRound[2]),
    r3: rankOf(byRound[3]),
    year,
  };
}

function rowFromCollege(
  summary: CollegeSummary,
  record: CollegeRecord | undefined,
  category: NeetCategory,
) {
  const pool = summary.predictorPool === "aiq" ? "aiq" : "state";
  const matched = record ? findMatchedCutoff(record, category, pool) : null;
  const rounds = matched && record
    ? roundRanksForDbCategory(record, matched, pool)
    : { r1: "", r2: "", r3: "", year: summary.latestCutoffYear || "" };

  const dbCategoryLabel =
    matched?.dbCategory?.trim() ||
    matched?.category ||
    category;

  return {
    College: summary.name,
    City: summary.city,
    State: summary.stateName,
    "Matched pool": pool === "aiq" ? "All India Quota (MCC)" : "State quota",
    Category: dbCategoryLabel,
    "Closing AIR (matched)":
      (matched?.closingRank ?? matched?.rank ?? summary.latestCutoffRank) || "",
    "Cutoff year": matched?.year || summary.latestCutoffYear || rounds.year || "",
    "Round 1 closing AIR": rounds.r1,
    "Round 2 closing AIR": rounds.r2,
    "Round 3 closing AIR": rounds.r3,
    "Display annual fee": summary.displayAnnualFee,
    "Bond years": summary.bond?.years ?? "",
    "Bond penalty": summary.bond?.penalty ?? "",
    Beds: summary.beds ?? record?.infrastructure?.beds ?? "",
    "Patient flow / day":
      summary.patientFlowPerDay ?? record?.infrastructure?.patientFlowPerDay ?? "",
    ...seatCols("State counselling", record?.seatMatrix ?? summary.seatMatrix),
    ...seatCols("MCC", record?.mccSeatMatrix ?? summary.mccSeatMatrix),
    ...feeCols(record?.fees),
  };
}

async function buildRows(
  result: CollegePredictorUnlockedResult,
  colleges: CollegeSummary[],
): Promise<Record<string, string | number>[]> {
  const all = await getAllColleges();
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  return colleges.map((summary) =>
    rowFromCollege(summary, bySlug.get(summary.slug), result.input.category),
  );
}

/** Workbook with college-page rounds, seats, and fees for all matched colleges. */
export async function buildCollegePredictorWorkbook(
  result: CollegePredictorUnlockedResult,
): Promise<Buffer> {
  const allRows = await buildRows(result, [
    ...result.likely,
    ...result.possible,
    ...result.reach,
  ]);
  const likelyRows = await buildRows(result, result.likely);
  const possibleRows = await buildRows(result, result.possible);
  const reachRows = await buildRows(result, result.reach);

  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    book,
    XLSX.utils.json_to_sheet(allRows),
    "All colleges",
  );
  XLSX.utils.book_append_sheet(
    book,
    XLSX.utils.json_to_sheet(likelyRows),
    "Likely",
  );
  XLSX.utils.book_append_sheet(
    book,
    XLSX.utils.json_to_sheet(possibleRows),
    "Possible",
  );
  XLSX.utils.book_append_sheet(
    book,
    XLSX.utils.json_to_sheet(reachRows),
    "Reach",
  );

  XLSX.utils.book_append_sheet(
    book,
    XLSX.utils.json_to_sheet([
      {
        AIR: result.input.air,
        Category: result.input.category,
        State: result.input.stateSlug,
        "Reference year": result.referenceYear,
        Likely: result.counts.likely,
        Possible: result.counts.possible,
        Reach: result.counts.reach,
        Disclaimer: result.disclaimer,
      },
    ]),
    "Profile",
  );

  return Buffer.from(
    XLSX.write(book, { type: "buffer", bookType: "xlsx" }) as ArrayBuffer,
  );
}
