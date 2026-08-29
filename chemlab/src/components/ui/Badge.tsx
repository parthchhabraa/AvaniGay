import type { ReactNode } from 'react'

type Tone = 'neutral' | 'accent' | 'positive' | 'negative' | 'caution' | 'info'

const TONE: Record<Tone, string> = {
  neutral: 'bg-paper-sunken text-ink-soft border-line-strong',
  accent: 'bg-accent-soft text-accent-strong border-accent-soft-line',
  positive: 'bg-positive-soft text-positive border-positive/25',
  negative: 'bg-negative-soft text-negative border-negative/25',
  caution: 'bg-caution-soft text-caution border-caution/25',
  info: 'bg-info-soft text-info border-info/25',
}

export function Badge({ tone = 'neutral', icon, children }: { tone?: Tone; icon?: ReactNode; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TONE[tone]}`}
    >
      {icon}
      {children}
    </span>
  )
}
