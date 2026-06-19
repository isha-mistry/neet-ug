"use client";

import { useState, useEffect, useRef } from "react";
import { ROUNDS_DATA } from "@/lib/journey-home/rounds-data";

const ROUND_BUTTONS = [
  { i: 0, dot: "R1", label: "Round 1", time: "AUG–SEP" },
  { i: 1, dot: "R2", label: "Round 2", time: "SEP–OCT" },
  { i: 2, dot: "M", label: "Mop-up", time: "OCT–NOV" },
  { i: 3, dot: "SV", label: "Stray vacancy", time: "NOV" },
];

export function RoundsPanel() {
  const [active, setActive] = useState(0);
  const d = ROUNDS_DATA[active];

  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tempListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (isClickScrolling.current) return;

      const nodes = [...document.querySelectorAll(".rounds-track [data-jnode]")];
      if (!nodes.length) return;

      let activeIdx = 0;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].classList.contains("hit")) {
          activeIdx = i;
        }
      }
      setActive(activeIdx);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (tempListenerRef.current) {
        window.removeEventListener("scroll", tempListenerRef.current);
      }
    };
  }, []);

  const handleRoundClick = (idx: number) => {
    setActive(idx);

    const rpanel = document.getElementById("rpanel");
    if (rpanel) {
      const rect = rpanel.getBoundingClientRect();
      const rpanelAbsoluteTop = window.scrollY + rect.top;
      const vh = window.innerHeight;

      // Match the scroll journey's linear interpolation values for rpanel.top
      let t = 0;
      if (idx === 1) t = 0.33;
      if (idx === 2) t = 0.66;
      if (idx === 3) t = 1.0;

      const targetTopOffset = vh * 0.65 - t * (vh * 0.3);
      const targetScrollY = rpanelAbsoluteTop - targetTopOffset;

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (tempListenerRef.current) {
        window.removeEventListener("scroll", tempListenerRef.current);
      }

      isClickScrolling.current = true;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });

      const checkScrollEnd = () => {
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => {
          isClickScrolling.current = false;
          window.removeEventListener("scroll", checkScrollEnd);
          tempListenerRef.current = null;
        }, 100);
      };

      tempListenerRef.current = checkScrollEnd;
      window.addEventListener("scroll", checkScrollEnd, { passive: true });

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
        window.removeEventListener("scroll", checkScrollEnd);
        tempListenerRef.current = null;
      }, 800);
    }
  };

  return (
    <>
      <div className="rounds-track" id="rtrack">
        {ROUND_BUTTONS.map((btn) => (
          <div
            key={btn.i}
            className={`rnode2${active === btn.i ? " on" : ""}`}
            data-i={btn.i}
          >
            <button type="button" onClick={() => handleRoundClick(btn.i)}>
              <span className="rdot" data-jnode>{btn.dot}</span>
              <span className="rl">{btn.label}</span>
              <span className="rt">{btn.time}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="card rpanel" id="rpanel">
        <div>
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
