import type { TestOutcome } from '../../chemistry/types'
import { Badge } from '../ui/Badge'
import { EquationList } from '../ui/Equation'

export function ResultBadge({ result }: { result: TestOutcome['result'] }) {
  if (result === 'positive') return <Badge tone="positive" icon="✓">Positive</Badge>
  if (result === 'negative') return <Badge tone="neutral" icon="—">Negative</Badge>
  return <Badge tone="caution" icon="?">Inconclusive</Badge>
}

export function ObservationPanel({ testName, outcome }: { testName: string; outcome: TestOutcome }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink">{testName}</h4>
        <ResultBadge result={outcome.result} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Observation</p>
        <p className="mt-0.5 text-[14px] leading-relaxed text-ink">{outcome.observation}</p>
      </div>
      {outcome.equations.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Equation</p>
          <div className="mt-1">
            <EquationList items={outcome.equations} />
          </div>
        </div>
      )}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Explanation</p>
        <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-soft">{outcome.explanation}</p>
      </div>
    </div>
  )
}
