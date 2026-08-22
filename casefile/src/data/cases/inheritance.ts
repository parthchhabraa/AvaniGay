import type { Case } from "../../types";

export const inheritanceCase: Case = {
  id: "inheritance",
  number: "#0071",
  title: "The Blackwood Inheritance",
  difficulty: 5,
  location: "Blackwood Manor",
  date: "19 December",
  victim: "Lord Alistair Blackwood",
  synopsis:
    "Lord Alistair Blackwood summoned his family to the manor to announce a new will that night — one that would disinherit his nephew and heir apparent, Rupert, in favor of a son few knew existed. Before he could make the announcement, he was found dead in his locked study, a revolver in his hand and a note beside it. Everyone wants to call it suicide. The detective isn't so sure a locked door tells the whole story.",
  objectiveNote:
    "Determine who ensured Alistair never lived to sign his new will, how a locked study was made to look like a private tragedy, and why — and be careful: the most obvious motive in this case may point in exactly the wrong direction.",
  suspects: [
    {
      id: "rupert",
      name: "Rupert Blackwood",
      age: 43,
      role: "Nephew & Heir Apparent",
      initials: "RB",
      bio: "Rupert has spent his entire adult life as heir to Blackwood Manor and its fortune, and stood to lose nearly everything the moment his uncle's new will was signed. His temper is well known throughout the household.",
      motive: "About to be disinherited entirely in favor of an illegitimate half-brother he'd never even met.",
      alibi: "Says he was at the village pub from 8 PM until well past 11, visible to the entire room.",
      relationshipToVictim: "Nephew; heir apparent under the old will.",
      quirk: "Collects antique dueling pistols, much to the household's discomfort.",
      suspicionLevel: 5,
      isCulprit: false,
    },
    {
      id: "camille",
      name: "Camille Blackwood",
      age: 39,
      role: "Rupert's Wife",
      initials: "CB",
      bio: "Camille married into the family expecting security and status that now hangs entirely on a will about to be rewritten against her. Fiercely protective of her husband's position, some say more ambitious than he is.",
      motive: "Shares equally in the loss of inheritance and social standing that Rupert's disinheritance would bring.",
      alibi: "Says she accompanied Rupert to the pub for part of the evening, then returned to the manor around 9:30 to check on their children.",
      relationshipToVictim: "Niece by marriage.",
      quirk: "Always seems to know exactly what everyone in the house is doing at any given moment.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "pryce",
      name: "Mr. Edwin Pryce",
      age: 60,
      role: "Estate Manager",
      initials: "EP",
      bio: "Pryce has managed the Blackwood estate's finances for over two decades. Alistair recently discovered — and quietly confronted him about — years of skimmed funds from estate accounts.",
      motive: "Faced exposure and ruin once Alistair's discovery became public, though the two had reportedly reached a private repayment arrangement days before.",
      alibi: "Says he was in the estate office reviewing account corrections with the family accountant until nearly midnight.",
      relationshipToVictim: "Longtime estate manager; recently caught embezzling, but reportedly already resolving it quietly.",
      quirk: "Recalculates every figure twice, out loud, under his breath.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "gabriel",
      name: "Gabriel Ashe",
      age: 27,
      role: "Alistair's Illegitimate Son",
      initials: "GA",
      bio: "Gabriel learned only months ago that Alistair was his biological father. Alistair, in his final months, grew determined to formally acknowledge him and name him principal heir — a plan that, that night, was still unsigned.",
      motive: "None that holds up — Alistair's death before signing the new will means the old will stands, leaving Gabriel with nothing at all.",
      alibi: "Says he was in the guest wing reviewing legal papers Alistair had given him, alone, most of the evening.",
      relationshipToVictim: "Biological son, only recently acknowledged privately.",
      quirk: "Still carries himself like a stranger in the house, uncertain where he's allowed to sit.",
      suspicionLevel: 2,
      isCulprit: false,
    },
    {
      id: "whitmore",
      name: "Mr. Whitmore",
      age: 71,
      role: "Butler",
      initials: "MW",
      bio: "Whitmore has served the Blackwood family for over fifty years, through three generations. Fiercely devoted to what he calls 'the family name,' he was visibly, quietly distressed by Alistair's plan to name an outsider — however biologically related — as heir.",
      motive: "Believed naming Gabriel heir would scandalize and permanently damage the Blackwood family name he had devoted his entire life to protecting.",
      alibi: "Says he was polishing silver in the downstairs pantry from 9 PM until he was informed of Alistair's death.",
      relationshipToVictim: "Butler of fifty years; considers himself a guardian of family legacy.",
      quirk: "Still refers to Alistair's late father as 'the old Lord,' as if he might walk in any moment.",
      suspicionLevel: 1,
      isCulprit: true,
    },
    {
      id: "adaline",
      name: "Ms. Adaline Cross",
      age: 45,
      role: "Family Solicitor",
      initials: "AC",
      bio: "Adaline was drafting the new will at Alistair's request and was due to formally witness its signing that very night. She was the one who discovered the body.",
      motive: "None discovered — she stood to gain nothing from Alistair's death and lose a significant, high-profile client.",
      alibi: "Says she was in the library finalizing the will's paperwork and went to the study around 12:10 AM for the scheduled signing, discovering the body.",
      relationshipToVictim: "Solicitor, hired specifically to draft and witness the new will.",
      quirk: "Carries a leather portfolio she never lets out of arm's reach.",
      suspicionLevel: 1,
      isCulprit: false,
    },
  ],
  locations: [
    {
      id: "study",
      name: "Alistair's Study",
      description: "The locked room where Alistair was found dead, revolver in hand and a note beside him.",
      evidenceIds: ["gunresidue", "suicidenote"],
    },
    {
      id: "guncabinet",
      name: "Gun Cabinet Room",
      description: "A locked cabinet housing the family's antique and modern firearms, including the revolver used.",
      evidenceIds: ["cabinetlog"],
    },
    {
      id: "pantry",
      name: "Downstairs Pantry",
      description: "Where Whitmore claimed to be polishing silver for most of the evening.",
      evidenceIds: ["floorboard"],
    },
    {
      id: "library",
      name: "Library",
      description: "Where Adaline Cross worked on the new will's final paperwork.",
      evidenceIds: ["willdraft", "typewritersample"],
    },
    {
      id: "gallery",
      name: "Portrait Gallery",
      description: "A hallway lined with generations of Blackwood family portraits.",
      evidenceIds: ["portrait"],
    },
    {
      id: "village",
      name: "Village Pub & Green",
      description: "Where Rupert and, briefly, Camille spent the evening.",
      evidenceIds: ["pubwitness"],
    },
  ],
  evidence: [
    {
      id: "gunresidue",
      name: "Gunpowder Residue Analysis",
      type: "forensic",
      locationId: "study",
      summary: "Residue testing on Alistair's hands after the shooting.",
      details:
        "Gunpowder residue is found clearly on Alistair's right hand — but the family portrait in the gallery, along with Adaline's own account, confirms Alistair was strongly left-handed his entire life, and always held a pistol left-handed at the shooting range. This is the wrong hand for a self-inflicted shot.",
      isRedHerring: false,
      relatedSuspectIds: ["whitmore"],
    },
    {
      id: "suicidenote",
      name: "The 'Suicide' Note",
      type: "letter",
      locationId: "study",
      summary: "A short typed note found beside Alistair's body, apparently expressing despair.",
      details:
        "The note's phrasing is oddly formal and stitched-together, as though assembled from fragments of Alistair's own old letters rather than written fresh in a moment of despair. Compared against genuine samples of his writing, several phrases match almost word-for-word — but from letters written years apart, on entirely unrelated subjects.",
      isRedHerring: false,
      relatedSuspectIds: ["whitmore"],
    },
    {
      id: "cabinetlog",
      name: "Gun Cabinet Access Record",
      type: "log",
      locationId: "guncabinet",
      summary: "A record of who holds keys to the family gun cabinet.",
      details:
        "Only two keys to the gun cabinet exist: one held by Alistair himself, and one held by Whitmore, who has managed the household's firearms and hunting equipment for decades. No one else had unsupervised access.",
      isRedHerring: false,
      relatedSuspectIds: ["whitmore"],
    },
    {
      id: "floorboard",
      name: "Creaking Floorboard Testimony",
      type: "document",
      locationId: "pantry",
      summary: "A kitchen maid's statement about sounds heard that night.",
      details:
        "A maid reports hearing the distinctive creak of the study floorboard directly above the pantry at approximately 11:40 PM — a sound she knows well from years in the house. Whitmore claims to have been in the pantry, one floor below the study, at that exact time, polishing silver alone. The two accounts cannot both be true.",
      isRedHerring: false,
      relatedSuspectIds: ["whitmore"],
    },
    {
      id: "willdraft",
      name: "Draft of the New Will",
      type: "document",
      locationId: "library",
      summary: "Adaline's near-final draft of Alistair's new will, unsigned.",
      details:
        "The draft names Gabriel Ashe principal heir to the estate, formally acknowledging him as Alistair's son, and reduces Rupert to a modest fixed allowance. Crucially, the draft was never signed or witnessed — meaning under law, Alistair's old will, naming Rupert heir, still stands as written.",
      isRedHerring: false,
      relatedSuspectIds: ["rupert", "gabriel"],
    },
    {
      id: "typewritersample",
      name: "Household Typewriter Sample",
      type: "document",
      locationId: "library",
      summary: "A sample typed on the study's own typewriter, used to compare against the note.",
      details:
        "Confirms the note was typed on Alistair's own study typewriter — meaning whoever wrote it had access to his private study, not just knowledge of his phrasing. This narrows the field considerably to household members with regular, unsupervised access to that room.",
      isRedHerring: false,
      relatedSuspectIds: ["whitmore"],
    },
    {
      id: "portrait",
      name: "Family Portrait Gallery",
      type: "photograph",
      locationId: "gallery",
      summary: "Generations of Blackwood family portraits line the gallery hallway.",
      details:
        "Alistair's own portrait, painted a decade ago, shows him holding a fountain pen in his left hand — confirmed by the household as accurate to his lifelong habit. A small but telling detail once compared against the gunpowder residue findings.",
      isRedHerring: false,
      relatedSuspectIds: [],
    },
    {
      id: "pubwitness",
      name: "Village Pub Witness Statements",
      type: "document",
      locationId: "village",
      summary: "Statements from the innkeeper and several regulars at the village pub.",
      details:
        "The innkeeper and no fewer than six regulars confirm Rupert was at the pub, visibly drinking and complaining loudly about his uncle's plans, from shortly after 8 PM until well past 11 — an unshakeable alibi for the entire window in question.",
      isRedHerring: true,
      redHerringExplanation:
        "Rupert had the strongest, most obvious motive in the entire case — but an entire pub full of independent witnesses confirms he was nowhere near the manor when Alistair died.",
      relatedSuspectIds: ["rupert"],
    },
  ],
  timeline: [
    { id: "t1", time: "8:05 PM", sortKey: 2005, description: "Rupert and Camille leave for the village pub, seen by household staff.", isKeyEvent: false },
    { id: "t2", time: "9:00 PM", sortKey: 2100, description: "Alistair meets privately with Mr. Pryce to finalize the repayment arrangement.", isKeyEvent: false },
    { id: "t3", time: "9:30 PM", sortKey: 2130, description: "Camille returns to the manor to check on the children; Rupert remains at the pub.", isKeyEvent: false },
    { id: "t4", time: "10:15 PM", sortKey: 2215, description: "Adaline Cross begins final revisions to the new will in the library.", isKeyEvent: false },
    { id: "t5", time: "11:30 PM", sortKey: 2330, description: "Whitmore is last seen heading toward the pantry, claiming he intends to polish silver.", isKeyEvent: false },
    { id: "t6", time: "11:40 PM", sortKey: 2340, description: "A kitchen maid hears the study floorboard creak directly above the pantry.", isKeyEvent: true },
    { id: "t7", time: "11:55 PM", sortKey: 2355, description: "A single gunshot is heard, muffled, from the direction of the study; assumed at first to be a servant dropping something heavy.", isKeyEvent: true },
    { id: "t8", time: "12:10 AM", sortKey: 2410, description: "Adaline arrives at the study for the scheduled will signing and finds the door locked.", isKeyEvent: false },
    { id: "t9", time: "12:20 AM", sortKey: 2420, description: "The door is forced open; Alistair is found dead, revolver in his right hand.", isKeyEvent: true },
  ],
  interrogations: [
    {
      suspectId: "rupert",
      intro: "Rupert's collar is loosened, his voice still rough from the pub's noise and cheap gin.",
      questions: [
        {
          id: "q1",
          label: "Ask about the new will",
          answer:
            "\"He was going to hand everything to a man I'd never even heard of a year ago. My whole life, gone, to a stranger with his blood and none of his name.\"",
        },
        {
          id: "q2",
          label: "Ask about his whereabouts",
          answer:
            "\"Ask anyone at the Green Man. I was there from eight until well past eleven, loud and miserable and buying rounds I couldn't afford. Dozens of witnesses.\"",
          unlocksEvidenceId: "pubwitness",
        },
        {
          id: "q3",
          label: "Ask about Gabriel",
          answer:
            "\"I don't blame him, strangely enough. He didn't ask for any of this either. I blame my uncle, and I suppose now I can't even do that properly.\"",
        },
        {
          id: "q4",
          label: "Ask about the gun cabinet",
          answer:
            "\"I collect pistols, yes, but the working firearms were always Whitmore's domain. I never had a key to that cabinet, not once in my life.\"",
        },
      ],
    },
    {
      suspectId: "camille",
      intro: "Camille answers each question with careful, deliberate precision.",
      questions: [
        {
          id: "q1",
          label: "Ask about that evening",
          answer:
            "\"I was with Rupert at the pub until half past nine, then came back to check on the children. I was in the nursery wing the rest of the night.\"",
        },
        {
          id: "q2",
          label: "Ask about the new will",
          answer:
            "\"It would have ruined us, socially and financially both. I won't pretend that didn't frighten me. But frightened isn't the same as guilty.\"",
        },
        {
          id: "q3",
          label: "Ask about Gabriel",
          answer:
            "\"A perfectly pleasant young man, from what little I've seen of him. None of this is his fault, whatever Rupert says when he's had too much to drink.\"",
        },
        {
          id: "q4",
          label: "Ask about Whitmore",
          answer:
            "\"Whitmore's been in this house longer than I've been alive. Fiercely loyal, old-fashioned to a fault. He looked positively ill when the new will was first mentioned at dinner.\"",
        },
      ],
    },
    {
      suspectId: "pryce",
      intro: "Pryce mutters a figure under his breath before catching himself and looking up.",
      questions: [
        {
          id: "q1",
          label: "Ask about the missing funds",
          answer:
            "\"A grave error in judgment, years ago, that I have deeply regretted. Alistair and I had already reached an arrangement to repay it quietly, without scandal, before any of this happened.\"",
        },
        {
          id: "q2",
          label: "Ask about that arrangement",
          answer:
            "\"We met at nine that evening and settled the terms. He was, if anything, relieved to have it resolved without involving the courts or the family. I had no reason left to want him dead.\"",
        },
        {
          id: "q3",
          label: "Ask about his whereabouts later that night",
          answer:
            "\"I stayed in the estate office reviewing the corrected figures with the accountant until nearly midnight. He can confirm every minute of it.\"",
        },
        {
          id: "q4",
          label: "Ask about the new will",
          answer:
            "\"It didn't affect my arrangement with Alistair one way or another. My concern that night was entirely financial, and entirely resolved.\"",
        },
      ],
    },
    {
      suspectId: "gabriel",
      intro: "Gabriel sits stiffly, as though still unsure he belongs in this house at all.",
      questions: [
        {
          id: "q1",
          label: "Ask about learning the truth",
          answer:
            "\"Only a few months ago. My mother finally told me who my father was, near the end of her life. Alistair reached out to me himself not long after.\"",
        },
        {
          id: "q2",
          label: "Ask about the new will",
          answer:
            "\"He wanted to make things right, he said. I never asked for any of it — money, the name, any of it. I only wanted to know him, a little, before it was too late.\"",
        },
        {
          id: "q3",
          label: "Ask about that night",
          answer:
            "\"I stayed in the guest wing reviewing papers he'd given me earlier. I barely know this house. I didn't want to wander somewhere I wasn't welcome.\"",
        },
        {
          id: "q4",
          label: "Ask what happens now that Alistair is dead",
          answer:
            "Gabriel's expression falls. \"...The will was never signed, was it. Which means, legally, I have no claim to anything at all. I suppose that's rather the cruelest part of all this.\"",
          requiresEvidenceId: "willdraft",
        },
      ],
    },
    {
      suspectId: "whitmore",
      intro: "Whitmore stands rather than sits, as he always has in this house, hands folded behind his back.",
      questions: [
        {
          id: "q1",
          label: "Ask about his years of service",
          answer:
            "\"Fifty-one years this spring, sir. I served the old Lord before him, and I'll serve this family faithfully until my last breath.\"",
        },
        {
          id: "q2",
          label: "Ask about the new will",
          answer:
            "\"It is not my place to question His Lordship's wishes.\" A pause, tightly controlled. \"...Though I confess I found the notion difficult to accept, given everything this family has always stood for.\"",
        },
        {
          id: "q3",
          label: "Ask about that evening",
          answer:
            "\"I was in the downstairs pantry polishing the silver from nine o'clock until I was informed of the tragedy. Alone, I'm afraid — there was no one to vouch for me, though I've no reason to lie.\"",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "Whitmore's composure, held for fifty years, finally slips entirely. \"...I could not let an outsider erase everything this family has ever been, sir. I did what I believed the old Lord himself would have wanted. I am not sorry for protecting this house. I am only sorry for how.\"",
          isContradiction: true,
          contradictionNote:
            "Whitmore claimed to be in the pantry the entire time, but a maid heard the study floorboard directly above creak at 11:40 PM — the two accounts cannot both be true, and confronted with it, Whitmore effectively confesses.",
          requiresEvidenceId: "floorboard",
          requiresQuestionIds: ["q3"],
        },
      ],
    },
    {
      suspectId: "adaline",
      intro: "Adaline sets her leather portfolio down carefully, still visibly shaken from finding the body.",
      questions: [
        {
          id: "q1",
          label: "Ask about the will",
          answer:
            "\"Alistair asked me to draft it weeks ago. It was nearly final — we intended to sign and formally witness it that very night, at half past midnight.\"",
        },
        {
          id: "q2",
          label: "Ask about finding the body",
          answer:
            "\"I arrived at the study a few minutes past midnight and found the door locked, which was unusual — he'd asked me to come directly. I fetched help immediately once no one answered.\"",
        },
        {
          id: "q3",
          label: "Ask about the note found beside him",
          answer:
            "\"I read it, of course, once the police allowed it. It didn't sound like him at all — too formal, oddly stitched together. Alistair wrote nothing like that in the weeks I worked closely with him.\"",
        },
        {
          id: "q4",
          label: "Ask about Alistair's state of mind",
          answer:
            "\"Determined, if anything. Almost lighter than I'd seen him in months, now that he'd decided to finally acknowledge Gabriel properly. A man planning to end his life doesn't usually spend his final weeks setting things right.\"",
        },
      ],
    },
  ],
  boardNodes: [
    { id: "n1", kind: "evidence", refId: "gunresidue", label: "Residue on Right Hand" },
    { id: "n2", kind: "evidence", refId: "portrait", label: "Portrait — Alistair Left-Handed" },
    { id: "n3", kind: "evidence", refId: "floorboard", label: "Floorboard Creaked Above Pantry" },
    { id: "n4", kind: "statement", refId: "whitmore", label: "Whitmore: \"Alone in Pantry\"" },
    { id: "n5", kind: "evidence", refId: "suicidenote", label: "Note — Stitched From Old Letters" },
    { id: "n6", kind: "evidence", refId: "typewritersample", label: "Typed on Study's Own Typewriter" },
    { id: "n7", kind: "evidence", refId: "willdraft", label: "Will Never Signed" },
    { id: "n8", kind: "evidence", refId: "pubwitness", label: "Rupert — Pub, Dozens of Witnesses" },
  ],
  boardLinks: [
    {
      id: "link1",
      nodeIds: ["n1", "n2"],
      type: "contradiction",
      title: "CONTRADICTION DETECTED",
      explanation:
        "Gunpowder residue was found on Alistair's right hand — but the family portrait, and every account of him, confirms he was strongly left-handed his entire life. A lifelong left-handed man does not suddenly shoot himself with his right.",
    },
    {
      id: "link2",
      nodeIds: ["n3", "n4"],
      type: "contradiction",
      title: "CONTRADICTION DETECTED",
      explanation:
        "Whitmore claimed to be alone in the downstairs pantry the entire time — but a maid clearly heard the study floorboard directly above creak at 11:40 PM. Both cannot be true; someone was in the study who shouldn't have been.",
    },
    {
      id: "link3",
      nodeIds: ["n5", "n6"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The stitched-together, oddly formal 'suicide note' was typed on the study's own typewriter — meaning whoever staged it had private, unsupervised access to that room, not just familiarity with Alistair's old letters.",
    },
    {
      id: "link4",
      nodeIds: ["n7", "n8"],
      type: "connection",
      title: "KEY DEDUCTION",
      explanation:
        "The most important logical turn in the case: since the will was never signed, Alistair's death actually left Gabriel with nothing and the old will — naming Rupert — still standing. Anyone killing Alistair to stop the new will benefits; anyone hoping to gain from it does not. This quietly eliminates Gabriel as a suspect and undercuts the obvious assumption that Rupert's motive made him guilty, since his alibi holds regardless.",
    },
  ],
  solution: {
    culpritId: "whitmore",
    methodId: "staged-suicide",
    motiveId: "protect-family-name",
    methodOptions: [
      { id: "staged-suicide", label: "Shot Alistair with his own revolver using his cabinet key, then staged a suicide note typed on the study's own typewriter" },
      { id: "poisoned-drink", label: "Poisoned Alistair's evening drink" },
      { id: "hired-outsider", label: "Hired an outside intruder to stage a robbery gone wrong" },
      { id: "pushed-accident", label: "Staged a fall down the study stairs" },
    ],
    motiveOptions: [
      { id: "protect-family-name", label: "To prevent an 'outsider' from inheriting and scandalizing the Blackwood family name after fifty years of devoted service" },
      { id: "financial-gain", label: "To secure a personal financial inheritance" },
      { id: "revenge-old-grudge", label: "Revenge for a decades-old personal grievance" },
      { id: "cover-embezzlement", label: "To cover up his own embezzlement from the estate" },
    ],
    narrative:
      "After fifty-one years of service, Whitmore had come to see himself less as staff and more as the last true guardian of the Blackwood name — a name he could not bear to see handed, in his eyes, to an outsider, however much Alistair's own blood ran through Gabriel's veins. Using the one key besides Alistair's own that opened the gun cabinet, Whitmore took the revolver into the study that night, shot Alistair before the new will could ever be signed, and pressed the gun into his right hand — not realizing, in his haste, that Alistair had been left-handed his entire life. He then typed a note on the study's own typewriter, stitching together phrases lifted from old letters to approximate a despairing goodbye. It nearly worked. But a maid one floor below heard the study floorboard creak at 11:40 PM, directly contradicting Whitmore's claim of solitary silver-polishing in the pantry below — and the residue on the wrong hand told the rest. The bitter irony, once Adaline's unsigned draft came to light, is that Whitmore's entire motive was built on a misunderstanding: with Alistair dead before the new will was signed, the old will stood untouched, Rupert remained heir, and Gabriel — the man Whitmore killed to keep from inheriting — was left with nothing at all.",
    keyEvidenceIds: ["gunresidue", "portrait", "floorboard", "suicidenote", "typewritersample", "cabinetlog"],
    redHerringNotes: [
      {
        evidenceId: "pubwitness",
        explanation:
          "Rupert had the loudest, most obvious motive in the case — but an entire pub full of independent witnesses confirms he never left the village that night.",
      },
    ],
  },
};
