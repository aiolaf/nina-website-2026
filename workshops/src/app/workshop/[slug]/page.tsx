import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Koopbalk from "@/components/layout/Koopbalk";
import Reviews from "@/components/sections/Reviews";
import TicketBox from "@/components/sections/TicketBox";
import TicketRij from "@/components/sections/TicketRij";
import PijlKnop from "@/components/ui/PijlKnop";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { korteDatum } from "@/lib/datum";
import { evenementSchema } from "@/lib/schema";
import { euro, locatie, site } from "@/lib/site";
import {
  eerstvolgende,
  komendeSessies,
  koopbareTickets,
  vanafPrijs,
  workshopBySlug,
  WORKSHOPS,
  type Workshop,
} from "@/content/workshops";

/**
 * Eén pagina per workshop.
 *
 * De opbouw volgt de twijfels in de volgorde waarin ze opkomen: is dit voor
 * mij, wat ga ik precies doen, wie geeft het, wat moet ik meenemen, en pas
 * dan de datums. Naast die tekst staat op groot scherm de meescrollende
 * ticketbox, zodat het antwoord op "ja, deze" nooit meer dan één klik weg
 * is.
 */

export function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workshop = workshopBySlug(slug);
  if (!workshop) return {};

  const eerste = eerstvolgende(workshop);
  const vanaf = vanafPrijs(workshop);
  /* De datum en de prijs in de description: dat is waar iemand in een
     zoekresultaat op beslist of hij klikt. */
  const staart = [
    eerste ? `Eerstvolgende datum ${korteDatum(eerste.datum)}` : null,
    vanaf !== null ? `vanaf ${euro(vanaf)} p.p.` : null,
    "Amsterdam",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: `${workshop.naam} — ${workshop.ondertitel}`,
    description: `${workshop.kort} ${staart}.`,
    alternates: { canonical: `/workshop/${workshop.slug}/` },
    openGraph: {
      title: `${workshop.naam} | NinA AI Workshops`,
      description: workshop.kort,
      url: `/workshop/${workshop.slug}/`,
      images: [{ url: workshop.foto }],
    },
  };
}

