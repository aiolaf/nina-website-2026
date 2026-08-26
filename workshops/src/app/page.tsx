import Image from "next/image";
import Link from "next/link";
import Koopbalk from "@/components/layout/Koopbalk";
import Praktisch from "@/components/sections/Praktisch";
import Reviews from "@/components/sections/Reviews";
import TicketRij from "@/components/sections/TicketRij";
import Vragen from "@/components/sections/Vragen";
import WorkshopKaart from "@/components/sections/WorkshopKaart";
import LogoRij from "@/components/ui/LogoRij";
import PijlKnop from "@/components/ui/PijlKnop";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { korteDatum } from "@/lib/datum";
import { bewijs, euro, site } from "@/lib/site";
import {
  agenda,
  koopbareTickets,
  WORKSHOPS,
  type AgendaItem,
} from "@/content/workshops";
import { evenementenSchema, vragenSchema } from "@/lib/schema";

/**
 * De homepage heeft één taak: de bezoeker bij een datum krijgen en die datum
 * laten kopen.
 *
 * Vandaar de volgorde. De agenda staat direct onder de hero, nog vóór de
 * uitleg over de workshops zelf. Wie hier komt met "ik wil een keer zo'n
 * workshop" hoeft dan niet eerst door drie secties overtuigingswerk heen.
 * Wie nog twijfelt scrolt door en vindt daar het aanbod, het bewijs en de
 * praktische zaken — en onderaan opnieuw de agenda.
 */
