import type { FormulaLine } from './types'

export interface ReferenceFact {
  label: string
  formula?: string
}

export interface ReferenceEntry {
  id: string
  category: 'Functional groups' | 'Qualitative tests' | 'Organic reactions' | 'Transition metals' | 'Acids & bases'
  title: string
  tags: string[]
  summary: string
  facts?: ReferenceFact[]
  equations?: FormulaLine[]
}

export const REFERENCE_ENTRIES: ReferenceEntry[] = [
  {
    id: 'ref-aldehyde',
    category: 'Functional groups',
    title: 'Aldehyde, −CHO',
    tags: ['aldehyde', 'carbonyl', 'oxidation'],
    summary:
      'A carbonyl group with one hydrogen attached. That hydrogen makes aldehydes readily oxidised — the basis of Tollens\', Fehling\'s and acidified dichromate tests.',
    facts: [
      { label: 'General formula', formula: 'RCHO' },
      { label: 'Example', formula: 'CH_3CHO (ethanal)' },
      { label: 'Oxidises to', formula: 'RCOOH' },
    ],
  },
  {
    id: 'ref-ketone',
    category: 'Functional groups',
    title: 'Ketone, C=O',
    tags: ['ketone', 'carbonyl'],
    summary:
      'A carbonyl group flanked by two carbon chains, with no hydrogen on the carbonyl carbon. This lack of a hydrogen is why ketones resist further oxidation.',
    facts: [
      { label: 'General formula', formula: 'RR\'C=O' },
      { label: 'Example', formula: 'CH_3COCH_3 (propanone)' },
    ],
  },
  {
    id: 'ref-alcohols',
    category: 'Functional groups',
    title: 'Primary, secondary & tertiary alcohols',
    tags: ['alcohol', 'primary', 'secondary', 'tertiary', 'oxidation'],
    summary:
      'Alcohols are classified by how many carbon groups are attached to the carbon bearing −OH. This directly controls how — and whether — they can be oxidised.',
    facts: [
      { label: 'Primary — one R group', formula: 'RCH_2OH' },
      { label: 'Secondary — two R groups', formula: 'R_2CHOH' },
      { label: 'Tertiary — three R groups', formula: 'R_3COH' },
    ],
  },
  {
    id: 'ref-carboxylic-acid',
    category: 'Functional groups',
    title: 'Carboxylic acid, −COOH',
    tags: ['carboxylic acid', 'acid'],
    summary: 'The fully oxidised form of a primary alcohol / aldehyde chain. Weakly acidic due to the stabilised carboxylate ion formed on deprotonation.',
    facts: [{ label: 'General formula', formula: 'RCOOH' }],
  },
  {
    id: 'ref-alkene',
    category: 'Functional groups',
    title: 'Alkene, C=C',
    tags: ['alkene', 'unsaturation', 'addition'],
    summary: 'A carbon–carbon double bond. The exposed π electrons make alkenes reactive towards electrophiles such as bromine.',
    facts: [{ label: 'General formula', formula: 'C_nH_2n' }],
  },
  {
    id: 'ref-phenol',
    category: 'Functional groups',
    title: 'Phenol, −OH on a benzene ring',
    tags: ['phenol', 'aromatic', 'substitution'],
    summary:
      'The −OH group donates electron density into the ring, strongly activating it towards electrophilic substitution — phenol reacts with bromine water without a catalyst, unlike benzene.',
    facts: [{ label: 'Formula', formula: 'C_6H_5OH' }],
  },
  {
    id: 'ref-ester',
    category: 'Functional groups',
    title: 'Ester, −COO−',
    tags: ['ester'],
    summary: 'Formed by condensing a carboxylic acid with an alcohol. The carbonyl carbon has no removable hydrogen, so esters give no reaction with the standard carbonyl tests.',
    facts: [{ label: 'General formula', formula: 'RCOOR\'' }],
  },
  {
    id: 'ref-tollens',
    category: 'Qualitative tests',
    title: "Tollens' reagent",
    tags: ['tollens', 'aldehyde', 'silver mirror', 'oxidation'],
    summary: 'Ammoniacal silver nitrate. Oxidises any aldehyde — aliphatic or aromatic — depositing a silver mirror. No reaction with ketones.',
    equations: [{ equation: 'RCHO + 2[Ag(NH_3)_2]^+ + 3OH^- -> RCOO^- + 2Ag + 4NH_3 + 2H_2O' }],
  },
  {
    id: 'ref-fehlings',
    category: 'Qualitative tests',
    title: "Fehling's solution",
    tags: ['fehlings', 'aldehyde', 'copper', 'oxidation'],
    summary:
      'A blue Cu²⁺–tartrate complex. Reduced to a brick-red Cu₂O precipitate by aliphatic aldehydes only — aromatic aldehydes such as benzaldehyde give no reaction.',
    equations: [{ equation: 'RCHO + 2Cu^2+ + 5OH^- -> RCOO^- + Cu_2O + 3H_2O' }],
  },
  {
    id: 'ref-dnph',
    category: 'Qualitative tests',
    title: '2,4-Dinitrophenylhydrazine (2,4-DNPH)',
    tags: ['dnph', 'brady', 'carbonyl', 'aldehyde', 'ketone'],
    summary:
      'Condenses with any carbonyl compound (aldehyde or ketone) to give an orange precipitate. Confirms C=O is present, but cannot distinguish aldehyde from ketone on its own.',
    equations: [{ equation: 'C=O + H_2NNHC_6H_3(NO_2)_2 -> C=N-NHC_6H_3(NO_2)_2 + H_2O' }],
  },
  {
    id: 'ref-bromine-water',
    category: 'Qualitative tests',
    title: 'Bromine water',
    tags: ['bromine water', 'alkene', 'phenol', 'addition', 'substitution'],
    summary:
      'Decolourised by alkenes via addition. Also decolourised by phenol, via substitution at the ring, which additionally gives a white precipitate. Alkanes give no reaction without UV light.',
    equations: [{ equation: 'C=C + Br_2 -> C(Br)-C(Br)' }, { equation: 'C_6H_5OH + 3Br_2 -> C_6H_2Br_3OH + 3HBr' }],
  },
  {
    id: 'ref-dichromate',
    category: 'Qualitative tests',
    title: 'Acidified potassium dichromate(VI)',
    tags: ['dichromate', 'oxidation', 'alcohol', 'aldehyde'],
    summary:
      'Orange Cr₂O₇²⁻ is reduced to green Cr³⁺ by primary and secondary alcohols and by aldehydes. Ketones and tertiary alcohols give no colour change.',
    equations: [{ equation: 'Cr_2O_7^2- + 14H^+ + 6e^- -> 2Cr^3+ + 7H_2O' }],
  },
  {
    id: 'ref-oxidation-conditions',
    category: 'Organic reactions',
    title: 'Distillation vs. reflux in alcohol oxidation',
    tags: ['distillation', 'reflux', 'alcohol', 'oxidation', 'conditions'],
    summary:
      'A primary alcohol distilled with acidified dichromate stops at the aldehyde, because the product is removed before it can react further. Refluxed with excess oxidant, oxidation continues to the carboxylic acid.',
    equations: [
      { equation: 'RCH_2OH + [O] -> RCHO + H_2O', note: 'Distillation — stops at the aldehyde' },
      { equation: 'RCH_2OH + 2[O] -> RCOOH + H_2O', note: 'Reflux — goes to the carboxylic acid' },
    ],
  },
  {
    id: 'ref-electrophilic-addition',
    category: 'Organic reactions',
    title: 'Electrophilic addition to alkenes',
    tags: ['addition', 'alkene', 'mechanism', 'bromine'],
    summary: 'The π bond in an alkene is a region of high electron density, attacking electrophiles like Br₂ (polarised by the approaching double bond) to add across the double bond.',
    equations: [{ equation: 'C=C + Br_2 -> C(Br)-C(Br)' }],
  },
  {
    id: 'ref-ligand-substitution',
    category: 'Transition metals',
    title: 'Ligand substitution',
    tags: ['ligand', 'substitution', 'complex ion', 'coordination number'],
    summary:
      'One ligand is replaced by another around a central metal ion. Small ligands like water and ammonia allow six-coordination (octahedral); larger ligands like chloride often allow only four (tetrahedral) — so substitution frequently changes both colour and geometry.',
    equations: [{ equation: '[Cu(H_2O)_6]^2+ + 4Cl^- -> [CuCl_4]^2- + 6H_2O' }],
  },
  {
    id: 'ref-precipitation',
    category: 'Transition metals',
    title: 'Hydroxide precipitation',
    tags: ['precipitate', 'hydroxide', 'transition metal'],
    summary:
      'Hydroxide ions act as a base, removing protons from coordinated water on a metal aqua-ion. The resulting neutral metal hydroxide is insoluble and precipitates out — a distinct process from ligand substitution.',
    equations: [{ equation: '[Cu(H_2O)_6]^2+ + 2OH^- -> [Cu(H_2O)_4(OH)_2] + 2H_2O' }],
  },
  {
    id: 'ref-complex-colour',
    category: 'Transition metals',
    title: 'Why complex ions are coloured',
    tags: ['colour', 'd-orbital', 'complex ion'],
    summary:
      'Ligands split the energies of the d-orbitals on the central metal ion. Electrons absorb visible light to jump between these split levels; the colour seen is the light that is not absorbed. Changing the ligand or geometry changes the size of the split, and so the colour.',
  },
  {
    id: 'ref-oxidation-states',
    category: 'Transition metals',
    title: 'Oxidation and reduction of iron',
    tags: ['iron', 'redox', 'oxidation state'],
    summary:
      'Fe²⁺ is readily oxidised by atmospheric oxygen to Fe³⁺. This is visible when green Fe(OH)₂ precipitate is left standing in air: its surface darkens as it is oxidised towards orange-brown Fe(OH)₃.',
  },
  {
    id: 'ref-indicators',
    category: 'Acids & bases',
    title: 'Phenolphthalein and methyl orange',
    tags: ['indicator', 'phenolphthalein', 'methyl orange', 'endpoint'],
    summary:
      'Phenolphthalein is colourless below pH 8.2 and pink above pH 10 — well suited to titrations with a steep equivalence point above pH 7. Methyl orange transitions red to yellow around pH 3.1–4.4, suited to acidic endpoints.',
    facts: [
      { label: 'Phenolphthalein, acid → base' },
      { label: 'colourless → pink' },
    ],
  },
  {
    id: 'ref-titration-calc',
    category: 'Acids & bases',
    title: 'Titration calculations',
    tags: ['titration', 'moles', 'concentration', 'calculation'],
    summary: 'At the equivalence point, moles of acid and base are related by the reaction stoichiometry. For a 1:1 strong acid–strong base reaction, moles of acid equal moles of base.',
    equations: [{ equation: 'n = c x V', note: 'moles = concentration (mol/dm^3) x volume (dm^3)' }],
  },
  {
    id: 'ref-neutralisation',
    category: 'Acids & bases',
    title: 'Neutralisation',
    tags: ['neutralisation', 'acid', 'base', 'salt'],
    summary: 'An acid and a base react to form a salt and water. For a strong acid and strong base, this is essentially the reaction of H⁺ with OH⁻.',
    equations: [{ equation: 'H^+ + OH^- -> H_2O' }],
  },
]

export function searchReference(query: string): ReferenceEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return REFERENCE_ENTRIES
  return REFERENCE_ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q)),
  )
}
