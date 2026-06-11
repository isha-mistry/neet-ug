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
    /** Path fraction at step 04 (#tools) — tail sections get faster progress */
    let tailStart = 0.45;
    let smooth = 0;
    let targetP = 0;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getNodes = () =>
      [...root.querySelectorAll<HTMLElement>("[data-jnode]")];

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
        for (let i = 0; i <= 320; i++) {
          const q = prog.getPointAtLength((total * i) / 320);
          const dd = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
          if (dd < bd) {
            bd = dd;
            best = i / 320;
          }
        }
        return best;
      });
      if (nodeFracs.length > 3) {
        tailStart = nodeFracs[3];
      }
    }

    function mapScrollProgress(raw: number): number {
      const split = Math.max(tailStart - 0.02, 0.38);
      if (raw <= split) return raw;
      const t = (raw - split) / (1 - split);
      // Mild catch-up from step 04 — closer to linear (higher exponent = slower path)
      const accelerated = split + t ** 0.9 * (1 - split);
      return Math.min(1, accelerated);
    }

    function onScroll() {
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
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!total) return;
      const inTail = targetP > tailStart - 0.03;
      const lerp = reduceMotion ? 1 : inTail ? 0.092 : 0.085;
      smooth += (targetP - smooth) * lerp;
      const p = Math.abs(targetP - smooth) < 0.0004 ? targetP : smooth;
      prog.style.strokeDashoffset = String(total * (1 - p));
      const pt = prog.getPointAtLength(total * p);
      rootDot.style.transform = `translate(${pt.x}px,${pt.y}px) translate(-50%,-50%)`;
      const nodes = getNodes();
      nodes.forEach((n, i) => {
        n.classList.toggle("hit", p >= nodeFracs[i] - 0.012);
      });
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
