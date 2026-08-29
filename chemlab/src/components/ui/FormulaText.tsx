import { parseFormula } from '../../chemistry/formula'

interface FormulaTextProps {
  formula: string
  className?: string
  as?: 'span' | 'div'
}

/** Renders shorthand chemical notation (e.g. "H_2SO_4") with real sub/superscripts. */
export function FormulaText({ formula, className = '', as = 'span' }: FormulaTextProps) {
  const tokens = parseFormula(formula)
  const Tag = as
  return (
    <Tag className={`chem-formula font-mono ${className}`}>
      {tokens.map((t, i) => {
        if (t.kind === 'sub') return <sub key={i}>{t.text}</sub>
        if (t.kind === 'sup') return <sup key={i}>{t.text}</sup>
        return <span key={i}>{t.text}</span>
      })}
    </Tag>
  )
}
