/**
 * Alle vacatures in NL + EN, letterlijk overgenomen van de oude site.
 * De Fillout formId's komen uit de sollicitatieformulieren per vacature.
 */

export type VacatureAanbod = {
  /** Grote regel op de kaart, bv. "Verdien tot €4.200 per maand". */
  titel: string;
  /** Kicker erboven, bv. "Jouw salaris". */
  label: string;
};

export type VacatureStap = {
  /** Staptitel, bv. "Kennismakingsgesprek 📞". CTO-toets heeft geen titels. */
  titel?: string;
  tekst: string;
};

export type Vacature = {
  slug: string;
  slugEn: string;
  badge?: string;
  badgeEn?: string;
  titel: string;
  titelEn: string;
  /** Bv. "Junior of Medior" of "Stage"; niet elke rol heeft een niveau. */
  niveau?: string;
  niveauEn?: string;
  categorie: string;
  categorieEn: string;
  tagline: string;
  taglineEn: string;
  /** Korte omschrijving op de overzichtskaart. */
  kaartTekst: string;
  kaartTekstEn: string;
  locatie: string;
  uren: string;
  urenEn: string;
  filloutFormId: string;
  intro: string[];
  introEn: string[];
  aanbod: VacatureAanbod[];
  aanbodEn: VacatureAanbod[];
  match: string[];
  matchEn: string[];
  matchOutro?: string;
  matchOutroEn?: string;
  werkdagTitel: string;
  werkdagTitelEn: string;
  werkdag: string[];
  werkdagEn: string[];
  werkdagOutro?: string;
  werkdagOutroEn?: string;
  procesTitel: string;
  procesTitelEn: string;
  proces: VacatureStap[];
  procesEn: VacatureStap[];
  procesOutro?: string[];
  procesOutroEn?: string[];
};

