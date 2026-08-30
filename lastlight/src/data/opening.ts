import type { Discovery } from './types'

/** One beat of the opening sequence: a short block of text, read at a glance. */
export interface OpeningBeat {
  id: string
  lines: string[]
}

export const openingBeats: OpeningBeat[] = [
  {
    id: 'rain',
    lines: [
      'Rain has been falling on Blackwood House for six days.',
      'It falls now, on the roof, on the long gravel drive, on the black car idling at the gate.',
    ],
  },
  {
    id: 'letter',
    lines: [
      'The letter has been read four times already. You read it again.',
      '"You are named the sole beneficiary of the estate of the late — of Edmund Vale. However, per the testator\'s explicit instruction, the property may not be transferred, sold, or vacated until the circumstances of Mr. Vale\'s disappearance have been resolved to the satisfaction of the estate."',
      '— Halloway & Finch, Solicitors',
    ],
  },
  {
    id: 'gate',
    lines: [
      'The gate was already open when the car arrived.',
      '"It usually is," the driver says, not turning around, "for a house nobody has set foot in for three years."',
    ],
  },
  {
    id: 'door',
    lines: ['The front door is not locked either.', 'You let yourself in.'],
  },
]

/** Notebook entries filed the moment the opening sequence ends. */
export const starterDiscoveries: Discovery[] = [
  {
    id: 'loc-blackwood-house',
    tab: 'locations',
    title: 'Blackwood House',
    body: "Edmund Vale's estate. Empty, by all accounts, for three years — the gate and front door were both left unlocked.",
  },
  {
    id: 'people-edmund-starter',
    tab: 'people',
    title: 'Edmund Vale',
    body: 'Owner of Blackwood House. Vanished three years ago, without explanation. You have never knowingly met him. His will names you as heir on one condition: find out what happened to him first.',
  },
  {
    id: 'doc-solicitor-letter',
    tab: 'documents',
    title: "Halloway & Finch's Letter",
    body: "Confirms you as sole beneficiary of Edmund Vale's estate — on condition the circumstances of his disappearance are resolved first. The house cannot be sold, transferred, or vacated until then.",
  },
  {
    id: 'time-vale-vanishes',
    tab: 'timeline',
    title: 'Edmund Vale disappears',
    body: 'No body, no note, no explanation. Three years ago, by the driver\'s account.',
    when: 'Three years ago',
  },
]
