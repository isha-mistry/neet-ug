/** Academic session label for MBBS guide pages (NEET UG admission cycle). */
export const MBBS_ACADEMIC_SESSION = "2026–27";

export function mbbsIndiaPageTitle(): string {
  return `MBBS in India ${MBBS_ACADEMIC_SESSION}: Complete Guide to Colleges, Seats & Admission`;
}

export function mbbsStatePageTitle(stateName: string): string {
  return `MBBS in ${stateName} ${MBBS_ACADEMIC_SESSION}: Colleges, Seats, Cutoff & Admission Guide`;
}
