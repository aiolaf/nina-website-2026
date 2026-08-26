import type { NextConfig } from "next";

/**
 * workshops.nina-ai.nl draait op Hostnet: gewone webhosting met Apache, geen
 * Node.js. Daarom `output: "export"`: `next build` schrijft een map `out/`
 * met kant-en-klare HTML, CSS en JS die je via FTP naar de webroot kopieert.
 *
 * Gevolg voor wie hier verder bouwt: geen server-side code. Dus geen route
 * handlers die een request lezen, geen redirects of headers uit dit bestand,
 * geen server actions. Het betaalproces loopt daarom via Stripe Payment
 * Links (gehoste checkout, geen backend nodig). Zie STRIPE.md.
 */
const nextConfig: NextConfig = {
  output: "export",

  turbopack: {
    root: __dirname,
  },

  /**
   * Apache serveert een map het liefst via index.html. Met trailingSlash
   * wordt /workshop/ai-basis dus /workshop/ai-basis/index.html en werkt elke
   * URL zonder een enkele rewrite-regel in .htaccess.
   */
  trailingSlash: true,

  /**
   * De ingebouwde image-optimizer heeft een Node-server nodig. Op Hostnet is
   * die er niet, dus serveren we de bestanden zoals ze in public/ staan.
   * Lever beeld daarom aan als webp op maximaal ~1600px breed.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
