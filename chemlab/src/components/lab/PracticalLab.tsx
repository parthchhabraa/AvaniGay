import { useEffect, useRef, useState } from 'react'
import type { ExperimentDef, QualitativeConfig, TestOutcome } from '../../chemistry/types'
import { getSubstance } from '../../chemistry/substances'
import { getTest } from '../../chemistry/qualitativeTests'
import { analyzeTestEfficiency } from '../../chemistry/practicalAnalysis'
import { LabCanvas } from './LabCanvas'
import { Vessel3D } from './Vessel3D'
import { ObservationPanel } from './ObservationPanel'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { FormulaText } from '../ui/FormulaText'
import { store } from '../../state/store'

interface RunRecord {
  testId: string
  outcome: TestOutcome
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const GROUP_LABEL: Record<string, string> = {
  aldehyde: 'an aldehyde',
  ketone: 'a ketone',
  'primary-alcohol': 'a primary alcohol',
  'secondary-alcohol': 'a secondary alcohol',
  'tertiary-alcohol': 'a tertiary alcohol',
  'carboxylic-acid': 'a carboxylic acid',
  alkene: 'an alkene',
  alkane: 'an alkane',
  phenol: 'a phenol',
  ester: 'an ester',
}

export function PracticalLab({ experiment }: { experiment: ExperimentDef & { config: QualitativeConfig } }) {
  const { config } = experiment
  const [sampleId] = useState(() => config.substanceIds[Math.floor(Math.random() * config.substanceIds.length)])
  const sample = getSubstance(sampleId)

  const [runs, setRuns] = useState<RunRecord[]>([])
  const [elapsed, setElapsed] = useState(0)
  const [finalGuess, setFinalGuess] = useState<string | null>(null)
  const startedAt = useRef(Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000)
    return () => window.clearInterval(t)
  }, [])

  const submitted = finalGuess !== null
  const lastRun = runs.at(-1)

  function runTest(testId: string) {
    if (submitted) return
    const test = getTest(testId)
    const outcome = test.evaluate(sample)
    setRuns((prev) => [...prev, { testId, outcome }])
  }

  function submit(guessName: string) {
    setFinalGuess(guessName)
    const correct = guessName === sample.name
    const durationSeconds = Math.floor((Date.now() - startedAt.current) / 1000)
    const { wastedIndices } = analyzeTestEfficiency(runs.map((r) => r.testId), config.substanceIds, sampleId)
    store.recordPracticalAttempt({
      sampleName: sample.name,
      studentConclusion: guessName,
      correct,
      testsRun: runs.map((r) => getTest(r.testId).shortName),
      wastedTests: wastedIndices.map((i) => getTest(runs[i].testId).shortName),
      durationSeconds,
    })
  }

  const [candidateNames] = useState(() => config.substanceIds.map((id) => getSubstance(id).name).sort(() => Math.random() - 0.5))

  if (submitted) {
    const correct = finalGuess === sample.name
    const { necessaryCount, wastedIndices } = analyzeTestEfficiency(runs.map((r) => r.testId), config.substanceIds, sampleId)
    const wastedNames = wastedIndices.map((i) => getTest(runs[i].testId).shortName)

    return (
      <div className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-center gap-2">
          <Badge tone={correct ? 'positive' : 'negative'} icon={correct ? '✓' : '✕'}>
            {correct ? 'Correct' : 'Incorrect'}
          </Badge>
          <span className="text-[13px] text-ink-soft">{formatDuration(elapsed)} elapsed · {runs.length} tests run</span>
        </div>

        <h1 className="text-2xl font-semibold text-ink">Practical report</h1>
        <p className="mt-1 text-[14px] text-ink-soft">
          The sample was <strong className="text-ink">{sample.name}</strong> (<FormulaText formula={sample.formula} />). You
          concluded <strong className="text-ink">{finalGuess}</strong>.
        </p>

        <div className="mt-6 space-y-5">
          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Evidence</h2>
            <ul className="mt-2 space-y-1.5">
              {runs.map((r, i) => (
                <li key={i} className="text-[13.5px] text-ink">
                  <span className="font-medium">{getTest(r.testId).shortName}:</span> {r.outcome.observation}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Reasoning</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              {correct
                ? `Your evidence is consistent with ${sample.name}, ${GROUP_LABEL[sample.group]}${sample.aromatic ? ' with an aromatic ring' : ''}. Your conclusion follows logically from the tests you ran.`
                : `Your evidence does not support "${finalGuess}". The sample was actually ${GROUP_LABEL[sample.group]}${sample.aromatic ? ', aromatic,' : ''} — re-read the observations above against what each test targets.`}
            </p>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Chemistry</h2>
            <div className="mt-2 space-y-2">
              {runs
                .filter((r) => r.outcome.equations.length > 0)
                .map((r, i) => (
                  <ObservationPanel key={i} testName={getTest(r.testId).shortName} outcome={r.outcome} />
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-ink-faint">What you could improve</h2>
            {wastedNames.length === 0 ? (
              <p className="mt-2 text-[13.5px] text-ink-soft">
                Efficient work — every test you ran added new information. {necessaryCount} test{necessaryCount === 1 ? '' : 's'} were
                enough to reach a sound conclusion.
              </p>
            ) : (
              <p className="mt-2 text-[13.5px] text-ink-soft">
                {necessaryCount} test{necessaryCount === 1 ? '' : 's'} would have been enough to identify this sample. Running{' '}
                {wastedNames.join(', ')} afterwards added no further discriminating evidence.
              </p>
            )}
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_320px]">
      <section className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <p className="text-[13px] font-semibold text-ink">Unknown Sample X</p>
          <span className="font-mono text-[13px] text-ink-soft" aria-live="polite">
            ⏱ {formatDuration(elapsed)}
          </span>
        </div>
        <div className="h-[280px] sm:h-[380px]">
          <LabCanvas cameraPosition={[0, 1.3, 3.4]}>
            <Vessel3D
              shape="test-tube"
              selected
              label="X"
              liquidColor={lastRun?.outcome.liquidAfter ?? 'colourless'}
              level={0.55}
              precipitate={lastRun?.outcome.precipitate}
              mirror={lastRun?.outcome.mirror}
            />
          </LabCanvas>
        </div>
        {lastRun && (
          <div className="border-t border-line p-4">
            <ObservationPanel testName={getTest(lastRun.testId).shortName} outcome={lastRun.outcome} />
          </div>
        )}
      </section>

      <section className="flex flex-col p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Available tests</p>
        <div className="space-y-1.5">
          {config.testIds.map((id) => {
            const test = getTest(id)
            const count = runs.filter((r) => r.testId === id).length
            return (
              <Button key={id} variant="secondary" size="sm" className="w-full justify-between" onClick={() => runTest(id)}>
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{test.shortName}</span>
                  {count > 0 && <span className="text-[11px] text-ink-faint">run ×{count}</span>}
                </span>
              </Button>
            )
          })}
        </div>

        <div className="mt-5 rounded-md border border-line p-3">
          <p className="text-[13px] font-semibold text-ink">Final identification</p>
          <p className="mt-1 text-[12px] text-ink-soft">Choose when you're confident — this ends the assessment.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {candidateNames.map((name) => (
              <button
                key={name}
                onClick={() => submit(name)}
                disabled={runs.length === 0}
                className="rounded-md border border-line-strong px-2.5 py-1 text-[12.5px] text-ink hover:border-accent hover:text-accent-strong disabled:opacity-40"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
