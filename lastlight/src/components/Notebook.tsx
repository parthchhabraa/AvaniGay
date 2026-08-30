import type { Discovery, NotebookTab } from '../data/types'

interface NotebookProps {
  isOpen: boolean
  activeTab: NotebookTab
  discoveriesByTab: Record<NotebookTab, Discovery[]>
  onClose: () => void
  onSelectTab: (tab: NotebookTab) => void
}

const TABS: { id: NotebookTab; label: string }[] = [
  { id: 'people', label: 'People' },
  { id: 'locations', label: 'Locations' },
  { id: 'objects', label: 'Objects' },
  { id: 'documents', label: 'Documents' },
  { id: 'timeline', label: 'Timeline' },
]

const EMPTY_TEXT: Record<NotebookTab, string> = {
  people: "You haven't identified anyone yet.",
  locations: "You haven't found your bearings yet.",
  objects: "Nothing of note, yet.",
  documents: "No documents in hand.",
  timeline: "Nothing to place on a timeline yet.",
}

export function Notebook({ isOpen, activeTab, discoveriesByTab, onClose, onSelectTab }: NotebookProps) {
  if (!isOpen) return null

  const entries = discoveriesByTab[activeTab]

  return (
    <>
      <div className="notebook-scrim" onClick={onClose} />
      <aside className="notebook-panel" role="dialog" aria-label="Notebook">
        <div className="notebook-header">
          <h2>Notebook</h2>
          <button className="notebook-close" onClick={onClose} aria-label="Close notebook">
            ×
          </button>
        </div>
        <div className="notebook-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`notebook-tab${activeTab === tab.id ? ' is-active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.label} <span className="notebook-tab-count">{discoveriesByTab[tab.id].length}</span>
            </button>
          ))}
          <button className="notebook-tab" disabled title="Coming in a future phase">
            Connections
          </button>
        </div>
        <div className="notebook-body">
          {entries.length === 0 ? (
            <p className="notebook-empty">{EMPTY_TEXT[activeTab]}</p>
          ) : (
            entries.map((entry) => (
              <div className="notebook-entry" key={entry.id}>
                <h4>{entry.title}</h4>
                {entry.when && <span className="when">{entry.when}</span>}
                <p>{entry.body}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
