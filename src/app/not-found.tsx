import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/Section";

/**
 * Ligt buiten de (site)/(landing) routegroepen (Next.js resolvet een
 * onbekend pad naar de root not-found), dus Header/Footer worden hier
 * direct gerenderd in plaats van via een layout geërfd.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative flex min-h-[70svh] items-center overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-6xl px-5 py-24">
            <p className="font-mono text-sm font-semibold text-primary">404</p>
            <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Deze pagina bestaat niet <Em>(meer)</Em>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              Zelfs onze agents konden hem niet vinden. Terug naar de
              homepage, of stel je vraag direct.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/">Naar de homepage</MagneticButton>
              <MagneticButton href="/contact" variant="ghost">
                Plan een kennismaking
              </MagneticButton>
            </div>
            <p className="mt-8 text-sm text-text-muted">
              Zocht je iets specifieks? Bekijk{" "}
              <Link
                href="/lezingen-workshops"
                className="text-primary underline-offset-4 hover:underline"
              >
                lezingen en workshops
              </Link>{" "}
              of het{" "}
              <Link
                href="/ai-partnership"
                className="text-primary underline-offset-4 hover:underline"
              >
                AI Partnership
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
