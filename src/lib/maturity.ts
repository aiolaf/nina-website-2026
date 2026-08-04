/**
 * De zeven dimensies van de AI-volwassenheidsmeting, op één plek. De statische
 * plaat op /ai-partnership en de interactieve quick scan op de homepage lezen
 * hier allebei uit, zodat de assen en de vragen niet uit elkaar kunnen lopen.
 */
export type MaturityDim = {
  /** Korte naam, gebruikt als aslabel in de radar. */
  as: string;
  naam: string;
  vraag: string;
  /** Compacte vraag voor de quick scan, waar de ruimte krapper is. */
  kort: string;
};

export const DIMS_NL: MaturityDim[] = [
  {
    as: "Strategie",
    naam: "Strategie en Visie",
    vraag:
      "Hoe duidelijk en gedragen is de AI-visie in het MT? Staat de strategie op papier en bij wie ligt het mandaat?",
    kort: "Is er een gedragen AI-visie en een mandaat in het MT?",
  },
  {
    as: "Data",
    naam: "Data foundation",
    vraag:
      "Is data centraal beschikbaar, gestructureerd en toegankelijk voor automatisering en AI?",
    kort: "Is data centraal, gestructureerd en toegankelijk?",
  },
  {
    as: "Technologie",
    naam: "Technologie en Infrastructuur",
    vraag:
      "Welke tools, cloudplatforms en integraties zijn er? Hoe makkelijk koppel je nieuwe systemen?",
    kort: "Hoe makkelijk koppel je nieuwe systemen aan bestaande?",
  },
  {
    as: "Mensen",
    naam: "Mensen en Vaardigheden",
    vraag:
      "Kent het team AI-tools, prompting en automatisering? Is er capaciteit en bereidheid om bij te leren?",
    kort: "Kent het team AI-tools, en is er ruimte om bij te leren?",
  },
  {
    as: "Processen",
    naam: "Processen en Adoptie",
    vraag:
      "Zijn processen helder beschreven en wordt er actief geoptimaliseerd? Hoe verliepen eerdere change-trajecten?",
    kort: "Staan processen op papier en worden ze geoptimaliseerd?",
  },
  {
    as: "Governance",
    naam: "Governance en Risk",
    vraag:
      "Is er beleid voor AI-gebruik, data-ethiek, privacy en security? Hoe weegt men risico tegen snelheid?",
    kort: "Is er beleid voor AI-gebruik, privacy en security?",
  },
  {
    as: "Cultuur",
    naam: "Cultuur en Veranderkracht",
    vraag:
      "Hoe staat de organisatie tegenover verandering? Is er ruimte voor experimenteren, falen en leren?",
    kort: "Is er ruimte om te experimenteren, te falen en te leren?",
  },
];

export const DIMS_EN: MaturityDim[] = [
  {
    as: "Strategy",
    naam: "Strategy and Vision",
    vraag:
      "How clear and shared is the AI vision at board level? Is the strategy written down and who holds the mandate?",
    kort: "Is there a shared AI vision and a mandate at board level?",
  },
  {
    as: "Data",
    naam: "Data foundation",
    vraag:
      "Is data centrally available, structured and accessible for automation and AI?",
    kort: "Is data central, structured and accessible?",
  },
  {
    as: "Technology",
    naam: "Technology and Infrastructure",
    vraag:
      "Which tools, cloud platforms and integrations are in place? How easily do you connect new systems?",
    kort: "How easily do you connect new systems to existing ones?",
  },
  {
    as: "People",
    naam: "People and Skills",
    vraag:
      "Does the team know AI tools, prompting and automation? Is there capacity and willingness to learn?",
    kort: "Does the team know AI tools, and is there room to learn?",
  },
  {
    as: "Processes",
    naam: "Processes and Adoption",
    vraag:
      "Are processes clearly described and actively optimised? How did earlier change programmes go?",
    kort: "Are processes documented and actively optimised?",
  },
  {
    as: "Governance",
    naam: "Governance and Risk",
    vraag:
      "Is there policy for AI use, data ethics, privacy and security? How is risk weighed against speed?",
    kort: "Is there policy for AI use, privacy and security?",
  },
  {
    as: "Culture",
    naam: "Culture and Change",
    vraag:
      "How does the organisation deal with change? Is there room to experiment, fail and learn?",
    kort: "Is there room to experiment, to fail and to learn?",
  },
];

/**
 * Representatief voorbeeldprofiel voor de plaat op /ai-partnership. Geen
 * klantcijfer. Gemiddelde 2,7 nu en 4,1 doel rollen hier uit, dus de scores
 * onder de radar worden berekend en niet apart ingetypt.
 */
export const VOORBEELD_NU = [3, 2, 3, 2, 3, 2, 4];
export const VOORBEELD_DOEL = [4, 4, 4, 4, 4, 4, 5];

/**
 * Doelscore per dimensie in de quick scan. Vier van vijf is het doel dat we
 * ook in het partnership afspreken, dus de gestreepte lijn staat overal op 4.
 */
export const DOEL_PER_DIMENSIE = 4;

/** Gemiddelde met één decimaal, komma in het Nederlands. */
export function gemiddelde(waarden: number[], lang: "nl" | "en" = "nl") {
  const g = waarden.reduce((s, v) => s + v, 0) / waarden.length;
  const s = g.toFixed(1);
  return lang === "en" ? s : s.replace(".", ",");
}
