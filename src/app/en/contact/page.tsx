import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 15-minute intro call, or come have coffee at our office in Amsterdam.",
  alternates: alternatesVoor("/en/contact"),
};

const OPTIONS = [
  {
    title: "Book an intro call",
    text: "A free 15-minute conversation. Reply within 24 hours.",
    actionLabel: "Email us directly",
    actionHref: `mailto:${site.email}`,
  },
  {
    title: "Call or WhatsApp",
    text: "Prefer direct contact? Call or send a WhatsApp message.",
    actionLabel: site.phone,
    actionHref: site.phoneHref,
  },
  {
    title: "Come have coffee",
    text: `Our office: ${site.address}.`,
    actionLabel: "Directions via Maps",
    actionHref: `https://maps.google.com/?q=${encodeURIComponent(site.address)}`,
  },
];

export default function ContactEn() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 sm:pb-28">
          <div className="reveal-now">
            <h1 className="display-serif max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
              Let&apos;s <Em>connect</Em>.
            </h1>
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              we reply within 24 hours
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              Book a free 15-minute intro call. We&apos;re happy to think
              along, even if it&apos;s not a project yet.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OPTIONS.map((o, idx) => (
              <Reveal key={o.title} delay={idx * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-primary/50">
                  <h2 className="display-serif text-lg ">{o.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {o.text}
                  </p>
                  <MagneticButton
                    href={o.actionHref}
                    variant={idx === 0 ? "primary" : "ghost"}
                    className="mt-6 w-full"
                  >
                    {o.actionLabel}
                  </MagneticButton>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-2xl border border-border bg-bg-alt p-7 text-sm text-text-muted">
              <p className="font-semibold text-text">NinA AI Agency</p>
              <p className="mt-2">{site.address}</p>
              <p>Chamber of Commerce (KVK) {site.kvk}</p>
              <p className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>{" "}
                ·{" "}
                <a
                  href={site.phoneHref}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
