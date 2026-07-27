import n8nWhatsappWorkflow from "./workflows/n8n-whatsapp-agent.json";
import n8nLinkedinWorkflow from "./workflows/n8n-linkedin-content.json";
import n8nNanoBananaWorkflow from "./workflows/n8n-nano-banana.json";
import n8nReviewSlackWorkflow from "./workflows/n8n-review-slack-agent.json";

/** Tweetalige tekst: NL is de bronversie, EN de vertaling. */
export type Bi = { nl: string; en: string };

export type FreebieStep = {
  title: Bi;
  body?: Bi;
  bullets?: Bi[];
  link?: { href: string; label: Bi; download?: boolean };
};

export type FreebieBlock =
  | { kind: "h3"; text: Bi }
  | { kind: "p"; text: Bi }
  | { kind: "ul"; items: Bi[] }
  | { kind: "ol"; items: Bi[] }
  | { kind: "steps"; items: FreebieStep[] }
  | { kind: "prompt"; label: Bi; code: Bi }
  | { kind: "download"; href: string; label: Bi; download?: boolean };

export type FreebieSection = {
  heading?: Bi;
  blocks: FreebieBlock[];
};

export type DownloadLink = { href: string; label: Bi; download: boolean };

export type Freebie = {
  slug: string;
  category: Bi;
  title: Bi;
  description: Bi;
  image?: string;
  badge?: Bi;
  sections: FreebieSection[];
  downloadLinks: DownloadLink[];
  youtubeUrls: string[];
};

/* Categorie-labels (chips op het overzicht, volgorde uit de bron). */
export const freebieCategories: Bi[] = [
  { nl: "Claude Resources", en: "Claude Resources" },
  { nl: "Prompting", en: "Prompting" },
  { nl: "AI Image Prompts", en: "AI Image Prompts" },
  { nl: "AI Video", en: "AI Video" },
  { nl: "n8n", en: "n8n" },
];

const CAT_CLAUDE: Bi = { nl: "Claude Resources", en: "Claude Resources" };
const CAT_PROMPTING: Bi = { nl: "Prompting", en: "Prompting" };
const CAT_IMAGE: Bi = { nl: "AI Image Prompts", en: "AI Image Prompts" };
const CAT_VIDEO: Bi = { nl: "AI Video", en: "AI Video" };
const CAT_N8N: Bi = { nl: "n8n", en: "n8n" };

/* De workflow-JSON's komen 1-op-1 uit de gepubliceerde freebie-pagina's. */
const whatsappJson = JSON.stringify(n8nWhatsappWorkflow, null, 2);
const linkedinJson = JSON.stringify(n8nLinkedinWorkflow, null, 2);
const nanoBananaJson = JSON.stringify(n8nNanoBananaWorkflow, null, 2);
const reviewSlackJson = JSON.stringify(n8nReviewSlackWorkflow, null, 2);

/* Boris Cherny's CLAUDE.md — identiek aan /downloads/boris-cherny-claude-md.md */
const borisClaudeMd = `## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes -- don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests -- then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. Plan First: Write plan to tasks/todo.md with checkable items
2. Verify Plan: Check in before starting implementation
3. Track Progress: Mark items complete as you go
4. Explain Changes: High-level summary at each step
5. Document Results: Add review section to tasks/todo.md
6. Capture Lessons: Update tasks/lessons.md after corrections

## Core Principles

- Simplicity First: Make every change as simple as possible. Impact minimal code.
- No Laziness: Find root causes. No temporary fixes. Senior developer standards.
- Minimal Impact: Only touch what's necessary. No side effects with new bugs.`;

const oldPhotoPrompt = `Bring this old photograph to life as a realistic nostalgic home video. Preserve the exact identity, face, clothing, lighting, camera angle and vintage photo quality. Add only subtle natural movements: blinking, soft breathing, tiny head movement, a small authentic smile, and gentle movement from the dog. Keep the motion slow, realistic and emotionally warm. No talking, no exaggerated expressions, no waving, no face distortion, no background changes.`;

const snowLeopardPrompt = `An ultra-realistic wildlife photograph of a snow leopard walking through a snowy mountain ridge during golden hour, visible breath in cold air, detailed fur texture, sharp eyes, cinematic depth of field, National Geographic style, natural lighting, shot on a Sony A1 with 400mm lens, highly detailed environment, realistic snow particles, no CGI look, 3:4 aspect ratio.`;

const actionFigureImagePromptNl = `Maak een afbeelding van een actiefiguur speelgoedverpakking met de volgende kenmerken:

Karakter: Een realistische weergave van de persoon van de bijgevoegde foto. Positioneer dit personage dynamisch, wijzend zelfverzekerd of in een andere heroïsche houding.

Kledingstijl: Minimalistisch, outfitkleuren: Witte nette trui, Donkergroene broek en witte sneakers, passend bij de originele stijl.

Uiterlijke details: Leg onderscheidende persoonlijke details nauwkeurig vast van de gegeven foto, inclusief kapsel, gelaatstrekken, accessoires (baard, kleine goude oorbel). Voeg een mooie baard toe in dezelfde haarkleur.

Verpakking: Heldere, professionele kartonnen verpakking die typisch wordt gebruikt voor verzamelbare actiefiguren. Het actiefiguur moet in het plastic zijn en moet ook verzegeld zijn. Achtergrondkleuren: Contrasterende, gedurfde kleuren zoals blauw en geel, met duidelijke, prominente tekst bovenaan met de tekst "OLAF LEMMENS" in een speelse, gedurfde komische lettertypestijl. Onderste tekst: Voeg humoristische, beschrijvende tekst onderaan toe, bijvoorbeeld "AI Action Figure".

Algehele stijl: Zeer gedetailleerde en realistische esthetiek van actiefiguren, professioneel weergegeven als verzamelartikelen. Voeg in de verpakking ook nog los verpakte items toe: Koffiemok, microfoon, laptop, iPhone.`;

const actionFigureImagePromptEn = `Create an image of an action figure toy packaging with the following characteristics:

Character: A realistic rendering of the person in the attached photo. Position this character dynamically, pointing confidently or in another heroic pose.

Clothing style: Minimalist, outfit colors: white smart sweater, dark green trousers and white sneakers, matching the original style.

Appearance details: Accurately capture distinctive personal details from the given photo, including hairstyle, facial features, accessories (beard, small gold earring). Add a nice beard in the same hair color.

Packaging: Bright, professional cardboard packaging typically used for collectible action figures. The action figure must be inside the plastic and must also be sealed. Background colors: contrasting, bold colors such as blue and yellow, with clear, prominent text at the top reading "OLAF LEMMENS" in a playful, bold comic font style. Bottom text: add humorous, descriptive text at the bottom, for example "AI Action Figure".

Overall style: Highly detailed and realistic action figure aesthetic, professionally rendered as collectibles. Also add separately packed items inside the packaging: coffee mug, microphone, laptop, iPhone.`;

const actionFigureVideoPromptNl = `Creëer een korte video (5 of 10 seconden) waarin een realistisch geanimeerd actiefiguur in een heroïsche houding wordt getoond. Begin met een dynamische close-up van het gezicht en zoom snel uit naar het volledige lichaam dat in een krachtige, zelfverzekerde pose staat. Zorg voor vloeiende overgangen en lichte motion blur tijdens de bewegingen.

Gebruik achtergrondkleuren die contrasteren (bijvoorbeeld blauw en geel) en voeg subtiele effecten toe zoals lichte schaduwwerking en een korte fade-out aan het eind. Integreer een energieke soundtrack of geluidseffecten die de actie benadrukken.`;

const actionFigureVideoPromptEn = `Create a short video (5 or 10 seconds) showing a realistically animated action figure in a heroic pose. Start with a dynamic close-up of the face and quickly zoom out to the full body standing in a powerful, confident pose. Ensure smooth transitions and slight motion blur during the movements.

Use contrasting background colors (for example blue and yellow) and add subtle effects such as light shadow work and a short fade-out at the end. Integrate an energetic soundtrack or sound effects that emphasize the action.`;

const N8N_GUIDE: DownloadLink = {
  href: "/downloads/n8n-setup-guide.pdf",
  label: {
    nl: "Download N8N Setup Guide (PDF)",
    en: "Download N8N Setup Guide (PDF)",
  },
  download: true,
};

const n8nBeginnerIntro: FreebieBlock[] = [
  {
    kind: "p",
    text: {
      nl: "Beginner met N8N? We hebben een korte introductie in N8N geschreven, die vind je hier:",
      en: "New to N8N? We wrote a short introduction to N8N, you can find it here:",
    },
  },
  {
    kind: "download",
    href: N8N_GUIDE.href,
    label: N8N_GUIDE.label,
    download: true,
  },
];

