export type NormalTrack = {
  type: "normal";
  title: string;
  mood: string;
  audioUrl?: string;
  image?: string;
};

export type IntensityLayerKey = "ambient" | "intense" | "veryIntense";

export type IntensityLayerMap<T> = Record<IntensityLayerKey, T>;

export type LayeredTrack = {
  type: "layered";
  title: string;
  mood: string;
  layers: IntensityLayerMap<string>;
  videoLayers: IntensityLayerMap<string>;
  layerStartOffsets?: IntensityLayerMap<number>;
  layerLeadInSilence?: IntensityLayerMap<number>;
};

export type GameTrack = NormalTrack | LayeredTrack;

export type GameProject = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tracks: GameTrack[];
};

// Keep the audio layer mapping explicit. The shared "Combat" prefix appears in all three filenames,
// so keyword-based inference can misclassify the ambient layer as very intense.
export const intensityDemoAudioLayers: IntensityLayerMap<string> = {
  ambient: "/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Three.Ambient.wav",
  intense: "/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Two.Intense.wav",
  veryIntense: "/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Three.Combat.mp3"
};

export const intensityDemoVideoLayers: IntensityLayerMap<string> = {
  ambient: "/video/intensity-demo/ambient.mp4",
  intense: "/video/intensity-demo/intense.mp4",
  veryIntense: "/video/intensity-demo/very-intense.mp4"
};

export const layeredIntensityDemoTrack: LayeredTrack = {
  type: "layered",
  title: "LAYERED INTENSITY DEMO",
  mood: "Adaptive Combat Suite",
  layers: intensityDemoAudioLayers,
  videoLayers: intensityDemoVideoLayers,
  layerStartOffsets: {
    // Keep intro section while trimming only the accidental pre-note artifact on very intense.
    ambient: 0,
    intense: 0,
    veryIntense: 0.21
  },
  layerLeadInSilence: {
    // Ambient enters at the shared downbeat after the intro section.
    ambient: 5.73,
    intense: 0,
    veryIntense: 0
  }
};

export const smokeBreakMenuTrack: NormalTrack = {
  type: "normal",
  title: "Smoke Break Menu Music",
  mood: "Menu Music",
  audioUrl: "/audio/game-music/smoke-break-menu-music.m4a",
  image: "/images/game-music/smoke-break-menu-music.jpg"
};

export const gameProjects: GameProject[] = [
  {
    slug: "featured-game-music",
    title: "FEATURED GAME MUSIC",
    description: "Layered adaptive combat scoring paired with a standalone menu cue.",
    image: "/images/game-music/smoke-break-menu-music.jpg",
    tracks: [layeredIntensityDemoTrack, smokeBreakMenuTrack]
  }
];
