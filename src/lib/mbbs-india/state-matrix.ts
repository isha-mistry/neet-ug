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
  { slug: "andaman-nicobar-islands", name: "Andaman & Nicobar Islands", totalColleges: 1, totalSeats: 114, govtColleges: 1, govtSeats: 114, privateColleges: 0, privateSeats: 0 },
  { slug: "andhra-pradesh", name: "Andhra Pradesh", totalColleges: 39, totalSeats: 7215, govtColleges: 19, govtSeats: 3415, privateColleges: 20, privateSeats: 3800 },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "assam", name: "Assam", totalColleges: 16, totalSeats: 1975, govtColleges: 16, govtSeats: 1975, privateColleges: 0, privateSeats: 0 },
  { slug: "bihar", name: "Bihar", totalColleges: 25, totalSeats: 3545, govtColleges: 13, govtSeats: 1645, privateColleges: 12, privateSeats: 1900 },
  { slug: "chandigarh", name: "Chandigarh", totalColleges: 1, totalSeats: 150, govtColleges: 1, govtSeats: 150, privateColleges: 0, privateSeats: 0 },
  { slug: "chattisgarh", name: "Chhattisgarh", totalColleges: 16, totalSeats: 2455, govtColleges: 11, govtSeats: 1555, privateColleges: 5, privateSeats: 900 },
  { slug: "dadra-and-nagar-haveli", name: "Dadra & Nagar Haveli", totalColleges: 1, totalSeats: 177, govtColleges: 1, govtSeats: 177, privateColleges: 0, privateSeats: 0 },
  { slug: "delhi", name: "Delhi", totalColleges: 11, totalSeats: 1547, govtColleges: 9, govtSeats: 1297, privateColleges: 2, privateSeats: 250 },
  { slug: "goa", name: "Goa", totalColleges: 1, totalSeats: 200, govtColleges: 1, govtSeats: 200, privateColleges: 0, privateSeats: 0 },
  { slug: "gujarat", name: "Gujarat", totalColleges: 43, totalSeats: 7525, govtColleges: 24, govtSeats: 4325, privateColleges: 19, privateSeats: 3200 },
  { slug: "haryana", name: "Haryana", totalColleges: 17, totalSeats: 2710, govtColleges: 8, govtSeats: 1060, privateColleges: 9, privateSeats: 1650 },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", totalColleges: 8, totalSeats: 970, govtColleges: 7, govtSeats: 820, privateColleges: 1, privateSeats: 150 },
  { slug: "jammu-kashmir", name: "Jammu & Kashmir", totalColleges: 13, totalSeats: 1726, govtColleges: 11, govtSeats: 1526, privateColleges: 1, privateSeats: 150 },
  { slug: "jharkhand", name: "Jharkhand", totalColleges: 10, totalSeats: 1255, govtColleges: 7, govtSeats: 855, privateColleges: 3, privateSeats: 400 },
  { slug: "karnataka", name: "Karnataka", totalColleges: 74, totalSeats: 14244, govtColleges: 24, govtSeats: 4249, privateColleges: 48, privateSeats: 9695 },
  { slug: "kerala", name: "Kerala", totalColleges: 37, totalSeats: 5554, govtColleges: 14, govtSeats: 1855, privateColleges: 22, privateSeats: 3549 },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", totalColleges: 35, totalSeats: 5725, govtColleges: 21, govtSeats: 3025, privateColleges: 14, privateSeats: 2700 },
  { slug: "maharashtra", name: "Maharashtra", totalColleges: 85, totalSeats: 12824, govtColleges: 43, govtSeats: 6075, privateColleges: 42, privateSeats: 6749 },
  { slug: "manipur", name: "Manipur", totalColleges: 4, totalSeats: 525, govtColleges: 3, govtSeats: 375, privateColleges: 1, privateSeats: 150 },
  { slug: "meghalaya", name: "Meghalaya", totalColleges: 3, totalSeats: 200, govtColleges: 2, govtSeats: 100, privateColleges: 1, privateSeats: 100 },
  { slug: "mizoram", name: "Mizoram", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "nagaland", name: "Nagaland", totalColleges: 1, totalSeats: 100, govtColleges: 1, govtSeats: 100, privateColleges: 0, privateSeats: 0 },
  { slug: "orissa", name: "Odisha", totalColleges: 21, totalSeats: 3025, govtColleges: 15, govtSeats: 1925, privateColleges: 6, privateSeats: 1100 },
  { slug: "pondicherry", name: "Puducherry", totalColleges: 9, totalSeats: 1873, govtColleges: 2, govtSeats: 423, privateColleges: 7, privateSeats: 1450 },
  { slug: "punjab", name: "Punjab", totalColleges: 14, totalSeats: 2049, govtColleges: 6, govtSeats: 999, privateColleges: 7, privateSeats: 900 },
  { slug: "rajasthan", name: "Rajasthan", totalColleges: 49, totalSeats: 7331, govtColleges: 34, govtSeats: 4631, privateColleges: 15, privateSeats: 2700 },
  { slug: "sikkim", name: "Sikkim", totalColleges: 1, totalSeats: 150, govtColleges: 0, govtSeats: 0, privateColleges: 1, privateSeats: 150 },
  { slug: "tamil-nadu", name: "Tamil Nadu", totalColleges: 78, totalSeats: 13050, govtColleges: 39, govtSeats: 5450, privateColleges: 39, privateSeats: 7600 },
  { slug: "telangana", name: "Telangana", totalColleges: 66, totalSeats: 9540, govtColleges: 37, govtSeats: 4390, privateColleges: 29, privateSeats: 5150 },
  { slug: "tripura", name: "Tripura", totalColleges: 3, totalSeats: 450, govtColleges: 1, govtSeats: 150, privateColleges: 2, privateSeats: 300 },
  { slug: "uttar-pradesh", name: "Uttar Pradesh", totalColleges: 88, totalSeats: 13425, govtColleges: 51, govtSeats: 5925, privateColleges: 37, privateSeats: 7500 },
  { slug: "uttarakhand", name: "Uttarakhand", totalColleges: 10, totalSeats: 1450, govtColleges: 6, govtSeats: 750, privateColleges: 4, privateSeats: 700 },
  { slug: "west-bengal", name: "West Bengal", totalColleges: 41, totalSeats: 6474, govtColleges: 26, govtSeats: 4124, privateColleges: 14, privateSeats: 2200 },
];

