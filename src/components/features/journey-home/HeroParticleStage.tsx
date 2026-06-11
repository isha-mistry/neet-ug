"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
export type HeroMorphPhase = "applicants" | "seats";

type HeroParticleStageProps = {
  onMorphPhaseChange?: (phase: HeroMorphPhase) => void;
};

export function HeroParticleStage({ onMorphPhaseChange }: HeroParticleStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const onPhaseRef = useRef(onMorphPhaseChange);
  onPhaseRef.current = onMorphPhaseChange;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let raf = 0;
    let cleanupThree: (() => void) | undefined;

    void import("three").then((THREE) => {
      if (disposed) return;
      const el = mount;

      const isMobile = window.innerWidth < 760;
      const N = isMobile ? 3200 : 6400;
      const SEATS = Math.floor(N * 0.085);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
      cam.position.set(0, 0, 38);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      function size() {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      }
      size();

      const cloud = new Float32Array(N * 3);
      const grid = new Float32Array(N * 3);
      const colA = new Float32Array(N * 3);
      const colB = new Float32Array(N * 3);
      const cBase = new THREE.Color(0xa9bef3);
      const cSeat = new THREE.Color(0x2546d0);
      const cDim = new THREE.Color(0xe5ecfb);

      for (let i = 0; i < N; i++) {
        const r = Math.pow(Math.random(), 0.5);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        cloud[i * 3] = Math.sin(ph) * Math.cos(th) * 22 * r;
        cloud[i * 3 + 1] = Math.cos(ph) * 13 * r;
        cloud[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * 15 * r;
        const v = 0.82 + Math.random() * 0.3;
        colA[i * 3] = cBase.r * v;
        colA[i * 3 + 1] = cBase.g * v;
        colA[i * 3 + 2] = cBase.b * v;
      }

      const cols = Math.ceil(Math.sqrt(SEATS * 1.9));
      const spacing = 1.0;
      for (let i = 0; i < N; i++) {
        if (i < SEATS) {
          const cx = i % cols;
          const cy = Math.floor(i / cols);
          grid[i * 3] = (cx - cols / 2) * spacing;
          grid[i * 3 + 1] = (cy - SEATS / cols / 2) * spacing * 0.85;
          grid[i * 3 + 2] = Math.sin(cx * 0.4) * 1.2;
          colB[i * 3] = cSeat.r;
          colB[i * 3 + 1] = cSeat.g;
          colB[i * 3 + 2] = cSeat.b;
        } else {
          grid[i * 3] = cloud[i * 3] * 2.1;
          grid[i * 3 + 1] = cloud[i * 3 + 1] * 2.1;
          grid[i * 3 + 2] = cloud[i * 3 + 2] * 2.1 - 6;
          colB[i * 3] = cDim.r;
          colB[i * 3 + 1] = cDim.g;
          colB[i * 3 + 2] = cDim.b;
        }
      }

      const cur = new Float32Array(cloud);
      const col = new Float32Array(colA);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: isMobile ? 0.22 : 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);

      let t = 0;
      let target = 0;
      let last = performance.now();
      let phase = 0;
      const HOLD = 3400;
      const MORPH = 2200;
      let mx = 0;
      let my = 0;
      let lastLegendPhase: HeroMorphPhase = "applicants";

      const syncLegend = (morphT: number) => {
        const next: HeroMorphPhase = morphT >= 0.5 ? "seats" : "applicants";
        if (next === lastLegendPhase) return;
        lastLegendPhase = next;
        onPhaseRef.current?.(next);
      };

      syncLegend(0);

      const onPointer = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
      };
      el.addEventListener("pointermove", onPointer, { passive: true });

      const frame = (now: number) => {
        if (disposed) return;
        raf = requestAnimationFrame(frame);
        if (document.hidden) return;
        const dt = Math.min(now - last, 50);
        last = now;
        if (!reduceMotion) {
          phase += dt;
          if (phase > HOLD + MORPH) {
            phase = 0;
            target = 1 - target;
          }
          const m = Math.min(Math.max((phase - HOLD) / MORPH, 0), 1);
          const goal = target === 0 ? m : 1 - m;
          const e = goal * goal * (3 - 2 * goal);
          t += (e - t) * 0.08;
          syncLegend(t);
          const pos = geo.attributes.position.array as Float32Array;
          const c = geo.attributes.color.array as Float32Array;
          for (let i = 0; i < N * 3; i++) {
            pos[i] = cloud[i] + (grid[i] - cloud[i]) * t;
            c[i] = colA[i] + (colB[i] - colA[i]) * t;
          }
          geo.attributes.position.needsUpdate = true;
          geo.attributes.color.needsUpdate = true;
          pts.rotation.y += dt * 0.00005;
          cam.position.x += (mx * 5 - cam.position.x) * 0.05;
          cam.position.y += (-my * 3 - cam.position.y) * 0.05;
          cam.lookAt(0, 0, 0);
        }
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(frame);

      const onResize = () => size();
      window.addEventListener("resize", onResize);
      const ro = new ResizeObserver(onResize);
      ro.observe(el);

      const cleanupThreeFn = () => {
        el.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        ro.disconnect();
        cancelAnimationFrame(raf);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        if (renderer.domElement.parentNode === el) {
          el.removeChild(renderer.domElement);
        }
      };

      if (disposed) {
        cleanupThreeFn();
        return;
      }

      cleanupThree = cleanupThreeFn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupThree?.();
    };
  }, [reduceMotion]);

  return <div id="stage" ref={mountRef} aria-hidden="true" />;
}
