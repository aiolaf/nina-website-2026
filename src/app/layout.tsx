import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import {
  Bricolage_Grotesque,
  Fragment_Mono,
  Instrument_Serif,
  Inter,
  Kalam,
} from "next/font/google";
import localFont from "next/font/local";
import LetterVoorkeur from "@/components/layout/LetterVoorkeur";
import CookieBanner from "@/components/layout/CookieBanner";
import KlikMeting from "@/components/layout/KlikMeting";
import ScrollDiepte from "@/components/layout/ScrollDiepte";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
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

/**
 * Huisstijl "Licht": Instrument Serif is de display-letter (dun, editorial,
 * met cursief als accent), Fragment Mono neemt de plek van JetBrains Mono
 * over voor labels en cijfers, en Kalam is uitsluitend voor de violette
 * handschrift-annotaties. Bricolage blijft voor kaarttitels, Inter voor body.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Kandidaat-display-letters, zelf gehost uit Fontshare (ITF Free Font
 * License: commercieel gebruik en self-hosting expliciet toegestaan, zie
 * public/fonts/FONTSHARE-FFL-LICENSE.txt).
 *
 * Instrument Serif was de sterkste reden dat de site op elke andere
 * AI-website leek. Deze twee staan tijdelijk naast elkaar zodat Olaf kan
 * kiezen; daarna gaat de verliezer eruit. Wisselen kan met ?letter=zodiak of
 * ?letter=sentient, zie LetterVoorkeur.
 */
const zodiak = localFont({
  src: [
    { path: "../../public/fonts/Zodiak-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Zodiak-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

const sentient = localFont({
  src: [
    { path: "../../public/fonts/Sentient-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Sentient-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--font-sentient",
  display: "swap",
});

export const metadata: Metadata = {
  // Canonieke host is nina-ai.nl zonder www; www stuurt daarheen door.
  metadataBase: new URL("https://nina-ai.nl"),
  title: {
    default: "NinA AI Agency | Van idee naar werkende AI-agent",
    template: "%s | NinA AI Agency",
  },
  description:
    "NinA AI Agency helpt organisaties om processen te automatiseren met slimme AI-agents en workflows, zonder je hele IT-landschap om te gooien.",
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
      className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} ${fragmentMono.variable} ${kalam.variable} ${zodiak.variable} ${sentient.variable} h-full antialiased`}
      data-letter="zodiak"
    >
      {/* Consent Mode v2. Moet met beforeInteractive draaien, dus vóór het
          GTM-script: staat de default te laat, dan mogen tags in dat gaatje
          alsnog opslaan. Alles start op denied tot de bezoeker kiest. */}
      <Script
        id="consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
      />
      {/* Google Tag Manager. Via de Next-component in plaats van het
          losse snippet: die laadt het script na hydratie en houdt de
          dataLayer bij client-side navigatie in stand, wat met App Router
          nodig is omdat er dan geen volledige paginalading meer plaatsvindt. */}
      <GoogleTagManager gtmId="GTM-58FHHD5V" />
      <body className="grain relative min-h-full flex flex-col bg-bg text-text">
        {/* GTM-fallback voor bezoekers zonder JavaScript. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58FHHD5V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Sentinel voor de header: zodra dit element uit beeld is, is er
            gescrold. IntersectionObserver in plaats van scroll-listener. */}
        <div
          id="top-sentinel"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-8 w-px"
        />
        {/* Tijdelijk: leest ?letter= en zet data-letter op <html>. */}
        <LetterVoorkeur />
        <ScrollProgress />
        <CursorGlow />
        {children}
        <CookieBanner />
        {/* Meetlaag: klikken op elke knop of link, en scrolldiepte per
            pagina. Beide renderen niets. */}
        <KlikMeting />
        <ScrollDiepte />
      </body>
    </html>
  );
}
