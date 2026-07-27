import MinimalHeader from "@/components/layout/MinimalHeader";
import MinimalFooter from "@/components/layout/MinimalFooter";

/**
 * Chrome-arme layout voor betaalde-ads-landingspagina's: geen navigatie,
 * geen sitelinks. Elke uitgaande klik hier is een bezoeker die wegleekt
 * voor conversie. Zie src/components/layout/Minimal{Header,Footer}.tsx.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalHeader />
      <main className="flex-1">{children}</main>
      <MinimalFooter />
    </>
  );
}
