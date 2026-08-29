import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useChemLabState } from '../state/store'

export default function Practical() {
  const state = useChemLabState()
  const attempts = [...state.practicalAttempts].reverse()

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-strong">Practical Challenge</p>
      <h1 className="mt-2 text-[26px] font-semibold text-ink">Unknown Sample X</h1>
      <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
        You'll be given one unlabelled organic sample and access to the full qualitative test kit. There are no hints and no
        answer key while you work — every test you run, and every conclusion you reach, is recorded for your final report.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-line p-3">
          <p className="text-[12px] font-semibold text-ink">Timed</p>
          <p className="mt-0.5 text-[12.5px] text-ink-soft">A running clock, shown throughout.</p>
        </div>
        <div className="rounded-md border border-line p-3">
          <p className="text-[12px] font-semibold text-ink">Tracked</p>
          <p className="mt-0.5 text-[12.5px] text-ink-soft">Every test and observation is logged.</p>
        </div>
        <div className="rounded-md border border-line p-3">
          <p className="text-[12px] font-semibold text-ink">Assessed</p>
          <p className="mt-0.5 text-[12.5px] text-ink-soft">A full report: evidence, reasoning, chemistry, efficiency.</p>
        </div>
      </div>

      <Link to="/lab/practical-challenge">
        <Button variant="primary" className="mt-7">
          Begin the challenge
        </Button>
      </Link>

      {attempts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Previous attempts</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {attempts.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-[13.5px] font-medium text-ink">
                    {a.correct ? 'Correct' : 'Incorrect'} — concluded "{a.studentConclusion}"
                  </p>
                  <p className="text-[12px] text-ink-faint">
                    {new Date(a.timestamp).toLocaleDateString()} · {a.testsRun.length} tests · {Math.floor(a.durationSeconds / 60)}m{' '}
                    {a.durationSeconds % 60}s
                  </p>
                </div>
                <span className={`text-[12px] font-semibold ${a.correct ? 'text-positive' : 'text-negative'}`}>
                  {a.correct ? '✓' : '✕'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
