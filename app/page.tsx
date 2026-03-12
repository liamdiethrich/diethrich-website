import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PosterVideoCard } from "@/components/PosterVideoCard";
import { filmMusicItems } from "@/content/filmMusic";
import { siteConfig } from "@/content/site";

const featuredMedia = filmMusicItems
  .filter((item) => item.videoUrl)
  .map((item) => ({
    slug: item.slug,
    title: item.title,
    src: item.videoUrl!,
    poster: item.posterImage,
    caption: item.homeCaption ?? item.sourceTitle ?? null
  }));

const awardBadge = {
  emblemSrc: "/images/awards/the-american-prize-emblem.png",
  primaryLine: "Winner of The American Prize",
  secondaryLine: "Recognized for excellence in composition"
} as const;

export default function HomePage() {
  return (
    <div className="bg-canvas">
      <section className="relative -mt-[76px] min-h-[92svh] w-full overflow-hidden bg-[#100f12] md:-mt-[92px] md:min-h-screen">
        <Image
          src="/images/home/liam-conducting-enhanced.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[31%_24%] md:object-[center_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,12,0.12)_0%,rgba(7,9,12,0.26)_34%,rgba(5,7,10,0.9)_100%)] md:bg-[linear-gradient(90deg,rgba(10,12,16,0.06)_0%,rgba(10,12,16,0.12)_24%,rgba(8,10,13,0.2)_48%,rgba(7,9,12,0.66)_70%,rgba(6,7,9,0.95)_100%)]" />
        <div className="hidden md:absolute md:inset-y-0 md:right-0 md:block md:w-[39%] md:bg-[linear-gradient(90deg,rgba(7,9,12,0)_0%,rgba(7,9,12,0.2)_12%,rgba(6,7,9,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.015)_18%,rgba(255,255,255,0)_40%)] md:bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_40%)]" />
        <Container className="relative z-10 flex min-h-[92svh] max-w-none items-end justify-center px-4 pb-14 pt-28 sm:px-5 md:min-h-screen md:justify-end md:pb-20 md:px-[44px] xl:px-[60px]">
          <div className="flex w-full max-w-[19rem] flex-col items-center space-y-4 text-center text-neutral-100 sm:max-w-[21rem] md:ml-auto md:max-w-[31rem] md:items-end md:space-y-6 md:text-right">
            <h1 className="font-heading text-[clamp(2.45rem,13vw,4.05rem)] uppercase leading-[0.92] tracking-[0.13em] md:text-[clamp(4.05rem,5.6vw,5.5rem)] md:tracking-[0.15em]">
              Liam Diethrich
            </h1>
            <div className="flex w-full flex-col items-center space-y-4 md:items-end md:space-y-5">
              <p className="max-w-[18.25rem] text-[0.9rem] leading-[1.72] text-neutral-200 sm:max-w-[20rem] sm:text-[0.98rem] md:max-w-[28rem] md:text-[1.06rem] md:leading-[1.78]">
                Composer and violinist Liam Diethrich (Juilliard, USC Screen Scoring) writes award-winning music for
                screen, games, and the concert stage. His work is recognized for its distinctive voice, innovative
                musical language, and collaborations with Grammy-winning ensembles.
              </p>

              <p className="max-w-[18rem] text-[0.82rem] leading-relaxed tracking-[0.11em] text-neutral-200 sm:text-[0.92rem] md:max-w-[24rem] md:text-[1.02rem] md:tracking-[0.12em]">
                Media and Concert Composer
              </p>

              <div className="w-full max-w-[18rem] sm:max-w-[19.25rem] md:max-w-[22.75rem]">
                <div className="mx-auto flex flex-col items-center gap-3 rounded-[20px] border border-white/10 bg-[rgba(10,12,16,0.5)] px-4 py-3.5 text-center shadow-[0_18px_36px_rgba(0,0,0,0.24)] backdrop-blur-[14px] md:mx-0 md:flex-row md:items-center md:gap-4 md:px-4.5 md:py-4 md:text-left">
                  <Image
                    src={awardBadge.emblemSrc}
                    alt="The American Prize emblem"
                    width={96}
                    height={93}
                    sizes="(max-width: 768px) 64px, 96px"
                    className="h-auto w-14 shrink-0 object-contain sm:w-16 md:w-24"
                  />
                  <div className="space-y-1.5">
                    <p className="font-heading text-[0.72rem] uppercase leading-tight tracking-[0.14em] text-neutral-50 sm:text-[0.76rem] md:text-[0.83rem]">
                      {awardBadge.primaryLine}
                    </p>
                    <p className="text-[0.72rem] leading-relaxed tracking-[0.02em] text-neutral-300 md:text-[0.79rem]">
                      {awardBadge.secondaryLine}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-canvas pb-20 pt-6 md:pb-32 md:pt-10">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-x-3 gap-y-10 md:grid-cols-2 xl:gap-x-4">
            {featuredMedia.map((item) => (
              <article key={item.slug} className="space-y-4 md:space-y-6">
                <PosterVideoCard src={item.src} poster={item.poster} title={item.title} className="shadow-[0_8px_22px_rgba(0,0,0,0.14)]" />
                <div className="space-y-2 text-neutral-800 md:space-y-3">
                  <h2 className="text-[1rem] font-semibold leading-none md:text-[1.1rem]">{item.title}</h2>
                  {item.caption ? (
                    <p className="max-w-[42rem] text-[0.93rem] leading-[1.65] text-neutral-700 md:text-[1rem]">
                      {item.caption}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center md:mt-16">
            <Link
              href={siteConfig.ctaUrl}
              className="rounded-full bg-accent px-8 py-3.5 text-[1rem] font-semibold text-white transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-10 md:py-4 md:text-[1.05rem]"
            >
              View Portfolio
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
