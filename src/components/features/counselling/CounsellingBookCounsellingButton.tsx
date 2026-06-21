"use client";

import { OpenBookCounsellingButton } from "@/components/features/leads/OpenBookCounsellingButton";
import type { ReactNode } from "react";

type CounsellingBookCounsellingButtonProps = {
  children: ReactNode;
  /** Attribution segment stored on the lead (prefixed with `counselling:`). */
  source: string;
  className?: string;
};

export function CounsellingBookCounsellingButton({
  children,
  source,
  className,
}: CounsellingBookCounsellingButtonProps) {
  return (
    <OpenBookCounsellingButton
      modalSource={`counselling:${source}`}
      className={className}
    >
      {children}
    </OpenBookCounsellingButton>
  );
}
