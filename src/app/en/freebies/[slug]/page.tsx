import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FreebieDetail from "@/components/sections/FreebieDetail";
import { freebies, getFreebie } from "@/content/freebies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return freebies.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const freebie = getFreebie(slug);
  if (!freebie) return {};
  return {
    title: freebie.title.en,
    description: freebie.description.en,
    alternates: { canonical: `/en/freebies/${freebie.slug}` },
    openGraph: {
      title: freebie.title.en,
      description: freebie.description.en,
      images: freebie.image ? [{ url: freebie.image }] : undefined,
    },
  };
}

export default async function FreebiePageEn({ params }: Props) {
  const { slug } = await params;
  const freebie = getFreebie(slug);
  if (!freebie) notFound();
  return <FreebieDetail freebie={freebie} lang="en" />;
}
