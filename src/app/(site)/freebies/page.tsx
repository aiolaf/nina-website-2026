import type { Metadata } from "next";
import FreebiesIndex from "@/components/sections/FreebiesIndex";

export const metadata: Metadata = {
  title: "Freebies",
  description:
    "Exclusieve frameworks, templates en tools om je AI-vaardigheden naar een hoger niveau te tillen. Gratis van NinA AI Agency.",
  alternates: { canonical: "/freebies" },
};

export default function FreebiesPage() {
  return <FreebiesIndex lang="nl" />;
}
