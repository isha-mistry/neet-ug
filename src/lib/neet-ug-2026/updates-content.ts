import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";
import type { TimelineEvent } from "@/components/features/neet-ug/NeetTimeline";

export const NEET_UG_UPDATES_HERO = {
  title: "NEET UG 2026 ",
  titleEmphasis: "Updates",
  lede:
    "Official NTA milestones — OMR response challenge, results, and counselling windows — in one place. Verified against public notices; we refresh as NTA publishes.",
  fine:
    "OMR recorded-response challenge closes 15 July 2026 at 11:00 AM. Always confirm on neet.nta.nic.in and mcc.nic.in before you act.",
  trio: [
    { key: "OMR challenge", value: "Till 15 Jul, 11 AM" },
    { key: "Result", value: "16 July 2026" },
    { key: "Registered", value: "22.76 lakh" },
  ],
} as const;

export const NEET_UG_UPDATES_LEAD_MAGNET = {
  formTitle: "NTA alert on WhatsApp",
  formSubtitle: "Name and mobile — we ping you when admit cards, keys, or results drop.",
  submitLabel: "Activate live alerts",
  whatsappIntro: "Hi Dravio, I'd like NEET UG 2026 live NTA alerts on WhatsApp.",
} as const;

export const NEET_UG_UPDATES_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "summary", label: "Summary" },
  { id: "notices", label: "Notices" },
  { id: "dates", label: "Key dates" },
  { id: "exam-day", label: "Exam day" },
  { id: "state-counselling", label: "State dates" },
  { id: "documents", label: "Documents" },
  { id: "after-result", label: "After result" },
  { id: "faq", label: "FAQ" },
  { id: "related", label: "Guides" },
  { id: "study-plan", label: "Study plan" },
];

export const NEET_UG_UPDATES_KEY_STATS = [
  { label: "ReNEET exam", value: "21 June\n2026 (Sun)" },
  { label: "Paper", value: "720 marks\n180 Qs" },
  { label: "Registered", value: "22.76\nlakh" },
  { label: "Exam cities", value: "552\ncentres" },
  { label: "MBBS seats", value: "1.39L+\n848 colleges" },
  { label: "Languages", value: "13\nmediums" },
] as const;

export const NEET_UG_UPDATES_SUMMARY =
  "NEET UG 2026 was held on 03 May 2026; ReNEET on 21 June 2026. NTA has released scanned OMR sheets and recorded responses — the response-challenge window runs 13–15 July 2026 (till 11:00 AM). Answer-key challenges are closed. Results are expected around mid-July, then MCC AIQ counselling from late July and state counselling from mid-August — subject to official notices.";

export const NEET_UG_UPDATES_DATE_ROWS = [
  { event: "Official notification & info bulletin", date: "8 February 2026", status: "Done" },
  { event: "Application window opens", date: "8 February 2026", status: "Done" },
  { event: "Last date to apply", date: "12 March 2026", status: "Done" },
  { event: "Application correction window", date: "12–14 March 2026", status: "Done" },
  { event: "Admit card released", date: "26 April 2026", status: "Done" },
  { event: "NEET UG 2026 exam day", date: "03 May 2026 · 2:00 PM – 5:00 PM", status: "Done" },
  {
    event: "ReNEET UG 2026 exam day",
    date: "21 June 2026 · 2:00 PM – 5:15 PM",
    status: "Done",
  },
  { event: "Final answer key", date: "25 June 2026", status: "Done" },
  { event: "Result declaration", date: "16 July 2026", status: "Done" },
  { event: "MCC AIQ counselling", date: "By 25 July 2026 (tentative)", status: "Tentative" },
  { event: "State quota counselling", date: "By 10 August 2026 (tentative)", status: "Tentative" },
] as const;

export const NEET_UG_UPDATES_TIMELINE: TimelineEvent[] = NEET_UG_UPDATES_DATE_ROWS.map(
  (row) => ({
    event: row.event,
    date: row.date,
    status: row.status === "Done" ? "Completed" : "Upcoming",
  })
);

export const NEET_UG_UPDATES_DATES_FOOTNOTE =
  "Source: NTA public notices (incl. 13 July 2026 OMR notice) · Last reviewed July 2026";

