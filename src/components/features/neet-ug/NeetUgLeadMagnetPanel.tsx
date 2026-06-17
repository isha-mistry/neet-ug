"use client";

import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { FormPanel } from "@/components/features/rank-predictor/RankPredictorParts";

export type NeetUgLeadMagnetContent = {
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  whatsappIntro: string;
};

export function NeetUgLeadMagnetPanel({
  pageLabel,
  content,
}: {
  pageLabel: string;
  content: NeetUgLeadMagnetContent;
}) {
  return (
    <FormPanel title={content.formTitle} subtitle={content.formSubtitle}>
      <div className="rp-form-stack flex flex-col gap-4">
        <FreeCounsellingLeadForm
          variant="embedded"
          embeddedInPanel
          pageLabel={pageLabel}
          fields="name-phone-only"
          submitLabel={content.submitLabel}
          whatsappIntro={content.whatsappIntro}
        />
      </div>
    </FormPanel>
  );
}
