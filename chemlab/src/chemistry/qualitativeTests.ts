import type { QualitativeTest, Substance, TestOutcome } from './types'

const NO_REACTION = (liquid: TestOutcome['liquidBefore'], reagentName: string): TestOutcome => ({
  result: 'negative',
  observation: `No visible change. The ${reagentName} remains ${liquid === 'colourless' ? 'colourless' : liquid}.`,
  liquidBefore: liquid,
  liquidAfter: liquid,
  equations: [],
  explanation: 'This functional group is not reactive towards this reagent under these conditions.',
})

export const TOLLENS: QualitativeTest = {
  id: 'tollens',
  name: "Tollens' reagent",
  shortName: 'Tollens\'',
  formula: '[Ag(NH_3)_2]^+',
  summary: 'Ammoniacal silver nitrate. A mild oxidising agent that distinguishes aldehydes from ketones.',
  procedure: [
    'Add a few drops of sample to a clean test tube.',
    "Add Tollens' reagent dropwise.",
    'Stand the tube in a warm water bath (do not boil directly).',
    'Observe the inside wall of the tube for a silver deposit.',
  ],
  hazard: 'Never heat Tollens\' reagent directly, and dispose of it promptly — it can form explosive silver azide/fulminate residues if left standing.',
  evaluate: (s: Substance): TestOutcome => {
    if (s.group === 'aldehyde') {
      return {
        result: 'positive',
        observation: 'A bright, adherent silver mirror forms on the inside of the tube as the colourless solution clears.',
        liquidBefore: 'colourless',
        liquidAfter: 'colourless',
        mirror: true,
        equations: [
          {
            equation: 'RCHO + 2[Ag(NH_3)_2]^+ + 3OH^- -> RCOO^- + 2Ag + 4NH_3 + 2H_2O',
            note: 'The aldehyde is oxidised to a carboxylate ion; Ag^+ is reduced to metallic silver.',
          },
        ],
        explanation:
          `${s.name} is ${s.aromatic ? 'an aromatic' : 'an aliphatic'} aldehyde. Tollens' reagent is a strong enough oxidising agent to oxidise aldehydes to carboxylic acids regardless of whether the aldehyde is aliphatic or aromatic, depositing metallic silver as it is reduced.`,
      }
    }
    return {
      ...NO_REACTION('colourless', "Tollens' reagent"),
      explanation:
        s.group === 'ketone'
          ? 'Ketones have no hydrogen on the carbonyl carbon, so they cannot be oxidised further by Tollens\' reagent — no silver mirror forms.'
          : 'Only aldehydes are oxidised by Tollens\' reagent; this substance has no carbonyl hydrogen for the reagent to attack.',
    }
  },
}

export const FEHLINGS: QualitativeTest = {
  id: 'fehlings',
  name: "Fehling's solution",
  shortName: 'Fehling\'s',
  formula: 'Cu^2+ / tartrate',
  summary: 'A deep-blue copper(II)–tartrate complex. Distinguishes aliphatic aldehydes from ketones and aromatic aldehydes.',
  procedure: [
    'Mix equal volumes of Fehling\'s A and Fehling\'s B to give a deep-blue solution.',
    'Add the sample and heat gently in a water bath.',
    'Watch for a colour change or precipitate over 1–2 minutes.',
  ],
  hazard: 'Fehling\'s solution is alkaline and mildly irritant — avoid skin contact.',
  evaluate: (s: Substance): TestOutcome => {
    if (s.group === 'aldehyde' && !s.aromatic) {
      return {
        result: 'positive',
        observation: 'The deep-blue solution forms a brick-red precipitate as it is heated.',
        liquidBefore: 'blue',
        liquidAfter: 'blue',
        precipitate: { color: 'brown', label: 'Cu_2O (brick-red)' },
        equations: [
          {
            equation: 'RCHO + 2Cu^2+ + 5OH^- -> RCOO^- + Cu_2O + 3H_2O',
            note: 'Blue Cu(II) is reduced to a brick-red precipitate of copper(I) oxide.',
          },
        ],
        explanation: `${s.name} is an aliphatic aldehyde with a carbonyl hydrogen, so it reduces Cu²⁺ in the complex to Cu₂O.`,
      }
    }
    if (s.group === 'aldehyde' && s.aromatic) {
      return {
        ...NO_REACTION('blue', "Fehling's solution"),
        explanation: `${s.name} is an aromatic aldehyde. Unlike Tollens' reagent, Fehling's solution is not a strong enough — or correctly matched — oxidant to react reliably with aromatic aldehydes, so no precipitate forms. This is a genuine exception worth remembering: not every aldehyde behaves the same way in every test.`,
      }
    }
    return {
      ...NO_REACTION('blue', "Fehling's solution"),
      explanation:
        s.group === 'ketone'
          ? 'Ketones lack the carbonyl hydrogen needed for oxidation, so the blue solution is unchanged.'
          : "This substance has no aldehyde group, so Fehling's solution is not reduced.",
    }
  },
}

