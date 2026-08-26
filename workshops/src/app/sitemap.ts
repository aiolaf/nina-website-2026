import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { WORKSHOPS } from "@/content/workshops";

/**
 * Bij `output: "export"` schrijft Next dit bestand weg als een statische
 * sitemap.xml in `out/`. De bedank- en afgebroken-pagina staan er bewust
 * niet in: die zijn op noindex gezet.
 *
 * De datum in `lastModified` is de bouwdatum. Dat klopt hier: elke wijziging
 * aan een workshop of een datum betekent een nieuwe build en een nieuwe
 * upload.
 */
/* Bij een statische export moet expliciet vaststaan dat deze route bij het
   bouwen wordt vastgelegd; zonder deze regel weigert next build. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const nu = new Date();

  return [
    { url: `${site.url}/`, lastModified: nu, priority: 1 },
    ...WORKSHOPS.map((w) => ({
      url: `${site.url}/workshop/${w.slug}/`,
      lastModified: nu,
      priority: 0.9,
    })),
    { url: `${site.url}/voorwaarden/`, lastModified: nu, priority: 0.3 },
    { url: `${site.url}/privacy/`, lastModified: nu, priority: 0.3 },
  ];
}
