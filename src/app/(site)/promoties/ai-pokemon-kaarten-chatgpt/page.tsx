import type { Metadata } from "next";
import Image from "next/image";
import { Em } from "@/components/ui/Section";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Pokemon kaart maken met ChatGPT",
  description:
    "Genereer je eigen custom Pokemon kaart in ChatGPT: stap-voor-stap instructies, twee kant-en-klare prompts en voorbeeldresultaten.",
  alternates: alternatesVoor("/promoties/ai-pokemon-kaarten-chatgpt"),
};

const prompt1 = `Create image Generate a Pokémon-style trading card of [Character Name]: vertical close-up held between thumb and finger, classic 1999 gold holo-foil frame; three-quarter portrait lit by a rim light that matches the character's signature colors, against a backdrop of subtle icons or elements tied to their story or abilities; auto-assign HP [number], element icon [element type], one concise red-label ability, and one attack (damage scaled to fit the HP), plus weakness x2, resistance, and retreat cost; render card and fingers tack-sharp, background softly blurred, with studio lighting sparkling on the foil.`;

const prompt2 = `Photorealistic close-up of a rare holographic Pokémon-style trading card held at a slight angle, only part of thumb visible. Title: '[FULL NAME], [ELEMENT TYPE] icon.' Card shows semi-realistic caricature of the person utilizing their powers aggressively, illustrated in Pokémon card style. Caricature is holding a [OBJECT] in one hand with branding '[BRAND NAME]' on the surface. Holofoil surface shimmers in rainbow and gold. Background is warm, cinematic, softly blurred. Slight analog film grain. Card includes fitting Pokémon-style text, layout, abilities and stats themed around the person. Include their unique moves and a short description of their personality or mission at the bottom of the card.`;

/**
 * Div-elementen in plaats van p's: .article-prose p zou de marges van
 * utility-klassen hier anders overschrijven (hogere specificiteit).
 */
function PromptBlock({ text }: { text: string }) {
  return (
    <div className="my-6 rounded-[3px] border border-border bg-bg-card p-5 sm:p-6">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
        Prompt
      </div>
      <div className="mt-3 font-mono text-sm leading-relaxed text-text-muted">
        {text}
      </div>
    </div>
  );
}

export default function PokemonKaartenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Gratis Promotie
            </p>
            <h1 className="display-serif mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              Custom Pokemon kaart <Em>afbeelding generatie</Em> in ChatGPT.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Hieronder vind je de instructies om je eigen custom Pokemon
              kaart te genereren in ChatGPT.
            </p>
          </div>
        </div>
      </section>

      {/* Stappen */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <article className="article-prose">
            <h2 className="display-serif">1. Ga naar ChatGPT</h2>
            <p>
              Open{" "}
              <a
                href="https://chat.openai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                chat.openai.com
              </a>
              .
            </p>

            <h2 className="display-serif">2. Kies &ldquo;/maak een afbeelding&rdquo;</h2>

            <h2 className="display-serif">3. Voeg een foto toe</h2>
            <p>
              Voeg een foto toe die je in de Pokemon kaart wilt verwerken van
              de persoon of het karakter.
            </p>
            <p>
              <strong>💡 Tip:</strong> gebruik een van onderstaande
              foto&rsquo;s als referentie afbeelding. Voeg beide toe.
            </p>

            <h2 className="display-serif">4. Gebruik deze prompt</h2>
            <p>
              Pas aan waar nodig om je eigen custom Pokemon kaart te
              genereren.
            </p>
            <PromptBlock text={prompt1} />

            <h3>Resultaat</h3>
            <figure>
              <Image
                src="/assets/pokemon-card-result-1-CBXg1djI.png"
                alt="Pokemon card result example 1"
                width={1024}
                height={1536}
                sizes="(min-width: 768px) 640px, 100vw"
                className="mx-auto max-w-md"
              />
            </figure>

            <h2 className="display-serif">✨ Alternatieve prompt</h2>
            <p>Je kunt ook deze prompt gebruiken:</p>
            <PromptBlock text={prompt2} />

            <h3>Resultaat</h3>
            <figure>
              <Image
                src="/assets/pokemon-card-result-2-CB13Yqxh.png"
                alt="Pokemon card result example 2"
                width={1024}
                height={1536}
                sizes="(min-width: 768px) 640px, 100vw"
                className="mx-auto max-w-md"
              />
            </figure>
          </article>
        </div>
      </section>
    </>
  );
}
