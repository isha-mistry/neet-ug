"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  autoPinAtStep06,
  getPinnedPathTarget,
  getRoundIndex,
  hasRoundsCompletedDown,
  isExitingUpTo06,
  isHeadingAtPinLine,
  isRoundsPinned,
  NAV_HEIGHT,
  reenterRoundsFrom07,
  reportSmoothProgress,
  resetRoundsCompletedDown,
  setPointerAtStep06,
  setRoundFracs,
  setStep06Frac,
} from "@/lib/journey-home/rounds-bridge";

export function ScrollJourney({ children }: { children: ReactNode }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const journeyEl = journeyRef.current;
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!journeyEl || !svg || !dot) return;
    const root = journeyEl;
    const rootSvg = svg;
    const rootDot = dot;

    const trackEl = rootSvg.querySelector<SVGPathElement>(".track");
    const progEl = rootSvg.querySelector<SVGPathElement>(".prog");
    if (!trackEl || !progEl) return;
    const track = trackEl;
    const prog = progEl;

    let total = 0;
    let nodeFracs: number[] = [];
    let tailStart = 0.45;
    let smooth = 0;
    let targetP = 0;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let roundsR1Idx = -1;
    let step06Idx = -1;
    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const getNodes = () =>
      [...root.querySelectorAll<HTMLElement>("[data-jnode]")];

    function getRoundsIndices(nodes: HTMLElement[]) {
      const r1Idx = nodes.findIndex((n) => n.textContent?.trim() === "R1");
      const svIdx = nodes.findIndex((n) => n.textContent?.trim() === "SV");
      const s06 = nodes.findIndex((n) => n.textContent?.trim() === "06");
      return { r1Idx, svIdx, step06Idx: s06 };
    }

    function syncRoundFracs() {
      const nodes = getNodes();
      const { r1Idx, svIdx, step06Idx: s06 } = getRoundsIndices(nodes);
      roundsR1Idx = r1Idx;
      step06Idx = s06;
      if (s06 >= 0 && nodeFracs[s06] !== undefined) {
        setStep06Frac(nodeFracs[s06]);
      }
      if (r1Idx === -1 || svIdx === -1) {
        setRoundFracs([]);
        return;
      }
      const fracs: number[] = [];
      for (let i = r1Idx; i <= svIdx; i++) {
        if (nodeFracs[i] !== undefined) fracs.push(nodeFracs[i]);
      }
      setRoundFracs(fracs);
    }

    function roundTargetP() {
      if (roundsR1Idx === -1) return null;
      const idx = roundsR1Idx + getRoundIndex();
      return nodeFracs[idx] ?? null;
    }

    function pinnedTargetP() {
      const pinnedTarget = getPinnedPathTarget();
      if (pinnedTarget !== null) return pinnedTarget;
      if (isExitingUpTo06()) {
        if (step06Idx >= 0 && nodeFracs[step06Idx] !== undefined) {
          return nodeFracs[step06Idx];
        }
      }
      return roundTargetP();
    }

    function buildPath() {
      const nodes = getNodes();
      if (!nodes.length) return;

      const jr = root.getBoundingClientRect();
      const jTop = jr.top + window.scrollY;
      const W = root.offsetWidth;
      const H = root.offsetHeight;
      rootSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      rootSvg.setAttribute("width", String(W));
      rootSvg.setAttribute("height", String(H));

      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - jr.left,
          y: r.top + r.height / 2 + window.scrollY - jTop,
        };
      });

      let d = `M ${pts[0].x} ${Math.max(pts[0].y - 90, 0)} L ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const midY = (a.y + b.y) / 2;
        d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
      }
      track.setAttribute("d", d);
      prog.setAttribute("d", d);
      total = prog.getTotalLength();
      prog.style.strokeDasharray = String(total);
      prog.style.strokeDashoffset = String(total);

      nodeFracs = pts.map((p) => {
        let best = 0;
        let bd = Infinity;
        for (let i = 0; i <= 400; i++) {
          const q = prog.getPointAtLength((total * i) / 400);
          const dd = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
          if (dd < bd) {
            bd = dd;
            best = i / 400;
          }
        }
        return best;
      });

      if (nodeFracs.length > 3) {
        tailStart = nodeFracs[3];
      }

      syncRoundFracs();
    }

    function mapScrollProgress(raw: number): number {
      const split = Math.max(tailStart - 0.02, 0.38);
      if (raw <= split) return raw;
      const t = (raw - split) / (1 - split);
      const accelerated = split + t ** 0.9 * (1 - split);
      return Math.min(1, accelerated);
    }

    function svTo07TargetP(svIdx: number, vh: number) {
      const svF = nodeFracs[svIdx];
      const o7F = nodeFracs[svIdx + 1];
      const diffSection = document.getElementById("difference");
      if (svF === undefined || o7F === undefined || !diffSection) return svF ?? null;

      const dRect = diffSection.getBoundingClientRect();
      const dStart = vh * 0.9;
      const dEnd = vh * 0.38;

      if (dRect.top >= dStart) return svF;
      if (dRect.top <= dEnd) return o7F;

      const t = (dStart - dRect.top) / (dStart - dEnd);
      return svF + t * (o7F - svF);
    }

    function tryAutoPin(scrollingDownNow: boolean) {
      if (isRoundsPinned() || hasRoundsCompletedDown()) return;
      if (!scrollingDownNow || step06Idx < 0 || roundsR1Idx < 0) return;

      const step06 = nodeFracs[step06Idx];
      const r1 = nodeFracs[roundsR1Idx];
      if (step06 === undefined || r1 === undefined) return;

      const pointerNear06 =
        smooth >= step06 - 0.014 && smooth < r1 - 0.004;

      if (pointerNear06 && isHeadingAtPinLine()) {
        autoPinAtStep06();
      }
    }

    function tryReenterFrom07(scrollingUp: boolean) {
      if (!hasRoundsCompletedDown() || isRoundsPinned() || !scrollingUp) return;
      if (roundsR1Idx < 0 || step06Idx < 0) return;

      const svIdx = roundsR1Idx + 3;
      const svF = nodeFracs[svIdx];
      const step06 = nodeFracs[step06Idx];
      if (svF === undefined || step06 === undefined) return;

      const eyebrow = document.getElementById("rounds-eyebrow");
      if (!eyebrow) return;

      const headingTop = eyebrow.getBoundingClientRect().top;
      const inRoundsZone =
        headingTop <= NAV_HEIGHT + 120 && headingTop > NAV_HEIGHT - 80;
      const pointerNearSv = smooth >= svF - 0.015 && smooth <= svF + 0.02;

      if (inRoundsZone && pointerNearSv) {
        reenterRoundsFrom07();
      }
    }

    function onScroll() {
      const dy = window.scrollY - lastScrollY;
      if (Math.abs(dy) > 0.5) scrollingDown = dy > 0;
      lastScrollY = window.scrollY;

      if (isRoundsPinned()) {
        const frac = pinnedTargetP();
        if (frac !== null) targetP = frac;
        return;
      }

      const jr = root.getBoundingClientRect();
      const vh = window.innerHeight;
      let raw = Math.min(
        Math.max((vh * 0.42 - jr.top) / (jr.height - vh * 0.2), 0),
        1,
      );

      const tools = root.querySelector<HTMLElement>("#tools");
      if (tools) {
        const tr = tools.getBoundingClientRect();
        if (tr.top < vh * 0.52) {
          const u = Math.min(1, (vh * 0.52 - tr.top) / (vh * 2.2));
          raw = Math.min(1, raw + u * 0.045);
        }
      }

      targetP = mapScrollProgress(raw);

      const nodes = getNodes();
      const { r1Idx, svIdx } = getRoundsIndices(nodes);

      if (
        r1Idx !== -1 &&
        svIdx !== -1 &&
        step06Idx >= 0 &&
        nodeFracs[step06Idx] !== undefined &&
        nodeFracs[r1Idx] !== undefined
      ) {
        if (hasRoundsCompletedDown()) {
          const exitTarget = svTo07TargetP(svIdx, vh);
          if (exitTarget !== null) {
            targetP = exitTarget;
            const svF = nodeFracs[svIdx];
            if (
              svF !== undefined &&
              Math.abs(exitTarget - svF) < 0.004 &&
              smooth <= svF + 0.012
            ) {
              resetRoundsCompletedDown();
            }
          }
          return;
        }

        if (
          !isRoundsPinned() &&
          smooth < nodeFracs[r1Idx] - 0.008 &&
          targetP > nodeFracs[step06Idx] + 0.002
        ) {
          targetP = nodeFracs[step06Idx];
        }
      }

      tryReenterFrom07(!scrollingDown);
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!total) return;

      if (isRoundsPinned()) {
        const frac = pinnedTargetP();
        if (frac !== null) targetP = frac;
      } else if (
        step06Idx >= 0 &&
        roundsR1Idx >= 0 &&
        !hasRoundsCompletedDown() &&
        !isRoundsPinned() &&
        nodeFracs[step06Idx] !== undefined &&
        nodeFracs[roundsR1Idx] !== undefined
      ) {
        if (
          smooth < nodeFracs[roundsR1Idx] - 0.006 &&
          targetP > nodeFracs[step06Idx] + 0.002
        ) {
          targetP = nodeFracs[step06Idx];
        }
        tryAutoPin(scrollingDown);
      }

      const pinned = isRoundsPinned();
      const lerpSpeed = reduceMotion
        ? 1
        : pinned
          ? 0.16
          : targetP > tailStart - 0.03
            ? 0.092
            : 0.085;

      smooth += (targetP - smooth) * lerpSpeed;
      const p = Math.abs(targetP - smooth) < 0.0003 ? targetP : smooth;

      reportSmoothProgress(p);
      prog.style.strokeDashoffset = String(total * (1 - p));

      const pt = prog.getPointAtLength(total * p);
      rootDot.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) translate(-50%,-50%)`;

      const nodes = getNodes();
      const { r1Idx, svIdx } = getRoundsIndices(nodes);

      if (step06Idx >= 0 && nodeFracs[step06Idx] !== undefined) {
        const step06 = nodeFracs[step06Idx];
        const at06 = Math.abs(p - step06) < 0.012;
        setPointerAtStep06(at06 && (pinned || !hasRoundsCompletedDown()));
      } else {
        setPointerAtStep06(false);
      }

      nodes.forEach((n, i) => {
        const isRoundDot = svIdx !== -1 && i >= r1Idx && i <= svIdx;
        if (isRoundDot) {
          n.classList.remove("hit");
          return;
        }
        n.classList.toggle("hit", p >= nodeFracs[i] - 0.012);
      });
    }

    function onRoundsChange(ev: Event) {
      const source = (ev as CustomEvent<{ source?: string }>).detail?.source;
      const frac = pinnedTargetP() ?? roundTargetP();
      if (frac === null) return;

      targetP = frac;
      if (source === "enter") {
        smooth = frac;
      }
    }

    function onRoundsExitUpStart() {
      if (step06Idx >= 0 && nodeFracs[step06Idx] !== undefined) {
        targetP = nodeFracs[step06Idx];
      }
    }

    function onRoundsExit(ev: Event) {
      const detail = (ev as CustomEvent<{ direction?: string }>).detail;
      const direction = detail?.direction;

      if (direction === "up" && step06Idx >= 0 && nodeFracs[step06Idx] !== undefined) {
        targetP = nodeFracs[step06Idx];
        return;
      }

      if (direction === "down") {
        const nodes = getNodes();
        const { svIdx } = getRoundsIndices(nodes);
        const exitTarget = svTo07TargetP(svIdx, window.innerHeight);
        if (exitTarget !== null) {
          targetP = exitTarget;
        }
        onScroll();
      }
    }

    function onRoundsLayout() {
      buildPath();
      onScroll();
    }

    function rebuild() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildPath();
        onScroll();
      }, 120);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("journey:rounds-change", onRoundsChange);
    window.addEventListener("journey:rounds-exit", onRoundsExit);
    window.addEventListener("journey:rounds-exit-up-start", onRoundsExitUpStart);
    window.addEventListener("journey:rounds-layout", onRoundsLayout);
    window.addEventListener("resize", rebuild);
    buildPath();
    onScroll();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(rebuild);
    ro.observe(root);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("journey:rounds-change", onRoundsChange);
      window.removeEventListener("journey:rounds-exit", onRoundsExit);
      window.removeEventListener("journey:rounds-exit-up-start", onRoundsExitUpStart);
      window.removeEventListener("journey:rounds-layout", onRoundsLayout);
      window.removeEventListener("resize", rebuild);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div id="journey" ref={journeyRef} className="relative">
      <svg id="jsvg" ref={svgRef} aria-hidden="true">
        <defs>
          <linearGradient id="jgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3D5FDF" />
            <stop offset="1" stopColor="#2546D0" />
          </linearGradient>
        </defs>
        <path className="track" d="" />
        <path className="prog" d="" />
      </svg>
      <div id="jdot" ref={dotRef} aria-hidden="true" />
      {children}
    </div>
  );
}
