"use client";

import Link from "next/link";
import { useState } from "react";
import { COUNSELLING_PLANS } from "@/lib/counselling/content";
import { COUNSEL_BOOK_CALL_URL } from "@/lib/mbbs-state/constants";
import { JOURNEY_PACKAGE_CTAS } from "@/lib/journey-home/content";
import { cn } from "@/lib/utils";
import {
  JourneyLeadModal,
  type JourneyLeadModalVariant,
} from "./JourneyLeadModal";

type OpenPlan = JourneyLeadModalVariant | null;

const MODAL_BY_PLAN_ID: Record<
  (typeof COUNSELLING_PLANS.plans)[number]["id"],
  JourneyLeadModalVariant
> = {
  essentials: "essentials",
  expert: "expert",
  premium: "premium",
};

export function JourneyPackagePacks() {
  const [openPlan, setOpenPlan] = useState<OpenPlan>(null);

  const modalConfig =
    openPlan === "essentials"
      ? JOURNEY_PACKAGE_CTAS.essentials
      : openPlan === "expert"
        ? JOURNEY_PACKAGE_CTAS.expert
        : openPlan === "premium"
          ? JOURNEY_PACKAGE_CTAS.premium
          : null;

  return (
    <>
      <div className="packs">
        {COUNSELLING_PLANS.plans.map((plan) => (
          <article
            key={plan.id}
            className={cn("card spot pack reveal", plan.popular && "pop")}
          >
            {plan.popular ? <span className="pflag">Most popular</span> : null}
            <h3>{plan.name}</h3>
            <p className="for">{plan.tag}</p>
            <div className="pr">
              ₹{plan.price}
              {plan.per ? <small>{plan.per}</small> : null}
            </div>
            <ul>
              {plan.features.map((feature) =>
                feature.type === "head" ? (
                  <li key={feature.text} className="up">
                    {feature.text}
                  </li>
                ) : (
                  <li key={feature.text}>{feature.text}</li>
                ),
              )}
            </ul>
            <button
              type="button"
              className={plan.ctaVariant === "blue" ? "btn btn-blue" : "btn btn-line"}
              onClick={() => setOpenPlan(MODAL_BY_PLAN_ID[plan.id])}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
      <p className="pfoot">
        Not sure which fits?{" "}
        <Link href={COUNSEL_BOOK_CALL_URL}>Book a free 30-minute review</Link> — we&apos;ll
        suggest the right plan for your case.
      </p>

      {openPlan && modalConfig ? (
        <JourneyLeadModal
          open
          variant={openPlan}
          redirectTo={JOURNEY_PACKAGE_CTAS.redirectTo}
          onClose={() => setOpenPlan(null)}
          introLine={modalConfig.introLine}
          lede={modalConfig.modalLede}
        />
      ) : null}
    </>
  );
}
