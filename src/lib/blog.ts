import posts from "@/content/blog.json";

export type BlogPost = {
  slug: string;
  title: string;
  titleEn: string | null;
  excerpt: string | null;
  excerptEn: string | null;
  metaDescription: string | null;
  metaDescriptionEn: string | null;
  date: string;
  readTime: string | null;
  author: string;
  authorTitle: string | null;
  authorTitleEn: string | null;
  category: string | null;
  categoryEn: string | null;
  featured: boolean;
  image: string | null;
  contentHtml: string;
  contentHtmlEn: string;
};

const MAANDEN: Record<string, number> = {
  januari: 0, februari: 1, maart: 2, april: 3, mei: 4, juni: 5,
  juli: 6, augustus: 7, september: 8, oktober: 9, november: 10, december: 11,
};

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "11 juni 2026" -> Date; onbekend formaat sorteert achteraan. */
export function parseDutchDate(date: string): Date {
  const m = date.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/i);
  if (!m || !(m[2].toLowerCase() in MAANDEN)) return new Date(0);
  return new Date(Number(m[3]), MAANDEN[m[2].toLowerCase()], Number(m[1]));
}

export function formatDateEn(date: string): string {
  const d = parseDutchDate(date);
  if (d.getTime() === 0) return date;
  return `${MONTHS_EN[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function getAllPosts(): BlogPost[] {
  return (posts as BlogPost[])
    .slice()
    .sort((a, b) => parseDutchDate(b.date).getTime() - parseDutchDate(a.date).getTime());
}

export function getPost(slug: string): BlogPost | undefined {
  return (posts as BlogPost[]).find((p) => p.slug === slug);
}

/**
 * Alleen posts met een Engelse tekst. Nieuwere posts uit de Substack-import
 * zijn nog niet vertaald; zonder deze filter zou de Engelse index ze met
 * Nederlandse titels tonen en op een 404 uitkomen, omdat de detailroute
 * alleen pagina's genereert voor posts met contentHtmlEn.
 */
export function getAllPostsEn(): BlogPost[] {
  return getAllPosts().filter((p) => p.contentHtmlEn && p.titleEn);
}

/** Lazy-loading op alle content-afbeeldingen behalve de eerste (vaak LCP). */
export function withLazyImages(html: string): string {
  let first = true;
  return html.replace(/<img /g, () => {
    if (first) {
      first = false;
      return '<img fetchpriority="high" decoding="async" ';
    }
    return '<img loading="lazy" decoding="async" ';
  });
}
