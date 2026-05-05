import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-footer text-ivory">
      <Container className="max-w-none px-4 pb-8 sm:px-5 md:px-[44px] md:pb-10 xl:px-[60px]">
        <div className="grid gap-8 border-t border-white/8 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10">
          <div>
            <p className="font-heading text-[1rem] uppercase tracking-[0.24em] text-ivory/68 md:text-[1.06rem]">
              {siteConfig.siteName}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-heading text-[0.96rem] uppercase tracking-[0.18em] text-ivory/66 transition hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={siteConfig.contactUrl}
                className="font-heading text-[0.96rem] uppercase tracking-[0.18em] text-ivory/66 transition hover:text-accent"
              >
                Contact
              </Link>
            </nav>
            <a
              href={siteConfig.contact.email.href}
              className="break-all font-heading text-[0.96rem] uppercase tracking-[0.18em] text-ivory/46 transition hover:text-accent sm:break-normal"
            >
              {siteConfig.contact.email.value}
            </a>
          </div>
        </div>

        <div className="mt-5 text-[0.94rem] uppercase tracking-[0.14em] text-ivory/38">
          Copyright © 2026 Liam Diethrich
        </div>
      </Container>
    </footer>
  );
}
