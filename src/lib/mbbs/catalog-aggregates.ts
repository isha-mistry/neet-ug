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
  const totalSeats = govtSeats + pvtSeats;
  const aiqSeats = Math.round(totalSeats * 0.15);
  const stateQuotaSeats = totalSeats - aiqSeats;

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
