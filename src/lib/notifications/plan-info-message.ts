import {
  buildPersonalizedChecklist,
  formatChecklistForWhatsApp,
} from "@/lib/counselling/document-checklist-content";
import { getLeadPlanName, getLeadQuota } from "@/lib/leads/plan-fields";
import { NEET_UG_UPDATES_NOTICE_FEED } from "@/lib/neet-ug-2026/updates-content";
import { SITE_URL } from "@/lib/seo/site-config";

export type PlanInfoLeadLike = {
  name: string | null;
  variant: string | null;
  neetCategory: string | null;
  domicileState: string | null;
  rawPayload: unknown;
};

export { getLeadPlanName, getLeadQuota };

export function buildPlanInfoWhatsAppMessage(lead: PlanInfoLeadLike): string {
  const name = lead.name?.trim() || "there";
  const planName = getLeadPlanName(lead);
  const quota = getLeadQuota(lead.rawPayload);
  const checklist = buildPersonalizedChecklist({
    category: lead.neetCategory,
    quota,
    domicileState: lead.domicileState,
  });

  const updatesUrl = `${SITE_URL}/neet-ug-2026/updates`;
  const predictorUrl = `${SITE_URL}/college-predictor`;

  const recentNotices = NEET_UG_UPDATES_NOTICE_FEED.slice(0, 3)
    .map((n) => `• [${n.tag}] ${n.title}`)
    .join("\n");

  const lines = [
    `Hi ${name},`,
    `Your Dravio ${planName} plan is confirmed. Here is what you need next.`,
    "",
    "1) College Predictor + Excel shortlist",
    `Open ${predictorUrl}`,
    "Unlock your college list with this WhatsApp number. If your plan purchase is confirmed, you can download the full Excel shortlist of matched colleges.",
    "",
    "2) MCC + state counselling alerts",
    "You are enrolled for counselling update alerts on this WhatsApp (MCC and focus-state counselling notices).",
    `Latest notices hub: ${updatesUrl}`,
    recentNotices ? `Recent notices:\n${recentNotices}` : null,
    "",
    "3) Personalized document checklist",
    quota
      ? `Based on category${lead.neetCategory ? ` (${lead.neetCategory})` : ""} and quota (${quota}):`
      : "Based on your category and quota:",
    formatChecklistForWhatsApp(checklist),
    "",
    "Reply on this chat if you need help with any document or the predictor export.",
    "— Team Dravio",
  ];

  return lines.filter((line) => line != null).join("\n");
}
