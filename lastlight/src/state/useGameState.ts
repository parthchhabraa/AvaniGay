import { useCallback, useMemo, useState } from 'react'
import { rooms, startingRoomId } from '../data/rooms'
import { starterDiscoveries } from '../data/opening'
import type { Discovery, NotebookTab } from '../data/types'

export type Screen = 'title' | 'opening' | 'playing'

export interface Settings {
  reducedMotion: boolean
}

interface GameState {
  screen: Screen
  hasStartedGame: boolean
  currentRoomId: string
  examinedObjectIds: Set<string>
  visitedRoomIds: Set<string>
  discoveries: Discovery[]
  discoveredIds: Set<string>
  settings: Settings
  notebookOpen: boolean
  activeTab: NotebookTab
  lastSeenCount: number
}

const initialState: GameState = {
  screen: 'title',
  hasStartedGame: false,
  currentRoomId: startingRoomId,
  examinedObjectIds: new Set(),
  visitedRoomIds: new Set(),
  discoveries: [],
  discoveredIds: new Set(),
  settings: { reducedMotion: false },
  notebookOpen: false,
  activeTab: 'people',
  lastSeenCount: 0,
}

/**
 * All game state lives here, in memory, for this phase. Nothing is
 * persisted to localStorage yet — see the Phase 5 note on save/load for
 * why, and how that will change.
 */
export function useGameState() {
  const [state, setState] = useState<GameState>(initialState)

  const file = useCallback((entries: Discovery[] | undefined, base: GameState) => {
    if (!entries || entries.length === 0) return base
    const nextIds = new Set(base.discoveredIds)
    const nextList = base.discoveries.slice()
    for (const entry of entries) {
      if (nextIds.has(entry.id)) continue
      nextIds.add(entry.id)
      nextList.push(entry)
    }
    return { ...base, discoveries: nextList, discoveredIds: nextIds }
  }, [])

  const beginGame = useCallback(() => {
    setState({ ...initialState, screen: 'opening', hasStartedGame: true })
  }, [])

  const continueGame = useCallback(() => {
    setState((prev) => (prev.hasStartedGame ? { ...prev, screen: 'playing' } : prev))
  }, [])

  const finishOpening = useCallback(() => {
    setState((prev) => {
      const withStarters = file(starterDiscoveries, prev)
      const room = rooms[prev.currentRoomId]
      const withRoom = file(room?.onEnterDiscoveries, withStarters)
      const visitedRoomIds = new Set(withRoom.visitedRoomIds)
      visitedRoomIds.add(prev.currentRoomId)
      return { ...withRoom, screen: 'playing', visitedRoomIds }
    })
  }, [file])

  const examineObject = useCallback(
    (objectId: string) => {
      setState((prev) => {
        const room = rooms[prev.currentRoomId]
        const object = room?.objects.find((o) => o.id === objectId)
        if (!object) return prev
        const examinedObjectIds = new Set(prev.examinedObjectIds)
        examinedObjectIds.add(objectId)
        const filed = file(object.discoveries, prev)
        return { ...filed, examinedObjectIds }
      })
    },
    [file],
  )

  const goToTitle = useCallback(() => {
    setState((prev) => ({ ...prev, screen: 'title' }))
  }, [])

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
  }, [])

  const openNotebook = useCallback((tab?: NotebookTab) => {
    setState((prev) => ({
      ...prev,
      notebookOpen: true,
      activeTab: tab ?? prev.activeTab,
      lastSeenCount: prev.discoveries.length,
    }))
  }, [])

  const closeNotebook = useCallback(() => {
    setState((prev) => ({ ...prev, notebookOpen: false, lastSeenCount: prev.discoveries.length }))
  }, [])

  const setActiveTab = useCallback((tab: NotebookTab) => {
    setState((prev) => ({ ...prev, activeTab: tab }))
  }, [])

  const discoveriesByTab = useMemo(() => {
    const grouped: Record<NotebookTab, Discovery[]> = {
      people: [],
      locations: [],
      objects: [],
      documents: [],
      timeline: [],
    }
    for (const entry of state.discoveries) {
      grouped[entry.tab].push(entry)
    }
    return grouped
  }, [state.discoveries])

  const unseenCount = state.discoveries.length - state.lastSeenCount

  return {
    state,
    discoveriesByTab,
    unseenCount,
    beginGame,
    continueGame,
    finishOpening,
    examineObject,
    goToTitle,
    updateSettings,
    openNotebook,
    closeNotebook,
    setActiveTab,
  }
}

export type UseGameState = ReturnType<typeof useGameState>
