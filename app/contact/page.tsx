import Link from "next/link";
import { Container } from "@/components/Container";
import { ContactInquiryForm } from "@/components/ContactInquiryForm";
import { SecondaryPageMasthead } from "@/components/SecondaryPageMasthead";
import { siteConfig } from "@/content/site";

const inquiryAreas = ["Film Music", "Game Music", "Concert Commissions", "Creative Collaborations"] as const;

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink">
      <SecondaryPageMasthead
        eyebrow="CONTACT"
        title="For scoring, commissions, and creative collaborations, I'd love to hear about your project."
        body="Share a few details below, or reach out directly."
        aside={
          <>
            <div className="space-y-2">
              <p className="font-heading text-[0.68rem] uppercase tracking-[0.24em] text-accent">Direct Contact</p>
              <a
                href={siteConfig.contact.email.href}
                className="font-heading text-[0.8rem] uppercase tracking-[0.18em] text-ink/68 transition hover:text-accent"
              >
                {siteConfig.contact.email.value}
              </a>
            </div>

            <div className="space-y-3 border-t border-black/10 pt-4">
              <p className="font-heading text-[0.68rem] uppercase tracking-[0.24em] text-accent">Inquiry Areas</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:max-w-[18rem] lg:grid-cols-1">
                {inquiryAreas.map((item, index) => (
                  <p
                    key={item}
                    className="inline-flex items-center gap-3 font-heading text-[0.72rem] uppercase tracking-[0.2em] text-ink/58"
                  >
                    <span className="text-ink/34">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </>
        }
      />

      <section className="bg-paper py-[4.9rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="border-t border-black/10 pt-7 md:pt-8">
            <div className="border border-black/10 bg-[#f8f3ea] shadow-[0_18px_40px_rgba(23,18,16,0.05)]">
              <div className="grid gap-6 border-b border-black/10 px-5 py-6 md:px-8 md:py-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.48fr)] lg:items-end lg:gap-x-12 lg:px-10 xl:px-12">
                <div className="max-w-[35rem] space-y-3">
                  <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                    INQUIRY
                  </p>
                  <h2 className="font-display text-[2.1rem] leading-[0.96] text-ink md:text-[3rem]">
                    A clear path into the conversation.
                  </h2>
                </div>
                <p className="max-w-[28rem] text-[0.98rem] leading-[1.72] text-ink/68 md:justify-self-end md:text-right md:text-[1.02rem]">
                  The inquiry form opens your default email app with a drafted message, keeping the process direct and
                  personal.
                </p>
              </div>

              <div className="grid gap-10 p-5 md:p-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-x-16 lg:p-10 xl:gap-x-20 xl:p-12">
                <div className="space-y-7 lg:pt-2">
                  <section className="space-y-4 border-t border-black/10 pt-7">
                    <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                      WORKING TOGETHER
                    </p>
                    <p className="max-w-[22rem] text-[1rem] leading-[1.74] text-ink/72 md:text-[1.06rem]">
                      For film music, game music, concert commissions, and selected creative collaborations.
                    </p>
                  </section>

                  <section className="space-y-4 border-t border-black/10 pt-6">
                    <div className="grid gap-2 font-heading text-[0.82rem] uppercase tracking-[0.18em] text-ink/82 md:text-[0.88rem]">
                      <p>Film Music</p>
                      <p>Game Music</p>
                      <p>Concert Commissions</p>
                      <p>Creative Collaborations</p>
                    </div>
                  </section>

                  <section className="space-y-3 border-t border-black/10 pt-6">
                    <p className="max-w-[23rem] text-[0.98rem] leading-[1.74] text-ink/62 md:text-[1.02rem]">
                      A short outline of scope, timeline, and creative goals is helpful.
                    </p>
                    <a
                      href={siteConfig.contact.email.href}
                      className="inline-flex items-center gap-3 font-heading text-[0.76rem] uppercase tracking-[0.22em] text-ink/72 transition hover:text-accent"
                    >
                      <span className="h-px w-8 bg-current/45" />
                      Email Liam
                    </a>
                  </section>
                </div>

                <div className="lg:border-l lg:border-black/10 lg:pl-10 xl:pl-12">
                  <div className="max-w-[40rem] border-b border-black/10 pb-6 md:pb-7">
                    <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                      INQUIRY FORM
                    </p>
                    <p className="mt-3 max-w-[30rem] text-[1rem] leading-[1.72] text-ink/68 md:text-[1.04rem]">
                      Share a few details below.
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <ContactInquiryForm emailAddress={siteConfig.contact.email.value} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#18120f_0%,#0f0c0b_100%)] py-[4.8rem] text-ivory md:py-[5.4rem]">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="grid gap-10 border-t border-white/8 pt-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.55fr)] lg:items-end lg:gap-x-16">
            <div className="space-y-5">
              <p className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent md:text-[0.82rem]">
                MUSIC
              </p>
              <h2 className="max-w-[38rem] font-display text-[2.2rem] leading-[0.96] text-ivory md:text-[3.2rem]">
                Continue into the work.
              </h2>
              <p className="max-w-[34rem] text-[1rem] leading-[1.74] text-ivory/72 md:text-[1.08rem]">
                If you&apos;d like to hear the music first, the full portfolio remains one step away.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link
                href={siteConfig.ctaUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/80 bg-accent px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_28px_rgba(0,0,0,0.14)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Explore Music
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.02] px-6 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white/32 hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                About Liam
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
