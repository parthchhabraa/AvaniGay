import type { FormulaLine, LiquidColor } from './types'

export interface MetalIonState {
  id: string
  label: string
  formula: string
  liquid: LiquidColor
  precipitate?: { color: LiquidColor; label: string }
  geometry?: string
  coordinationNumber?: number
}

export interface InorganicReagentAction {
  id: string
  name: string
  formula: string
}

export interface InorganicTransition {
  from: string
  reagent: string
  to: string
  observation: string
  equations: FormulaLine[]
  explanation: string
}

export const METAL_IONS: Record<string, MetalIonState> = {
  'cu-aq': { id: 'cu-aq', label: 'Copper(II) sample', formula: '[Cu(H_2O)_6]^2+', liquid: 'pale-blue', geometry: 'octahedral', coordinationNumber: 6 },
  'cu-oh': { id: 'cu-oh', label: 'Copper(II) hydroxide', formula: '[Cu(H_2O)_4(OH)_2]', liquid: 'pale-blue', precipitate: { color: 'pale-blue', label: 'Cu(OH)_2 (pale blue)' } },
  'cu-nh3': { id: 'cu-nh3', label: 'Tetraamminecopper(II)', formula: '[Cu(NH_3)_4(H_2O)_2]^2+', liquid: 'deep-blue', geometry: 'octahedral', coordinationNumber: 6 },
  'cu-cl': { id: 'cu-cl', label: 'Tetrachlorocuprate(II)', formula: '[CuCl_4]^2-', liquid: 'yellow', geometry: 'tetrahedral', coordinationNumber: 4 },

  'co-aq': { id: 'co-aq', label: 'Cobalt(II) sample', formula: '[Co(H_2O)_6]^2+', liquid: 'pink', geometry: 'octahedral', coordinationNumber: 6 },
  'co-cl': { id: 'co-cl', label: 'Tetrachlorocobaltate(II)', formula: '[CoCl_4]^2-', liquid: 'blue', geometry: 'tetrahedral', coordinationNumber: 4 },

  'fe2-aq': { id: 'fe2-aq', label: 'Iron(II) sample', formula: '[Fe(H_2O)_6]^2+', liquid: 'pale-green', geometry: 'octahedral', coordinationNumber: 6 },
  'fe2-oh': { id: 'fe2-oh', label: 'Iron(II) hydroxide', formula: 'Fe(OH)_2', liquid: 'pale-green', precipitate: { color: 'green', label: 'Fe(OH)_2 (green)' } },

  'fe3-aq': { id: 'fe3-aq', label: 'Iron(III) sample', formula: '[Fe(H_2O)_6]^3+', liquid: 'orange', geometry: 'octahedral', coordinationNumber: 6 },
  'fe3-oh': { id: 'fe3-oh', label: 'Iron(III) hydroxide', formula: 'Fe(OH)_3', liquid: 'brown', precipitate: { color: 'brown', label: 'Fe(OH)_3 (orange-brown)' } },
}

export const INORGANIC_REAGENTS: InorganicReagentAction[] = [
  { id: 'naoh-drop', name: 'Sodium hydroxide, dropwise', formula: 'OH^-(aq)' },
  { id: 'naoh-excess', name: 'Sodium hydroxide, excess', formula: 'OH^-(aq), excess' },
  { id: 'nh3-drop', name: 'Ammonia, dropwise', formula: 'NH_3(aq)' },
  { id: 'nh3-excess', name: 'Ammonia, excess', formula: 'NH_3(aq), excess' },
  { id: 'hcl-conc', name: 'Concentrated hydrochloric acid', formula: 'Cl^-(conc.)' },
  { id: 'water', name: 'Dilute with water', formula: 'H_2O(l)' },
]

