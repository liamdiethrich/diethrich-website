"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActivated, setIsActivated] = useState(false);

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

  return (
    <div
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/18 bg-black/44 text-white shadow-[0_16px_32px_rgba(0,0,0,0.34)] ring-1 ring-white/10 backdrop-blur-sm transition group-hover:border-accent/70 group-hover:bg-black/60 md:h-[4.5rem] md:w-[4.5rem]">
              <span className="ml-1 inline-block h-0 w-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-white md:border-y-[12px] md:border-l-[19px]" />
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-64px_90px_rgba(0,0,0,0.28)]" />
        </button>
      ) : null}
    </div>
  );
}
