export type NavItem = {
  label: string;
  href: string;
};

export type SocialItem = {
  label: string;
  href: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export const siteConfig = {
  siteName: "LIAM DIETHRICH",
  logoText: "LIAM DIETHRICH",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Music", href: "/film-music" },
    { label: "About", href: "/about" }
  ] satisfies NavItem[],
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/liam-diethrich-801101316/"
    }
  ] satisfies SocialItem[],
  contactUrl: "/contact",
  contact: {
    email: {
      label: "Email",
      value: "liamdiethrich@gmail.com",
      href: "mailto:liamdiethrich@gmail.com"
    },
    instagram: {
      label: "Instagram",
      value: "@liamdiethrich",
      href: "https://www.instagram.com/liamdiethrich/"
    }
  } satisfies Record<"email" | "instagram", ContactMethod>,
  resumeUrl: "/documents/liam-diethrich-resume.pdf",
  ctaUrl: "/film-music"
};
