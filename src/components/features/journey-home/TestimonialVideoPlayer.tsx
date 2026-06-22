"use client";

import { useCallback, useRef, useState } from "react";

type TestimonialVideoPlayerProps = {
  src: string;
  label: string;
};

export function TestimonialVideoPlayer({ src, label }: TestimonialVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlay, setShowPlay] = useState(true);

  const play = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    el.controls = true;
    try {
      await el.play();
      setShowPlay(false);
    } catch {
      el.controls = true;
    }
  }, []);

  return (
    <div className={`tst-video-player${showPlay ? "" : " is-active"}`}>
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        src={src}
        aria-label={label}
        onPlay={() => setShowPlay(false)}
        onPause={() => {
          const el = videoRef.current;
          if (el?.ended) {
            el.controls = false;
            el.currentTime = 0;
            setShowPlay(true);
          }
        }}
        onEnded={() => {
          const el = videoRef.current;
          if (el) {
            el.controls = false;
            el.currentTime = 0;
          }
          setShowPlay(true);
        }}
      />
      {showPlay ? (
        <button type="button" className="tst-video-play" onClick={play} aria-label={`Play ${label}`}>
          <span className="tst-video-play-ring" aria-hidden="true" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
          </svg>
        </button>
      ) : null}
      <div className="tst-video-shade" aria-hidden="true" />
    </div>
  );
}
