import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#DED7CC",
        paper: "#ECE5DA",
        ivory: "#F6F0E7",
        stone: "#B7A999",
        ink: "#171210",
        charcoal: "#211B18",
        accent: "#F36424",
        footer: "#14110F"
      },
      fontFamily: {
        heading: ["var(--font-barlow-condensed)", "sans-serif"],
        display: ["var(--font-cormorant-garamond)", "serif"],
        body: ["var(--font-source-sans)", "sans-serif"]
      },
      letterSpacing: {
        wideplus: "0.18em"
      },
      boxShadow: {
        "hero-overlay": "inset 0 0 0 1000px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
