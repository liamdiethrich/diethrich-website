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
    <div className={`relative aspect-video overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.12)] ${className}`}>
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
          <Image src={poster} alt="" fill sizes={sizes} className={posterFitClassName} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.12)_0%,rgba(10,10,12,0.32)_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_12px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:bg-black/58 md:h-20 md:w-20">
              <span className="ml-1 inline-block h-0 w-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-white md:border-y-[13px] md:border-l-[20px]" />
            </span>
          </div>
        </button>
      ) : null}
    </div>
  );
}
