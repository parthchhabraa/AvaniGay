import { useMemo, useState } from 'react'
import { searchReference, type ReferenceEntry } from '../chemistry/reference'
import { FormulaText } from '../components/ui/FormulaText'
import { EquationList } from '../components/ui/Equation'
import { Tabs } from '../components/ui/Tabs'

type FilterCategory = ReferenceEntry['category'] | 'All'
const CATEGORIES: FilterCategory[] = ['All', 'Functional groups', 'Qualitative tests', 'Organic reactions', 'Transition metals', 'Acids & bases']

export default function Reference() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FilterCategory>('All')

  const results = useMemo(() => {
    const base = searchReference(query)
    return category === 'All' ? base : base.filter((e) => e.category === category)
  }, [query, category])

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-strong">Reference</p>
      <h1 className="mt-2 text-[26px] font-semibold text-ink">Chemistry reference library</h1>
      <p className="mt-1.5 max-w-xl text-[14px] text-ink-soft">Functional groups, tests, reactions and calculations — searchable, and cross-referenced with what you'll meet in the lab.</p>

      <div className="sticky top-14 z-10 -mx-4 mt-6 border-y border-line bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-lg sm:border">
        <label htmlFor="ref-search" className="sr-only">
          Search reference library
        </label>
        <input
          id="ref-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — e.g. “aldehyde”, “ligand”, “titration”…"
          className="w-full rounded-md border border-line-strong bg-paper-raised px-3 py-2 text-[14px] text-ink outline-none focus-visible:border-accent"
        />
        <div className="mt-2.5 overflow-x-auto">
          <Tabs value={category} onChange={setCategory} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
        </div>
      </div>

      <p className="mt-4 text-[12px] text-ink-faint">
        {results.length} {results.length === 1 ? 'entry' : 'entries'}
      </p>

      <div className="mt-3 divide-y divide-line border-y border-line">
        {results.length === 0 && (
          <p className="py-8 text-center text-[13.5px] text-ink-faint">No entries match "{query}". Try a different term.</p>
        )}
        {results.map((entry) => (
          <article key={entry.id} className="py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-strong">{entry.category}</p>
            <h2 className="mt-0.5 text-[16px] font-semibold text-ink">{entry.title}</h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{entry.summary}</p>
            {entry.facts && (
              <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                {entry.facts.map((f, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3 border-b border-line/70 py-1 text-[12.5px] sm:justify-start">
                    <dt className="text-ink-faint">{f.label}</dt>
                    {f.formula && (
                      <dd>
                        <FormulaText formula={f.formula} className="text-ink" />
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
            {entry.equations && (
              <div className="mt-2">
                <EquationList items={entry.equations} />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