export const DNPH: QualitativeTest = {
  id: 'dnph',
  name: '2,4-Dinitrophenylhydrazine',
  shortName: '2,4-DNPH',
  formula: '2,4-(NO_2)_2C_6H_3NHNH_2',
  summary: "Brady's reagent. Confirms a carbonyl (C=O) is present, but cannot tell an aldehyde from a ketone on its own.",
  procedure: [
    'Add a few drops of sample to 2,4-DNPH solution.',
    'Shake and allow to stand at room temperature.',
    'Look for a precipitate and note its colour.',
  ],
  hazard: '2,4-DNPH solution is prepared in methanol and concentrated H_2SO_4 — flammable and corrosive; handle in a fume cupboard.',
  evaluate: (s: Substance): TestOutcome => {
    if (s.group === 'aldehyde' || s.group === 'ketone') {
      return {
        result: 'positive',
        observation: `An ${s.aromatic ? 'orange-red' : 'orange-yellow'} precipitate forms almost immediately.`,
        liquidBefore: 'orange',
        liquidAfter: 'orange',
        precipitate: { color: 'orange', label: '2,4-dinitrophenylhydrazone' },
        equations: [
          {
            equation: 'C=O + H_2NNHC_6H_3(NO_2)_2 -> C=N-NHC_6H_3(NO_2)_2 + H_2O',
            note: 'A condensation reaction forms an orange hydrazone precipitate.',
          },
        ],
        explanation:
          'A carbonyl group (present in both aldehydes and ketones) condenses with 2,4-DNPH to give an insoluble hydrazone. This test confirms a carbonyl is present, but a second test — Tollens\' or Fehling\'s — is needed to say whether it is an aldehyde or a ketone.',
      }
    }
    return {
      ...NO_REACTION('orange', '2,4-DNPH solution'),
      explanation: 'Only a carbonyl carbon (C=O, as in an aldehyde or ketone) condenses with 2,4-DNPH. This substance has no such group.',
    }
  },
}

