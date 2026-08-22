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
