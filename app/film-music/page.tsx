import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { AudioTrackCard } from "@/components/AudioTrackCard";
import { filmMusicAudioTracks, filmMusicItems } from "@/content/filmMusic";
import { LayeredIntensityPlayer } from "@/components/LayeredIntensityPlayer";
import { PosterAudioCard } from "@/components/PosterAudioCard";
import { layeredIntensityDemoTrack, smokeBreakMenuTrack } from "@/content/gameMusic";

export default function FilmMusicPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-32">
      <Container className="max-w-[1320px]">
        <h1 className="mb-10 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:mb-16 md:text-left md:text-3xl md:tracking-[0.24em]">
          Film Music
        </h1>
        <div className="grid gap-x-6 gap-y-9 md:gap-y-12 md:grid-cols-2">
          {filmMusicItems.map((item) => (
            <FilmGridItem key={item.slug} item={item} />
          ))}
        </div>

        <section id="game-music" className="mt-16 md:mt-24">
          <h2 className="mb-8 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:mb-12 md:text-left md:text-3xl md:tracking-[0.24em]">
            Game Music
          </h2>
          <div className="mx-auto flex max-w-[980px] flex-col items-start gap-10 md:gap-12 lg:gap-14">
            <div className="w-full">
              <LayeredIntensityPlayer track={layeredIntensityDemoTrack} />
            </div>
            <div className="w-full max-w-[320px] self-start">
              <PosterAudioCard track={smokeBreakMenuTrack} />
            </div>
          </div>
        </section>

        <section id="audio-tracks" className="mt-16 md:mt-24">
          <h2 className="mb-4 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:mb-5 md:text-left md:text-3xl md:tracking-[0.24em]">
            Additional Music
          </h2>
          <p className="mb-8 max-w-[900px] text-center text-base leading-relaxed text-neutral-700 md:mb-10 md:text-left md:text-lg">
            A selection of standalone tracks presented with full playback controls and progress tracking.
          </p>
          <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
            {filmMusicAudioTracks.map((track) => (
              <AudioTrackCard key={track.slug} track={track} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
