import { normalizeMatchKey } from "@/lib/catalog/normalize-match-key";

/** `${stateSlug}|${normalizeMatchKey(collegeName)}` → canonical `app.colleges.slug` */
export const MEDICAL_LIST_SLUG_BY_ROW_KEY: Record<string, string> = {
  "assam|kokrajhar medical college and hospital rangalikhata rangalikhata":
    "kokrajhar-medical-college",
  "assam|lakhimpur medical college north lakhimpur assam":
    "lakhimpur-medical-college",
  "jammu-kashmir|all india institute of medical sciences vijaypur jammu":
    "all-india-institute-of-medical-sciences-vijaypur",
  "karnataka|belgaum inst of medical sci belgaum":
    "belagavi-institute-of-medical-sciences-belagavi",
  "karnataka|karnataka medical college and research institute hubballi karnataka":
    "karnataka-medical-college-and-research-institute-hubballi-karnataka",
  "karnataka|jagadguru gangadhar mahaswamigalu moorusavirmath medical college hubballi":
    "jagadguru-gangadhar-mahaswamigalu-moorusavirmath-medical-college-jgmmmc",
  "karnataka|jawaharlal nehru medical college belgaum":
    "jawaharlal-nehru-medical-college-belgaum",
  "karnataka|k h patil institute of medical sciences gadag":
    "k-h-patil-institute-of-medical-sciences",
  "karnataka|shri atal bihari vajpayee medical college and research institute bengaluru shivajinagar bengaluru":
    "shri-atal-bihari-vajpayee-medical-college-research-institute",
  "orissa|mahraja jajati keshari medical college jajpur":
    "mahraja-jajati-keshari-medical-college",
  "uttar-pradesh|sharda school of medical sciences and research previously school of medical sciences and research greater noida":
    "sharda-school-of-medical-sciences-research",
  "gujarat|gmers medical college dharpur patan": "gmers-medical-college-dharpur-patan",
  "gujarat|pramukhswami medical college anand": "pramukhswami-medical-college-karmsad",
  "gujarat|gmers medical college morbi": "gmers-medical-college-morbi",
  "gujarat|gmers medical college navsari": "gmers-medical-college-navsari",
  "gujarat|gmers medical college panchmahal godhra":
    "government-medical-college-panchmahal-godhra",
  "gujarat|gmers medical college porbandar": "government-medical-college-porbandar",
  "maharashtra|dr vasantrao pawar medical col hosp research centre nashik":
    "dr-vasantrao-pawar-med-col-hosp-research-centre-nasik-prev-ndmvp-samaj-medical-college",
  "maharashtra|dr n y tasgaonkar institute of medical science karjat":
    "dr-n-y-tasgaonkar-institute-of-medical-science",
};

/** Duplicate spine rows merged into canonical slug before reconciliation. */
export const MEDICAL_LIST_MERGE_SLUG_INTO: Record<string, string> = {
  "government-medical-college-morbi": "gmers-medical-college-morbi",
  "pramukhswami-medical-college-anand": "pramukhswami-medical-college-karmsad",
  "dr-n-y-tasgaonkar-institute-of-medical-science-ahmednagar":
    "dr-n-y-tasgaonkar-institute-of-medical-science",
  "namo-medical-education-and-research-institute-silvassa":
    "namo-medical-education-and-research-institute-silvassa-formerly-known-as-shri-vinoba-bhave-insti",
};

export function medicalListRowKey(stateSlug: string, collegeName: string): string {
  return `${stateSlug}|${normalizeMatchKey(collegeName)}`;
}
