import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SecondaryPageMasthead } from "@/components/SecondaryPageMasthead";
import { siteConfig } from "@/content/site";

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      <SecondaryPageMasthead
        eyebrow="ABOUT"
        title="About"
      />

      <section className="bg-paper py-[4.75rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-10 border-t border-black/10 pt-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,0.64fr)] lg:items-end lg:gap-x-16 xl:gap-x-20">
            <div className="relative overflow-hidden border border-black/10 bg-black shadow-[0_24px_52px_rgba(23,18,16,0.08)]">
              <Image
                src="/images/about/liam-conducting-portrait-enhanced.jpg"
                alt="Portrait of Liam Diethrich conducting"
                width={900}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="aspect-[4/5] h-auto w-full object-cover object-center"
              />
            </div>

            <div className="space-y-8 lg:pb-4">
              <p className="max-w-[34rem] text-[1.06rem] leading-[1.84] text-ink/76 md:text-[1.14rem]">
                Liam Diethrich is a composer and violinist trained at Juilliard and USC who writes for screen, games,
                and the concert stage. His award-winning music is recognized for its unique and innovative voice and
                has been performed in collaboration with Grammy-winning ensembles. Known for his stylistic versatility
                and creativity, Liam approaches each project with the goal of heightening the emotional experience and
                artistic vision behind it.
              </p>

              <div className="flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row">
                <Link
                  href={siteConfig.contactUrl}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink bg-ink px-6 font-heading text-[0.88rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Contact
                </Link>
                <Link
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/45 px-6 font-heading text-[0.88rem] uppercase tracking-[0.22em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
