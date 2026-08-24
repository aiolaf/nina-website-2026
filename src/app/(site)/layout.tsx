import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgentSpoor from "@/components/ui/AgentSpoor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AgentSpoor />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
