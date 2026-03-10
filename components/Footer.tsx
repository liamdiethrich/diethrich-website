import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-footer py-11 text-neutral-200 md:py-14">
      <Container className="max-w-none px-4 sm:px-5 md:px-[44px] xl:px-[60px]">
        <div className="flex flex-col items-center gap-6 text-center md:gap-7">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-5">
            {siteConfig.navLinks
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-heading text-[1.05rem] tracking-[0.06em] text-accent hover:opacity-80 md:text-[1.65rem] md:tracking-[0.03em]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="space-y-3 text-[0.78rem] leading-relaxed text-neutral-300 md:space-y-4 md:text-[0.95rem]">
            <p>Copyright © 2026 Liam Diethrich</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
