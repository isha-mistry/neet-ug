"use client";

import Link from "next/link";
import { useState } from "react";
import { IndiaMiniMap } from "@/components/features/home-05/IndiaMiniMap";
import { StateDistrictMiniMap } from "@/components/features/home-05/StateDistrictMiniMap";
import {
  JOURNEY_STATES_SECTION,
  type JourneyAiqCardItem,
  type JourneyStateCardItem,
} from "@/lib/journey-home/content";

export function JourneyStateCard({ state }: { state: JourneyStateCardItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="card spot scard reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="scode">{state.code}</div>
      <div className="scard-map" aria-hidden>
        <StateDistrictMiniMap
          stateSlug={state.slug}
          variant="brand"
          emphasized={hovered}
        />
      </div>
      <h3>{state.name}</h3>
      <div className="sauth">{state.auth}</div>
      <div className="snums">
        <div>
          <b>{state.seats}</b>
          <span>seats</span>
        </div>
        <div>
          <b>{state.colleges}</b>
          <span>colleges</span>
        </div>
      </div>
      <p className="sdiff">{state.diff}</p>
      <Link className="slink" href={state.href}>
        {state.ctaLabel}
      </Link>
    </article>
  );
}

function JourneyAiqBand({ card }: { card: JourneyAiqCardItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="card spot aiq-band reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aiq-band-map" aria-hidden>
        <IndiaMiniMap variant="brand" density="feature" emphasized={hovered} />
        <span className="aiq-band-map-tag">All India · MCC AIQ</span>
      </div>
      <div className="aiq-band-body">
        <div className="scode">{card.code} · MCC</div>
        <h3>{card.name}</h3>
        <div className="sauth">{card.auth}</div>
        <div className="aiq-band-stats">
          <div>
            <b>{card.seats}</b>
            <span>AIQ seats (approx.)</span>
          </div>
          <div>
            <b>{card.colleges}</b>
            <span>Participating colleges</span>
          </div>
        </div>
        <p className="aiq-band-copy">{card.diff}</p>
        <Link className="aiq-band-cta" href={card.href}>
          {card.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

export function JourneyStateHub({
  states,
  aiq,
}: {
  states: readonly JourneyStateCardItem[];
  aiq: JourneyAiqCardItem;
}) {
  return (
    <div className="shub">
      <div className="sgrid">
        {states.map((st) => (
          <JourneyStateCard key={st.code} state={st} />
        ))}
      </div>
      <JourneyAiqBand card={aiq} />
      <p className="fun-note shub-footnote">
        {JOURNEY_STATES_SECTION.quotaOverviewLead}{" "}
        <Link href={JOURNEY_STATES_SECTION.quotaOverviewHref}>
          <b>{JOURNEY_STATES_SECTION.quotaOverviewLinkLabel}</b>
        </Link>
      </p>
    </div>
  );
}

export const JourneyStateGrid = JourneyStateHub;