export const NMC_INDIA_TOTALS: StateMatrixRow = {
  slug: "india",
  name: "All India (NMC 2025)",
  totalColleges: 823,
  totalSeats: 129753,
  govtColleges: 456,
  govtSeats: 63860,
  privateColleges: 361,
  privateSeats: 65093,
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
  { name: "Karnataka", colleges: 74, seats: 14244, note: "Highest MBBS seats" },
  { name: "Tamil Nadu", colleges: 78, seats: 13050, note: "Strong government network" },
  { name: "Maharashtra", colleges: 85, seats: 12824, note: "Large private capacity" },
  { name: "Uttar Pradesh", colleges: 88, seats: 13425, note: "Most medical colleges" },
  { name: "Gujarat", colleges: 43, seats: 7525, note: "Focus state" },
  { name: "Rajasthan", colleges: 49, seats: 7331, note: "Focus state" },
  { name: "Madhya Pradesh", colleges: 35, seats: 5725, note: "Focus state" },
] as const;

export const GOVT_ONLY_STATES_NOTE =
  "Andaman & Nicobar Islands, Arunachal Pradesh, Assam, Chandigarh, Dadra & Nagar Haveli, Goa, Mizoram, and Nagaland currently have only government medical colleges (no private MBBS institutes). That limits management-quota options but keeps fees relatively predictable.";
