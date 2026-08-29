import { useState } from 'react'
import type { NotebookEntry } from '../../state/store'
import { Button } from '../ui/Button'

function exportNotebook(entries: NotebookEntry[], title: string) {
  const lines = [
    `ChemLab notebook — ${title}`,
    `Exported ${new Date().toLocaleString()}`,
    '',
    ...entries.map(
      (e, i) => `${i + 1}. ${e.test}\n   Observation: ${e.observation}\n   Inference: ${e.inference}\n`,
    ),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `chemlab-notebook-${title.toLowerCase().replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

export function NotebookDrawer({ entries, experimentTitle }: { entries: NotebookEntry[]; experimentTitle: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-line bg-paper-raised">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-2.5 text-left"
      >
        <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          Notebook
          <span className="rounded-full bg-paper-sunken px-1.5 py-0.5 text-[11px] font-medium text-ink-soft">{entries.length}</span>
        </span>
        <span className="text-ink-soft" aria-hidden="true">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="max-h-56 overflow-y-auto border-t border-line px-4 py-3">
          {entries.length === 0 ? (
            <p className="text-[13px] text-ink-faint">Run a test to start recording your observations here.</p>
          ) : (
            <ol className="space-y-2.5">
              {entries.map((e, i) => (
                <li key={e.id} className="text-[13px]">
                  <p className="font-medium text-ink">
                    {i + 1}. {e.test}
                  </p>
                  <p className="text-ink-soft">
                    <span className="text-ink-faint">Observation — </span>
                    {e.observation}
                  </p>
                  <p className="text-ink-soft">
                    <span className="text-ink-faint">Inference — </span>
                    {e.inference}
                  </p>
                </li>
              ))}
            </ol>
          )}
          {entries.length > 0 && (
            <div className="mt-3">
              <Button size="sm" variant="ghost" onClick={() => exportNotebook(entries, experimentTitle)}>
                Export notebook
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
