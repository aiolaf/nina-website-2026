import ConsentHeropenen from "@/components/layout/ConsentHeropenen";
import { site } from "@/lib/site";

/**
 * Chrome-arme footer voor ads-landingspagina's: alleen wettelijk verplichte
 * en vertrouwenwekkende info (bedrijfsnaam, adres, KVK, privacy). Geen
 * sitelinks, geen nieuwsbrief, geen social: niets dat wegleidt van de
 * conversie op deze pagina.
 */
export default function MinimalFooter() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-8 text-center text-xs text-text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>
          {site.name} · {site.address} · KVK {site.kvk}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-primary"
          >
            {site.email}
          </a>
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            Privacyverklaring
          </a>
          {/* Ook hier: een cookiekeuze moet herroepbaar zijn, ook op een
              pagina die verder bewust geen uitgaande links heeft. */}
          <ConsentHeropenen label="Cookievoorkeuren" />
        </div>
      </div>
    </footer>
  );
}
