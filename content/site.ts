export type NavItem = {
  label: string;
  href: string;
};

export type SocialItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  siteName: "LIAM DIETHRICH",
  logoText: "LIAM DIETHRICH",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Film Music", href: "/film-music" },
    { label: "Game Music", href: "/game-music" },
    { label: "About", href: "/about" }
  ] satisfies NavItem[],
  socialLinks: [] as SocialItem[],
  contactUrl: "#",
  resumeUrl: "#",
  ctaUrl: "#"
};
