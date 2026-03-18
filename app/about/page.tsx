import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/content/site";

export default function AboutPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1320px]">
        <h1 className="mb-8 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:mb-14 md:text-left md:text-3xl md:tracking-[0.24em]">
          About
        </h1>
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.74fr)] lg:gap-x-20 xl:gap-x-32">
          <div className="order-2 lg:order-1">
            <div className="space-y-6 text-base leading-relaxed text-neutral-700 md:text-lg">
              <p>
                Liam Diethrich is a composer and violinist trained at Juilliard and USC who writes for screen,
                games, and the concert stage. His award-winning music is recognized for its unique and innovative
                voice and has been performed in collaboration with Grammy-winning ensembles. Known for his stylistic
                versatility and creativity, Liam approaches each project with the goal of heightening the emotional
                experience and artistic vision behind it.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={siteConfig.contactUrl}
                className="rounded-full bg-accent px-8 py-3 text-center font-heading text-sm uppercase tracking-[0.16em] text-black transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Contact
              </Link>
              <Link
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent px-8 py-3 text-center font-heading text-sm uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-sm border border-neutral-300 bg-neutral-100">
              <Image
                src="/images/about/liam-conducting-portrait-enhanced.jpg"
                alt="Liam Diethrich conducting"
                width={900}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="aspect-[4/5] h-auto w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
