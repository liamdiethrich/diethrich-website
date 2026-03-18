import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { AudioTrackCard } from "@/components/AudioTrackCard";
import { filmMusicAudioTracks, filmMusicItems } from "@/content/filmMusic";
import { LayeredIntensityPlayer } from "@/components/LayeredIntensityPlayer";
import { MusicSectionHeading } from "@/components/MusicSectionHeading";
import { PosterAudioCard } from "@/components/PosterAudioCard";
import { layeredIntensityDemoTrack, smokeBreakMenuTrack } from "@/content/gameMusic";
import { siteConfig } from "@/content/site";

const [leadFilmWork, ...secondaryFilmWorks] = filmMusicItems;

const sectionLinkClassName =
  "group inline-flex items-center gap-3 font-heading text-[0.72rem] uppercase tracking-[0.24em] text-ink/62 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const actionLinkClassName =
  "group inline-flex items-center gap-3 font-heading text-[0.72rem] uppercase tracking-[0.24em] text-ink/72 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function FilmMusicPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-black/8 bg-[linear-gradient(180deg,#efe8dc_0%,#e2dacd_100%)] pb-16 pt-16 md:pb-20 md:pt-24 lg:pb-24 lg:pt-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:items-end lg:gap-x-16">
            <div className="max-w-[46rem] space-y-5 md:space-y-6">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                MUSIC
              </p>
              <h1 className="font-display text-[2.65rem] leading-[0.92] text-ink md:text-[3.65rem] lg:text-[4.5rem]">
                Scores, systems, and standalone works.
              </h1>
              <p className="max-w-[38rem] text-[1rem] leading-[1.76] text-ink/72 md:text-[1.08rem]">
                A selection of music for film, games, and independent listening - from narrative rescores and adaptive
                interactive writing to self-contained tracks shaped by atmosphere, motion, and dramatic form.
              </p>
              <p className="max-w-[34rem] border-t border-black/10 pt-5 font-heading text-[0.72rem] uppercase tracking-[0.2em] text-ink/52">
                Selected works across screen, play, and the concert-informed imagination.
              </p>
            </div>

            <div className="space-y-6 border-t border-black/10 pt-5 lg:justify-self-end lg:max-w-[20rem] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div className="space-y-2">
                <p className="font-heading text-[0.68rem] uppercase tracking-[0.24em] text-accent">Portfolio Guide</p>
                <p className="max-w-[17rem] text-[0.96rem] leading-[1.72] text-ink/64">
                  Three movements: film, game scoring, and standalone listening.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-[18rem] lg:flex lg:flex-col">
                <a href="#film-work" className={sectionLinkClassName}>
                  <span className="text-ink/34 transition group-hover:text-accent">01</span>
                  <span className="h-px w-7 bg-current/40 transition-all group-hover:w-9 group-hover:bg-accent" />
                  Film Music
                </a>
                <a href="#game-music" className={sectionLinkClassName}>
                  <span className="text-ink/34 transition group-hover:text-accent">02</span>
                  <span className="h-px w-7 bg-current/40 transition-all group-hover:w-9 group-hover:bg-accent" />
                  Game Music
                </a>
                <a href="#audio-tracks" className={sectionLinkClassName}>
                  <span className="text-ink/34 transition group-hover:text-accent">03</span>
                  <span className="h-px w-7 bg-current/40 transition-all group-hover:w-9 group-hover:bg-accent" />
                  Additional Music
                </a>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 lg:flex-col lg:gap-x-0">
                <Link href="/about" className={actionLinkClassName}>
                  <span className="h-px w-7 bg-current/40 transition-all group-hover:w-9 group-hover:bg-accent" />
                  About Liam
                </Link>
                <Link href={siteConfig.contactUrl} className={actionLinkClassName}>
                  <span className="h-px w-7 bg-current/40 transition-all group-hover:w-9 group-hover:bg-accent" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="film-work" className="bg-paper py-[4.9rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <MusicSectionHeading
            sequence="01"
            eyebrow="FILM"
            title="Music shaped by image, pacing, and psychological detail."
            description="A curated selection of rescoring work and narrative-driven cues, written with close attention to dramatic arc, subtext, and cinematic timing."
          />

          {leadFilmWork ? (
            <div className="mt-12">
              <FilmGridItem item={leadFilmWork} variant="feature" />
            </div>
          ) : null}

          {secondaryFilmWorks.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
              {secondaryFilmWorks.map((item) => (
                <FilmGridItem key={item.slug} item={item} />
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section
        id="game-music"
        className="relative overflow-hidden border-y border-white/6 bg-[linear-gradient(180deg,#171311_0%,#14110f_100%)] py-[4.9rem] text-ivory md:py-24 lg:py-28"
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
          <MusicSectionHeading
            sequence="02"
            eyebrow="GAMES"
            title="Adaptive writing for interactive worlds."
            description="Layered systems, loop-aware structure, and dramatic escalation designed to respond to play without sacrificing musical identity."
            invert
          />

          <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <div className="space-y-4">
              <p className="font-heading text-[0.68rem] uppercase tracking-[0.24em] text-accent">
                Featured interactive score study
              </p>
              <LayeredIntensityPlayer track={layeredIntensityDemoTrack} />
            </div>

            <div className="space-y-4 xl:pt-[3.35rem]">
              <PosterAudioCard track={smokeBreakMenuTrack} />
            </div>
          </div>
        </Container>
      </section>

      <section id="audio-tracks" className="bg-[linear-gradient(180deg,#e6ddd1_0%,#ddd5ca_100%)] py-[4.9rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <MusicSectionHeading
            sequence="03"
            eyebrow="ADDITIONAL MUSIC"
            title="Standalone tracks and extended listening."
            description="A selection of independent works presented for direct listening - concise, image-rich, and varied in tone, from dark atmospheric studies to more expansive, melodic writing."
          />

          <div className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-2">
            {filmMusicAudioTracks.map((track, index) => (
              <AudioTrackCard key={track.slug} track={track} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-footer pb-[4.6rem] pt-[4.8rem] text-ivory md:pb-[5.3rem] md:pt-[5.2rem]">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <MusicSectionHeading
            sequence="04"
            eyebrow="CONTACT"
            title="For film, games, and new collaborations."
            description="For inquiries, commissions, and selected collaborative projects, get in touch."
            invert
          />

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={siteConfig.contactUrl}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 font-heading text-[0.78rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 font-heading text-[0.76rem] uppercase tracking-[0.24em] text-ivory/72 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="h-px w-8 bg-current/45 transition-all group-hover:w-10 group-hover:bg-accent" />
              About Liam
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
