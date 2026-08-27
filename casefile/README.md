# CASEFILE

An interactive detective mystery game. Investigate five fully-realized cases — examine evidence,
interrogate suspects, spot contradictions on an investigation board, build a timeline, and make
your accusation.

## Stack

- React 19 + TypeScript + Vite
- React Router for navigation
- Tailwind CSS v4
- No backend, no external APIs — all case data is local, all player progress (notes, discovered
  evidence, detective record) is saved to `localStorage`.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. To build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/data/cases/` — the five mystery cases (suspects, evidence, locations, timeline,
  interrogations, investigation board links, and solution) as plain TypeScript data.
- `src/state/` — localStorage-backed hooks for per-case progress and the cross-case detective
  record, plus the scoring/ranking logic.
- `src/pages/` — top-level routes (landing, case selection, case intro, investigation dashboard,
  result screen, detective record, about).
- `src/components/tabs/` — the nine investigation dashboard tabs (Case, Suspects, Evidence,
  Locations, Interrogate, Timeline, Board, Notes, Accuse).

## Deploying to Vercel

This is a static Vite build — no server, no environment variables, no database required.

**Option A — Vercel dashboard (easiest):**

1. Push this project to a GitHub repo (or use the one it's already in).
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Vercel auto-detects the Vite framework preset (build command `npm run build`, output
   directory `dist`). Leave the defaults and click **Deploy**.

**Option B — Vercel CLI, from this folder:**

```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

The included `vercel.json` rewrites all routes to `index.html` so client-side routing
(React Router) works correctly on hard refreshes and deep links (e.g. `/cases`,
`/case/necklace/investigate`).
