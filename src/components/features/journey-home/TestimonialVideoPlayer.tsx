"use client";

import { useCallback, useRef, useState } from "react";

type PlaybackMode = "idle" | "playing" | "paused";

type TestimonialVideoPlayerProps = {
  src: string;
  label: string;
  who: string;
  college: string;
  onPlaybackChange?: (playing: boolean) => void;
};

function VideoControlButton({
  kind,
  label,
  onClick,
  className = "",
}: {
  kind: "play" | "pause";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`tst-video-play${className ? ` ${className}` : ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="tst-video-play-ring" aria-hidden="true" />
      {kind === "play" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 5h4v14H7V5zm6 0h4v14h-4V5z" />
        </svg>
      )}
    </button>
  );
}

export function TestimonialVideoPlayer({
  src,
  label,
  who,
  college,
  onPlaybackChange,
}: TestimonialVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<PlaybackMode>("idle");
  const [hovering, setHovering] = useState(false);

  const setPlaying = useCallback(
    (playing: boolean) => {
      onPlaybackChange?.(playing);
    },
    [onPlaybackChange],
  );

  const syncMode = useCallback(
    (next: PlaybackMode) => {
      setMode(next);
      setPlaying(next === "playing");
    },
    [setPlaying],
  );

  const play = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      await el.play();
    } catch {
      /* autoplay policy or load error */
    }
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const showCaption = mode !== "playing";
  const showPlayButton = mode !== "playing";
  const showPauseButton = mode === "playing" && hovering;

  const playerClass = [
    "tst-video-player",
    mode === "playing" ? "is-playing" : "",
    mode === "idle" ? "is-idle" : "",
    hovering ? "is-hovering" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="tst-video-shell"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={playerClass}
        onClick={(event) => {
          if (mode !== "playing") return;
          if ((event.target as HTMLElement).closest(".tst-video-play")) return;
          pause();
        }}
      >
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          src={src}
          aria-label={label}
          onPlay={() => syncMode("playing")}
          onPause={() => {
            const el = videoRef.current;
            if (!el || el.ended) return;
            syncMode("paused");
          }}
          onEnded={() => {
            const el = videoRef.current;
            if (el) el.currentTime = 0;
            syncMode("idle");
          }}
        />
        <div className="tst-video-shade" aria-hidden="true" />

        {showPlayButton ? (
          <VideoControlButton kind="play" label={`Play ${label}`} onClick={play} />
        ) : null}

        {showPauseButton ? (
          <VideoControlButton
            kind="pause"
            label={`Pause ${label}`}
            onClick={pause}
            className="tst-video-play--overlay"
          />
        ) : null}
      </div>

      {showCaption ? (
        <div className="tst-video-caption">
          <div className="who-info">
            <b>{who}</b>
            <span>{college}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
