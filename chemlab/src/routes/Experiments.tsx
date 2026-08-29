import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EXPERIMENTS, TOPIC_LABELS } from '../chemistry/experiments'
import type { Topic } from '../chemistry/types'
import { Badge } from '../components/ui/Badge'
import { Tabs } from '../components/ui/Tabs'

const DIFFICULTY_TONE = { foundation: 'positive', intermediate: 'info', advanced: 'caution' } as const
const DIFFICULTY_LABEL = { foundation: 'Foundation', intermediate: 'Intermediate', advanced: 'Advanced' } as const
const MODE_LABEL = { guided: 'Guided', discovery: 'Discovery', practical: 'Practical' } as const

type FilterTopic = Topic | 'all'

export default function Experiments() {
  const [topic, setTopic] = useState<FilterTopic>('all')
  const listed = EXPERIMENTS.filter((e) => topic === 'all' || e.topic === topic)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-strong">Experiments</p>
      <h1 className="mt-2 text-[26px] font-semibold text-ink">Choose an experiment</h1>
      <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink-soft">
        Each one runs on real chemistry — the observation you see follows directly from the sample and reagent you choose.
      </p>

      <div className="mt-6 overflow-x-auto pb-1">
        <Tabs
          value={topic}
          onChange={setTopic}
          options={[{ value: 'all', label: 'All topics' }, ...(Object.keys(TOPIC_LABELS) as Topic[]).map((t) => ({ value: t, label: TOPIC_LABELS[t] }))]}
        />
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {listed.map((exp) => (
          <li key={exp.id}>
            <Link to={`/lab/${exp.id}`} className="group flex flex-col gap-2 px-1 py-5 transition-colors hover:bg-paper-sunken/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[16px] font-semibold text-ink group-hover:text-accent-strong">{exp.title}</h2>
                  <Badge tone={DIFFICULTY_TONE[exp.difficulty]}>{DIFFICULTY_LABEL[exp.difficulty]}</Badge>
                  <Badge tone="neutral">{MODE_LABEL[exp.mode]}</Badge>
                </div>
                <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-ink-soft">{exp.description}</p>
                <p className="mt-1.5 text-[11.5px] text-ink-faint">
                  {TOPIC_LABELS[exp.topic]} · {exp.durationMinutes} min · {exp.reagents.length} reagent{exp.reagents.length === 1 ? '' : 's'}
                </p>
              </div>
              <span className="shrink-0 self-start rounded-md border border-line-strong px-3 py-1.5 text-[13px] font-medium text-ink-soft group-hover:border-accent group-hover:text-accent-strong sm:self-center">
                Enter lab →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
