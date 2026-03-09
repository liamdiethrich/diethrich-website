import { Container } from "@/components/Container";
import { LayeredIntensityPlayer } from "@/components/LayeredIntensityPlayer";
import { PosterAudioCard } from "@/components/PosterAudioCard";
import { layeredIntensityDemoTrack, smokeBreakMenuTrack } from "@/content/gameMusic";

export default function GameMusicPage() {
  return (
    <div className="bg-canvas pb-24 pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1280px]">
        <h1 className="mb-8 text-center font-heading text-3xl uppercase tracking-[0.24em] text-neutral-900">
          Game Music
        </h1>
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-12 lg:gap-14">
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
