import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { freebieCategories, freebies } from "@/content/freebies";
import type { Lang } from "@/lib/site";

const COPY = {
  nl: {
    kicker: "Gratis resources",
    sub: "Exclusieve frameworks, templates en tools om je AI-vaardigheden naar een hoger niveau te tillen.",
    bekijk: "Bekijk",
    base: "/freebies",
  },
  en: {
    kicker: "Free resources",
    sub: "Exclusive frameworks, templates and tools to take your AI skills to the next level.",
    bekijk: "View",
    base: "/en/freebies",
  },
};

/** Gedeeld freebies-overzicht voor de NL- en EN-route. */
export default function FreebiesIndex({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t.kicker}
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              <Em>Freebies</Em>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              {t.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {freebieCategories.map((cat) => (
                <span
                  key={cat.nl}
                  className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted"
                >
                  {cat[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {freebies.map((f, i) => (
              <Reveal key={f.slug} delay={Math.min(i % 3, 2) * 0.08}>
                <Link
                  href={`${t.base}/${f.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {f.image && (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={f.image}
                        alt={f.title[lang]}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {f.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                          {f.badge[lang]}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                      {f.category[lang]}
                    </p>
                    <h2 className="font-display mt-2 text-lg font-bold leading-snug">
                      {f.title[lang]}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {f.description[lang]}
                    </p>
                    <p className="mt-auto pt-5 text-sm font-semibold text-primary">
                      {t.bekijk} →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
