import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import Section, { Em } from "@/components/ui/Section";
import CtaSection from "@/components/sections/CtaSection";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: alternatesVoor("/n8n"),
  title: "n8n Experts",
  description:
    "Wij zijn de n8n experts van Nederland. Veilig gehost in Amsterdam, 7000+ integraties, jullie eigen n8n omgeving zonder lock-in.",
};

const REDENEN = [
  {
    titel: "Prijstechnisch voordelig",
    tekst:
      "n8n is als open source alternatief voor Zapier zeer aantrekkelijk geprijsd. Je betaalt niet per taak of per gebruiker, dus opschalen kost niets extra.",
  },
  {
    titel: "Veilig gehost in Amsterdam",
    tekst:
      "Onze servers staan in Amsterdam. Je data blijft altijd in Nederland, volledig GDPR-compliant. Optioneel Azure OpenAI voor extra waarborgen.",
  },
  {
    titel: "Jullie eigen n8n omgeving",
    tekst:
      "Een eigen omgeving die van jullie blijft. Geen lock-in: na afloop kun je zelfstandig verder bouwen.",
  },
  {
    titel: "Flexibel en modulair",
    tekst:
      "Workflows zijn modulair en het taalmodel is verwisselbaar. Nieuwe modellen of tools pluggen we in zonder alles opnieuw te bouwen.",
  },
];

const TOOLS = [
  "Gmail",
  "Outlook",
  "Google Drive",
  "SharePoint",
  "Slack",
  "Teams",
  "WhatsApp",
  "HubSpot",
  "Salesforce",
  "Exact",
  "AFAS",
  "Notion",
  "Jira",
  "Stripe",
  "Mailchimp",
  "Airtable",
];

export default function N8n() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-24">
          <div className="reveal-now">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              n8n AI Automations
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Wij zijn de <Em>n8n experts</Em> van Nederland.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              n8n is een open-source low-code platform voor het bouwen van
              automatiseringen: de veiligste en meest complete manier om je
              bedrijfsprocessen te automatiseren. Als n8n specialist bieden
              wij complete n8n diensten, van setup tot beheer.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>Plan een kennismaking</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-bg-alt py-14">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-4xl font-bold text-primary sm:text-5xl">
            <CountUp to={7000} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-text-muted">
            directe tool-integraties mogelijk
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {TOOLS.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted transition-colors hover:border-primary/50 hover:text-text"
              >
                {t}
              </li>
            ))}
            <li className="rounded-full border border-primary/50 bg-bg-muted px-4 py-1.5 text-sm text-primary">
              en 6.900+ meer
            </li>
          </ul>
        </div>
      </section>

      <Section
        kicker="Waarom wij met n8n werken"
        title={
          <>
            Koppel AI aan je <Em>bestaande stack</Em>.
          </>
        }
      >
        <div className="grid gap-x-14 sm:grid-cols-2">
          {REDENEN.map((r, idx) => (
            <Reveal key={r.titel} delay={idx * 0.08}>
              <div className="border-t border-border py-6">
                <h3 className="font-display text-lg font-bold">{r.titel}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  {r.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        variant="alt"
        title={
          <>
            Human in the loop, <Em>ook in n8n</Em>.
          </>
        }
        sub="Wij onderscheiden ons door het voortraject: eerst het proces begrijpen, dan pas bouwen. Elke workflow krijgt controlemomenten waar menselijke beoordeling hoort. Zo automatiseer je zonder de grip te verliezen."
      />

      <CtaSection
        title="Klaar om je workflows te verbinden?"
        sub="Plan een kennismaking en zie welke van je processen zich direct laten automatiseren."
      />
    </>
  );
}
