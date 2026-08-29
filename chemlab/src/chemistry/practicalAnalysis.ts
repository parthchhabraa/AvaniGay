import { getSubstance } from './substances'
import { getTest } from './qualitativeTests'

export interface EfficiencyReport {
  /** How many tests, in the order run, were actually needed to uniquely pin down the sample. */
  necessaryCount: number
  /** Test-run indices (0-based, into the ordered run list) that added no new discriminating evidence. */
  wastedIndices: number[]
}

/**
 * Given the sequence of tests a student actually ran, work out the earliest
 * point at which the pattern of results (positive/negative) already
 * uniquely distinguishes the true sample from every other candidate in the
 * pool. Anything run after that point was not needed to reach the correct
 * conclusion.
 */
export function analyzeTestEfficiency(orderedTestIds: string[], candidateIds: string[], actualId: string): EfficiencyReport {
  const actual = getSubstance(actualId)
  const candidates = candidateIds.map(getSubstance)

  let necessaryCount = orderedTestIds.length
  for (let k = 1; k <= orderedTestIds.length; k++) {
    const prefix = orderedTestIds.slice(0, k)
    const stillConsistent = candidates.filter((cand) =>
      prefix.every((testId) => {
        const test = getTest(testId)
        return test.evaluate(cand).result === test.evaluate(actual).result
      }),
    )
    if (stillConsistent.length === 1 && stillConsistent[0].id === actualId) {
      necessaryCount = k
      break
    }
  }

  const wastedIndices = orderedTestIds.map((_, i) => i).filter((i) => i >= necessaryCount)
  return { necessaryCount, wastedIndices }
}
