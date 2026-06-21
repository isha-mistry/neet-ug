import type { FaqItem } from "@/types/content";

const COUNSELING_MILESTONES = [
  {
    period: "MAY - JUNE",
    title: "NEET Exam",
    body: "Result declaration & AIR rankings release.",
    active: true,
  },
  {
    period: "JULY WK 1",
    title: "AIQ Round 1",
    body: "MCC registration & central choice filling.",
    active: true,
  },
  {
    period: "JULY WK 3",
    title: "State Merit",
    body: "GJ, MH, RJ, MP release state-specific lists.",
    active: false,
  },
  {
    period: "AUGUST",
    title: "Round 2 & 3",
    badge: "UPGRADE WINDOW",
    active: false,
  },
  {
    period: "SEPTEMBER",
    title: "Mop-up / Stray",
    body: "Final vacant seat filling across India.",
    active: false,
  },
] as const;

export const SUMMARY_STATS: { label: string; value: string }[] = [
  { label: "Total medical colleges in India", value: "823" },
  { label: "Total MBBS seats", value: "1,29,753" },
  { label: "Government medical colleges", value: "456 (63,860 seats)" },
  { label: "Private medical colleges", value: "361 (65,093 seats)" },
  { label: "All India Quota (AIQ) seats", value: "21,504" },
  { label: "State Quota seats", value: "95,418" },
  { label: "Duration of MBBS course", value: "4.5 years + 1 year compulsory internship" },
  { label: "Total subjects in MBBS", value: "19" },
  { label: "Entrance exam", value: "NEET-UG (conducted by NTA)" },
  { label: "All India counseling body", value: "MCC (Medical Counseling Committee)" },
  { label: "State counseling body", value: "DME or Medical University of respective state" },
  { label: "Government seat annual fee", value: "₹50,000 – ₹1,00,000 per year" },
  { label: "Management quota annual fee", value: "₹10,00,000 – ₹30,00,000 per year" },
  { label: "NRI quota annual fee", value: "₹35,00,000 – ₹45,00,000 per year" },
  { label: "NEET-UG 2025 total applicants", value: "22.09 lakh (22,09,318)" },
  { label: "Chance of getting a government seat", value: "2.89%" },
  { label: "Overall chance (Govt + Private)", value: "~5.87%" },
];

export const OVERVIEW_PARAGRAPHS: string[] = [
  "MBBS admission in India is governed nationally by NEET-UG, which replaced AIPMT in 2017 after Supreme Court proceedings unified medical entrance testing. The National Medical Commission (NMC), which replaced the Medical Council of India (MCI) in 2020, now regulates college approvals, seat additions, curriculum, and fee frameworks. These reforms made the admission pathway more transparent, but also more competitive as every aspirant competes on a single rank list.",
  "Medical education capacity has expanded sharply: India had roughly 450 MBBS colleges in 2017 and about 823 in 2025, with total seats crossing 1.29 lakh. Southern states — Karnataka, Tamil Nadu, Telangana, and Andhra Pradesh — account for nearly 40% of all MBBS seats, largely due to private college growth. By contrast, states such as Uttar Pradesh and Bihar see intense competition because applicant volumes are high relative to government seat availability, pushing cutoffs upward.",
  "Admissions flow through two main channels. The All India Quota (AIQ) covers 15% of seats in participating colleges and is counseled by MCC on mcc.nic.in, open to eligible candidates from any state. The remaining 85% State Quota is counseled by state authorities (DME, university, or CET cell) and is usually restricted by domicile rules. Private colleges additionally offer management and NRI quota seats with separate fee structures, though NEET qualification remains mandatory.",
  "The central challenge is scale versus seats. More than 22 lakh students appeared for NEET-UG 2025, while only about 63,860 government MBBS seats exist nationwide. That implies roughly one government seat for every 35 serious contenders. Students who miss government cutoffs must choose between costly private MBBS in India, state-hopping via AIQ, a drop year, or NMC-recognized programs abroad followed by FMGE/NEXT licensing.",
];

