export type OpenClosedStatusKind =
  | "open"
  | "closed"
  | "conditional"
  | "none";

export type OpenClosedStateRow = {
  state: string;
  status: string;
  kind: OpenClosedStatusKind;
  /** Optional deep link when a Dravio state guide exists. */
  href?: string;
};

export const OPEN_CLOSED_STATES_HERO = {
  eyebrow: "Counselling Geography",
  title: "Open & Closed",
  highlightedText: "States",
  description:
    "Which states allow outside-state students into private MBBS seats — and which keep private management seats domicile-only. Use this map before you shortlist colleges, fees, and NRI options.",
} as const;

export const OPEN_CLOSED_STATES_JUMP = [
  { id: "definitions", label: "Definitions" },
  { id: "full-list", label: "Full list" },
  { id: "why-it-matters", label: "Why it matters" },
  { id: "highlights", label: "State notes" },
  { id: "faq", label: "FAQ" },
] as const;

export const OPEN_CLOSED_DEFINITIONS = [
  {
    icon: "lock_open",
    title: "What are open states?",
    body: "Open states let students from other Indian states take admission in private medical colleges under management, NRI, or (in some states) institutional quota — subject to that year’s counselling bulletin.",
  },
  {
    icon: "lock",
    title: "What are closed states?",
    body: "Closed states generally do not allow outside-state students into private college management seats. Deemed universities remain a separate all-India pool and are not bound by state open/closed rules.",
  },
  {
    icon: "schedule",
    title: "Conditional / round-wise open",
    body: "Some states stay domicile-first in early rounds and open leftover private seats later (for example Madhya Pradesh from Round 2, Rajasthan from Round 3). Maharashtra often opens only institutional quota seats to outsiders.",
  },
] as const;

/** Indicative private-college open/closed status for outside-state candidates (2026 planning). Always verify the latest state bulletin. */
export const OPEN_CLOSED_STATE_ROWS: OpenClosedStateRow[] = [
  { state: "Andaman & Nicobar Islands", status: "No private college", kind: "none" },
  { state: "Andhra Pradesh", status: "Open", kind: "open" },
  { state: "Arunachal Pradesh", status: "No private college", kind: "none" },
  { state: "Assam", status: "No private college", kind: "none" },
  { state: "Bihar", status: "Open", kind: "open" },
  { state: "Chandigarh", status: "No private college", kind: "none" },
  { state: "Chhattisgarh", status: "Open", kind: "open" },
  { state: "Dadra and Nagar Haveli", status: "No private college", kind: "none" },
  { state: "Delhi (NCT)", status: "No private college", kind: "none" },
  { state: "Goa", status: "No private college", kind: "none" },
  {
    state: "Gujarat",
    status: "Closed",
    kind: "closed",
    href: "/mbbs-in-india/gujarat",
  },
  { state: "Haryana", status: "Open", kind: "open" },
  { state: "Himachal Pradesh", status: "Open", kind: "open" },
  { state: "Jammu & Kashmir", status: "Closed", kind: "closed" },
  { state: "Jharkhand", status: "Open", kind: "open" },
  { state: "Karnataka", status: "Open", kind: "open" },
  { state: "Kerala", status: "Open", kind: "open" },
  {
    state: "Madhya Pradesh",
    status: "Open from Round 2 of counselling",
    kind: "conditional",
    href: "/mbbs-in-india/madhya-pradesh",
  },
  {
    state: "Maharashtra",
    status: "Open only for institutional quota seats",
    kind: "conditional",
    href: "/mbbs-in-india/maharashtra",
  },
  { state: "Manipur", status: "Open", kind: "open" },
  { state: "Meghalaya", status: "No private college", kind: "none" },
  { state: "Mizoram", status: "No private college", kind: "none" },
  { state: "Odisha", status: "Closed", kind: "closed" },
  { state: "Puducherry", status: "Open", kind: "open" },
  { state: "Punjab", status: "Closed", kind: "closed" },
  {
    state: "Rajasthan",
    status: "Open from Round 3 of counselling",
    kind: "conditional",
    href: "/mbbs-in-india/rajasthan",
  },
  { state: "Sikkim", status: "Open", kind: "open" },
  { state: "Tamil Nadu", status: "Open", kind: "open" },
  { state: "Telangana", status: "Open", kind: "open" },
  { state: "Tripura", status: "Open", kind: "open" },
  { state: "Uttar Pradesh", status: "Open", kind: "open" },
  { state: "Uttarakhand", status: "Open", kind: "open" },
  { state: "West Bengal", status: "Open", kind: "open" },
];

