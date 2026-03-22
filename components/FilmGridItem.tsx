import Link from "next/link";
import { FilmMusicItem } from "@/content/filmMusic";
import { PosterVideoCard } from "./PosterVideoCard";

type FilmGridItemProps = {
  item: FilmMusicItem;
  variant?: "feature" | "standard";
};

function getVideoEmbed(title: string, url: string) {
  return (
    <div className="aspect-video overflow-hidden border border-black/10 bg-black shadow-[0_24px_48px_rgba(23,18,16,0.1)] transition-shadow duration-300">
      <iframe
        title={title}
        src={url}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function getLocalVideo(item: FilmMusicItem) {
  if (!item.videoUrl) {
    return null;
  }

  return (
    <PosterVideoCard
      src={item.videoUrl}
      poster={item.posterImage}
      title={item.title}
      className="transition-shadow duration-300 group-hover:shadow-[0_30px_56px_rgba(23,18,16,0.14)]"
      objectFitClassName="object-contain"
      posterFitClassName="object-cover"
    />
  );
}

export function FilmGridItem({ item, variant = "standard" }: FilmGridItemProps) {
  const caption = item.homeCaption?.trim();
  const isFeature = variant === "feature";

  return (
    <article className={`group ${isFeature ? "space-y-6 md:space-y-7" : "space-y-5 md:space-y-6"}`}>
      {item.videoUrl ? getLocalVideo(item) : item.embedUrl ? getVideoEmbed(item.title, item.embedUrl) : null}

      <div className={`border-b border-black/10 ${isFeature ? "pb-6 md:pb-7" : "pb-5"}`}>
        <div className={`grid gap-4 ${isFeature ? "md:grid-cols-[minmax(0,1fr)_minmax(12rem,18rem)] md:gap-7" : ""}`}>
          <div className="space-y-2.5">
            {item.sourceTitle ? (
              <p className="font-heading text-[0.8rem] uppercase tracking-[0.22em] text-accent">{item.sourceTitle}</p>
            ) : null}
            <Link
              href={`/film-music/${item.slug}`}
              className="inline-block transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <h2
                className={`font-display leading-[0.96] text-ink transition-colors group-hover:text-accent ${
                  isFeature ? "text-[2.4rem] md:text-[3.25rem]" : "text-[1.95rem] md:text-[2.4rem]"
                }`}
              >
                {item.title}
              </h2>
            </Link>
            {!isFeature && caption ? (
              <p className="max-w-[38rem] text-[0.98rem] leading-[1.68] text-ink/70 md:text-[1rem]">{caption}</p>
            ) : null}
          </div>

          {isFeature ? (
            <div className="space-y-3 md:pt-1">
              {caption ? (
                <p className="text-[0.98rem] leading-[1.68] text-ink/70 md:text-[1rem]">{caption}</p>
              ) : (
                <div />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
