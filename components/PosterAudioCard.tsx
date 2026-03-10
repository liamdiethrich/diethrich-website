"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { NormalTrack } from "@/content/gameMusic";

type PosterAudioCardProps = {
  track: NormalTrack;
};

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const wholeSeconds = Math.round(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function PosterAudioCard({ track }: PosterAudioCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationLabel, setDurationLabel] = useState("0:40");
  const imageAlt = `${track.title} artwork`;

  if (!track.audioUrl || !track.image) {
    return null;
  }

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#3A3A3E] bg-[#232326] text-neutral-100 shadow-[0_18px_38px_rgba(0,0,0,0.24)]">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="relative aspect-square overflow-hidden bg-black">
          <Image
            src={track.image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 460px"
            className="object-cover transition duration-300 group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.08)_0%,rgba(12,12,14,0.42)_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_12px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition group-hover:bg-black/58 md:h-20 md:w-20">
              {isPlaying ? (
                <span className="text-base font-semibold tracking-[0.08em] md:text-lg">II</span>
              ) : (
                <span className="ml-1 inline-block h-0 w-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-white md:border-y-[13px] md:border-l-[20px]" />
              )}
            </span>
          </div>
          <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white md:bottom-4 md:right-4 md:text-xs">
            {durationLabel}
          </span>
        </div>
      </button>

      <div className="flex items-center justify-between gap-4 p-3.5 md:p-4">
        <div className="min-w-0">
          <p className="font-heading text-[0.9rem] uppercase tracking-[0.12em] text-neutral-100 md:text-[1rem] md:tracking-[0.14em]">
            {track.title}
          </p>
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-300">{track.mood}</p>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          className="shrink-0 rounded-sm border border-accent/80 bg-[#1B1B1D] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-xs"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        className="sr-only"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => {
          setDurationLabel(formatDuration(event.currentTarget.duration));
        }}
      />
    </div>
  );
}
