import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nina-ai.nl"),
  title: {
    default: "NinA AI Agency | Van idee naar werkende AI-agent",
    template: "%s | NinA AI Agency",
  },
  description:
    "NinA AI Agency helpt B2B organisaties om processen te automatiseren met slimme AI-agents en workflows, zonder je hele IT-landschap om te gooien.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "NinA AI Agency",
    title: "NinA AI Agency | Van AI-kennis naar een werkende AI-organisatie",
    description:
      "Jullie vaste AI-partner: lezingen, workshops, automatiseringen en AI-agents. Gevestigd in Amsterdam.",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="grain relative min-h-full flex flex-col bg-bg text-text">
        {/* Sentinel voor de header: zodra dit element uit beeld is, is er
            gescrold. IntersectionObserver in plaats van scroll-listener. */}
        <div
          id="top-sentinel"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-8 w-px"
        />
        <ScrollProgress />
        <CursorGlow />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
