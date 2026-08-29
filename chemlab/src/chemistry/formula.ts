/**
 * Minimal chemical-formula notation parser.
 *
 * Shorthand: `_` opens a subscript run of digits, `^` opens a superscript
 * run of digits/+/-. Everything else is plain text. This keeps formula
 * strings readable in data files (e.g. "H_2SO_4", "[Cu(H_2O)_6]^2+")
 * while letting <FormulaText> render proper sub/superscripts.
 */

export type FormulaToken = { text: string; kind: 'text' | 'sub' | 'sup' }

export function parseFormula(raw: string): FormulaToken[] {
  const input = raw.replace(/<->/g, ' ⇌ ').replace(/->/g, ' → ')
  const tokens: FormulaToken[] = []
  let i = 0
  while (i < input.length) {
    const ch = input[i]
    if (ch === '_') {
      i++
      let digits = ''
      while (i < input.length && /[0-9]/.test(input[i])) {
        digits += input[i]
        i++
      }
      if (digits) tokens.push({ text: digits, kind: 'sub' })
      continue
    }
    if (ch === '^') {
      i++
      let sup = ''
      while (i < input.length && /[0-9+-]/.test(input[i])) {
        sup += input[i]
        i++
      }
      if (sup) tokens.push({ text: sup, kind: 'sup' })
      continue
    }
    const start = i
    while (i < input.length && input[i] !== '_' && input[i] !== '^') i++
    tokens.push({ text: input.slice(start, i), kind: 'text' })
  }
  return tokens
}
