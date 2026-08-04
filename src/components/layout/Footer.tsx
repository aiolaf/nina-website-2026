import Link from "next/link";
import ConsentHeropenen from "@/components/layout/ConsentHeropenen";
import { footerNav, site, type Lang } from "@/lib/site";

const COPY = {
  nl: {
    tagline1: "Van AI-kennis naar een werkende AI-organisatie. Jullie vaste AI-partner.",
    tagline2: "Verantwoorde AI. Transparant. Mens plus machine.",
    diensten: "Diensten",
    content: "Content",
    bedrijf: "Bedrijf",
    contact: "Contact",
    volgOns: "Volg ons",
    linkedin: "LinkedIn Olaf Lemmens",
    nieuwsbrief: "AI nieuwsbrief",
    rechten: "Alle rechten voorbehouden.",
  },
  en: {
    tagline1: "From AI knowledge to a working AI organization. Your dedicated AI partner.",
    tagline2: "Responsible AI. Transparent. Human plus machine.",
    diensten: "Services",
    content: "Content",
    bedrijf: "Company",
    contact: "Contact",
    volgOns: "Follow us",
    linkedin: "LinkedIn Olaf Lemmens",
    nieuwsbrief: "AI newsletter",
    rechten: "All rights reserved.",
  },
};

export default function Footer({ lang = "nl" }: { lang?: Lang }) {
  const t = COPY[lang];
  const cols = footerNav[lang];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-alt">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div aria-hidden="true" className="footer-watermark" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-bold">
            NinA<span className="text-primary"> AI</span> Agency
          </p>
          <p className="mt-3 text-sm text-text-muted">{t.tagline1}</p>
          <p className="mt-3 text-sm text-text-muted">{t.tagline2}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">{t.diensten}</p>
          <ul className="mt-3 space-y-2">
            {cols.diensten.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">{t.content}</p>
          <ul className="mt-3 space-y-2">
            {cols.content.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold">{t.bedrijf}</p>
          <ul className="mt-3 space-y-2">
            {cols.bedrijf.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">{t.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </li>
            {/* WhatsApp in plaats van het nummer: de footer zit in de HTML van
                elke pagina, dus een nummer als platte tekst hier maakt het
                sitebreed oogstbaar voor scrapers. Het echte nummer staat nog
                op de contactpagina. */}
            <li>
              <a
                href={lang === "en" ? site.whatsappEn : site.whatsappNl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {lang === "en" ? "WhatsApp us" : "Stuur een WhatsApp"}
              </a>
            </li>
            <li>{site.address}</li>
            <li>KVK {site.kvk}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">{t.volgOns}</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <a
                href={site.linkedinOlaf}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t.linkedin}
              </a>
            </li>
            <li>
              <a
                href={site.newsletter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t.nieuwsbrief}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 border-t border-border py-5 text-center text-xs text-text-muted sm:flex-row sm:gap-6">
        <span>
          © {new Date().getFullYear()} NinA AI Agency. {t.rechten}
        </span>
        <Link
          href={lang === "en" ? "/en/privacy" : "/privacy"}
          className="transition-colors hover:text-primary"
        >
          {lang === "en" ? "Privacy policy" : "Privacyverklaring"}
        </Link>
        <ConsentHeropenen
          label={lang === "en" ? "Cookie preferences" : "Cookievoorkeuren"}
        />
      </div>
    </footer>
  );
}
