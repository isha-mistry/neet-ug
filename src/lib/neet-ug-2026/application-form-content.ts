import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export const NEET_UG_APPLICATION_HERO = {
  title: "Application, admit card & ",
  titleEmphasis: "exam-day guide.",
  lede:
    "Step-by-step NEET UG 2026 application on the NTA portal, fee structure, correction window, city intimation vs admit card, and hall entry rules — aligned to the latest bulletin.",
  fine:
    "Apply and download documents only on neet.nta.nic.in. Dravio does not submit forms on your behalf.",
  trio: [
    { key: "Application fee", value: "₹1,000 – ₹1,700" },
    { key: "Admit card", value: "26 Apr 2026" },
    { key: "ReNEET", value: "21 June 2026" },
  ],
} as const;

export const NEET_UG_APPLICATION_LEAD_MAGNET = {
  formTitle: "Admit card & NTA alerts",
  formSubtitle: "Name and mobile — we notify you when admit cards, city slips, or corrections open.",
  submitLabel: "Get application alerts",
  whatsappIntro:
    "Hi Dravio, I'd like NEET UG 2026 application and admit card alerts on WhatsApp.",
} as const;

export const NEET_UG_APPLICATION_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "how-to-apply", label: "How to apply" },
  { id: "fees", label: "Fees" },
  { id: "documents", label: "Documents" },
  { id: "correction", label: "Correction" },
  { id: "slip-vs-admit", label: "Slip vs admit" },
  { id: "exam-day", label: "Exam day" },
  { id: "related", label: "Guides" },
  { id: "tools-cta", label: "Predictors" },
];

export const NEET_UG_APPLICATION_KEY_STATS = [
  { label: "Application fee", value: "₹1,000 –\n₹1,700" },
  { label: "Correction window", value: "After form\nclose" },
  { label: "Admit card", value: "26 Apr\n2026" },
  { label: "ReNEET exam", value: "21 June\n2026" },
] as const;

export const NEET_UG_APPLICATION_STEPS = [
  "New registration — Visit neet.nta.nic.in, click New Registration, and enter name, date of birth, gender, mobile, and email to generate your application number and password.",
  "Fill application form — Log in with your application number. Complete personal details, parents' information, category, Class 10 & 12 qualifications, and preferred exam centre city.",
  "Upload photo & documents — Passport-size photograph (10–200 KB, JPG, white background), signature (4–30 KB, JPG), and left-hand thumb impression (10–50 KB, JPG).",
  "Pay application fee — Non-refundable fee via card, net banking, or UPI (category-wise). Download the confirmation page after successful payment.",
  "Print confirmation page — Keep the confirmation page with your application number safe for admit card download and future counselling.",
] as const;

export const NEET_UG_APPLICATION_FEE_ROWS = [
  { category: "General / EWS", fee: "₹1,700", note: "All centres including abroad" },
  { category: "OBC-NCL (Non-Creamy Layer)", fee: "₹1,600", note: "All centres" },
  { category: "SC / ST / PwBD / Third Gender", fee: "₹1,000", note: "All centres" },
  { category: "Foreign / NRI (India centres)", fee: "₹9,500", note: "India exam centres" },
  { category: "Foreign / NRI (Abroad centres)", fee: "USD 200", note: "Outside India centres" },
] as const;

export const NEET_UG_APPLICATION_FEE_FOOTNOTE =
  "Fee is non-refundable and non-transferable. Bank processing charges may apply additionally.";

export const NEET_UG_APPLICATION_DOCUMENTS = [
  {
    icon: "image",
    title: "Passport-size photograph",
    desc: "Recent colour photo, white/light background, 10–200 KB JPG. Name and date of capture printed below the photo.",
  },
  {
    icon: "gesture",
    title: "Candidate's signature",
    desc: "Sign on white paper with black/blue ink, scan clearly. 4–30 KB JPG only — no block letters.",
  },
  {
    icon: "fingerprint",
    title: "Left-hand thumb impression",
    desc: "Ink impression on white paper, scanned clearly. 10–50 KB JPG; impression must be distinct.",
  },
  {
    icon: "badge",
    title: "Photo identity proof",
    desc: "Aadhaar, PAN, passport, voter ID, or driving licence — name must match the application exactly.",
  },
  {
    icon: "school",
    title: "Class 10 certificate",
    desc: "Marksheet or passing certificate for date of birth verification.",
  },
  {
    icon: "workspace_premium",
    title: "Category certificate (if applicable)",
    desc: "SC/ST/OBC-NCL/EWS/PwBD certificate from a competent authority in the prescribed format.",
  },
] as const;

