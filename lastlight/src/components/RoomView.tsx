import { useState } from 'react'
import type { Room } from '../data/types'

interface RoomViewProps {
  room: Room
  examinedObjectIds: Set<string>
  onExamineObject: (objectId: string) => void
}

interface Selection {
  kind: 'object' | 'exit'
  id: string
  verb: string
  name: string
  text: string
  isNew: boolean
}

export function RoomView({ room, examinedObjectIds, onExamineObject }: RoomViewProps) {
  const [selection, setSelection] = useState<Selection | null>(null)

  const selectObject = (objectId: string) => {
    const object = room.objects.find((o) => o.id === objectId)
    if (!object) return
    const isNew = !examinedObjectIds.has(objectId)
    if (isNew) onExamineObject(objectId)
    setSelection({ kind: 'object', id: objectId, verb: object.verb, name: object.name, text: object.detail, isNew })
  }

  const selectExit = (exitId: string) => {
    const exit = room.exits.find((e) => e.id === exitId)
    if (!exit) return
    setSelection({
      kind: 'exit',
      id: exitId,
      verb: 'Open',
      name: exit.label,
      text: exit.lockedText ?? '',
      isNew: false,
    })
  }

  return (
    <div className="room-stage">
      <div className="room-stage-inner">
        <p className="room-intro">{room.intro}</p>

        <p className="room-section-label">Around the room</p>
        <ul className="interactable-list">
          {room.objects.map((object) => {
            const examined = examinedObjectIds.has(object.id)
            const isActive = selection?.kind === 'object' && selection.id === object.id
            return (
              <li className="interactable-row" key={object.id}>
                <button
                  className={`interactable-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => selectObject(object.id)}
                >
                  <span className="interactable-verb">{object.verb}</span>
                  <span>{examined ? object.name : object.glance}</span>
                  {examined && <span className="interactable-mark" aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>

        {room.exits.length > 0 && (
          <>
            <p className="room-section-label">Ways out</p>
            <ul className="interactable-list">
              {room.exits.map((exit) => {
                const isActive = selection?.kind === 'exit' && selection.id === exit.id
                return (
                  <li className="interactable-row" key={exit.id}>
                    <button
                      className={`interactable-btn is-locked${isActive ? ' is-active' : ''}`}
                      onClick={() => selectExit(exit.id)}
                    >
                      <span className="interactable-verb">{exit.state === 'locked' ? 'Open' : 'Go to'}</span>
                      <span>{exit.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {selection && (
          <div className="detail-pane">
            <h3>
              {selection.verb} {selection.name}
            </h3>
            <p>{selection.text}</p>
            {selection.isNew && <span className="new-tag">Added to notebook</span>}
          </div>
        )}
      </div>
    </div>
  )
}
