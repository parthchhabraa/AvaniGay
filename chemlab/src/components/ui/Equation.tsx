import type { FormulaLine } from '../../chemistry/types'
import { FormulaText } from './FormulaText'

export function Equation({ equation, note }: FormulaLine) {
  return (
    <div className="py-1.5">
      <FormulaText formula={equation} className="text-[15px] text-ink" />
      {note && <p className="mt-0.5 text-xs text-ink-soft">{note}</p>}
    </div>
  )
}

export function EquationList({ items }: { items: FormulaLine[] }) {
  if (items.length === 0) return null
  return (
    <div className="divide-y divide-line rounded-md border border-line bg-paper-sunken/60 px-3">
      {items.map((eq, i) => (
        <Equation key={i} {...eq} />
      ))}
    </div>
  )
}
