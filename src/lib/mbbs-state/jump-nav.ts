import type { MbbsStateConfig } from "./types";

const BASE_JUMP = [
  { id: "summary", label: "Summary" },
  { id: "colleges-list", label: "All colleges" },
  { id: "top-govt", label: "Top govt colleges" },
  { id: "cutoffs", label: "Cutoffs" },
  { id: "domicile", label: "Domicile rules" },
  { id: "counseling", label: "Counseling" },
  { id: "fees", label: "Fees" },
  { id: "seats-data", label: "Seat data" },
  { id: "your-chances", label: "Your chances" },
  { id: "documents", label: "Documents" },
  { id: "faq", label: "FAQ" },
] as const;

export type MbbsStateJumpItem = { id: string; label: string };

/** Sidebar / mobile jump links; inserts optional sections when present in config. */
export function buildMbbsStateJumpSections(config: MbbsStateConfig): MbbsStateJumpItem[] {
  const ext = config.contentExtensions;
  const items: MbbsStateJumpItem[] = [];

  for (const entry of BASE_JUMP) {
    if (entry.id === "summary" && ext?.whyChoose?.length) {
      items.push(entry);
      items.push({ id: "why-choose", label: `Why ${config.name}` });
      continue;
    }
    if (entry.id === "top-govt" && ext?.govtSeatMatrix?.length) {
      items.push(entry);
      items.push({ id: "govt-seat-matrix", label: "Govt seat matrix" });
      continue;
    }
    if (entry.id === "domicile" && ext?.neetCounselingEligibility?.length) {
      items.push({ id: "eligibility", label: "NEET eligibility" });
      items.push(entry);
      continue;
    }
    if (entry.id === "fees" && ext?.bondServiceRules?.length) {
      items.push(entry);
      items.push({ id: "service-bond", label: "Service bond" });
      continue;
    }
    items.push(entry);
  }

  return items;
}

/** @deprecated Use buildMbbsStateJumpSections(config) for state pages. */
export const MBBS_STATE_JUMP = BASE_JUMP;
