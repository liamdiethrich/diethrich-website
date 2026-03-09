import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-footer py-14 text-neutral-200">
      <Container className="max-w-none md:px-[44px] xl:px-[60px]">
        <div className="flex flex-col items-center gap-7 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {siteConfig.navLinks
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-heading text-[1.65rem] tracking-[0.03em] text-accent hover:opacity-80"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="space-y-4 text-[0.95rem] leading-relaxed text-neutral-300">
            <p>Copyright © 2026 Liam Diethrich</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
