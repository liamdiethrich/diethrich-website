import { ReactNode } from "react";
import { Container } from "./Container";

type SecondaryPageMastheadProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  supportingLine?: string;
  aside?: ReactNode;
  className?: string;
};

export function SecondaryPageMasthead({
  eyebrow,
  title,
  body,
  supportingLine,
  aside,
  className = ""
}: SecondaryPageMastheadProps) {
  return (
    <section
      className={`border-b border-black/8 bg-[linear-gradient(180deg,#f1eadf_0%,#e6ddd1_52%,#ddd4c7_100%)] pb-14 pt-10 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14 ${className}`}
    >
      <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
        <div className="border-t border-black/10 pt-6 md:pt-8">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,21rem)] lg:items-end lg:gap-x-16 xl:gap-x-20">
            <div className="max-w-[46rem] space-y-5 md:space-y-6">
              {eyebrow ? (
                <p className="font-heading text-[0.84rem] uppercase tracking-[0.26em] text-accent md:text-[0.9rem]">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="max-w-[42rem] font-display text-[2.95rem] leading-[0.92] text-ink md:text-[4rem] lg:text-[4.75rem]">
                {title}
              </h1>
              {body ? (
                <p className="max-w-[39rem] text-[1.06rem] leading-[1.76] text-ink/72 md:text-[1.14rem]">{body}</p>
              ) : null}
              {supportingLine ? (
                <p className="max-w-[31rem] border-t border-black/10 pt-5 font-heading text-[0.8rem] uppercase tracking-[0.22em] text-ink/52">
                  {supportingLine}
                </p>
              ) : null}
            </div>

            {aside ? (
              <div className="space-y-6 border-t border-black/10 pt-5 lg:justify-self-end lg:max-w-[21rem] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {aside}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
