"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const transparentHomeHeader = pathname === "/" && !isScrolled;

  const headerClassName = useMemo(() => {
    if (transparentHomeHeader) {
      return "bg-transparent";
    }

    return "bg-canvas/95 backdrop-blur-sm shadow-sm";
  }, [transparentHomeHeader]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClassName}`}>
      <Container className="max-w-none md:px-[44px] xl:px-[60px]">
        <div className="flex min-h-[92px] items-center gap-10">
          <Link
            href="/"
            className="font-heading text-[2.05rem] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-75"
          >
            {siteConfig.logoText}
          </Link>

          <nav aria-label="Primary" className="ml-auto flex items-center gap-8">
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
    </header>
  );
}