export const NEET_UG_UPDATES_AFTER_RESULT_LINKS = [
  {
    label: "NEET counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    desc: "MCC AIQ rounds, choice filling, and reporting.",
  },
  {
    label: "State counselling portals",
    href: "/neet-ug-2026/counselling-websites",
    desc: "DME / CET Cell links for all states.",
  },
  {
    label: "Answer key & results hub",
    href: "/neet-ug-2026/answer-key",
    desc: "OMR, challenges, scorecard, and qualifying cutoffs.",
  },
  {
    label: "College predictor",
    href: "/college-predictor",
    desc: "Likely, Possible & Reach lists from your AIR.",
  },
  {
    label: "ReNEET Rank Predictor 2026",
    href: "/reneet-rank-predictor-2026",
    desc: "Estimate AIR from practice scores before results.",
  },
] as const;

export const NEET_UG_UPDATES_RELATED_HUB_LINKS = [
  { label: "NEET UG 2026 hub", href: "/neet-ug-2026", icon: "hub" },
  { label: "Application & admit card", href: "/neet-ug-2026/application-form", icon: "assignment" },
  { label: "MBBS in India", href: "/mbbs-in-india", icon: "local_hospital" },
] as const;

export type UpdatesNoticeItem = {
  date: string;
  title: string;
  summary: string;
  href: string;
  tag: "NTA" | "MCC" | "Advisory" | "Gujarat";
};

