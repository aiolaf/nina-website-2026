# Klantlogo-rij

De rij met klantlogo's onder een hero of boven een CTA. Bestaat in twee vormen die hetzelfde tegelrecept delen:

- `src/components/ui/LogoMarquee.tsx`: doorlopende band met de volledige set, voor de homepage.
- Statische rij: een handvol gekozen merken op één plek, voor productpagina's en landingspagina's. Zelfde tegels, geen animatie.

De rij opent altijd met het mono-label `Vertrouwd door`. Nooit een kop erboven, nooit een kader eromheen: de logo's zijn bewijs, geen sectie.

## Het tegelrecept

Elke tegel is een witte kaart, elk logo grijs tot je erover hovert. Dat is wat de rij rustig houdt terwijl de merken sterk verschillen in kleur, vorm en kwaliteit.

| Eigenschap | Waarde |
|---|---|
| Tegel | `h-14 w-28` (mobiel) / `sm:h-16 sm:w-32`, `rounded-2xl`, `border-border`, `bg-white` |
| Padding | `px-4 py-3` |
| Logo | `max-h-full max-w-full object-contain` |
| Filter | `grayscale(1) contrast(0.9)`, dekking `0.66` |
| Hover tegel | `shadow-[0_8px_20px_rgba(12,14,24,0.08)]` |
| Hover logo | filter weg, dekking 1 |
| Tussenruimte | `gap-3` / `sm:gap-4` |

## Merken met een eigen kleurvlak

Een paar merken leveren hun logo aan mét achtergrondvlak (De Nieuwe Arts: witte letters op blauw; KplusV: wit op een gestreept vierkant). Die krijgen `vlak: true` in de logolijst. Zonder die vlag mislukt de tegel: de dekking van 66 procent laat de witte letters in het vlak vervagen tot een leeg grijs blok.

Voor `vlak`-logo's geldt:

- Tegelpadding naar `p-0`, tegel `overflow-hidden`, zodat het vlak tot de rand loopt en de radius volgt.
- Logo `h-full w-auto object-contain`. Gebruik **geen** `object-cover`: vierkante merkvlakken worden dan bijgesneden.
- Volle dekking, filter `grayscale(1) contrast(0.92) brightness(1.04)`.

## Assets

Staan in `public/images/logos/`, met slug-bestandsnaam per merk (`de-nieuwe-arts.webp`, `schiphol-group.svg`). Vector waar beschikbaar, anders webp. Bron en normalisatie: `../componenten/assets/logo/` met `index.json` als index.

Er zijn twee varianten per merk, en lang niet elk merk heeft beide:

- **kleur**: voor de witte tegel op de lichte pagina. 24 merken.
- **wit**: voor een rij op de donkere merk-sectie (`#0c0e18`). 16 merken. Daar geen tegels: logo's maximaal 30px hoog, dekking 72 procent, vol wit bij hover.

Toon nooit een kleurlogo op donker of andersom. Mist een merk de variant die je nodig hebt, laat het merk dan weg uit die rij.

## Valkuilen

