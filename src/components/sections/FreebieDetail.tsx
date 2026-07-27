import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import FreebieBlocks from "@/components/sections/FreebieBlocks";
import type { Freebie } from "@/content/freebies";
import { site, type Lang } from "@/lib/site";

const COPY = {
  nl: {
    terug: "Freebies",
    base: "/freebies",
    ctaTitle: "Meer halen uit AI?",
    ctaSub:
      "Wij helpen organisaties van AI-kennis naar een werkende AI-organisatie: lezingen, workshops, automatiseringen en AI-agents.",
    ctaPrimary: "Plan een kennismaking",
    ctaPrimaryHref: site.booking,
    ctaSecondary: "Meer freebies",
    bel: "Of bel direct:",
  },
  en: {
    terug: "Freebies",
    base: "/en/freebies",
    ctaTitle: "Want more out of AI?",
    ctaSub:
      "We help organizations go from AI knowledge to a working AI organization: lectures, workshops, automations and AI agents.",
    ctaPrimary: "Book an intro call",
    ctaPrimaryHref: site.booking,
    ctaSecondary: "More freebies",
    bel: "Or call directly:",
  },
};

/** Gedeelde freebie-detailpagina voor de NL- en EN-route. */
export default function FreebieDetail({
  freebie,
  lang,
}: {
  freebie: Freebie;
  lang: Lang;
}) {
  const t = COPY[lang];

  return (
    <article className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-16 sm:pb-20">
        <header className="reveal-now">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Link href={t.base} className="hover:underline">
              {t.terug}
            </Link>
            {` · ${freebie.category[lang]}`}
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">
            {freebie.title[lang]}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            {freebie.description[lang]}
          </p>
          {freebie.downloadLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {freebie.downloadLinks.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  download={d.download}
                  {...(d.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
                >
                  {d.label[lang]} ↓
                </a>
              ))}
            </div>
          )}
        </header>

        {freebie.image && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src={freebie.image}
              alt={freebie.title[lang]}
              width={1200}
              height={675}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <FreebieBlocks freebie={freebie} lang={lang} />
        </div>

        <aside className="mt-16 rounded-3xl border border-border bg-bg-card p-8 shadow-sm sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {t.ctaTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-text-muted">{t.ctaSub}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={t.ctaPrimaryHref}>
              {t.ctaPrimary}
            </MagneticButton>
            <MagneticButton href={t.base} variant="ghost">
              {t.ctaSecondary}
            </MagneticButton>
          </div>
          <p className="mt-5 text-xs text-text-muted">
            {t.bel}{" "}
            <a href={site.phoneHref} className="text-primary hover:underline">
              {site.phone}
            </a>
          </p>
        </aside>
      </div>
    </article>
  );
}
