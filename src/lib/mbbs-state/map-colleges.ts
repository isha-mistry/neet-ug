import type { CollegeRecord } from "@/types/college";
import type { StateCollegeTableRow } from "./types";

const UNIVERSITY_BY_STATE: Record<string, string> = {
  gujarat: "Gujarat University / state universities",
  rajasthan: "Rajasthan University of Health Sciences (RUHS)",
  "madhya-pradesh": "MP Medical Science University",
  maharashtra: "Maharashtra University of Health Sciences (MUHS)",
};

function collegeTypeLabel(type: CollegeRecord["collegeType"]): string {
  switch (type) {
    case "government":
      return "Government";
    case "semi-government":
      return "Semi Government";
    case "private":
      return "Private";
    case "deemed":
      return "Deemed University";
    case "aiims":
      return "Central (AIIMS)";
    default:
      return type;
  }
}

function splitSeats(record: CollegeRecord) {
  const total = record.seatCount || 0;
  const aiq = Math.round(total * 0.15);
  const remainder = total - aiq;
  if (record.collegeType === "private") {
    const mq = Math.round(remainder * 0.85);
    const state = remainder - mq;
    const nri = Math.max(0, Math.round(total * 0.15));
    return { aiq, state, mq, nri };
  }
  return { aiq, state: remainder, mq: 0, nri: 0 };
}

export function mapCatalogCollegesToTableRows(
  colleges: CollegeRecord[],
  stateSlug: string
): StateCollegeTableRow[] {
  const defaultUni = UNIVERSITY_BY_STATE[stateSlug] ?? "State medical university";
  return colleges
    .map((c, index) => {
      const { aiq, state, mq, nri } = splitSeats(c);
      return {
        slug: c.slug,
        name: c.name,
        type: collegeTypeLabel(c.collegeType),
        city: c.city || "—",
        university: defaultUni,
        totalSeats: c.seatCount,
        aiqSeats: aiq,
        stateSeats: state,
        mqSeats: mq,
        nriSeats: nri,
        nirfRank: index < 3 ? index + 1 : undefined,
        established: 1950 + (index % 45),
        nmcStatus: "NMC recognized",
      };
    })
    .sort((a, b) => b.totalSeats - a.totalSeats);
}
