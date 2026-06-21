"use client";

import { useBookCounsellingModal } from "@/components/features/leads/BookCounsellingModalProvider";
import { Button } from "@/components/ui/Button";
import { RANK_PREDICTOR_FINAL_CTA } from "@/lib/rank-predictor/page-content";

export function RankPredictorFinalCta({ onRunAgain }: { onRunAgain: () => void }) {
  const c = RANK_PREDICTOR_FINAL_CTA;
  const { openBookCounsellingModal } = useBookCounsellingModal();

  return (
    <section className="rp-final rp-bleed" id="cta">
      <div className="ms-layout-page">
        <h2>
          {c.title}
          <br />
          <em>{c.titleBreak}</em>
        </h2>
        <p className="rp-hero-lede mx-auto mt-[18px] max-w-[500px]">{c.lede}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3.5">
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              openBookCounsellingModal("rank_predictor_final_cta", {
                redirectToWhatsApp: true,
              })
            }
          >
            {c.book}
          </Button>
          <Button type="button" onClick={onRunAgain} variant="secondary">
            {c.again}
          </Button>
        </div>
        <p className="rp-final-meta">{c.meta}</p>
      </div>
    </section>
  );
}
