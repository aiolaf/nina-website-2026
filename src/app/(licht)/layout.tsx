import { Fragment_Mono, Instrument_Serif, Kalam } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Display-kop uit het huisstijldocument: groot, dun, ook cursief voor
 * nadruk in een hero-zin.
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Labels, chips, tabelkoppen en alle cijfers. */
const fragment = Fragment_Mono({
  variable: "--font-fragment",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/** Handschrift, uitsluitend voor korte annotaties in violet. */
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

/**
 * Zelfde chrome als de rest van de site, maar in de huisstijl "Licht".
 *
 * `thema-licht` overschrijft alleen de merk-tokens uit globals.css, dus
 * header, footer en alle Tailwind-utilities binnen deze groep verkleuren
 * mee zonder een tweede set componenten. De drie extra fonts worden hier
 * geladen en niet in de root-layout, zodat de rest van de site ze niet
 * hoeft te downloaden.
 *
 * Zet je later de hele site om, dan verhuizen de waarden van .thema-licht
 * naar @theme en kan deze wrapper eruit.
 */
export default function LichtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${instrument.variable} ${fragment.variable} ${kalam.variable} thema-licht flex min-h-full flex-1 flex-col bg-bg text-text`}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
