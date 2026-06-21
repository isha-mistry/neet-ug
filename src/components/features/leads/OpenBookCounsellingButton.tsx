"use client";

import { useBookCounsellingModal } from "@/components/features/leads/BookCounsellingModalProvider";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type OpenBookCounsellingButtonProps = {
  children: ReactNode;
  /** Passed to the modal as lead attribution (e.g. `about:final`, `counselling:hero`). */
  modalSource: string;
  className?: string;
};

/** Opens the site-wide book counselling modal; saves as `free-counselling`, no WhatsApp redirect. */
export function OpenBookCounsellingButton({
  children,
  modalSource,
  className = "btn btn-blue",
}: OpenBookCounsellingButtonProps) {
  const { openBookCounsellingModal } = useBookCounsellingModal();

  return (
    <button
      type="button"
      className={cn(className, "cursor-pointer")}
      onClick={() =>
        openBookCounsellingModal(modalSource, { redirectToWhatsApp: false })
      }
    >
      {children}
    </button>
  );
}
