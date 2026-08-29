import { useState } from 'react'
import type { ExperimentDef, InorganicConfig } from '../../chemistry/types'
import { METAL_IONS, INORGANIC_REAGENTS, findTransition } from '../../chemistry/inorganic'
import { LabCanvas } from './LabCanvas'
import { Vessel3D } from './Vessel3D'
import { SampleRail } from './SampleRail'
import { NotebookDrawer } from './NotebookDrawer'
import { Button } from '../ui/Button'
import { FormulaText } from '../ui/FormulaText'
import { EquationList } from '../ui/Equation'
import { store, useChemLabState } from '../../state/store'

interface InorganicLabProps {
  experiment: ExperimentDef & { config: InorganicConfig }
}

export function InorganicLab({ experiment }: InorganicLabProps) {
  const { config } = experiment
  const [stateBySample, setStateBySample] = useState<Record<string, string>>(
    Object.fromEntries(config.sampleIds.map((id) => [id, id])),
  )
  const [activeSample, setActiveSample] = useState(config.sampleIds[0])
  const [lastMessage, setLastMessage] = useState<{ observation: string; explanation: string; equations: { equation: string; note?: string }[] } | null>(null)

  const state = useChemLabState()
  const notebook = state.notebook.filter((n) => n.experimentId === experiment.id)

  const currentStateId = stateBySample[activeSample]
  const currentState = METAL_IONS[currentStateId]
  const startingState = METAL_IONS[activeSample]

  const items = config.sampleIds.map((id) => ({
    id,
    label: METAL_IONS[id].label,
    tested: stateBySample[id] !== id,
  }))

  function applyReagent(reagentId: string) {
    const transition = findTransition(currentStateId, reagentId)
    const reagent = INORGANIC_REAGENTS.find((r) => r.id === reagentId)!
    if (!transition) {
      setLastMessage({
        observation: 'No new observation — try a different reagent.',
        explanation: 'This combination does not produce a visible change worth recording.',
        equations: [],
      })
      return
    }
    setStateBySample((prev) => ({ ...prev, [activeSample]: transition.to }))
    setLastMessage({ observation: transition.observation, explanation: transition.explanation, equations: transition.equations })
    store.addNotebookEntry({
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      test: `${reagent.name} added to ${startingState.label}`,
      observation: transition.observation,
      inference: transition.explanation,
    })
  }

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[220px_1fr_320px]">
      <aside className="border-b border-line p-3 lg:border-b-0 lg:border-r">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Samples</p>
        <SampleRail items={items} activeId={activeSample} onSelect={setActiveSample} />
      </aside>

      <section className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="border-b border-line px-4 py-2">
          <p className="text-[13px] font-semibold text-ink">{currentState.label}</p>
          <FormulaText formula={currentState.formula} className="text-[12px] text-ink-soft" />
          {currentState.geometry && (
            <p className="mt-0.5 text-[11px] text-ink-faint">
              {currentState.coordinationNumber}-coordinate, {currentState.geometry}
            </p>
          )}
        </div>
        <div className="h-[280px] sm:h-[360px]">
          <LabCanvas cameraPosition={[0, 1.3, 3.4]}>
            <Vessel3D shape="test-tube" selected liquidColor={currentState.liquid} precipitate={currentState.precipitate} level={0.55} />
          </LabCanvas>
        </div>

        {lastMessage && (
          <div className="border-t border-line p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Observation</p>
            <p className="mt-0.5 text-[14px] text-ink">{lastMessage.observation}</p>
            {lastMessage.equations.length > 0 && (
              <div className="mt-2">
                <EquationList items={lastMessage.equations} />
              </div>
            )}
            <p className="mt-2 text-[13px] text-ink-soft">{lastMessage.explanation}</p>
          </div>
        )}

        <NotebookDrawer entries={notebook} experimentTitle={experiment.title} />
      </section>

      <section className="flex flex-col p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Reagents</p>
        <div className="grid grid-cols-1 gap-2">
          {INORGANIC_REAGENTS.map((r) => (
            <Button key={r.id} size="sm" variant="secondary" onClick={() => applyReagent(r.id)}>
              <span className="flex w-full items-center justify-between gap-2">
                <span>{r.name}</span>
                <FormulaText formula={r.formula} className="text-[11px] text-ink-faint" />
              </span>
            </Button>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-ink-faint">
          Not every reagent produces a new reaction from every state — that's realistic. Work through them systematically and use
          the notebook to track what changed.
        </p>
      </section>
    </div>
  )
}