export const OPEN_CLOSED_WHY_IT_MATTERS = [
  {
    icon: "travel_explore",
    title: "More college options",
    body: "Open states expand private and NRI choices beyond your domicile — useful when home-state cutoffs or fees do not fit your rank.",
  },
  {
    icon: "payments",
    title: "Fee and budget planning",
    body: "Private fee bands differ widely by state. Knowing where you are eligible early avoids shortlisting closed-state colleges you cannot join.",
  },
  {
    icon: "event_repeat",
    title: "Round timing strategy",
    body: "Conditional states (MP, Rajasthan, Maharashtra institutional) need a round-wise plan — stay registered and watch vacancy notices.",
  },
  {
    icon: "school",
    title: "Deemed still open",
    body: "Deemed universities counselled via MCC are open to all-India candidates for management/NRI seats and do not follow state open/closed domicile walls.",
  },
] as const;

export const OPEN_CLOSED_HIGHLIGHTS = [
  {
    title: "Uttar Pradesh",
    body: "One of the largest open private pools — frequently used by outside-state and NRI candidates for management seats.",
  },
  {
    title: "Karnataka & Tamil Nadu",
    body: "Strong open private ecosystems with large seat matrices; institutional / management rules vary by college and year.",
  },
  {
    title: "Haryana & Puducherry",
    body: "Popular open destinations for NRI and management quota aspirants seeking NCR-adjacent or coastal options.",
  },
  {
    title: "Rajasthan (from Round 3)",
    body: "Typically domicile-first early; leftover private seats may open to other states from Round 3 — confirm each year’s bulletin.",
  },
  {
    title: "Madhya Pradesh (from Round 2)",
    body: "Often opens private seats to non-domiciles from the second round if vacancies remain.",
  },
  {
    title: "Maharashtra (institutional)",
    body: "State quota private seats stay domicile-linked; institutional quota seats are the usual path for outside-state candidates.",
  },
  {
    title: "Gujarat, Punjab, Odisha",
    body: "Remain closed for outside-state private management seats in typical years — check deemed/NRI exceptions separately.",
  },
  {
    title: "No private college UTs / states",
    body: "Andaman & Nicobar, Arunachal Pradesh, Assam, Chandigarh, Delhi NCT, Dadra & Nagar Haveli, Goa, Meghalaya, Mizoram — open/closed private rules do not apply when there is no private MBBS college.",
  },
] as const;

export const OPEN_CLOSED_FAQ: { q: string; a: string }[] = [
  {
    q: "Which open states are commonly targeted for private MBBS?",
    a: "Uttar Pradesh, Karnataka, Tamil Nadu, Haryana, Puducherry, Bihar, and Telangana are frequently shortlisted. Always match fees, recognition, and the current seat matrix.",
  },
  {
    q: "Which states usually stay closed for outside-state private seats?",
    a: "Gujarat, Punjab, Odisha, and Jammu & Kashmir are typically closed for private management seats for non-domiciles. Rules can change — verify the latest prospectus.",
  },
  {
    q: "Can outside students take NRI quota seats in closed states?",
    a: "NRI / OCI eligibility is often separate from domicile walls for management seats. Closed states may still publish NRI seats — check that state’s NRI chapter and document list.",
  },
  {
    q: "Do open states help lower NEET scores?",
    a: "They expand the private seat universe, which can improve chances at higher fee bands. Score still matters within each college’s cutoff; use a college predictor with your AIR and category.",
  },
  {
    q: "Do deemed universities follow open/closed state rules?",
    a: "No. Deemed MBBS seats (management / NRI) are counselled through MCC on an all-India basis and are not restricted by state domicile open/closed policy.",
  },
];

export const OPEN_CLOSED_RELATED_LINKS = [
  { label: "Management quota guide", href: "/quota/management" },
  { label: "NRI quota guide", href: "/quota/nri" },
  { label: "Deemed universities", href: "/quota/deemed" },
  { label: "State quota overview", href: "/quota/state" },
  { label: "Counselling portals", href: "/quota/counselling-resources" },
  { label: "MBBS in India", href: "/mbbs-in-india" },
  { label: "College predictor", href: "/college-predictor" },
] as const;

export const OPEN_CLOSED_FOOTNOTE =
  "Status is indicative for private MBBS counselling planning (2026). State policies, round-wise openings, and institutional quota rules change yearly — confirm on the official state counselling portal before registering or paying.";
