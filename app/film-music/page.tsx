import Image from "next/image";
import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { AudioTrackCard } from "@/components/AudioTrackCard";
import { filmMusicAudioTracks, filmMusicItems } from "@/content/filmMusic";
import { LayeredIntensityPlayer } from "@/components/LayeredIntensityPlayer";
import { PosterAudioCard } from "@/components/PosterAudioCard";
import { layeredIntensityDemoTrack, smokeBreakMenuTrack } from "@/content/gameMusic";

export default function FilmMusicPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-black/8 bg-[linear-gradient(180deg,#efe8dc_0%,#e2dacd_100%)] pb-14 pt-10 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="border-t border-black/10 pt-6 md:pt-8">
            <h1 className="font-display text-[2.95rem] leading-[0.92] text-ink md:text-[4rem] lg:text-[4.8rem]">
              Music
            </h1>

            <details className="relative mt-4 w-fit">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-black/12 bg-white/45 text-[1.05rem] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true">&#9776;</span>
                <span className="sr-only">Jump to music sections</span>
              </summary>

              <div className="absolute left-0 top-full z-10 mt-3 min-w-[12rem] border border-black/10 bg-[#f8f3ea] p-2 shadow-[0_18px_40px_rgba(23,18,16,0.08)]">
                <a
                  href="#film-work"
                  className="block px-3 py-2 font-heading text-[0.76rem] uppercase tracking-[0.2em] text-ink/82 transition hover:text-accent"
                >
                  Film Music
                </a>
                <a
                  href="#game-music"
                  className="block px-3 py-2 font-heading text-[0.76rem] uppercase tracking-[0.2em] text-ink/82 transition hover:text-accent"
                >
                  Game Music
                </a>
                <a
                  href="#audio-tracks"
                  className="block px-3 py-2 font-heading text-[0.76rem] uppercase tracking-[0.2em] text-ink/82 transition hover:text-accent"
                >
                  Additional Music
                </a>
              </div>
            </details>
          </div>
        </Container>
      </section>

      <section id="film-work" className="scroll-mt-28 bg-paper py-[4.9rem] md:scroll-mt-32 md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {filmMusicItems.map((item) => (
              <FilmGridItem key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="game-music"
        className="relative scroll-mt-28 overflow-hidden border-y border-white/6 bg-[linear-gradient(180deg,#171311_0%,#14110f_100%)] py-[4.9rem] text-ivory md:scroll-mt-32 md:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute right-[-5rem] top-1/2 hidden h-[24rem] w-[24rem] -translate-y-1/2 opacity-[0.065] lg:block">
          <Image
            src="/images/brand/liam-diethrich-logo-transparent.png"
            alt=""
            fill
            sizes="24rem"
            className="object-contain brightness-0 invert"
          />
        </div>

        <Container className="relative max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="border-t border-white/10 pt-7 md:pt-8">
            <h2 className="font-display text-[2.4rem] leading-[0.95] text-ivory md:text-[3.35rem]">Game Music</h2>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <LayeredIntensityPlayer track={layeredIntensityDemoTrack} />

            <div className="xl:pt-[3.35rem]">
              <PosterAudioCard track={smokeBreakMenuTrack} />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="audio-tracks"
        className="scroll-mt-28 bg-[linear-gradient(180deg,#e6ddd1_0%,#ddd5ca_100%)] py-[4.9rem] md:scroll-mt-32 md:py-24 lg:py-28"
      >
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="border-t border-black/10 pt-7 md:pt-8">
            <h2 className="font-display text-[2.4rem] leading-[0.95] text-ink md:text-[3.35rem]">Additional Music</h2>
          </div>

          <div className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-2">
            {filmMusicAudioTracks.map((track, index) => (
              <AudioTrackCard key={track.slug} track={track} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
