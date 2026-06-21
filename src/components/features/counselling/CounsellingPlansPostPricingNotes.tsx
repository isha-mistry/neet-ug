import { COUNSELLING_PRO_BONO_EMAIL } from "@/lib/counselling/content";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";

type CounsellingPlansPostPricingNotesProps = {
  /** Page-specific class for footnote styling (`pfoot` on home, `plans-note` on counselling). */
  noteClassName: string;
};

export function CounsellingPlansPostPricingNotes({
  noteClassName,
}: CounsellingPlansPostPricingNotesProps) {
  return (
    <>
      <p className={noteClassName}>
        Not sure which fits?{" "}
        <a href={COUNSEL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Talk to us free
        </a>{" "}
        — 15 minutes, no obligation
      </p>
      <p className={cn(noteClassName, "pricing-pro-bono-note")}>
        Students can apply for a pro bono service by writing to us at{" "}
        <a href={`mailto:${COUNSELLING_PRO_BONO_EMAIL}`}>{COUNSELLING_PRO_BONO_EMAIL}</a>.
      </p>
    </>
  );
}
