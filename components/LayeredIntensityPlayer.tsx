"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { IntensityLayerKey, IntensityLayerMap, LayeredTrack } from "@/content/gameMusic";

type LayeredIntensityPlayerProps = {
  track: LayeredTrack;
};

type LayerBuffers = IntensityLayerMap<AudioBuffer>;
type LayerSources = IntensityLayerMap<AudioBufferSourceNode>;
type LayerGains = IntensityLayerMap<GainNode>;
type VideoLoadStatus = "idle" | "loading" | "ready" | "error";

const INTENSITY_LAYER_KEYS: IntensityLayerKey[] = ["ambient", "intense", "veryIntense"];
const DRIFT_CHECK_INTERVAL_MS = 500;
const DRIFT_TOLERANCE_SECONDS = 0.08;
const GAIN_SMOOTHING_SECONDS = 0.02;
const MIN_RESUME_OFFSET = 0.01;
const DEFAULT_LAYER_TIMING: IntensityLayerMap<number> = {
  ambient: 0,
  intense: 0,
  veryIntense: 0
};
const INITIAL_VIDEO_STATUS: IntensityLayerMap<VideoLoadStatus> = {
  ambient: "idle",
  intense: "idle",
  veryIntense: "idle"
};

function addLeadingSilence(ctx: AudioContext, buffer: AudioBuffer, seconds: number) {
  if (seconds <= 0) {
    return buffer;
  }

  const leadingFrames = Math.max(0, Math.floor(seconds * buffer.sampleRate));
  if (leadingFrames === 0) {
    return buffer;
  }

  const padded = ctx.createBuffer(buffer.numberOfChannels, buffer.length + leadingFrames, buffer.sampleRate);
  for (let channelIndex = 0; channelIndex < buffer.numberOfChannels; channelIndex += 1) {
    padded.getChannelData(channelIndex).set(buffer.getChannelData(channelIndex), leadingFrames);
  }
  return padded;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function normalizeLoopOffset(offset: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  const normalized = offset % duration;
  return normalized < 0 ? normalized + duration : normalized;
}

function getBlendWeights(value: number): IntensityLayerMap<number> {
  if (value <= 1) {
    const t = clamp01(value);
    return {
      ambient: 0,
      intense: Math.sin((Math.PI * 0.5) * t),
      veryIntense: Math.cos((Math.PI * 0.5) * t)
    };
  }

  const t = clamp01(value - 1);
  return {
    ambient: Math.sin((Math.PI * 0.5) * t),
    intense: Math.cos((Math.PI * 0.5) * t),
    veryIntense: 0
  };
}

function getLoopDifference(current: number, target: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return Math.abs(current - target);
  }

  const delta = Math.abs(current - target) % duration;
  return Math.min(delta, duration - delta);
}

function getVideoTargetTime(sharedOffset: number, video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) {
    return 0;
  }

  return Math.min(normalizeLoopOffset(sharedOffset, video.duration), Math.max(0, video.duration - 0.001));
}

