"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import {
  IconBliksem,
  IconCode,
  IconLagen,
  IconVonk,
} from "@/components/ui/DataIcons";
import {
  CATEGORIEEN,
  SORTERINGEN,
  categorieLabel,
  contextKort,
  euro,
  menselijkeMaat,
  PAGINAS_PER_PDF,
  prijsIndex,
  score,
  type Categorie,
  type Model,
  type Sortering,
} from "@/lib/modellen";

/**
 * Filterbalk plus modelkaarten in de huisstijl "Licht".
 *
 * Kleurverdeling volgens het huisstijldocument: ink voor actieve states en
 * knoppen, amber en sand als werkkleuren voor data, goud alleen als
 * markeerstift bij een aanrader, en violet uitsluitend als klein
 * merk-label op het verdict. Het grote violet-moment van deze pagina is de
 * donkere afsluiter, niet deze lijst.
 *
 * Alles gebeurt in de browser op een lijst die al in de HTML staat: de
 * pagina is statisch geprerenderd, dus zonder JavaScript zie je nog steeds
 * alle modellen op volgorde van intelligentie.
 */
export default function ModellenOverzicht({ modellen }: { modellen: Model[] }) {
  const [gekozen, setGekozen] = useState<Categorie[]>([]);
  const [sortering, setSortering] = useState<Sortering>("intelligentie");
  const [zoek, setZoek] = useState("");
  const zoekId = useId();

  /** Alleen categorieën die daadwerkelijk in de data voorkomen. */
  const beschikbaar = useMemo(() => {
    const set = new Set<string>();
    for (const m of modellen) for (const c of m.verdict?.categorie ?? []) set.add(c);
    return CATEGORIEEN.filter((c) => set.has(c.sleutel));
  }, [modellen]);

  const zichtbaar = useMemo(() => {
    const term = zoek.trim().toLowerCase();

    const gefilterd = modellen.filter((m) => {
      if (term && !`${m.naam} ${m.provider}`.toLowerCase().includes(term)) {
        return false;
      }
      if (gekozen.length === 0) return true;
      // Chips werken als "of": een model hoeft maar in een van de gekozen
      // categorieën te vallen. Modellen zonder verdict hebben geen
      // categorieën en vallen dus weg zodra er gefilterd wordt.
      const eigen = m.verdict?.categorie ?? [];
      return gekozen.some((c) => eigen.includes(c));
    });

    // Ontbrekende waarden zakken in beide sorteringen naar de onderkant, in
    // plaats van als nul bovenaan of onderaan te blijven hangen.
    return [...gefilterd].sort((a, b) => {
      if (sortering === "prijs") {
        const goedkoopst = (m: Model) => prijsIndex(m) ?? Number.POSITIVE_INFINITY;
        return goedkoopst(a) - goedkoopst(b);
      }
      if (sortering === "snelheid") {
        return (b.snelheid ?? -1) - (a.snelheid ?? -1);
      }
      return b.intelligentie - a.intelligentie;
    });
  }, [modellen, gekozen, sortering, zoek]);

  function wissel(sleutel: Categorie) {
    setGekozen((huidig) =>
      huidig.includes(sleutel)
        ? huidig.filter((c) => c !== sleutel)
        : [...huidig, sleutel]
    );
  }

  const gefilterdActief = gekozen.length > 0 || zoek.trim() !== "";

  return (
    <div>
      <div className="flex flex-col gap-5">
        {/* Op mobiel schuift de chiprij horizontaal, met een negatieve marge
            zodat de eerste en laatste chip tegen de schermrand lopen. */}
        <div
          role="group"
          aria-label="Filter op categorie"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {beschikbaar.map((c) => {
            const aan = gekozen.includes(c.sleutel);
            return (
              <button
                key={c.sleutel}
                type="button"
                aria-pressed={aan}
                onClick={() => wissel(c.sleutel)}
                className={`shrink-0 rounded-[10px] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.06em] transition-colors ${
                  aan
                    ? "bg-text text-bg"
                    : "bg-bg-muted text-text-muted hover:text-text"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="label-mono hidden text-text-muted sm:inline">
              Sorteer op
            </span>
            <div className="flex gap-1 rounded-full bg-bg-muted p-1">
              {SORTERINGEN.map((s) => (
                <button
                  key={s.sleutel}
                  type="button"
                  aria-pressed={sortering === s.sleutel}
                  onClick={() => setSortering(s.sleutel)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.06em] transition-colors ${
                    sortering === s.sleutel
                      ? "bg-text text-bg"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:w-72">
            <label htmlFor={zoekId} className="sr-only">
              Zoek op modelnaam
            </label>
            <input
              id={zoekId}
              type="search"
              value={zoek}
              onChange={(e) => setZoek(e.target.value)}
              placeholder="Zoek een model"
              className="w-full rounded-full border border-border bg-bg-alt px-4 py-2.5 text-sm text-text transition-colors placeholder:text-text-muted focus:border-[rgba(12,14,24,0.3)] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p aria-live="polite" className="label-mono mt-7 text-text-muted">
        {gefilterdActief
          ? `${zichtbaar.length} van ${modellen.length} modellen`
          : `${modellen.length} modellen`}
        {sortering === "prijs" && (
          <span className="font-sans text-xs normal-case tracking-normal">
            {" "}
            · prijs berekend op drie delen input, een deel output
          </span>
        )}
      </p>

      {zichtbaar.length === 0 ? (
        <div className="kaart-glas mt-8 p-12 text-center">
          <p className="text-text-muted">
            Geen modellen gevonden met deze combinatie van filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setGekozen([]);
              setZoek("");
            }}
            className="link-onder mt-4 font-mono text-xs uppercase tracking-[0.06em]"
          >
            Filters wissen
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {zichtbaar.map((model, i) => (
            <ModelKaart key={model.slug} model={model} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ModelKaart({ model, index }: { model: Model; index: number }) {
  const aanrader = model.verdict?.aanrader === true;

  return (
    <li
      className={`kaart-in kaart-glas flex flex-col p-6 ${
        aanrader ? "kaart-uitgelicht" : ""
      }`}
      /* Gestaffeld per 80ms zoals het huisstijldocument voorschrijft, maar
         afgetopt: bij 23 kaarten zou de laatste anders bijna twee seconden
         op zichzelf staan wachten. */
      style={{ animationDelay: `${Math.min(index, 5) * 80}ms` }}
    >
      {aanrader && (
        <p className="label-mono mb-4 text-text">
          <span className="marker-goud">NinA aanrader</span>
        </p>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em]">
            {model.naam}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{model.provider}</p>
        </div>
        {model.verdict?.sterren ? (
          <Sterren aantal={model.verdict.sterren} />
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Chip
          icoon={<IconVonk className="h-3.5 w-3.5 text-amber" />}
          label="Intelligentie"
          waarde={score(model.intelligentie)}
        />
        {model.coding !== null && (
          <Chip
            icoon={<IconCode className="h-3.5 w-3.5 text-amber" />}
            label="Coding"
            waarde={score(model.coding)}
          />
        )}
        {model.snelheid !== null && (
          <Chip
            icoon={<IconBliksem className="h-3.5 w-3.5 text-amber" />}
            label="Snelheid"
            waarde={`${model.snelheid} t/s`}
          />
        )}
        {model.contextvenster !== null && (
          <Chip
            icoon={<IconLagen className="h-3.5 w-3.5 text-amber" />}
            label="Context"
            waarde={contextKort(model.contextvenster)}
          />
        )}
      </div>

      {model.contextvenster !== null && (
        <ContextInTekst tokens={model.contextvenster} />
      )}

      <div className="kaart-binnen mt-5 grid grid-cols-2 divide-x divide-border">
        <Prijs label="Input" waarde={model.prijsInput} />
        <Prijs label="Output" waarde={model.prijsOutput} />
      </div>

      {model.verdict && (
        <div className="mt-5 border-l-2 border-primary/60 pl-4">
          <p className="label-mono text-primary">Verdict van NinA</p>
          <p className="mt-2 leading-relaxed text-text">
            {model.verdict.ninaVerdict}
          </p>
          {model.verdict.waarGoedVoor && (
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <span className="text-text">Goed voor: </span>
              {model.verdict.waarGoedVoor}
            </p>
          )}
        </div>
      )}

      {model.verdict && model.verdict.categorie.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {model.verdict.categorie.map((c) => (
            <li
              key={c}
              className="rounded-md bg-sand/60 px-2 py-0.5 font-mono text-[11px] text-text-muted"
            >
              {categorieLabel(c)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Chip volgens het recept: mono, icoon plus waarde, zachte achtergrond,
 * radius 10. Het label staat er in tekst bij, want op een
 * vergelijkingspagina moet je kunnen zien welk cijfer je leest.
 */
function Chip({
  icoon,
  label,
  waarde,
}: {
  icoon: ReactNode;
  label: string;
  waarde: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-bg-muted px-2.5 py-1.5">
      {icoon}
      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-text-muted">
        {label}
      </span>
      <span className="font-mono text-xs text-text">{waarde}</span>
    </span>
  );
}

/**
 * Het contextvenster in tekst die je kunt vasthouden. "200K tokens" zegt
 * alleen iets tegen wie al weet wat een token is; "300 A4-pagina's in een
 * gesprek" begrijpt iedereen meteen.
 */
function ContextInTekst({ tokens }: { tokens: number }) {
  const maat = menselijkeMaat(tokens);
  // De lopende tekst staat in strings en niet los in de JSX: apostrofs in
  // een JSX-tekstknoop worden door react/no-unescaped-entities afgekeurd.
  return (
    <p className="mt-3 text-sm leading-relaxed text-text-muted">
      {"Leest in een gesprek ongeveer "}
      <span className="font-mono text-text">{maat.woorden}</span>
      {" woorden, zo'n "}
      <span className="font-mono text-text">{maat.paginas}</span>
      {maat.pdfsZinnig ? " A4-pagina's, of " : " A4-pagina's."}
      {maat.pdfsZinnig && (
        <>
          <span className="font-mono text-text">{maat.pdfs}</span>
          {` pdf's van ${PAGINAS_PER_PDF} pagina's.`}
        </>
      )}
    </p>
  );
}

function Prijs({ label, waarde }: { label: string; waarde: number | null }) {
  return (
    <div className="px-4 py-3.5">
      <p className="label-mono text-text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg text-text">
        {waarde === null ? "n.b." : `€ ${euro(waarde)}`}
      </p>
      <p className="mt-0.5 font-mono text-[11px] text-text-muted">
        per 1M tokens
      </p>
    </div>
  );
}

/**
 * Sterren van NinA in amber. Amber is de werkkleur voor datapunten en
 * actieve iconen; violet blijft het merk en goud de zeldzame highlight.
 */
function Sterren({ aantal }: { aantal: number }) {
  const heel = Math.max(0, Math.min(5, Math.round(aantal)));
  return (
    <span
      className="flex shrink-0 gap-0.5"
      role="img"
      aria-label={`${heel} van de 5 sterren van NinA`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${
            i < heel ? "text-amber" : "text-[rgba(12,14,24,0.14)]"
          }`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.47 5.36 5.86.67-4.36 3.97 1.19 5.77L10 14.4l-5.16 2.87 1.19-5.77L1.67 7.53l5.86-.67L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