export const NEET_UG_UPDATES_NOTICE_FEED: UpdatesNoticeItem[] = [
  {
    date: "31 July 2026",
    title: "Gujarat MBBS/BDS registration open — PIN distribution & online form (2026-27)",
    summary:
      "ACPUGMEC advertisement inviting online registration for 1st-year Medical/Dental admission in Gujarat (Government, Grant-in-Aid & Self-Financed colleges). PIN purchase (₹1,000 + ₹10,000 refundable deposit) and online registration run 31 July – 12 August 2026 (PIN till 12:00 noon, form till 4:00 PM) on medadmgujarat.org.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Adv.%20-%20PIN%20dist.%20&%20Online%20Reg.%20-%20UG%20%5B2026-27%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Procedure for Online Registration (2026-27)",
    summary:
      "Step-by-step registration walkthrough: buy the PIN, open Candidate Registration/Login, enter the PIN serial number, 14-digit PIN and NEET roll number, fill the form, and print the registration slip. Keep your registered mobile and email active for OTPs.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Procedure%20for%20online%20registration%20%5B2026-27%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Instructions for Online Application & Registration",
    summary:
      "ACPUGMEC's detailed instructions for filling the online application correctly — personal, category, and qualification details, password setup, and common mistakes to avoid before confirming your registration.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Instructions%20for%20Online%20Application%20and%20Registartion-%20%5B2025-26%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Process of Online Admission (2026-27)",
    summary:
      "Overview of the full ACPUGMEC admission flow — registration, document verification, merit list, choice filling, seat allotment, and reporting — so you know what comes after the form is submitted.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Process%20for%20online%20Admission%20-%20%5B2026-27%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "List of Documents Required for Admission (Round 1)",
    summary:
      "Official list of documents for the ACPUGMEC UG admission process 2026-27. Document verification at help centers runs 3–13 August 2026 (till 4:00 PM) — keep originals and self-attested photocopies ready.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/List%20of%20Documents%20Required%20for%20Admission%20Process%20of%20ACPUGMEC%20R01.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Instructions for NRI Candidates (2026-27)",
    summary:
      "Guidelines for candidates applying under the NRI quota in Gujarat — eligibility, sponsorship documents, and the additional ₹10,000 Demand Draft in favour of ACPUGMEC (payable at Gandhinagar) to be sent to GMERS Medical College, Gandhinagar.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Instructions%20for%20NRI%20Candidates%20-%20UG%20%5B2026-27%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "List of Help Centers (2026-27)",
    summary:
      "Designated help centers across Gujarat for document verification and registration support. Book your verification appointment while printing the registration slip and carry photocopies along with originals.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/List%20of%20Help%20Centers%20%5B2026-27%5D.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Authority Letter for Original Documents Verification — Format",
    summary:
      "Prescribed format authorising a parent or representative to appear for document verification at the help center on the candidate's behalf. Print, fill, and sign before the appointment.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/AUTHORITY%20LETTER%20FOR%20DOCUMENTS%20VERIFICATION.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "Medical Fitness Certificate — Format",
    summary:
      "Prescribed medical fitness certificate format for the Gujarat UG admission process. Get it signed by a registered medical practitioner and keep it with your admission documents.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/Medical%20Fitness%20Certificate%20-%20Format.pdf",
    tag: "Gujarat",
  },
  {
    date: "31 July 2026",
    title: "List of MBBS Institutes with Address",
    summary:
      "All MBBS institutes in Gujarat covered under ACPUGMEC counselling, with full addresses — useful while shortlisting colleges before choice filling opens.",
    href: "https://medadmgujarat.ncode.in/web/UG2026/REG/List%20of%20MBBS%20Institutes%20with%20address.pdf",
    tag: "Gujarat",
  },
  {
    date: "16 July 2026",
    title: "Press Release for Result",
    summary:
      "NTA has issued the official press release for NEET UG 2026 results. Download the PDF for declared result details and related announcements.",
    href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/07/20260716477215762.pdf",
    tag: "NTA",
  },
  {
    date: "16 July 2026",
    title: "Final Answer Key",
    summary:
      "National Testing Agency (NTA) has officially released the final answer key for NEET UG 2026. Download the official document for verification.",
    href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/07/20260716131467523.pdf",
    tag: "NTA",
  },
  {
    date: "13 July 2026",
    title: "OMR Scanned Images & Recorded Response Challenge Open",
    summary:
      "NTA has uploaded scanned OMR answer sheets and recorded responses for NEET UG 2026 on neet.nta.nic.in (also emailed to registered IDs). Candidates can challenge recorded responses online from 13 July to 15 July 2026 (till 11:00 AM) at ₹200 per response. Login needs 2FA via OTP. Answer-key challenges are already closed — only recorded-response mismatches can be raised.",
    href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/07/20260713497007800.pdf",
    tag: "NTA",
  },
  {
    date: "27 May 2026",
    title: "Information for NRI Quota Candidates (UG/PG Counselling 2026-27)",
    summary:
      "Official notice issuing guidelines and essential documentation instructions for candidates intending to apply under the NRI quota during the upcoming NEET UG/PG counselling for academic year 2026-2027.",
    href: "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/05/2026052710250622.pdf",
    tag: "MCC",
  },
  {
    date: "May 2026",
    title: "ReNEET UG 2026 scheduled for 21 June",
    summary:
      "NTA announced a re-examination for eligible candidates; timing 2:00 PM – 5:00 PM (IST). Download the official public notice for eligibility and city intimation.",
    href: "https://neet.nta.nic.in",
    tag: "NTA",
  },
  {
    date: "April 2026",
    title: "Admit card & city intimation slip",
    summary:
      "Hall tickets for the 03 May 2026 session were released on the NTA NEET portal. ReNEET admit cards will follow the same channel when published.",
    href: "https://neet.nta.nic.in",
    tag: "NTA",
  },
  {
    date: "February 2026",
    title: "Information bulletin & registration open",
    summary:
      "NEET UG 2026 notification, syllabus reference, and online application window opened on nta.ac.in / NEET portal.",
    href: "https://exams.nta.ac.in/NEET/",
    tag: "NTA",
  },
  {
    date: "Indicative",
    title: "MCC AIQ UG counselling schedule (2026)",
    summary:
      "Medical Counselling Committee publishes round-wise registration and allotment PDFs on mcc.nic.in — typically within weeks of the NTA result.",
    href: "https://mcc.nic.in",
    tag: "MCC",
  },
];

export const NEET_UG_UPDATES_EXAM_DAY_CHECKLIST = [
  "Download ReNEET admit card from neet.nta.nic.in; verify name, photo, category, and exam city.",
  "Reporting time on the admit card is binding — reach the centre early; gates close at the time printed by NTA.",
  "Carry admit card, valid photo ID (Aadhaar / passport / school ID as listed in the bulletin), and passport photos if instructed.",
  "Do not carry phones, smartwatches, calculators, bags, or stationery unless the centre notice explicitly allows an item.",
  "Wear light clothing; follow NTA dress code (no metallic buttons, limited pockets) as in the official bulletin.",
  "Use the same name and signature as on your application; mismatches can delay verification.",
] as const;

