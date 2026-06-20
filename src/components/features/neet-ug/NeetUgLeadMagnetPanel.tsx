"use client";

import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { GuideCard } from "@/components/features/neet-ug/shared/NeetUgSharedParts";

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
    <GuideCard className="gradient-border-panel relative overflow-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 border-b border-outline-variant pb-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary"
            aria-hidden
          >
            <span className="material-symbols-outlined block text-[22px] leading-none">description</span>
          </span>
          <div>
            <h3 className="text-base font-bold leading-snug text-on-surface">{content.formTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
              {content.formSubtitle}
            </p>
          </div>
        </div>

        <FreeCounsellingLeadForm
          variant="embedded"
          pageLabel={pageLabel}
          fields="name-phone-only"
          submitLabel={content.submitLabel}
          whatsappIntro={content.whatsappIntro}
        />
      </div>
    </GuideCard>
  );
}
