import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/** Engelstalige site onder /en: eigen chrome met vertaalde navigatie. */
export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header lang="en" />
      <main className="flex-1">{children}</main>
      <Footer lang="en" />
    </>
  );
}
