import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { filmMusicItems, type FilmMusicItem } from "@/content/filmMusic";
import { siteConfig } from "@/content/site";

const selectedWorks = [
  filmMusicItems.find((item) => item.slug === "in-another-life-rescore"),
  filmMusicItems.find((item) => item.slug === "the-sunken-place-rescore"),
  filmMusicItems.find((item) => item.slug === "life-is-beautiful"),
  filmMusicItems.find((item) => item.slug === "datamosh")
].filter((item): item is FilmMusicItem => Boolean(item));

const [leadWork, ...supportingWorks] = selectedWorks;

const disciplines = [
  {
    number: "01",
    title: "Film",
    description:
      "Narrative-first scoring with a strong sense of pacing, character, and emotional architecture."
  },
  {
    number: "02",
    title: "Games",
    description:
      "Adaptive music systems and layered writing that respond to play without losing musical identity."
  },
  {
    number: "03",
    title: "Concert",
    description:
      "Contemporary concert music grounded in instrumental character, dramatic tension, and formal clarity."
  }
] as const;

const heroRecognitionLine = "Winner of the American Prize • Collaborations with Grammy-winning ensembles";

const aboutCredentials = [
  "Juilliard • USC Screen Scoring",
  "American Prize recognition",
  "Collaborations with Grammy-winning ensembles"
] as const;

type WorkPreviewProps = {
  item: FilmMusicItem;
  lead?: boolean;
};

