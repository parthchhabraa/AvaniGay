# The House of Last Light

An interactive narrative mystery. You've inherited Blackwood House from Edmund Vale, a man you
never knowingly met — on the condition that you first discover what happened to him. He vanished
three years ago. No body, no explanation. The house feels quietly wrong.

This is **Phase 1** of the build: the engine, the title screen, the opening sequence, one fully
realized room (the Entrance Hall), and the Notebook. Later phases add more of the house, puzzles,
the cast, and the twist.

## Stack

- React 19 + TypeScript + Vite
- Plain CSS, no framework — old paper, dark wood, warm lamp light
- No backend, no external APIs. All game content lives in `src/data/` as structured data.
- Save state is in-memory React state for this phase (not `localStorage` — see the note below).

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

- `src/data/types.ts` — the shared shapes: `Room`, `InteractableObject`, `RoomExit`,
  `Discovery`. Every room, object, and clue is plain data built from these — nothing about the
  house is hardcoded into rendering logic, so later phases can add rooms without touching the
  engine.
- `src/data/rooms.ts` — the house itself, keyed by room id. Phase 1 ships the Entrance Hall.
- `src/data/opening.ts` — the opening sequence beats and the notebook entries filed once it ends.
- `src/state/useGameState.ts` — all game state (current screen, current room, what's been
  examined, filed notebook entries, settings). In-memory for now.
- `src/components/` — `TitleScreen`, `OpeningSequence`, `RoomView` (the room stage, its
  interactables, and the detail pane), `Notebook` (the five-tab notebook, with Connections shown
  as coming soon), `SettingsModal`.

## On persistence

This runs as a static site with no backend, so real save/load will most likely mean
`localStorage` when it's built in a later phase — flagged here rather than added speculatively
now, per the build plan.
