export const MBBS_INDIA_LAST_UPDATED = "May 2026";

export const MBBS_INDIA_PAGE_PATH = "/mbbs-in-india";

export { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export const COUNSEL_BOOK_CALL_URL = "/contact";

export const MBBS_INDIA_JUMP_SECTIONS = [
  { id: "colleges-seats", label: "Summary" },
  { id: "states-map", label: "By state" },
  { id: "seat-trends", label: "Seat trends" },
  { id: "cutoff-ranks", label: "Cutoffs" },
  { id: "fee-structure", label: "Fees" },
  { id: "counseling-process", label: "Counselling" },
  { id: "your-chances", label: "Your chances" },
  { id: "neet-exam", label: "NEET exam" },
  { id: "pg-after-mbbs", label: "PG after MBBS" },
  { id: "faq", label: "FAQ" },
] as const;
