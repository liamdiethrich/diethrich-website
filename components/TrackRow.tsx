"use client";

import { useEffect, useRef, useState } from "react";
import { NormalTrack } from "@/content/gameMusic";
import { PlaceholderMedia } from "./PlaceholderMedia";

type TrackRowProps = {
  track: NormalTrack;
};

export function TrackRow({ track }: TrackRowProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const hasAudio = Boolean(track.audioUrl);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const formatDuration = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return "0:00";
    }

    const wholeSeconds = Math.round(seconds);
    const minutes = Math.floor(wholeSeconds / 60);
    const remainingSeconds = wholeSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (duration > 0 && audioRef.current.currentTime >= duration) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }

    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  if (!hasAudio) {
    return <PlaceholderMedia type="audio" label="AUDIO PLACEHOLDER - upload .mp3/.wav" />;
  }

  return (
    <div className="overflow-hidden border border-white/10 bg-[#151211] text-ivory shadow-[0_18px_36px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-4 px-4 py-4 md:px-5">
        <button
          type="button"
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
        <div className="min-w-0 flex-1">
          <p className="font-display text-[1.3rem] leading-[0.98] text-ivory">{track.title}</p>
          <p className="mt-1 font-heading text-[0.66rem] uppercase tracking-[0.22em] text-accent/90">{track.mood}</p>
        </div>
        <p className="font-heading text-[0.66rem] uppercase tracking-[0.18em] text-ivory/44">
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </p>
      </div>

      <div className="border-t border-white/8 px-4 pb-4 pt-3 md:px-5">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-accent transition-[width] duration-150"
            style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        className="sr-only"
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={(event) => {
          setIsPlaying(false);
          setCurrentTime(event.currentTarget.duration);
        }}
      />
    </div>
  );
}