1. **Geen `loading="lazy"` op logo's in een rij.** De marquee dupliceert de rij ver buiten beeld; met lazy loading blijft die tweede rij leeg zodra de animatie hem inschuift. Gebruik in plaats daarvan `decoding="async"` en `fetchPriority="low"`.
2. **Vertrouw bestandsnamen niet.** In de bronmap heet `TZA-logo.png` als een witvariant maar is het donkerrood, en `Avictus-logo.svg` is juist wél de witte (op een witte tegel bleef alleen "us" over). Meet de gemiddelde helderheid van de zichtbare pixels voordat je een bestand als kleur of wit indeelt: boven ongeveer 90 procent is het een witvariant, onder 30 procent een kleurvariant.
3. **Trim de witruimte.** Meerdere bronbestanden hebben een dikke rand witruimte, waardoor het logo in de tegel wegvalt (Last Mile Solutions stond op 200x200 met het woordmerk in het midden; getrimd naar 160x66 vult het de tegel). Snijd bij op de content-bbox, met een drempel voor bijna-wit bij JPEG's.
4. **Aantal.** Zes tot twaalf merken in een statische rij; die wrapt netjes naar twee regels. Wil je de hele set laten zien, gebruik dan de marquee, niet een muur van tegels.
5. **Niet elke witvariant kan op donker.** Gemeten op de bestanden in `public/images/logos-wit/`: `kplusv` (dekking 0,98) en `gro-up` (0,80) zijn gevulde vlakken en worden op `#0c0e18` een wit blok in plaats van een logo, en `rijkswaterstaat` is een fijnlijnig woordmerk dat op 30px hoogte een veeg wordt. Die drie staan daarom niet in `LOGOS_WIT`. Controleer bij een nieuwe witvariant de dekking (aandeel pixels met alpha boven 40): boven ongeveer 0,85 is het een vlak, niet een logo.

## Statische rij, kant en klaar

```tsx
/* eslint-disable @next/next/no-img-element */

type Logo = { src: string; alt: string; vlak?: boolean };

const LOGOS: Logo[] = [
  { src: "/images/logos/schiphol-group.svg", alt: "Schiphol Group" },
  { src: "/images/logos/asml.svg", alt: "ASML" },
  { src: "/images/logos/politie.webp", alt: "Politie" },
  { src: "/images/logos/action.webp", alt: "Action" },
  { src: "/images/logos/boskalis.webp", alt: "Boskalis" },
  { src: "/images/logos/gemeente-lelystad.webp", alt: "Gemeente Lelystad" },
  { src: "/images/logos/de-nieuwe-arts.webp", alt: "de nieuwe arts", vlak: true },
  { src: "/images/logos/last-mile-solutions.webp", alt: "Last Mile Solutions" },
  { src: "/images/logos/nsecure.webp", alt: "Nsecure" },
  { src: "/images/logos/da-drogist.webp", alt: "DA Drogist" },
  { src: "/images/logos/de-baak.webp", alt: "De Baak" },
  { src: "/images/logos/kplusv.svg", alt: "KplusV", vlak: true },
  { src: "/images/logos/easytoys.webp", alt: "EasyToys" },
];

export default function KlantLogoRij() {
  return (
    <div
      className="flex flex-wrap items-center gap-3 sm:gap-4"
      role="region"
      aria-label="Organisaties die met NinA AI werkten"
    >
      <span className="mr-2 font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted">
        Vertrouwd door
      </span>
      {LOGOS.map((logo) => (
        <span
          key={logo.alt}
          className={`flex h-14 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(12,14,24,0.08)] sm:h-16 sm:w-32 ${
            logo.vlak ? "p-0" : "px-4 py-3"
          }`}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            decoding="async"
            fetchPriority="low"
            className={
              logo.vlak
                ? "h-full w-auto max-w-full object-contain [filter:grayscale(1)_contrast(0.92)_brightness(1.04)] transition-[filter] duration-300 hover:[filter:none]"
                : "max-h-full max-w-full object-contain [filter:grayscale(1)_contrast(0.9)] opacity-[0.66] transition-[filter,opacity] duration-300 hover:[filter:none] hover:opacity-100"
            }
          />
        </span>
      ))}
    </div>
  );
}
```

## Beschikbare merken

Action, ASML, Avictus, Boskalis, Cakeprint, Cascando, DA Drogist, De Baak, De Koffie Jongens, De Nieuwe Arts, Easytoys, Gemeente Lelystad, Gro-up (alleen wit), Kernbouw, KplusV, Last Mile Solutions, MoveBuddy, Nomilk2day, Nsecure, Politie, Qcore, Red Panda Works, Rijkswaterstaat (alleen wit), Schiphol Group, SPS (alleen wit), TZA, Van Berkel Professionals (alleen wit), Wens Chalets.