function WorkPreview({ item, lead = false }: WorkPreviewProps) {
  return (
    <article>
      <Link href={`/film-music/${item.slug}`} className="group block">
        <div
          className={`overflow-hidden border border-black/10 bg-black shadow-[0_20px_44px_rgba(23,18,16,0.08)] ${
            lead ? "aspect-[16/11]" : "aspect-[16/10]"
          }`}
        >
          {item.posterImage ? (
            <div className="relative h-full w-full">
              <Image
                src={item.posterImage}
                alt={item.title}
                fill
                sizes={lead ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 38vw"}
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,8,0.08)_0%,rgba(10,8,8,0.55)_100%)]" />
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 border-b border-black/10 px-1 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-5">
          <div className="space-y-2">
            {item.sourceTitle ? (
              <p className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent">{item.sourceTitle}</p>
            ) : null}
            <h3 className={`font-display leading-[0.96] text-ink ${lead ? "text-[2rem] md:text-[2.45rem]" : "text-[1.8rem] md:text-[2.2rem]"}`}>
              {item.title}
            </h3>
            {item.homeCaption ? (
              <p className="max-w-[38rem] text-[0.98rem] leading-[1.68] text-ink/70 md:text-[1rem]">{item.homeCaption}</p>
            ) : null}
          </div>
          <p className="font-heading text-[0.74rem] uppercase tracking-[0.22em] text-ink/42 transition group-hover:text-accent">
            Open Work
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="bg-canvas text-ink">
      <section className="relative -mt-[76px] min-h-[108svh] overflow-hidden bg-ink md:-mt-[92px] md:min-h-[100svh]">
        <Image
          src="/images/home/liam-conducting-enhanced.jpg"
          alt="Liam Diethrich conducting an orchestra in the studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_24%] md:object-[30%_22%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,0.18)_0%,rgba(9,8,8,0.42)_52%,rgba(9,8,8,0.92)_100%)] md:bg-[linear-gradient(90deg,rgba(8,7,7,0.28)_0%,rgba(8,7,7,0.16)_28%,rgba(8,7,7,0.3)_42%,rgba(8,7,7,0.82)_66%,rgba(8,7,7,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_38%)]" />

        <div className="pointer-events-none absolute inset-y-0 right-[-5rem] hidden w-[30rem] opacity-[0.09] md:block">
          <Image
            src="/images/brand/liam-diethrich-logo-transparent.png"
            alt=""
            fill
            sizes="30rem"
            className="object-contain brightness-0 invert"
          />
        </div>

        <Container className="relative z-10 flex min-h-[108svh] max-w-none items-end px-4 pb-10 pt-32 sm:px-5 md:min-h-[100svh] md:px-[44px] md:pb-[4.5rem] md:pt-32 xl:px-[60px]">
          <div className="grid w-full gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6 md:col-start-7">
              <div className="max-w-[19.5rem] space-y-5 text-ivory sm:max-w-[24rem] md:ml-auto md:max-w-[32rem] md:space-y-6">
                <p className="font-heading text-[0.78rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                  COMPOSER • VIOLINIST
                </p>

                <div className="space-y-4">
                  <h1 className="font-heading text-[clamp(2.7rem,13vw,4.7rem)] uppercase leading-[0.9] tracking-[0.14em] md:text-[clamp(4.8rem,6vw,6.8rem)] md:tracking-[0.16em]">
                    Liam Diethrich
                  </h1>
                  <p className="max-w-[26rem] font-display text-[1.45rem] leading-[1.02] text-ivory md:text-[2.35rem]">
                    Music for screen, games, and the concert stage.
                  </p>
                </div>

                <p className="max-w-[29rem] text-[0.98rem] leading-[1.72] text-ivory/82 md:text-[1.08rem] md:leading-[1.78]">
                  Liam Diethrich writes award-winning music recognized for its distinctive voice, dramatic clarity,
                  and inventive musical language. A composer and violinist with training from Juilliard and USC
                  Screen Scoring, he creates work for film, games, and live performance with equal attention to
                  story, structure, and emotional detail.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={siteConfig.ctaUrl}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 text-center font-heading text-[0.8rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_16px_30px_rgba(0,0,0,0.16)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-[52px] md:px-7"
                  >
                    Explore Music
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-6 text-center font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/32 hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-[52px] md:px-7"
                  >
                    About Liam
                  </Link>
                </div>

                <p className="border-t border-white/12 pt-5 font-heading text-[0.72rem] uppercase leading-relaxed tracking-[0.16em] text-ivory/64 md:pt-6 md:text-[0.78rem]">
                  {heroRecognitionLine}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-paper">
        <section className="border-t border-black/8 bg-[linear-gradient(180deg,#ece5da_0%,#e7dfd4_100%)] py-[4.5rem] md:py-24 lg:py-28">
          <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
            <div className="grid gap-10 border-b border-black/10 pb-10 md:grid-cols-[minmax(0,0.92fr)_minmax(0,0.6fr)] md:items-end md:pb-12">
              <div className="max-w-[40rem] space-y-4">
                <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                  SELECTED WORK
                </p>
                <h2 className="max-w-[34rem] font-display text-[2.2rem] leading-[0.96] text-ink md:text-[3.2rem]">
                  Scores shaped by story, atmosphere, and emotional precision.
                </h2>
                <p className="max-w-[34rem] text-[1rem] leading-[1.7] text-ink/72 md:text-[1.08rem]">
                  From intimate psychological tension to larger orchestral sweep, Liam&apos;s work is built to serve
                  narrative while remaining musically vivid in its own right.
                </p>
              </div>

              <div className="md:justify-self-end">
                <Link
                  href={siteConfig.ctaUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/55 px-6 font-heading text-[0.78rem] uppercase tracking-[0.22em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View Full Portfolio
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              {leadWork ? (
                <div className="lg:col-span-7">
                  <WorkPreview item={leadWork} lead />
                </div>
              ) : null}

              {supportingWorks.length > 0 ? (
                <div className="space-y-5 lg:col-span-5">
                  {supportingWorks.map((item) => (
                    <WorkPreview key={item.slug} item={item} />
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="border-t border-black/8 bg-paper py-[4.5rem] md:py-[5.5rem] lg:py-24">
          <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
            <div className="max-w-[38rem] space-y-4">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                PRACTICE
              </p>
              <h2 className="font-display text-[2.1rem] leading-[0.96] text-ink md:text-[3rem]">
                Three musical worlds, one distinctive voice.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {disciplines.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col justify-between border border-black/10 bg-ivory/55 px-5 py-6 shadow-[0_14px_30px_rgba(23,18,16,0.04)] md:px-7 md:py-8"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-black/10 pb-4">
                      <p className="font-heading text-[0.76rem] uppercase tracking-[0.22em] text-accent">{item.number}</p>
                      <div className="h-px w-12 bg-accent/45" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display text-[2rem] leading-none text-ink md:text-[2.35rem]">{item.title}</h3>
                      <p className="text-[1rem] leading-[1.72] text-ink/72 md:text-[1.04rem]">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-black/8 bg-[linear-gradient(180deg,#e8dfd3_0%,#ded6ca_100%)] py-[4.5rem] md:py-[5.5rem] lg:py-24">
          <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,0.7fr)] lg:gap-x-16 xl:gap-x-20">
              <div className="space-y-6">
                <div className="max-w-[40rem] space-y-4">
                  <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                    ABOUT
                  </p>
                  <h2 className="font-display text-[2.25rem] leading-[0.96] text-ink md:text-[3.25rem]">
                    A composer grounded in story and structure.
                  </h2>
                </div>

                <p className="max-w-[41rem] text-[1rem] leading-[1.76] text-ink/76 md:text-[1.08rem]">
                  Liam approaches every project with both a performer&apos;s sensitivity and a composer&apos;s architectural
                  ear. The result is music that feels immediate, intentional, and fully alive inside the world it
                  serves - whether on screen, in interactive media, or in the concert hall.
                </p>

                <div className="grid gap-3 border-t border-black/10 pt-5">
                  {aboutCredentials.map((item) => (
                    <p key={item} className="font-heading text-[0.76rem] uppercase tracking-[0.19em] text-ink/58">
                      {item}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/about"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink bg-ink px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Learn More
                  </Link>
                  <Link
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/45 px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Resume
                  </Link>
                </div>
              </div>

              <div className="lg:justify-self-end">
                <div className="relative overflow-hidden border border-black/10 bg-black shadow-[0_24px_52px_rgba(23,18,16,0.08)]">
                  <Image
                    src="/images/about/liam-conducting-portrait-enhanced.jpg"
                    alt="Portrait of Liam Diethrich conducting"
                    width={900}
                    height={1200}
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="aspect-[4/5] h-auto w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-black/8 bg-footer py-[4.5rem] text-ivory md:py-[5.5rem]">
          <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.55fr)] lg:items-end lg:gap-x-16">
              <div className="space-y-5">
                <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                  CONTACT
                </p>
                <h2 className="max-w-[38rem] font-display text-[2.25rem] leading-[0.96] text-ivory md:text-[3.3rem]">
                  Bring the score into focus.
                </h2>
                <p className="max-w-[34rem] text-[1rem] leading-[1.74] text-ivory/72 md:text-[1.08rem]">
                  Available for film, games, concert commissions, and select collaborative projects.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Link
                  href={siteConfig.contactUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Start a Conversation
                </Link>
                <Link
                  href={siteConfig.ctaUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/32 hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Listen to More Work
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