export const INORGANIC_TRANSITIONS: InorganicTransition[] = [
  {
    from: 'cu-aq',
    reagent: 'naoh-drop',
    to: 'cu-oh',
    observation: 'A pale blue precipitate forms immediately.',
    equations: [{ equation: '[Cu(H_2O)_6]^2+ + 2OH^- -> [Cu(H_2O)_4(OH)_2] + 2H_2O' }],
    explanation: 'Hydroxide acts as a Brønsted base, removing two acidic protons from coordinated water to give an insoluble hydroxide precipitate — not a ligand substitution.',
  },
  {
    from: 'cu-oh',
    reagent: 'naoh-excess',
    to: 'cu-oh',
    observation: 'No further change — the precipitate persists.',
    equations: [],
    explanation: 'Unlike some hydroxides, Cu(OH)_2 is not amphoteric under these conditions, so it does not redissolve in excess sodium hydroxide.',
  },
  {
    from: 'cu-aq',
    reagent: 'nh3-drop',
    to: 'cu-oh',
    observation: 'A pale blue precipitate forms, identical to that formed with sodium hydroxide.',
    equations: [{ equation: '[Cu(H_2O)_6]^2+ + 2NH_3 -> [Cu(H_2O)_4(OH)_2] + 2NH_4^+' }],
    explanation: 'In small amounts, ammonia also acts simply as a base, deprotonating coordinated water to give the same hydroxide precipitate.',
  },
  {
    from: 'cu-oh',
    reagent: 'nh3-excess',
    to: 'cu-nh3',
    observation: 'The precipitate dissolves to give a deep, royal-blue solution.',
    equations: [{ equation: '[Cu(H_2O)_4(OH)_2] + 4NH_3 -> [Cu(NH_3)_4(H_2O)_2]^2+ + 2OH^- + 2H_2O' }],
    explanation: 'In excess, ammonia acts as a ligand rather than a base: it substitutes four of the water ligands, forming a deep blue ammine complex — a true ligand substitution.',
  },
  {
    from: 'cu-aq',
    reagent: 'hcl-conc',
    to: 'cu-cl',
    observation: 'The solution turns yellow-green.',
    equations: [{ equation: '[Cu(H_2O)_6]^2+ + 4Cl^- -> [CuCl_4]^2- + 6H_2O' }],
    explanation: 'Chloride ions are larger than water, so only four can pack around the copper ion: this ligand substitution also changes the coordination number from six to four and the geometry from octahedral to tetrahedral.',
  },
  {
    from: 'cu-cl',
    reagent: 'water',
    to: 'cu-aq',
    observation: 'The colour reverts to pale blue as the solution is diluted.',
    equations: [{ equation: '[CuCl_4]^2- + 6H_2O -> [Cu(H_2O)_6]^2+ + 4Cl^-' }],
    explanation: 'Diluting with water shifts the equilibrium back towards the aqua complex — ligand substitution equilibria like this respond to the relative concentration of each ligand.',
  },
  {
    from: 'co-aq',
    reagent: 'hcl-conc',
    to: 'co-cl',
    observation: 'The pink solution turns blue.',
    equations: [{ equation: '[Co(H_2O)_6]^2+ + 4Cl^- -> [CoCl_4]^2- + 6H_2O' }],
    explanation: 'As with copper, the smaller number of larger chloride ligands that can fit around Co²⁺ changes the coordination number from six to four and the geometry from octahedral to tetrahedral, giving a sharp colour change.',
  },
  {
    from: 'co-cl',
    reagent: 'water',
    to: 'co-aq',
    observation: 'The blue colour reverts to pink as the solution is diluted.',
    equations: [{ equation: '[CoCl_4]^2- + 6H_2O -> [Co(H_2O)_6]^2+ + 4Cl^-' }],
    explanation: 'Adding water lowers the chloride concentration, shifting this ligand substitution equilibrium back towards the hexaaqua complex.',
  },
  {
    from: 'fe2-aq',
    reagent: 'naoh-drop',
    to: 'fe2-oh',
    observation: 'A green precipitate forms, which darkens at the surface on standing in air.',
    equations: [{ equation: 'Fe^2+ + 2OH^- -> Fe(OH)_2' }],
    explanation: 'Iron(II) hydroxide is precipitated directly. Left exposed to air, it is slowly oxidised at the surface to iron(III) hydroxide, which is why the precipitate develops brown patches over time.',
  },
  {
    from: 'fe2-oh',
    reagent: 'naoh-excess',
    to: 'fe2-oh',
    observation: 'No further change.',
    equations: [],
    explanation: 'Excess hydroxide does not redissolve the precipitate.',
  },
  {
    from: 'fe3-aq',
    reagent: 'naoh-drop',
    to: 'fe3-oh',
    observation: 'An orange-brown precipitate forms immediately.',
    equations: [{ equation: 'Fe^3+ + 3OH^- -> Fe(OH)_3' }],
    explanation: 'Iron(III) hydroxide precipitates directly and, unlike Fe(OH)_2, needs no further air oxidation to reach this colour.',
  },
  {
    from: 'fe3-oh',
    reagent: 'naoh-excess',
    to: 'fe3-oh',
    observation: 'No further change.',
    equations: [],
    explanation: 'Excess hydroxide does not redissolve the precipitate.',
  },
]

export function findTransition(fromId: string, reagentId: string): InorganicTransition | null {
  return INORGANIC_TRANSITIONS.find((t) => t.from === fromId && t.reagent === reagentId) ?? null
}
