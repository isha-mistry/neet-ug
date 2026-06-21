"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE } from "@/lib/mbbs-state/constants";
import { JourneyLeadModal } from "./JourneyLeadModal";

export type JourneyCounsellingLeadTriggerConfig = {
  modalIntroLine: string;
  modalLede: string;
  pageLabel: string;
  pageSection: string;
  leadVariant: string;
};

type JourneyCounsellingLeadTriggerProps = {
  label: string;
  className?: string;
  pageHash: string;
  config: JourneyCounsellingLeadTriggerConfig;
};

export function JourneyCounsellingLeadTrigger({
  label,
  className = "btn btn-blue",
  pageHash,
  config,
}: JourneyCounsellingLeadTriggerProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pagePath = `${pathname.split("#")[0] || "/"}#${pageHash}`;

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      <JourneyLeadModal
        key={open ? `${config.pageSection}-open` : `${config.pageSection}-closed`}
        open={open}
        variant="essentials"
        redirectTo="/counselling"
        introLine={config.modalIntroLine}
        lede={config.modalLede}
        ledeEmphasis
        pageLabel={config.pageLabel}
        pagePath={pagePath}
        pageSection={config.pageSection}
        leadVariant={config.leadVariant}
        whatsappMessageAfterSubmit={FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
