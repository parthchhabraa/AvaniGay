import type { Room } from './types'

/**
 * All rooms, keyed by id. Phase 1 ships only the Entrance Hall; later
 * phases add entries here and wire new exits to them — nothing in the
 * engine needs to change to grow the house.
 */
export const rooms: Record<string, Room> = {
  'entrance-hall': {
    id: 'entrance-hall',
    name: 'The Entrance Hall',
    intro:
      "The Entrance Hall holds its breath: dark wainscoting, a staircase curling up into shadow, and the particular hush of a house that hasn't been lived in for a long time — though, looking closer, not everything here agrees with that. Rain runs down the tall windows either side of the door in ropes.",
    onEnterDiscoveries: [
      {
        id: 'loc-entrance-hall',
        tab: 'locations',
        title: 'The Entrance Hall',
        body: 'The first room of Blackwood House. Dark wood, a staircase to an unlit upper floor, and a door to the rest of the ground floor that will not open.',
      },
    ],
    objects: [
      {
        id: 'clock',
        name: 'the grandfather clock',
        verb: 'Examine',
        glance: 'A grandfather clock, its hands stopped.',
        detail:
          "Mahogany, taller than you, its brass face gone the colour of weak tea. The hands have stopped at seventeen minutes past three — whether the last time it was wound, or simply the moment it gave up, there's no way to tell from looking. A fine grey film covers the case, the numerals, the small brass moon set in the arch above the face. All of it, except the winding key. That sits in its slot below the dial, worn bright and clean by a hand that has used it far more recently than three years ago.",
        discoveries: [
          {
            id: 'obj-clock',
            tab: 'objects',
            title: 'The Grandfather Clock',
            body: 'Stopped at 3:17. Dust-covered everywhere except the winding key, which is worn bright from recent use.',
          },
          {
            id: 'time-clock-key',
            tab: 'timeline',
            title: 'The winding key is not dusty',
            body: "Someone has wound this clock — or tried to — much more recently than the three years the house is supposed to have stood empty.",
            when: 'Recently',
          },
        ],
      },
      {
        id: 'mail',
        name: 'the side table',
        verb: 'Read',
        glance: 'A side table, buried under a small mountain of unopened post.',
        detail:
          "The post is bound loosely with string and gone soft at the corners with damp. Most of it is addressed, in a clerk's careful hand, to Edmund Vale, Blackwood House. The postmarks are not old. The most recent, near the top, is eleven days ago. Underneath it, a letter from Halloway & Finch, Solicitors — the same firm whose name is on the letter in your own coat pocket. It reads: 'Further to your visit to our office last month, we confirm the documents you requested have been prepared and are awaiting your signature.' Edmund Vale has been missing for three years. Someone, or something, does not seem to know that.",
        discoveries: [
          {
            id: 'doc-bank-letter',
            tab: 'documents',
            title: "Letter from Halloway & Finch, Solicitors",
            body: "Addressed to Edmund Vale, postmarked eleven days ago. Thanks him for 'your visit to our office last month' and says documents he requested are ready for signature.",
          },
          {
            id: 'time-visit',
            tab: 'timeline',
            title: "A solicitor's letter references a visit 'last month'",
            body: 'If the letter is telling the truth, Edmund Vale was alive, mobile, and requesting legal paperwork within the last several weeks — long after he was supposed to have disappeared.',
            when: 'Last month (disputed)',
          },
        ],
      },
      {
        id: 'portrait',
        name: 'the portrait',
        verb: 'Examine',
        glance: 'A portrait of a woman, hung above the cold fireplace.',
        detail:
          "Oil on canvas, gone dark with age around the edges. A woman sits with her hands folded in her lap, painted in the stiff, patient style of an artist who was paid by the sitting rather than the likeness. A small brass plaque on the frame reads: ELEANOR VALE — 1934–1968. Her face is unremarkable, kind. Her hands are not. The paint there sits differently to the rest of the canvas — a shade too bright, the brushwork a shade too modern, as though someone repainted just that detail, sometime after the rest of it had already gone dark with age.",
        discoveries: [
          {
            id: 'people-eleanor',
            tab: 'people',
            title: 'Eleanor Vale',
            body: 'Died in 1968, per the plaque on her portrait in the Entrance Hall. Presumably Edmund\'s wife, or mother — relation not yet confirmed.',
          },
          {
            id: 'obj-portrait',
            tab: 'objects',
            title: 'The Portrait of Eleanor Vale',
            body: "Hung above the fireplace. The hands appear to have been repainted long after the rest of the canvas — newer paint, newer brushwork, hidden in plain sight.",
          },
          {
            id: 'time-eleanor-1968',
            tab: 'timeline',
            title: 'Eleanor Vale dies',
            body: 'According to the plaque on her portrait.',
            when: '1968',
          },
        ],
      },
      {
        id: 'umbrella',
        name: 'the umbrella stand',
        verb: 'Take',
        glance: 'An umbrella stand by the door, holding a single umbrella.',
        detail:
          "A brass stand, dulled and spotted, standing in a ring of its own dust. It holds exactly one umbrella, black, unremarkable — and bone dry. You were out in this rain for less than a minute walking from the car, and it soaked through your collar. Whatever this umbrella was last used for, it wasn't tonight, and it wasn't left here to dry either. It's simply, inexplicably, dry.",
        discoveries: [
          {
            id: 'obj-umbrella',
            tab: 'objects',
            title: 'The Umbrella',
            body: 'The only object in the Entrance Hall not coated in dust — and, despite the storm outside, entirely dry.',
          },
        ],
      },
      {
        id: 'coat-hooks',
        name: 'the coat hooks',
        verb: 'Examine',
        glance: 'A row of brass coat hooks beside the door.',
        detail:
          "Six hooks, five empty. The sixth holds a woman's wool shawl, moth-eaten along the hem but otherwise in better condition than anything else in this hall has a right to be. Stitched into the corner, small and neat: E.V. It should be older than the dust around it. It looks newer than you are.",
        discoveries: [
          {
            id: 'obj-shawl',
            tab: 'objects',
            title: "Eleanor's Shawl",
            body: "Monogrammed E.V. Hanging by the entrance in unaccountably good condition for something that, if it belonged to Eleanor Vale, should be decades old.",
          },
        ],
      },
    ],
    exits: [
      {
        id: 'east-door',
        label: 'the door to the rest of the house',
        state: 'locked',
        lockedText:
          "It doesn't budge. There's no keyhole to speak of — only a small brass plate, worn smooth at the centre, where a handle should be. Whatever opens this door, it isn't a key.",
      },
    ],
  },
}

export const startingRoomId = 'entrance-hall'
