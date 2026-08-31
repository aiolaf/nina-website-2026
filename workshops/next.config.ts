import type { NextConfig } from "next";

/**
 * workshops.nina-ai.nl staat op Cloudflare Pages als statische site. Daarom
 * `output: "export"`: `next build` schrijft een map `out/` met kant-en-klare
 * HTML, CSS en JS, en Pages publiceert die map.
 *
 * Gevolg voor wie hier verder bouwt: geen server-side code. Dus geen route
 * handlers die een request lezen, geen redirects of headers uit dit bestand,
 * geen server actions. Het betaalproces loopt daarom via Stripe Payment
 * Links (gehoste checkout, geen backend nodig). Zie STRIPE.md.
 *
 * Headers en omleidingen regel je in public/_headers en public/_redirects.
 * Zie DEPLOY-CLOUDFLARE.md.
 */
const nextConfig: NextConfig = {
  output: "export",

  turbopack: {
    root: __dirname,
  },

  /**
   * Met trailingSlash wordt /workshop/ai-basis geëxporteerd als
   * /workshop/ai-basis/index.html. Elke URL is dan een echte map met een
   * index erin, en werkt zonder een enkele rewrite-regel.
   */
  trailingSlash: true,

  /**
   * De ingebouwde image-optimizer heeft een Node-server nodig, en die is er
   * bij een statische export niet. We serveren de bestanden dus zoals ze in
   * public/ staan. Lever beeld aan als webp op maximaal ~1600px breed.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
