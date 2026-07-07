import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-alt">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div aria-hidden="true" className="footer-watermark" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">
            NinA<span className="text-primary"> AI</span> Agency
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Van AI-kennis naar een werkende AI-organisatie. Jullie vaste
            AI-partner.
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Verantwoorde AI. Transparant. Mens plus machine.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Diensten</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
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
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="transition-colors hover:text-primary"
              >
                {site.phone}
              </a>
            </li>
            <li>{site.address}</li>
            <li>KVK {site.kvk}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Volg ons</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <a
                href={site.linkedinOlaf}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                LinkedIn Olaf Lemmens
              </a>
            </li>
            <li>
              <a
                href={site.newsletter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                AI nieuwsbrief
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 border-t border-border py-5 text-center text-xs text-text-muted sm:flex-row sm:gap-6">
        <span>
          © {new Date().getFullYear()} NinA AI Agency. Alle rechten
          voorbehouden.
        </span>
        <a
          href="https://nina-ai.nl/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary"
        >
          Privacyverklaring
        </a>
      </div>
    </footer>
  );
}
