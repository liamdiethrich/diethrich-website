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

function WorkPreview({ item }: { item: FilmMusicItem }) {
  return (
    <article>
      <Link href={`/film-music/${item.slug}`} className="group block">
        <div className="aspect-[16/10] overflow-hidden border border-black/10 bg-black shadow-[0_20px_44px_rgba(23,18,16,0.08)]">
          {item.posterImage ? (
            <div className="relative h-full w-full">
              <Image
                src={item.posterImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,8,0.08)_0%,rgba(10,8,8,0.55)_100%)]" />
            </div>
          ) : null}
        </div>

        <div className="space-y-2 border-b border-black/10 px-1 py-5">
          {item.sourceTitle ? (
            <p className="font-heading text-[0.8rem] uppercase tracking-[0.22em] text-accent">{item.sourceTitle}</p>
          ) : null}
          <h3 className="font-display text-[1.95rem] leading-[0.96] text-ink transition-colors group-hover:text-accent md:text-[2.4rem]">
            {item.title}
          </h3>
          {item.homeCaption ? (
            <p className="max-w-[38rem] text-[0.98rem] leading-[1.68] text-ink/70 md:text-[1rem]">{item.homeCaption}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="bg-canvas text-ink">
      <section className="relative -mt-[76px] min-h-[100svh] overflow-hidden bg-ink md:-mt-[92px]">
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

        <Container className="relative z-10 flex min-h-[100svh] max-w-none items-end px-4 pb-8 pt-28 sm:px-5 md:px-[44px] md:pb-[4.5rem] md:pt-32 xl:px-[60px]">
          <div className="grid w-full gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6 md:col-start-7">
              <div className="max-w-[19.5rem] space-y-4 text-ivory sm:max-w-[24rem] md:ml-auto md:max-w-[32rem] md:space-y-5">
                <div className="space-y-4">
                  <h1 className="font-heading text-[clamp(2.7rem,13vw,4.7rem)] uppercase leading-[0.9] tracking-[0.14em] md:text-[clamp(4.8rem,6vw,6.8rem)] md:tracking-[0.16em]">
                    Liam Diethrich
                  </h1>
                  <p className="max-w-[26rem] font-display text-[1.62rem] leading-[1.02] text-ivory md:text-[2.6rem]">
                    Media and Concert Composer
                  </p>
                </div>

                <p className="max-w-[29rem] text-[1.04rem] leading-[1.72] text-ivory/82 md:text-[1.14rem] md:leading-[1.78]">
                  Composer and violinist Liam Diethrich (Juilliard, USC Screen Scoring) writes award-winning music for
                  screen, games, and the concert stage. His work is recognized for its distinctive voice, innovative
                  musical language, and collaborations with Grammy-winning ensembles.
                </p>

                <div className="space-y-4 pt-1 md:space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={siteConfig.ctaUrl}
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 text-center font-heading text-[0.88rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_16px_30px_rgba(0,0,0,0.16)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-[52px] md:px-7"
                    >
                      Explore Music
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-6 text-center font-heading text-[0.88rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/32 hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-[52px] md:px-7"
                    >
                      About
                    </Link>
                  </div>

                  <div className="border-t border-white/12 pt-4 md:pt-5">
                    <div className="flex items-end gap-3 sm:gap-4 md:gap-5">
                      <Image
                        src="/images/awards/the-american-prize-emblem-cropped-enhanced.png"
                        alt="The American Prize emblem"
                        width={535}
                        height={529}
                        priority
                        sizes="(max-width: 640px) 76px, (max-width: 768px) 88px, 108px"
                        className="h-[5.05rem] w-auto brightness-[1.05] contrast-[1.06] drop-shadow-[0_14px_20px_rgba(0,0,0,0.18)] sm:h-[5.8rem] md:h-[7.1rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/8 bg-[linear-gradient(180deg,#ece5da_0%,#e7dfd4_100%)] py-[4.5rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-5 md:grid-cols-2">
            {selectedWorks.map((item) => (
              <WorkPreview key={item.slug} item={item} />
            ))}
          </div>

          <div className="mt-12 flex justify-center md:mt-16">
            <Link
              href={siteConfig.ctaUrl}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/55 px-6 font-heading text-[0.86rem] uppercase tracking-[0.22em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Portfolio
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
