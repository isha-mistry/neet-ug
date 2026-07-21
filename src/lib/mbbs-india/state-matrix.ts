/** NMC seat matrix for AY 2026–27 (UG MBBS, excluding INI seats). */

export interface StateMatrixRow {
  slug: string;
  name: string;
  totalColleges: number;
  totalSeats: number;
  govtColleges: number;
  govtSeats: number;
  privateColleges: number;
  privateSeats: number;
}

/**
 * State / UT matrix from NMC public notice (AY 2026–27).
 * Chhattisgarh rows in the source sheet are merged into one catalog state.
 */
export const STATE_MATRIX: StateMatrixRow[] = [
  { slug: "andaman-nicobar-islands", name: "Andaman & Nicobar Islands", totalColleges: 1, totalSeats: 114, govtColleges: 1, govtSeats: 114, privateColleges: 0, privateSeats: 0 },
  { slug: "andhra-pradesh", name: "Andhra Pradesh", totalColleges: 40, totalSeats: 7465, govtColleges: 19, govtSeats: 3515, privateColleges: 21, privateSeats: 3950 },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "assam", name: "Assam", totalColleges: 15, totalSeats: 1875, govtColleges: 15, govtSeats: 1875, privateColleges: 0, privateSeats: 0 },
  { slug: "bihar", name: "Bihar", totalColleges: 26, totalSeats: 4160, govtColleges: 12, govtSeats: 1710, privateColleges: 14, privateSeats: 2450 },
  { slug: "chandigarh", name: "Chandigarh", totalColleges: 1, totalSeats: 200, govtColleges: 1, govtSeats: 200, privateColleges: 0, privateSeats: 0 },
  { slug: "chattisgarh", name: "Chhattisgarh", totalColleges: 21, totalSeats: 2925, govtColleges: 15, govtSeats: 1725, privateColleges: 6, privateSeats: 1200 },
  { slug: "dadra-and-nagar-haveli", name: "Dadra & Nagar Haveli", totalColleges: 1, totalSeats: 177, govtColleges: 1, govtSeats: 177, privateColleges: 0, privateSeats: 0 },
  { slug: "delhi", name: "Delhi", totalColleges: 10, totalSeats: 1415, govtColleges: 8, govtSeats: 1165, privateColleges: 2, privateSeats: 250 },
  { slug: "goa", name: "Goa", totalColleges: 1, totalSeats: 250, govtColleges: 1, govtSeats: 250, privateColleges: 0, privateSeats: 0 },
  { slug: "gujarat", name: "Gujarat", totalColleges: 42, totalSeats: 7750, govtColleges: 23, govtSeats: 4250, privateColleges: 19, privateSeats: 3500 },
  { slug: "haryana", name: "Haryana", totalColleges: 18, totalSeats: 2960, govtColleges: 8, govtSeats: 1060, privateColleges: 10, privateSeats: 1900 },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", totalColleges: 7, totalSeats: 871, govtColleges: 6, govtSeats: 721, privateColleges: 1, privateSeats: 150 },
  { slug: "jammu-kashmir", name: "Jammu & Kashmir", totalColleges: 11, totalSeats: 1675, govtColleges: 10, govtSeats: 1525, privateColleges: 1, privateSeats: 150 },
  { slug: "jharkhand", name: "Jharkhand", totalColleges: 10, totalSeats: 1500, govtColleges: 6, govtSeats: 800, privateColleges: 4, privateSeats: 700 },
  { slug: "karnataka", name: "Karnataka", totalColleges: 75, totalSeats: 15395, govtColleges: 24, govtSeats: 4400, privateColleges: 51, privateSeats: 10995 },
  { slug: "kerala", name: "Kerala", totalColleges: 36, totalSeats: 5704, govtColleges: 14, govtSeats: 1855, privateColleges: 22, privateSeats: 3849 },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", totalColleges: 34, totalSeats: 6020, govtColleges: 20, govtSeats: 3020, privateColleges: 14, privateSeats: 3000 },
  { slug: "maharashtra", name: "Maharashtra", totalColleges: 86, totalSeats: 13099, govtColleges: 42, govtSeats: 6000, privateColleges: 44, privateSeats: 7099 },
  { slug: "manipur", name: "Manipur", totalColleges: 4, totalSeats: 550, govtColleges: 3, govtSeats: 400, privateColleges: 1, privateSeats: 150 },
  { slug: "meghalaya", name: "Meghalaya", totalColleges: 3, totalSeats: 250, govtColleges: 2, govtSeats: 100, privateColleges: 1, privateSeats: 150 },
  { slug: "mizoram", name: "Mizoram", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "nagaland", name: "Nagaland", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "orissa", name: "Odisha", totalColleges: 20, totalSeats: 2950, govtColleges: 14, govtSeats: 1850, privateColleges: 6, privateSeats: 1100 },
  { slug: "pondicherry", name: "Puducherry", totalColleges: 8, totalSeats: 1780, govtColleges: 1, govtSeats: 180, privateColleges: 7, privateSeats: 1600 },
  { slug: "punjab", name: "Punjab", totalColleges: 12, totalSeats: 1850, govtColleges: 5, govtSeats: 900, privateColleges: 7, privateSeats: 950 },
  { slug: "rajasthan", name: "Rajasthan", totalColleges: 51, totalSeats: 8080, govtColleges: 33, govtSeats: 4480, privateColleges: 18, privateSeats: 3600 },
  { slug: "sikkim", name: "Sikkim", totalColleges: 2, totalSeats: 200, govtColleges: 1, govtSeats: 100, privateColleges: 1, privateSeats: 100 },
  { slug: "tamil-nadu", name: "Tamil Nadu", totalColleges: 78, totalSeats: 13999, govtColleges: 37, govtSeats: 5349, privateColleges: 41, privateSeats: 8650 },
  { slug: "telangana", name: "Telangana", totalColleges: 66, totalSeats: 10250, govtColleges: 36, govtSeats: 4400, privateColleges: 30, privateSeats: 5850 },
  { slug: "tripura", name: "Tripura", totalColleges: 3, totalSeats: 500, govtColleges: 1, govtSeats: 200, privateColleges: 2, privateSeats: 300 },
  { slug: "uttar-pradesh", name: "Uttar Pradesh", totalColleges: 88, totalSeats: 14000, govtColleges: 49, govtSeats: 5700, privateColleges: 39, privateSeats: 8300 },
  { slug: "uttarakhand", name: "Uttarakhand", totalColleges: 9, totalSeats: 1475, govtColleges: 5, govtSeats: 625, privateColleges: 4, privateSeats: 850 },
  { slug: "west-bengal", name: "West Bengal", totalColleges: 41, totalSeats: 7200, govtColleges: 25, govtSeats: 4350, privateColleges: 16, privateSeats: 2850 },
];

