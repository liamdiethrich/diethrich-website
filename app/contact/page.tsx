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
      />

      <section className="bg-paper py-[4.9rem] md:py-24 lg:py-28">
        <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
          <div className="border-t border-black/10 pt-7 md:pt-8">
            <div className="border border-black/10 bg-[#f8f3ea] shadow-[0_18px_40px_rgba(23,18,16,0.05)]">
              <div className="grid gap-10 p-5 md:p-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-x-16 lg:p-10 xl:gap-x-20 xl:p-12">
                <div className="space-y-7 lg:pt-2">
                  <section className="space-y-4 border-t border-black/10 pt-7">
                    <p className="font-heading text-[0.84rem] uppercase tracking-[0.26em] text-accent md:text-[0.9rem]">
                      WORKING TOGETHER
                    </p>
                    <p className="max-w-[22rem] text-[1rem] leading-[1.74] text-ink/72 md:text-[1.06rem]">
                      For film music, game music, concert commissions, and selected creative collaborations.
                    </p>
                  </section>

                  <section className="space-y-4 border-t border-black/10 pt-6">
                    <div className="grid gap-2 font-heading text-[0.9rem] uppercase tracking-[0.18em] text-ink/82 md:text-[0.96rem]">
                      {inquiryAreas.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-3 border-t border-black/10 pt-6">
                    <p className="max-w-[23rem] text-[0.98rem] leading-[1.74] text-ink/62 md:text-[1.02rem]">
                      A short outline of scope, timeline, and creative goals is helpful.
                    </p>
                    <a
                      href={siteConfig.contact.email.href}
                      className="font-heading text-[0.84rem] uppercase tracking-[0.22em] text-ink/72 transition hover:text-accent"
                    >
                      {siteConfig.contact.email.value}
                    </a>
                  </section>
                </div>

                <div className="lg:border-l lg:border-black/10 lg:pl-10 xl:pl-12">
                  <ContactInquiryForm emailAddress={siteConfig.contact.email.value} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
