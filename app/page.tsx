import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/content/site";

const featuredMedia = [
  {
    title: "In Another Life",
    src: "/video/featured/in-another-life-rescore.mov",
    poster: "/images/featured/in-another-life-poster.png",
    caption: "Recorded with the RTVE Symphony Orchestra at Teatro Verdi"
  },
  {
    title: "Life Is Beautiful",
    src: "/video/featured/life-is-beautiful-scene-final.mov",
    poster: "/images/featured/life-is-beautiful-poster.png",
    caption: "Recorded with a 52-piece orchestra at the Eastwood Scoring Stage (Warner Brothers Studios)"
  }
] as const;

export default function HomePage() {
  return (
    <div className="bg-canvas">
      <section className="relative -mt-[92px] min-h-screen w-full overflow-hidden bg-[#100f12]">
        <Image
          src="/images/home/liam-conducting.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,15,10,0.14)_0%,rgba(22,14,11,0.16)_22%,rgba(13,11,12,0.28)_48%,rgba(8,8,10,0.72)_70%,rgba(6,7,9,0.97)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[39%] bg-[linear-gradient(90deg,rgba(9,10,12,0)_0%,rgba(8,8,10,0.28)_12%,rgba(6,7,9,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(243,100,36,0.22)_0%,rgba(243,100,36,0.05)_18%,rgba(243,100,36,0)_40%)]" />
        <Container className="relative z-10 flex min-h-screen max-w-none items-center justify-end pb-20 pt-28 md:px-[44px] xl:px-[60px]">
          <div className="ml-auto flex w-full max-w-[29rem] flex-col items-end space-y-7 text-right text-neutral-100">
            <h1 className="font-heading text-[clamp(4.05rem,5.6vw,5.5rem)] uppercase leading-[0.92] tracking-[0.15em]">
              Liam Diethrich
            </h1>
            <p className="max-w-[24rem] text-[1.04rem] leading-relaxed tracking-[0.12em] text-neutral-200 md:text-[1.14rem]">
              Media and Concert Composer
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas pb-28 pt-8 md:pb-32 md:pt-10">
        <Container className="max-w-none md:px-[44px] xl:px-[60px]">
          <div className="grid gap-x-3 gap-y-10 md:grid-cols-2 xl:gap-x-4">
            {featuredMedia.map((item) => (
              <article key={item.title} className="space-y-6">
                <div className="overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.14)]">
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full cursor-pointer bg-black object-cover"
                  />
                </div>
                <div className="space-y-4 text-neutral-800">
                  <h2 className="text-[1.05rem] font-semibold leading-none md:text-[1.1rem]">{item.title}</h2>
                  <p className="max-w-[42rem] text-[0.98rem] leading-[1.7] text-neutral-700 md:text-[1rem]">
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center md:mt-16">
            <Link
              href={siteConfig.ctaUrl}
              className="rounded-full bg-accent px-9 py-4 text-[1.05rem] font-semibold text-white transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-10"
            >
              View Portfolio
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
