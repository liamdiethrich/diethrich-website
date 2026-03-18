import { Container } from "@/components/Container";
import { ContactInquiryForm } from "@/components/ContactInquiryForm";
import { siteConfig } from "@/content/site";

const inquiryAreas = ["Film Music", "Game Music", "Concert Commissions", "Creative Collaborations"] as const;

export default function ContactPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1320px]">
        <div className="mx-auto max-w-[1110px] rounded-[22px] bg-[#FCFBF8] px-5 py-7 shadow-[0_18px_38px_rgba(0,0,0,0.06)] sm:px-7 sm:py-8 md:px-10 md:py-11 lg:px-[3.4rem] lg:py-[3.5rem]">
          <div className="mx-auto max-w-[40rem] border-b border-neutral-200/80 pb-7 text-center sm:pb-8 md:pb-9">
            <h1 className="font-heading text-[0.76rem] uppercase tracking-[0.26em] text-accent sm:text-[0.8rem] md:text-[0.86rem]">
              Contact
            </h1>
            <p className="mx-auto mt-4 max-w-[31rem] text-[1rem] leading-[1.64] text-neutral-700 sm:text-[1.08rem] sm:leading-[1.68] md:max-w-[35rem] md:text-[1.2rem] md:leading-[1.72] lg:text-[1.28rem]">
              For scoring, commissions, and creative collaborations, I&apos;d love to hear about your project.
            </p>
            <p className="mx-auto mt-3 max-w-[27rem] text-[0.94rem] leading-relaxed text-neutral-500 sm:text-[0.98rem] md:text-[1.04rem] lg:text-[1.08rem]">
              Share a few details below, or reach out directly.
            </p>
          </div>

          <div className="mt-8 grid gap-8 sm:mt-9 sm:gap-9 lg:mt-11 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.08fr)] lg:gap-x-16">
            <div className="order-2 space-y-6 sm:space-y-7 lg:order-1 lg:max-w-[20.5rem] lg:space-y-8">
              <section className="space-y-4">
                <p className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent md:text-[0.8rem]">
                  Working Together
                </p>
                <p className="max-w-[32rem] text-[0.98rem] leading-[1.7] text-neutral-700 md:text-[1.04rem] md:leading-[1.72]">
                  I welcome inquiries related to film music, game music, concert works, and creative collaborations.
                </p>
                <ul className="space-y-2 pt-1 font-heading text-[0.9rem] uppercase tracking-[0.15em] text-neutral-900 sm:text-[0.94rem] md:text-[1.02rem]">
                  {inquiryAreas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4 border-t border-neutral-200/80 pt-6 sm:pt-7">
                <p className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent md:text-[0.8rem]">
                  Direct
                </p>
                <div className="space-y-4">
                  {[siteConfig.contact.email, siteConfig.contact.instagram].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <p className="font-heading text-[0.76rem] uppercase tracking-[0.18em] text-neutral-500">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex w-fit break-words text-[0.98rem] leading-relaxed text-neutral-800 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[1.04rem]"
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-neutral-200/80 pt-6 sm:pt-7">
                <p className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-accent md:text-[0.8rem]">
                  Note
                </p>
                <p className="max-w-[32rem] text-[0.98rem] leading-[1.7] text-neutral-700 md:text-[1.04rem] md:leading-[1.72]">
                  The more context you can share about timing, format, references, and creative goals, the better.
                </p>
              </section>
            </div>

            <div className="order-1 lg:order-2 lg:border-l lg:border-neutral-200/80 lg:pl-16">
              <ContactInquiryForm emailAddress={siteConfig.contact.email.value} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
