"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
    let smooth = 0;
    let targetP = 0;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getNodes = () =>
      [...root.querySelectorAll<HTMLElement>("[data-jnode]")];

    function clamp01(n: number) {
      return Math.min(1, Math.max(0, n));
    }

    /** Map scroll position to path progress using vertical distance between step nodes. */
    function scrollToPathProgress(): number {
      const nodes = getNodes();
      if (!nodes.length || !nodeFracs.length || !total) return 0;

      const vh = window.innerHeight;
      const anchor = window.scrollY + vh * 0.42;
      const jr = root.getBoundingClientRect();
      const jTop = jr.top + window.scrollY;
      const jBottom = jTop + root.offsetHeight;

      const nodeYs = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2 + window.scrollY;
      });

      const pathStartY = jTop + Math.max(0, nodeYs[0] - jTop - 90);

      if (anchor <= nodeYs[0]) {
        const span = nodeYs[0] - pathStartY || 1;
        return nodeFracs[0] * clamp01((anchor - pathStartY) / span);
      }

      if (anchor >= nodeYs[nodeYs.length - 1]) {
        const last = nodeYs.length - 1;
        const span = jBottom - nodeYs[last] || 1;
        const t = clamp01((anchor - nodeYs[last]) / span);
        return nodeFracs[last] + (1 - nodeFracs[last]) * t;
      }

      for (let i = 0; i < nodeYs.length - 1; i++) {
        if (anchor >= nodeYs[i] && anchor < nodeYs[i + 1]) {
          const span = nodeYs[i + 1] - nodeYs[i] || 1;
          const t = clamp01((anchor - nodeYs[i]) / span);
          return (
            nodeFracs[i] + t * (nodeFracs[i + 1] - nodeFracs[i])
          );
        }
      }

      return nodeFracs[nodeFracs.length - 1];
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
    }

    function onScroll() {
      targetP = scrollToPathProgress();
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!total) return;

      const lerpSpeed = reduceMotion ? 1 : 0.085;

      smooth += (targetP - smooth) * lerpSpeed;
      const p = Math.abs(targetP - smooth) < 0.0003 ? targetP : smooth;

      prog.style.strokeDashoffset = String(total * (1 - p));

      const pt = prog.getPointAtLength(total * p);
      rootDot.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) translate(-50%,-50%)`;

      const nodes = getNodes();
      nodes.forEach((n, i) => {
        n.classList.toggle("hit", p >= nodeFracs[i] - 0.012);
      });

      const lastFrac = nodeFracs[nodeFracs.length - 1] ?? 1;
      rootDot.classList.toggle("is-behind-fin", p >= lastFrac - 0.015);
    }

    function rebuild() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildPath();
        onScroll();
      }, 120);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", rebuild);
    buildPath();
    onScroll();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(rebuild);
    ro.observe(root);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
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
