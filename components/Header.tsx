"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
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
      const threshold = pathname === "/" ? Math.max(window.innerHeight - 140, 120) : 0;
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

  const headerClassName = useMemo(() => {
    if (transparentHomeHeader) {
      return "bg-transparent";
    }

    return "bg-canvas/95 backdrop-blur-sm shadow-sm";
  }, [transparentHomeHeader]);

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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClassName}`}>
      <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
        <div className="flex min-h-[76px] items-center gap-4 md:min-h-[92px] md:gap-10">
          <Link
            href="/"
            className="font-heading text-[1.08rem] uppercase leading-[1.05] tracking-[0.2em] text-accent transition-opacity hover:opacity-75 sm:text-[1.2rem] md:text-[2.05rem] md:tracking-[0.22em]"
          >
            {siteConfig.logoText}
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 md:flex">
            {siteConfig.navLinks.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-heading text-[1.45rem] leading-none tracking-[0.04em] text-accent transition-opacity hover:opacity-70 ${
                    active ? "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-accent" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-sm border border-accent/30 text-accent transition hover:border-accent/60 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
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

          {siteConfig.socialLinks.length > 0 ? (
            <div className="hidden items-center gap-2 pl-2 md:flex">
              {siteConfig.socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-accent text-[10px] font-semibold uppercase tracking-widest text-accent transition hover:bg-accent hover:text-black"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Container>

      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[76px] bg-black/20 md:hidden"
          />
          <div className="border-t border-neutral-200 bg-canvas/95 shadow-lg backdrop-blur-sm md:hidden">
            <Container className="max-w-none px-4 sm:px-5">
              <nav aria-label="Mobile primary" className="flex flex-col py-3">
                {siteConfig.navLinks.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleMobileNavClick(event, item.href)}
                      className={`border-b border-neutral-200/80 py-4 font-heading text-[1.15rem] uppercase tracking-[0.14em] text-accent transition-opacity active:opacity-70 ${
                        active ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  );
}
