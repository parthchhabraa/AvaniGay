import { FormulaText } from '../ui/FormulaText'

interface SampleItem {
  id: string
  label: string
  sublabel?: string
  tested?: boolean
}

export function SampleRail({ items, activeId, onSelect }: { items: SampleItem[]; activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <ul className="space-y-1" role="listbox" aria-label="Samples">
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <li key={item.id}>
            <button
              role="option"
              aria-selected={active}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left transition-colors ${
                active
                  ? 'border-accent-soft-line bg-accent-soft text-accent-strong'
                  : 'border-transparent hover:border-line hover:bg-paper-sunken'
              }`}
            >
              <span>
                <span className="block text-[13.5px] font-medium text-ink">{item.label}</span>
                {item.sublabel && <FormulaText formula={item.sublabel} className="block text-[11px] text-ink-soft" />}
              </span>
              {item.tested && (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-positive/15 text-[9px] font-bold text-positive" aria-label="Tested">
                  ✓
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
