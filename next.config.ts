import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Zonder expliciete root kiest Turbopack door een tweede lockfile in de
  // home-map soms ~ als workspace-root en scant dan de hele home-directory.
  turbopack: {
    root: __dirname,
  },

  /**
   * URL's van de oude site die verdwenen zijn. permanent: true geeft een 308,
   * wat Google als een 301 behandelt: de oude URL verdwijnt uit de index en
   * de opgebouwde linkwaarde gaat mee naar de nieuwe pagina. Met een
   * tijdelijke redirect (307) blijft de oude URL geïndexeerd staan.
   *
   * Dit gaat vóór het bestandssysteem, dus er is geen pagina voor nodig.
   */
  async redirects() {
    return [
      {
        source: "/ai-lezing-kennissessie",
        destination: "/lezingen-workshops",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
