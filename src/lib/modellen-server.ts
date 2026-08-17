import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ModellenData } from "@/lib/modellen";

/**
 * Leest public/data/models.json van schijf. Alleen voor server-componenten:
 * dit bestand importeert node:fs en mag dus nooit in een client-bundel
 * belanden. Types en opmaak-helpers staan daarom apart in @/lib/modellen.
 *
 * De data wordt bij de build ingelezen en niet in de browser opgehaald. De
 * GitHub Action commit een nieuwe models.json en dat zet een deploy in gang,
 * dus de pagina is na elke run weer actueel, en de cijfers staan meteen in
 * de HTML in plaats van na een fetch.
 *
 * Ontbreekt het bestand of is het stuk, dan komt er null uit en valt de
 * pagina terug op een nette melding. Een kapotte build door een databestand
 * is erger dan een pagina die even geen tabel toont.
 */
export async function leesModellen(): Promise<ModellenData | null> {
  try {
    const ruw = await readFile(
      path.join(process.cwd(), "public", "data", "models.json"),
      "utf8"
    );
    const data = JSON.parse(ruw) as ModellenData;
    return Array.isArray(data?.modellen) ? data : null;
  } catch {
    return null;
  }
}
