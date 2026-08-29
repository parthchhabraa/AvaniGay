import { useSyncExternalStore } from 'react'

export interface NotebookEntry {
  id: string
  experimentId: string
  experimentTitle: string
  test: string
  observation: string
  inference: string
  timestamp: number
}

export interface CompletionRecord {
  experimentId: string
  title: string
  topic: string
  completedAt: number
  correct: boolean | null
}

export interface PracticalAttempt {
  id: string
  timestamp: number
  sampleName: string
  studentConclusion: string
  correct: boolean
  testsRun: string[]
  wastedTests: string[]
  durationSeconds: number
}

interface ChemLabState {
  notebook: NotebookEntry[]
  completions: CompletionRecord[]
  practicalAttempts: PracticalAttempt[]
  soundEnabled: boolean
}

const STORAGE_KEY = 'chemlab:v1'

function loadState(): ChemLabState {
  if (typeof window === 'undefined') return emptyState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    return { ...emptyState(), ...parsed }
  } catch {
    return emptyState()
  }
}

function emptyState(): ChemLabState {
  return { notebook: [], completions: [], practicalAttempts: [], soundEnabled: false }
}

let state: ChemLabState = loadState()
const listeners = new Set<() => void>()

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable — state still works for this session
  }
  listeners.forEach((l) => l())
}

export const store = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return state
  },
  addNotebookEntry(entry: Omit<NotebookEntry, 'id' | 'timestamp'>) {
    state = { ...state, notebook: [...state.notebook, { ...entry, id: crypto.randomUUID(), timestamp: Date.now() }] }
    persist()
  },
  recordCompletion(record: Omit<CompletionRecord, 'completedAt'>) {
    state = {
      ...state,
      completions: [...state.completions.filter((c) => c.experimentId !== record.experimentId), { ...record, completedAt: Date.now() }],
    }
    persist()
  },
  recordPracticalAttempt(attempt: Omit<PracticalAttempt, 'id' | 'timestamp'>) {
    state = { ...state, practicalAttempts: [...state.practicalAttempts, { ...attempt, id: crypto.randomUUID(), timestamp: Date.now() }] }
    persist()
  },
  toggleSound() {
    state = { ...state, soundEnabled: !state.soundEnabled }
    persist()
  },
  clearNotebook() {
    state = { ...state, notebook: [] }
    persist()
  },
  reset() {
    state = emptyState()
    persist()
  },
}

export function useChemLabState() {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
}
