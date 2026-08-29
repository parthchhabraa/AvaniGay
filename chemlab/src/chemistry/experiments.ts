import type { ExperimentDef } from './types'

export const EXPERIMENTS: ExperimentDef[] = [
  {
    id: 'carbonyl-id',
    title: 'Aldehyde or Ketone?',
    topic: 'organic-carbonyls',
    difficulty: 'foundation',
    durationMinutes: 15,
    description:
      'Use 2,4-DNPH to confirm a carbonyl group is present, then Tollens\' and Fehling\'s reagents to work out whether it is an aldehyde or a ketone.',
    goal: 'Classify each labelled sample as an aldehyde or a ketone, and identify any that behave unusually.',
    skills: ['Reading colour-change observations', 'Selecting a diagnostic test', 'Explaining redox behaviour of carbonyls'],
    equipment: ['Test tube rack', 'Test tubes', 'Dropper pipettes', 'Water bath'],
    reagents: ['2,4-DNPH', "Tollens' reagent", "Fehling's solution"],
    mode: 'guided',
    config: {
      kind: 'qualitative',
      testIds: ['dnph', 'tollens', 'fehlings'],
      substanceIds: ['ethanal', 'propanone', 'benzaldehyde', 'butanone'],
      revealSample: true,
    },
  },
  {
    id: 'alcohol-oxidation',
    title: 'Oxidising Alcohols',
    topic: 'organic-alcohols',
    difficulty: 'intermediate',
    durationMinutes: 20,
    description:
      'Warm each alcohol with acidified potassium dichromate(VI) and choose between distillation and reflux to see how conditions change the product.',
    goal: 'Predict and confirm whether each alcohol is primary, secondary or tertiary from its oxidation behaviour.',
    skills: ['Linking structure to reactivity', 'Understanding distillation vs. reflux', 'Interpreting a colour-change redox test'],
    equipment: ['Reflux apparatus', 'Distillation apparatus', 'Water bath', 'Test tubes'],
    reagents: ['Acidified potassium dichromate(VI)'],
    mode: 'guided',
    config: {
      kind: 'alcohol-oxidation',
      substanceIds: ['ethanol', 'propan-1-ol', 'propan-2-ol', 'tert-butanol'],
    },
  },
  {
    id: 'alkenes-bromine',
    title: 'Alkenes and Bromine Water',
    topic: 'organic-unsaturation',
    difficulty: 'foundation',
    durationMinutes: 10,
    description:
      'Shake each sample with bromine water and watch whether — and how — the orange colour is discharged.',
    goal: 'Use bromine water to detect C=C double bonds, and notice why phenol behaves differently from a simple alkene.',
    skills: ['Testing for unsaturation', 'Comparing addition and substitution', 'Careful observation of colour change'],
    equipment: ['Test tube rack', 'Test tubes', 'Dropper pipettes'],
    reagents: ['Bromine water'],
    mode: 'guided',
    config: {
      kind: 'qualitative',
      testIds: ['bromine-water'],
      substanceIds: ['cyclohexene', 'but-1-ene', 'hexane', 'phenol'],
      revealSample: true,
    },
  },
  {
    id: 'unknown-organic',
    title: 'Identify the Unknown Organic Compound',
    topic: 'organic-carbonyls',
    difficulty: 'intermediate',
    durationMinutes: 25,
    description:
      'A sealed sample, no label. Choose your own sequence of tests, record what you see, and reason your way to an identity before revealing the answer.',
    goal: 'Identify the unknown compound\'s functional group using the full qualitative test kit, without being told the answer first.',
    skills: ['Planning a test sequence', 'Forming an inference from evidence', 'Distinguishing between similar functional groups'],
    equipment: ['Test tube rack', 'Test tubes', 'Dropper pipettes', 'Water bath'],
    reagents: ['2,4-DNPH', "Tollens' reagent", "Fehling's solution", 'Bromine water', 'Acidified potassium dichromate(VI)'],
    mode: 'discovery',
    config: {
      kind: 'qualitative',
      testIds: ['dnph', 'tollens', 'fehlings', 'bromine-water', 'dichromate'],
      substanceIds: ['ethanal', 'propanone', 'benzaldehyde', 'ethanol', 'propan-2-ol', 'tert-butanol', 'ethanoic-acid', 'cyclohexene', 'ethyl-ethanoate'],
      revealSample: false,
    },
  },
  {
    id: 'transition-metals',
    title: 'Transition Metal Complexes',
    topic: 'inorganic-transition-metals',
    difficulty: 'intermediate',
    durationMinutes: 20,
    description:
      'Add hydroxide, ammonia and concentrated acid to an unknown metal-ion solution and track every colour change and precipitate.',
    goal: 'Identify the metal ion from its reactions, and explain each change as either precipitation or ligand substitution.',
    skills: ['Distinguishing precipitation from ligand substitution', 'Predicting coordination number and geometry', 'Systematic reagent testing'],
    equipment: ['Test tube rack', 'Test tubes', 'Dropper pipettes'],
    reagents: ['Sodium hydroxide', 'Ammonia', 'Concentrated hydrochloric acid'],
    mode: 'guided',
    config: {
      kind: 'inorganic',
      sampleIds: ['cu-aq', 'co-aq', 'fe2-aq', 'fe3-aq'],
    },
  },
  {
    id: 'acid-base-titration',
    title: 'Acid–Base Titration',
    topic: 'acid-base',
    difficulty: 'intermediate',
    durationMinutes: 20,
    description:
      'Titrate hydrochloric acid of unknown concentration against standardised sodium hydroxide, using phenolphthalein to find the endpoint.',
    goal: 'Determine the concentration of the hydrochloric acid from your titre and a known standard.',
    skills: ['Precise burette technique', 'Recognising an indicator endpoint', 'Titration calculations'],
    equipment: ['Burette', 'Conical flask', 'Pipette', 'White tile'],
    reagents: ['Sodium hydroxide (standardised)', 'Phenolphthalein indicator'],
    mode: 'guided',
    config: { kind: 'titration' },
  },
  {
    id: 'practical-challenge',
    title: 'Practical Challenge: Unknown Sample X',
    topic: 'organic-carbonyls',
    difficulty: 'advanced',
    durationMinutes: 30,
    description:
      'A timed, assessed practical. You choose which tests to run and in what order — every test and every observation is recorded for your final report.',
    goal: 'Identify the unknown sample as efficiently and accurately as a real practical exam would demand.',
    skills: ['Working under assessment conditions', 'Efficient test selection', 'Building a defensible conclusion from evidence'],
    equipment: ['Test tube rack', 'Test tubes', 'Dropper pipettes', 'Water bath'],
    reagents: ['2,4-DNPH', "Tollens' reagent", "Fehling's solution", 'Bromine water', 'Acidified potassium dichromate(VI)'],
    mode: 'practical',
    config: {
      kind: 'qualitative',
      testIds: ['dnph', 'tollens', 'fehlings', 'bromine-water', 'dichromate'],
      substanceIds: ['ethanal', 'propanone', 'benzaldehyde', 'ethanol', 'propan-2-ol', 'tert-butanol', 'ethanoic-acid', 'cyclohexene', 'phenol', 'ethyl-ethanoate'],
      revealSample: false,
    },
  },
]

export function getExperiment(id: string): ExperimentDef | undefined {
  return EXPERIMENTS.find((e) => e.id === id)
}

export const TOPIC_LABELS: Record<ExperimentDef['topic'], string> = {
  'organic-carbonyls': 'Aldehydes & Ketones',
  'organic-alcohols': 'Alcohols',
  'organic-unsaturation': 'Alkenes',
  'inorganic-transition-metals': 'Transition Metals',
  'acid-base': 'Acids & Bases',
}
