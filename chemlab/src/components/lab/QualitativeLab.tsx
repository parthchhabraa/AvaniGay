import { useState } from 'react'
import type { ExperimentDef, QualitativeConfig, TestOutcome } from '../../chemistry/types'
import { getSubstance } from '../../chemistry/substances'
import { getTest } from '../../chemistry/qualitativeTests'
import { LabCanvas } from './LabCanvas'
import { Vessel3D } from './Vessel3D'
import { ReagentBottle3D } from './ReagentBottle3D'
import { SampleRail } from './SampleRail'
import { ObservationPanel } from './ObservationPanel'
import { NotebookDrawer } from './NotebookDrawer'
import { Button } from '../ui/Button'
import { FormulaText } from '../ui/FormulaText'
import { store, useChemLabState } from '../../state/store'

const SAMPLE_LETTERS = 'ABCDEFGH'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

interface QualitativeLabProps {
  experiment: ExperimentDef & { config: QualitativeConfig }
}

export function QualitativeLab({ experiment }: QualitativeLabProps) {
  const { config } = experiment
  const discovery = !config.revealSample

  const [sampleIds] = useState(() =>
    discovery ? shuffle(config.substanceIds).slice(0, Math.min(4, config.substanceIds.length)) : config.substanceIds,
  )

  const [activeId, setActiveId] = useState(sampleIds[0])
  const [pouringTest, setPouringTest] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, Record<string, TestOutcome>>>({})
  const [conclusions, setConclusions] = useState<Record<string, { guess: string; revealed: boolean }>>({})

  const state = useChemLabState()
  const notebook = state.notebook.filter((n) => n.experimentId === experiment.id)

  const activeSubstance = getSubstance(activeId)
  const activeResults = results[activeId] ?? {}
  const testedCount = Object.keys(activeResults).length

  const sampleItems = sampleIds.map((id, i) => ({
    id,
    label: discovery ? `Sample ${SAMPLE_LETTERS[i]}` : getSubstance(id).name,
    sublabel: discovery ? undefined : getSubstance(id).formula,
    tested: Object.keys(results[id] ?? {}).length > 0,
  }))

  function runTest(testId: string) {
    const test = getTest(testId)
    setPouringTest(testId)
    window.setTimeout(() => setPouringTest(null), 700)
    const outcome = test.evaluate(activeSubstance)
    setResults((prev) => ({ ...prev, [activeId]: { ...prev[activeId], [testId]: outcome } }))
    store.addNotebookEntry({
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      test: `${test.name} on ${discovery ? sampleItems.find((s) => s.id === activeId)?.label : activeSubstance.name}`,
      observation: outcome.observation,
      inference:
        outcome.result === 'positive'
          ? `Positive — consistent with ${test.id === 'dnph' ? 'a carbonyl group (aldehyde or ketone)' : 'the target functional group for this reagent'}.`
          : 'Negative — rules out the functional group this reagent targets.',
    })
  }

  const activeVessel = (() => {
    const lastTest = Object.values(activeResults).at(-1)
    if (!lastTest) return { liquidColor: 'colourless' as const, level: 0.55, precipitate: undefined, mirror: false }
    return { liquidColor: lastTest.liquidAfter, level: 0.55, precipitate: lastTest.precipitate, mirror: lastTest.mirror }
  })()

  const conclusion = conclusions[activeId]
  const [candidateNames] = useState(() => shuffle(config.substanceIds.map((id) => getSubstance(id).name)))

  function submitConclusion(guess: string) {
    setConclusions((prev) => ({ ...prev, [activeId]: { guess, revealed: true } }))
    const correct = guess === activeSubstance.name
    store.recordCompletion({ experimentId: experiment.id, title: experiment.title, topic: experiment.topic, correct })
  }

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[220px_1fr_300px]">
      <aside className="border-b border-line p-3 lg:border-b-0 lg:border-r">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          {discovery ? 'Unknown samples' : 'Samples'}
        </p>
        <SampleRail items={sampleItems} activeId={activeId} onSelect={setActiveId} />
      </aside>

      <section className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <div>
            <p className="text-[13px] font-semibold text-ink">
              {discovery ? sampleItems.find((s) => s.id === activeId)?.label : activeSubstance.name}
            </p>
            {!discovery && <FormulaText formula={activeSubstance.formula} className="text-[12px] text-ink-soft" />}
          </div>
          <span className="text-[11px] text-ink-faint">{testedCount} test{testedCount === 1 ? '' : 's'} run</span>
        </div>
        <div className="h-[280px] sm:h-[360px]">
          <LabCanvas cameraPosition={[0, 1.3, 3.4]}>
            <Vessel3D shape="test-tube" position={[0, 0, 0]} selected label={discovery ? sampleItems.find((s) => s.id === activeId)?.label : activeSubstance.name} {...activeVessel} />
          </LabCanvas>
        </div>

        {discovery && (
          <div className="border-t border-line p-4">
            {!conclusion?.revealed ? (
              <div>
                <p className="text-[13px] font-semibold text-ink">Draw your conclusion</p>
                <p className="mt-0.5 text-[12.5px] text-ink-soft">
                  Based on your observations so far, what do you think this sample is?
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {candidateNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => submitConclusion(name)}
                      disabled={testedCount === 0}
                      className="rounded-md border border-line-strong px-2.5 py-1 text-[12.5px] text-ink hover:border-accent hover:text-accent-strong disabled:opacity-40"
                    >
                      {name}
                    </button>
                  ))}
                </div>
                {testedCount === 0 && <p className="mt-1.5 text-[11.5px] text-ink-faint">Run at least one test before concluding.</p>}
              </div>
            ) : (
              <div className={`rounded-md border p-3 ${conclusion.guess === activeSubstance.name ? 'border-positive/30 bg-positive-soft' : 'border-negative/30 bg-negative-soft'}`}>
                <p className="text-[13px] font-semibold text-ink">
                  {conclusion.guess === activeSubstance.name ? 'Correct — ' : 'Not quite — '}
                  this sample was <span className="font-mono">{activeSubstance.name}</span> (
                  <FormulaText formula={activeSubstance.formula} />)
                </p>
                <p className="mt-1 text-[12.5px] text-ink-soft">{activeSubstance.description}</p>
              </div>
            )}
          </div>
        )}

        <NotebookDrawer entries={notebook} experimentTitle={experiment.title} />
      </section>

      <section className="flex flex-col overflow-y-auto p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Tests</p>
        <div className="space-y-2">
          {config.testIds.map((id) => {
            const test = getTest(id)
            const outcome = activeResults[id]
            return (
              <div key={id} className="rounded-md border border-line p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{test.shortName}</p>
                    <FormulaText formula={test.formula} className="text-[11px] text-ink-soft" />
                  </div>
                  <Button size="sm" className="shrink-0 whitespace-nowrap" onClick={() => runTest(id)}>
                    {outcome ? 'Run again' : 'Run test'}
                  </Button>
                </div>
                {outcome && (
                  <div className="mt-2 border-t border-line pt-2">
                    <ObservationPanel testName={test.shortName} outcome={outcome} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* the reagent shelf: a 3D echo of the first three tests above, reinforces cause → effect */}
        <div className="mt-4 h-44 shrink-0">
          <LabCanvas cameraPosition={[0, 1.05, 3.1]} allowRotate={false}>
            {config.testIds.slice(0, 3).map((id, i, arr) => {
              const test = getTest(id)
              return (
                <ReagentBottle3D
                  key={id}
                  name={test.shortName}
                  formula={test.formula}
                  liquidColor={id === 'dnph' ? 'orange' : id === 'bromine-water' ? 'orange' : id === 'dichromate' ? 'orange' : 'blue'}
                  position={[(i - (arr.length - 1) / 2) * 1.05, 0, 0]}
                  pouring={pouringTest === id}
                  onSelect={() => runTest(id)}
                />
              )
            })}
          </LabCanvas>
        </div>
      </section>
    </div>
  )
}
