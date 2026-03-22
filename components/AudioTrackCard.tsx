"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FilmMusicAudioTrack } from "@/content/filmMusic";

type AudioTrackCardProps = {
  track: FilmMusicAudioTrack;
  index?: number;
};

function formatClockTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function AudioTrackCard({ track, index }: AudioTrackCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const trackNumber = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      return;
    }

    if (duration > 0 && audio.currentTime >= duration) {
      audio.currentTime = 0;
      setCurrentTime(0);
    }

    audio.play().catch(() => {
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
    <article className="group w-full overflow-hidden border border-black/10 bg-[#181413] text-ivory shadow-[0_20px_42px_rgba(23,18,16,0.12)]">
      <div className="grid sm:grid-cols-[140px_minmax(0,1fr)]">
        <div className="relative aspect-[5/4] overflow-hidden bg-[#111010] sm:aspect-auto sm:min-h-[152px]">
          {track.imageUrl ? (
            <Image
              src={track.imageUrl}
              alt={`${track.title} title card`}
              fill
              sizes="(max-width: 640px) 100vw, 140px"
              className="object-cover transition duration-500 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,#3a3a40_0%,#1a1b1f_48%,#101114_100%)] px-6 text-center">
              <p className="font-heading text-[1rem] uppercase tracking-[0.18em] text-neutral-200 md:text-[1.08rem]">
                {track.title}
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.04)_0%,rgba(10,10,12,0.42)_100%)]" />
          {trackNumber ? (
            <span className="absolute left-3 top-3 border border-white/10 bg-black/48 px-2.5 py-1 font-heading text-[0.7rem] uppercase tracking-[0.24em] text-ivory/78 backdrop-blur-sm">
              {trackNumber}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1.5">
              <h3 className="font-display text-[1.62rem] leading-[0.96] text-ivory md:text-[1.98rem]">
                {track.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/60 text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {isPlaying ? (
                <span className="flex items-center gap-[4px]">
                  <span className="h-4 w-[4px] bg-current" />
                  <span className="h-4 w-[4px] bg-current" />
                </span>
              ) : (
                <span className="ml-[2px] inline-block h-0 w-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-current" />
              )}
            </button>
          </div>

          <div className="mt-5 border-t border-white/8 pt-3.5">
            <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-ivory/42">
              <div className="font-heading">{trackNumber ? `${trackNumber} / Listen` : "Listen"}</div>
              <div>
                {formatClockTime(currentTime)} / {formatClockTime(duration)}
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
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-ivory/40">
              <div className="font-heading text-accent/90">{isPlaying ? "Playing" : "Ready"}</div>
              <div className="h-px flex-1 bg-white/8" />
            </div>
          </div>
        </div>
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