export interface SeatTrendRow {
  year: number;
  govtColleges: number;
  privateColleges: number;
  totalColleges: number;
  govtSeats: number;
  privateSeats: number;
  totalSeats: number;
  neetApplicantsLakh: number;
  govtSeatChancePct: number;
  overallChancePct: number;
}

export const SEAT_TRENDS: SeatTrendRow[] = [
  { year: 2017, govtColleges: 280, privateColleges: 225, totalColleges: 505, govtSeats: 43148, privateSeats: 36165, totalSeats: 79313, neetApplicantsLakh: 11.38, govtSeatChancePct: 3.79, overallChancePct: 6.97 },
  { year: 2018, govtColleges: 290, privateColleges: 235, totalColleges: 525, govtSeats: 45600, privateSeats: 37800, totalSeats: 83400, neetApplicantsLakh: 13.26, govtSeatChancePct: 3.44, overallChancePct: 6.29 },
  { year: 2019, govtColleges: 302, privateColleges: 248, totalColleges: 550, govtSeats: 48200, privateSeats: 40100, totalSeats: 88300, neetApplicantsLakh: 14.1, govtSeatChancePct: 3.42, overallChancePct: 6.26 },
  { year: 2020, govtColleges: 320, privateColleges: 260, totalColleges: 580, govtSeats: 51200, privateSeats: 42800, totalSeats: 94000, neetApplicantsLakh: 15.97, govtSeatChancePct: 3.21, overallChancePct: 5.89 },
  { year: 2021, govtColleges: 355, privateColleges: 285, totalColleges: 640, govtSeats: 54800, privateSeats: 47200, totalSeats: 102000, neetApplicantsLakh: 16.14, govtSeatChancePct: 3.39, overallChancePct: 6.32 },
  { year: 2022, govtColleges: 388, privateColleges: 305, totalColleges: 693, govtSeats: 57800, privateSeats: 51200, totalSeats: 109000, neetApplicantsLakh: 18.72, govtSeatChancePct: 3.09, overallChancePct: 5.82 },
  { year: 2023, govtColleges: 410, privateColleges: 325, totalColleges: 735, govtSeats: 59800, privateSeats: 54500, totalSeats: 114300, neetApplicantsLakh: 20.87, govtSeatChancePct: 2.87, overallChancePct: 5.48 },
  { year: 2024, govtColleges: 435, privateColleges: 345, totalColleges: 780, govtSeats: 61800, privateSeats: 58200, totalSeats: 120000, neetApplicantsLakh: 21.68, govtSeatChancePct: 2.85, overallChancePct: 5.54 },
  { year: 2025, govtColleges: 456, privateColleges: 361, totalColleges: 823, govtSeats: 63860, privateSeats: 65093, totalSeats: 129753, neetApplicantsLakh: 22.09, govtSeatChancePct: 2.89, overallChancePct: 5.87 },
];

export const SEAT_TREND_ANALYSIS = [
  "Between 2020 and 2025, total MBBS seats grew by roughly 37%, but NEET applicants grew by about 38% in the same window — and by over 90% since 2017. Competition is outpacing seat expansion, especially for affordable government seats.",
  "Roughly 49% of government medical colleges and 42% of private medical colleges were established in the last decade, reflecting a policy push to expand medical infrastructure. Despite this, India's doctor-to-population ratio remains below WHO recommendations, which is why seat additions continue each year.",
];

export interface CutoffRankRow {
  category: string;
  aiqOpening2025: number;
  aiqClosing2025: number;
  aiqOpening2024: number;
  aiqClosing2024: number;
}

