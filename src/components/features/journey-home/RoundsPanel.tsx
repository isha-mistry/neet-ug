"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ROUNDS_DATA } from "@/lib/journey-home/rounds-data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ROUND_BUTTONS = [
  { i: 0, dot: "R1", label: "Round 1", time: "AUG–SEP" },
  { i: 1, dot: "R2", label: "Round 2", time: "SEP–OCT" },
  { i: 2, dot: "M", label: "Mop-up", time: "OCT–NOV" },
  { i: 3, dot: "SV", label: "Stray vacancy", time: "NOV" },
];

function showReveal(el: HTMLElement) {
  el.classList.add("in");
}

function isInRevealViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.top < vh * 0.92 && rect.bottom > vh * 0.06;
}

export function RoundsPanel() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const experienceRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const scrollToRound = useCallback((idx: number) => {
    const el = rowRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setActive(idx);
  }, []);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const idx = Number(
          (visible[0].target as HTMLElement).dataset.roundStep ?? 0,
        );
        setActive(idx);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.2, 0.45, 0.7, 1],
      },
    );

    rows.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = experienceRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-rounds-reveal]");
    if (!targets.length) return;

    if (reduceMotion) {
      targets.forEach((el) => showReveal(el));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showReveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => {
      if (isInRevealViewport(el)) {
        showReveal(el);
        return;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={experienceRef}
      className="rounds-experience"
      id="rounds-experience"
    >
      {ROUND_BUTTONS.map((btn, i) => {
        const d = ROUNDS_DATA[i];
        const state =
          i === active ? "is-active" : i < active ? "is-past" : "is-upcoming";

        return (
          <article
            key={btn.i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={`rounds-row ${state}`}
            data-round-step={i}
          >
            <div
              className="rounds-row-anim reveal"
              data-rounds-reveal
            >
              <button
                type="button"
                className="rounds-row-marker"
                onClick={() => scrollToRound(i)}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="rdot">{btn.dot}</span>
                <span className="rounds-marker-text">
                  <span className="rl">{btn.label}</span>
                  <span className="rt">{btn.time}</span>
                </span>
              </button>

              <div className="card rpanel rounds-row-card">
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
            </div>
          </article>
        );
      })}
    </div>
  );
}
