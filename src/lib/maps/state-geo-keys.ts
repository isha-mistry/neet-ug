/**
 * Maps `ST_NM` from `src/data/maps/india.json` (India-States topo) to catalog `stateSlug`.
 */
export const ST_NM_TO_STATE_SLUG: Record<string, string> = {
  "Andaman & Nicobar Island": "andaman-nicobar-islands",
  "Andhra Pradesh": "andhra-pradesh",
  "Arunachal Pradesh": "arunachal-pradesh",
  Assam: "assam",
  Bihar: "bihar",
  Chandigarh: "chandigarh",
  Chhattisgarh: "chattisgarh",
  "Dadara & Nagar Havelli": "dadra-and-nagar-haveli",
  "Daman & Diu": "dadra-and-nagar-haveli",
  Goa: "goa",
  Gujarat: "gujarat",
  Haryana: "haryana",
  "Himachal Pradesh": "himachal-pradesh",
  "Jammu & Kashmir": "jammu-kashmir",
  Jharkhand: "jharkhand",
  Karnataka: "karnataka",
  Kerala: "kerala",
  "Madhya Pradesh": "madhya-pradesh",
  Maharashtra: "maharashtra",
  Manipur: "manipur",
  Meghalaya: "meghalaya",
  Mizoram: "mizoram",
  "NCT of Delhi": "delhi",
  Nagaland: "nagaland",
  Odisha: "orissa",
  Puducherry: "pondicherry",
  Punjab: "punjab",
  Rajasthan: "rajasthan",
  Sikkim: "sikkim",
  "Tamil Nadu": "tamil-nadu",
  Telangana: "telangana",
  Tripura: "tripura",
  "Uttar Pradesh": "uttar-pradesh",
  Uttarakhand: "uttarakhand",
  "West Bengal": "west-bengal",
};

export function stateSlugFromMapName(
  stNm: string | undefined
): string | undefined {
  if (!stNm) return undefined;
  return ST_NM_TO_STATE_SLUG[stNm];
}
