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
    videoUrl: "/video/featured/in-another-life-rescore.mp4",
    posterImage: "/images/featured/in-another-life-poster-widescreen.jpg"
  },
  {
    slug: "the-sunken-place-rescore",
    sourceTitle: "Get Out",
    title: "The Sunken Place (Rescore)",
    videoUrl: "/video/film-music/the-sunken-place-rescore.mp4",
    posterImage: "/images/film-music/the-sunken-place-poster-widescreen.jpg"
  },
  {
    slug: "datamosh",
    title: "DataMosh",
    videoUrl: "/video/film-music/datamosh.mp4",
    posterImage: "/images/film-music/datamosh-poster-widescreen.jpg"
  },
  {
    slug: "life-is-beautiful",
    title: "Life Is Beautiful (Rescore)",
    videoUrl: "/video/featured/life-is-beautiful-scene-final.mp4",
    posterImage: "/images/featured/life-is-beautiful-poster-widescreen.jpg"
  }
];
