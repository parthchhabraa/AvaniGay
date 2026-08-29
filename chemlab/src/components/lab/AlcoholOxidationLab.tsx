import { useState } from 'react'
import type { AlcoholOxidationConfig, ExperimentDef } from '../../chemistry/types'
import { getSubstance } from '../../chemistry/substances'
import { evaluateAlcoholOxidation, type OxidationCondition, type OxidationOutcome } from '../../chemistry/alcoholOxidation'
import { LabCanvas } from './LabCanvas'
import { Vessel3D } from './Vessel3D'
import { SampleRail } from './SampleRail'
import { NotebookDrawer } from './NotebookDrawer'
import { Tabs } from '../ui/Tabs'
import { Button } from '../ui/Button'
import { FormulaText } from '../ui/FormulaText'
import { EquationList } from '../ui/Equation'
import { store, useChemLabState } from '../../state/store'

interface AlcoholOxidationLabProps {
  experiment: ExperimentDef & { config: AlcoholOxidationConfig }
}

export function AlcoholOxidationLab({ experiment }: AlcoholOxidationLabProps) {
  const { config } = experiment
  const [activeId, setActiveId] = useState(config.substanceIds[0])
  const [condition, setCondition] = useState<OxidationCondition>('reflux')
  const [outcome, setOutcome] = useState<OxidationOutcome | null>(null)

  const state = useChemLabState()
  const notebook = state.notebook.filter((n) => n.experimentId === experiment.id)
  const substance = getSubstance(activeId)

  const items = config.substanceIds.map((id) => ({
    id,
    label: getSubstance(id).name,
    sublabel: getSubstance(id).formula,
  }))

  function select(id: string) {
    setActiveId(id)
    setOutcome(null)
  }

  function run() {
    const result = evaluateAlcoholOxidation(substance, condition)
    setOutcome(result)
    store.addNotebookEntry({
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      test: `Acidified dichromate(VI), ${condition} — ${substance.name}`,
      observation: result.observation,
      inference: result.productName ? `Oxidised to ${result.productName}.` : 'Not oxidised under these conditions.',
    })
  }

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[220px_1fr_320px]">
      <aside className="border-b border-line p-3 lg:border-b-0 lg:border-r">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Alcohols</p>
        <SampleRail items={items} activeId={activeId} onSelect={select} />
      </aside>

      <section className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="border-b border-line px-4 py-2">
          <p className="text-[13px] font-semibold text-ink">{substance.name}</p>
          <FormulaText formula={substance.formula} className="text-[12px] text-ink-soft" />
        </div>
        <div className="h-[280px] sm:h-[360px]">
          <LabCanvas cameraPosition={[0, 1.3, 3.4]}>
            <Vessel3D
              shape="test-tube"
              selected
              label={substance.name}
              liquidColor={outcome?.liquidAfter ?? 'orange'}
              level={0.55}
            />
          </LabCanvas>
        </div>
        <NotebookDrawer entries={notebook} experimentTitle={experiment.title} />
      </section>

      <section className="flex flex-col p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Conditions</p>
        <p className="mb-2 text-[12.5px] text-ink-soft">
          Choose how the product is isolated — this changes how far a primary alcohol is oxidised.
        </p>
        <Tabs
          value={condition}
          onChange={setCondition}
          options={[
            { value: 'distillation', label: 'Distillation' },
            { value: 'reflux', label: 'Reflux' },
          ]}
        />

        <div className="mt-4 rounded-md border border-line p-3">
          <p className="text-[13px] font-semibold text-ink">Acidified potassium dichromate(VI)</p>
          <FormulaText formula="Cr_2O_7^2- / H^+" className="text-[11px] text-ink-soft" />
          <Button className="mt-3 w-full" onClick={run}>
            Warm sample with reagent
          </Button>
        </div>

        {outcome && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Observation</p>
              <p className="mt-0.5 text-[14px] text-ink">{outcome.observation}</p>
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
        )}
      </section>
    </div>
  )
}
