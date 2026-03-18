"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const imageAlt = `${track.title} artwork`;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

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

    if (duration > 0 && audioRef.current.currentTime >= duration) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }

    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <article className="overflow-hidden border border-white/10 bg-[#181514] text-ivory shadow-[0_22px_44px_rgba(0,0,0,0.24)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        <Image
          src={track.image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1279px) 100vw, 320px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.04)_0%,rgba(12,12,14,0.18)_40%,rgba(12,12,14,0.62)_100%)]" />
        <span className="absolute bottom-3 right-3 border border-white/12 bg-black/58 px-3 py-1.5 font-heading text-[0.64rem] uppercase tracking-[0.22em] text-ivory/76 backdrop-blur-sm md:bottom-4 md:right-4">
          {formatDuration(duration)}
        </span>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div className="space-y-2">
          <p className="font-heading text-[0.68rem] uppercase tracking-[0.24em] text-accent/92">{track.mood}</p>
          <h3 className="font-display text-[1.5rem] leading-[0.96] text-ivory md:text-[1.85rem]">{track.title}</h3>
        </div>

        <div className="border-t border-white/8 pt-3.5">
          <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-ivory/42">
            <div className="font-heading">{isPlaying ? "Playing" : "Ready"}</div>
            <div>
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 1}
            step={0.01}
            value={Math.min(currentTime, duration > 0 ? duration : 1)}
            onChange={handleSeek}
            disabled={duration <= 0}
            aria-label={`Playback position for ${track.title}`}
            className="music-range-dark w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent/60 px-5 font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={(event) => {
          setIsPlaying(false);
          setCurrentTime(event.currentTarget.duration);
        }}
      />
    </article>
  );
}
