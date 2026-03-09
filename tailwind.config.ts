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
        canvas: "#E7E7E7",
        accent: "#F36424",
        footer: "#1A1A1C"
      },
      fontFamily: {
        heading: ["var(--font-barlow-condensed)", "sans-serif"],
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
