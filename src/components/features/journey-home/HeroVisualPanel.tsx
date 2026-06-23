"use client";

import { useState } from "react";
import {
  HeroParticleStage,
  type HeroMorphPhase,
} from "./HeroParticleStage";

export function HeroVisualPanel() {
  const [morphPhase, setMorphPhase] = useState<HeroMorphPhase>("applicants");

  return (
    <div className="hpanel reveal in">
      <span className="pl">
        LIVE · <b>22,79,743 APPLICANTS → 1,29,753 SEATS</b>
      </span>
      <HeroParticleStage onMorphPhaseChange={setMorphPhase} />
      <div className="hp-chip a">
        <b id="chipnum">22,79,743</b>
        <span>registered for NEET 2026</span>
      </div>
      <div className="hp-chip b">
        <b>1,29,753</b>
        <span>MBBS seats exist</span>
      </div>
      <div
        className="hp-legend"
        data-active={morphPhase}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="l1">
          applicants <i aria-hidden="true" />
        </div>
        <div className="l2">
          seats <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
