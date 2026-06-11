export type RoundData = {
  t: string;
  m: string;
  d: string;
  o: string;
};

export const ROUNDS_DATA: RoundData[] = [
  {
    t: "Round 1",
    m: "REGISTRATION · CHOICE FILLING · FIRST ALLOTMENT",
    d: "Registration opens, documents are verified, and you lock your full choice list. The allotment you receive here sets your baseline — report to the college, and decide whether to hold or aim higher.",
    o: "We build your complete priority list before the window opens — every college ordered by real closing-rank data, with safety nets built in. You lock with confidence, not panic.",
  },
  {
    t: "Round 2",
    m: "UPGRADES · FRESH ALLOTMENT · CRITICAL DECISIONS",
    d: "Vacant and surrendered seats re-enter the pool. Students who opted for upgrade can move to a better college — but a wrong move here can also cost you the seat you already hold.",
    o: "After your Round 1 result, you get a written upgrade-or-lock recommendation based on actual round-over-round seat movement — not gut feeling.",
  },
  {
    t: "Mop-up Round",
    m: "REMAINING SEATS · CHANGED RULES · FAST WINDOWS",
    d: "Seats still vacant after Round 2 are offered again — often with relaxed eligibility rules that differ by state. Windows are short and rules change yearly. Many students don't even know they qualify.",
    o: "We track every state's mop-up notification the hour it drops, check your eligibility against the new rules, and alert you on WhatsApp before the window closes.",
  },
  {
    t: "Stray Vacancy",
    m: "FINAL CHANCE · COLLEGE-LEVEL ROUNDS · NOV",
    d: "The last seats — sometimes in surprisingly good colleges — are filled in stray vacancy rounds, often conducted at college level with physical presence required.",
    o: "If you're still in the hunt, we shortlist realistic stray-vacancy targets, prep your document file, and tell you exactly where to be and when.",
  },
];
