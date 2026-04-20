export type FilmMusicItem = {
  slug: string;
  title: string;
  sourceTitle?: string;
  videoUrl?: string;
  embedUrl?: string;
  posterImage?: string;
  homeCaption?: string;
};

export type FilmMusicAudioTrack = {
  slug: string;
  title: string;
  audioUrl: string;
  imageUrl?: string;
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
    posterImage: "/images/film-music/the-sunken-place-poster-widescreen.jpg",
    homeCaption: ""
  },
  {
    slug: "datamosh",
    title: "DataMosh",
    videoUrl: "/video/film-music/datamosh.mp4",
    posterImage: "/images/film-music/datamosh-poster-widescreen.jpg",
    homeCaption: "Recorded by Ex Ibex"
  },
  {
    slug: "life-is-beautiful",
    sourceTitle: "Life Is Beautiful",
    title: "Goodbye, My Son (Rescore)",
    videoUrl: "/video/featured/life-is-beautiful-scene-final.mp4",
    posterImage: "/images/featured/life-is-beautiful-poster-widescreen.jpg",
    homeCaption: "Recorded with a 52-piece orchestra at the Eastwood Scoring Stage at Warner Brothers Studios"
  }
];

export const filmMusicAudioTracks: FilmMusicAudioTrack[] = [
  {
    slug: "finally-free",
    title: "Finally Free",
    audioUrl: "/audio/film-music/finally-free.wav",
    imageUrl: "/images/film-music/audio-tracks/finally-free.png"
  },
  {
    slug: "to-rise-against",
    title: "To Rise Against",
    audioUrl: "/audio/film-music/to-rise-against.wav",
    imageUrl: "/images/film-music/audio-tracks/to-rise-against.jpg"
  },
  {
    slug: "final-descent",
    title: "Final Descent",
    audioUrl: "/audio/film-music/final-descent.wav",
    imageUrl: "/images/film-music/audio-tracks/final-descent.jpg"
  },
  {
    slug: "meadow",
    title: "Meadow",
    audioUrl: "/audio/film-music/meadow.wav",
    imageUrl: "/images/film-music/audio-tracks/meadow.png"
  },
  {
    slug: "transfigured-in-flame",
    title: "Transfigured in Flame",
    audioUrl: "/audio/film-music/transfigured-in-flame.wav",
    imageUrl: "/images/film-music/audio-tracks/transfigured-in-flame.jpg"
  },
  {
    slug: "serpents-uncoil",
    title: "Serpents Uncoil",
    audioUrl: "/audio/film-music/serpents-uncoil.wav",
    imageUrl: "/images/film-music/audio-tracks/serpents-uncoil.jpg"
  },
  {
    slug: "crimson-vows",
    title: "Crimson Vows",
    audioUrl: "/audio/film-music/crimson-vows.wav",
    imageUrl: "/images/film-music/audio-tracks/crimson-vows.jpg"
  },
  {
    slug: "simple-joy",
    title: "Simple Joy",
    audioUrl: "/audio/film-music/simple-joy.wav",
    imageUrl: "/images/film-music/audio-tracks/simple-joy.jpg"
  }
];
