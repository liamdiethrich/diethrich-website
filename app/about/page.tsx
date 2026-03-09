import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/content/site";

export default function AboutPage() {
  return (
    <div className="bg-canvas pb-24 pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1320px]">
        <h1 className="mb-14 font-heading text-3xl uppercase tracking-[0.24em] text-neutral-900">About</h1>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.74fr)] lg:gap-x-40 xl:gap-x-52">
          <div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
              <p>
                I’m Liam Diethrich, a composer and violinist with degrees in music composition from Juilliard and
                screen scoring from USC’s graduate program. I’ve had the privilege of composing award-winning scores
                for film and games, collaborating with Grammy-winning ensembles, and creating celebrated concert works.
              </p>
              <p>
                I bring my full creative energy to every project, working to bring your vision to life through music
                that deepens its emotional impact. I always aim to exceed expectations and help you realize your
                artistic goals. I look forward to the opportunity to collaborate with you.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={siteConfig.contactUrl}
                className="rounded-full bg-accent px-8 py-3 font-heading text-sm uppercase tracking-[0.16em] text-black transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Contact
              </Link>
              <Link
                href={siteConfig.resumeUrl}
                className="rounded-full border border-accent px-8 py-3 font-heading text-sm uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </Link>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-sm border border-neutral-300 bg-neutral-100">
              <Image
                src="/images/about/liam-conducting-portrait.jpg"
                alt="Liam Diethrich conducting"
                width={900}
                height={1200}
                className="h-[560px] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
