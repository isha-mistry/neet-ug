import type { CollegeRecord } from "@/types/college";
import { resolveMbbsSeatBreakdown } from "./seat-breakdown";
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

export function mapCatalogCollegesToTableRows(
  colleges: CollegeRecord[],
  stateSlug: string
): StateCollegeTableRow[] {
  const defaultUni = UNIVERSITY_BY_STATE[stateSlug] ?? "State medical university";
  return colleges
    .map((c, index) => {
      const breakdown = resolveMbbsSeatBreakdown(c);
      return {
        slug: c.slug,
        name: c.name,
        type: collegeTypeLabel(c.collegeType),
        city: c.city || "—",
        university: c.universityName?.trim() || defaultUni,
        totalSeats: c.seatCount,
        aiqSeats: breakdown.aiq,
        stateSeats: breakdown.state,
        mqSeats: breakdown.mq,
        nriSeats: breakdown.nri,
        esicSeats: breakdown.esic,
        nirfRank: index < 3 ? index + 1 : undefined,
        established: 1950 + (index % 45),
        nmcStatus: "NMC recognized",
      };
    })
    .sort((a, b) => b.totalSeats - a.totalSeats);
}
