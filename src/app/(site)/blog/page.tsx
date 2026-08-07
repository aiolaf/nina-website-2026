import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Wekelijkse inzichten over AI, automatisering en de praktijk van AI-implementatie bij Nederlandse bedrijven. Door Olaf Lemmens, founder van NinA AI Agency.",
  alternates: alternatesVoor("/blog"),
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [nieuwste, ...rest] = posts;

  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Blog
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Elke week een <Em>eerlijk verhaal</Em> uit de AI-praktijk.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Geen hype, wel wat werkt: {posts.length} artikelen over AI-agents,
              automatisering en organisaties die AI echt laten renderen.
            </p>
          </div>
        </div>
      </section>

      {/* Uitgelicht: nieuwste artikel groot */}
      {nieuwste && (
        <section className="mx-auto max-w-6xl px-5 pb-16">
          {/* reveal-now (pure CSS) i.p.v. Reveal: geen JS-gate op het
              LCP-element boven de vouw. */}
          <div className="reveal-now [animation-delay:0.1s]">
            <Link
              href={`/blog/${nieuwste.slug}`}
              className="group grid items-stretch overflow-hidden rounded-3xl border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
            >
              {nieuwste.image && (
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px]">
                  <Image
                    src={nieuwste.image}
                    alt={nieuwste.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  Nieuwste artikel
                  {nieuwste.category ? ` · ${nieuwste.category}` : ""}
                </p>
                <h2 className="font-display mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {nieuwste.title}
                </h2>
                {nieuwste.excerpt && (
                  <p className="mt-4 leading-relaxed text-text-muted">
                    {nieuwste.excerpt}
                  </p>
                )}
                <p className="mt-6 text-sm text-text-muted">
                  {nieuwste.date}
                  {nieuwste.readTime ? ` · ${nieuwste.readTime} leestijd` : ""}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Alle artikelen */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i % 3, 2) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.image && (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.category && (
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                        {post.category}
                      </p>
                    )}
                    <h3 className="font-display mt-2 text-lg font-bold leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-auto pt-5 text-xs text-text-muted">
                      {post.date}
                      {post.readTime ? ` · ${post.readTime}` : ""}
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
