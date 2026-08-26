import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Wordt bij de export een statische robots.txt.
 *
 * /bedankt/ en /betaling-afgebroken/ staan al op noindex via hun metadata;
 * ze hier ook uitsluiten scheelt dat ze überhaupt gecrawld worden.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/bedankt/", "/betaling-afgebroken/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
