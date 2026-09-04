import Image from "next/image";
import Link from "next/link";
import Koopbalk from "@/components/layout/Koopbalk";
import BundelBand from "@/components/sections/BundelBand";
import LiveRij from "@/components/sections/LiveRij";
import Praktisch from "@/components/sections/Praktisch";
import Reviews from "@/components/sections/Reviews";
import Sfeer from "@/components/sections/Sfeer";
import Updates from "@/components/sections/Updates";
import TicketRij from "@/components/sections/TicketRij";
import Vragen from "@/components/sections/Vragen";
import WorkshopKaart from "@/components/sections/WorkshopKaart";
import LogoRij from "@/components/ui/LogoRij";
import PijlKnop from "@/components/ui/PijlKnop";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { korteDatum } from "@/lib/datum";
import { programma, programmaSleutel } from "@/lib/programma";
import { evenementenSchema, vragenSchema } from "@/lib/schema";
import { bewijs, euro, site } from "@/lib/site";
import { BUNDELS, koopbareTickets, WORKSHOPS } from "@/content/workshops";

/**
 * De homepage heeft één taak: de bezoeker bij een datum krijgen en die datum
 * laten kopen.
 *
 * Vandaar de volgorde. De agenda staat direct onder de hero, nog vóór de
 * uitleg over de workshops zelf. Wie hier komt met "ik wil een keer zo'n
 * workshop" hoeft dan niet eerst door drie secties overtuigingswerk heen.
 * Wie nog twijfelt scrolt door en vindt daar het aanbod, het bewijs en de
 * praktische zaken — en onderaan opnieuw de agenda.
 *
 * In die agenda staan de gratis LinkedIn Lives tussen de betaalde workshops,
 * op datum. Dat is bewust: het programma loopt van gratis online kennismaken
 * naar een middag op kantoor, en die volgorde is het aanbod.
 */
