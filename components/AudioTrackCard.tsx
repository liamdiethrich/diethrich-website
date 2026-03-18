"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FilmMusicAudioTrack } from "@/content/filmMusic";

type AudioTrackCardProps = {
  track: FilmMusicAudioTrack;
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

export function AudioTrackCard({ track }: AudioTrackCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    <div className="w-full overflow-hidden rounded-[18px] border border-[#3A3A3E] bg-[#232326] text-neutral-100 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
      <div className="flex flex-col md:flex-row">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#161618] md:w-[250px]">
          {track.imageUrl ? (
            <Image
              src={track.imageUrl}
              alt={`${track.title} title card`}
              fill
              sizes="(max-width: 768px) 100vw, 250px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,#3a3a40_0%,#1a1b1f_48%,#101114_100%)] px-6 text-center">
              <p className="font-heading text-lg uppercase tracking-[0.18em] text-neutral-200 md:text-xl">
                {track.title}
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.08)_0%,rgba(10,10,12,0.45)_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
              className="flex h-18 w-18 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_12px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-20 md:w-20"
            >
              {isPlaying ? (
                <span className="flex items-center gap-[5px]">
                  <span className="h-5 w-[5px] bg-current md:h-6 md:w-[6px]" />
                  <span className="h-5 w-[5px] bg-current md:h-6 md:w-[6px]" />
                </span>
              ) : (
                <span className="ml-[3px] inline-block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-current md:border-y-[12px] md:border-l-[18px]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="font-heading text-[1rem] uppercase tracking-[0.16em] text-neutral-100 md:text-[1.2rem]">
                {track.title}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-neutral-400 md:text-sm">
                Audio Track
              </p>
            </div>
            <div className="text-[12px] uppercase tracking-[0.12em] text-neutral-300 md:text-sm">
              {formatClockTime(currentTime)} / {formatClockTime(duration)}
            </div>
          </div>

          <div className="mt-5">
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 1}
              step={0.01}
              value={Math.min(currentTime, duration > 0 ? duration : 1)}
              onChange={handleSeek}
              disabled={duration <= 0}
              aria-label={`Playback position for ${track.title}`}
              className="w-full cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-neutral-500">
              <span>{formatClockTime(currentTime)}</span>
              <span>{formatClockTime(duration)}</span>
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
    </div>
  );
}