export const freebies: Freebie[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Oude foto's tot leven brengen                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "oude-fotos-tot-leven-brengen",
    category: CAT_VIDEO,
    title: {
      nl: "Oude foto's tot leven brengen",
      en: "Bring old photos to life",
    },
    description: {
      nl: "Zet stille, oude familiefoto's om in korte, bewegende video's met AI. Inclusief prompt en tools.",
      en: "Turn still, old family photos into short, moving videos with AI. Includes prompt and tools.",
    },
    image: "/assets/nano-banana-colorize-g_482Y8a.png",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Verander een stille, oude foto in een emotioneel, bewegend moment — in minder dan 5 minuten.",
              en: "Turn a still, old photo into an emotional, moving moment — in less than 5 minutes.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "Stappenplan: oude foto tot leven brengen met AI-video",
          en: "Step-by-step: bring an old photo to life with AI video",
        },
        blocks: [
          {
            kind: "h3",
            text: {
              nl: "Stap 1: Kies een geschikte foto",
              en: "Step 1: Choose a suitable photo",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Gebruik een duidelijke oude foto waarop het gezicht goed zichtbaar is. Foto's met één of twee personen/dieren werken het best.",
              en: "Use a clear old photo in which the face is clearly visible. Photos with one or two people/animals work best.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 2: Upload de foto in ChatGPT of Claude",
              en: "Step 2: Upload the photo to ChatGPT or Claude",
            },
          },
          {
            kind: "p",
            text: { nl: "Vraag bijvoorbeeld:", en: "Ask, for example:" },
          },
          {
            kind: "prompt",
            label: { nl: "Prompt", en: "Prompt" },
            code: {
              nl: "Analyseer deze foto en schrijf een realistische video-prompt om hem natuurlijk tot leven te brengen. Het moet voelen als een oude homevideo, met subtiele bewegingen en natuurlijke snelheid.",
              en: "Analyze this photo and write a realistic video prompt to bring it to life naturally. It should feel like an old home video, with subtle movements and natural speed.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 3: Laat AI een goede prompt maken",
              en: "Step 3: Let AI create a good prompt",
            },
          },
          {
            kind: "p",
            text: { nl: "Vraag specifiek om:", en: "Specifically ask for:" },
          },
          {
            kind: "ul",
            items: [
              { nl: "natuurlijke beweging", en: "natural movement" },
              { nl: "behoud van identiteit", en: "preservation of identity" },
              { nl: "geen overdreven glimlach", en: "no exaggerated smile" },
              { nl: "geen praten", en: "no talking" },
              {
                nl: "geen rare gezichtsvervorming",
                en: "no strange face distortion",
              },
              { nl: "subtiele camerabeweging", en: "subtle camera movement" },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 4: Kopieer de prompt",
              en: "Step 4: Copy the prompt",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Gebruik bijvoorbeeld deze structuur:",
              en: "Use this structure, for example:",
            },
          },
          {
            kind: "prompt",
            label: { nl: "Prompt", en: "Prompt" },
            code: { nl: oldPhotoPrompt, en: oldPhotoPrompt },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 5: Open een AI-video tool",
              en: "Step 5: Open an AI video tool",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Ga naar bijvoorbeeld Higgsfield, Runway, Kling, Seedance of een andere image-to-video tool.",
              en: "Go to, for example, Higgsfield, Runway, Kling, Seedance or another image-to-video tool.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 6: Upload dezelfde foto",
              en: "Step 6: Upload the same photo",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Kies de optie Image to Video. Upload de foto als startbeeld.",
              en: "Choose the Image to Video option. Upload the photo as the starting frame.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 7: Plak de prompt",
              en: "Step 7: Paste the prompt",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Plak de prompt in het promptveld. Kies bij voorkeur:",
              en: "Paste the prompt into the prompt field. Preferably choose:",
            },
          },
          {
            kind: "ul",
            items: [
              { nl: "duur: 5–8 seconden", en: "duration: 5–8 seconds" },
              { nl: "beweging: laag/subtle", en: "movement: low/subtle" },
              {
                nl: "stijl: realistic / cinematic / home video",
                en: "style: realistic / cinematic / home video",
              },
              { nl: "camera motion: minimal", en: "camera motion: minimal" },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 8: Genereer de video",
              en: "Step 8: Generate the video",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Laat de video maken. Check vooral:",
              en: "Have the video generated. In particular, check:",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "blijft het gezicht hetzelfde?",
                en: "does the face stay the same?",
              },
              {
                nl: "bewegen de ogen natuurlijk?",
                en: "do the eyes move naturally?",
              },
              {
                nl: "blijft de foto geloofwaardig?",
                en: "does the photo remain believable?",
              },
              {
                nl: "zijn er geen rare handen, tanden of vervormingen?",
                en: "are there no strange hands, teeth or distortions?",
              },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 9: Verbeter indien nodig",
              en: "Step 9: Improve if needed",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Als de video te overdreven is, voeg toe:",
              en: "If the video is too exaggerated, add:",
            },
          },
          {
            kind: "prompt",
            label: { nl: "Toevoeging", en: "Addition" },
            code: {
              nl: "Movement should be very subtle, less than 5% of normal human movement. No big facial expressions. Keep it almost still, like a real candid family video.",
              en: "Movement should be very subtle, less than 5% of normal human movement. No big facial expressions. Keep it almost still, like a real candid family video.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Als het gezicht verandert, voeg toe:",
              en: "If the face changes, add:",
            },
          },
          {
            kind: "prompt",
            label: { nl: "Toevoeging", en: "Addition" },
            code: {
              nl: "Preserve the exact face and identity. Do not alter facial structure, age, eyes, mouth, or expression.",
              en: "Preserve the exact face and identity. Do not alter facial structure, age, eyes, mouth, or expression.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "Stap 10: Exporteer de beste versie",
              en: "Step 10: Export the best version",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Kies de generatie die het meest natuurlijk voelt. Vaak is niet de meest spectaculaire video de beste, maar juist de subtiele versie.",
              en: "Choose the generation that feels most natural. Often the best video is not the most spectacular one, but the subtle version.",
            },
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 2. Images 2.0 vs Nano Banana 2                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "images-2-vs-nano-banana-2",
    category: CAT_IMAGE,
    title: {
      nl: "Images 2.0 vs Nano Banana 2",
      en: "Images 2.0 vs Nano Banana 2",
    },
    description: {
      nl: "Oftewel OpenAI vs Google. Een directe vergelijking van de twee nieuwste image-modellen.",
      en: "OpenAI vs Google. A head-to-head comparison of the two newest image models.",
    },
    image: "/assets/nano-banana-hero-IzjGbHlB.png",
    sections: [
      {
        blocks: [
          { kind: "p", text: { nl: "OpenAI vs Google", en: "OpenAI vs Google" } },
          {
            kind: "p",
            text: {
              nl: "Tien identieke prompts, naast elkaar gedraaid in OpenAI Images 2.0 en Google Nano Banana 2. Vergelijk de resultaten en kopieer de prompt.",
              en: "Ten identical prompts, run side by side in OpenAI Images 2.0 and Google Nano Banana 2. Compare the results and copy the prompt.",
            },
          },
        ],
      },
      {
        heading: { nl: "Voorbeeldprompt", en: "Example prompt" },
        blocks: [
          {
            kind: "prompt",
            label: { nl: "Prompt 1 / 10", en: "Prompt 1 / 10" },
            code: { nl: snowLeopardPrompt, en: snowLeopardPrompt },
          },
          {
            kind: "p",
            text: {
              nl: "Probeer dezelfde prompt in beide modellen en vergelijk zelf: detail in de vacht, natuurlijk licht, scherptediepte en hoe realistisch de sneeuw aanvoelt.",
              en: "Try the same prompt in both models and compare for yourself: fur detail, natural light, depth of field and how realistic the snow feels.",
            },
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 3. Hoe je Claude tokens bespaart                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "claude-tokens-besparen",
    category: CAT_CLAUDE,
    title: {
      nl: "Hoe je Claude tokens bespaart",
      en: "How to save Claude tokens",
    },
    description: {
      nl: "8 concrete strategieën om tot 5x minder tokens te verbruiken in Claude — zonder in te leveren op kwaliteit.",
      en: "8 concrete strategies to use up to 5x fewer tokens in Claude — without sacrificing quality.",
    },
    image: "/assets/tokenmaxxing-D3hYIlgz.jpg",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "8 concrete strategieën waarmee je tot 5x minder tokens verbruikt — zonder in te leveren op kwaliteit.",
              en: "8 concrete strategies that let you use up to 5x fewer tokens — without sacrificing quality.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "1. Bij elk bericht wordt je volledige geschiedenis opnieuw gelezen",
          en: "1. Your entire history is re-read with every message",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Claude herinnert zich het gesprek niet. Het leest alles telkens opnieuw vanaf het begin, elke keer dat je een bericht stuurt. Bij bericht 1 is dat 1 blok geschiedenis, bij bericht 5 zijn het er 5, bij bericht 10 al 10.",
              en: "Claude does not remember the conversation. It reads everything again from the start, every time you send a message. At message 1 that is 1 block of history, at message 5 it is 5, at message 10 already 10.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "2. Token cost vs token burn",
          en: "2. Token cost vs token burn",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Twee verschillende dingen waar je beide invloed op hebt.",
              en: "Two different things, and you can influence both.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Cost is de multiplier — afhankelijk van welk model je kiest: Haiku 1x, Sonnet 3x, Opus 5x.",
              en: "Cost is the multiplier — it depends on which model you choose: Haiku 1x, Sonnet 3x, Opus 5x.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Burn is het volume — afhankelijk van jouw gewoontes:",
              en: "Burn is the volume — it depends on your habits:",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "PDF i.p.v. Markdown bestanden gebruiken",
                en: "Using PDF instead of Markdown files",
              },
              {
                nl: "500 woorden output terwijl je 1 zin nodig hebt",
                en: "500 words of output when you need 1 sentence",
              },
              {
                nl: "30 berichten terwijl je bij 10 opnieuw zou moeten beginnen",
                en: "30 messages when you should have started over at 10",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "Verminder een van de twee, en je merkt het direct.",
              en: "Reduce either one, and you will notice it immediately.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "3. In de herhaling vallen",
          en: "3. Going back and forth",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "De grootste tokenverspiller voor de meeste gebruikers. Stuur niet om en om wat je anders wilt — stuur één prompt met alles erin.",
              en: "The biggest token waster for most users. Do not send change requests one by one — send a single prompt with everything in it.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Duur: \"Maak het groter\", \"Eigenlijk wat kleiner\", \"Wat meer naar het midden\", \"Verkeerde kleur, wat roder\", \"Andere tekst\".",
              en: "Expensive: \"Make it bigger\", \"Actually a bit smaller\", \"A bit more towards the center\", \"Wrong color, a bit redder\", \"Different text\".",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Efficiënt: \"Padding 64 naar 80px, koptekst 48px semibold, CTA-knop centreren, #2216FF gebruiken voor primaire kleur.\"",
              en: "Efficient: \"Padding 64 to 80px, heading 48px semibold, center the CTA button, use #2216FF as the primary color.\"",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Zelfde resultaat, maar met 5x minder gebruikte tokens.",
              en: "Same result, but with 5x fewer tokens used.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "4. De MCP tool belasting",
          en: "4. The MCP tool tax",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Tools worden bij elk bericht opnieuw geladen, zelfs als je ze niet gebruikt.",
              en: "Tools are reloaded with every message, even if you do not use them.",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Geen tools: 0 tokens per bericht (0% van Pro)",
                en: "No tools: 0 tokens per message (0% of Pro)",
              },
              {
                nl: "Figma MCP: ~4.000 tokens per bericht (9% van Pro)",
                en: "Figma MCP: ~4,000 tokens per message (9% of Pro)",
              },
              {
                nl: "4 tools (Notion, Figma…): ~7.000 tokens per bericht (16% van Pro)",
                en: "4 tools (Notion, Figma…): ~7,000 tokens per message (16% of Pro)",
              },
              {
                nl: "5+ tools: ~55.000 tokens per bericht (125% van Pro)",
                en: "5+ tools: ~55,000 tokens per message (125% of Pro)",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "Oplossing: zet tools uit met /mcp in Claude Code, of disconnect ze in Claude.ai via Settings → Tools.",
              en: "Solution: turn tools off with /mcp in Claude Code, or disconnect them in Claude.ai via Settings → Tools.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "5. Het verkeerde model gebruiken",
          en: "5. Using the wrong model",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Opus is krachtiger maar ~5x duurder dan Sonnet voor veel taken.",
              en: "Opus is more powerful but ~5x more expensive than Sonnet for many tasks.",
            },
          },
          {
            kind: "ul",
            items: [
              { nl: "Tekst herschrijven → Sonnet", en: "Rewriting text → Sonnet" },
              { nl: "Simpele analyse → Sonnet", en: "Simple analysis → Sonnet" },
              { nl: "Brainstormen → Sonnet", en: "Brainstorming → Sonnet" },
              { nl: "Samenvatting → Sonnet", en: "Summary → Sonnet" },
              {
                nl: "Complexe automatiseringen → Opus",
                en: "Complex automations → Opus",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "98% van de taken werkt prima op Sonnet. Dat is 5x besparing t.o.v. Opus voor hetzelfde resultaat.",
              en: "98% of tasks work fine on Sonnet. That is a 5x saving compared to Opus for the same result.",
            },
          },
        ],
      },
      {
        heading: {
          nl: "6. De output beperken",
          en: "6. Limiting the output",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Output tokens kosten 5x zoveel als input tokens. Vertel Claude wat je nodig hebt.",
              en: "Output tokens cost 5x as much as input tokens. Tell Claude what you need.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Claude default: een essay van 800 woorden met context, uitleg, suggesties, aanvullende vragen en kanttekeningen waar je niet om gevraagd hebt (~1.200 tokens). Wat jij nodig hebt: 3 probleempunten met betrekking tot de formulieren, elk in één zin (~80 tokens).",
              en: "Claude's default: an 800-word essay with context, explanations, suggestions, follow-up questions and caveats you never asked for (~1,200 tokens). What you actually need: 3 problem points regarding the forms, each in one sentence (~80 tokens).",
            },
          },
          {
            kind: "p",
            text: { nl: "Voeg deze prompts toe:", en: "Add these prompts:" },
          },
          {
            kind: "ul",
            items: [
              { nl: "\"Just the code, no commentary\"", en: "\"Just the code, no commentary\"" },
              { nl: "\"Answer in one sentence\"", en: "\"Answer in one sentence\"" },
              { nl: "\"3 bullet points max\"", en: "\"3 bullet points max\"" },
              { nl: "\"Give me the diff only\"", en: "\"Give me the diff only\"" },
              { nl: "\"No explanations\"", en: "\"No explanations\"" },
              { nl: "\"Just list the things\"", en: "\"Just list the things\"" },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "7. Welk model voor welke taak?",
          en: "7. Which model for which task?",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Een quick reference. Kies het lichtste model dat de taak aankan en bespaar direct tokens.",
              en: "A quick reference. Choose the lightest model that can handle the task and save tokens immediately.",
            },
          },
          {
            kind: "ul",
            items: [
              { nl: "Een vertaling → Haiku", en: "A translation → Haiku" },
              {
                nl: "Taak die snel moet → Haiku",
                en: "A task that needs to be fast → Haiku",
              },
              { nl: "Brainstorm → Sonnet", en: "Brainstorm → Sonnet" },
              { nl: "Tekst herschrijven → Sonnet", en: "Rewriting text → Sonnet" },
              { nl: "Samenvatting → Sonnet", en: "Summary → Sonnet" },
              { nl: "Simpele analyse → Sonnet", en: "Simple analysis → Sonnet" },
              {
                nl: "Complexe automatiseringen → Opus",
                en: "Complex automations → Opus",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "8. Wanneer moet je een nieuw gesprek beginnen?",
          en: "8. When should you start a new conversation?",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Weten wanneer je moet resetten is net zo belangrijk als efficiënt zijn. Reset triggers: taak is voltooid, het onderwerp verandert, 15–20 berichten, Claude raakt in de war.",
              en: "Knowing when to reset is just as important as being efficient. Reset triggers: the task is done, the topic changes, 15–20 messages, Claude gets confused.",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "/compact — Samenvatten & inkorten. Claude vat je gespreksgeschiedenis samen in een kortere versie. Handig als je context nodig hebt, maar tokens wilt besparen.",
                en: "/compact — Summarize & shorten. Claude condenses your conversation history into a shorter version. Useful when you need context but want to save tokens.",
              },
              {
                nl: "/clear — Volledige reset. Wist de volledige geschiedenis. Gebruik dit wanneer je aan een nieuwe taak begint of de context niet langer relevant is.",
                en: "/clear — Full reset. Wipes the entire history. Use this when you start a new task or the context is no longer relevant.",
              },
              {
                nl: "New chat — Nieuwe chat. Start in claude.ai gewoon een nieuw gesprek. Je projectgegevens blijven behouden, de chatgeschiedenis niet.",
                en: "New chat — Simply start a new conversation in claude.ai. Your project data is kept, the chat history is not.",
              },
            ],
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 4. Boris Cherny zijn CLAUDE.md file                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "claude-md-boris-cherny",
    category: CAT_CLAUDE,
    title: {
      nl: "Boris Cherny zijn CLAUDE.md file",
      en: "Boris Cherny's CLAUDE.md file",
    },
    description: {
      nl: "Het exacte CLAUDE.md bestand van de oprichter van Claude Code. Kopieer het en laat Claude Code werken als een senior engineer.",
      en: "The exact CLAUDE.md file from the founder of Claude Code. Copy it and let Claude Code work like a senior engineer.",
    },
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Het exacte CLAUDE.md bestand dat Boris Cherny — oprichter van Claude Code bij Anthropic — gebruikt in zijn eigen repositories. Kopieer het, plak het, en laat Claude Code werken als een senior engineer.",
              en: "The exact CLAUDE.md file that Boris Cherny — founder of Claude Code at Anthropic — uses in his own repositories. Copy it, paste it, and let Claude Code work like a senior engineer.",
            },
          },
        ],
      },
      {
        heading: { nl: "Wat is CLAUDE.md?", en: "What is CLAUDE.md?" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "CLAUDE.md is een Markdown-bestand dat je in de rootmap van je repository plaatst. Het vertelt Claude Code hoe te denken, te plannen en uit te voeren — niet alleen wat te bouwen.",
              en: "CLAUDE.md is a Markdown file you place in the root folder of your repository. It tells Claude Code how to think, plan and execute — not just what to build.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Zie het als een besturingssysteem voor je AI-codeerassistent.",
              en: "Think of it as an operating system for your AI coding assistant.",
            },
          },
        ],
      },
      {
        heading: { nl: "Het document", en: "The document" },
        blocks: [
          {
            kind: "download",
            href: "/downloads/boris-cherny-claude-md.md",
            label: { nl: "Download .md", en: "Download .md" },
            download: true,
          },
          {
            kind: "prompt",
            label: { nl: "CLAUDE.md", en: "CLAUDE.md" },
            code: { nl: borisClaudeMd, en: borisClaudeMd },
          },
        ],
      },
      {
        heading: { nl: "Inhoud", en: "Contents" },
        blocks: [
          {
            kind: "h3",
            text: {
              nl: "Sectie 1: Workflow-orkestratie",
              en: "Section 1: Workflow orchestration",
            },
          },
          {
            kind: "p",
            text: {
              nl: "6 regels die bepalen hoe Claude Code elke taak aanpakt.",
              en: "6 rules that determine how Claude Code approaches every task.",
            },
          },
          {
            kind: "ol",
            items: [
              {
                nl: "Standaard planningsmodus — Ga naar de planningsmodus voor elke niet-triviale taak (3+ stappen of architectuurbeslissingen)",
                en: "Plan mode default — Enter plan mode for any non-trivial task (3+ steps or architectural decisions)",
              },
              {
                nl: "Subagentstrategie — Gebruik subagents ruimhartig om het hoofdvenster overzichtelijk te houden",
                en: "Subagent strategy — Use subagents liberally to keep the main context window clean",
              },
              {
                nl: "Zelfverbeteringslus — Werk na elke correctie lessons.md bij met het patroon",
                en: "Self-improvement loop — After every correction, update lessons.md with the pattern",
              },
              {
                nl: "Verificatie vóór voltooiing — Markeer een taak nooit als voltooid zonder te bewijzen dat deze werkt",
                en: "Verification before done — Never mark a task complete without proving it works",
              },
              {
                nl: "Eis elegantie — Pauzeer bij niet-triviale wijzigingen en vraag jezelf af: \"Is er een elegantere manier?\"",
                en: "Demand elegance — For non-trivial changes, pause and ask yourself: \"Is there a more elegant way?\"",
              },
              {
                nl: "Autonoom oplossen van bugs — Los een bug direct op. Geen hulp nodig.",
                en: "Autonomous bug fixing — Just fix the bug. No hand-holding needed.",
              },
            ],
          },
          {
            kind: "h3",
            text: { nl: "Sectie 2: Taakbeheer", en: "Section 2: Task management" },
          },
          {
            kind: "p",
            text: {
              nl: "6 stappen die Claude Code voor elke taak volgt.",
              en: "6 steps Claude Code follows for every task.",
            },
          },
          {
            kind: "ol",
            items: [
              {
                nl: "Plan eerst — Schrijf een plan in tasks/todo.md met afvinkbare items",
                en: "Plan first — Write a plan to tasks/todo.md with checkable items",
              },
              {
                nl: "Controleer het plan — Controleer het plan voordat je met de implementatie begint",
                en: "Verify the plan — Check the plan before starting implementation",
              },
              {
                nl: "Houd de voortgang bij — Markeer items als voltooid naarmate je vordert",
                en: "Track progress — Mark items complete as you go",
              },
              {
                nl: "Leg de wijzigingen uit — Geef een samenvatting op hoog niveau bij elke stap",
                en: "Explain changes — Give a high-level summary at each step",
              },
              {
                nl: "Documenteer de resultaten — Voeg een reviewsectie toe aan tasks/todo.md",
                en: "Document results — Add a review section to tasks/todo.md",
              },
              {
                nl: "Lessen vastleggen — Werk tasks/lessons.md bij na correcties",
                en: "Capture lessons — Update tasks/lessons.md after corrections",
              },
            ],
          },
          {
            kind: "h3",
            text: { nl: "Sectie 3: Kernprincipes", en: "Section 3: Core principles" },
          },
          {
            kind: "p",
            text: {
              nl: "3 niet-onderhandelbare regels voor elke regel code.",
              en: "3 non-negotiable rules for every line of code.",
            },
          },
          {
            kind: "ol",
            items: [
              {
                nl: "Eenvoud eerst — Maak elke wijziging zo eenvoudig mogelijk. Minimale impact op de code.",
                en: "Simplicity first — Make every change as simple as possible. Minimal impact on the code.",
              },
              {
                nl: "Geen luiheid — Zoek naar de hoofdoorzaak. Geen tijdelijke oplossingen. Standaarden voor senior ontwikkelaars.",
                en: "No laziness — Find the root cause. No temporary fixes. Senior developer standards.",
              },
              {
                nl: "Minimale impact — Pas alleen aan wat nodig is. Geen neveneffecten met nieuwe bugs.",
                en: "Minimal impact — Only touch what is necessary. No side effects with new bugs.",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "Hoe te gebruiken", en: "How to use it" },
        blocks: [
          {
            kind: "ol",
            items: [
              {
                nl: "Maak een bestand met de naam CLAUDE.md aan in de rootmap van je project.",
                en: "Create a file named CLAUDE.md in the root folder of your project.",
              },
              { nl: "Plak deze regels erin.", en: "Paste these rules into it." },
              {
                nl: "Open Claude Code in je terminal.",
                en: "Open Claude Code in your terminal.",
              },
              {
                nl: "Kijk hoe het de code plant, uitvoert en verifieert, net als een ervaren engineer.",
                en: "Watch how it plans, executes and verifies the code, just like an experienced engineer.",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "Wie is Boris Cherny?", en: "Who is Boris Cherny?" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Boris Cherny is de oprichter van Claude Code bij Anthropic. Dit is precies het bestand dat hij in zijn eigen repositories gebruikt om het maximale uit Claude Code te halen.",
              en: "Boris Cherny is the founder of Claude Code at Anthropic. This is exactly the file he uses in his own repositories to get the most out of Claude Code.",
            },
          },
        ],
      },
      {
        heading: { nl: "Eén regel", en: "One rule" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Sla nooit de context of stopvoorwaarden over. Die twee maken het verschil tussen een standaardantwoord van Claude en een antwoord dat daadwerkelijk het werk doet.",
              en: "Never skip the context or the stop conditions. Those two make the difference between a standard Claude answer and an answer that actually does the work.",
            },
          },
        ],
      },
    ],
    downloadLinks: [
      {
        href: "/downloads/boris-cherny-claude-md.md",
        label: { nl: "Download .md", en: "Download .md" },
        download: true,
      },
    ],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 5. Claude Skills — Google Ads Analyzer                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "claude-skills-google-ads-analyzer",
    category: CAT_CLAUDE,
    title: {
      nl: "Claude Skills — Google Ads Analyzer",
      en: "Claude Skills — Google Ads Analyzer",
    },
    description: {
      nl: "Laat Claude je Google Ads account analyseren en een complete strategie bouwen. Professioneel rapport in minuten.",
      en: "Let Claude analyze your Google Ads account and build a complete strategy. Professional report in minutes.",
    },
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Op deze pagina vind je een kant-en-klare Claude Skill waarmee je je Google Ads account kunt laten analyseren. Je leert hoe je de skill installeert, hoe hij werkt, en je kunt alle bestanden direct kopiëren. Binnen 5 minuten heb je een professionele ads-analyse — zonder dat je zelf een prompt hoeft te schrijven.",
              en: "On this page you will find a ready-made Claude Skill that lets Claude analyze your Google Ads account. You will learn how to install the skill, how it works, and you can copy all the files directly. Within 5 minutes you have a professional ads analysis — without having to write a prompt yourself.",
            },
          },
        ],
      },
      {
        heading: { nl: "Wat doet deze skill?", en: "What does this skill do?" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Je geeft Claude toegang tot je Google Ads account en hij doet de rest.",
              en: "You give Claude access to your Google Ads account and it does the rest.",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Volledige Analyse — KPI-dashboard, campagne-breakdown, zoekwoord-analyse met beoordelingen (Sterk/Goed/Matig/Zwak).",
                en: "Full Analysis — KPI dashboard, campaign breakdown, keyword analysis with ratings (Strong/Good/Fair/Weak).",
              },
              {
                nl: "Strategie & Plan — Campagne-architectuur, zoekwoorden per ad group, budget-verdeling, en KPI-targets per kwartaal.",
                en: "Strategy & Plan — Campaign architecture, keywords per ad group, budget allocation, and KPI targets per quarter.",
              },
              {
                nl: "Professioneel Rapport — Output als DOCX, PPTX, XLSX of samenvatting in de chat. In het Nederlands of Engels.",
                en: "Professional Report — Output as DOCX, PPTX, XLSX or a summary in the chat. In Dutch or English.",
              },
              {
                nl: "Externe Data — Koppel Airtable, CRM of spreadsheet data om echte conversies te valideren tegen Google Ads cijfers.",
                en: "External Data — Connect Airtable, CRM or spreadsheet data to validate real conversions against Google Ads numbers.",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "Installatie in 5 stappen",
          en: "Installation in 5 steps",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Binnen 2 minuten heb je de skill draaien in Claude Desktop.",
              en: "You will have the skill running in Claude Desktop within 2 minutes.",
            },
          },
          {
            kind: "steps",
            items: [
              {
                title: { nl: "Download de skill", en: "Download the skill" },
                body: {
                  nl: "Download het .skill bestand naar je computer.",
                  en: "Download the .skill file to your computer.",
                },
                link: {
                  href: "/downloads/google-ads-analyzer.skill",
                  label: {
                    nl: "Download .skill bestand",
                    en: "Download .skill file",
                  },
                  download: true,
                },
              },
              {
                title: {
                  nl: "Open Claude Desktop → Cowork",
                  en: "Open Claude Desktop → Cowork",
                },
                body: {
                  nl: "Open de Claude Desktop app en ga naar de Cowork sectie. Je hebt hiervoor een betaald abonnement nodig.",
                  en: "Open the Claude Desktop app and go to the Cowork section. You need a paid subscription for this.",
                },
              },
              {
                title: { nl: "Upload de skill", en: "Upload the skill" },
                body: {
                  nl: "Klik op 'Customize' → 'Skills' → het '+' icoon en kies ervoor om de gedownloade skill te uploaden. Vereiste: voor live Google Ads analyse heb je de Claude in Chrome extensie nodig. Deze moet gekoppeld zijn aan Claude Desktop. Voor CSV-analyse is geen extensie nodig.",
                  en: "Click 'Customize' → 'Skills' → the '+' icon and choose to upload the downloaded skill. Requirement: for live Google Ads analysis you need the Claude in Chrome extension. It must be connected to Claude Desktop. For CSV analysis no extension is needed.",
                },
              },
              {
                title: {
                  nl: "Claude in Chrome extensie downloaden",
                  en: "Download the Claude in Chrome extension",
                },
                body: {
                  nl: "Ga naar de Chrome Web Store en download de extensie van Anthropic.",
                  en: "Go to the Chrome Web Store and download the extension by Anthropic.",
                },
                link: {
                  href: "https://chromewebstore.google.com/publisher/anthropic/u308d63ea0533efcf7ba778ad42da7390",
                  label: { nl: "Download extensie", en: "Download extension" },
                },
              },
              {
                title: {
                  nl: "Controleren of het gekoppeld is",
                  en: "Check that it is connected",
                },
                body: {
                  nl: "Klik op 'Customize' → 'Connectors' en kijk voor Claude in Chrome. Je kunt het ook via deze manier opzetten. Vervolgens moet je hier zien of de connectie is gemaakt.",
                  en: "Click 'Customize' → 'Connectors' and look for Claude in Chrome. You can also set it up this way. You should then see here whether the connection has been made.",
                },
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "Zo gebruik je het", en: "How to use it" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Na installatie herkent Claude de skill automatisch. Hier zijn voorbeeldprompts:",
              en: "After installation, Claude recognizes the skill automatically. Here are some example prompts:",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Analyseer mijn Google Ads\" — Claude opent je browser, navigeert naar Google Ads, extraheert alle data en maakt een volledig rapport.",
                en: "\"Analyze my Google Ads\" — Claude opens your browser, navigates to Google Ads, extracts all the data and creates a full report.",
              },
              {
                nl: "\"Ik heb dit CSV bestand uit Google Ads, maak er een analyse van\" — Upload een export en Claude analyseert het direct — geen browser nodig.",
                en: "\"I have this CSV file from Google Ads, turn it into an analysis\" — Upload an export and Claude analyzes it directly — no browser needed.",
              },
              {
                nl: "\"Maak een strategie voor 2026 met focus op meer leads\" — Claude bouwt een compleet plan met campagnes, zoekwoorden, budgetten en KPI-targets.",
                en: "\"Create a strategy for 2026 focused on more leads\" — Claude builds a complete plan with campaigns, keywords, budgets and KPI targets.",
              },
              {
                nl: "\"Koppel mijn Airtable data aan de Google Ads conversies\" — Claude vergelijkt echte leads met Google Ads data en vindt discrepanties.",
                en: "\"Connect my Airtable data to the Google Ads conversions\" — Claude compares real leads with Google Ads data and finds discrepancies.",
              },
            ],
          },
        ],
      },
    ],
    downloadLinks: [
      {
        href: "/downloads/google-ads-analyzer.skill",
        label: { nl: "Download .skill bestand", en: "Download .skill file" },
        download: true,
      },
    ],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 6. 8 Staps Prompt Framework                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "18k-prompt",
    category: CAT_PROMPTING,
    title: {
      nl: "8 Staps Prompt Framework",
      en: "8 Steps Prompt Framework",
    },
    description: {
      nl: "Ons bewezen prompt framework waarmee je gegarandeerd betere resultaten krijgt van AI. Speciaal voor onze 18k volgers.",
      en: "Our proven prompt framework that guarantees better AI results. Special for our 18k followers.",
    },
    sections: [
      {
        heading: {
          nl: "Handleiding: hoe stel je een goede prompt op?",
          en: "Guide: how do you write a good prompt?",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Een goede prompt is de sleutel om AI effectief in te zetten. Er bestaan talloze theorieën en formules voor prompts. Maar het begint allemaal bij logisch nadenken.",
              en: "A good prompt is the key to using AI effectively. Countless theories and formulas for prompts exist. But it all starts with thinking logically.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Stel je simpele vragen aan een taalmodel dan heb je geen ingewikkeld prompt nodig. Wil je echter alles uit het prompten halen, dan zijn deze frameworks echt van waarde!",
              en: "If you ask a language model simple questions, you do not need a complicated prompt. But if you want to get everything out of prompting, these frameworks are truly valuable!",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Daarom gebruiken wij het 8 staps Prompt framework (ROC-B-CPF-E): 8 stappen die zorgen voor duidelijkheid, structuur en bruikbare output. Dit is afgeleid van het kortere 6 step prompt framework. Hieronder volgt een uitleg van ons eigen uitgebreidere framework: het 8 stap prompt framework!",
              en: "That is why we use the 8 step Prompt framework (ROC-B-CPF-E): 8 steps that provide clarity, structure and usable output. It is derived from the shorter 6 step prompt framework. Below is an explanation of our own extended framework: the 8 step prompt framework!",
            },
          },
        ],
      },
      {
        heading: { nl: "1. Rol (Persona)", en: "1. Role (Persona)" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je bepaalt vanuit welke rol de AI antwoordt.",
              en: "What does this do? You decide which role the AI answers from.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Een beleidsadviseur, jurist of communicatiespecialist kijkt elk anders naar hetzelfde onderwerp. De gekozen rol bepaalt de toon en invalshoek.",
              en: "Why does it matter? A policy advisor, lawyer or communications specialist each looks at the same topic differently. The chosen role determines the tone and angle.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Je bent een ervaren beleidsadviseur die complexe regelgeving kan vertalen naar duidelijke en praktische inzichten.\"",
                en: "\"You are an experienced policy advisor who can translate complex regulations into clear and practical insights.\"",
              },
              {
                nl: "\"Je bent een professionele redacteur die ingewikkelde informatie begrijpelijk maakt voor een brede doelgroep.\"",
                en: "\"You are a professional editor who makes complicated information understandable for a broad audience.\"",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "Tip: Kies de rol die past bij jouw groep of einddoel (strategie, communicatie, analyse, educatie, etc.).",
              en: "Tip: Choose the role that fits your group or end goal (strategy, communication, analysis, education, etc.).",
            },
          },
        ],
      },
      {
        heading: { nl: "2. Objectief", en: "2. Objective" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je beschrijft kort wat de AI moet opleveren.",
              en: "What does this do? You briefly describe what the AI should deliver.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Een concreet doel voorkomt dat de AI afwijkt of te breed antwoordt.",
              en: "Why does it matter? A concrete goal prevents the AI from drifting or answering too broadly.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Het doel is om een helder overzicht te maken van relevante regelingen of inzichten op basis van aangeleverde documenten.\"",
                en: "\"The goal is to create a clear overview of relevant schemes or insights based on the supplied documents.\"",
              },
              {
                nl: "\"Het doel is om een conceptdocument te schrijven dat geschikt is voor publicatie of interne besluitvorming.\"",
                en: "\"The goal is to write a draft document suitable for publication or internal decision-making.\"",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "3. Context", en: "3. Context" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je legt de achtergrond en doelgroep uit.",
              en: "What does this do? You explain the background and the audience.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Context helpt AI om relevante details te selecteren en de juiste toon te gebruiken.",
              en: "Why does it matter? Context helps AI select relevant details and use the right tone.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"De organisatie wil haar doelgroep informeren over relevante ontwikkelingen binnen dit onderwerp.\"",
                en: "\"The organization wants to inform its audience about relevant developments within this topic.\"",
              },
              {
                nl: "\"De doelgroep bestaat uit professionals en besluitvormers. Gebruik een toegankelijke, zakelijke toon.\"",
                en: "\"The audience consists of professionals and decision-makers. Use an accessible, businesslike tone.\"",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "4. Bronnen", en: "4. Sources" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je geeft aan welke documenten of data gebruikt moeten worden.",
              en: "What does this do? You specify which documents or data must be used.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? AI werkt beter met expliciete input — dat maakt het antwoord feitelijk en controleerbaar.",
              en: "Why does it matter? AI works better with explicit input — it makes the answer factual and verifiable.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Gebruik uitsluitend informatie uit de aangeleverde documenten.\"",
                en: "\"Use only information from the supplied documents.\"",
              },
              {
                nl: "\"Baseer je analyse en samenvatting alleen op deze bronnen en maak aannames expliciet.\"",
                en: "\"Base your analysis and summary only on these sources and make assumptions explicit.\"",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "5. Constraints (Beperkingen)",
          en: "5. Constraints",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je stelt grenzen aan toon, lengte, taal en structuur.",
              en: "What does this do? You set limits on tone, length, language and structure.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Zonder beperkingen krijg je vaak onduidelijke of te lange teksten.",
              en: "Why does it matter? Without constraints you often get unclear or overly long texts.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Schrijf maximaal 200 woorden voor de samenvatting.\"",
                en: "\"Write a maximum of 200 words for the summary.\"",
              },
              {
                nl: "\"Gebruik een neutrale, professionele schrijfstijl.\"",
                en: "\"Use a neutral, professional writing style.\"",
              },
              {
                nl: "\"Maak een overzichtstabel met vaste kolommen zoals: onderwerp | doelgroep | doel | voorwaarden | relevante details.\"",
                en: "\"Create an overview table with fixed columns such as: topic | audience | goal | conditions | relevant details.\"",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "6. Proces", en: "6. Process" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je beschrijft de logische volgorde van stappen die de AI moet volgen.",
              en: "What does this do? You describe the logical sequence of steps the AI must follow.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Een stappenplan voorkomt dat AI willekeurig schrijft of zaken overslaat.",
              en: "Why does it matter? A step-by-step plan prevents AI from writing randomly or skipping things.",
            },
          },
          { kind: "p", text: { nl: "Voorbeeld:", en: "Example:" } },
          {
            kind: "ol",
            items: [
              {
                nl: "Analyseer de aangeleverde documenten.",
                en: "Analyze the supplied documents.",
              },
              {
                nl: "Identificeer de belangrijkste relevante onderdelen.",
                en: "Identify the most important relevant parts.",
              },
              {
                nl: "Maak een overzicht met kerninformatie.",
                en: "Create an overview with key information.",
              },
              {
                nl: "Vat dit samen in een korte samenvatting van maximaal 200 woorden.",
                en: "Condense this into a short summary of no more than 200 words.",
              },
              {
                nl: "Werk dit verder uit in meerdere thematische paragrafen.",
                en: "Expand this further into several thematic paragraphs.",
              },
            ],
          },
        ],
      },
      {
        heading: { nl: "7. Formaat", en: "7. Format" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je bepaalt hoe de output eruit moet zien.",
              en: "What does this do? You decide what the output should look like.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? Een vast format zorgt voor consistentie tussen teams en maakt hergebruik eenvoudiger.",
              en: "Why does it matter? A fixed format ensures consistency between teams and makes reuse easier.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "\"Lever het document aan in de volgende structuur:\"",
              en: "\"Deliver the document in the following structure:\"",
            },
          },
          {
            kind: "ul",
            items: [
              { nl: "Samenvatting (max. 200 woorden)", en: "Summary (max. 200 words)" },
              { nl: "Overzichtstabel", en: "Overview table" },
              {
                nl: "Sectie 1 – Achtergrond en context",
                en: "Section 1 – Background and context",
              },
              {
                nl: "Sectie 2 – Analyse of uitleg",
                en: "Section 2 – Analysis or explanation",
              },
              {
                nl: "Sectie 3 – Relevantie voor de doelgroep",
                en: "Section 3 – Relevance for the audience",
              },
              {
                nl: "Bronvermelding + transparantie over aannames",
                en: "Source attribution + transparency about assumptions",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "\"Gebruik duidelijke kopjes (H1, H2, H3) en bulletpoints waar mogelijk.\"",
              en: "\"Use clear headings (H1, H2, H3) and bullet points where possible.\"",
            },
          },
        ],
      },
      {
        heading: { nl: "8. Evaluatie", en: "8. Evaluation" },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Wat doet dit? Je vraagt AI om de kwaliteit van de output te controleren en verbeteringen voor te stellen.",
              en: "What does this do? You ask AI to check the quality of the output and suggest improvements.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Waarom belangrijk? AI kan zo zichzelf corrigeren — wat de betrouwbaarheid vergroot.",
              en: "Why does it matter? This way AI can correct itself — which increases reliability.",
            },
          },
          { kind: "p", text: { nl: "Voorbeelden:", en: "Examples:" } },
          {
            kind: "ul",
            items: [
              {
                nl: "\"Controleer of alle aangeleverde bronnen zijn gebruikt.\"",
                en: "\"Check whether all supplied sources have been used.\"",
              },
              {
                nl: "\"Vraag jezelf: 'Is deze output relevant en begrijpelijk voor de doelgroep?'\"",
                en: "\"Ask yourself: 'Is this output relevant and understandable for the audience?'\"",
              },
              {
                nl: "\"Sluit af met de vraag: 'Wil je dat ik dit herschrijf voor een andere doelgroep of toepassing?'\"",
                en: "\"End with the question: 'Would you like me to rewrite this for a different audience or use case?'\"",
              },
            ],
          },
          {
            kind: "p",
            text: {
              nl: "Veel succes met het opstellen van je prompts!",
              en: "Good luck writing your prompts!",
            },
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 7. N8N Whatsapp AI Agent (met human in the loop)                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "n8n-whatsapp-agent",
    category: CAT_N8N,
    title: {
      nl: "N8N Whatsapp AI Agent (met human in the loop)",
      en: "N8N WhatsApp AI Agent (with human in the loop)",
    },
    description: {
      nl: "Download de complete N8N workflow JSON voor een AI WhatsApp chatbot met human-in-the-loop functionaliteit.",
      en: "Download the complete N8N workflow JSON for an AI WhatsApp chatbot with human-in-the-loop functionality.",
    },
    image: "/assets/n8n-whatsapp-workflow-CZSe1MF6.png",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Hieronder vind je de JSON voor N8N met de AI Whatsapp Chatbot.",
              en: "Below you will find the JSON for N8N with the AI WhatsApp chatbot.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "De workflow heeft whatsapp als trigger, let op: je hebt een whatsapp business account met een gekoppeld nummer nodig om whatsapp berichten te ontvangen.",
              en: "The workflow uses WhatsApp as its trigger. Note: you need a WhatsApp Business account with a connected number to receive WhatsApp messages.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "De agent bestaat uit een taalmodel en een database. Wij gebruiken vaak een PostgreSQL database voor klanten, maar voor de meeste zal een database in de vorm van Airtable een betere oplossing zijn.",
              en: "The agent consists of a language model and a database. We often use a PostgreSQL database for clients, but for most people a database in the form of Airtable will be a better solution.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Wanneer de agent de vraag kan beantwoorden ontvangt de vraagsteller direct antwoord via whatsapp.",
              en: "When the agent can answer the question, the person asking receives an answer directly via WhatsApp.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Wanneer de agent de vraag niet kan beantwoorden wordt een vraag gesteld aan een medewerker. In dit geval is Slack gekoppeld, maar deze kan ook vervangen worden door teams chat, whatsapp, email, telegram of een andere chatapp.",
              en: "When the agent cannot answer the question, a question is sent to an employee. In this case Slack is connected, but it can also be replaced by Teams chat, WhatsApp, email, Telegram or another chat app.",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Daarna heeft de werknemer de keuze het antwoord op te slaan in de database en wordt het antwoord naar de vraagsteller gestuurd.",
              en: "The employee then has the option to save the answer in the database, and the answer is sent to the person who asked.",
            },
          },
        ],
      },
      {
        heading: { nl: "JSON Bestand", en: "JSON File" },
        blocks: [
          {
            kind: "prompt",
            label: { nl: "n8n workflow JSON", en: "n8n workflow JSON" },
            code: { nl: whatsappJson, en: whatsappJson },
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 8. N8N LinkedIn Content Automation                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "n8n-linkedin-content",
    category: CAT_N8N,
    title: {
      nl: "N8N LinkedIn Content Automation",
      en: "N8N LinkedIn Content Automation",
    },
    description: {
      nl: "Download de complete N8N workflow JSON voor geautomatiseerde LinkedIn content creatie met AI en goedkeuringsflow.",
      en: "Download the complete N8N workflow JSON for automated LinkedIn content creation with AI and approval flow.",
    },
    image: "/assets/n8n-whatsapp-workflow-CZSe1MF6.png",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Hieronder vind je de JSON voor N8N met de LinkedIn Content Workflow.",
              en: "Below you will find the JSON for N8N with the LinkedIn Content Workflow.",
            },
          },
          ...n8nBeginnerIntro,
        ],
      },
      {
        heading: { nl: "JSON Bestand", en: "JSON File" },
        blocks: [
          {
            kind: "prompt",
            label: { nl: "n8n workflow JSON", en: "n8n workflow JSON" },
            code: { nl: linkedinJson, en: linkedinJson },
          },
        ],
      },
    ],
    downloadLinks: [N8N_GUIDE],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 9. Nano Banana N8N Content Generator                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "n8n-nano-banana",
    category: CAT_N8N,
    title: {
      nl: "Nano Banana N8N Content Generator",
      en: "Nano Banana N8N Content Generator",
    },
    description: {
      nl: "Download de complete N8N workflow JSON voor de Nano Banana content generator met AI beeldgeneratie.",
      en: "Download the complete N8N workflow JSON for the Nano Banana content generator with AI image generation.",
    },
    image: "/assets/n8n-whatsapp-workflow-CZSe1MF6.png",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Hieronder vind je de JSON voor de Nano Banana N8N content generator. Let op: Je hebt een koppeling met Google AI Studio nodig met een gekoppelde creditcard om afbeeldingen te kunnen genereren.",
              en: "Below you will find the JSON for the Nano Banana N8N content generator. Note: you need a connection to Google AI Studio with a linked credit card to be able to generate images.",
            },
          },
          ...n8nBeginnerIntro,
        ],
      },
      {
        heading: { nl: "JSON Bestand", en: "JSON File" },
        blocks: [
          {
            kind: "prompt",
            label: { nl: "n8n workflow JSON", en: "n8n workflow JSON" },
            code: { nl: nanoBananaJson, en: nanoBananaJson },
          },
        ],
      },
    ],
    downloadLinks: [N8N_GUIDE],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 10. Review Slack Agent                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "n8n-review-slack-agent",
    category: CAT_N8N,
    title: { nl: "Review Slack Agent", en: "Review Slack Agent" },
    description: {
      nl: "Download de complete N8N workflow JSON voor een Review Slack Agent die klantreviews analyseert en samenvat.",
      en: "Download the complete N8N workflow JSON for a Review Slack Agent that analyzes and summarizes customer reviews.",
    },
    image: "/assets/n8n-whatsapp-workflow-CZSe1MF6.png",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Hieronder vind je de JSON voor de Review Slack Agent. Let op: je kan ook via externe diensten je reviews koppelen, kom je hier niet uit, stuur me vooral een bericht!",
              en: "Below you will find the JSON for the Review Slack Agent. Note: you can also connect your reviews through external services — if you get stuck, feel free to send me a message!",
            },
          },
          ...n8nBeginnerIntro,
        ],
      },
      {
        heading: { nl: "JSON Bestand", en: "JSON File" },
        blocks: [
          {
            kind: "prompt",
            label: { nl: "n8n workflow JSON", en: "n8n workflow JSON" },
            code: { nl: reviewSlackJson, en: reviewSlackJson },
          },
        ],
      },
    ],
    downloadLinks: [N8N_GUIDE],
    youtubeUrls: [],
  },

  /* ------------------------------------------------------------------ */
  /* 11. AI Action Figure Prompt                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-action-figure-prompt",
    category: CAT_IMAGE,
    title: {
      nl: "AI Action Figure Prompt",
      en: "AI Action Figure Prompt",
    },
    description: {
      nl: "Leer hoe je met AI krachtige actiefiguur-afbeeldingen en korte video's maakt. Inclusief gedetailleerde prompts en tips.",
      en: "Learn how to create powerful action figure images and short videos with AI. Including detailed prompts and tips.",
    },
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: {
              nl: "In deze gids leer je hoe je met behulp van AI krachtige beelden en korte video's maakt. We richten ons op het creëren van een actiefiguur voor speelgoedverpakkingen. Je krijgt niet alleen een gedetailleerd prompt voor afbeeldingen, maar ook een uitleg over hoe je een video prompt moet structureren voor clips van 5 tot 10 seconden.",
              en: "In this guide you will learn how to create powerful images and short videos with the help of AI. We focus on creating an action figure for toy packaging. You will not only get a detailed prompt for images, but also an explanation of how to structure a video prompt for clips of 5 to 10 seconds.",
            },
          },
        ],
      },
      {
        heading: { nl: "Voorbereiding", en: "Preparation" },
        blocks: [
          {
            kind: "ul",
            items: [
              {
                nl: "Zorg dat je toegang hebt tot AI foto en video tools.",
                en: "Make sure you have access to AI photo and video tools.",
              },
              {
                nl: "Verzamel referentiemateriaal (foto's, schetsen, etc.) zodat de AI het karakter en de stijl correct kan nabootsen.",
                en: "Collect reference material (photos, sketches, etc.) so the AI can correctly imitate the character and the style.",
              },
              {
                nl: "Creëer een duidelijk overzicht in Notion zodat je elk onderdeel van de workflow kunt documenteren en gemakkelijk kunt delen.",
                en: "Create a clear overview in Notion so you can document every part of the workflow and share it easily.",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "Stap-voor-stap: afbeelding prompt maken",
          en: "Step-by-step: creating the image prompt",
        },
        blocks: [
          {
            kind: "h3",
            text: {
              nl: "1. Concept en referentie verzamelen",
              en: "1. Collect concept and reference",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Verzamel de foto van de persoon en eventuele aanvullende referentiebeelden om de gewenste esthetiek en details vast te leggen. Maak een notitie van de specifieke kenmerken, zoals kapsel, baard, kledingdetails en accessoires.",
              en: "Collect the photo of the person and any additional reference images to capture the desired aesthetic and details. Make a note of the specific characteristics, such as hairstyle, beard, clothing details and accessories.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "2. Prompt opstellen voor de afbeelding",
              en: "2. Write the prompt for the image",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Gebruik het volgende prompt om een dynamische en realistische actiefiguur-afbeelding te genereren:",
              en: "Use the following prompt to generate a dynamic and realistic action figure image:",
            },
          },
          {
            kind: "prompt",
            label: {
              nl: "Prompt voor ChatGPT/Afbeelding",
              en: "Prompt for ChatGPT/Image",
            },
            code: {
              nl: actionFigureImagePromptNl,
              en: actionFigureImagePromptEn,
            },
          },
          {
            kind: "h3",
            text: {
              nl: "3. Afbeelding genereren",
              en: "3. Generate the image",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Gebruik jouw favoriete AI tool (bijv. ChatGPT of Midjourney) om de afbeelding te genereren.",
                en: "Use your favorite AI tool (e.g. ChatGPT or Midjourney) to generate the image.",
              },
              {
                nl: "Stel in dat er vier beelden tegelijk worden gemaakt, zodat je meerdere variaties hebt.",
                en: "Set it to create four images at once, so you have multiple variations.",
              },
              {
                nl: "Controleer de details en pas indien nodig het prompt aan voor betere resultaten.",
                en: "Check the details and adjust the prompt if needed for better results.",
              },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "4. Nabewerking en keuze",
              en: "4. Post-processing and selection",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Bekijk alle gegenereerde beelden en kies de best presterende opties.",
                en: "Review all generated images and choose the best performing options.",
              },
              {
                nl: "Breng eventuele correcties aan via nabewerking in een tool zoals Photoshop of Canva.",
                en: "Make any corrections via post-processing in a tool such as Photoshop or Canva.",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "Stap-voor-stap: video prompt maken",
          en: "Step-by-step: creating the video prompt",
        },
        blocks: [
          {
            kind: "p",
            text: {
              nl: "Voor het creëren van een korte video (5 of 10 seconden) waarin jouw actiefiguur tot leven komt, volg deze stappen:",
              en: "To create a short video (5 or 10 seconds) in which your action figure comes to life, follow these steps:",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "1. Kernboodschap en beweging bepalen",
              en: "1. Define the core message and movement",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Bepaal wat je met de video wilt overbrengen. Denk aan een heroïsche introductie van het personage of een korte demonstratie van actie.",
                en: "Decide what you want the video to convey. Think of a heroic introduction of the character or a short demonstration of action.",
              },
              {
                nl: "Beslis welke elementen in de video prompt terug moeten komen, zoals beweging, dynamische camerahoeken en overgangseffecten.",
                en: "Decide which elements should appear in the video prompt, such as movement, dynamic camera angles and transition effects.",
              },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "2. Structuur van de video prompt",
              en: "2. Structure of the video prompt",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Een goede video prompt moet de volgende elementen bevatten:",
              en: "A good video prompt should contain the following elements:",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Introductie van het personage: Beschrijf hoe het karakter verschijnt, bijvoorbeeld door van de zijkant in beeld te komen of vanuit een close-up naar een brede scène over te gaan.",
                en: "Introduction of the character: Describe how the character appears, for example by entering the frame from the side or transitioning from a close-up to a wide scene.",
              },
              {
                nl: "Dynamische beweging: Geef aan welke bewegingen uitgevoerd moeten worden (bijvoorbeeld een krachtige zwaai van de arm, een heroïsche pose of een korte sprong).",
                en: "Dynamic movement: Specify which movements should be performed (for example a powerful arm swing, a heroic pose or a short jump).",
              },
              {
                nl: "Overgangen en effecten: Beschrijf gewenste overgangen (fade in/out, snelle snijbewegingen, etc.) en visuele effecten (kleurcorrecties, lichte dynamiek).",
                en: "Transitions and effects: Describe desired transitions (fade in/out, quick cuts, etc.) and visual effects (color corrections, light dynamics).",
              },
              {
                nl: "Achtergrond en audio: Noem welke achtergrondkleuren of effecten gewenst zijn en of er specifieke geluidseffecten of muziekintro's moeten worden geïntegreerd.",
                en: "Background and audio: Mention which background colors or effects are desired and whether specific sound effects or music intros should be integrated.",
              },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "3. Voorbeeld van een video prompt",
              en: "3. Example of a video prompt",
            },
          },
          {
            kind: "prompt",
            label: { nl: "Video Prompt voor AI", en: "Video Prompt for AI" },
            code: {
              nl: actionFigureVideoPromptNl,
              en: actionFigureVideoPromptEn,
            },
          },
          {
            kind: "h3",
            text: {
              nl: "4. Genereren en optimaliseren",
              en: "4. Generate and optimize",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Voer de prompt in bij Kling 1.6 of een vergelijkbare AI video tool (bij Freepik of Google veo2 als test).",
                en: "Enter the prompt in Kling 1.6 or a comparable AI video tool (in Freepik or Google Veo 2 as a test).",
              },
              {
                nl: "Bekijk de output en pas de prompt aan om de gewenste snelheid, effect en kwaliteit te bereiken.",
                en: "Review the output and adjust the prompt to achieve the desired speed, effect and quality.",
              },
              {
                nl: "Herhaal indien nodig en kies de video met de beste impact.",
                en: "Repeat if necessary and choose the video with the best impact.",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "Tips en best practices",
          en: "Tips and best practices",
        },
        blocks: [
          {
            kind: "ul",
            items: [
              {
                nl: "Wees specifiek: Hoe specifieker je prompt, hoe nauwkeuriger het resultaat. Vermeld details zoals kledingkleuren, houdingen en gewenste effecten.",
                en: "Be specific: The more specific your prompt, the more accurate the result. Mention details such as clothing colors, poses and desired effects.",
              },
              {
                nl: "Iteratief werken: Genereer meerdere varianten en selecteer de beste beelden/video's. Kleine aanpassingen in het prompt kunnen grote verschillen maken.",
                en: "Work iteratively: Generate multiple variants and select the best images/videos. Small adjustments to the prompt can make big differences.",
              },
              {
                nl: "Gebruik referenties: Voeg indien mogelijk een afbeelding of video toe als referentie zodat de AI beter kan begrijpen wat je exact zoekt.",
                en: "Use references: If possible, add an image or video as a reference so the AI can better understand exactly what you are looking for.",
              },
              {
                nl: "Test diverse tools: Maak gebruik van verschillende AI tools om te zien welke het beste resultaat levert voor jouw specifieke stijl en wensen.",
                en: "Test various tools: Use different AI tools to see which one delivers the best result for your specific style and wishes.",
              },
              {
                nl: "Documenteer je workflow: Houd in Notion een overzicht bij van de gebruikte prompts en resultaten, zodat je in de toekomst eenvoudig verbeteringen kunt doorvoeren of inspiratie kunt opdoen.",
                en: "Document your workflow: Keep an overview in Notion of the prompts used and the results, so you can easily make improvements or find inspiration in the future.",
              },
            ],
          },
        ],
      },
      {
        heading: {
          nl: "Veelgestelde vragen (FAQ) over prompten",
          en: "Frequently asked questions (FAQ) about prompting",
        },
        blocks: [
          {
            kind: "h3",
            text: {
              nl: "1. Waarom is een duidelijke prompt belangrijk?",
              en: "1. Why is a clear prompt important?",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Een duidelijke en gedetailleerde prompt zorgt ervoor dat de AI precies weet wat er verwacht wordt, wat resulteert in meer nauwkeurige en bevredigende output. Specifieke details zoals kleding, houdingen en achtergronddetails dragen bij aan een realistisch eindresultaat.",
              en: "A clear and detailed prompt ensures the AI knows exactly what is expected, resulting in more accurate and satisfying output. Specific details such as clothing, poses and background details contribute to a realistic end result.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "2. Hoe kan ik mijn prompt verbeteren als ik niet het gewenste resultaat krijg?",
              en: "2. How can I improve my prompt if I do not get the desired result?",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Begin met het toevoegen van meer specifieke details.",
                en: "Start by adding more specific details.",
              },
              {
                nl: "Laat zien wat voor referentiebeelden je in gedachten hebt.",
                en: "Show what kind of reference images you have in mind.",
              },
              {
                nl: "Experimenteer met verschillende synoniemen en beschrijvingen van de gewenste acties of effecten.",
                en: "Experiment with different synonyms and descriptions of the desired actions or effects.",
              },
              {
                nl: "Schakel eventueel feedback van anderen in om te bekijken of zij extra details herkennen die je kunt toevoegen.",
                en: "Consider asking others for feedback to see whether they spot extra details you can add.",
              },
            ],
          },
          {
            kind: "h3",
            text: {
              nl: "3. Wat als de output niet realistisch genoeg is?",
              en: "3. What if the output is not realistic enough?",
            },
          },
          {
            kind: "p",
            text: {
              nl: "Controleer of je prompt realistische beschrijvingen bevat en verwijs naar echte referentiebeelden. Soms kan het helpen om de prompt op te splitsen in stappen of eerst een testversie te genereren en deze te evalueren.",
              en: "Check whether your prompt contains realistic descriptions and refer to real reference images. Sometimes it helps to split the prompt into steps or to generate a test version first and evaluate it.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "4. Hoe kan ik een video prompt formuleren voor korte clips?",
              en: "4. How do I formulate a video prompt for short clips?",
            },
          },
          {
            kind: "p",
            text: {
              nl: "De sleutel is om de startpositie, de gewenste beweging en de overgangseffecten duidelijk te beschrijven. Denk na over hoe je het personage in de eerste seconden wilt introduceren, welke acties kort moeten worden weergegeven en hoe je de overgang naar het einde van de clip soepel maakt.",
              en: "The key is to clearly describe the starting position, the desired movement and the transition effects. Think about how you want to introduce the character in the first seconds, which actions should be shown briefly and how to make the transition to the end of the clip smooth.",
            },
          },
          {
            kind: "h3",
            text: {
              nl: "5. Zijn er specifieke tips voor het werken met Kling 1.6?",
              en: "5. Are there specific tips for working with Kling 1.6?",
            },
          },
          {
            kind: "ul",
            items: [
              {
                nl: "Maak gebruik van de tool's mogelijkheden door exact 5 of 10 seconden op te geven.",
                en: "Make use of the tool's capabilities by specifying exactly 5 or 10 seconds.",
              },
              {
                nl: "Focus op details in de overgangseffecten en dynamische bewegingen.",
                en: "Focus on details in the transition effects and dynamic movements.",
              },
              {
                nl: "Experimenteer met lichte variaties in je prompt om te zien welke versie de beste visuele impact biedt.",
                en: "Experiment with slight variations in your prompt to see which version offers the best visual impact.",
              },
            ],
          },
        ],
      },
    ],
    downloadLinks: [],
    youtubeUrls: [],
  },
];

export function getFreebie(slug: string): Freebie | undefined {
  return freebies.find((f) => f.slug === slug);
}
