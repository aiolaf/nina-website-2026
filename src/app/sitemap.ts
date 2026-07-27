import type { MetadataRoute } from "next";
import { getAllPosts, parseDutchDate } from "@/lib/blog";
import { freebies } from "@/content/freebies";
import { vacatures } from "@/content/vacatures";

const BASE = "https://nina-ai.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/ai-partnership",
    "/lezingen-workshops",
    "/ai-agents",
    "/ai-build",
    "/n8n",
    "/over-nina",
    "/contact",
    "/blog",
    "/freebies",
    "/cases",
    "/vacatures",
    "/workshops",
    "/ai-kennis",
    "/privacy",
    "/promoties/ai-pokemon-kaarten-chatgpt",
    "/en",
    "/en/ai-partnership",
    "/en/ai-agents",
    "/en/ai-build",
    "/en/n8n",
    "/en/about-nina",
    "/en/contact",
    "/en/blog",
    "/en/freebies",
    "/en/cases",
    "/en/careers",
    "/en/workshops",
    "/en/ai-knowledge",
    "/en/privacy",
  ];

  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.flatMap((p) => {
    const lastModified = parseDutchDate(p.date);
    const entries: MetadataRoute.Sitemap = [
      { url: `${BASE}/blog/${p.slug}`, lastModified },
    ];
    if (p.contentHtmlEn) {
      entries.push({ url: `${BASE}/en/blog/${p.slug}`, lastModified });
    }
    return entries;
  });

  const freebieEntries: MetadataRoute.Sitemap = freebies.flatMap((f) => [
    { url: `${BASE}/freebies/${f.slug}` },
    { url: `${BASE}/en/freebies/${f.slug}` },
  ]);

  const vacatureEntries: MetadataRoute.Sitemap = vacatures.flatMap((v) => [
    { url: `${BASE}/vacatures/${v.slug}` },
    { url: `${BASE}/en/careers/${v.slugEn}` },
  ]);

  return [
    ...staticPaths.map((path) => ({ url: `${BASE}${path}` })),
    ...blogEntries,
    ...freebieEntries,
    ...vacatureEntries,
  ];
}
