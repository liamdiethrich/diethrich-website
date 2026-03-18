import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SecondaryPageMasthead } from "@/components/SecondaryPageMasthead";
import { siteConfig } from "@/content/site";

const mastheadNotes = [
  {
    label: "Profile",
    value: "Composer • Violinist"
  },
  {
    label: "Practice",
    value: "Screen, games, and the concert stage"
  }
] as const;

const practiceItems = [
  {
    label: "Film",
    copy: "Narrative-driven scoring shaped by pacing, image, and emotional architecture."
  },
  {
    label: "Games",
    copy: "Adaptive and system-aware music that responds to play without losing musical identity."
  },
  {
    label: "Concert",
    copy: "Contemporary writing grounded in instrumental character, dramatic tension, and formal clarity."
  }
] as const;

const credibilityItems = [
  "Juilliard",
  "USC Screen Scoring",
  "Award-winning music",
  "Collaborations with Grammy-winning ensembles"
] as const;

const identityNotes = [
  {
    label: "Approach",
    copy: "Screen, interactive, and concert work approached with the same attention to pacing, dramatic form, and musical identity."
  },
  {
    label: "Focus",
    copy: "Emotional experience, artistic vision, and the inner logic of the score itself."
  }
] as const;

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      <SecondaryPageMasthead
        eyebrow="ABOUT"
        title="Composer, violinist, and dramatic storyteller across screen, games, and the concert stage."
        body="Liam Diethrich is a composer and violinist trained at Juilliard and USC who writes for screen, games, and the concert stage. His award-winning music is recognized for its distinctive voice, inventive musical language, and collaborations with Grammy-winning ensembles."
        supportingLine="Music built with both a performer&apos;s sensitivity and a composer&apos;s structural ear."
        aside={
          <div className="space-y-4">
            {mastheadNotes.map((item) => (
              <div key={item.label} className="space-y-1 border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                <p className="font-heading text-[0.68rem] uppercase tracking-[0.22em] text-accent/88">{item.label}</p>
                <p className="font-heading text-[0.78rem] uppercase leading-relaxed tracking-[0.18em] text-ink/64">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <section className="bg-paper py-[4.75rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
            <div className="space-y-5">
              <p className="font-heading text-[0.7rem] uppercase tracking-[0.24em] text-accent md:text-[0.76rem]">
                PORTRAIT
              </p>
              <div className="relative overflow-hidden border border-black/10 bg-black shadow-[0_24px_52px_rgba(23,18,16,0.08)]">
                <Image
                  src="/images/about/liam-conducting-portrait-enhanced.jpg"
                  alt="Portrait of Liam Diethrich conducting"
                  width={900}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="aspect-[4/5] h-auto w-full object-cover object-center"
                />
              </div>
              <p className="border-t border-black/10 pt-4 font-heading text-[0.68rem] uppercase tracking-[0.22em] text-ink/42">
                Conducting portrait
              </p>
            </div>

            <div className="grid gap-8 lg:pt-4 xl:grid-cols-[minmax(0,1fr)_minmax(14rem,0.48fr)] xl:gap-x-10">
              <div className="space-y-8">
                <div className="max-w-[38rem] space-y-4 border-t border-black/10 pt-7">
                  <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                    ARTISTIC IDENTITY
                  </p>
                  <h2 className="font-display text-[2.15rem] leading-[0.96] text-ink md:text-[3rem]">
                    Personal in voice, disciplined in form.
                  </h2>
                </div>

                <p className="max-w-[34rem] font-display text-[1.45rem] leading-[1.04] text-ink md:text-[2rem]">
                  Music built with both a performer&apos;s sensitivity and a composer&apos;s structural ear.
                </p>

                <div className="max-w-[41rem] space-y-5 text-[1rem] leading-[1.8] text-ink/76 md:text-[1.06rem]">
                  <p>
                    Known for stylistic versatility and dramatic precision, Liam approaches each project with the goal
                    of heightening the emotional experience and artistic vision behind it — whether the work is
                    cinematic, interactive, or written for live performance.
                  </p>
                  <p>
                    Across screen projects, games, and concert writing, the focus remains on music that feels specific
                    to the world it serves: clear in structure, alive in character, and emotionally exact.
                  </p>
                </div>
              </div>

              <div className="space-y-5 border-t border-black/10 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-2">
                {identityNotes.map((item) => (
                  <div key={item.label} className="space-y-2 border-t border-black/10 pt-5 first:border-t-0 first:pt-0">
                    <p className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent">{item.label}</p>
                    <p className="text-[0.98rem] leading-[1.72] text-ink/68 md:text-[1.02rem]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-black/8 bg-[linear-gradient(180deg,#e8dfd3_0%,#ddd4c8_100%)] py-[4.9rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-8 border-b border-black/10 pb-8 md:grid-cols-[minmax(0,0.78fr)_minmax(0,0.52fr)] md:items-end md:gap-x-12 md:pb-10">
            <div className="max-w-[35rem] space-y-3">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                PRACTICE
              </p>
              <h2 className="font-display text-[2.2rem] leading-[0.95] text-ink md:text-[3.1rem]">
                Three musical worlds, one distinctive voice.
              </h2>
            </div>
            <p className="max-w-[29rem] text-[0.98rem] leading-[1.72] text-ink/68 md:justify-self-end md:text-right md:text-[1.02rem]">
              Film, games, and concert work held together by the same commitment to clarity, structure, and dramatic
              presence.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
            {practiceItems.map((item, index) => (
              <article
                key={item.label}
                className="flex h-full flex-col justify-between border-t border-black/12 pt-5 md:pt-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-[0.76rem] uppercase tracking-[0.22em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="h-px w-16 bg-accent/45" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-[1.9rem] leading-[0.98] text-ink md:text-[2.2rem]">{item.label}</h3>
                    <p className="text-[1rem] leading-[1.72] text-ink/72 md:text-[1.04rem]">{item.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-black/8 bg-paper py-[4.5rem] md:py-20 lg:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-8 border-t border-black/10 pt-7 md:grid-cols-[minmax(0,0.56fr)_minmax(0,1fr)] md:gap-x-12">
            <div className="max-w-[22rem] space-y-3">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                RECOGNITION
              </p>
              <h2 className="font-display text-[2rem] leading-[0.98] text-ink md:text-[2.55rem]">
                Training, recognition, and collaboration surfaced quietly.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
              {credibilityItems.map((item, index) => (
                <div
                  key={item}
                  className={`border-t border-black/10 pt-4 md:pt-5 xl:border-t-0 xl:pt-0 ${
                    index > 0 ? "xl:border-l xl:pl-6" : ""
                  }`}
                >
                  <p className="font-heading text-[0.76rem] uppercase leading-relaxed tracking-[0.2em] text-ink/62">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#18120f_0%,#0f0c0b_100%)] py-[4.8rem] text-ivory md:py-[5.4rem]">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-10 border-t border-white/8 pt-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.55fr)] lg:items-end lg:gap-x-16">
            <div className="space-y-5">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                CONTACT
              </p>
              <h2 className="max-w-[38rem] font-display text-[2.2rem] leading-[0.96] text-ivory md:text-[3.2rem]">
                For film, games, concert work, and new collaborations.
              </h2>
              <p className="max-w-[34rem] text-[1rem] leading-[1.74] text-ivory/72 md:text-[1.08rem]">
                Contact Liam directly, or review the resume for additional background.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link
                href={siteConfig.contactUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Contact
              </Link>
              <Link
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/32 hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
