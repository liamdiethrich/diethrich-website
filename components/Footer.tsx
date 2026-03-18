import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-footer text-ivory">
      <Container className="max-w-none px-4 pb-8 sm:px-5 md:px-[44px] md:pb-10 xl:px-[60px]">
        <div className="grid gap-8 border-t border-white/8 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10">
          <div className="space-y-2.5">
            <p className="font-heading text-[0.84rem] uppercase tracking-[0.34em] text-ivory/68 md:text-[0.92rem]">
              {siteConfig.siteName}
            </p>
            <p className="max-w-[24rem] font-display text-[1.2rem] leading-[0.98] text-ivory/84 md:text-[1.5rem]">
              Music for screen, games, and the concert stage.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-heading text-[0.72rem] uppercase tracking-[0.24em] text-ivory/66 transition hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={siteConfig.contactUrl}
                className="font-heading text-[0.72rem] uppercase tracking-[0.24em] text-ivory/66 transition hover:text-accent"
              >
                Contact
              </Link>
            </nav>
            <a
              href={siteConfig.contact.email.href}
              className="font-heading text-[0.72rem] uppercase tracking-[0.22em] text-ivory/46 transition hover:text-accent"
            >
              {siteConfig.contact.email.value}
            </a>
          </div>
        </div>

        <div className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/38">Copyright © 2026 Liam Diethrich</div>
      </Container>
    </footer>
  );
}