export const AIQ_GOVT_CUTOFFS: CutoffRankRow[] = [
  { category: "General", aiqOpening2025: 1, aiqClosing2025: 12500, aiqOpening2024: 1, aiqClosing2024: 13100 },
  { category: "OBC (NCL)", aiqOpening2025: 800, aiqClosing2025: 14800, aiqOpening2024: 850, aiqClosing2024: 15200 },
  { category: "SC", aiqOpening2025: 3500, aiqClosing2025: 89000, aiqOpening2024: 3600, aiqClosing2024: 91000 },
  { category: "ST", aiqOpening2025: 4200, aiqClosing2025: 105000, aiqOpening2024: 4300, aiqClosing2024: 108000 },
  { category: "EWS", aiqOpening2025: 600, aiqClosing2025: 14200, aiqOpening2024: 650, aiqClosing2024: 14500 },
  { category: "General-PH", aiqOpening2025: 12000, aiqClosing2025: 185000, aiqOpening2024: 12500, aiqClosing2024: 188000 },
  { category: "OBC-PH", aiqOpening2025: 15000, aiqClosing2025: 195000, aiqOpening2024: 15500, aiqClosing2024: 198000 },
  { category: "SC-PH", aiqOpening2025: 45000, aiqClosing2025: 210000, aiqOpening2024: 46000, aiqClosing2024: 212000 },
  { category: "ST-PH", aiqOpening2025: 52000, aiqClosing2025: 215000, aiqOpening2024: 53000, aiqClosing2024: 218000 },
];

export const SCORE_TO_RANK_REFERENCE: { score: number; approxRank: string }[] = [
  { score: 720, approxRank: "1" },
  { score: 700, approxRank: "~100" },
  { score: 680, approxRank: "~500" },
  { score: 650, approxRank: "~5,000" },
  { score: 620, approxRank: "~15,000" },
  { score: 600, approxRank: "~30,000" },
  { score: 550, approxRank: "~1,00,000" },
  { score: 500, approxRank: "~2,50,000" },
  { score: 450, approxRank: "~5,00,000" },
];

export const NEET_QUALIFYING_PERCENTILES = [
  { category: "General", percentile: "50th", note: "Minimum qualifying marks typically ~137–140 (varies by year)" },
  { category: "OBC / SC / ST", percentile: "40th", note: "Lower cut-off percentile with category certificate" },
  { category: "General-PH", percentile: "45th", note: "PH certificate required; separate rank list" },
];

export const FEE_STRUCTURE = {
  govtIntro:
    "Government MBBS tuition is set by state governments. Tamil Nadu and Andhra Pradesh often charge ₹11,000–₹25,000 per year, while Maharashtra and Rajasthan may reach ₹80,000–₹1,00,000 per year for tuition alone.",
  focusStates: [
    { state: "Gujarat", govtRange: "₹15,000 – ₹1,00,000 / year", privateCap: "₹10.14 – ₹19.4 lakh / year (FRC approved)" },
    { state: "Rajasthan", govtRange: "₹12,000 – ₹85,000 / year", privateCap: "₹11 – ₹24 lakh / year" },
    { state: "Madhya Pradesh", govtRange: "₹10,000 – ₹90,000 / year", privateCap: "₹12 – ₹22 lakh / year" },
    { state: "Maharashtra", govtRange: "₹25,000 – ₹1,00,000 / year", privateCap: "₹15 – ₹30 lakh / year" },
  ],
  nri:
    "NRI quota fees are typically ₹35–45 lakh per year (or USD equivalent). Eligible candidates include NRIs, OCIs in some cases, and Indian students sponsored by an NRI blood relative as per state rules.",
  otherCosts:
    "Budget ₹50,000–₹1,50,000 per year for hostel and mess. Many government colleges require service bonds with penalties of ₹10–40 lakh if rural service is not completed.",
  comparison:
    "Indicative 5.5-year totals: government MBBS ₹5–15 lakh (plus bond), private management quota ₹55 lakh–₹1.5 crore, MBBS abroad ₹20–40 lakh plus FMGE/NEXT preparation.",
};