export default function Home() {
  const komend: AgendaItem[] = agenda();
  const eerste = komend[0];

  /* De koopbalk onderin op mobiel wijst naar de eerstvolgende datum die
     daadwerkelijk te koop staat. Is er niets te koop, dan wijst hij naar de
     agenda in plaats van naar een dode link. */
  const eersteKoopbaar = komend.find(
    (item) => koopbareTickets(item.sessie).length > 0
  );
  const balkTicket = eersteKoopbaar
    ? (koopbareTickets(eersteKoopbaar.sessie).find((t) => t.uitgelicht) ??
      koopbareTickets(eersteKoopbaar.sessie)[0])
    : null;

  return (
    <>
      {/* JSON-LD per datum, zodat Google de workshops als evenementen met
          prijs en plaats kan tonen in plaats van als losse pagina's. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(evenementenSchema(komend)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vragenSchema()) }}
      />

      {/* ---------------------------------------------------------------
          Hero
          --------------------------------------------------------------- */}
      <section className="relative">
        <div className="foto foto-met-tekst relative min-h-[560px] w-full sm:min-h-[620px]">
          <Image
            src="/images/beeld/sessie-staand.webp"
            alt="Deelnemers aan het werk tijdens een AI-workshop bij NinA AI"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="op-foto mx-auto flex min-h-[560px] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:min-h-[620px] sm:pb-16">
            <div className="reveal-now max-w-3xl">
              <p className="label-mono text-[11.5px] text-white/70">
                Open inschrijving · Amsterdam
              </p>
              <h1 className="display-serif mt-4 text-[2.6rem] leading-[1.03] text-white sm:text-[3.6rem] lg:text-[4.2rem]">
                Een dag bij ons aan tafel, en je{" "}
                <em className="italic">werkt anders</em> op maandag.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85">
                Losse tickets voor onze AI-workshops op kantoor in Amsterdam.
                Kleine groepen, je eigen werk als oefenmateriaal, en je gaat
                naar huis met iets dat draait.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PijlKnop href="#agenda" variant="licht" data-cta="hero-agenda">
                  Bekijk alle data
                </PijlKnop>
                <PijlKnop
                  href="#workshops"
                  variant="ghost-licht"
                  zonderPijl
                  data-cta="hero-aanbod"
                >
                  Welke past bij mij?
                </PijlKnop>
              </div>

              {eerste && (
                <p className="mt-6 text-sm text-white/70">
                  Eerstvolgend:{" "}
                  <span className="text-white">
                    {eerste.workshop.naam} op {korteDatum(eerste.sessie.datum)}
                  </span>
                  {eerste.sessie.vrij > 0 && eerste.sessie.vrij <= 4 && (
                    <>
                      {" "}
                      · nog {eerste.sessie.vrij}{" "}
                      {eerste.sessie.vrij === 1 ? "plek" : "plekken"}
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bewijsstrip direct onder de banner: de cijfers waarop iemand
            besluit dat dit geen willekeurige cursusaanbieder is. */}
        <div className="border-b border-border bg-bg-card">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-8 sm:grid-cols-4">
            {[
              { cijfer: bewijs.cijfer, label: "gemiddelde beoordeling" },
              { cijfer: bewijs.deelnemers, label: "deelnemers gingen je voor" },
              { cijfer: "14", label: "deelnemers per groep, maximaal" },
              { cijfer: "100%", label: "zelf doen, geen slidesessie" },
            ].map((s) => (
              <div key={s.label}>
                <p className="stempel text-3xl leading-none">{s.cijfer}</p>
                <p className="mt-2 text-xs leading-snug text-text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Agenda — hoog op de pagina, want dit is de kassa
          --------------------------------------------------------------- */}
      <Section
        id="agenda"
        kicker="De agenda"
        title={
          <>
            Kies een datum en <Em>hij is van jou</Em>.
          </>
        }
        sub="Alle open workshops die eraan komen. Je betaalt direct online en krijgt meteen je bevestiging en factuur."
        annotatie="vol is vol, echt waar"
      >
        {komend.length > 0 ? (
          <div className="space-y-4">
            {komend.map((item, i) => (
              <Reveal key={`${item.workshop.slug}-${item.sessie.datum}`} delay={i * 0.05}>
                <TicketRij
                  workshop={item.workshop}
                  sessie={item.sessie}
                  plek="agenda"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="kaart border border-border bg-bg-card p-8 text-center">
              <p className="font-display text-xl font-bold">
                De nieuwe data staan er bijna op.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                Laat je mailadres achter, dan krijg je bericht zodra de
                inschrijving opengaat.
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Laat het me weten bij nieuwe workshopdata")}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
              >
                Hou me op de hoogte
              </a>
            </div>
          </Reveal>
        )}

        <Reveal>
          <p className="mt-6 text-sm text-text-muted">
            Betalen gaat via Stripe met iDEAL, creditcard of Bancontact. Tot 14
            dagen vooraf kosteloos annuleren, daarna is je ticket
            overdraagbaar.
          </p>
        </Reveal>
      </Section>

      {/* Bewijs: wie hier eerder zat */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Reveal>
            <LogoRij label="Deelnemers kwamen onder andere van" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Het aanbod
          --------------------------------------------------------------- */}
      <Section
        id="workshops"
        kicker="Vier workshops"
        title={
          <>
            Van je eerste prompt tot een agent die <Em>zelf</Em> doorwerkt.
          </>
        }
        sub="Ze bouwen op elkaar voort, maar je hoeft ze niet op volgorde te doen. Kies waar je nu staat."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {WORKSHOPS.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.07}>
              <WorkshopKaart workshop={w} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Hoe een dag loopt
          --------------------------------------------------------------- */}
      <Section
        kicker="Zo loopt zo'n dag"
        variant="card"
        title={
          <>
            Geen zaal met slides, maar <Em>jouw werk</Em> op tafel.
          </>
        }
        sub="Iedereen komt binnen met een taak uit de eigen week. Daar werken we de hele dag aan, en daar gaat de dag ook over."
      >
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              titel: "Je komt binnen met een taak",
              tekst:
                "Vooraf vragen we welk werk je te lang kost. Dat is je oefenmateriaal.",
            },
            {
              titel: "We leggen kort uit hoe het werkt",
              tekst:
                "Genoeg theorie om te snappen waarom iets wel of niet lukt. Niet meer dan dat.",
            },
            {
              titel: "Je bouwt het zelf",
              tekst:
                "Met een trainer naast je die meekijkt zodra je vastloopt. Dat is het grootste deel van de dag.",
            },
            {
              titel: "Je neemt het mee",
              tekst:
                "Werkende prompts, workflows en bestanden. Plus een vragenuur twee weken later.",
            },
          ].map((s, i) => (
            <Reveal key={s.titel} delay={i * 0.06}>
              <div className="h-full border-t border-ink/20 pt-5">
                <p className="stempel text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  Stap {i + 1}
                </p>
                <h3 className="font-display mt-2 text-lg font-bold leading-snug">
                  {s.titel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {s.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Reviews />

      <Praktisch />

      {/* ---------------------------------------------------------------
          Met het hele team: de tweede, grotere conversie
          --------------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="kaart flex flex-col gap-6 border border-border bg-bg-card p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="label-mono text-[11px] text-text-muted">
                  Met vier of meer
                </p>
                <h2 className="display-serif mt-3 text-[1.9rem] leading-tight sm:text-[2.3rem]">
                  Liever een dag die helemaal over <em className="italic">jullie</em>{" "}
                  processen gaat?
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                  Vanaf vier deelnemers is een besloten sessie meestal
                  verstandiger. Dan plannen we hem wanneer het jullie uitkomt,
                  hier of bij jullie op kantoor, met jullie eigen werk als
                  materiaal.
                </p>
              </div>
              <div className="shrink-0">
                <PijlKnop
                  href={`${site.hoofdsite}/lezingen-workshops`}
                  data-cta="team-op-maat"
                >
                  Vraag een voorstel aan
                </PijlKnop>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Vragen />

      {/* ---------------------------------------------------------------
          Slot: terug naar de agenda
          --------------------------------------------------------------- */}
      <section className="border-t border-border bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <p className="label-mono text-[11.5px] text-white/60">
              Nog even terug
            </p>
            <h2 className="display-serif mx-auto mt-4 max-w-2xl text-[2.2rem] leading-tight sm:text-[3rem]">
              Er staat een stoel klaar. <em className="italic">Welke datum?</em>
            </h2>
            {eerste && (
              <p className="mt-5 text-[15px] text-white/70">
                De eerstvolgende is {eerste.workshop.naam} op{" "}
                {korteDatum(eerste.sessie.datum)}.
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PijlKnop href="#agenda" variant="licht" data-cta="slot-agenda">
                Naar de agenda
              </PijlKnop>
              <Link
                href="/#vragen"
                className="rounded-full border border-white/30 px-7 py-4 text-[15px] leading-none text-[#f2f2f2] transition-colors hover:border-white/60"
              >
                Eerst nog een vraag
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {balkTicket && eersteKoopbaar ? (
        <Koopbalk
          titel={`${eersteKoopbaar.workshop.naam} · ${korteDatum(eersteKoopbaar.sessie.datum)}`}
          onder={`${euro(Math.round(balkTicket.prijs / balkTicket.personen))} p.p. excl. btw`}
          href={balkTicket.stripeLink}
          knop="Koop ticket"
          meting={{
            workshop: eersteKoopbaar.workshop.naam,
            datum: eersteKoopbaar.sessie.datum,
            ticket: balkTicket.naam,
            prijs: balkTicket.prijs,
          }}
          verbergBij="#agenda"
        />
      ) : (
        <Koopbalk
          titel="Alle workshopdata"
          onder="Kies je datum en koop je ticket"
          href="#agenda"
          knop="Bekijk data"
          verbergBij="#agenda"
        />
      )}
    </>
  );
}
