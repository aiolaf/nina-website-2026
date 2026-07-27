import type {
  Freebie,
  FreebieBlock,
  FreebieSection,
} from "@/content/freebies";
import type { Lang } from "@/lib/site";
import LazyYouTube from "@/components/ui/LazyYouTube";

/**
 * Server-side renderer voor de gestructureerde freebie-content uit
 * src/content/freebies.ts. Typografie leunt op de article-prose klasse.
 */
function Block({ block, lang }: { block: FreebieBlock; lang: Lang }) {
  switch (block.kind) {
    case "h3":
      return <h3>{block.text[lang]}</h3>;
    case "p":
      return <p>{block.text[lang]}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item[lang]}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item[lang]}</li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="not-prose mt-6 space-y-5 list-none !pl-0">
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="!my-0 font-semibold">{step.title[lang]}</p>
                {step.body && (
                  <p className="!mt-1 !mb-0 text-text-muted">
                    {step.body[lang]}
                  </p>
                )}
                {step.bullets && (
                  <ul className="!mb-0">
                    {step.bullets.map((b, j) => (
                      <li key={j}>{b[lang]}</li>
                    ))}
                  </ul>
                )}
                {step.link && (
                  <p className="!mt-2 !mb-0">
                    <a
                      href={step.link.href}
                      download={step.link.download}
                      {...(step.link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {step.link.label[lang]}
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      );
    case "prompt":
      return (
        <figure className="!my-6">
          <figcaption className="mb-2 text-left font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {block.label[lang]}
          </figcaption>
          <pre className="!my-0 max-h-96 overflow-y-auto whitespace-pre-wrap">
            {block.code[lang]}
          </pre>
        </figure>
      );
    case "download":
      return (
        <p>
          <a
            href={block.href}
            download={block.download}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold !text-white !no-underline transition-colors hover:bg-ink-deep"
          >
            {block.label[lang]} ↓
          </a>
        </p>
      );
  }
}

function SectionBlock({
  section,
  lang,
}: {
  section: FreebieSection;
  lang: Lang;
}) {
  return (
    <>
      {section.heading && <h2>{section.heading[lang]}</h2>}
      {section.blocks.map((block, i) => (
        <Block key={i} block={block} lang={lang} />
      ))}
    </>
  );
}

export default function FreebieBlocks({
  freebie,
  lang,
}: {
  freebie: Freebie;
  lang: Lang;
}) {
  return (
    <div className="article-prose">
      {freebie.sections.map((section, i) => (
        <SectionBlock key={i} section={section} lang={lang} />
      ))}
      {freebie.youtubeUrls.length > 0 && (
        <div className="not-prose mt-8 space-y-6">
          {freebie.youtubeUrls.map((url) => (
            <LazyYouTube key={url} url={url} title={freebie.title[lang]} />
          ))}
        </div>
      )}
    </div>
  );
}
