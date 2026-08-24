import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { formatDateEn, getAllPostsEn } from "@/lib/blog";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Weekly insights on AI, automation and the practice of AI implementation at Dutch companies. By Olaf Lemmens, founder of NinA AI Agency.",
  alternates: alternatesVoor("/en/blog"),
};

export default function BlogPageEn() {
  const posts = getAllPostsEn();
  const [latest, ...rest] = posts;

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
              Blog
            </p>
            <h1 className="display-serif mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              An <Em>honest story</Em> from AI practice, every week.
            </h1>
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              a new one every week
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              No hype, just what works: {posts.length} articles on AI agents,
              automation and organizations that make AI actually pay off.
            </p>
          </div>
        </div>
      </section>

      {latest && (
        <section className="mx-auto max-w-6xl px-5 pb-16">
          {/* reveal-now (pure CSS) i.p.v. Reveal: geen JS-gate op het
              LCP-element boven de vouw. */}
          <div className="reveal-now [animation-delay:0.1s]">
            <Link
              href={`/en/blog/${latest.slug}`}
              className="group grid items-stretch overflow-hidden rounded-[3px] border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
            >
              {latest.image && (
                <div className="foto relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px]">
                  <Image
                    src={latest.image}
                    alt={latest.titleEn ?? latest.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  Latest article
                  {latest.categoryEn ? ` · ${latest.categoryEn}` : ""}
                </p>
                <h2 className="display-serif mt-3 text-2xl leading-tight sm:text-3xl">
                  {latest.titleEn ?? latest.title}
                </h2>
                {(latest.excerptEn ?? latest.excerpt) && (
                  <p className="mt-4 leading-relaxed text-text-muted">
                    {latest.excerptEn ?? latest.excerpt}
                  </p>
                )}
                <p className="mt-6 text-sm text-text-muted">
                  {formatDateEn(latest.date)}
                  {latest.readTime ? ` · ${latest.readTime} read` : ""}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i % 3, 2) * 0.08}>
                <Link
                  href={`/en/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.image && (
                    <div className="foto relative aspect-[16/9]">
                      <Image
                        src={post.image}
                        alt={post.titleEn ?? post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.categoryEn && (
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                        {post.categoryEn}
                      </p>
                    )}
                    <h3 className="font-display mt-2 text-lg font-bold leading-snug">
                      {post.titleEn ?? post.title}
                    </h3>
                    {(post.excerptEn ?? post.excerpt) && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                        {post.excerptEn ?? post.excerpt}
                      </p>
                    )}
                    <p className="mt-auto pt-5 text-xs text-text-muted">
                      {formatDateEn(post.date)}
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
