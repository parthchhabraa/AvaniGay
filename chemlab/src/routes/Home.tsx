import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Button } from '../components/ui/Button'
import { FormulaText } from '../components/ui/FormulaText'
import { EXPERIMENTS, TOPIC_LABELS } from '../chemistry/experiments'

const LabCanvas = lazy(() => import('../components/lab/LabCanvas').then((m) => ({ default: m.LabCanvas })))
const Vessel3D = lazy(() => import('../components/lab/Vessel3D').then((m) => ({ default: m.Vessel3D })))

const STEPS = [
  { n: '01', title: 'Choose an experiment', body: 'Pick a topic and a sample — organic carbonyls, alcohols, alkenes, transition metals or acid–base chemistry.' },
  { n: '02', title: 'Interact with the equipment', body: 'Add reagents to real 3D glassware. Watch the liquid, the colour, the precipitate — not a slideshow.' },
  { n: '03', title: 'Reason to a conclusion', body: 'Record what you observe, infer what it means, then check your reasoning against the underlying chemistry.' },
]

const TOPICS: { topic: keyof typeof TOPIC_LABELS; blurb: string }[] = [
  { topic: 'organic-carbonyls', blurb: "Tollens', Fehling's and 2,4-DNPH — telling aldehydes from ketones." },
  { topic: 'organic-alcohols', blurb: 'Oxidising primary, secondary and tertiary alcohols under different conditions.' },
  { topic: 'organic-unsaturation', blurb: 'Bromine water as a test for C=C, and why phenol behaves differently.' },
  { topic: 'inorganic-transition-metals', blurb: 'Ligand substitution and precipitation across four metal-ion samples.' },
  { topic: 'acid-base', blurb: 'A real titration — burette, indicator, and a concentration to calculate.' },
]

export default function Home() {
  return (
    <div>
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_420px] lg:gap-12">
        <div>
          <p className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-strong">A virtual chemistry laboratory</p>
          <h1 className="mt-3 max-w-xl text-[34px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[42px]">
            Run the test. Watch what happens. Work out why.
          </h1>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-soft">
            ChemLab is a practical qualitative-analysis bench for A-Level and high-school chemistry — seven working
            experiments across organic, inorganic and acid–base chemistry, with real 3D glassware and chemistry that follows
            defined rules, not decoration.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/experiments">
              <Button variant="primary" size="md">
                Browse experiments
              </Button>
            </Link>
            <Link to="/practical">
              <Button variant="secondary" size="md">
                Try the Practical Challenge
              </Button>
            </Link>
          </div>
          <p className="mt-6 max-w-md font-mono text-[12px] text-ink-faint">
            <FormulaText formula="RCHO + 2[Ag(NH_3)_2]^+ + 3OH^- -> RCOO^- + 2Ag + 4NH_3 + 2H_2O" />
          </p>
        </div>

        <div className="h-[260px] overflow-hidden rounded-lg border border-line bg-paper-raised shadow-panel sm:h-[320px]">
          <Suspense fallback={<div className="grid h-full place-items-center text-[13px] text-ink-faint">Preparing scene…</div>}>
            <LabCanvas cameraPosition={[0, 1.2, 3]}>
              <Vessel3D shape="test-tube" liquidColor="deep-blue" level={0.6} selected={false} />
            </LabCanvas>
          </Suspense>
        </div>
      </section>

      <section className="border-y border-line bg-paper-sunken/50 py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <p className="font-mono text-[12px] text-accent-strong">{s.n}</p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">Topics covered</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TOPICS.map((t) => (
            <div key={t.topic} className="rounded-lg border border-line p-4">
              <h3 className="text-[14px] font-semibold text-ink">{TOPIC_LABELS[t.topic]}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{t.blurb}</p>
              <p className="mt-2 text-[11px] text-ink-faint">
                {EXPERIMENTS.filter((e) => e.topic === t.topic).length} experiment
                {EXPERIMENTS.filter((e) => e.topic === t.topic).length === 1 ? '' : 's'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6">
        <div className="rounded-lg border border-line bg-paper-raised p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[17px] font-semibold text-ink">Not sure where to start?</h2>
              <p className="mt-1 max-w-md text-[13.5px] text-ink-soft">
                "Identify the Unknown Organic Compound" is a good first stop — discovery mode, no answers shown until you commit
                to a conclusion.
              </p>
            </div>
            <Link to="/lab/unknown-organic">
              <Button variant="primary">Start this experiment</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
