This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## AI-modellenpagina (/ai-modellen)

De pagina toont een live overzicht van AI-modellen met rankings, prijzen in
euro en het verdict van NinA.

| Bestand | Rol |
| --- | --- |
| `data/nina-verdicts.json` | Handmatige expertise-laag. Alleen jij past dit aan. |
| `scripts/update-models.mjs` | Haalt de data op, rekent om naar euro, merget de verdicts. |
| `scripts/test-update-models.mjs` | Test het script tegen een mock-server, zonder API-key. |
| `public/data/models.json` | Gegenereerd. Niet met de hand bewerken. |
| `.github/workflows/update-models.yml` | Draait het script elke dag om 06:00 UTC. |

Eenmalig instellen:

1. Vraag een API-key aan op [artificialanalysis.ai](https://artificialanalysis.ai)
   (via hun API- of Insights-sectie).
2. Zet die key in GitHub onder **Settings > Secrets and variables > Actions >
   New repository secret**, met de naam `AA_API_KEY`.
3. Start de workflow een keer handmatig via **Actions > AI-modellen bijwerken
   > Run workflow**.

Lokaal draaien:

```bash
npm run test:update-models          # mock-test, geen key nodig
AA_API_KEY=xxx npm run update-models
```

Faalt een van de twee API's, dan stopt het script met exitcode 1 en blijft
`models.json` staan zoals het was.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
