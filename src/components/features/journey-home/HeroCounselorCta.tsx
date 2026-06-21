"use client";

import { useBookCounsellingModal } from "@/components/features/leads/BookCounsellingModalProvider";

export function HeroCounselorCta() {
  const { openBookCounsellingModal } = useBookCounsellingModal();

  return (
    <button
      type="button"
      className="btn btn-line"
      onClick={() => openBookCounsellingModal("home_hero")}
    >
      Talk to a counselor
    </button>
  );
}