export const NEET_UG_UPDATES_DOCUMENT_CHECKLIST = [
  "NEET UG 2026 scorecard with All India Rank (AIR) and category rank — PDF from the NTA portal.",
  "Class 10 certificate or birth proof for date of birth (as required by MCC / state portal).",
  "Class 12 mark sheet and passing certificate; NEET qualification status on the scorecard.",
  "Category certificate (SC/ST/OBC-NCL/EWS/PwBD) in the format accepted by MCC or your domicile state.",
  "Domicile / state residency proof for state quota (GJ · RJ · MP · MH rules differ — see our counselling guide).",
  "Identity proof, passport-size photographs, and active mobile number + email registered with NTA for OTP.",
  "NRI / OCI documents if applying under those quotas — college prospectus and state rules apply.",
] as const;

export const NEET_UG_UPDATES_STATE_COUNSELLING_ROWS = [
  {
    authority: "MCC — All India Quota (15%)",
    round: "Round 1 registration",
    window: "Late July 2026 (tentative)",
    status: "Tentative",
    statusColor: "amber" as const,
  },
  {
    authority: "Gujarat (ACPUGMEC)",
    round: "Registration & verification",
    window: "31 Jul – 13 Aug 2026",
    status: "Live",
    statusColor: "emerald" as const,
  },
  {
    authority: "Rajasthan (RUHS / SMFWB)",
    round: "State quota Round 1",
    window: "Early August 2026 (tentative)",
    status: "Tentative",
    statusColor: "amber" as const,
  },
  {
    authority: "Madhya Pradesh (DME)",
    round: "State quota Round 1",
    window: "Mid August 2026 (tentative)",
    status: "Tentative",
    statusColor: "amber" as const,
  },
  {
    authority: "Maharashtra (CET Cell)",
    round: "State quota Round 1",
    window: "Mid August 2026 (tentative)",
    status: "Tentative",
    statusColor: "amber" as const,
  },
] as const;

export const NEET_UG_UPDATES_STATE_COUNSELLING_FOOTNOTE =
  "Indicative Round 1 windows from 2025 cycle spacing after an August result. Confirm on mcc.nic.in and your state admission portal before registering.";

export const NEET_UG_UPDATES_FAQ: { q: string; a: string }[] = [
  {
    q: "How do I view my scanned OMR and recorded responses?",
    a: "Log in at neet.nta.nic.in with your application number and password, complete 2FA with the OTP sent to your registered mobile and email, then open “View/Challenge OMR Sheet & Recorded Responses”. NTA has also emailed a scanned OMR image to your registered email ID.",
  },
  {
    q: "What is the recorded response challenge window and fee?",
    a: "You can challenge recorded-response mismatches from 13 July to 15 July 2026 (till 11:00 AM IST) at ₹200 per response via Debit/Credit Card, Net Banking, or UPI on the NTA portal only. Per the annexure, the fee is refunded if NTA verifies that the scanning agency read your OMR incorrectly. Answer-key challenges are already closed.",
  },
  {
    q: "Who must appear for ReNEET on 21 June 2026?",
    a: "Only candidates notified by NTA in the official ReNEET notice — typically those affected by the cancelled or disrupted 03 May 2026 session or other categories specified in the PDF. If you were not asked to re-appear, your original attempt stands per NTA rules.",
  },
  {
    q: "Will ReNEET delay the NEET UG 2026 result?",
    a: "Results are usually declared after the final conducted exam and answer-key / OMR process. ReNEET can shift timelines. NTA’s mid-July 2026 target remains indicative until a fresh result notice is published.",
  },
  {
    q: "Where do I download admit card and city intimation?",
    a: "Log in to the official NEET UG portal (neet.nta.nic.in) with your application number and date of birth. Do not rely on third-party PDFs — use NTA downloads only.",
  },
  {
    q: "When does MCC AIQ counselling start?",
    a: "MCC typically opens UG AIQ registration within a few weeks of the NTA result. Watch mcc.nic.in and our live updates; dates above are planning estimates, not official allotments.",
  },
  {
    q: "Can I apply for state quota and AIQ together?",
    a: "Yes — most candidates register on mcc.nic.in for AIQ and separately on their domicile state portal for state quota. Fees, documents, and choice locking are separate; missing a state deadline cannot be fixed later.",
  },
  {
    q: "How do I get WhatsApp alerts from Dravio?",
    a: "Use the form at the top of this page or join our WhatsApp channel in the sidebar. We summarise official NTA/MCC milestones; always verify on government sites before travel or payment.",
  },
];
