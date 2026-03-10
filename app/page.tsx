import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PosterVideoCard } from "@/components/PosterVideoCard";
import { siteConfig } from "@/content/site";

const featuredMedia = [
  {
    title: "In Another Life",
    src: "/video/featured/in-another-life-rescore.mp4",
    poster: "/images/featured/in-another-life-poster-widescreen.jpg",
    caption: "Recorded with the RTVE Symphony Orchestra at Teatro Verdi"
  },
  {
    title: "Life Is Beautiful",
    src: "/video/featured/life-is-beautiful-scene-final.mp4",
    poster: "/images/featured/life-is-beautiful-poster-widescreen.jpg",
    caption: "Recorded with a 52-piece orchestra at the Eastwood Scoring Stage (Warner Brothers Studios)"
  }
] as const;

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
          className="object-cover object-[38%_24%] md:object-[center_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,12,0.12)_0%,rgba(7,9,12,0.26)_34%,rgba(5,7,10,0.9)_100%)] md:bg-[linear-gradient(90deg,rgba(10,12,16,0.06)_0%,rgba(10,12,16,0.12)_24%,rgba(8,10,13,0.2)_48%,rgba(7,9,12,0.66)_70%,rgba(6,7,9,0.95)_100%)]" />
        <div className="hidden md:absolute md:inset-y-0 md:right-0 md:block md:w-[39%] md:bg-[linear-gradient(90deg,rgba(7,9,12,0)_0%,rgba(7,9,12,0.2)_12%,rgba(6,7,9,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.015)_18%,rgba(255,255,255,0)_40%)] md:bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_40%)]" />
        <Container className="relative z-10 flex min-h-[92svh] max-w-none items-end justify-center px-4 pb-14 pt-28 sm:px-5 md:min-h-screen md:justify-end md:pb-20 md:px-[44px] xl:px-[60px]">
          <div className="flex w-full max-w-[19rem] flex-col items-center space-y-4 text-center text-neutral-100 sm:max-w-[21rem] md:ml-auto md:max-w-[29rem] md:items-end md:space-y-7 md:text-right">
            <h1 className="font-heading text-[clamp(2.45rem,13vw,4.05rem)] uppercase leading-[0.92] tracking-[0.13em] md:text-[clamp(4.05rem,5.6vw,5.5rem)] md:tracking-[0.15em]">
              Liam Diethrich
            </h1>
            <p className="max-w-[18rem] text-[0.9rem] leading-relaxed tracking-[0.11em] text-neutral-200 sm:text-[0.98rem] md:max-w-[24rem] md:text-[1.14rem] md:tracking-[0.12em]">
              Media and Concert Composer
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas pb-20 pt-6 md:pb-32 md:pt-10">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-x-3 gap-y-10 md:grid-cols-2 xl:gap-x-4">
            {featuredMedia.map((item) => (
              <article key={item.title} className="space-y-4 md:space-y-6">
                <PosterVideoCard src={item.src} poster={item.poster} title={item.title} className="shadow-[0_8px_22px_rgba(0,0,0,0.14)]" />
                <div className="space-y-3 text-neutral-800 md:space-y-4">
                  <h2 className="text-[1rem] font-semibold leading-none md:text-[1.1rem]">{item.title}</h2>
                  <p className="max-w-[42rem] text-[0.93rem] leading-[1.65] text-neutral-700 md:text-[1rem]">
                    {item.caption}
                  </p>
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
