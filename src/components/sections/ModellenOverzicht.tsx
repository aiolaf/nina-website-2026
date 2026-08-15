"use client";

import { useId, useMemo, useState } from "react";
import {
  CATEGORIEEN,
  SORTERINGEN,
  categorieLabel,
  contextKort,
  euro,
  prijsIndex,
  score,
  type Categorie,
  type Model,
  type Sortering,
} from "@/lib/modellen";

/**
 * Filterbalk plus modelkaarten. Alles gebeurt in de browser op een lijst
 * die al in de HTML staat: de pagina is statisch geprerenderd, dus zonder
 * JavaScript zie je nog steeds alle modellen op volgorde van intelligentie.
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
      {/* Filters. Op mobiel schuift de chiprij horizontaal, met een negatieve
          marge zodat de eerste en laatste chip tegen de schermrand lopen. */}
      <div className="flex flex-col gap-4">
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
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  aan
                    ? "border-primary bg-primary/15 text-primary-light"
                    : "border-border bg-bg-card/60 text-text-muted hover:border-primary/60 hover:text-primary-light"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-text-muted sm:inline">
              Sorteer op
            </span>
            <div className="flex rounded-full border border-border bg-bg-card/60 p-1">
              {SORTERINGEN.map((s) => (
                <button
                  key={s.sleutel}
                  type="button"
                  aria-pressed={sortering === s.sleutel}
                  onClick={() => setSortering(s.sleutel)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    sortering === s.sleutel
                      ? "bg-primary text-white"
                      : "text-text-muted hover:text-primary-light"
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
              className="w-full rounded-full border border-border bg-bg-card/60 px-4 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs text-text-muted">
        {gefilterdActief
          ? `${zichtbaar.length} van de ${modellen.length} modellen`
          : `${modellen.length} modellen`}
        {sortering === "prijs" && (
          <span className="font-sans">
            {" "}
            · prijs berekend op drie delen input, een deel output
          </span>
        )}
      </p>

      {zichtbaar.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-bg-card/60 p-10 text-center">
          <p className="text-text-muted">
            Geen modellen gevonden met deze combinatie van filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setGekozen([]);
              setZoek("");
            }}
            className="mt-4 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
          >
            Filters wissen
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {zichtbaar.map((model) => (
            <ModelKaart key={model.slug} model={model} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ModelKaart({ model }: { model: Model }) {
  const aanrader = model.verdict?.aanrader === true;

  return (
    <li
      className={`flex flex-col rounded-2xl border bg-bg-card/70 p-5 backdrop-blur-md transition-colors ${
        aanrader
          ? "border-gold/45 shadow-[0_0_0_1px_rgba(253,230,139,0.1)]"
          : "border-border hover:border-primary/50"
      }`}
    >
      {aanrader && (
        <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
          NinA aanrader
        </p>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-snug">
            {model.naam}
          </h3>
          <p className="mt-0.5 text-sm text-text-muted">{model.provider}</p>
        </div>
        {model.verdict?.sterren ? (
          <Sterren aantal={model.verdict.sterren} />
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge label="Intelligentie" waarde={score(model.intelligentie)} />
        {model.coding !== null && (
          <Badge label="Coding" waarde={score(model.coding)} />
        )}
        {model.snelheid !== null && (
          <Badge label="Snelheid" waarde={`${model.snelheid} t/s`} />
        )}
        {model.contextvenster !== null && (
          <Badge label="Context" waarde={contextKort(model.contextvenster)} />
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
        <Prijs label="Input" waarde={model.prijsInput} />
        <Prijs label="Output" waarde={model.prijsOutput} />
      </div>

      {model.verdict && (
        <div className="mt-4 rounded-r-xl border-l-2 border-primary bg-primary/10 px-4 py-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-light">
            Verdict van NinA
          </p>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-text">
            {model.verdict.ninaVerdict}
          </p>
          {model.verdict.waarGoedVoor && (
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              <span className="font-semibold text-text">Goed voor: </span>
              {model.verdict.waarGoedVoor}
            </p>
          )}
        </div>
      )}

      {model.verdict && model.verdict.categorie.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {model.verdict.categorie.map((c) => (
            <li
              key={c}
              className="rounded-md border border-border px-2 py-0.5 text-[11px] text-text-muted"
            >
              {categorieLabel(c)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Badge({ label, waarde }: { label: string; waarde: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-lg border border-border bg-bg-muted/50 px-2.5 py-1">
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className="font-mono text-sm font-semibold text-text">{waarde}</span>
    </span>
  );
}

function Prijs({ label, waarde }: { label: string; waarde: number | null }) {
  return (
    <div className="bg-bg-card/80 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">
        {label}
      </p>
      <p className="font-mono text-lg font-semibold text-text">
        {waarde === null ? "n.b." : `€ ${euro(waarde)}`}
      </p>
      <p className="text-[11px] text-text-muted">per 1M tokens</p>
    </div>
  );
}

/** Sterren van NinA. Paars, want goud is voorbehouden aan de aanrader. */
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
          className={`h-3.5 w-3.5 ${i < heel ? "text-primary" : "text-border"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.47 5.36 5.86.67-4.36 3.97 1.19 5.77L10 14.4l-5.16 2.87 1.19-5.77L1.67 7.53l5.86-.67L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
