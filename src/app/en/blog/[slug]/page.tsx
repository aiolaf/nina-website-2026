import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { formatDateEn, getAllPosts, getPost, withLazyImages } from "@/lib/blog";
import { alternatesVoor, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts()
    .filter((p) => p.contentHtmlEn)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.titleEn ?? post.title,
    description: post.metaDescriptionEn ?? post.excerptEn ?? undefined,
    alternates: alternatesVoor(`/en/blog/${post.slug}`),
    openGraph: {
      type: "article",
      title: post.titleEn ?? post.title,
      description: post.metaDescriptionEn ?? post.excerptEn ?? undefined,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.contentHtmlEn) notFound();

  return (
    <article className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-16 sm:pb-20">
        <header className="reveal-now">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Link href="/en/blog" className="hover:underline">
              Blog
            </Link>
            {post.categoryEn ? ` · ${post.categoryEn}` : ""}
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {post.titleEn ?? post.title}
          </h1>
          <p className="mt-5 text-sm text-text-muted">
            {post.author}
            {post.authorTitleEn
              ? `, ${post.authorTitleEn.replace("| ", "")}`
              : ""}
            {" · "}
            {formatDateEn(post.date)}
            {post.readTime ? ` · ${post.readTime} read` : ""}
          </p>
        </header>

        <div
          className="article-prose mt-10"
          dangerouslySetInnerHTML={{
            __html: withLazyImages(post.contentHtmlEn),
          }}
        />

        <aside className="mt-16 rounded-3xl border border-border bg-bg-card p-8 shadow-sm sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Ready to put AI to work?
          </h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            We help organizations go from AI knowledge to a working AI
            organization: lectures, workshops, automations and AI agents.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={site.booking}>
              Book an intro call
            </MagneticButton>
            <MagneticButton href="/en/blog" variant="ghost">
              More articles
            </MagneticButton>
          </div>
          <p className="mt-5 text-xs text-text-muted">
            Rather talk right away?{" "}
            <a
              href={site.whatsappEn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Send a WhatsApp
            </a>
          </p>
        </aside>
      </div>
    </article>
  );
}
