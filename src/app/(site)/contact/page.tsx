import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: alternatesVoor("/contact"),
  title: "Contact",
  description:
    "Plan een vrijblijvend kennismakingsgesprek van 15 minuten, of kom koffie drinken bij ons op kantoor in Amsterdam.",
};

const OPTIES = [
  {
    titel: "Plan een kennismaking",
    tekst:
      "Een vrijblijvend gesprek van 15 minuten. Binnen 24 uur een reactie.",
    actieLabel: "Mail direct",
    actieHref: `mailto:${site.email}`,
  },
  {
    titel: "Bel of app",
    tekst: "Liever direct contact? Bel of stuur een WhatsApp-bericht.",
    actieLabel: site.phone,
    actieHref: site.phoneHref,
  },
  {
    titel: "Kom koffie drinken",
    tekst: `Ons kantoor: ${site.address}.`,
    actieLabel: "Route via Maps",
    actieHref: `https://maps.google.com/?q=${encodeURIComponent(site.address)}`,
  },
];

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 sm:pb-28">
          <div className="reveal-now">
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Laten we <Em>kennismaken</Em>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              Plan een vrijblijvend kennismakingsgesprek van 15 minuten. We
              denken graag mee, ook als het nog geen project is.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OPTIES.map((o, idx) => (
              <Reveal key={o.titel} delay={idx * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-primary/50">
                  <h2 className="font-display text-lg font-bold">{o.titel}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {o.tekst}
                  </p>
                  <MagneticButton
                    href={o.actieHref}
                    variant={idx === 0 ? "primary" : "ghost"}
                    className="mt-6 w-full"
                  >
                    {o.actieLabel}
                  </MagneticButton>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-2xl border border-border bg-bg-alt p-7 text-sm text-text-muted">
              <p className="font-semibold text-text">NinA AI Agency</p>
              <p className="mt-2">{site.address}</p>
              <p>KVK {site.kvk}</p>
              <p className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>{" "}
                ·{" "}
                <a
                  href={site.phoneHref}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
