import type { Metadata } from "next";
import FreebiesIndex from "@/components/sections/FreebiesIndex";

export const metadata: Metadata = {
  title: "Freebies",
  description:
    "Exclusive frameworks, templates and tools to take your AI skills to the next level. Free from NinA AI Agency.",
  alternates: { canonical: "/en/freebies" },
};

export default function FreebiesPageEn() {
  return <FreebiesIndex lang="en" />;
}
