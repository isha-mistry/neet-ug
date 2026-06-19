"use client";

import { useMemo, useState } from "react";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { JOURNEY_PACKAGE_CTAS } from "@/lib/journey-home/content";
import {
  JourneyLeadModal,
  type JourneyLeadModalVariant,
} from "./JourneyLeadModal";

type OpenPlan = JourneyLeadModalVariant | null;

export function JourneyPackagePacks() {
  const [openPlan, setOpenPlan] = useState<OpenPlan>(null);

  const planHelpUrl = useMemo(() => {
    const base = COUNSEL_WHATSAPP_URL.split("?")[0];
    return `${base}?text=${encodeURIComponent(JOURNEY_PACKAGE_CTAS.planHelpWhatsAppIntro)}`;
  }, []);

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
        <article className="card spot pack reveal">
          <h3>Essentials</h3>
          <p className="for">
            For confident students who want every tool unlocked and the data to decide
            themselves.
          </p>
          <div className="pr">
            ₹2,999<small> /season</small>
          </div>
          <ul>
            <li>Cutoff Analyser — full unlock</li>
            <li>College Predictor + exportable choice list</li>
            <li>Rank Predictor, all 4 state ranks</li>
            <li>Personalized document checklist</li>
            <li>Round Tracker with alerts</li>
            <li>Counseling Playbook PDF</li>
          </ul>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setOpenPlan("essentials")}
          >
            {JOURNEY_PACKAGE_CTAS.essentials.buttonLabel}
          </button>
        </article>
        <article className="card spot pack pop reveal">
          <span className="pflag">Most popular</span>
          <h3>Expert</h3>
          <p className="for">
            End-to-end support through every round, with a counselor who knows your case.
          </p>
          <div className="pr">
            ₹9,999<small> /season</small>
          </div>
          <ul>
            <li className="up">Everything in Essentials +</li>
            <li>1-on-1 session with an MBBS expert (60 min)</li>
            <li>Choice list for every state &amp; round</li>
            <li>Strategy note before each round</li>
            <li>Upgrade-or-lock call after each allotment</li>
            <li>Priority WhatsApp support, Aug–Nov</li>
            <li>Written domicile &amp; quota eligibility report</li>
          </ul>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => setOpenPlan("expert")}
          >
            {JOURNEY_PACKAGE_CTAS.expert.buttonLabel}
          </button>
        </article>
        <article className="card spot pack reveal">
          <h3>Premium</h3>
          <p className="for">
            Maximum attention, multi-state strategy and NRI quota guidance for the family.
          </p>
          <div className="pr">
            ₹19,999<small> /season</small>
          </div>
          <ul>
            <li className="up">Everything in Expert +</li>
            <li>Unlimited counselor calls all season</li>
            <li>Separate parent briefing (30 min)</li>
            <li>NRI quota eligibility &amp; documentation</li>
            <li>Parallel strategy across all 4 states</li>
            <li>Post-admission: bond, hostel, joining</li>
          </ul>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setOpenPlan("premium")}
          >
            {JOURNEY_PACKAGE_CTAS.premium.buttonLabel}
          </button>
        </article>
      </div>
      <p className="pfoot">
        Not sure which fits?{" "}
        <a href={planHelpUrl} target="_blank" rel="noopener noreferrer">
          Talk to us free — 15 minutes
        </a>
        , no obligation.
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