export const NEET_UG_APPLICATION_CORRECTION_ALLOWED = [
  "Candidate's name (minor spelling correction)",
  "Father's / Mother's name (minor correction)",
  "Date of birth (with valid supporting documents)",
  "Category (General/OBC/SC/ST/EWS/PwBD)",
  "Gender",
  "Photograph and signature re-upload",
  "State of eligibility",
  "Exam centre city (subject to availability)",
  "Medium of question paper",
  "Nationality",
] as const;

export const NEET_UG_APPLICATION_CORRECTION_NOT_ALLOWED = [
  "Application number (permanently fixed)",
  "Email ID used for registration",
  "Mobile number used for registration",
  "Already submitted and locked exam city (in some phases)",
] as const;

export const NEET_UG_APPLICATION_CORRECTION_FOOTNOTE =
  "Correction window fees (if any) must be paid during the same window period.";

export const NEET_UG_APPLICATION_SLIP_VS_ADMIT_ROWS = [
  { feature: "When released", slip: "~2 weeks before exam", admit: "~1 week before exam" },
  {
    feature: "Purpose",
    slip: "Know your exam city for travel planning",
    admit: "Entry pass to the examination hall",
  },
  { feature: "Mandatory at centre", slip: "Not mandatory", admit: "Mandatory — no entry without it" },
  { feature: "Contains hall no.?", slip: "No", admit: "Yes" },
  {
    feature: "Contains venue address?",
    slip: "City name only",
    admit: "Full venue address & room number",
  },
  { feature: "Contains photo?", slip: "No", admit: "Yes — photo printed on it" },
  { feature: "Download source", slip: "neet.nta.nic.in", admit: "neet.nta.nic.in (same portal)" },
] as const;

export const NEET_UG_APPLICATION_EXAM_DAY_STATS = [
  { label: "Gate opens", value: "12:30 PM" },
  { label: "Gate closes", value: "1:30 PM" },
  { label: "Exam begins", value: "2:00 PM" },
  { label: "Exam ends", value: "5:20 PM" },
] as const;

export const NEET_UG_APPLICATION_EXAM_DAY_ALLOWED = [
  "Admit card (printed, A4 size)",
  "Valid photo ID proof (original)",
  "One passport-size photograph (same as on form)",
  "Transparent/clear ballpoint pen (blue/black)",
  "Transparent water bottle (no label)",
  "Prescribed medication (with doctor's note)",
] as const;

export const NEET_UG_APPLICATION_EXAM_DAY_PROHIBITED = [
  "Mobile phone, smartwatch, or any electronic device",
  "Wrist watch of any kind",
  "Jewellery, metal ornaments, or hair clips/pins",
  "Calculator, log tables, or extra stationery",
  "Food items (except for diabetic candidates as per rules)",
  "Bags, wallets, or pouches of any kind",
] as const;

export const NEET_UG_APPLICATION_OMR_RULES = [
  "Use only blue/black ballpoint pen to darken OMR bubbles — no pencil",
  "Once darkened, bubbles cannot be changed or erased — mark carefully",
  "Rough work only on blank space inside the test booklet",
  "Do not fold, tear, or tamper with the OMR sheet",
  "Biometric attendance (fingerprint) is mandatory before hall entry",
  "Submit the OMR sheet to the invigilator before leaving",
] as const;

export const NEET_UG_APPLICATION_RELATED_LINKS = [
  {
    label: "Live updates & alerts",
    href: "/neet-ug-2026/updates",
    desc: "ReNEET, results, and counselling milestones.",
    icon: "notifications",
  },
  {
    label: "NEET UG 2026 hub",
    href: "/neet-ug-2026",
    desc: "Timeline, eligibility, and cutoffs.",
    icon: "hub",
  },
  {
    label: "Answer key & results",
    href: "/neet-ug-2026/answer-key",
    desc: "OMR, challenges, and scorecard.",
    icon: "fact_check",
  },
  {
    label: "Counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    desc: "MCC AIQ rounds and choice filling.",
    icon: "menu_book",
  },
] as const;
