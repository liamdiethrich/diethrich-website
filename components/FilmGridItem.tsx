import { FilmMusicItem } from "@/content/filmMusic";
import { PosterVideoCard } from "./PosterVideoCard";

type FilmGridItemProps = {
  item: FilmMusicItem;
};

function getVideoEmbed(title: string, url: string) {
  return (
    <div className="aspect-video overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
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
      objectFitClassName="object-contain"
      posterFitClassName="object-cover"
    />
  );
}

export function FilmGridItem({ item }: FilmGridItemProps) {
  return (
    <article className="space-y-4 md:space-y-5">
      <div className="text-neutral-900">
        <h2 className="font-heading text-[1.12rem] font-bold tracking-[0.08em] text-neutral-900 md:text-[1.8rem] md:tracking-[0.12em]">
          {item.title}
        </h2>
      </div>

      {item.videoUrl ? getLocalVideo(item) : item.embedUrl ? getVideoEmbed(item.title, item.embedUrl) : null}
    </article>
  );
}
