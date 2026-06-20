"use client";

import { FiArrowRight } from "react-icons/fi";
import { GuideCard } from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { Button } from "@/components/ui/Button";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export function WhatsAppCommunityCard({ className }: { className?: string }) {
  return (
    <GuideCard className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-secondary"
            aria-hidden
          >
            <span className="material-symbols-outlined block text-[22px] leading-none">forum</span>
          </span>
          <div className="min-w-0 flex-1 space-y-1.5">
            <span className="inline-flex w-fit items-center rounded-full bg-secondary-fixed/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              Community
            </span>
            <h3 className="text-base font-bold leading-snug text-on-surface">
              Join WhatsApp updates
            </h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          Merit lists, PDF notices, and choice-filling reminders — pushed when NTA and MCC publish.
        </p>
        <Button
          as="link"
          href={COUNSEL_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="md"
          fullWidth
          trailingIcon={<FiArrowRight className="text-lg" aria-hidden />}
        >
          Join on WhatsApp
        </Button>
      </div>
    </GuideCard>
  );
}
