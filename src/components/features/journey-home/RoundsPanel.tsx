"use client";

import { useState, useEffect, useCallback } from "react";
import { ROUNDS_DATA } from "@/lib/journey-home/rounds-data";
import {
  addRoundsScrollDelta,
  autoPinAtStep06,
  canExitRoundsScroll,
  getRoundIndex,
  getRoundsPinScrollY,
  goToRound,
  isRoundsEngageZone,
  isRoundsPinned,
  releaseRoundsPin,
  shouldClampPinnedScroll,
  subscribeActiveRound,
} from "@/lib/journey-home/rounds-bridge";

const ROUND_BUTTONS = [
  { i: 0, dot: "R1", label: "Round 1", time: "AUG–SEP" },
  { i: 1, dot: "R2", label: "Round 2", time: "SEP–OCT" },
  { i: 2, dot: "M", label: "Mop-up", time: "OCT–NOV" },
  { i: 3, dot: "SV", label: "Stray vacancy", time: "NOV" },
];

function roundNodeClass(index: number, active: number) {
  if (index === active) return "rnode2 on";
  if (index < active) return "rnode2 past";
  return "rnode2";
}

export function RoundsPanel() {
  const [active, setActive] = useState(0);
  const d = ROUNDS_DATA[active];

  const selectRound = useCallback(
    (idx: number, source: "wheel" | "touch" | "click" | "engage") => {
      if (!goToRound(idx, source)) return false;
      setActive(idx);
      return true;
    },
    [],
  );

  useEffect(() => {
    goToRound(0, "enter");
  }, []);

  useEffect(() => subscribeActiveRound(() => setActive(getRoundIndex())), []);

  useEffect(() => {
    function clampPinnedScroll() {
      if (!shouldClampPinnedScroll()) return;
      const pinY = getRoundsPinScrollY();
      if (pinY === null) return;
      if (Math.abs(window.scrollY - pinY) > 1) {
        window.scrollTo({ top: pinY, behavior: "instant" });
      }
    }

    function handleWheel(e: WheelEvent) {
      if (!isRoundsPinned()) return;

      const down = e.deltaY > 0;
      const up = e.deltaY < 0;

      if (down && canExitRoundsScroll("down")) {
        releaseRoundsPin("down");
        return;
      }

      if (up && canExitRoundsScroll("up")) {
        releaseRoundsPin("up");
        return;
      }

      e.preventDefault();
      addRoundsScrollDelta(e.deltaY, "wheel");
    }

    let touchStartY = 0;
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isRoundsEngageZone()) return;

      const diffY = touchStartY - e.touches[0].clientY;
      if (Math.abs(diffY) < 6) return;

      const down = diffY > 0;
      const up = diffY < 0;

      if (down && canExitRoundsScroll("down")) {
        releaseRoundsPin("down");
        return;
      }

      if (up && canExitRoundsScroll("up")) {
        releaseRoundsPin("up");
        return;
      }

      e.preventDefault();
      addRoundsScrollDelta(diffY, "touch");
      touchStartY = e.touches[0].clientY;
    }

    window.addEventListener("scroll", clampPinnedScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", clampPinnedScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  function handleRoundClick(idx: number) {
    if (!isRoundsPinned()) {
      autoPinAtStep06();
    }
    selectRound(idx, "click");
  }

  return (
    <>
      <div className="rounds-track" id="rtrack">
        {ROUND_BUTTONS.map((btn) => (
          <div key={btn.i} className={roundNodeClass(btn.i, active)} data-i={btn.i}>
            <button type="button" onClick={() => handleRoundClick(btn.i)}>
              <span className="rdot" data-jnode>
                {btn.dot}
              </span>
              <span className="rl">{btn.label}</span>
              <span className="rt">{btn.time}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="card rpanel" id="rpanel">
        <div className="rpanel-copy">
          <h3>
            {d.t}{" "}
            <span className="mono">{d.m}</span>
          </h3>
          <p>{d.d}</p>
        </div>
        <div className="our">
          <span className="k">What we do</span>
          <p>{d.o}</p>
        </div>
      </div>
    </>
  );
}
