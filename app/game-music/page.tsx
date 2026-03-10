import { Container } from "@/components/Container";
import { LayeredIntensityPlayer } from "@/components/LayeredIntensityPlayer";
import { PosterAudioCard } from "@/components/PosterAudioCard";
import { layeredIntensityDemoTrack, smokeBreakMenuTrack } from "@/content/gameMusic";

export default function GameMusicPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1280px]">
        <h1 className="mb-8 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:text-3xl md:tracking-[0.24em]">
          Game Music
        </h1>
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-10 md:gap-12 lg:gap-14">
          <div className="w-full">
            <LayeredIntensityPlayer track={layeredIntensityDemoTrack} />
          </div>
          <div className="w-full max-w-[460px]">
            <PosterAudioCard track={smokeBreakMenuTrack} />
          </div>
        </div>
      </Container>
    </div>
  );
}
