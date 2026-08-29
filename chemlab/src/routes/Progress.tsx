import { Link } from 'react-router-dom'
import { EXPERIMENTS, TOPIC_LABELS } from '../chemistry/experiments'
import type { Topic } from '../chemistry/types'
import { useChemLabState } from '../state/store'
import { Button } from '../components/ui/Button'

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-line p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 font-mono text-[26px] font-semibold text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-[12px] text-ink-soft">{hint}</p>}
    </div>
  )
}

export default function Progress() {
  const state = useChemLabState()
  const { completions, practicalAttempts } = state

  const completedExperiments = completions.length
  const withResult = completions.filter((c) => c.correct !== null)
  const correctCount = withResult.filter((c) => c.correct).length
  const accuracy = withResult.length > 0 ? Math.round((correctCount / withResult.length) * 100) : null

  const topicsPracticed = new Set(completions.map((c) => c.topic))
  const allTopics = Object.keys(TOPIC_LABELS) as Topic[]

  const topicStats = allTopics.map((topic) => {
    const forTopic = completions.filter((c) => c.topic === topic && c.correct !== null)
    const correct = forTopic.filter((c) => c.correct).length
    return { topic, attempts: forTopic.length, accuracy: forTopic.length > 0 ? Math.round((correct / forTopic.length) * 100) : null }
  })
  const weakAreas = topicStats.filter((t) => t.accuracy !== null && t.accuracy < 70)

  const practicalCorrect = practicalAttempts.filter((a) => a.correct).length

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-strong">Progress</p>
      <h1 className="mt-2 text-[26px] font-semibold text-ink">Your record</h1>
      <p className="mt-1.5 max-w-xl text-[14px] text-ink-soft">Kept locally in this browser — a plain record of what you've practised, not a game score.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Experiments completed" value={`${completedExperiments}/${EXPERIMENTS.length}`} />
        <StatTile label="Accuracy" value={accuracy === null ? '—' : `${accuracy}%`} hint={withResult.length > 0 ? `${correctCount}/${withResult.length} correct` : 'No graded attempts yet'} />
        <StatTile label="Topics practised" value={`${topicsPracticed.size}/${allTopics.length}`} />
        <StatTile
          label="Practical challenges"
          value={`${practicalAttempts.length}`}
          hint={practicalAttempts.length > 0 ? `${practicalCorrect}/${practicalAttempts.length} correct` : 'None attempted yet'}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">By topic</h2>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {topicStats.map((t) => (
            <li key={t.topic} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-[13.5px] font-medium text-ink">{TOPIC_LABELS[t.topic]}</p>
                <p className="text-[12px] text-ink-faint">{t.attempts} attempt{t.attempts === 1 ? '' : 's'}</p>
              </div>
              <p className="font-mono text-[13.5px] text-ink-soft">{t.accuracy === null ? '—' : `${t.accuracy}%`}</p>
            </li>
          ))}
        </ul>
      </div>

      {weakAreas.length > 0 && (
        <div className="mt-8 rounded-lg border border-caution/30 bg-caution-soft p-4">
          <h2 className="text-[13px] font-semibold text-ink">Worth revisiting</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            Accuracy below 70% in: {weakAreas.map((w) => TOPIC_LABELS[w.topic]).join(', ')}.
          </p>
        </div>
      )}

      {completedExperiments === 0 && practicalAttempts.length === 0 && (
        <div className="mt-8 rounded-lg border border-line p-6 text-center">
          <p className="text-[14px] text-ink-soft">Nothing recorded yet — run an experiment to start building your record.</p>
          <Link to="/experiments">
            <Button variant="primary" className="mt-3">
              Browse experiments
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
