import type { Metadata } from "next";
import { Bricolage_Grotesque, Fragment_Mono, Inter, Kalam } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import CookieBanner from "@/components/layout/CookieBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { GTM_ID, gtmScript } from "@/lib/gtm";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Dezelfde letters als nina-ai.nl: Inter voor lopende tekst, Bricolage voor
 * kaarttitels, Fragment Mono voor labels en cijfers, Kalam voor de violette
 * handgeschreven noot, en Zodiak als display-letter (zelf gehost uit
 * Fontshare, licentie in public/fonts).
 */
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

const zodiak = localFont({
  src: [
    { path: "../../public/fonts/Zodiak-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Zodiak-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Het beste AI workshop aanbod van Nederland",
    template: "%s | NinA AI Workshops",
  },
  description:
    "Open AI-workshops op ons kantoor in Amsterdam. Kleine groepen, zelf aan de slag met je eigen werk. Bekijk de data en koop direct je ticket.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "NinA AI Workshops",
    title: "Het beste AI workshop aanbod van Nederland",
    description:
      "Open AI-workshops op ons kantoor in Amsterdam. Kleine groepen, zelf aan de slag. Bekijk de data en koop direct je ticket.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${bricolage.variable} ${fragmentMono.variable} ${kalam.variable} ${zodiak.variable} h-full antialiased`}
    >
      {/* Consent Mode v2 moet vóór het GTM-script staan: komt de default te
          laat, dan mogen tags in dat gaatje alsnog opslaan. Alles begint op
          denied tot de bezoeker kiest. */}
      <Script
        id="consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
      />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: gtmScript() }}
      />
      <body className="grain relative flex min-h-full flex-col bg-bg text-text">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Sentinel voor de header: zodra dit blokje uit beeld is, is er
            gescrold en mag de header zijn achtergrond aanzetten. Een
            IntersectionObserver in plaats van een scroll-listener. */}
        <div
          id="top-sentinel"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-8 w-px"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
