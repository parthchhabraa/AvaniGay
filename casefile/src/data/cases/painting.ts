import type { Case } from "../../types";

export const paintingCase: Case = {
  id: "painting",
  number: "#0058",
  title: "The Vanishing Painting",
  difficulty: 3,
  location: "The Continental Gallery",
  date: "21 November",
  victim: "The Gallery (theft of 'Girl at the Window')",
  synopsis:
    "At the glittering opening gala for the Continental Gallery's new east wing, the power failed for exactly four minutes. When the lights returned, 'Girl at the Window' — the late master painter Isabelle Renard's most celebrated work — was gone from its frame, mounting hardware and all. Nearly two hundred guests were in the building. Only a handful had any real reason to want that painting gone.",
  objectiveNote:
    "Determine who engineered the blackout, how the painting was removed from a guarded wing in under four minutes, and why.",
  suspects: [
    {
      id: "corinne",
      name: "Corinne Baptiste",
      age: 49,
      role: "Gallery Director",
      initials: "CB",
      bio: "Corinne has run the Continental Gallery for eleven years and fought hard to secure this exhibition. Behind the scenes, the gallery's finances have been quietly disastrous, and this show was meant to be a turning point.",
      motive: "The gallery is deeply in debt; the painting was insured for far more than it would fetch at honest auction.",
      alibi: "Says she was near the east wing entrance when the power failed and ran toward the fuse room the moment the lights returned.",
      relationshipToVictim: "Gallery director; staked the institution's reputation on this exhibition.",
      quirk: "Carries three different sets of keys on her at all times, color-coded by wing.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "desmond",
      name: "Desmond Okafor",
      age: 33,
      role: "Head of Night Security",
      initials: "DO",
      bio: "Desmond has worked gallery security for six years and knows every camera blind spot in the building. He's normally reliable, but colleagues note he's seemed distracted and anxious for weeks.",
      motive: "Owes a significant sum to people who don't send polite reminders.",
      alibi: "Says he was checking the east wing exits when the power cut, and immediately radioed the front desk to report it.",
      relationshipToVictim: "Employee responsible for the painting's physical security.",
      quirk: "Keeps a small paperback mystery novel in his jacket pocket during every shift.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "felix",
      name: "Felix Adler",
      age: 44,
      role: "Art Critic",
      initials: "FA",
      bio: "A prominent and combative critic who has spent years publicly arguing the painting's authenticity is questionable, humiliating the Renard family in print more than once.",
      motive: "Believed exposing or removing the painting would finally vindicate years of dismissed accusations.",
      alibi: "Was delivering a toast on stage in the main hall when the lights failed, in full view of at least sixty guests.",
      relationshipToVictim: "Longtime public critic of the painting's authenticity.",
      quirk: "Never attends an event without a small tape recorder for 'notes.'",
      suspicionLevel: 4,
      isCulprit: false,
    },
    {
      id: "victor",
      name: "Victor Renard",
      age: 38,
      role: "The Painter's Estranged Son",
      initials: "VR",
      bio: "Victor has spent years disputing how his late mother's estate handled the sale of her work to the gallery, insisting the family never properly consented. He requested — and was granted — a private viewing of the east wing earlier that day.",
      motive: "Believes the painting was sold without proper family consent and rightfully belongs to him, not the gallery.",
      alibi: "Says he was in the main hall mingling with guests when the power went out, though no one can specifically recall seeing him at that exact moment.",
      relationshipToVictim: "Son of the painter; disputes the painting's legal ownership.",
      quirk: "Always carries a small, worn family photograph in his coat pocket.",
      suspicionLevel: 2,
      isCulprit: true,
    },
    {
      id: "ingrid",
      name: "Ingrid Solberg",
      age: 56,
      role: "Private Art Collector",
      initials: "IS",
      bio: "A wealthy, obsessive collector who lost a bidding war for a different Renard piece two years ago and has been vocal about wanting 'Girl at the Window' for her private collection ever since.",
      motive: "Desire to privately own the piece at any cost, having failed to acquire Renard work through legitimate channels before.",
      alibi: "Says she was in the ladies' lounge with two other guests when the power failed.",
      relationshipToVictim: "Prospective buyer; previously outbid for another of the painter's works.",
      quirk: "Wears white gloves to every gallery event, 'just in case.'",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "priya",
      name: "Priya Nair",
      age: 27,
      role: "Catering & Events Lead",
      initials: "PN",
      bio: "Priya coordinated the gala's catering and logistics. She was seen near the utility corridor shortly before the blackout, which drew immediate suspicion — though her reasons turn out to be entirely mundane.",
      motive: "None discovered — initially suspicious due to proximity to the fuse room.",
      alibi: "Says she was dealing with a champagne spill near the utility corridor and briefly checked the cooling unit breaker, unrelated to the main gallery fuse box.",
      relationshipToVictim: "Contracted event staff; no known connection to the painting.",
      quirk: "Carries a walkie-talkie clipped to her belt at all times during events.",
      suspicionLevel: 2,
      isCulprit: false,
    },
  ],
  locations: [
    {
      id: "eastwing",
      name: "East Wing Gallery",
      description: "Where 'Girl at the Window' was displayed, now an empty frame on the wall.",
      evidenceIds: ["emptyframe", "toolmarks"],
    },
    {
      id: "fuseroom",
      name: "Fuse & Utility Room",
      description: "The gallery's electrical control room, tucked behind an unmarked door in the utility corridor.",
      evidenceIds: ["scorchmarks", "screwdriver"],
    },
    {
      id: "loadingdock",
      name: "Loading Dock",
      description: "A rear delivery entrance with a camera covering the exit route.",
      evidenceIds: ["dockcamera"],
    },
    {
      id: "coatcheck",
      name: "Coat Check",
      description: "Where guests' coats were held during the gala.",
      evidenceIds: ["photograph", "torncoat"],
    },
    {
      id: "frontoffice",
      name: "Gallery Front Office",
      description: "Administrative offices containing appointment logs and legal correspondence.",
      evidenceIds: ["viewinglog", "legalletter"],
    },
    {
      id: "mainhall",
      name: "Main Hall",
      description: "Where most guests, including the critic giving a toast, gathered during the gala.",
      evidenceIds: ["stagewitness"],
    },
  ],
  evidence: [
    {
      id: "emptyframe",
      name: "The Empty Frame",
      type: "forensic",
      locationId: "eastwing",
      summary: "The ornate frame still hangs on the wall — the canvas and its mounting hardware are gone entirely.",
      details:
        "The mounting brackets show no signs of being forced or pried loose in a hurry — they appear to have been loosened carefully and deliberately, likely well before the blackout, so the canvas could simply be lifted free in seconds once the lights went out.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "toolmarks",
      name: "Faint Tool Marks on Mounting Bracket",
      type: "forensic",
      locationId: "eastwing",
      summary: "Small scuff marks on the mounting bracket, consistent with a screwdriver.",
      details:
        "The marks are old enough to have been made hours before the theft, not during the chaotic four-minute blackout — someone had access to this frame, alone and unhurried, earlier in the day.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "scorchmarks",
      name: "Scorch Marks on the Fuse Box",
      type: "forensic",
      locationId: "fuseroom",
      summary: "Small burn marks around the main breaker, suggesting deliberate tampering.",
      details:
        "The breaker wasn't simply switched off — it was jammed with a small tool to trip the whole east wing circuit at a precise moment, then reset from a distance. This was not an accident or routine maintenance issue; it was engineered.",
      isRedHerring: false,
      relatedSuspectIds: ["victor", "corinne"],
    },
    {
      id: "screwdriver",
      name: "Screwdriver in Coat Check",
      type: "object",
      locationId: "coatcheck",
      summary: "A small flathead screwdriver found in an unclaimed coat pocket.",
      details:
        "The screwdriver's tip matches both the tool marks on the mounting bracket and the scorch pattern on the fuse box. The coat is later confirmed to belong to Victor Renard, checked in under his own name.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
      requiresEvidenceIds: ["toolmarks"],
    },
    {
      id: "dockcamera",
      name: "Loading Dock Camera Log",
      type: "log",
      locationId: "loadingdock",
      summary: "Security camera footage log from the rear loading dock.",
      details:
        "A delivery van registered to Victor Renard's small framing business is logged leaving the loading dock at 9:47 PM — three minutes after the blackout began, well before general power was restored to that area.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "photograph",
      name: "Torn Family Photograph",
      type: "photograph",
      locationId: "coatcheck",
      summary: "A worn, torn photograph found on the floor near the coat check.",
      details:
        "An old photograph of a mother and young son, torn slightly at one corner. Later identified as Isabelle Renard and a young Victor. It likely fell from his coat pocket during the confusion of the blackout.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "torncoat",
      name: "Torn Coat Lining",
      type: "object",
      locationId: "coatcheck",
      summary: "A guest's coat with a small tear in the inner lining, wide enough to conceal a rolled canvas.",
      details:
        "The tear appears deliberately reinforced with hidden stitching, wide enough to conceal a small rolled canvas against the body. The coat is Victor Renard's, checked in under his own name that evening.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "viewinglog",
      name: "Private Viewing Appointment Log",
      type: "log",
      locationId: "frontoffice",
      summary: "The east wing's private viewing sign-in sheet for the day of the gala.",
      details:
        "Victor Renard requested and received a private, unaccompanied viewing of the east wing that afternoon, roughly four hours before the gala began — ample time to loosen the mounting hardware unnoticed.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "legalletter",
      name: "Ownership Dispute Letter",
      type: "letter",
      locationId: "frontoffice",
      summary: "A formal legal letter disputing the gallery's ownership of the painting.",
      details:
        "Victor's attorney formally disputes that the Renard family ever consented to the painting's sale, arguing it should be returned to the family estate. The gallery's legal team had rejected the claim outright just one week before the gala.",
      isRedHerring: false,
      relatedSuspectIds: ["victor"],
    },
    {
      id: "stagewitness",
      name: "Stage Witness Statements",
      type: "document",
      locationId: "mainhall",
      summary: "Written statements from guests seated near the stage during the blackout.",
      details:
        "At least a dozen guests confirm Felix Adler was mid-toast on the main hall stage, microphone in hand, when the lights failed — and continued, undeterred, once they returned. He never left the stage.",
      isRedHerring: true,
      redHerringExplanation:
        "Felix's very public feud with the Renard family made him an obvious suspect, but a room full of witnesses places him on stage for the entire blackout — he simply wasn't near the east wing.",
      relatedSuspectIds: ["felix"],
    },
  ],
  timeline: [
    { id: "t1", time: "3:30 PM", sortKey: 930, description: "Victor Renard receives a private, unaccompanied viewing of the east wing.", isKeyEvent: true },
    { id: "t2", time: "7:00 PM", sortKey: 1900, description: "Gala doors open; guests begin arriving.", isKeyEvent: false },
    { id: "t3", time: "9:15 PM", sortKey: 2115, description: "Felix Adler takes the stage to begin his toast in the main hall.", isKeyEvent: false },
    { id: "t4", time: "9:30 PM", sortKey: 2130, description: "Ingrid Solberg is seen entering the ladies' lounge with two other guests.", isKeyEvent: false },
    { id: "t5", time: "9:44 PM", sortKey: 2144, description: "The east wing circuit trips; the gallery goes dark for exactly four minutes.", isKeyEvent: true },
    { id: "t6", time: "9:47 PM", sortKey: 2147, description: "A delivery van registered to Victor's framing business is logged leaving the loading dock.", isKeyEvent: true },
    { id: "t7", time: "9:48 PM", sortKey: 2148, description: "Power is restored to the east wing.", isKeyEvent: false },
    { id: "t8", time: "9:50 PM", sortKey: 2150, description: "A guest notices the empty frame and alerts security.", isKeyEvent: true },
  ],
  interrogations: [
    {
      suspectId: "corinne",
      intro: "Corinne's composure is immaculate, though her hands keep returning to her keys.",
      questions: [
        {
          id: "q1",
          label: "Ask about the gallery's finances",
          answer:
            "\"We're not in ruin, if that's what you're implying. This exhibition was meant to change our fortunes, not end them in scandal.\"",
        },
        {
          id: "q2",
          label: "Ask about the insurance",
          answer:
            "\"Of course the painting was insured — any institution would be foolish not to. That doesn't make me a suspect, Detective, that makes me competent.\"",
        },
        {
          id: "q3",
          label: "Ask about the blackout",
          answer:
            "\"I was near the east wing entrance greeting patrons when it happened. The moment the lights returned I ran straight for the fuse room myself.\"",
        },
        {
          id: "q4",
          label: "Ask about Victor's private viewing",
          answer:
            "\"I approved it personally, yes. He's the artist's son — it seemed a reasonable, even kind, gesture given the ownership dispute. I never imagined he'd use it like this.\"",
        },
      ],
    },
    {
      suspectId: "desmond",
      intro: "Desmond shifts his weight, hand drifting toward the paperback in his pocket out of nervous habit.",
      questions: [
        {
          id: "q1",
          label: "Ask about his debts",
          answer:
            "\"That's... personal. It has nothing to do with tonight.\" He won't elaborate further.",
        },
        {
          id: "q2",
          label: "Ask about the blackout",
          answer:
            "\"I was checking the east wing fire exits, standard procedure during a gala this size. Lights went out, I radioed the front desk immediately.\"",
        },
        {
          id: "q3",
          label: "Ask about camera blind spots",
          answer:
            "\"I know this building better than anyone, sure. That's my job. It doesn't mean I used that knowledge for something like this.\"",
        },
        {
          id: "q4",
          label: "Ask about Victor's private viewing",
          answer:
            "\"I let him in myself that afternoon, per Corinne's approval. Stood right outside the door the whole time. I never saw him touch the frame — but I wasn't watching every second, either.\"",
        },
      ],
    },
    {
      suspectId: "felix",
      intro: "Felix straightens his jacket, visibly enjoying being asked to account for himself.",
      questions: [
        {
          id: "q1",
          label: "Ask about the authenticity dispute",
          answer:
            "\"I've questioned that painting's provenance for years and stand by every word. If it's gone, perhaps the truth finally caught up with it.\"",
        },
        {
          id: "q2",
          label: "Ask about the blackout",
          answer:
            "\"I was mid-toast, microphone in hand, sixty witnesses at minimum. Ask any of them — I didn't so much as pause when the lights went out. Consummate professional.\"",
          unlocksEvidenceId: "stagewitness",
        },
        {
          id: "q3",
          label: "Ask about the Renard family",
          answer:
            "\"They've never forgiven me for asking honest questions. That's rather their problem, not mine.\"",
        },
        {
          id: "q4",
          label: "Ask about Victor",
          answer:
            "\"Victor's spent years insisting his mother's estate was mishandled. I've always found his outrage curiously well-timed with the gallery's biggest exhibitions.\"",
        },
      ],
    },
    {
      suspectId: "victor",
      intro: "Victor keeps his hand near his coat pocket, where the torn photograph used to be.",
      questions: [
        {
          id: "q1",
          label: "Ask about the ownership dispute",
          answer:
            "\"My mother never properly consented to that sale — the paperwork was rushed through while our family was still grieving. That painting should be ours by right, not the gallery's.\"",
        },
        {
          id: "q2",
          label: "Ask about the private viewing",
          answer:
            "\"I asked to see it alone, one last time, as her son. Corinne was gracious enough to allow it. Is that a crime now?\"",
        },
        {
          id: "q3",
          label: "Ask about the blackout",
          answer:
            "\"I was mingling in the main hall, same as everyone else. It was chaos — I doubt anyone can say precisely where I was for four minutes in the dark.\"",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "Victor's jaw tightens. \"...If you found something with my name on it, I imagine you already have your answer. I only wanted what was always meant to be my family's. Nothing more.\"",
          requiresEvidenceId: "dockcamera",
          requiresQuestionIds: ["q3"],
        },
      ],
    },
    {
      suspectId: "ingrid",
      intro: "Ingrid adjusts her white gloves before offering a thin, polite smile.",
      questions: [
        {
          id: "q1",
          label: "Ask about her collecting habits",
          answer:
            "\"I collect what I love, Detective. I lost a bidding war for a Renard piece once and I've regretted it every day since. That's hardly a confession.\"",
        },
        {
          id: "q2",
          label: "Ask about the blackout",
          answer:
            "\"I was in the ladies' lounge with two other guests — ask them yourself, they'll confirm it. We were discussing the exhibition, actually, when the lights failed.\"",
        },
        {
          id: "q3",
          label: "Ask about the painting's value",
          answer:
            "\"To the right collector, immeasurable. But I have entirely legitimate ways of eventually acquiring what I want. Patience is a virtue I've cultivated expensively.\"",
        },
        {
          id: "q4",
          label: "Ask about Victor",
          answer:
            "\"We've spoken once or twice at previous events. He seemed... preoccupied, always. I assumed it was grief. Perhaps it was something else entirely.\"",
        },
      ],
    },
    {
      suspectId: "priya",
      intro: "Priya's walkie-talkie crackles softly as she waits, visibly relieved someone finally wants her account.",
      questions: [
        {
          id: "q1",
          label: "Ask why she was near the utility corridor",
          answer:
            "\"Champagne spill near the coat check, ruined a whole tray. I went to grab towels from the utility closet and checked the cooling unit breaker while I was there — nothing to do with the gallery's main power.\"",
        },
        {
          id: "q2",
          label: "Ask about the fuse room",
          answer:
            "\"That room's locked separately from the utility closet — I don't even have a key to it. Ask Desmond or Corinne, they're the ones with access.\"",
        },
        {
          id: "q3",
          label: "Ask about the blackout",
          answer:
            "\"Scared the life out of me, honestly. I was still cleaning up champagne glass when it happened. My walkie-talkie log shows me calling it in at 9:45.\"",
        },
        {
          id: "q4",
          label: "Ask about Victor",
          answer:
            "\"I remember his coat check ticket — nice man, a bit quiet. He asked what time the gala would end. Seemed like an odd thing to fixate on, now that I think about it.\"",
        },
      ],
    },
  ],
  boardNodes: [
    { id: "n1", kind: "evidence", refId: "toolmarks", label: "Tool Marks — Hours Before Blackout" },
    { id: "n2", kind: "evidence", refId: "viewinglog", label: "Victor's Private Viewing Log" },
    { id: "n3", kind: "evidence", refId: "screwdriver", label: "Screwdriver in Victor's Coat" },
    { id: "n4", kind: "evidence", refId: "dockcamera", label: "Framing Van Leaves at 9:47 PM" },
    { id: "n5", kind: "evidence", refId: "torncoat", label: "Reinforced Coat Lining" },
    { id: "n6", kind: "evidence", refId: "stagewitness", label: "Felix on Stage — Dozen Witnesses" },
    { id: "n7", kind: "evidence", refId: "scorchmarks", label: "Fuse Box Deliberately Tripped" },
    { id: "n8", kind: "evidence", refId: "legalletter", label: "Rejected Ownership Claim" },
  ],
  boardLinks: [
    {
      id: "link1",
      nodeIds: ["n1", "n2"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The tool marks on the mounting bracket were made hours before the blackout, exactly matching the window Victor had alone with the painting during his private viewing that afternoon.",
    },
    {
      id: "link2",
      nodeIds: ["n3", "n5"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The screwdriver matching the tool marks and fuse box tampering was found in Victor's own coat — the same coat with a deliberately reinforced lining, wide enough to conceal a rolled canvas.",
    },
    {
      id: "link3",
      nodeIds: ["n4", "n7"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The fuse box was deliberately tripped at 9:44, and Victor's own delivery van left the loading dock just three minutes later — precisely timed to use the blackout as cover.",
    },
    {
      id: "link4",
      nodeIds: ["n6", "n8"],
      type: "connection",
      title: "NO MEANINGFUL CONNECTION",
      explanation:
        "Felix's public feud made him look suspicious, but a stage full of witnesses clears him entirely — his grudge, unlike Victor's rejected legal claim, never translated into opportunity.",
    },
  ],
  solution: {
    culpritId: "victor",
    methodId: "staged-blackout",
    motiveId: "reclaim-inheritance",
    methodOptions: [
      { id: "staged-blackout", label: "Loosened the frame during a private viewing, then tripped the fuse box himself to steal it during the blackout" },
      { id: "bribed-guard", label: "Bribed the head of security to look away during the blackout" },
      { id: "swapped-forgery", label: "Swapped the painting for a forged copy weeks earlier" },
      { id: "smuggled-daytime", label: "Smuggled the painting out during normal visiting hours before the gala" },
    ],
    motiveOptions: [
      { id: "reclaim-inheritance", label: "Believed the painting was sold without family consent and rightfully belonged to him" },
      { id: "insurance-fraud", label: "To collect on the gallery's insurance policy" },
      { id: "black-market-sale", label: "To sell the painting privately for profit" },
      { id: "revenge-critic", label: "To humiliate the gallery after years of public criticism" },
    ],
    narrative:
      "Victor Renard never accepted that his mother's most famous painting belonged to anyone but his family. Granted a private, unaccompanied viewing that afternoon, he used the quiet hour to loosen the mounting hardware just enough that the canvas could be lifted free in seconds — leaving no obvious signs until someone looked closely. That evening, he slipped away from the gala's main hall, tripped the east wing's fuse box using a small screwdriver he'd hidden in his coat, and in the four minutes of engineered darkness, removed the painting, concealed it in his coat's reinforced lining, and had it loaded into his own framing company's van, which left the loading dock at 9:47 — three minutes into the blackout. He never intended to sell it. He intended to take back what he'd spent years insisting was stolen from his family in the first place.",
    keyEvidenceIds: ["toolmarks", "viewinglog", "screwdriver", "dockcamera", "torncoat", "legalletter"],
    redHerringNotes: [
      {
        evidenceId: "stagewitness",
        explanation:
          "Felix Adler's very public feud with the Renard family made him look suspicious, but a room full of witnesses confirms he never left the stage during the blackout.",
      },
    ],
  },
};
