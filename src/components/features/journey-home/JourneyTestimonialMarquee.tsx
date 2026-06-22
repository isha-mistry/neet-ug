"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  JOURNEY_TESTIMONIALS,
  type JourneyTestimonial,
} from "@/lib/journey-home/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TestimonialVideoPlayer } from "./TestimonialVideoPlayer";

const AUTO_SCROLL_PX_PER_FRAME = 0.85;

type TestimonialPlaybackContextValue = {
  registerVideoPlaying: (playing: boolean) => void;
};

const TestimonialPlaybackContext = createContext<TestimonialPlaybackContextValue | null>(
  null,
);

function useTestimonialPlayback() {
  const ctx = useContext(TestimonialPlaybackContext);
  if (!ctx) {
    throw new Error("useTestimonialPlayback must be used within JourneyTestimonialMarquee");
  }
  return ctx;
}

function testimonialKey(t: JourneyTestimonial): string {
  if (t.kind === "video") return t.video;
  return `${t.who}-${t.score}`;
}

function TextTestimonialCard({ t }: { t: Extract<JourneyTestimonial, { kind: "text" }> }) {
  return (
    <article className="card tst">
      <div className="tst-top">
        <span className="sc">{t.score}</span>
        <span className="st" aria-hidden="true">
          ★★★★★
        </span>
      </div>
      <p>{t.quote}</p>
      <div className="who">
        <img src={t.avatar} alt="" className="who-img" />
        <div className="who-info">
          <b>{t.who}</b>
          <span>{t.meta}</span>
        </div>
      </div>
    </article>
  );
}

function VideoTestimonialCard({ t }: { t: Extract<JourneyTestimonial, { kind: "video" }> }) {
  const { registerVideoPlaying } = useTestimonialPlayback();

  return (
    <article className="card tst tst--video">
      <TestimonialVideoPlayer
        src={t.video}
        label={`Video testimonial from ${t.who}`}
        who={t.who}
        college={t.meta}
        onPlaybackChange={registerVideoPlaying}
      />
    </article>
  );
}

function TestimonialCard({ t }: { t: JourneyTestimonial }) {
  if (t.kind === "video") return <VideoTestimonialCard t={t} />;
  return <TextTestimonialCard t={t} />;
}

function NavArrow({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`tst-nav tst-nav--${direction}`}
      onClick={onClick}
      aria-label={label}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function getActiveCardIndex(cards: HTMLElement[], offsetPx: number): number {
  let currentIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - offsetPx);
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });

  return currentIndex;
}

export function JourneyTestimonialMarquee() {
  const reduceMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const userPausedRef = useRef(false);
  const videoPlayingRef = useRef(false);
  const hoveringRef = useRef(false);
  const playingCountRef = useRef(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const items = [...JOURNEY_TESTIMONIALS, ...JOURNEY_TESTIMONIALS];

  const applyOffset = useCallback((smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.classList.toggle("is-stepping", smooth);
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const registerVideoPlaying = useCallback((playing: boolean) => {
    playingCountRef.current += playing ? 1 : -1;
    if (playingCountRef.current < 0) playingCountRef.current = 0;
    const isPlaying = playingCountRef.current > 0;
    videoPlayingRef.current = isPlaying;
    setVideoPlaying(isPlaying);
  }, []);

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const loopWidth = track.scrollWidth / 2;
    loopWidthRef.current = loopWidth;
    if (loopWidth > 0 && offsetRef.current >= loopWidth) {
      offsetRef.current %= loopWidth;
      applyOffset(false);
    }
  }, [applyOffset]);

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      userPausedRef.current = true;
      measureLoop();

      const cards = Array.from(track.querySelectorAll<HTMLElement>(".tst"));
      if (!cards.length) {
        userPausedRef.current = false;
        return;
      }

      const currentIndex = getActiveCardIndex(cards, offsetRef.current);
      let nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = cards.length - 1;
      if (nextIndex >= cards.length) nextIndex = 0;

      offsetRef.current = cards[nextIndex].offsetLeft;
      applyOffset(!reduceMotion);

      window.setTimeout(() => {
        userPausedRef.current = false;
        track.classList.remove("is-stepping");
      }, 700);
    },
    [applyOffset, measureLoop, reduceMotion],
  );

  useEffect(() => {
    videoPlayingRef.current = videoPlaying;
  }, [videoPlaying]);

  useEffect(() => {
    hoveringRef.current = hovering;
  }, [hovering]);

  useEffect(() => {
    measureLoop();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(() => measureLoop());
    ro.observe(track);

    const onResize = () => measureLoop();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measureLoop]);

  useEffect(() => {
    applyOffset(false);
  }, [applyOffset]);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    const tick = () => {
      const shouldAutoScroll =
        !videoPlayingRef.current && !hoveringRef.current && !userPausedRef.current;

      if (shouldAutoScroll) {
        if (loopWidthRef.current <= 0) measureLoop();

        const loopWidth = loopWidthRef.current;
        if (loopWidth > 0) {
          offsetRef.current += AUTO_SCROLL_PX_PER_FRAME;
          if (offsetRef.current >= loopWidth) {
            offsetRef.current -= loopWidth;
          }
          applyOffset(false);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, measureLoop, applyOffset]);

  const mqClass = ["mq", videoPlaying ? "is-video-playing" : "", hovering ? "is-hovering" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <TestimonialPlaybackContext.Provider value={{ registerVideoPlaying }}>
      <section className="section" style={{ paddingBottom: 70 }}>
        <div className="wrap">
          <span className="eyebrow">Proof</span>
          <h2 className="t">
            Students who got the <em>right seat.</em>
          </h2>
        </div>
        <div className="mq-outer">
          <NavArrow
            direction="prev"
            label="Previous testimonial"
            onClick={() => scrollByStep(-1)}
          />
          <div
            className={mqClass}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div
              ref={trackRef}
              className="mtrack"
              id="mtrack"
              data-marquee-items={JOURNEY_TESTIMONIALS.length}
            >
              {items.map((t, index) => (
                <TestimonialCard key={`${testimonialKey(t)}-${index}`} t={t} />
              ))}
            </div>
          </div>
          <NavArrow
            direction="next"
            label="Next testimonial"
            onClick={() => scrollByStep(1)}
          />
        </div>
      </section>
    </TestimonialPlaybackContext.Provider>
  );
}
