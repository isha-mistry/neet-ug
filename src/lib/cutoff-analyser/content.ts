export type { CounselingEvent } from "./counseling-timeline";

export {
  COUNSELING_SESSION_YEAR,
  COUNSELING_STATUS_LABEL,
  COUNSELING_TIMELINE,
  COUNSELING_TIMELINE_DISCLAIMER,
  getCounselingTimeline,
} from "./counseling-timeline";

export interface TrendSeries {
  year: number;
  values: Record<string, number>;
}

export type TrendView = "state" | "quota";

/** Illustrative trend data for chart (replace with CMS when available). */
export const TREND_BY_STATE: TrendSeries[] = [
  {
    year: 2021,
    values: { GJ: 18200, RJ: 14500, MP: 16800, MH: 11200 },
  },
  {
    year: 2022,
    values: { GJ: 17600, RJ: 13800, MP: 16200, MH: 10800 },
  },
  {
    year: 2023,
    values: { GJ: 17100, RJ: 13200, MP: 15600, MH: 10200 },
  },
  {
    year: 2024,
    values: { GJ: 16500, RJ: 12600, MP: 14900, MH: 9800 },
  },
  {
    year: 2025,
    values: { GJ: 15800, RJ: 11200, MP: 14200, MH: 9800 },
  },
];

export const TREND_BY_QUOTA: TrendSeries[] = [
  {
    year: 2021,
    values: { "State 85%": 17500, "AIQ 15%": 9200, Management: 45000 },
  },
  {
    year: 2022,
    values: { "State 85%": 16800, "AIQ 15%": 8800, Management: 44000 },
  },
  {
    year: 2023,
    values: { "State 85%": 16200, "AIQ 15%": 8400, Management: 43000 },
  },
  {
    year: 2024,
    values: { "State 85%": 15600, "AIQ 15%": 8100, Management: 42000 },
  },
  {
    year: 2025,
    values: { "State 85%": 15000, "AIQ 15%": 7800, Management: 41000 },
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CUTOFF_FAQ: FaqItem[] = [
  {
    id: "aiq-vs-state",
    question: "What's the difference between AIQ 15% and State 85% quotas?",
    answer:
      "AIQ (All India Quota) seats are filled by MCC through centralized counselling open to candidates from any state. State quota seats are filled by the respective state authority and usually require domicile or meet state eligibility rules. Cutoffs differ because seat pools and applicant mixes differ.",
  },
  {
    id: "other-state",
    question: "Am I eligible for state counselling if I'm from another state?",
    answer:
      "For state quota seats you generally need domicile or qualifying residency in that state. AIQ and management/NRI routes may still be open depending on institute rules. Always verify the latest state prospectus before locking choices.",
  },
  {
    id: "closing-rank",
    question: "How is the closing rank determined?",
    answer:
      "Closing rank is the All India Rank of the last candidate admitted in a given college, category, and quota in a counselling round (usually the final round of that year). Opening rank is the best (lowest) rank admitted in that pool.",
  },
  {
    id: "round2",
    question: "What happens if I don't get admission in Round 1?",
    answer:
      "You can participate in subsequent rounds, upgrade choices, or join mop-up/stray vacancy rounds if eligible. Seats vacated by candidates who leave are re-allotted in later rounds.",
  },
  {
    id: "management",
    question: "Can I apply to management quota colleges?",
    answer:
      "Yes, where institutes offer management or institutional quota seats. Fees are higher and some colleges conduct separate processes. Our tables show management closing ranks where we have them in the catalog.",
  },
  {
    id: "documents",
    question: "What documents do I need for counselling?",
    answer:
      "Typically: NEET scorecard, admit card, class 10 & 12 marksheets and certificates, category certificate (if applicable), domicile certificate, ID proof, passport photos, and allotment letter after each round. States may add specific affidavits or income certificates.",
  },
  {
    id: "nri",
    question: "What is NRI quota and am I eligible?",
    answer:
      "NRI quota is for Non-Resident Indians or eligible foreign nationals as defined by the institute and state. Eligibility depends on passport, visa status, and sponsor documents. Fees are usually quoted in USD or higher INR slabs.",
  },
  {
    id: "multiple-offers",
    question: "How do I choose between colleges if I have multiple offers?",
    answer:
      "Compare NIRF/clinical exposure, bond, fees, location, and upgrade rules. Accept one seat by the deadline; failing to pay fees can lead to forfeiture and penalties per MCC/state rules.",
  },
];

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  { term: "AIQ", definition: "All India Quota — 15% MBBS seats filled via MCC." },
  { term: "AIR", definition: "All India Rank from NEET UG." },
  { term: "Cutoff", definition: "Last rank admitted in a seat pool for a year." },
  { term: "Domicile", definition: "Legal residence status in a state for quota eligibility." },
  { term: "Freeze", definition: "Locking an allotted seat to stop further upgrades." },
  { term: "Mop-up", definition: "Final round to fill leftover seats after main rounds." },
  { term: "NRI", definition: "Non-Resident Indian quota with separate fee structure." },
  { term: "Stray vacancy", definition: "Seats that become vacant after admissions close." },
];
