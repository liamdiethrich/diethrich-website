export type FilmMusicItem = {
  slug: string;
  title: string;
  sourceTitle?: string;
  videoUrl?: string;
  embedUrl?: string;
  posterImage?: string;
  homeCaption?: string;
};

export const filmMusicItems: FilmMusicItem[] = [
  {
    slug: "in-another-life-rescore",
    sourceTitle: "Everything Everywhere All at Once",
    title: "In Another Life (Rescore)",
    videoUrl: "/video/featured/in-another-life-rescore.mp4",
    posterImage: "/images/featured/in-another-life-poster-widescreen.jpg",
    homeCaption: "Recorded with the RTVE Symphony Orchestra at Teatro Verdi"
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
    sourceTitle: "Life Is Beautiful",
    title: "Goodbye My Son (Rescore)",
    videoUrl: "/video/featured/life-is-beautiful-scene-final.mp4",
    posterImage: "/images/featured/life-is-beautiful-poster-widescreen.jpg",
    homeCaption: "Recorded with a 52-piece orchestra at the Eastwood Scoring Stage (Warner Brothers Studios)"
  }
];
