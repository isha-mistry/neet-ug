"use client";

import { NEET_UG_HUB_LEAD_MAGNET } from "@/lib/neet-ug-2026/hub-content";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";

export function NeetUgHeroLeadMagnet() {
  return (
    <NeetUgLeadMagnetPanel
      pageLabel="NEET UG 2026"
      content={NEET_UG_HUB_LEAD_MAGNET}
      formType={LEAD_FORM_TYPES.neetUg2026InfoAlerts}
      redirectToWhatsApp={false}
      consentFieldId="lead-neet-ug-2026-hub-info-consent"
    />
  );
}