export const NMC_INDIA_TOTALS: StateMatrixRow = {
  slug: "india",
  name: "All India (NMC AY 2026–27)",
  totalColleges: 823,
  totalSeats: 136939,
  govtColleges: 441,
  govtSeats: 63296,
  privateColleges: 382,
  privateSeats: 73643,
};

export function computeIndiaTotals(rows: StateMatrixRow[]): StateMatrixRow {
  return rows.reduce(
    (acc, row) => ({
      slug: "india",
      name: "All India",
      totalColleges: acc.totalColleges + row.totalColleges,
      totalSeats: acc.totalSeats + row.totalSeats,
      govtColleges: acc.govtColleges + row.govtColleges,
      govtSeats: acc.govtSeats + row.govtSeats,
      privateColleges: acc.privateColleges + row.privateColleges,
      privateSeats: acc.privateSeats + row.privateSeats,
    }),
    {
      slug: "india",
      name: "All India",
      totalColleges: 0,
      totalSeats: 0,
      govtColleges: 0,
      govtSeats: 0,
      privateColleges: 0,
      privateSeats: 0,
    }
  );
}

export const MAP_CALLOUTS = [
  { name: "Karnataka", colleges: 75, seats: 15395, note: "Highest MBBS seats" },
  { name: "Uttar Pradesh", colleges: 88, seats: 14000, note: "Most medical colleges" },
  { name: "Tamil Nadu", colleges: 78, seats: 13999, note: "Strong government network" },
  { name: "Maharashtra", colleges: 86, seats: 13099, note: "Large private capacity" },
  { name: "Telangana", colleges: 66, seats: 10250, note: "High capacity South" },
  { name: "Rajasthan", colleges: 51, seats: 8080, note: "Focus state" },
  { name: "Gujarat", colleges: 42, seats: 7750, note: "Focus state" },
  { name: "Madhya Pradesh", colleges: 34, seats: 6020, note: "Focus state" },
] as const;

export const GOVT_ONLY_STATES_NOTE =
  "Andaman & Nicobar Islands, Arunachal Pradesh, Assam, Chandigarh, Dadra & Nagar Haveli, Goa, Mizoram, and Nagaland currently have only government medical colleges (no private MBBS institutes). That limits management-quota options but keeps fees relatively predictable.";
