import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700"]
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liamdiethrich.com"),
  title: "Liam Diethrich",
  description: "Media and Concert Composer",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Liam Diethrich",
    description: "Media and Concert Composer",
    url: "https://liamdiethrich.com",
    siteName: "Liam Diethrich",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${sourceSans.variable} bg-canvas font-body text-neutral-900 antialiased`}>
        <Header />
        <main className="min-h-screen pt-[76px] md:pt-[92px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
