import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { getAllPosts, getPost, withLazyImages } from "@/lib/blog";
import NieuwsbriefSticky from "@/components/sections/NieuwsbriefSticky";
import { alternatesVoor, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    alternates: alternatesVoor(`/blog/${post.slug}`),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-16 sm:pb-20">
          <header className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              {post.category ? ` · ${post.category}` : ""}
            </p>
            <h1 className="display-serif mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-text-muted">
              {post.author}
              {post.authorTitle ? `, ${post.authorTitle.replace("| ", "")}` : ""}
              {" · "}
              {post.date}
              {post.readTime ? ` · ${post.readTime} leestijd` : ""}
            </p>
          </header>

          <div
            className="article-prose mt-10"
            dangerouslySetInnerHTML={{ __html: withLazyImages(post.contentHtml) }}
          />

          {/* Nieuwsbrief: volledige kaart onder het artikel plus de
              meescrollende variant. Staat vóór de conversie-afsluiter, want
              wie net een artikel uit heeft is eerder in de nieuwsbrief
              geïnteresseerd dan in een kennismaking. */}
          <NieuwsbriefSticky />

          {/* Conversie-afsluiter, consistent met de rest van de site */}
          <aside className="mt-16 rounded-3xl border border-border bg-bg-card p-8 shadow-sm sm:p-10">
            <h2 className="display-serif text-2xl ">
              Zelf aan de slag met AI?
            </h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              Wij helpen organisaties van AI-kennis naar een werkende
              AI-organisatie: lezingen, workshops, automatiseringen en
              AI-agents.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={site.booking}>
                Plan een kennismaking
              </MagneticButton>
              <MagneticButton href="/blog" variant="ghost">
                Meer artikelen
              </MagneticButton>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              Liever direct schakelen?{" "}
              <a
                href={site.whatsappNl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Stuur een WhatsApp
              </a>
            </p>
          </aside>
        </div>
      </article>
    </>
  );
}
