export type FilmMusicItem = {
  slug: string;
  title: string;
  sourceTitle?: string;
  videoUrl?: string;
  embedUrl?: string;
  posterImage?: string;
};

export const filmMusicItems: FilmMusicItem[] = [
  {
    slug: "in-another-life-rescore",
    sourceTitle: "Everything Everywhere All at Once",
    title: "In Another Life (Rescore)",
    videoUrl: "/video/featured/in-another-life-rescore.mov",
    posterImage: "/images/featured/in-another-life-poster.png"
  },
  {
    slug: "the-sunken-place-rescore",
    sourceTitle: "Get Out",
    title: "The Sunken Place (Rescore)",
    videoUrl: "/video/film-music/the-sunken-place-rescore.mov",
    posterImage: "/images/film-music/the-sunken-place-poster.png"
  },
  {
    slug: "datamosh",
    title: "DataMosh",
    videoUrl: "/video/film-music/datamosh.mov",
    posterImage: "/images/film-music/datamosh-poster.png"
  },
  {
    slug: "life-is-beautiful",
    title: "Life Is Beautiful (Rescore)",
    videoUrl: "/video/featured/life-is-beautiful-scene-final.mov",
    posterImage: "/images/featured/life-is-beautiful-poster.png"
  }
];
