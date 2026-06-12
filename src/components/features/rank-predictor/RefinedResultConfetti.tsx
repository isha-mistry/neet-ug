"use client";

import { useEffect, useState, type CSSProperties } from "react";

const BLUE_SHADES = [
  "#eaf0ff",
  "#b2c5ff",
  "#a9bef3",
  "#6b8cff",
  "#2546d0",
  "#1e3bad",
  "#0f2c9c",
] as const;

const BURST_INTERVAL_MS = 2000;
const PARTICLES_PER_BURST = 22;
const BURST_LIFETIME_MS = 2200;
const MAX_ACTIVE_BURSTS = 3;

type Particle = {
  id: string;
  dx: number;
  rot: number;
  color: string;
  size: number;
  delay: number;
  shape: "rect" | "circle";
};

type Burst = {
  id: number;
  particles: Particle[];
};

function createBurst(id: number): Burst {
  const particles: Particle[] = Array.from({ length: PARTICLES_PER_BURST }, (_, i) => ({
    id: `${id}-${i}`,
    dx: (Math.random() - 0.5) * 88,
    rot: Math.random() * 540 - 180,
    color: BLUE_SHADES[Math.floor(Math.random() * BLUE_SHADES.length)] ?? BLUE_SHADES[4],
    size: 2 + Math.random() * 3.5,
    delay: Math.random() * 0.18,
    shape: Math.random() > 0.45 ? "rect" : "circle",
  }));
  return { id, particles };
}

export function RefinedResultConfetti() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let burstId = 0;
    const spawn = () => {
      const burst = createBurst(++burstId);
      setBursts((prev) => [...prev.slice(-(MAX_ACTIVE_BURSTS - 1)), burst]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burst.id));
      }, BURST_LIFETIME_MS);
    };

    spawn();
    const interval = window.setInterval(spawn, BURST_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [enabled]);

  if (!enabled || bursts.length === 0) return null;

  return (
    <div
      className="rp-confetti-origin pointer-events-none absolute bottom-full left-1/2 z-30 h-32 w-0 -translate-x-1/2"
      aria-hidden
    >
      {bursts.map((burst) =>
        burst.particles.map((p) => (
          <span
            key={p.id}
            className="rp-confetti-piece"
            style={
              {
                "--dx": `${p.dx}px`,
                "--rot": `${p.rot}deg`,
                "--delay": `${p.delay}s`,
                "--size": `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "1px",
              } as CSSProperties
            }
          />
        ))
      )}
    </div>
  );
}
