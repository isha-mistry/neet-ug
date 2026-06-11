/** NMC / MoHFW consolidated figures (2025–26 session). Source: NMC official college & seat records. */

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

export const STATE_MATRIX: StateMatrixRow[] = [
  { slug: "andhra-pradesh", name: "Andhra Pradesh", totalColleges: 36, totalSeats: 6840, govtColleges: 13, govtSeats: 2485, privateColleges: 23, privateSeats: 4355 },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", totalColleges: 1, totalSeats: 50, govtColleges: 1, govtSeats: 50, privateColleges: 0, privateSeats: 0 },
  { slug: "assam", name: "Assam", totalColleges: 9, totalSeats: 1150, govtColleges: 9, govtSeats: 1150, privateColleges: 0, privateSeats: 0 },
  { slug: "bihar", name: "Bihar", totalColleges: 19, totalSeats: 2910, govtColleges: 12, govtSeats: 1710, privateColleges: 7, privateSeats: 1200 },
  { slug: "chandigarh", name: "Chandigarh", totalColleges: 2, totalSeats: 250, govtColleges: 2, govtSeats: 250, privateColleges: 0, privateSeats: 0 },
  { slug: "chattisgarh", name: "Chhattisgarh", totalColleges: 12, totalSeats: 1640, govtColleges: 7, govtSeats: 940, privateColleges: 5, privateSeats: 700 },
  { slug: "delhi", name: "Delhi", totalColleges: 8, totalSeats: 1290, govtColleges: 5, govtSeats: 890, privateColleges: 3, privateSeats: 400 },
  { slug: "goa", name: "Goa", totalColleges: 1, totalSeats: 180, govtColleges: 1, govtSeats: 180, privateColleges: 0, privateSeats: 0 },
  { slug: "gujarat", name: "Gujarat", totalColleges: 41, totalSeats: 7525, govtColleges: 18, govtSeats: 3950, privateColleges: 23, privateSeats: 3575 },
  { slug: "haryana", name: "Haryana", totalColleges: 14, totalSeats: 2125, govtColleges: 6, govtSeats: 945, privateColleges: 8, privateSeats: 1180 },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", totalColleges: 7, totalSeats: 770, govtColleges: 4, govtSeats: 470, privateColleges: 3, privateSeats: 300 },
  { slug: "jammu-kashmir", name: "Jammu & Kashmir", totalColleges: 8, totalSeats: 985, govtColleges: 5, govtSeats: 685, privateColleges: 3, privateSeats: 300 },
  { slug: "jharkhand", name: "Jharkhand", totalColleges: 8, totalSeats: 900, govtColleges: 4, govtSeats: 500, privateColleges: 4, privateSeats: 400 },
  { slug: "karnataka", name: "Karnataka", totalColleges: 73, totalSeats: 13954, govtColleges: 24, govtSeats: 4350, privateColleges: 49, privateSeats: 9604 },
  { slug: "kerala", name: "Kerala", totalColleges: 33, totalSeats: 4650, govtColleges: 10, govtSeats: 1755, privateColleges: 23, privateSeats: 2895 },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", totalColleges: 31, totalSeats: 5725, govtColleges: 14, govtSeats: 2790, privateColleges: 17, privateSeats: 2935 },
  { slug: "maharashtra", name: "Maharashtra", totalColleges: 80, totalSeats: 12824, govtColleges: 28, govtSeats: 4820, privateColleges: 52, privateSeats: 8004 },
  { slug: "manipur", name: "Manipur", totalColleges: 3, totalSeats: 225, govtColleges: 2, govtSeats: 150, privateColleges: 1, privateSeats: 75 },
  { slug: "meghalaya", name: "Meghalaya", totalColleges: 2, totalSeats: 150, govtColleges: 1, govtSeats: 50, privateColleges: 1, privateSeats: 100 },
  { slug: "mizoram", name: "Mizoram", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "nagaland", name: "Nagaland", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "orissa", name: "Odisha", totalColleges: 15, totalSeats: 2550, govtColleges: 9, govtSeats: 1550, privateColleges: 6, privateSeats: 1000 },
  { slug: "pondicherry", name: "Puducherry", totalColleges: 3, totalSeats: 650, govtColleges: 1, govtSeats: 250, privateColleges: 2, privateSeats: 400 },
  { slug: "punjab", name: "Punjab", totalColleges: 12, totalSeats: 1925, govtColleges: 5, govtSeats: 875, privateColleges: 7, privateSeats: 1050 },
  { slug: "rajasthan", name: "Rajasthan", totalColleges: 43, totalSeats: 7330, govtColleges: 26, govtSeats: 4425, privateColleges: 17, privateSeats: 2905 },
  { slug: "sikkim", name: "Sikkim", totalColleges: 1, totalSeats: 50, govtColleges: 0, govtSeats: 0, privateColleges: 1, privateSeats: 50 },
  { slug: "tamil-nadu", name: "Tamil Nadu", totalColleges: 77, totalSeats: 13050, govtColleges: 38, govtSeats: 6450, privateColleges: 39, privateSeats: 6600 },
  { slug: "telangana", name: "Telangana", totalColleges: 56, totalSeats: 9690, govtColleges: 13, govtSeats: 2890, privateColleges: 43, privateSeats: 6800 },
  { slug: "tripura", name: "Tripura", totalColleges: 2, totalSeats: 200, govtColleges: 2, govtSeats: 200, privateColleges: 0, privateSeats: 0 },
  { slug: "uttar-pradesh", name: "Uttar Pradesh", totalColleges: 86, totalSeats: 13425, govtColleges: 35, govtSeats: 5225, privateColleges: 51, privateSeats: 8200 },
  { slug: "uttarakhand", name: "Uttarakhand", totalColleges: 8, totalSeats: 900, govtColleges: 3, govtSeats: 425, privateColleges: 5, privateSeats: 475 },
  { slug: "west-bengal", name: "West Bengal", totalColleges: 34, totalSeats: 4750, govtColleges: 18, govtSeats: 2925, privateColleges: 16, privateSeats: 1825 },
];

export const NMC_INDIA_TOTALS: StateMatrixRow = {
  slug: "india",
  name: "All India (NMC 2025)",
  totalColleges: 818,
  totalSeats: 128875,
  govtColleges: 455,
  govtSeats: 63682,
  privateColleges: 363,
  privateSeats: 65193,
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
  { name: "Karnataka", colleges: 73, seats: 13954, note: "Highest MBBS seats" },
  { name: "Tamil Nadu", colleges: 77, seats: 13050, note: "Strong government network" },
  { name: "Maharashtra", colleges: 80, seats: 12824, note: "Large private capacity" },
  { name: "Uttar Pradesh", colleges: 86, seats: 13425, note: "Most medical colleges" },
  { name: "Gujarat", colleges: 41, seats: 7525, note: "Focus state" },
  { name: "Rajasthan", colleges: 43, seats: 7330, note: "Focus state" },
  { name: "Madhya Pradesh", colleges: 31, seats: 5725, note: "Focus state" },
] as const;

export const GOVT_ONLY_STATES_NOTE =
  "Assam, Arunachal Pradesh, Mizoram, Nagaland, Chandigarh, and Goa currently have only government medical colleges (no private MBBS institutes). That limits management-quota options but keeps fees relatively predictable.";
