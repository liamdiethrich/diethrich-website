import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { filmMusicItems } from "@/content/filmMusic";
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
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-10 md:gap-12 lg:gap-14">
            <div className="w-full">
              <LayeredIntensityPlayer track={layeredIntensityDemoTrack} />
            </div>
            <div className="w-full max-w-[460px]">
              <PosterAudioCard track={smokeBreakMenuTrack} />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
