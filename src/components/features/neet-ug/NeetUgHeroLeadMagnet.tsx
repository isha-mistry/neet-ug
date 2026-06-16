"use client";

"use client";

import { NEET_UG_HUB_LEAD_MAGNET } from "@/lib/neet-ug-2026/hub-content";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";

export function NeetUgHeroLeadMagnet() {
  return (
    <NeetUgLeadMagnetPanel pageLabel="NEET UG 2026" content={NEET_UG_HUB_LEAD_MAGNET} />
  );
}
