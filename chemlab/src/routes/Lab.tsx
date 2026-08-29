import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getExperiment, TOPIC_LABELS } from '../chemistry/experiments'
import { QualitativeLab } from '../components/lab/QualitativeLab'
import { AlcoholOxidationLab } from '../components/lab/AlcoholOxidationLab'
import { InorganicLab } from '../components/lab/InorganicLab'
import { TitrationLab } from '../components/lab/TitrationLab'
import { PracticalLab } from '../components/lab/PracticalLab'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import NotFound from './NotFound'

const DIFFICULTY_LABEL = { foundation: 'Foundation', intermediate: 'Intermediate', advanced: 'Advanced' } as const

export default function Lab() {
  const { experimentId } = useParams()
  const experiment = experimentId ? getExperiment(experimentId) : undefined
  const [infoOpen, setInfoOpen] = useState(false)

  if (!experiment) return <NotFound />

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link to="/experiments" className="shrink-0 text-[13px] font-medium text-ink-soft hover:text-accent-strong">
            ← Experiments
          </Link>
          <span className="text-line-strong" aria-hidden="true">|</span>
          <h1 className="truncate text-[15px] font-semibold text-ink">{experiment.title}</h1>
          <Badge tone="accent">{DIFFICULTY_LABEL[experiment.difficulty]}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-[12px] text-ink-faint sm:inline">{TOPIC_LABELS[experiment.topic]}</span>
          <Button size="sm" variant="ghost" onClick={() => setInfoOpen(true)}>
            Goal &amp; equipment
          </Button>
        </div>
      </div>

      {experiment.mode === 'practical' && experiment.config.kind === 'qualitative' ? (
        <PracticalLab experiment={{ ...experiment, config: experiment.config }} />
      ) : experiment.config.kind === 'qualitative' ? (
        <QualitativeLab experiment={{ ...experiment, config: experiment.config }} />
      ) : experiment.config.kind === 'alcohol-oxidation' ? (
        <AlcoholOxidationLab experiment={{ ...experiment, config: experiment.config }} />
      ) : experiment.config.kind === 'inorganic' ? (
        <InorganicLab experiment={{ ...experiment, config: experiment.config }} />
      ) : (
        <TitrationLab experiment={experiment} />
      )}

      <Modal open={infoOpen} onClose={() => setInfoOpen(false)} title={experiment.title}>
        <p className="text-[13.5px] leading-relaxed text-ink-soft">{experiment.description}</p>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Goal</p>
        <p className="mt-1 text-[13.5px] text-ink">{experiment.goal}</p>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Equipment</p>
        <p className="mt-1 text-[13.5px] text-ink-soft">{experiment.equipment.join(', ')}</p>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Reagents</p>
        <p className="mt-1 text-[13.5px] text-ink-soft">{experiment.reagents.join(', ')}</p>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">Skills practised</p>
        <ul className="mt-1 list-disc pl-4 text-[13.5px] text-ink-soft">
          {experiment.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Modal>
    </div>
  )
}