export default function Home() {
  const items = programma();
  const eerste = items[0];

  /* De koopbalk onderin op mobiel wijst naar de eerstvolgende datum die
     daadwerkelijk te koop staat. Is er niets te koop, dan wijst hij naar de
     agenda in plaats van naar een dode link. */
  const eersteKoopbaar = items.find(
    (item) => item.soort === "workshop" && koopbareTickets(item.sessie).length > 0
  );
  const balk =
    eersteKoopbaar?.soort === "workshop"
      ? {
          workshop: eersteKoopbaar.workshop,
          sessie: eersteKoopbaar.sessie,
          ticket:
            koopbareTickets(eersteKoopbaar.sessie).find((t) => t.uitgelicht) ??
            koopbareTickets(eersteKoopbaar.sessie)[0],
        }
      : null;

  /* De eerstvolgende gratis live, voor de regel onder de hero. Gratis en
     online is de laagste drempel die we hebben; die hoort boven de vouw. */
  const eersteLive = items.find((item) => item.soort === "live");

  return (
    <>
      {/* JSON-LD per datum, zodat Google de workshops als evenementen met
          prijs en plaats kan tonen in plaats van als losse pagina's. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(evenementenSchema(items)),
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
        {/* Merkteken voor de header: hierboven ligt een donkere foto, dus het
            woordmerk moet licht zijn zolang er niet gescrold is. De regel
            staat in globals.css. */}
        <div id="donkere-hero" hidden />
        <div className="foto foto-met-tekst relative min-h-[560px] w-full sm:min-h-[620px]">
          <Image
            src="/images/beeld/zaal-verkenners.webp"
            alt="Olaf Lemmens laat tijdens een sessie zien hoe hij een AI-contentmachine op eigen data heeft gebouwd"
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
                Het beste AI workshop aanbod van{" "}
                <em className="italic">Nederland</em>.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85">
                Losse tickets voor onze Claude- en AI-workshops op kantoor in
                Amsterdam. Kleine groepen, en je werkt de hele middag aan je
                eigen taken.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PijlKnop href="#agenda" variant="licht" data-cta="hero-agenda">
                  Bekijk het programma
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

              {/* De gratis live boven de vouw. Wie nog niets van ons kent
                  begint daar, en dat is precies de bedoeling. */}
              {eersteLive?.soort === "live" && (
                <p className="mt-6 text-sm text-white/70">
                  Eerst gratis kennismaken?{" "}
                  <a
                    href={eersteLive.live.aanmeldUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline-offset-4 hover:underline"
                  >
                    {eersteLive.live.naam}
                  </a>{" "}
                  op {korteDatum(eersteLive.live.datum)}, online en gratis.
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
              { cijfer: "15", label: "deelnemers per groep, maximaal" },
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
        kicker="Het programma"
        title={
          <>
            Kies een <Em>datum</Em>.
          </>
        }
        sub="Van een gratis online sessie tot een middag bouwen op kantoor. Je betaalt direct online en krijgt meteen je bevestiging en factuur."
        annotatie="maximaal 15 per workshop"
      >
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, i) => (
              <Reveal key={programmaSleutel(item)} delay={i * 0.05}>
                {item.soort === "live" ? (
                  <LiveRij live={item.live} plek="agenda" />
                ) : (
                  <TicketRij
                    workshop={item.workshop}
                    sessie={item.sessie}
                    plek="agenda"
                  />
                )}
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
                href="#updates"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
              >
                Hou me op de hoogte
              </a>
            </div>
          </Reveal>
        )}

        {/* Eerlijk zijn over wat er nog niet staat, en er meteen een
            aanmelding van maken. Anders komt iemand die in november wil
            één keer langs en nooit meer terug. */}
        <Reveal>
          <div className="kaart mt-4 flex flex-col gap-4 border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-bold">
                De rest van 2026 volgt
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                We plannen de data voor november en december binnenkort in.
                Laat weten waar je interesse in hebt, dan hoor je het als
                eerste.
              </p>
            </div>
            <a
              href="#updates"
              className="shrink-0 rounded-full border border-ink/15 px-6 py-3 text-sm transition-colors hover:border-ink/35"
            >
              Hou me op de hoogte
            </a>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-6 text-sm text-text-muted">
            Betalen gaat via Stripe met iDEAL, creditcard of Bancontact. Tot 14
            dagen vooraf kosteloos annuleren, daarna is je ticket
            overdraagbaar.
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          Aanmelden voor nieuwe data

          Direct onder de agenda, want daar ontstaat de teleurstelling: je
          scrolt de data door en er zit niets bij dat jou schikt. Dit is het
          vangnet voor precies die bezoeker.
          --------------------------------------------------------------- */}
      <section id="updates" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <Updates />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Bundel — de tweede workshop verkopen aan wie de eerste koopt
          --------------------------------------------------------------- */}
      {BUNDELS.length > 0 && (
        <section className="border-t border-border bg-bg-alt">
          <div className="mx-auto max-w-6xl space-y-5 px-5 py-16">
            {BUNDELS.map((b) => (
              <Reveal key={b.naam}>
                <BundelBand bundel={b} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Bewijs: wie hier eerder zat */}
      <section className="border-t border-border">
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
        kicker={`${WORKSHOPS.length} workshops`}
        title={
          <>
            Drie workshops, van <Em>beginner</Em> tot gevorderd.
          </>
        }
        sub="Ze bouwen op elkaar voort, maar je kunt ze ook los doen."
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
          Hoe een middag loopt
          --------------------------------------------------------------- */}
      <Section
        kicker="Zo loopt zo'n middag"
        variant="card"
        title={
          <>
            Je werkt de hele middag aan je <Em>eigen</Em> taak.
          </>
        }
        sub="Vooraf vragen we welke taak jou nu te veel tijd kost. Die neem je mee."
      >
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              titel: "Je komt binnen met een taak",
              tekst:
                "Vooraf vragen we welk werk je te veel tijd kost. Daar ga je die middag mee aan de slag.",
            },
            {
              titel: "We leggen kort uit hoe het werkt",
              tekst:
                "Kort: wat er onder de motorkap gebeurt, en waarom het soms misgaat.",
            },
            {
              titel: "Je bouwt het zelf",
              tekst:
                "Het grootste deel van de middag. Loop je vast, dan kijkt de trainer mee.",
            },
            {
              titel: "Je neemt het mee",
              tekst:
                "Je Skills, templates en een certificaat. Daarna de borrel.",
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

      {/* Sfeer: de vier stappen hierboven vertellen het, deze foto's laten
          het zien. Bewust direct erna en niet ergens onderaan. */}
      <Section
        kicker="Zo ziet het eruit"
        title={
          <>
            Zo ziet een workshop bij ons <Em>eruit</Em>.
          </>
        }
        sub="Foto's van onze eigen workshops en sessies."
        annotatie="eigen foto's"
      >
        <Reveal>
          <Sfeer />
        </Reveal>
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
              Tot slot
            </p>
            <h2 className="display-serif mx-auto mt-4 max-w-2xl text-[2.2rem] leading-tight sm:text-[3rem]">
              Welke datum <em className="italic">wordt het</em>?
            </h2>
            {eerste && (
              <p className="mt-5 text-[15px] text-white/70">
                Het programma begint op {korteDatum(eerste.datum)} met{" "}
                {eerste.soort === "live"
                  ? `${eerste.live.naam}, gratis en online`
                  : eerste.workshop.naam}
                .
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PijlKnop href="#agenda" variant="licht" data-cta="slot-agenda">
                Naar het programma
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

      {balk?.ticket ? (
        <Koopbalk
          titel={`${balk.workshop.naam} · ${korteDatum(balk.sessie.datum)}`}
          onder={`${euro(Math.round(balk.ticket.prijs / balk.ticket.personen))} p.p. excl. btw`}
          href={balk.ticket.stripeLink}
          knop="Koop ticket"
          meting={{
            workshop: balk.workshop.naam,
            datum: balk.sessie.datum,
            ticket: balk.ticket.naam,
            prijs: balk.ticket.prijs,
          }}
          verbergBij="#agenda"
        />
      ) : (
        <Koopbalk
          titel="Het najaarsprogramma"
          onder="Kies je datum en koop je ticket"
          href="#agenda"
          knop="Bekijk data"
          verbergBij="#agenda"
        />
      )}
    </>
  );
}