export const COUNSELING_AIQ_STEPS = [
  "NEET UG result declared by NTA — download scorecard and note AIR and category rank.",
  "Register on mcc.nic.in, pay registration fee, and complete document upload if required.",
  "Choice filling — select colleges and courses; lock choices before deadline.",
  "Round 1 allotment published; report to allotted college, verify documents, pay fees.",
  "Round 2 for upgrades or fresh participation; freeze/upgrade options apply as per rules.",
  "Mop-up round for vacant seats after Round 2.",
  "Stray vacancy round (if announced) for remaining seats.",
];

export const COUNSELING_STATE_STEPS = [
  "Register separately on the state counseling portal (domicile rules apply for 85% quota).",
  "Pay state registration fee and upload state-specific documents.",
  "Choice filling for state quota, management, and NRI seats as applicable.",
  "Participate in multiple rounds mirroring MCC (Round 1, 2, mop-up, stray).",
  "Report physically or online as directed; non-reporting forfeits the seat.",
];

export const FOCUS_STATE_COUNSELORS = [
  { state: "Gujarat", authority: "ACPUGMEC", portal: "medadmgujarat.org" },
  { state: "Rajasthan", authority: "RUHS / REAP", portal: "ruhsraj.org" },
  { state: "Madhya Pradesh", authority: "DMET MP", portal: "dme.mponline.gov.in" },
  { state: "Maharashtra", authority: "State CET Cell", portal: "cetcell.mahacet.org" },
];

export const COUNSELING_DOCUMENTS = [
  "NEET UG scorecard and admit card",
  "Class 10 certificate (DOB proof)",
  "Class 12 marksheet and passing certificate",
  "Category certificate (OBC-NCL / SC / ST / EWS) if applicable",
  "Domicile / nativity certificate for state quota",
  "Aadhaar card",
  "Passport-size photographs",
  "Migration / transfer certificate (if applicable)",
];

export const CHANCES_STATS = [
  { label: "NEET 2025 applicants", value: "22.09 lakh (22,09,318)" },
  { label: "Government MBBS seats", value: "63,860" },
  { label: "Government seat probability", value: "2.89%" },
  { label: "Total MBBS seats (Govt + Private)", value: "1,29,753" },
  { label: "Any-seat probability", value: "~5.87%" },
  { label: "Affordable govt seat odds", value: "Less than 1 in 35 students" },
];

export const CHANCES_OPTIONS = [
  {
    title: "Private medical colleges (management quota)",
    body: "High cost (often ₹50 lakh–₹1.5 crore total) but NMC-recognized degree with the same clinical pathway as government graduates.",
  },
  {
    title: "MBBS in another state",
    body: "AIQ or states allowing non-domicile participation may offer government seats if home-state cutoffs are out of reach.",
  },
  {
    title: "MBBS abroad",
    body: "NMC-listed universities in Russia, Georgia, Kazakhstan, Philippines, Bangladesh, and others — typically ₹20–40 lakh total; FMGE/NEXT required to practice in India.",
  },
  {
    title: "Drop year and re-attempt NEET",
    body: "Improvement is possible but diminishing returns after multiple attempts — plan with structured coaching and realistic rank targets.",
  },
];

export interface NirfCollegeRow {
  rank: number;
  name: string;
  city: string;
  state: string;
  feeApprox: string;
  seats: number;
  aiqSeats: number;
  stateSeats: number;
}