export const BROMINE_WATER: QualitativeTest = {
  id: 'bromine-water',
  name: 'Bromine water',
  shortName: 'Bromine water',
  formula: 'Br_2(aq)',
  summary: 'An orange solution of bromine. Tests for C=C unsaturation, and reacts differently with phenols.',
  procedure: [
    'Add the sample to bromine water dropwise, shaking after each addition.',
    'Observe whether the orange colour persists or is discharged.',
  ],
  hazard: 'Bromine water is corrosive and releases irritant vapour — use in a fume cupboard with gloves.',
  evaluate: (s: Substance): TestOutcome => {
    if (s.group === 'alkene') {
      return {
        result: 'positive',
        observation: 'The orange bromine water is rapidly decolourised as the sample is added.',
        liquidBefore: 'orange',
        liquidAfter: 'colourless',
        equations: [
          { equation: 'C=C + Br_2 -> C(Br)-C(Br)', note: 'Electrophilic addition across the double bond forms a colourless dibromoalkane.' },
        ],
        explanation: `${s.name} contains a C=C double bond, whose π electrons attack Br_2 in an electrophilic addition reaction, decolourising the bromine water.`,
      }
    }
    if (s.group === 'phenol') {
      return {
        result: 'positive',
        observation: 'The orange colour is discharged and a white precipitate forms immediately.',
        liquidBefore: 'orange',
        liquidAfter: 'colourless',
        precipitate: { color: 'colourless', label: '2,4,6-tribromophenol (white)' },
        equations: [
          { equation: 'C_6H_5OH + 3Br_2 -> C_6H_2Br_3OH + 3HBr', note: 'Electrophilic substitution occurs at three ring positions at once.' },
        ],
        explanation:
          'The −OH group strongly activates the benzene ring towards electrophilic substitution, so phenol reacts with bromine water at three positions on the ring — decolourising it and producing a white precipitate, rather than the simple addition seen with alkenes.',
      }
    }
    return {
      ...NO_REACTION('orange', 'bromine water'),
      explanation:
        s.group === 'alkane'
          ? 'Alkanes have no π bond for bromine to add across. Substitution can occur, but only under UV light — not under these conditions.'
          : 'This substance has no C=C double bond and no activated aromatic ring, so bromine water is not decolourised.',
    }
  },
}

export const ACIDIFIED_DICHROMATE: QualitativeTest = {
  id: 'dichromate',
  name: 'Acidified potassium dichromate(VI)',
  shortName: 'Acidified dichromate(VI)',
  formula: 'Cr_2O_7^2- / H^+',
  summary: 'An orange oxidising agent that turns green as Cr(VI) is reduced to Cr(III). Oxidises alcohols and aldehydes, not ketones or tertiary alcohols.',
  procedure: [
    'Add the sample to acidified potassium dichromate(VI) solution.',
    'Warm gently in a water bath.',
    'Watch for a colour change from orange towards green.',
  ],
  hazard: 'Chromium(VI) compounds are toxic and carcinogenic — avoid skin contact and dispose of via the correct waste stream.',
  evaluate: (s: Substance): TestOutcome => {
    const oxidisable = s.group === 'primary-alcohol' || s.group === 'secondary-alcohol' || s.group === 'aldehyde'
    if (oxidisable) {
      return {
        result: 'positive',
        observation: 'The orange solution turns green on warming.',
        liquidBefore: 'orange',
        liquidAfter: 'green',
        equations: [
          {
            equation: 'Cr_2O_7^2- + 14H^+ + 6e^- -> 2Cr^3+ + 7H_2O',
            note: 'Orange dichromate(VI) ions are reduced to green chromium(III) ions.',
          },
        ],
        explanation:
          s.group === 'aldehyde'
            ? `${s.name} still has a carbonyl hydrogen and is oxidised further to a carboxylic acid, reducing orange Cr₂O₇²⁻ to green Cr³⁺.`
            : `${s.name} has a hydrogen atom on the carbon bearing the −OH group, so it can be oxidised, reducing orange Cr₂O₇²⁻ to green Cr³⁺.`,
      }
    }
    return {
      ...NO_REACTION('orange', 'acidified dichromate(VI)'),
      explanation:
        s.group === 'tertiary-alcohol'
          ? 'Tertiary alcohols have no hydrogen on the carbon bearing the −OH group, so there is nothing for the oxidising agent to remove — the solution stays orange.'
          : s.group === 'ketone'
            ? 'Ketones have no carbonyl hydrogen and resist further oxidation under these conditions, so the solution stays orange.'
            : 'This substance has no oxidisable −OH or −CHO group, so the solution stays orange.',
    }
  },
}

export const QUALITATIVE_TESTS: QualitativeTest[] = [TOLLENS, FEHLINGS, DNPH, BROMINE_WATER, ACIDIFIED_DICHROMATE]

export function getTest(id: string): QualitativeTest {
  const t = QUALITATIVE_TESTS.find((x) => x.id === id)
  if (!t) throw new Error(`Unknown test: ${id}`)
  return t
}