export function LayeredIntensityPlayer({ track }: LayeredIntensityPlayerProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<IntensityLayerMap<VideoLoadStatus>>(INITIAL_VIDEO_STATUS);

  const contextRef = useRef<AudioContext | null>(null);
  const gainsRef = useRef<LayerGains | null>(null);
  const buffersRef = useRef<LayerBuffers | null>(null);
  const sourcesRef = useRef<LayerSources | null>(null);
  const videoRefs = useRef<Partial<Record<IntensityLayerKey, HTMLVideoElement | null>>>({});
  const startTimeRef = useRef(0);
  const pausedOffsetRef = useRef(0);
  const durationRef = useRef(0);
  const isPlayingRef = useRef(false);
  const sliderId = `intensity-${track.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const layerStartOffsets = track.layerStartOffsets ?? DEFAULT_LAYER_TIMING;
  const layerLeadInSilence = track.layerLeadInSilence ?? DEFAULT_LAYER_TIMING;
  const loopDuration = track.loopDuration;
  const blendWeights = getBlendWeights(sliderValue);
  const allVideosReady = INTENSITY_LAYER_KEYS.every((key) => videoStatus[key] === "ready");
  const hasVideoError = INTENSITY_LAYER_KEYS.some((key) => videoStatus[key] === "error");
  const showVideoVisualizer = allVideosReady && !hasVideoError;
  const hasVideoActivity = INTENSITY_LAYER_KEYS.some((key) => videoStatus[key] !== "idle");
  const videoPlaceholderLabel = hasVideoError
    ? "Synchronized video layers unavailable."
    : hasVideoActivity
      ? "Loading synchronized visuals..."
      : "Click Play to initialize synchronized visuals.";

  const markVideoStatus = useCallback((key: IntensityLayerKey, status: VideoLoadStatus) => {
    setVideoStatus((current) => {
      if (current[key] === status) {
        return current;
      }

      return {
        ...current,
        [key]: status
      };
    });
  }, []);

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }
    return contextRef.current;
  }, []);

  const getVideoElements = useCallback((): IntensityLayerMap<HTMLVideoElement> | null => {
    const ambient = videoRefs.current.ambient;
    const intense = videoRefs.current.intense;
    const veryIntense = videoRefs.current.veryIntense;

    if (!ambient || !intense || !veryIntense) {
      return null;
    }

    return {
      ambient,
      intense,
      veryIntense
    };
  }, []);

  const getCurrentSharedOffset = useCallback(() => {
    const ctx = contextRef.current;
    const duration = durationRef.current;
    if (!ctx || duration <= 0) {
      return 0;
    }

    if (isPlayingRef.current) {
      return normalizeLoopOffset(ctx.currentTime - startTimeRef.current, duration);
    }

    return normalizeLoopOffset(pausedOffsetRef.current, duration);
  }, []);

  const pauseVideos = useCallback(() => {
    const videos = getVideoElements();
    if (!videos) {
      return;
    }

    INTENSITY_LAYER_KEYS.forEach((key) => {
      videos[key].pause();
    });
  }, [getVideoElements]);

  const syncVideosToOffset = useCallback(
    (offset: number) => {
      const videos = getVideoElements();
      if (!videos) {
        return;
      }

      INTENSITY_LAYER_KEYS.forEach((key) => {
        const video = videos[key];
        if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
          return;
        }

        const targetTime = getVideoTargetTime(offset, video);
        if (getLoopDifference(video.currentTime, targetTime, video.duration) <= 0.01) {
          return;
        }

        try {
          video.currentTime = targetTime;
        } catch {
          // Ignore early seeks while metadata is still settling.
        }
      });
    },
    [getVideoElements]
  );

  const ensureVideosReady = useCallback(async () => {
    const videos = getVideoElements();
    if (!videos) {
      return false;
    }

    const readiness = await Promise.all(
      INTENSITY_LAYER_KEYS.map((key) => {
        const video = videos[key];

        if (video.error) {
          markVideoStatus(key, "error");
          return Promise.resolve(false);
        }

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          markVideoStatus(key, "ready");
          return Promise.resolve(true);
        }

        markVideoStatus(key, "loading");

        return new Promise<boolean>((resolve) => {
          const handleReady = () => {
            cleanup();
            markVideoStatus(key, "ready");
            resolve(true);
          };

          const handleError = () => {
            cleanup();
            markVideoStatus(key, "error");
            resolve(false);
          };

          const cleanup = () => {
            video.removeEventListener("loadeddata", handleReady);
            video.removeEventListener("error", handleError);
          };

          video.addEventListener("loadeddata", handleReady);
          video.addEventListener("error", handleError);
          video.load();
        });
      })
    );

    return readiness.every(Boolean);
  }, [getVideoElements, markVideoStatus]);

  const startVideos = useCallback(
    (offset: number) => {
      const videos = getVideoElements();
      if (!videos) {
        return;
      }

      syncVideosToOffset(offset);

      INTENSITY_LAYER_KEYS.forEach((key) => {
        const playPromise = videos[key].play();
        if (playPromise) {
          void playPromise.catch(() => {
            // Muted inline videos should play after the user gesture, but audio must continue even if a browser blocks them.
          });
        }
      });
    },
    [getVideoElements, syncVideosToOffset]
  );

  const stopSources = useCallback(() => {
    const existing = sourcesRef.current;
    if (!existing) {
      return;
    }

    INTENSITY_LAYER_KEYS.forEach((key) => {
      const source = existing[key];
      source.onended = null;
      try {
        source.stop();
      } catch {
        // Source can already be stopped.
      }
      source.disconnect();
    });

    sourcesRef.current = null;
  }, []);

  const setCrossfade = useCallback((value: number) => {
    const ctx = contextRef.current;
    const gains = gainsRef.current;
    if (!ctx || !gains) {
      return;
    }

    const weights = getBlendWeights(value);
    gains.ambient.gain.setTargetAtTime(weights.ambient, ctx.currentTime, GAIN_SMOOTHING_SECONDS);
    gains.intense.gain.setTargetAtTime(weights.intense, ctx.currentTime, GAIN_SMOOTHING_SECONDS);
    gains.veryIntense.gain.setTargetAtTime(weights.veryIntense, ctx.currentTime, GAIN_SMOOTHING_SECONDS);
  }, []);

  const ensureGains = useCallback(() => {
    const ctx = getContext();
    if (gainsRef.current) {
      return gainsRef.current;
    }

    const ambient = ctx.createGain();
    const intense = ctx.createGain();
    const veryIntense = ctx.createGain();

    ambient.connect(ctx.destination);
    intense.connect(ctx.destination);
    veryIntense.connect(ctx.destination);

    gainsRef.current = {
      ambient,
      intense,
      veryIntense
    };

    return gainsRef.current;
  }, [getContext]);

  const loadBuffers = useCallback(async () => {
    if (buffersRef.current) {
      return buffersRef.current;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ctx = getContext();
      const urls = track.layers;

      const [ambientData, intenseData, veryIntenseData] = await Promise.all(
        [urls.ambient, urls.intense, urls.veryIntense].map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to load layer: ${url}`);
          }
          return response.arrayBuffer();
        })
      );

      const [decodedAmbient, decodedIntense, decodedVeryIntense] = await Promise.all([
        ctx.decodeAudioData(ambientData),
        ctx.decodeAudioData(intenseData),
        ctx.decodeAudioData(veryIntenseData)
      ]);

      const ambient = addLeadingSilence(ctx, decodedAmbient, layerLeadInSilence.ambient);
      const intense = addLeadingSilence(ctx, decodedIntense, layerLeadInSilence.intense);
      const veryIntense = addLeadingSilence(ctx, decodedVeryIntense, layerLeadInSilence.veryIntense);

      const loaded = {
        ambient,
        intense,
        veryIntense
      };

      buffersRef.current = loaded;
      const inferredDuration = Math.max(
        0,
        Math.min(
          ambient.duration - layerStartOffsets.ambient,
          intense.duration - layerStartOffsets.intense,
          veryIntense.duration - layerStartOffsets.veryIntense
        )
      );
      durationRef.current = Math.max(0, Math.min(loopDuration ?? inferredDuration, inferredDuration));
      setIsReady(true);
      return loaded;
    } catch (loadError) {
      setError("Unable to load layered intensity audio files.");
      throw loadError;
    } finally {
      setIsLoading(false);
    }
  }, [
    getContext,
    layerLeadInSilence.ambient,
    layerLeadInSilence.intense,
    layerLeadInSilence.veryIntense,
    loopDuration,
    layerStartOffsets.ambient,
    layerStartOffsets.intense,
    layerStartOffsets.veryIntense,
    track.layers
  ]);

  const startSources = useCallback(
    (offset: number) => {
      const buffers = buffersRef.current;
      const gains = gainsRef.current;
      const ctx = contextRef.current;
      const duration = durationRef.current;

      if (!buffers || !gains || !ctx || duration <= MIN_RESUME_OFFSET) {
        return false;
      }

      const sharedOffset = normalizeLoopOffset(offset, duration);
      const ambientSource = ctx.createBufferSource();
      const intenseSource = ctx.createBufferSource();
      const veryIntenseSource = ctx.createBufferSource();

      ambientSource.buffer = buffers.ambient;
      intenseSource.buffer = buffers.intense;
      veryIntenseSource.buffer = buffers.veryIntense;

      ambientSource.connect(gains.ambient);
      intenseSource.connect(gains.intense);
      veryIntenseSource.connect(gains.veryIntense);

      ambientSource.loop = true;
      intenseSource.loop = true;
      veryIntenseSource.loop = true;

      ambientSource.loopStart = layerStartOffsets.ambient;
      ambientSource.loopEnd = layerStartOffsets.ambient + duration;
      intenseSource.loopStart = layerStartOffsets.intense;
      intenseSource.loopEnd = layerStartOffsets.intense + duration;
      veryIntenseSource.loopStart = layerStartOffsets.veryIntense;
      veryIntenseSource.loopEnd = layerStartOffsets.veryIntense + duration;

      ambientSource.start(0, layerStartOffsets.ambient + sharedOffset);
      intenseSource.start(0, layerStartOffsets.intense + sharedOffset);
      veryIntenseSource.start(0, layerStartOffsets.veryIntense + sharedOffset);

      sourcesRef.current = {
        ambient: ambientSource,
        intense: intenseSource,
        veryIntense: veryIntenseSource
      };

      startTimeRef.current = ctx.currentTime - sharedOffset;
      setCrossfade(sliderValue);
      return true;
    },
    [
      layerStartOffsets.ambient,
      layerStartOffsets.intense,
      layerStartOffsets.veryIntense,
      setCrossfade,
      sliderValue
    ]
  );

  const play = useCallback(async () => {
    try {
      const ctx = getContext();
      await ctx.resume();
      ensureGains();

      const [, videosReady] = await Promise.all([loadBuffers(), ensureVideosReady()]);
      if (isPlayingRef.current) {
        return;
      }

      const sharedOffset = getCurrentSharedOffset();
      const didStart = startSources(sharedOffset);
      if (!didStart) {
        return;
      }

      if (videosReady) {
        startVideos(sharedOffset);
      }

      isPlayingRef.current = true;
      setIsPlaying(true);
    } catch {
      // Load errors are already reflected in component state.
    }
  }, [ensureGains, ensureVideosReady, getContext, getCurrentSharedOffset, loadBuffers, startSources, startVideos]);

  const pause = useCallback(() => {
    if (!isPlayingRef.current) {
      return;
    }

    pausedOffsetRef.current = getCurrentSharedOffset();
    pauseVideos();
    syncVideosToOffset(pausedOffsetRef.current);
    stopSources();

    if (contextRef.current?.state === "running") {
      void contextRef.current.suspend();
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
  }, [getCurrentSharedOffset, pauseVideos, stopSources, syncVideosToOffset]);

  const stop = useCallback(() => {
    pause();
    pausedOffsetRef.current = 0;
    syncVideosToOffset(0);
  }, [pause, syncVideosToOffset]);

  const togglePrimaryTransport = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }

    void play();
  }, [isPlaying, pause, play]);

  const onSliderChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setSliderValue(value);
      setCrossfade(value);
    },
    [setCrossfade]
  );

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const videos = getVideoElements();
      if (!videos) {
        return;
      }

      const master = videos.ambient;
      if (master.readyState < HTMLMediaElement.HAVE_METADATA) {
        return;
      }

      const sharedOffset = getCurrentSharedOffset();
      const expectedMasterTime = getVideoTargetTime(sharedOffset, master);
      if (getLoopDifference(master.currentTime, expectedMasterTime, master.duration) > DRIFT_TOLERANCE_SECONDS) {
        try {
          master.currentTime = expectedMasterTime;
        } catch {
          // Ignore drift correction errors from transient media states.
        }
      }

      if (!Number.isFinite(master.duration) || master.duration <= 0) {
        return;
      }

      (["intense", "veryIntense"] as const).forEach((key) => {
        const video = videos[key];
        if (video.readyState < HTMLMediaElement.HAVE_METADATA || !Number.isFinite(video.duration) || video.duration <= 0) {
          return;
        }

        const targetTime = Math.min(
          normalizeLoopOffset(master.currentTime, video.duration),
          Math.max(0, video.duration - 0.001)
        );
        if (getLoopDifference(video.currentTime, targetTime, video.duration) <= DRIFT_TOLERANCE_SECONDS) {
          return;
        }

        try {
          video.currentTime = targetTime;
        } catch {
          // Ignore drift correction errors from transient media states.
        }
      });
    }, DRIFT_CHECK_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [getCurrentSharedOffset, getVideoElements, isPlaying]);

  useEffect(() => {
    return () => {
      pauseVideos();
      stopSources();
      if (contextRef.current) {
        void contextRef.current.close();
      }
    };
  }, [pauseVideos, stopSources]);

  return (
    <div className="rounded-sm border border-[#3A3A3E] bg-[#232326] p-5 text-neutral-100 shadow-[0_10px_22px_rgba(0,0,0,0.24)] md:p-6">
      <div className="mb-5 flex items-center gap-4 md:mb-6 md:gap-5">
        <button
          type="button"
          onClick={togglePrimaryTransport}
          aria-label={isPlaying ? "Pause layered intensity demo" : "Play layered intensity demo"}
          className="flex h-14 w-14 items-center justify-center rounded-sm border border-accent/70 bg-[#1B1B1D] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-16 md:w-16"
        >
          {isPlaying ? (
            <span className="flex items-center gap-[5px] md:gap-[6px]">
              <span className="h-5 w-[5px] bg-current md:h-6 md:w-[6px]" />
              <span className="h-5 w-[5px] bg-current md:h-6 md:w-[6px]" />
            </span>
          ) : (
            <span className="ml-[3px] inline-block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-current md:border-y-[12px] md:border-l-[18px]" />
          )}
        </button>
        <div className="min-w-0">
          <p className="font-heading text-[1rem] uppercase tracking-[0.14em] md:text-[1.35rem]">{track.title}</p>
          <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-300 md:text-sm">{track.mood}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative aspect-video overflow-hidden rounded-[18px] border border-[#3A3A3E] bg-[radial-gradient(circle_at_top,#3a3a40_0%,#1a1b1f_48%,#101114_100%)] shadow-[0_24px_48px_rgba(0,0,0,0.42)]">
          {INTENSITY_LAYER_KEYS.map((key) => (
            <video
              key={key}
              ref={(node) => {
                videoRefs.current[key] = node;
              }}
              src={track.videoLayers[key]}
              preload="auto"
              playsInline
              muted
              loop
              onLoadStart={() => markVideoStatus(key, "loading")}
              onLoadedData={() => markVideoStatus(key, "ready")}
              onError={() => markVideoStatus(key, "error")}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ease-out ${
                showVideoVisualizer ? "opacity-100" : "opacity-0"
              }`}
              style={{ opacity: showVideoVisualizer ? blendWeights[key] : 0 }}
              aria-hidden="true"
            />
          ))}

          {!showVideoVisualizer ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(15,16,18,0.92)_0%,rgba(11,12,14,0.98)_100%)] px-6 text-center">
              <div className="space-y-3 md:space-y-4">
                <p className="font-heading text-base uppercase tracking-[0.18em] text-neutral-100 md:text-[1.2rem]">
                  Visual Intensity Layers
                </p>
                <p className="text-base leading-relaxed text-neutral-300 md:text-lg">{videoPlaceholderLabel}</p>
              </div>
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(12,12,14,0.34)_100%)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_-90px_120px_rgba(0,0,0,0.34)]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 md:gap-3">
        <button
          type="button"
          onClick={play}
          aria-label="Play layered intensity demo"
          className="rounded-sm border border-accent/80 bg-[#1B1B1D] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-5 md:py-2.5 md:text-sm"
        >
          Play
        </button>
        <button
          type="button"
          onClick={pause}
          aria-label="Pause layered intensity demo"
          className="rounded-sm border border-accent/80 bg-[#1B1B1D] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-5 md:py-2.5 md:text-sm"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={stop}
          aria-label="Restart layered intensity demo"
          className="rounded-sm border border-accent/80 bg-[#1B1B1D] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-5 md:py-2.5 md:text-sm"
        >
          Restart
        </button>
        <p className="self-center text-[12px] uppercase tracking-[0.12em] text-neutral-300 md:text-sm">
          {isLoading ? "Loading layers..." : isPlaying ? "Playing" : isReady ? "Ready" : "Idle"}
        </p>
      </div>

      <div className="mt-6 space-y-3.5 rounded-sm border border-[#3A3A3E] bg-[#1E1E20] p-4 md:space-y-4 md:p-5">
        <label htmlFor={sliderId} className="font-heading text-sm uppercase tracking-[0.14em] text-neutral-300 md:text-base">
          Intensity
        </label>
        <input
          id={sliderId}
          aria-label="Intensity slider"
          type="range"
          min={0}
          max={2}
          step={0.01}
          value={sliderValue}
          onChange={onSliderChange}
          className="w-full accent-accent"
        />
        <div className="grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.11em] text-neutral-300 md:text-sm">
          <span>Very Intense</span>
          <span className="text-center">Intense</span>
          <span className="text-right">Ambient</span>
        </div>
      </div>

      <p className="mt-5 text-base leading-relaxed text-neutral-300 md:text-lg">
        Drag the slider to move through musical intensity layers.
      </p>

      {error ? (
        <p className="mt-5 rounded-sm border border-red-500/60 bg-red-900/30 px-4 py-3 text-sm uppercase tracking-[0.12em] text-red-100">
          {error}
        </p>
      ) : null}
    </div>
  );
}
