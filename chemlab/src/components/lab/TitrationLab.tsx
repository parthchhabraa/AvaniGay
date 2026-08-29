import { useState } from 'react'
import type { ExperimentDef } from '../../chemistry/types'
import {
  DEFAULT_TITRATION,
  equivalenceVolumeCm3,
  flaskColourAt,
  calculateConcentration,
  percentageError,
} from '../../chemistry/titration'
import { LabCanvas } from './LabCanvas'
import { Vessel3D } from './Vessel3D'
import { Burette3D } from './Burette3D'
import { NotebookDrawer } from './NotebookDrawer'
import { Button } from '../ui/Button'
import { store, useChemLabState } from '../../state/store'

const INITIAL_READING = 0.4
const CAPACITY = 50

export function TitrationLab({ experiment }: { experiment: ExperimentDef }) {
  const setup = DEFAULT_TITRATION
  const [addedCm3, setAddedCm3] = useState(0)
  const [dispensing, setDispensing] = useState(false)
  const [recordedTitre, setRecordedTitre] = useState<number | null>(null)

  const state = useChemLabState()
  const notebook = state.notebook.filter((n) => n.experimentId === experiment.id)

  const reading = INITIAL_READING + addedCm3
  const fractionRemaining = Math.max(0, 1 - addedCm3 / CAPACITY)
  const colour = flaskColourAt(addedCm3, setup)
  const eq = equivalenceVolumeCm3(setup)

  function addVolume(amount: number) {
    if (addedCm3 + amount > CAPACITY) return
    setDispensing(true)
    window.setTimeout(() => setDispensing(false), 420)
    setAddedCm3((v) => Math.round((v + amount) * 100) / 100)
  }

  function recordTitre() {
    const titre = Math.round(addedCm3 * 100) / 100
    setRecordedTitre(titre)
    const measuredConcentration = calculateConcentration(titre, setup)
    const error = percentageError(measuredConcentration, setup.acidConcentration)
    store.addNotebookEntry({
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      test: 'Titration endpoint recorded',
      observation: `Titre = ${titre.toFixed(2)} cm³ of NaOH(aq). Flask colour: ${colour === 'pink' ? 'pale pink (persists)' : colour === 'flicker' ? 'pink, fading on swirling' : 'colourless'}.`,
      inference: `Calculated [HCl] = ${measuredConcentration.toFixed(3)} mol/dm³ (${error < 5 ? 'within a reasonable margin of' : 'notably different from'} the accepted value).`,
    })
    store.recordCompletion({ experimentId: experiment.id, title: experiment.title, topic: experiment.topic, correct: error < 5 })
  }

  function reset() {
    setAddedCm3(0)
    setRecordedTitre(null)
  }

  const measured = recordedTitre !== null ? calculateConcentration(recordedTitre, setup) : null
  const error = measured !== null ? percentageError(measured, setup.acidConcentration) : null

  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_340px]">
      <section className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <div>
            <p className="text-[13px] font-semibold text-ink">Titration rig</p>
            <p className="text-[12px] text-ink-soft">
              {setup.acidVolumeCm3.toFixed(1)} cm³ of HCl(aq), unknown concentration, + phenolphthalein
            </p>
          </div>
          <span className="font-mono text-[12px] text-ink-soft">NaOH added: {addedCm3.toFixed(2)} cm³</span>
        </div>
        <div className="h-[420px] sm:h-[500px]">
          <LabCanvas cameraPosition={[2.4, 2.0, 5.3]} target={[0.05, 1.3, 0.2]} allowRotate>
            <group position={[-0.3, 0, 0]}>
              <Burette3D liquidColor="colourless" fractionRemaining={fractionRemaining} dispensing={dispensing} readingCm3={reading} />
            </group>
            <group position={[0.35, 0, 0.55]}>
              <Vessel3D shape="conical-flask" liquidColor={colour === 'colourless' ? 'colourless' : 'pink'} level={0.55} />
            </group>
          </LabCanvas>
        </div>
        <NotebookDrawer entries={notebook} experimentTitle={experiment.title} />
      </section>

      <section className="flex flex-col p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Add sodium hydroxide</p>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => addVolume(5)} disabled={recordedTitre !== null}>
            + 5 cm³ (bulk)
          </Button>
          <Button variant="secondary" onClick={() => addVolume(1)} disabled={recordedTitre !== null}>
            + 1 cm³
          </Button>
          <Button variant="secondary" onClick={() => addVolume(0.1)} disabled={recordedTitre !== null}>
            + 1 drop (0.1 cm³)
          </Button>
          <Button variant="ghost" onClick={reset}>
            Reset burette
          </Button>
        </div>

        <div className="mt-4 rounded-md border border-line p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Flask</p>
          <p className="mt-1 text-[13.5px] text-ink">
            {colour === 'colourless' && 'Colourless — still acidic.'}
            {colour === 'flicker' && 'A flash of pink appears and fades as you swirl — you are near the endpoint.'}
            {colour === 'pink' && 'A permanent, pale pink — the endpoint has been reached.'}
          </p>
        </div>

        <Button className="mt-4" variant="primary" onClick={recordTitre} disabled={recordedTitre !== null}>
          Record titre
        </Button>

        {measured !== null && error !== null && (
          <div className={`mt-4 rounded-md border p-3 ${error < 5 ? 'border-positive/30 bg-positive-soft' : 'border-caution/30 bg-caution-soft'}`}>
            <p className="text-[13px] font-semibold text-ink">Titre recorded: {recordedTitre!.toFixed(2)} cm³</p>
            <p className="mt-1 text-[12.5px] text-ink-soft">
              Using n = c × V for the NaOH added, then dividing by the acid volume: [HCl] ={' '}
              <strong className="font-mono text-ink">{measured.toFixed(3)} mol/dm³</strong>
            </p>
            <p className="mt-1 text-[12px] text-ink-faint">
              {error < 2
                ? 'Excellent precision — very close to the accepted concentration.'
                : error < 5
                  ? 'Good result — within a reasonable margin of the accepted concentration.'
                  : 'This is some way off. The equivalence point is reached at a titre of about ' +
                    eq.toFixed(2) +
                    ' cm³ — try adding more slowly as the flask starts to flicker pink.'}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
