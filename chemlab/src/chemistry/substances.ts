import type { Substance } from './types'

export const SUBSTANCES: Substance[] = [
  {
    id: 'ethanal',
    name: 'Ethanal',
    formula: 'CH_3CHO',
    group: 'aldehyde',
    description: 'A small aliphatic aldehyde, the oxidation product of ethanol.',
  },
  {
    id: 'propanal',
    name: 'Propanal',
    formula: 'CH_3CH_2CHO',
    group: 'aldehyde',
    description: 'An aliphatic aldehyde formed by oxidising propan-1-ol.',
  },
  {
    id: 'benzaldehyde',
    name: 'Benzaldehyde',
    formula: 'C_6H_5CHO',
    group: 'aldehyde',
    aromatic: true,
    description: 'An aromatic aldehyde — the carbonyl is conjugated to the benzene ring.',
  },
  {
    id: 'propanone',
    name: 'Propanone',
    formula: 'CH_3COCH_3',
    group: 'ketone',
    description: 'The simplest ketone, formed by oxidising propan-2-ol.',
  },
  {
    id: 'butanone',
    name: 'Butanone',
    formula: 'CH_3COCH_2CH_3',
    group: 'ketone',
    description: 'A ketone formed by oxidising butan-2-ol.',
  },
  {
    id: 'ethanol',
    name: 'Ethanol',
    formula: 'CH_3CH_2OH',
    group: 'primary-alcohol',
    description: 'A primary alcohol — oxidised in two stages, aldehyde then acid.',
  },
  {
    id: 'propan-1-ol',
    name: 'Propan-1-ol',
    formula: 'CH_3CH_2CH_2OH',
    group: 'primary-alcohol',
    description: 'A primary alcohol with the −OH on a terminal carbon.',
  },
  {
    id: 'propan-2-ol',
    name: 'Propan-2-ol',
    formula: '(CH_3)_2CHOH',
    group: 'secondary-alcohol',
    description: 'A secondary alcohol — the −OH carbon bears two alkyl groups.',
  },
  {
    id: 'tert-butanol',
    name: '2-Methylpropan-2-ol',
    formula: '(CH_3)_3COH',
    group: 'tertiary-alcohol',
    description: 'A tertiary alcohol — the −OH carbon bears three alkyl groups and no H.',
  },
  {
    id: 'ethanoic-acid',
    name: 'Ethanoic acid',
    formula: 'CH_3COOH',
    group: 'carboxylic-acid',
    description: 'A carboxylic acid — already fully oxidised at that carbon.',
  },
  {
    id: 'cyclohexene',
    name: 'Cyclohexene',
    formula: 'C_6H_10',
    group: 'alkene',
    description: 'A cyclic alkene containing one C=C double bond.',
  },
  {
    id: 'but-1-ene',
    name: 'But-1-ene',
    formula: 'CH_2CHCH_2CH_3',
    group: 'alkene',
    description: 'A terminal alkene with one C=C double bond.',
  },
  {
    id: 'hexane',
    name: 'Hexane',
    formula: 'C_6H_14',
    group: 'alkane',
    description: 'A saturated alkane — no π bond for bromine to add across.',
  },
  {
    id: 'phenol',
    name: 'Phenol',
    formula: 'C_6H_5OH',
    group: 'phenol',
    aromatic: true,
    description: 'An aromatic −OH compound; the ring is strongly activated towards electrophiles.',
  },
  {
    id: 'ethyl-ethanoate',
    name: 'Ethyl ethanoate',
    formula: 'CH_3COOCH_2CH_3',
    group: 'ester',
    description: 'An ester — the carbonyl carbon has no removable H and no free O−H.',
  },
]

export function getSubstance(id: string): Substance {
  const s = SUBSTANCES.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown substance: ${id}`)
  return s
}
