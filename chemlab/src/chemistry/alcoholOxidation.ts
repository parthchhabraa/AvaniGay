import type { Substance, FormulaLine, LiquidColor } from './types'

export type OxidationCondition = 'distillation' | 'reflux'

export interface OxidationOutcome {
  colourChange: boolean
  liquidAfter: LiquidColor
  productName: string | null
  observation: string
  equations: FormulaLine[]
  explanation: string
}

/**
 * Alcohol oxidation by acidified potassium dichromate(VI) depends on both
 * the class of alcohol AND the conditions used:
 *  - Primary alcohol + distillation (product removed as it forms) → aldehyde only.
 *  - Primary alcohol + reflux (excess oxidant, product stays in contact)  → carboxylic acid.
 *  - Secondary alcohol → ketone, regardless of set-up (ketones resist further oxidation).
 *  - Tertiary alcohol → no reaction under either set-up.
 */
export function evaluateAlcoholOxidation(substance: Substance, condition: OxidationCondition): OxidationOutcome {
  if (substance.group === 'tertiary-alcohol') {
    return {
      colourChange: false,
      liquidAfter: 'orange',
      productName: null,
      observation: 'The mixture stays orange, even on prolonged warming.',
      equations: [],
      explanation:
        'Oxidation by dichromate(VI) requires a hydrogen on the carbon bearing the −OH group so it can be removed. A tertiary alcohol has three alkyl groups on that carbon and no such hydrogen, so it is not oxidised.',
    }
  }

  if (substance.group === 'secondary-alcohol') {
    return {
      colourChange: true,
      liquidAfter: 'green',
      productName: 'a ketone',
      observation: 'The orange solution turns green as it is warmed.',
      equations: [
        { equation: 'R_2CHOH + [O] -> R_2C=O + H_2O', note: 'Oxidation stops at the ketone — there is no further hydrogen to remove.' },
      ],
      explanation:
        'The carbon bearing −OH has one hydrogen, so it is oxidised once to a ketone. Ketones have no carbonyl hydrogen, so — unlike aldehydes — they are not oxidised any further, whether distilled off or refluxed.',
    }
  }

  // primary alcohol
  if (condition === 'distillation') {
    return {
      colourChange: true,
      liquidAfter: 'green',
      productName: 'an aldehyde',
      observation: 'The orange solution turns green; the product distils off as it forms, before it can react further.',
      equations: [
        { equation: 'RCH_2OH + [O] -> RCHO + H_2O', note: 'Distillation removes the aldehyde from the reaction mixture as soon as it forms.' },
      ],
      explanation:
        'Distilling the product out immediately as it forms (rather than heating under reflux) limits oxidation to a single step, stopping cleanly at the aldehyde before it can be oxidised further to a carboxylic acid.',
    }
  }
  return {
    colourChange: true,
    liquidAfter: 'green',
    productName: 'a carboxylic acid',
    observation: 'The orange solution turns green; under reflux, the reaction goes to completion.',
    equations: [
      { equation: 'RCH_2OH + 2[O] -> RCOOH + H_2O', note: 'Heating under reflux with excess oxidant drives the oxidation all the way to the acid.' },
    ],
    explanation:
      'Under reflux, the vapour condenses and returns to the flask, so the intermediate aldehyde stays in contact with excess oxidising agent and is oxidised further, all the way to the carboxylic acid.',
  }
}