export const vacatures: Vacature[] = [
  {
    slug: "ai-developer",
    slugEn: "ai-developer",
    badge: "NIEUW!",
    badgeEn: "NEW!",
    titel: "AI Developer",
    titelEn: "AI Developer",
    niveau: "Junior of Medior",
    niveauEn: "Junior or Mid-level",
    categorie: "Development",
    categorieEn: "Development",
    tagline: "Van vibe-coding naar productie. Van prompt naar product.",
    taglineEn: "From vibe coding to production. From prompt to product.",
    kaartTekst:
      "Van vibe-coding naar productie. Van prompt naar product. We zoeken een developer die snapt wat er onder de motorkap van een AI-automatisering gebeurt.",
    kaartTekstEn:
      "From vibe coding to production. From prompt to product. We're looking for a developer who understands what's happening under the hood of an AI automation.",
    locatie: "Amsterdam",
    uren: "32-40 uur",
    urenEn: "32-40 hours",
    filloutFormId: "hXCbeCFzYFus",
    intro: [
      'We zoeken een developer die snapt wat er onder de motorkap van een AI-automatisering gebeurt — en die het ook écht kan bouwen. Geen "ik heb een keer met ChatGPT een script gemaakt". Wel: jij hebt n8n-flows draaien die geld besparen, je hebt een database opgezet die niet omvalt bij de eerste echte klant, en je weet wanneer een no-code oplossing moet worden vervangen door echte code.',
    ],
    introEn: [
      'We\'re looking for a developer who understands what\'s happening under the hood of an AI automation — and can actually build it. Not "I once made a script with ChatGPT". Rather: you have n8n flows running that save money, you\'ve set up a database that doesn\'t crash with the first real client, and you know when a no-code solution needs to be replaced by real code.',
    ],
    aanbod: [
      { titel: "Verdien tot €4.200 per maand", label: "Jouw salaris" },
      { titel: "Blijf niet stilstaan", label: "Jouw groei" },
      { titel: "Werk met vrijheid en impact", label: "Jouw omgeving" },
    ],
    aanbodEn: [
      { titel: "Earn up to €4,200 per month", label: "Your salary" },
      { titel: "Never stop growing", label: "Your growth" },
      { titel: "Work with freedom and impact", label: "Your environment" },
    ],
    match: [
      "Diepe ervaring met n8n (niet alleen drag-and-drop) en bewezen werk met JavaScript, JSON, Node en React.",
      "Hands-on ervaring met LLM-API's (OpenAI, Anthropic, OpenRouter) en RAG / vector stores.",
      'Bewijs. Een GitHub, een Loom, een n8n-export, een live demo — iets waarvan wij kunnen zeggen: "ja, dit heeft hij/zij echt zelf gebouwd".',
      "Je werkt zelfstandig, vraagt op tijd om hulp en levert af.",
      "Junior of medior, dat maakt ons niet uit — niveau wel.",
    ],
    matchEn: [
      "Deep experience with n8n (not just drag-and-drop) and proven work with JavaScript, JSON, Node and React.",
      "Hands-on experience with LLM APIs (OpenAI, Anthropic, OpenRouter) and RAG / vector stores.",
      'Proof. A GitHub, a Loom, an n8n export, a live demo — something we can look at and say: "yes, they actually built this themselves".',
      "You work independently, ask for help on time and deliver.",
      "Junior or mid-level, we don't care — quality does.",
    ],
    matchOutro:
      "Voldoe je niet aan alles? Geen probleem — maar wees eerlijk naar jezelf of dit écht bij je past.",
    matchOutroEn:
      "Don't meet all criteria? No problem — but be honest with yourself about whether this is truly for you.",
    werkdagTitel: "Hoe ziet je werkdag eruit?",
    werkdagTitelEn: "What does your workday look like?",
    werkdag: [
      "Je bouwt AI-agents en automatiseringen voor onze klanten — vanaf week één draait jouw werk in productie.",
      "Je vertaalt een idee van de founder of klant naar iets dat schaalt, logt en niet omvalt.",
      "Je pakt vibe-coded prototypes en maakt er echte producten van: nette code, foutafhandeling, onderhoudbaar.",
      "Je bouwt en beheert databases (Supabase / Postgres) en koppelingen via API's en webhooks.",
      "Je experimenteert met nieuwe modellen, MCP-servers en frameworks — en deelt wat werkt met het team.",
    ],
    werkdagEn: [
      "You build AI agents and automations for our clients — from week one your work runs in production.",
      "You translate an idea from the founder or client into something that scales, logs and doesn't break.",
      "You take vibe-coded prototypes and turn them into real products: clean code, error handling, maintainable.",
      "You build and manage databases (Supabase / Postgres) and integrations via APIs and webhooks.",
      "You experiment with new models, MCP servers and frameworks — and share what works with the team.",
    ],
    procesTitel: "Sollicitatieproces",
    procesTitelEn: "Application process",
    proces: [
      {
        titel: "Kennismakingsgesprek 📞",
        tekst:
          "We plannen een gesprek in om elkaar te leren kennen en praten verder over de vacature. Dit kan online, fysiek of soms beide zijn!",
      },
      {
        titel: "Selectie 🤝",
        tekst:
          "We vragen je om iets van je werk te laten zien, maar kunnen je ook vragen om een opdracht voor ons uit te voeren om zo je kwaliteiten te laten zien. Dit is fysiek bij ons op kantoor.",
      },
      {
        titel: "Aangenomen! 🎉",
        tekst:
          "We bieden je een contract aan en je start met je eerste project. Gefeliciteerd!",
      },
    ],
    procesEn: [
      {
        titel: "Introduction call 📞",
        tekst:
          "We schedule a conversation to get to know each other and discuss the vacancy. This can be online, in person, or sometimes both!",
      },
      {
        titel: "Selection 🤝",
        tekst:
          "We ask you to show some of your work, but may also ask you to complete an assignment to demonstrate your qualities. This takes place at our office.",
      },
      {
        titel: "Hired! 🎉",
        tekst:
          "We offer you a contract and you start your first project. Congratulations!",
      },
    ],
  },
  {
    slug: "ai-developer-stage",
    slugEn: "ai-developer-internship",
    badge: "NIEUW!",
    badgeEn: "NEW!",
    titel: "AI Developer",
    titelEn: "AI Developer",
    niveau: "Stage",
    niveauEn: "Internship",
    categorie: "Development",
    categorieEn: "Development",
    tagline: "Van vibe-coding naar productie. Van prompt naar product.",
    taglineEn: "From vibe coding to production. From prompt to product.",
    kaartTekst:
      "Leer n8n, AI-agents en automatiseringen bouwen in een startup-omgeving. Van intern project naar echte klanten.",
    kaartTekstEn:
      "Learn to build n8n, AI agents and automations in a startup environment. From internal projects to real clients.",
    locatie: "Amsterdam",
    uren: "32-40 uur",
    urenEn: "32-40 hours",
    filloutFormId: "hXCbeCFzYFus",
    intro: [
      'We zoeken een stagiair die nieuwsgierig is naar wat er onder de motorkap van een AI-automatisering gebeurt — en die het wíl leren bouwen. Geen "ik heb een keer met ChatGPT een script gemaakt". Wel: je hebt al eens geëxperimenteerd met n8n of automation tools, je snapt wat een database doet, en je wilt leren wanneer een no-code oplossing moet worden vervangen door echte code.',
    ],
    introEn: [
      'We\'re looking for an intern who\'s curious about what\'s happening under the hood of an AI automation — and wants to learn to build it. Not "I once made a script with ChatGPT". Rather: you\'ve already experimented with n8n or automation tools, you understand what a database does, and you want to learn when a no-code solution needs to be replaced by real code.',
    ],
    aanbod: [
      { titel: "Stagevergoeding", label: "Jouw vergoeding" },
      { titel: "Leer meer dan in elk vak", label: "Jouw groei" },
      { titel: "Startup omgeving met impact", label: "Jouw omgeving" },
    ],
    aanbodEn: [
      { titel: "Internship compensation", label: "Your compensation" },
      { titel: "Learn more than any course", label: "Your growth" },
      { titel: "Startup environment with impact", label: "Your environment" },
    ],
    match: [
      "Interesse in n8n of vergelijkbare automation tools en basiskennis van JavaScript, JSON of Python.",
      "Nieuwsgierigheid naar LLM's (OpenAI, Anthropic, OpenRouter) en hoe je ze kunt inzetten in workflows.",
      "Iets om te laten zien. Een GitHub-project, een zijproject, een demo — iets waaruit blijkt dat je graag bouwt.",
      "Je bent leergierig, vraagt op tijd om hulp en wilt groeien als developer.",
      "Je volgt een relevante opleiding (HBO/WO) of bent autodidact met aantoonbare projectervaring.",
    ],
    matchEn: [
      "Interest in n8n or similar automation tools and basic knowledge of JavaScript, JSON or Python.",
      "Curiosity about LLMs (OpenAI, Anthropic, OpenRouter) and how to use them in workflows.",
      "Something to show. A GitHub project, a side project, a demo — something that shows you love to build.",
      "You're eager to learn, ask for help on time and want to grow as a developer.",
      "You're studying a relevant degree (BSc/MSc) or are self-taught with demonstrable project experience.",
    ],
    matchOutro:
      "Voldoe je niet aan alles? Geen probleem — maar wees eerlijk naar jezelf of dit écht bij je past.",
    matchOutroEn:
      "Don't meet all criteria? No problem — but be honest with yourself about whether this is truly for you.",
    werkdagTitel: "Hoe ziet je werkdag eruit?",
    werkdagTitelEn: "What does your workday look like?",
    werkdag: [
      "Leren n8n te gebruiken en toe te passen — je begint met interne opdrachten en ondersteunt onze developers.",
      "Je bouwt AI-agents en automatiseringen voor onze klanten — vanaf week één draait jouw werk in productie.",
      "Je vertaalt een idee van de founder of klant naar iets dat schaalt, logt en niet omvalt.",
      "Je pakt vibe-coded prototypes en maakt er echte producten van: nette code, foutafhandeling, onderhoudbaar.",
      "Je bouwt en beheert databases (Supabase / Postgres) en koppelingen via API's en webhooks.",
      "Je experimenteert met nieuwe modellen, MCP-servers en frameworks — en deelt wat werkt met het team.",
    ],
    werkdagEn: [
      "Learn to use and apply n8n — you start with internal assignments and support our developers.",
      "You build AI agents and automations for our clients — from week one your work runs in production.",
      "You translate an idea from the founder or client into something that scales, logs and doesn't break.",
      "You take vibe-coded prototypes and turn them into real products: clean code, error handling, maintainable.",
      "You build and manage databases (Supabase / Postgres) and integrations via APIs and webhooks.",
      "You experiment with new models, MCP servers and frameworks — and share what works with the team.",
    ],
    procesTitel: "Sollicitatieproces",
    procesTitelEn: "Application process",
    proces: [
      {
        titel: "Kennismakingsgesprek 📞",
        tekst:
          "We plannen een gesprek in om elkaar te leren kennen en praten verder over de vacature. Dit kan online, fysiek of soms beide zijn!",
      },
      {
        titel: "Aangenomen! 🎉",
        tekst:
          "We bieden je een contract aan en je start met je eerste project. Gefeliciteerd!",
      },
    ],
    procesEn: [
      {
        titel: "Introduction call 📞",
        tekst:
          "We schedule a conversation to get to know each other and discuss the vacancy. This can be online, in person, or sometimes both!",
      },
      {
        titel: "Hired! 🎉",
        tekst:
          "We offer you a contract and you start your first project. Congratulations!",
      },
    ],
  },
  {
    slug: "cto",
    slugEn: "cto",
    badge: "NIEUW!",
    badgeEn: "NEW!",
    titel: "CTO",
    titelEn: "CTO",
    categorie: "Development / Operatie",
    categorieEn: "Development / Operations",
    tagline: "Bouw mee aan de technische ruggengraat van NinA.",
    taglineEn: "Help build the technical backbone of NinA.",
    kaartTekst:
      "Sta naast de founder en bouw mee aan de technische toekomst van NinA AI Agency. Geen vergader-CTO, maar hands-on.",
    kaartTekstEn:
      "Stand alongside the founder and help build the technical future of NinA AI Agency. Not a meeting CTO, but hands-on.",
    locatie: "Amsterdam",
    uren: "40 uur",
    urenEn: "40 hours",
    filloutFormId: "nAMtH426CPus",
    intro: [
      "Lees deze tekst twee keer voordat je solliciteert.",
      "Dit is een nieuwe rol. Ik ben de founder en ik ben er eerlijk over: ik ben banger voor de verkeerde CTO dan voor géén CTO. Ik heb in de markt te veel mensen gezien die een CTO-titel dragen omdat ze ooit een team hebben aangestuurd, een keer een architectuurplaatje hebben getekend, en sindsdien vooral vergaderen. Dat is hier niet de rol.",
    ],
    introEn: [
      "Read this text twice before you apply.",
      "This is a new role. I'm the founder and I'll be honest: I'm more afraid of the wrong CTO than no CTO. I've seen too many people in the market carrying a CTO title because they once managed a team, once drew an architecture diagram, and have mostly been in meetings since. That's not the role here.",
    ],
    aanbod: [
      { titel: "Verdien tot €6.000 per maand", label: "Jouw salaris" },
      { titel: "Aandelen & groei", label: "Jouw toekomst" },
      { titel: "Naast de founder", label: "Jouw positie" },
    ],
    aanbodEn: [
      { titel: "Earn up to €6,000 per month", label: "Your salary" },
      { titel: "Shares & growth", label: "Your future" },
      { titel: "Next to the founder", label: "Your position" },
    ],
    match: [
      "Aantoonbare ervaring als brug tussen klant en developmentteam in een agency, scale-up of consultancy.",
      "Diepe, actuele kennis van de AI-stack van 2026: LLM's, agents, RAG, automatiseringen, en de tools eromheen.",
      "Hands-on instelling. Je vindt het normaal om zelf nog een prototype te bouwen om iets te bewijzen.",
      "Commercieel inzicht: je begrijpt dat een goede technische keuze ook een goede business-keuze moet zijn.",
      "De ambitie om mee te bouwen aan een bedrijf, niet om er een te onderhouden.",
    ],
    matchEn: [
      "Proven experience as a bridge between client and development team in an agency, scale-up or consultancy.",
      "Deep, current knowledge of the 2026 AI stack: LLMs, agents, RAG, automations, and the tools around them.",
      "Hands-on attitude. You find it normal to still build a prototype yourself to prove something.",
      "Commercial insight: you understand that a good technical choice must also be a good business choice.",
      "The ambition to help build a company, not to maintain one.",
    ],
    werkdagTitel: "Hoe ziet je werkdag eruit?",
    werkdagTitelEn: "What does your workday look like?",
    werkdag: [
      "Je staat naast onze founder Olaf Lemmens.",
      "Je zit met klanten aan tafel en weet binnen een uur wat er gebouwd moet worden, en wat juist níet.",
      "Je vertaalt die klantvraag naar heldere opdrachten voor onze developers, zonder dat er onderweg dingen zoekraken.",
      "Je bewaakt de technische kwaliteit: je leest nog code, opent nog n8n, reviewt nog PR's.",
      "Je bouwt mee aan onze interne stack, ons team en onze manier van werken.",
      "Je groeit mee met het bedrijf.",
    ],
    werkdagEn: [
      "You stand alongside our founder Olaf Lemmens.",
      "You sit with clients and within an hour know what needs to be built, and what doesn't.",
      "You translate that client request into clear assignments for our developers, without things getting lost along the way.",
      "You safeguard technical quality: you still read code, still open n8n, still review PRs.",
      "You help build our internal stack, our team and our way of working.",
      "You grow with the company.",
    ],
    procesTitel: "De toets — hier in deze tekst",
    procesTitelEn: "The test — right here in this text",
    proces: [
      {
        tekst:
          "Beschrijf in maximaal tien zinnen een project waarin jij persoonlijk de brug was tussen een klant en een developmentteam, en wat er mis was gegaan als jij er níet was geweest. Concreet, met namen en getallen.",
      },
      {
        tekst:
          "Vertel welke AI-stack je vandaag zou kiezen voor een agency dat agents en automatiseringen bouwt voor het MKB, en waarom. Één alinea. Geen lijstje van hippe tools, een keuze met onderbouwing.",
      },
      {
        tekst:
          "Vertel wat je over drie jaar wilt zijn, en waarom NinA daar de juiste plek voor is. Als dit antwoord ook bij vijf andere bedrijven past, is het niet het juiste antwoord.",
      },
    ],
    procesEn: [
      {
        tekst:
          "Describe in no more than ten sentences a project where you personally were the bridge between a client and a development team, and what would have gone wrong if you hadn't been there. Concrete, with names and numbers.",
      },
      {
        tekst:
          "Tell us which AI stack you'd choose today for an agency building agents and automations for SMBs, and why. One paragraph. No list of trendy tools, a choice with reasoning.",
      },
      {
        tekst:
          "Tell us what you want to be in three years, and why NinA is the right place for that. If this answer also fits five other companies, it's not the right answer.",
      },
    ],
    procesOutro: [
      "⚠️ Deze opdracht is verplicht bij solliciteren, dus upload hem ook in je aanmelding.",
      "Geen motivatiebrief uit een template. Krijg ik die toch, dan weet ik genoeg. Wat je niet krijgt is een uitgestippeld pad. Dat schrijf je samen met mij.",
    ],
    procesOutroEn: [
      "⚠️ This assignment is mandatory when applying, so upload it with your application.",
      "No cover letter from a template. If I get one anyway, I know enough. What you won't get is a mapped-out path. You write that together with me.",
    ],
  },
  {
    slug: "ai-success-manager",
    slugEn: "ai-success-manager",
    badge: "NIEUW!",
    badgeEn: "NEW!",
    titel: "AI Success Manager",
    titelEn: "AI Success Manager",
    categorie: "Operatie",
    categorieEn: "Operations",
    tagline: "De spil tussen klant en team. Van vraag naar impact.",
    taglineEn: "The pivot between client and team. From question to impact.",
    kaartTekst:
      "Bij NinA AI Agency zoeken we iemand met technische kennis die de spil is tussen onze klanten en developers.",
    kaartTekstEn:
      "At NinA AI Agency, we're looking for someone with technical knowledge who is the pivot between our clients and developers.",
    locatie: "Amsterdam",
    uren: "24-40 uur",
    urenEn: "24-40 hours",
    filloutFormId: "ne43GnkYXtus",
    intro: [
      "Bij NinA AI bouwen we maatwerk AI-oplossingen voor bedrijven die klaar zijn voor de volgende stap. We zijn niet zomaar een leverancier, maar een AI-partner: we brengen kennis, advies en implementatie samen. Onze klanten zien ons als verlengstuk van hun eigen team – en dat maakt ons werk dynamisch, uitdagend en impactvol.",
      "Als AI Success Manager ben jij de spil tussen onze developers en onze klanten. Jij vertaalt wat de klant écht nodig heeft naar concrete oplossingen en zorgt dat het ontwikkelteam precies weet wat er gebouwd moet worden. Je volgt projecten van A tot Z en bewaakt de voortgang, verwachtingen en kwaliteit.",
      "In deze rol werk je nauw samen met klanten in uiteenlopende sectoren. Je snapt hun business, stelt de juiste vragen en kunt complexe AI-concepten begrijpelijk uitleggen. Tegelijkertijd houd je ons team scherp en gefocust, zodat we telkens weer projecten opleveren die waarde toevoegen.",
    ],
    introEn: [
      "At NinA AI, we build custom AI solutions for companies ready for the next step. We're not just a supplier, but an AI partner: we bring knowledge, advice, and implementation together. Our clients see us as an extension of their own team – and that makes our work dynamic, challenging, and impactful.",
      "As AI Success Manager, you are the pivot between our developers and our clients. You translate what the client really needs into concrete solutions and ensure the development team knows exactly what needs to be built. You follow projects from A to Z and monitor progress, expectations, and quality.",
      "In this role, you work closely with clients in various sectors. You understand their business, ask the right questions, and can explain complex AI concepts in an understandable way. At the same time, you keep our team sharp and focused, so we consistently deliver projects that add value.",
    ],
    aanbod: [
      { titel: "Salaris tot €4.200 per maand", label: "Jouw salaris" },
      { titel: "Groei met ons mee", label: "Jouw groei" },
      { titel: "Werk met vrijheid en impact", label: "Jouw omgeving" },
    ],
    aanbodEn: [
      { titel: "Salary up to €4,200 per month", label: "Your salary" },
      { titel: "Grow with us", label: "Your growth" },
      { titel: "Work with freedom and impact", label: "Your environment" },
    ],
    match: [
      "Ervaring in een rol op het snijvlak van tech en klantrelatie (bijv. projectmanager, consultant of product owner)",
      "Affiniteit met AI en technologie (je hoeft geen developer te zijn, maar snapt de basics)",
      "Sterke communicatieve vaardigheden: je spreekt zowel de taal van de klant als die van de developer",
      "Organisatorisch talent en gevoel voor prioriteit",
      "Enthousiasme om mee te bouwen aan een startup in volle groei",
    ],
    matchEn: [
      "Experience in a role at the intersection of tech and client relations (e.g., project manager, consultant, or product owner)",
      "Affinity with AI and technology (you don't need to be a developer, but understand the basics)",
      "Strong communication skills: you speak both the language of the client and the developer",
      "Organizational talent and sense of priority",
      "Enthusiasm to help build a startup in full growth",
    ],
    werkdagTitel: "Wat ga je doen?",
    werkdagTitelEn: "What will you do?",
    werkdag: [
      "Klantwensen vertalen naar duidelijke projectplannen en requirements",
      "Schakel zijn tussen klant en development team",
      "Projectvoortgang bewaken en zorgen dat deadlines gehaald worden",
      "Klanten begeleiden in het gebruik en de implementatie van AI-oplossingen",
      "Feedback ophalen en continu verbeteren van processen en resultaten",
    ],
    werkdagEn: [
      "Translate customer needs into clear project plans and requirements",
      "Be the link between client and development team",
      "Monitor project progress and ensure deadlines are met",
      "Guide clients in the use and implementation of AI solutions",
      "Gather feedback and continuously improve processes and results",
    ],
    procesTitel: "Sollicitatieproces",
    procesTitelEn: "Application process",
    proces: [
      {
        titel: "Kennismakingsgesprek 📞",
        tekst:
          "We plannen een gesprek in om elkaar te leren kennen en praten verder over de vacature. Dit kan online, fysiek of soms beide zijn!",
      },
      {
        titel: "Selectie 🤝",
        tekst:
          "We vragen je om iets van je werk te laten zien, maar kunnen je ook vragen om een opdracht voor ons uit te voeren om zo je kwaliteiten te laten zien. Dit is fysiek bij ons op kantoor.",
      },
      {
        titel: "Aangenomen! 🎉",
        tekst:
          "We bieden je een contract aan en je start met je eerste project. Gefeliciteerd!",
      },
    ],
    procesEn: [
      {
        titel: "Introduction call 📞",
        tekst:
          "We schedule a conversation to get to know each other and discuss the vacancy. This can be online, in person, or sometimes both!",
      },
      {
        titel: "Selection 🤝",
        tekst:
          "We ask you to show some of your work, but may also ask you to complete an assignment to demonstrate your qualities. This takes place at our office.",
      },
      {
        titel: "Hired! 🎉",
        tekst:
          "We offer you a contract and you start your first project. Congratulations!",
      },
    ],
  },
  {
    slug: "sdr",
    slugEn: "sdr",
    badge: "NIEUW!",
    badgeEn: "NEW!",
    titel: "SDR",
    titelEn: "SDR",
    categorie: "Sales & Marketing",
    categorieEn: "Sales & Marketing",
    tagline: "Jij belt. Wij bouwen. Samen groeien we hard.",
    taglineEn: "You call. We build. Together we grow fast.",
    kaartTekst:
      "Jij belt. Wij bouwen. Samen groeien we hard. We zoeken iemand die consequent de telefoon pakt.",
    kaartTekstEn:
      "You call. We build. Together we grow fast. We're looking for someone who consistently picks up the phone.",
    locatie: "Amsterdam",
    uren: "32-40 uur",
    urenEn: "32-40 hours",
    filloutFormId: "snpCkKEjCVus",
    intro: [
      'NinA AI Agency is een van de snelst groeiende AI-bureaus van Nederland. We bouwen AI-agents en automatiseringen voor bedrijven die klaar zijn met "ooit eens iets met AI doen". Onze inbound groeit hard via LinkedIn, eigen workshops maar ook TikTok. En eerlijk: we laten te veel liggen omdat niemand consequent de telefoon pakt. Daar kom jij in beeld.',
    ],
    introEn: [
      'NinA AI Agency is one of the fastest growing AI agencies in the Netherlands. We build AI agents and automations for companies that are done with "someday doing something with AI". Our inbound is growing fast via LinkedIn, our own workshops and TikTok. And honestly: we\'re leaving too much on the table because nobody consistently picks up the phone. That\'s where you come in.',
    ],
    aanbod: [
      { titel: "Tot €3.800 + ongelimiteerde bonus", label: "Jouw salaris" },
      { titel: "Bouw je eigen sales-motor", label: "Jouw groei" },
      { titel: "B. Amsterdam, padel & café", label: "Jouw omgeving" },
    ],
    aanbodEn: [
      { titel: "Up to €3,800 + unlimited bonus", label: "Your salary" },
      { titel: "Build your own sales engine", label: "Your growth" },
      { titel: "B. Amsterdam, padel & café", label: "Your environment" },
    ],
    match: [
      'Je pakt de telefoon op. Niet "ook wel". Echt. Elke dag.',
      "Je bent nieuwsgierig naar AI, of je bent bereid je dat in maand één eigen te maken.",
      "Je bent commercieel, kunt goed luisteren en weet dat de vijfde poging vaak de eerste echte is.",
      "Nederlands op moedertaalniveau, Engels is onze interne voertaal.",
      "Eerste sales-ervaring is mooi meegenomen, maar niet verplicht — mentaliteit weegt zwaarder.",
    ],
    matchEn: [
      'You pick up the phone. Not "sometimes". Really. Every day.',
      "You're curious about AI, or you're willing to make it your own in month one.",
      "You're commercial, can listen well and know that the fifth attempt is often the first real one.",
      "Dutch at native level, English is our internal working language.",
      "Initial sales experience is nice to have, but not required — mentality weighs heavier.",
    ],
    werkdagTitel: "Wat ga je doen?",
    werkdagTitelEn: "What will you do?",
    werkdag: [
      "Je belt warme leads die binnenkomen via LinkedIn, TikTok en de website, diezelfde dag nog.",
      "Je belt koud waar het moet, en je bent niet bang voor een nee.",
      "Je kwalificeert leads en plant kwalitatieve demo-afspraken in voor de founder.",
      "Je houdt het CRM strak bij zodat we weten wat werkt en wat niet.",
      "Je denkt mee over scripts, sequences en outreach-experimenten en test ze zelf.",
    ],
    werkdagEn: [
      "You call warm leads coming in via LinkedIn, TikTok and the website, that same day.",
      "You cold call where needed, and you're not afraid of a no.",
      "You qualify leads and schedule quality demo appointments for the founder.",
      "You keep the CRM tight so we know what works and what doesn't.",
      "You think along about scripts, sequences and outreach experiments and test them yourself.",
    ],
    werkdagOutro: "Niet solliciteren als je liever mailt dan belt. Echt niet doen.",
    werkdagOutroEn: "Don't apply if you'd rather email than call. Seriously, don't.",
    procesTitel: "Sollicitatieproces",
    procesTitelEn: "Application process",
    proces: [
      {
        titel: "Kennismakingsgesprek 📞",
        tekst:
          "We plannen een gesprek in om elkaar te leren kennen en praten verder over de vacature. Dit kan online, fysiek of soms beide zijn!",
      },
      {
        titel: "Selectie 🤝",
        tekst:
          "We vragen je om iets van je werk te laten zien, maar kunnen je ook vragen om een opdracht voor ons uit te voeren om zo je kwaliteiten te laten zien. Dit is fysiek bij ons op kantoor.",
      },
      {
        titel: "Aangenomen! 🎉",
        tekst:
          "We bieden je een contract aan en je start met je eerste project. Gefeliciteerd!",
      },
    ],
    procesEn: [
      {
        titel: "Introduction call 📞",
        tekst:
          "We schedule a conversation to get to know each other and discuss the vacancy. This can be online, in person, or sometimes both!",
      },
      {
        titel: "Selection 🤝",
        tekst:
          "We ask you to show some of your work, but may also ask you to complete an assignment to demonstrate your qualities. This takes place at our office.",
      },
      {
        titel: "Hired! 🎉",
        tekst:
          "We offer you a contract and you start your first project. Congratulations!",
      },
    ],
  },
  {
    slug: "marketing-en-operations",
    slugEn: "marketing-and-operations",
    titel: "Marketing en Operations",
    titelEn: "Marketing and Operations",
    categorie: "Sales & Marketing",
    categorieEn: "Sales & Marketing",
    tagline: "De spil van onze organisatie. Van events tot operations.",
    taglineEn: "The linchpin of our organization. From events to operations.",
    kaartTekst:
      "Je bent een marketeer, organiseert graag events en bent gestructureerd en ambitieus.",
    kaartTekstEn:
      "You're a marketer, love organizing events and are structured and ambitious.",
    locatie: "Amsterdam",
    uren: "32-40 uur",
    urenEn: "32-40 hours",
    filloutFormId: "g3jcjt9DxCus",
    intro: [
      "Bij NinA AI Agency, een toonaangevende AI Agency, ervaren we een snelle groei en we breiden ons team uit. We zoeken iemand voor onze dynamische Marketing en Operations rol die niet alleen onze dagelijkse operaties efficiënt kan managen, maar ook onze marketinginspanningen naar een hoger niveau kan tillen.",
      "Als onze Marketing en Operations ben je de spil in het web van onze organisatie. Je bent verantwoordelijk voor het soepel laten verlopen van onze dagelijkse activiteiten en het verbeteren van onze processen. Daarnaast speel je een cruciale rol in het organiseren en marketen van onze webinars en live events, het onderhouden van relaties met klanten en leads, en het beheren van onze advertentiecampagnes.",
    ],
    introEn: [
      "At NinA AI Agency, a leading AI Agency, we are experiencing rapid growth and expanding our team. We are looking for someone for our dynamic Marketing and Operations role who can not only efficiently manage our daily operations but also elevate our marketing efforts to the next level.",
      "As our Marketing and Operations person, you are the linchpin of our organization. You are responsible for the smooth running of our daily activities and improving our processes. Additionally, you play a crucial role in organizing and marketing our webinars and live events, maintaining relationships with customers and leads, and managing our advertising campaigns.",
    ],
    aanbod: [
      { titel: "Salaris tot €3.500 + opties", label: "Jouw salaris" },
      { titel: "Groei naar CMO of COO", label: "Jouw groei" },
      { titel: "Vrijheid en verantwoordelijkheid", label: "Jouw omgeving" },
    ],
    aanbodEn: [
      { titel: "Salary up to €3,500 + options", label: "Your salary" },
      { titel: "Grow to CMO or COO", label: "Your growth" },
      { titel: "Freedom and responsibility", label: "Your environment" },
    ],
    match: [
      "Je hebt een proactieve werkinstelling en bent zeer gestructureerd.",
      "Je hebt ervaring met het organiseren van events en het beheren van marketingcampagnes.",
      "Je bent technologisch ingesteld en enthousiast over nieuwe AI trends.",
      "Ervaring met ontwerptools zoals Canva of Photoshop is een pre.",
      "Je hebt de ambitie om door te groeien binnen het bedrijf, mogelijk naar een CMO of COO-rol.",
    ],
    matchEn: [
      "You have a proactive work attitude and are highly structured.",
      "You have experience organizing events and managing marketing campaigns.",
      "You are tech-savvy and enthusiastic about new AI trends.",
      "Experience with design tools like Canva or Photoshop is a plus.",
      "You have the ambition to grow within the company, potentially to a CMO or COO role.",
    ],
    werkdagTitel: "Wat ga je doen?",
    werkdagTitelEn: "What will you do?",
    werkdag: [
      "Operationeel Management: Verbeteren van operationele trajecten, monitoren en upgraden van de kwaliteit van onze diensten, ondersteunen in de backoffice, en het onderhouden van contact met onze partners.",
      "Event Management: Organiseren van webinars en live evenementen, van de planning en uitvoering tot aan de follow-up.",
      "Marketing: Ontwikkelen en uitvoeren van marketingstrategieën voor evenementen, het gebruik van tools zoals Canva en Photoshop voor het creëren van visuele content, en het beheren van online en offline advertentiecampagnes.",
      "Klantrelaties: Actief onderhouden en warm houden van relaties met klanten en leads om een sterk netwerk op te bouwen en te behouden.",
    ],
    werkdagEn: [
      "Operational Management: Improving operational processes, monitoring and upgrading the quality of our services, supporting the back office, and maintaining contact with our partners.",
      "Event Management: Organizing webinars and live events, from planning and execution to follow-up.",
      "Marketing: Developing and executing marketing strategies for events, using tools like Canva and Photoshop to create visual content, and managing online and offline advertising campaigns.",
      "Customer Relations: Actively maintaining and nurturing relationships with customers and leads to build and maintain a strong network.",
    ],
    procesTitel: "Sollicitatieproces",
    procesTitelEn: "Application process",
    proces: [
      {
        titel: "Kennismakingsgesprek 📞",
        tekst:
          "We plannen een gesprek in om elkaar te leren kennen en praten verder over de vacature. Dit kan online, fysiek of soms beide zijn!",
      },
      {
        titel: "Selectie 🤝",
        tekst:
          "We vragen je om iets van je werk te laten zien, maar kunnen je ook vragen om een opdracht voor ons uit te voeren om zo je kwaliteiten te laten zien. Dit is fysiek bij ons op kantoor.",
      },
      {
        titel: "Aangenomen! 🎉",
        tekst:
          "We bieden je een contract aan en je start met je eerste project. Gefeliciteerd!",
      },
    ],
    procesEn: [
      {
        titel: "Introduction call 📞",
        tekst:
          "We schedule a conversation to get to know each other and discuss the vacancy. This can be online, in person, or sometimes both!",
      },
      {
        titel: "Selection 🤝",
        tekst:
          "We ask you to show some of your work, but may also ask you to complete an assignment to demonstrate your qualities. This takes place at our office.",
      },
      {
        titel: "Hired! 🎉",
        tekst:
          "We offer you a contract and you start your first project. Congratulations!",
      },
    ],
  },
];

/** Open sollicitatie: alleen een kaart op het overzicht, geen detailpagina. */
export const openSollicitatie = {
  titel: "Open sollicitatie",
  titelEn: "Open application",
  categorie: "Alle afdelingen",
  categorieEn: "All departments",
  tekst: "Denk jij dat je het in je hebt?",
  tekstEn: "Do you think you have what it takes?",
  locatie: "Amsterdam",
  uren: "16-40 uur",
  urenEn: "16-40 hours",
  filloutUrl: "https://form.fillout.com/t/no5YEqtVkwus",
};

export function getVacature(slug: string): Vacature | undefined {
  return vacatures.find((v) => v.slug === slug);
}

export function getVacatureEn(slugEn: string): Vacature | undefined {
  return vacatures.find((v) => v.slugEn === slugEn);
}
