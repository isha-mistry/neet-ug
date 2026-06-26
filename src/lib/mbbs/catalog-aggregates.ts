import type { CollegeRecord } from "@/types/college";

export interface CatalogSeatBreakdown {
  totalColleges: number;
  totalSeats: number;
  govtColleges: number;
  govtSeats: number;
  pvtColleges: number;
  pvtSeats: number;
  aiqSeats: number;
  stateQuotaSeats: number;
}

function isGovernmentCollege(type: CollegeRecord["collegeType"]): boolean {
  return type === "government" || type === "aiims";
}

export function aggregateCatalogSeatBreakdown(
  colleges: CollegeRecord[],
  stateSlug?: string
): CatalogSeatBreakdown {
  const rows = stateSlug
    ? colleges.filter((c) => c.stateSlug === stateSlug)
    : colleges;

  let govtColleges = 0;
  let govtSeats = 0;
  let pvtColleges = 0;
  let pvtSeats = 0;

  for (const college of rows) {
    if (isGovernmentCollege(college.collegeType)) {
      govtColleges += 1;
      govtSeats += college.seatCount;
    } else {
      pvtColleges += 1;
      pvtSeats += college.seatCount;
    }
  }

  const totalColleges = rows.length;
  let totalSeats = govtSeats + pvtSeats;
  let aiqSeats = Math.round(totalSeats * 0.15);
  let stateQuotaSeats = totalSeats - aiqSeats;

  // Override for all-India using actual NMC data if no specific state
  if (!stateSlug) {
    totalSeats = 129753;
    govtSeats = 63860;
    pvtSeats = 65093;
    aiqSeats = Math.round(totalSeats * 0.15);
    stateQuotaSeats = totalSeats - aiqSeats;
  }

  return {
    totalColleges,
    totalSeats,
    govtColleges,
    govtSeats,
    pvtColleges,
    pvtSeats,
    aiqSeats,
    stateQuotaSeats,
  };
}
