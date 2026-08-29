# ChemLab

An interactive virtual chemistry laboratory for A-Level and high-school
chemistry students. Choose an experiment, work in a real 3D lab bench,
run qualitative tests on samples and reagents, and reason your way to a
conclusion — with chemistry that follows a defined, data-driven rule set
rather than decorative effects.

## What's here

- **7 working experiments** across organic (carbonyls, alcohols, alkenes),
  inorganic (transition-metal ligand substitution/precipitation) and
  acid–base (titration) chemistry.
- **Guided, discovery and practical-exam modes** — guided experiments show
  the sample up front; discovery mode hides it until you draw a conclusion;
  the Practical Challenge times and tracks a full unknown-identification
  assessment and produces a report (evidence, reasoning, chemistry, and
  an efficiency analysis of the tests you ran).
- **3D lab equipment** (React Three Fiber) — a rotatable test tube with an
  animated liquid column, precipitate layer and silver-mirror coating; a
  pourable reagent bottle; a burette + conical flask titration rig with a
  falling-drop animation and a live cm³ reading.
- **A searchable reference library**, a live experiment notebook (with
  export), and a local, non-gamified progress record.

## Architecture

Chemistry logic lives entirely under `src/chemistry/` — substances,
reagents, qualitative-test rules, alcohol-oxidation conditions, the
transition-metal reaction graph, the titration model, and the experiment
catalog — as plain, typed data and pure functions. UI components
(`src/components/`) only ever read from this layer; no chemical rule is
hard-coded in JSX. `src/state/store.ts` is a small localStorage-backed
store (notebook entries, completions, practical attempts) exposed via
`useSyncExternalStore`.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) and production build
npm run lint      # oxlint
```
