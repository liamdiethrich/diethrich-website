"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { Container } from "./Container";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = pathname === "/" ? Math.max(window.innerHeight - 180, 120) : 0;
      setIsScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const transparentHomeHeader = pathname === "/" && !isScrolled && !mobileMenuOpen;
  const shellClassName = transparentHomeHeader
    ? "border-transparent bg-transparent text-ivory"
    : "border-b border-black/10 bg-paper/92 text-ink shadow-[0_16px_36px_rgba(23,18,16,0.08)] backdrop-blur-xl";
  const linkClassName = transparentHomeHeader
    ? "text-ivory/78 hover:text-ivory"
    : "text-ink/72 hover:text-ink";
  const buttonClassName = transparentHomeHeader
    ? "border-white/18 text-ivory hover:border-accent hover:bg-white/6"
    : "border-black/10 text-ink hover:border-accent hover:bg-white/45";

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      event.preventDefault();
      setMobileMenuOpen(false);
      window.location.assign(href);
      return;
    }

    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${shellClassName}`}>
      <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
        <div className="flex min-h-[76px] items-center gap-4 md:min-h-[92px] md:gap-10">
          <Link
            href="/"
            className={`inline-flex items-center font-heading text-[1.08rem] uppercase leading-none tracking-[0.32em] transition-opacity hover:opacity-75 sm:text-[1.12rem] md:text-[1.42rem] ${
              transparentHomeHeader ? "text-ivory" : "text-ink"
            }`}
          >
            {siteConfig.logoText}
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex xl:gap-9">
            {siteConfig.navLinks.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative font-heading text-[0.9rem] uppercase tracking-[0.24em] transition ${
                    active ? "text-accent" : linkClassName
                  } after:absolute after:-bottom-2 after:left-0 after:h-px after:transition-all ${
                    active ? "after:w-full after:bg-accent" : "after:w-0 hover:after:w-full hover:after:bg-current"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href={siteConfig.contactUrl}
            className={`hidden min-h-11 items-center justify-center rounded-full border bg-white/[0.02] px-5 font-heading text-[0.84rem] uppercase tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex ${buttonClassName}`}
          >
            Contact
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className={`ml-auto flex h-11 w-11 items-center justify-center rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden ${buttonClassName}`}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-px w-full bg-current transition ${
                  mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-px w-full bg-current transition ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-px w-full bg-current transition ${
                  mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {mobileMenuOpen ? (
        <div className="border-t border-black/10 bg-paper text-ink shadow-[0_22px_40px_rgba(23,18,16,0.08)] lg:hidden">
          <Container className="max-w-none px-4 sm:px-5">
            <div className="flex min-h-[calc(100svh-76px)] flex-col justify-between py-6">
              <nav aria-label="Mobile primary" className="flex flex-col border-t border-black/10">
                {siteConfig.navLinks.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleMobileNavClick(event, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`border-b border-black/10 py-5 font-heading text-[1.08rem] uppercase tracking-[0.22em] transition ${
                        active ? "text-accent" : "text-ink/82"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pb-4">
                <Link
                  href={siteConfig.contactUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/12 bg-white/50 px-6 font-heading text-[0.88rem] uppercase tracking-[0.22em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Contact
                </Link>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
