// Shared data shapes for the game's content. Rooms, objects and the
// discoveries they unlock are stored here as plain data — never hardcoded
// into rendering or UI logic — so later phases can extend the house without
// touching the engine.

export type NotebookTab = 'people' | 'locations' | 'objects' | 'documents' | 'timeline'

/** One fact the player has learned, filed into a notebook tab. */
export interface Discovery {
  /** Unique across the whole game. Re-discovering the same id is a no-op. */
  id: string
  tab: NotebookTab
  title: string
  body: string
  /**
   * For the Timeline tab: a display string for when this happened, in
   * in-world terms ("Eleven days ago", "1968", "Unknown"). Timeline entries
   * are shown in the order they're discovered, not date-sorted — the player
   * assembles the order themselves.
   */
  when?: string
}

export type InteractionVerb = 'Examine' | 'Open' | 'Read' | 'Take'

export interface InteractableObject {
  id: string
  name: string
  verb: InteractionVerb
  /** Short line shown in the room's object list before it's been examined. */
  glance: string
  /** Full text shown when the player interacts with the object. */
  detail: string
  /** Notebook entries unlocked the first time this object is interacted with. */
  discoveries?: Discovery[]
}

export type ExitState = 'open' | 'locked'

export interface RoomExit {
  id: string
  label: string
  state: ExitState
  toRoomId?: string
  /** Shown when the player tries a locked exit. */
  lockedText?: string
}

export interface Room {
  id: string
  name: string
  /** Atmospheric description shown whenever the player is in this room. */
  intro: string
  objects: InteractableObject[]
  exits: RoomExit[]
  /** Discoveries filed automatically the first time the player enters. */
  onEnterDiscoveries?: Discovery[]
}
