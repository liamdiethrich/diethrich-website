"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type PosterVideoCardProps = {
  src: string;
  title: string;
  poster?: string;
  className?: string;
  objectFitClassName?: string;
  posterFitClassName?: string;
  sizes?: string;
};

export function PosterVideoCard({
  src,
  title,
  poster,
  className = "",
  objectFitClassName = "object-cover",
  posterFitClassName = "object-cover",
  sizes = "(max-width: 768px) 100vw, 50vw"
}: PosterVideoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPointerHovering, setIsPointerHovering] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const showPlayAffordance = !isPlaying && (isPointerHovering || isFocusWithin || !isActivated);

  const updateCursorPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
  };

  const activateVideo = async () => {
    const video = videoRef.current;

    setIsActivated(true);

    if (!video) {
      return;
    }

    try {
      await video.play();
    } catch {
      // Preserve native controls if playback is blocked for any reason.
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "f" || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        if (event.target.closest("input, textarea, select, [contenteditable='true'], [role='textbox']")) {
          return;
        }
      }

      const card = cardRef.current;
      if (
        !card ||
        card.getAttribute("data-poster-video-hotkey-active") !== "true" ||
        document.fullscreenElement === card ||
        !card.requestFullscreen
      ) {
        return;
      }

      event.preventDefault();
      void card.requestFullscreen().catch(() => {
        // Preserve native playback if fullscreen is unavailable or blocked.
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const clearAllHotkeyActiveCards = () => {
      document
        .querySelectorAll<HTMLElement>("[data-poster-video-hotkey-active='true']")
        .forEach((element) => element.setAttribute("data-poster-video-hotkey-active", "false"));
    };

    if (isPointerHovering || isFocusWithin) {
      clearAllHotkeyActiveCards();
      card.setAttribute("data-poster-video-hotkey-active", "true");
      return;
    }

    card.setAttribute("data-poster-video-hotkey-active", "false");

    const focusedCard = document.activeElement?.closest<HTMLElement>("[data-poster-video-card='true']");
    if (focusedCard) {
      clearAllHotkeyActiveCards();
      focusedCard.setAttribute("data-poster-video-hotkey-active", "true");
    }
  }, [isFocusWithin, isPointerHovering]);

  useEffect(() => {
    const card = cardRef.current;

    return () => {
      card?.setAttribute("data-poster-video-hotkey-active", "false");
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-poster-video-card="true"
      data-poster-video-hotkey-active="false"
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") {
          return;
        }

        updateCursorPosition(event);
        setIsPointerHovering(true);
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") {
          return;
        }

        updateCursorPosition(event);
      }}
      onPointerLeave={() => setIsPointerHovering(false)}
      onFocusCapture={() => {
        setIsFocusWithin(true);
        setCursorPosition((current) => ({
          x: current.x || 0,
          y: current.y || 0
        }));
      }}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return;
        }

        setIsFocusWithin(false);
      }}
      className={`group relative aspect-video overflow-hidden border border-black/10 bg-black shadow-[0_24px_48px_rgba(23,18,16,0.1)] transition-shadow duration-300 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className={`h-full w-full bg-black ${objectFitClassName}`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!isActivated && poster ? (
        <button
          type="button"
          onClick={activateVideo}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes={sizes}
            className={`${posterFitClassName} transition duration-500 group-hover:scale-[1.008]`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.06)_0%,rgba(10,10,12,0.38)_52%,rgba(10,10,12,0.62)_100%)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-64px_90px_rgba(0,0,0,0.28)]" />
        </button>
      ) : null}

      {showPlayAffordance ? (
        <div className="pointer-events-none absolute inset-0">
          <span
            className="absolute flex h-[4.4rem] w-[4.4rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-black/48 text-white shadow-[0_16px_32px_rgba(0,0,0,0.34)] ring-1 ring-white/10 backdrop-blur-sm transition duration-200 group-hover:border-accent/70 group-hover:bg-black/62 md:h-[4.8rem] md:w-[4.8rem]"
            style={{
              left: isPointerHovering ? cursorPosition.x : "50%",
              top: isPointerHovering ? cursorPosition.y : "50%"
            }}
          >
            <span className="ml-1 inline-block h-0 w-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-white md:border-y-[12px] md:border-l-[19px]" />
          </span>
        </div>
      ) : null}
    </div>
  );
}
