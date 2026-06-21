"use client";

import { BookCounsellingLeadForm } from "@/components/features/leads/BookCounsellingLeadForm";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { cn } from "@/lib/utils";

const quotaBookCounsellingCardClass =
  "rounded-[20px] border border-outline-variant/60 bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(37,70,208,0.18)] md:p-6";

export function QuotaBookCounsellingCard({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  return (
    <BookCounsellingLeadForm
      source={source}
      formType={LEAD_FORM_TYPES.freeCounselling}
      redirectToWhatsApp={false}
      className={cn(quotaBookCounsellingCardClass, className)}
    />
  );
}
