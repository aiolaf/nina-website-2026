import Link from "next/link";
import ConsentHeropenen from "@/components/layout/ConsentHeropenen";
import { locatie, site } from "@/lib/site";

/**
 * Sobere footer. De uitgaande links staan hier en nergens anders: wie tot
 * hier gescrold is zonder te kopen mag doorgestuurd worden naar de
 * hoofdsite, maar hogerop de pagina zou dat een lek zijn.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold leading-none tracking-tight">
              NinA AI
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Open AI-workshops op ons eigen kantoor in Amsterdam. Kleine
              groepen, zelf aan de slag.
            </p>
          </div>

          <div>
            <p className="label-mono mb-3 text-[11px] text-text-muted">
              Op deze site
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#workshops" className="hover:text-violet">
                  Alle workshops
                </Link>
              </li>
              <li>
                <Link href="/#agenda" className="hover:text-violet">
                  Data en tickets
                </Link>
              </li>
              <li>
                <Link href="/#updates" className="hover:text-violet">
                  Bericht bij nieuwe data
                </Link>
              </li>
              <li>
                <Link href="/#vragen" className="hover:text-violet">
                  Veelgestelde vragen
                </Link>
              </li>
              <li>
                <Link href="/voorwaarden" className="hover:text-violet">
                  Voorwaarden
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-violet">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono mb-3 text-[11px] text-text-muted">Waar</p>
            <address className="text-sm not-italic leading-relaxed text-text-muted">
              {locatie.naam}
              <br />
              {locatie.straat}
              <br />
              {locatie.postcode} {locatie.plaats}
            </address>
            <a
              href={locatie.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm underline-offset-4 hover:text-violet hover:underline"
            >
              Plan je route
            </a>
          </div>

          <div>
            <p className="label-mono mb-3 text-[11px] text-text-muted">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet"
                >
                  WhatsApp ons
                </a>
              </li>
              <li>
                <a
                  href={site.hoofdsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet"
                >
                  nina-ai.nl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.bedrijf} · KVK {site.kvk}
            {site.btw && ` · BTW ${site.btw}`}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Betalen verloopt beveiligd via Stripe</span>
            <ConsentHeropenen label="Cookievoorkeuren" />
          </div>
        </div>
      </div>
    </footer>
  );
}