export const NIRF_TOP_GOVT_COLLEGES: NirfCollegeRow[] = [
  { rank: 1, name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", feeApprox: "₹1,628 / year", seats: 132, aiqSeats: 132, stateSeats: 0 },
  { rank: 2, name: "Post Graduate Institute of Medical Education & Research", city: "Chandigarh", state: "Chandigarh", feeApprox: "₹6,000 / year", seats: 150, aiqSeats: 23, stateSeats: 127 },
  { rank: 3, name: "Christian Medical College", city: "Vellore", state: "Tamil Nadu", feeApprox: "₹48,000 / year", seats: 100, aiqSeats: 15, stateSeats: 85 },
  { rank: 4, name: "Jawaharlal Institute of Postgraduate Medical Education & Research", city: "Puducherry", state: "Puducherry", feeApprox: "₹4,970 / year", seats: 200, aiqSeats: 30, stateSeats: 170 },
  { rank: 5, name: "Banaras Hindu University (Institute of Medical Sciences)", city: "Varanasi", state: "Uttar Pradesh", feeApprox: "₹20,000 / year", seats: 100, aiqSeats: 15, stateSeats: 85 },
  { rank: 6, name: "King George's Medical University", city: "Lucknow", state: "Uttar Pradesh", feeApprox: "₹54,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 7, name: "Maulana Azad Medical College", city: "New Delhi", state: "Delhi", feeApprox: "₹6,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 8, name: "Vardhman Mahavir Medical College", city: "New Delhi", state: "Delhi", feeApprox: "₹33,000 / year", seats: 150, aiqSeats: 23, stateSeats: 127 },
  { rank: 9, name: "University College of Medical Sciences", city: "New Delhi", state: "Delhi", feeApprox: "₹6,000 / year", seats: 150, aiqSeats: 23, stateSeats: 127 },
  { rank: 10, name: "Grant Medical College", city: "Mumbai", state: "Maharashtra", feeApprox: "₹95,000 / year", seats: 200, aiqSeats: 30, stateSeats: 170 },
  { rank: 11, name: "BJ Medical College", city: "Ahmedabad", state: "Gujarat", feeApprox: "₹25,000 / year", seats: 250, aiqSeats: 37, stateSeats: 213 },
  { rank: 12, name: "SMS Medical College", city: "Jaipur", state: "Rajasthan", feeApprox: "₹14,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 13, name: "Madras Medical College", city: "Chennai", state: "Tamil Nadu", feeApprox: "₹13,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 14, name: "Stanley Medical College", city: "Chennai", state: "Tamil Nadu", feeApprox: "₹13,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 15, name: "Osmania Medical College", city: "Hyderabad", state: "Telangana", feeApprox: "₹24,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 16, name: "Government Medical College, Thiruvananthapuram", city: "Thiruvananthapuram", state: "Kerala", feeApprox: "₹23,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 17, name: "Bangalore Medical College", city: "Bengaluru", state: "Karnataka", feeApprox: "₹59,000 / year", seats: 250, aiqSeats: 38, stateSeats: 212 },
  { rank: 18, name: "Seth GS Medical College (KEM)", city: "Mumbai", state: "Maharashtra", feeApprox: "₹95,000 / year", seats: 180, aiqSeats: 27, stateSeats: 153 },
  { rank: 19, name: "Government Medical College, Nagpur", city: "Nagpur", state: "Maharashtra", feeApprox: "₹95,000 / year", seats: 200, aiqSeats: 30, stateSeats: 170 },
  { rank: 20, name: "Gandhi Medical College", city: "Bhopal", state: "Madhya Pradesh", feeApprox: "₹1,00,000 / year", seats: 150, aiqSeats: 23, stateSeats: 127 },
];

export const NEET_ELIGIBILITY_POINTS = [
  "Minimum age 17 years as on 31 December of admission year; no upper age limit (25-year cap removed in 2023).",
  "10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology, and English.",
  "Minimum PCB marks: 50% (General), 40% (SC/ST/OBC), 45% (General-PH).",
  "No cap on NEET attempts; Indian nationals, NRIs, OCIs, PIOs, and foreign nationals may appear.",
];

export const NEET_EXAM_PATTERN = [
  "Conducting body: NTA (National Testing Agency).",
  "Mode: Offline pen-and-paper test; duration 3 hours 20 minutes.",
  "200 questions (180 to be attempted); total marks 720.",
  "Subjects: Physics, Chemistry, Botany, Zoology (35+15 each).",
  "Marking: +4 correct, −1 incorrect, 0 unattempted.",
  "Medium: 13 languages including English, Hindi, Gujarati, Marathi, Tamil, Telugu, Bengali.",
];

export interface CounselingTimelineEvent {
  label: string;
  date: string;
  track: "neet" | "mcc" | "gujarat" | "rajasthan" | "madhya-pradesh" | "maharashtra";
}

function counselingTimelineTrack(
  title: (typeof COUNSELING_MILESTONES)[number]["title"]
): CounselingTimelineEvent["track"] {
  switch (title) {
  case "NEET Exam":
    return "neet";
  case "State Merit":
    return "gujarat";
  default:
    return "mcc";
  }
}

function formatMilestonePeriod(period: string): string {
  const normalized = period
    .replace(/\bWK\b/gi, "week")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `${normalized} 2026`;
}

function milestoneTimelineLabel(m: (typeof COUNSELING_MILESTONES)[number]): string {
  if ("body" in m && m.body) {
    return `${m.title} — ${m.body}`;
  }
  if ("badge" in m && m.badge) {
    const badge =
      m.badge.charAt(0) + m.badge.slice(1).toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    return `${m.title} — ${badge}`;
  }
  return m.title;
}

/** Estimated 2026–27 counseling milestones (typical national + state cycle). */
export const COUNSELING_TIMELINE: CounselingTimelineEvent[] = COUNSELING_MILESTONES.map((m) => ({
  date: formatMilestonePeriod(m.period),
  label: milestoneTimelineLabel(m),
  track: counselingTimelineTrack(m.title),
}));

export const ABROAD_COMPARISON: { parameter: string; india: string; abroad: string }[] = [
  { parameter: "University type", india: "Private (NMC recognized)", abroad: "Public & private mix" },
  { parameter: "World ranking availability", india: "Limited for many private colleges", abroad: "Often listed (varies by country)" },
  { parameter: "Recognition", india: "NMC India", abroad: "NMC + WHO + WFME (check list)" },
  { parameter: "Medium of teaching", india: "English", abroad: "English in popular destinations" },
  { parameter: "Total course cost", india: "₹50 lakh – ₹1.5 crore", abroad: "₹20 – ₹40 lakh typical" },
  { parameter: "Annual tuition", india: "₹10 – ₹30 lakh", abroad: "₹3 – ₹8 lakh" },
  { parameter: "Clinical exposure", india: "Strong in established colleges", abroad: "Varies; verify hospital tie-ups" },
  { parameter: "Hostel & living", india: "₹50k – ₹1.5L / year", abroad: "₹1 – ₹3L / year" },
  { parameter: "Bond / rural service", india: "Often required in govt seats", abroad: "Usually none" },
  { parameter: "Post-MBBS exam in India", india: "None for Indian degree", abroad: "FMGE / NEXT (when implemented)" },
  { parameter: "Faculty experience", india: "High in top govt colleges", abroad: "Mixed — due diligence needed" },
  { parameter: "NEET score requirement", india: "Mandatory for India", abroad: "Qualifying NEET for most countries" },
  { parameter: "Ease of admission", india: "Very competitive", abroad: "Moderate with budget" },
];

export const PG_AFTER_MBBS = {
  neetPg:
    "NEET PG (conducted by NBE) is required for MD/MS specialization after MBBS. Roughly 60,000 PG seats exist across MD, MS, and diploma programs — competition exceeds NEET UG. Government PG seats may carry service bonds.",
  next: "The National Exit Test (NEXT) is planned to unify final-year licensing and foreign graduate assessment, replacing FMGE over time. Indian and foreign graduates should track NMC notifications.",
  superSpecialty: "After MD/MS, DM and M.Ch programs offer super-specialization with ~4,000 seats nationwide.",
  otherPaths:
    "Diplomas (2-year), DNB in accredited hospitals, fellowships, ICMR/DBT research, MPH, hospital management MBAs, UPSC medical officer posts, and medical teaching careers.",
};

export const MBBS_INDIA_FAQ: FaqItem[] = [
  {
    question: "What is the eligibility criteria for MBBS in India through NEET?",
    answer:
      "Candidates must be at least 17 years old by 31 December of the admission year, have passed 10+2 with Physics, Chemistry, Biology/Biotechnology and English, and meet category-wise PCB percentage norms. Qualifying NEET-UG is mandatory for MBBS admission in India, including management and NRI seats.",
  },
  {
    question: "How many MBBS seats are available in India in 2025?",
    answer:
      "India has about 823 medical colleges offering roughly 1,29,753 MBBS seats, split between ~63,860 government and ~65,093 private seats. AIQ accounts for about 21,504 seats nationally.",
  },
  {
    question: "What is the difference between AIQ and state quota seats?",
    answer:
      "AIQ is 15% of seats in participating colleges, counseled by MCC for eligible candidates across India. State quota is 85%, counseled by state authorities and usually reserved for domicile residents. You may participate in both processes simultaneously subject to rules.",
  },
  {
    question: "What is the cutoff rank for government medical colleges in India?",
    answer:
      "AIQ government closing ranks vary by category — General often closes near AIR 12,000–13,000 for MBBS, while reserved categories extend further. State quotas have separate cutoffs; use our Cutoff Analyser for Gujarat, Rajasthan, MP, and Maharashtra.",
  },
  {
    question: "How much does MBBS cost in a private medical college in India?",
    answer:
      "Management quota fees typically range from ₹10 lakh to ₹30 lakh per year depending on state FRC caps, plus hostel and living costs. NRI quota can reach ₹35–45 lakh per year.",
  },
  {
    question: "Can I get MBBS admission without NEET?",
    answer:
      "No. NEET-UG qualification is mandatory for MBBS admission in India, including private management and NRI seats, as per NMC regulations.",
  },
  {
    question: "What is the role of MCC in MBBS admissions?",
    answer:
      "The Medical Counseling Committee conducts online counseling for AIQ, deemed universities, central institutions, and ESIC seats on mcc.nic.in. It publishes registration windows, processes choices, and allots seats based on NEET rank.",
  },
  {
    question: "How many rounds of NEET UG counseling are held?",
    answer:
      "MCC typically conducts Round 1, Round 2, mop-up, and sometimes stray vacancy rounds. Each state runs its own multi-round schedule for the 85% quota.",
  },
  {
    question: "What documents are required for MBBS counseling?",
    answer:
      "NEET scorecard, identity proof, Class 10 and 12 certificates, category and domicile certificates (if applicable), photos, and migration certificate when required. Always carry originals and attested copies as per portal instructions.",
  },
  {
    question: "Is there an age limit for NEET UG 2025?",
    answer:
      "The minimum age is 17 years. The previous upper age limit was removed by the Supreme Court in 2023, so there is currently no maximum age for NEET UG.",
  },
  {
    question: "What happens if I get allotted a seat but do not report to the college?",
    answer:
      "Failure to report within the deadline usually cancels the allotment and may trigger forfeiture of security deposit. You may become ineligible for further rounds depending on MCC or state rules.",
  },
  {
    question: "What are the options if I cannot get a government MBBS seat in India?",
    answer:
      "Consider private MBBS in India, AIQ/state-hopping, NMC-recognized MBBS abroad, or a planned drop year. Our counselors can help compare total cost, recognition, and licensing pathways.",
  },
];

export const RELATED_PAGES = [
  { label: "MBBS in Gujarat", href: "/mbbs-in-india/gujarat" },
  { label: "MBBS in Rajasthan", href: "/mbbs-in-india/rajasthan" },
  { label: "MBBS in Madhya Pradesh", href: "/mbbs-in-india/madhya-pradesh" },
  { label: "MBBS in Maharashtra", href: "/mbbs-in-india/maharashtra" },
  { label: "MBBS Cutoff Analyser", href: "/cutoff-analyser" },
  { label: "Rank Predictor", href: "/rank-predictor" },
  { label: "College Predictor", href: "/college-predictor" },
  { label: "MCC / AIQ Quota Guide", href: "/quota/general" },
  { label: "All MBBS Colleges", href: "/colleges" },
  { label: "Government Medical Colleges", href: "/colleges/category/government" },
];
