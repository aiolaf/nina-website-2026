import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Zelfde chrome als de gewone site, maar in het donkere thema. De class
 * `thema-donker` overschrijft alleen de merk-tokens uit globals.css, dus
 * header, footer en alle Tailwind-utilities binnen deze groep verkleuren
 * mee zonder dat er ergens een tweede set componenten nodig is.
 *
 * Zonder deze wrapper zou de vaste header met donkere inkt op een bijna
 * zwarte achtergrond staan en dus onleesbaar zijn.
 *
 * Wil je een pagina in deze groep alsnog in het ivory-thema, haal dan
 * `thema-donker` hieronder weg: de pagina zelf gebruikt uitsluitend tokens.
 */
export default function DonkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="thema-donker flex min-h-full flex-1 flex-col bg-bg text-text">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
