"use client";

import { useRef, useState } from "react";
import { NormalTrack } from "@/content/gameMusic";
import { PlaceholderMedia } from "./PlaceholderMedia";

type TrackRowProps = {
  track: NormalTrack;
};

export function TrackRow({ track }: TrackRowProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasAudio = Boolean(track.audioUrl);

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
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
    <div className="rounded-sm border border-[#3A3A3E] bg-[#232326] px-4 py-3 text-neutral-100 shadow-[0_10px_22px_rgba(0,0,0,0.24)]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-accent/70 bg-[#1B1B1D] text-accent transition hover:bg-[#202023] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isPlaying ? (
            <span className="text-[10px] font-bold leading-none">II</span>
          ) : (
            <span className="ml-[2px] inline-block h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-accent" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm uppercase tracking-[0.14em] text-neutral-100">{track.title}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-400">{track.mood}</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onEnded={() => setIsPlaying(false)}
        className="sr-only"
        preload="none"
      />
    </div>
  );
}
