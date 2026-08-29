/**
 * Strong acid / strong base titration model. The flask holds a fixed
 * volume of HCl(aq) of unknown concentration; the burette is filled with
 * standardised NaOH(aq). Phenolphthalein is colourless in acid and pink
 * in base, with a sharp transition at the equivalence point.
 */

export interface TitrationSetup {
  acidVolumeCm3: number
  acidConcentration: number // mol/dm3 — hidden from the student until the report
  baseConcentration: number // mol/dm3 — printed on the reagent bottle, known
  indicator: 'phenolphthalein'
}

export const DEFAULT_TITRATION: TitrationSetup = {
  acidVolumeCm3: 25.0,
  acidConcentration: 0.15,
  baseConcentration: 0.1,
  indicator: 'phenolphthalein',
}

export function equivalenceVolumeCm3(setup: TitrationSetup): number {
  // moles HCl = moles NaOH at equivalence (1:1 stoichiometry)
  const molesAcid = (setup.acidConcentration * setup.acidVolumeCm3) / 1000
  return (molesAcid / setup.baseConcentration) * 1000
}

export type FlaskColour = 'colourless' | 'flicker' | 'pink'

/** How the flask looks after `addedCm3` of base has been run in. */
export function flaskColourAt(addedCm3: number, setup: TitrationSetup): FlaskColour {
  const eq = equivalenceVolumeCm3(setup)
  const remaining = eq - addedCm3
  if (remaining > 0.3) return 'colourless'
  if (remaining > -0.05) return 'flicker' // the endpoint zone — pink appears and fades on swirling
  return 'pink'
}

export function calculateConcentration(titreCm3: number, setup: TitrationSetup): number {
  const molesBase = (setup.baseConcentration * titreCm3) / 1000
  return (molesBase / setup.acidVolumeCm3) * 1000
}

export function percentageError(measured: number, actual: number): number {
  return (Math.abs(measured - actual) / actual) * 100
}
