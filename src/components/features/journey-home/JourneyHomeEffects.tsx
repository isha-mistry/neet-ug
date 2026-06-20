"use client";

import { useEffect } from "react";
import { fmtIN } from "@/lib/journey-home/format";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function countUp(
  el: HTMLElement,
  target: number,
  suffix: string,
  reduceMotion: boolean,
) {
  if (reduceMotion) {
    el.textContent = fmtIN(target) + suffix;
    return;
  }
  const dur = 1800;
  const t0 = performance.now();
  const tick = (t: number) => {
    const p = Math.min((t - t0) / dur, 1);
    const e = 1 - (1 - p) ** 3;
    el.textContent = fmtIN(target * e) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function JourneyHomeEffects() {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.querySelector(".journey-home");
    if (!root) return;

    const revealEls = root.querySelectorAll<HTMLElement>(
      ".reveal:not([data-rounds-reveal])",
    );
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            countUp(
              el,
              Number(el.dataset.count),
              el.dataset.suffix ?? "",
              reduceMotion,
            );
            cio.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cio.observe(el));

    const chip = root.querySelector<HTMLElement>("#chipnum");
    if (chip) countUp(chip, 2279743, "", reduceMotion);

    const fio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const bar = e.target.querySelector<HTMLElement>(".fbarw i");
            const row = e.target as HTMLElement;
            if (bar && row.dataset.w) bar.style.width = `${row.dataset.w}%`;
            fio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    root.querySelectorAll<HTMLElement>(".frow").forEach((el) => fio.observe(el));

    root.querySelectorAll<HTMLElement>(".spot").forEach((c) => {
      const onMove = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", `${e.clientX - r.left}px`);
        c.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      c.addEventListener("mousemove", onMove);
      c.addEventListener("mouseleave", () => {
        c.style.removeProperty("--mx");
        c.style.removeProperty("--my");
      });
    });

    const mtrack = root.querySelector<HTMLElement>("#mtrack");
    if (mtrack && mtrack.children.length) {
      mtrack.innerHTML += mtrack.innerHTML;
      if (reduceMotion) mtrack.style.animation = "none";
    }

    return () => {
      io.disconnect();
      cio.disconnect();
      fio.disconnect();
    };
  }, [reduceMotion]);

  return null;
}
