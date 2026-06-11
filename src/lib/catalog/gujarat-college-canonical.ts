/**
 * Gujarat dump / JSON spine sometimes list the same college under a short name and a full
 * "…, City" name. Map normalized match keys to the canonical college slug we keep.
 */
export const GUJARAT_CANONICAL_SLUG_BY_MATCH_KEY: Record<string, string> = {
  "bhagyoday medical college": "bhagyoday-medical-college-mehsana",
  "bhagyoday medical college mehsana": "bhagyoday-medical-college-mehsana",
  "kiran medical college": "kiran-medical-college-surat",
  "kiran medical college surat": "kiran-medical-college-surat",
  "matushri prabhaben khodabhai boghara medical college research centre":
    "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre-rajkot",
  "matushri prabhaben khodabhai boghara medical college research centre rajkot":
    "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre-rajkot",
  "dr kiran c patel medical college and research institute":
    "dr-kiran-c-patel-medical-college-research-institute-bharuch",
  "dr kiran c patel medical college research institute bharuch":
    "dr-kiran-c-patel-medical-college-research-institute-bharuch",
  "dr kiran c patel medical college research institute":
    "dr-kiran-c-patel-medical-college-research-institute-bharuch",
  "ananya college of medicine research kalol":
    "ananya-college-of-medicine-research-gandhinagar",
  "ananya college of medicine research gandhinagar":
    "ananya-college-of-medicine-research-gandhinagar",
};

/** JSON spine slug → canonical slug (drop duplicate spine rows on merge). */
export const GUJARAT_SPINE_SLUG_MERGE: { duplicateSlug: string; canonicalSlug: string }[] = [
  { duplicateSlug: "bhagyoday-medical-college", canonicalSlug: "bhagyoday-medical-college-mehsana" },
  { duplicateSlug: "kiran-medical-college", canonicalSlug: "kiran-medical-college-surat" },
  {
    duplicateSlug: "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre",
    canonicalSlug:
      "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre-rajkot",
  },
  {
    duplicateSlug: "dr-kiran-c-patel-medical-college-and-research-institute",
    canonicalSlug: "dr-kiran-c-patel-medical-college-research-institute-bharuch",
  },
  {
    duplicateSlug: "ananya-college-of-medicine-research-kalol",
    canonicalSlug: "ananya-college-of-medicine-research-gandhinagar",
  },
];