export default async function WorkshopPagina({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = workshopBySlug(slug);
  if (!workshop) notFound();

  const sessies = komendeSessies(workshop);
  const eerste = sessies[0] ?? null;
  const vanaf = vanafPrijs(workshop);

  /* Voor de koopbalk onderin op mobiel: de eerste datum die echt te koop is. */
  const koopbaar = sessies.find((s) => koopbareTickets(s).length > 0) ?? null;
  const balkTicket = koopbaar
    ? (koopbareTickets(koopbaar).find((t) => t.uitgelicht) ??
      koopbareTickets(koopbaar)[0])
    : null;

  return (
    <>
      {sessies.map((sessie) => (
        <script
          key={sessie.datum}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(evenementSchema(workshop, sessie)),
          }}
        />
      ))}

      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pt-28">
          <div className="reveal-now">
            <Link
              href="/#workshops"
              className="label-mono text-[11px] text-text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              ← Alle workshops
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="chip chip-neutraal">{workshop.niveau}</span>
              <span className="chip chip-neutraal">{workshop.duur}</span>
              <span className="chip chip-neutraal">{locatie.plaats}</span>
              {vanaf !== null && (
                <span className="chip chip-neutraal">
                  vanaf {euro(vanaf)} p.p.
                </span>
              )}
            </div>

            <h1 className="display-serif mt-5 max-w-3xl text-[2.5rem] leading-[1.04] sm:text-[3.4rem]">
              {workshop.naam}
            </h1>
            <p className="mt-3 max-w-2xl text-xl italic text-text-muted">
              {workshop.ondertitel}
            </p>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed">
              {workshop.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PijlKnop href="#data" data-cta="detail-hero-data">
                {eerste
                  ? `Kies je datum — vanaf ${korteDatum(eerste.datum)}`
                  : "Bekijk de data"}
              </PijlKnop>
              <PijlKnop
                href="#programma"
                variant="ghost"
                zonderPijl
                data-cta="detail-hero-programma"
              >
                Wat doen we die dag?
              </PijlKnop>
            </div>
          </div>
        </div>

        <div className="foto mx-auto aspect-[21/9] w-full max-w-6xl px-0 sm:px-5">
          <Image
            src={workshop.foto}
            alt={workshop.fotoAlt}
            width={1400}
            height={600}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Inhoud plus de meescrollende ticketbox
          --------------------------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div className="min-w-0">
            {/* Voor wie */}
            <Reveal>
              <h2 className="display-serif text-[1.9rem] leading-tight sm:text-[2.2rem]">
                Voor wie dit <Em>bedoeld</Em> is
              </h2>
              <ul className="mt-6 space-y-3">
                {workshop.voorWie.map((v) => (
                  <li key={v} className="flex gap-3 text-[15px] leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                    />
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Wat je leert */}
            <Reveal>
              <h2 className="display-serif mt-14 text-[1.9rem] leading-tight sm:text-[2.2rem]">
                Wat je aan het eind van de dag <Em>kunt</Em>
              </h2>
              <ul className="mt-6 space-y-4">
                {workshop.leerdoelen.map((doel, i) => (
                  <li
                    key={doel}
                    className="flex gap-4 border-b border-border pb-4 text-[15px] leading-relaxed last:border-b-0"
                  >
                    <span className="stempel shrink-0 pt-0.5 text-sm text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {doel}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Programma */}
            <Reveal>
              <h2
                id="programma"
                className="display-serif mt-14 scroll-mt-24 text-[1.9rem] leading-tight sm:text-[2.2rem]"
              >
                Het <Em>programma</Em>
              </h2>
              <ol className="mt-6">
                {workshop.programma.map((blok) => (
                  <li
                    key={blok.tijd + blok.titel}
                    className="flex gap-5 border-l border-border pb-7 pl-5 last:pb-0 sm:gap-7"
                  >
                    <span className="stempel w-14 shrink-0 pt-0.5 text-sm text-text-muted">
                      {blok.tijd}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-snug">
                        {blok.titel}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">
                        {blok.tekst}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Meenemen en inbegrepen */}
            <Reveal>
              <div className="mt-14 grid gap-6 sm:grid-cols-2">
                <div className="kaart border border-border bg-bg-card p-6">
                  <h3 className="font-display text-lg font-bold">
                    Neem zelf mee
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {workshop.meenemen.map((m) => (
                      <li
                        key={m}
                        className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span aria-hidden="true" className="shrink-0 font-mono">
                          ·
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="kaart border border-border bg-bg-card p-6">
                  <h3 className="font-display text-lg font-bold">
                    Dat regelen wij
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {workshop.inbegrepen.map((m) => (
                      <li
                        key={m}
                        className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-mono text-violet"
                        >
                          ✓
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Trainer */}
            <Reveal>
              <div className="kaart mt-6 flex items-center gap-5 border border-border bg-bg-alt p-6">
                <div className="foto h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={workshop.trainer.foto}
                    alt={workshop.trainer.naam}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="label-mono text-[10.5px] text-text-muted">
                    Je trainer
                  </p>
                  <p className="font-display mt-1 text-lg font-bold">
                    {workshop.trainer.naam}
                  </p>
                  <p className="text-sm text-text-muted">
                    {workshop.trainer.rol}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* De box. Op mobiel staat hij gewoon in de stroom, onder de tekst;
              vanaf lg plakt hij mee tijdens het scrollen. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TicketBox workshop={workshop} />
          </aside>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          Alle data
          --------------------------------------------------------------- */}
      <Section
        id="data"
        kicker="Data en tickets"
        variant="alt"
        title={
          <>
            Wanneer kom je <Em>langs</Em>?
          </>
        }
        sub={`${workshop.naam} draait op ${locatie.straat} in ${locatie.plaats}. Je betaalt direct online en krijgt meteen je bevestiging en factuur.`}
      >
        {sessies.length > 0 ? (
          <div className="space-y-4">
            {sessies.map((sessie, i) => (
              <Reveal key={sessie.datum} delay={i * 0.05}>
                <TicketRij
                  workshop={workshop}
                  sessie={sessie}
                  plek="detail-lijst"
                  toonWorkshop={false}
                  opAlt
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="kaart border border-border bg-bg-card p-8 text-center">
              <p className="font-display text-xl font-bold">
                Nog geen datum gepland
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                We plannen deze workshop opnieuw zodra er genoeg aanmeldingen
                zijn. Laat weten dat je erbij wilt, dan hoor je het als eerste.
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Nieuwe data ${workshop.naam}`)}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
              >
                Hou me op de hoogte
              </a>
            </div>
          </Reveal>
        )}
      </Section>

      <Reviews workshop={workshop.slug} />

      <AndereWorkshops huidige={workshop} />

      {balkTicket && koopbaar ? (
        <Koopbalk
          titel={`${workshop.naam} · ${korteDatum(koopbaar.datum)}`}
          onder={`${euro(Math.round(balkTicket.prijs / balkTicket.personen))} p.p. excl. btw`}
          href={balkTicket.stripeLink}
          knop="Koop ticket"
          meting={{
            workshop: workshop.naam,
            datum: koopbaar.datum,
            ticket: balkTicket.naam,
            prijs: balkTicket.prijs,
          }}
          verbergBij="#data"
        />
      ) : (
        <Koopbalk
          titel={workshop.naam}
          onder="Bekijk de beschikbare data"
          href="#data"
          knop="Naar de data"
          verbergBij="#data"
        />
      )}
    </>
  );
}

/**
 * De andere drie workshops onderaan. Wie tot hier is gekomen en niet heeft
 * geklikt, koos waarschijnlijk het verkeerde niveau; dit is de goedkoopste
 * manier om die bezoeker alsnog bij de juiste datum te krijgen.
 */
function AndereWorkshops({ huidige }: { huidige: Workshop }) {
  const rest = WORKSHOPS.filter((w) => w.slug !== huidige.slug);
  if (rest.length === 0) return null;

  return (
    <Section
      kicker="Misschien past deze beter"
      title={
        <>
          De <Em>andere</Em> workshops
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {rest.map((w) => {
          const eerste = eerstvolgende(w);
          return (
            <Link
              key={w.slug}
              href={`/workshop/${w.slug}/`}
              className="kaart group flex flex-col border border-border bg-bg-card p-6 transition-shadow hover:shadow-[0_14px_40px_rgba(12,14,24,0.09)]"
            >
              <div className="flex flex-wrap gap-2">
                <span className="chip chip-neutraal">{w.niveau}</span>
                <span className="chip chip-neutraal">{w.duur}</span>
              </div>
              <h3 className="font-display mt-3 text-lg font-bold leading-snug">
                {w.naam}
              </h3>
              <p className="mt-1.5 text-sm italic text-text-muted">
                {w.ondertitel}
              </p>
              <p className="stempel mt-auto pt-5 text-sm text-text-muted">
                {eerste ? korteDatum(eerste.datum) : "nieuwe data volgen"} →
              </p>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
