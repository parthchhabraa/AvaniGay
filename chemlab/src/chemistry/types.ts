/**
 * Core chemistry data model. This file defines the shape of every
 * substance, reagent, test and experiment in ChemLab. UI components
 * only ever read from these types — no chemistry rules live in JSX.
 */

export type FunctionalGroup =
  | 'aldehyde'
  | 'ketone'
  | 'primary-alcohol'
  | 'secondary-alcohol'
  | 'tertiary-alcohol'
  | 'carboxylic-acid'
  | 'alkene'
  | 'alkane'
  | 'phenol'
  | 'ester'

export type LiquidColor =
  | 'colourless'
  | 'pale-blue'
  | 'blue'
  | 'deep-blue'
  | 'orange'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'brown'
  | 'purple'
  | 'red-brown'
  | 'pale-green'
  | 'silver'

/** Hex swatch used to actually paint 3D liquids / UI colour chips. */
export const LIQUID_HEX: Record<LiquidColor, string> = {
  colourless: '#eef6f2',
  'pale-blue': '#bcd9e6',
  blue: '#3f7fb0',
  'deep-blue': '#1c3f7a',
  orange: '#e08a2c',
  green: '#3f7d52',
  yellow: '#e7c93f',
  pink: '#e08fab',
  brown: '#7a4a2b',
  purple: '#7455a3',
  'red-brown': '#b4552f',
  'pale-green': '#a9c98f',
  silver: '#c7ccd1',
}

export interface Substance {
  id: string
  name: string
  formula: string
  group: FunctionalGroup
  /** Aromatic ring present — changes behaviour in some tests (e.g. Fehling's). */
  aromatic?: boolean
  description: string
}

export interface FormulaLine {
  /** A single reaction equation, written with the `_`/`^` shorthand. */
  equation: string
  note?: string
}

export type TestResult = 'positive' | 'negative' | 'inconclusive'

export interface TestOutcome {
  result: TestResult
  /** What the student actually sees happen. */
  observation: string
  liquidBefore: LiquidColor
  liquidAfter: LiquidColor
  precipitate?: { color: LiquidColor; label: string }
  /** Coats the inside of the vessel — used for the Tollens' silver mirror. */
  mirror?: boolean
  equations: FormulaLine[]
  explanation: string
}

export interface QualitativeTest {
  id: string
  name: string
  shortName: string
  formula: string
  summary: string
  procedure: string[]
  hazard: string
  /** Pure rule: substance in, outcome out. No randomness, no UI state. */
  evaluate: (substance: Substance) => TestOutcome
}

export type Difficulty = 'foundation' | 'intermediate' | 'advanced'
export type Topic =
  | 'organic-carbonyls'
  | 'organic-alcohols'
  | 'organic-unsaturation'
  | 'inorganic-transition-metals'
  | 'acid-base'

export type ExperimentMode = 'guided' | 'discovery' | 'practical'

export interface ExperimentSummary {
  id: string
  title: string
  topic: Topic
  difficulty: Difficulty
  durationMinutes: number
  description: string
  goal: string
  skills: string[]
  equipment: string[]
  reagents: string[]
  mode: ExperimentMode
}

export interface QualitativeConfig {
  kind: 'qualitative'
  testIds: string[]
  substanceIds: string[]
  /** Guided: sample identity shown up front. Discovery/practical: hidden until concluded. */
  revealSample: boolean
}

export interface AlcoholOxidationConfig {
  kind: 'alcohol-oxidation'
  substanceIds: string[]
}

export interface InorganicConfig {
  kind: 'inorganic'
  sampleIds: string[]
}

export interface TitrationConfig {
  kind: 'titration'
}

export type ExperimentConfig = QualitativeConfig | AlcoholOxidationConfig | InorganicConfig | TitrationConfig

export interface ExperimentDef extends ExperimentSummary {
  config: ExperimentConfig
}
