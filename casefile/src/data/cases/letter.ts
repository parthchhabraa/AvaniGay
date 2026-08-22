import type { Case } from "../../types";

export const letterCase: Case = {
  id: "letter",
  number: "#0063",
  title: "The Midnight Letter",
  difficulty: 4,
  location: "Pemberton House, the Countryside",
  date: "2 December",
  victim: "Augustus Pemberton",
  synopsis:
    "The Pemberton family gathered for the reading of the will, expecting a quiet, if tense, weekend. Instead, a typed letter appeared on Augustus Pemberton's desk at midnight — an anonymous threat demanding he hand over control of the family trust by morning or see a decades-old secret exposed. By one in the morning, Augustus was dead of an apparent heart attack, medication bottle at his side. His family insists it was simply his weak heart, finally giving out under the strain. The letter suggests otherwise.",
  objectiveNote:
    "Determine who wrote the midnight letter and why, how it connects to Augustus's death, and whether his heart failed on its own — or was made to.",
  suspects: [
    {
      id: "beatrice",
      name: "Beatrice Pemberton",
      age: 41,
      role: "Augustus's Wife",
      initials: "BP",
      bio: "Beatrice married Augustus fifteen years ago, much to his children's quiet disapproval. Their marriage has grown cold in recent years, and rumors of an affair have circulated among the staff. A prenuptial agreement was set to expire — and dramatically increase her settlement — in just three months.",
      motive: "The prenuptial agreement's terms would have improved significantly in her favor within months; some also whisper of an affair Augustus may have discovered.",
      alibi: "Says she left for her sister's home the previous afternoon and didn't return until the following morning, after receiving the news.",
      relationshipToVictim: "Wife of nine years, second marriage for both.",
      quirk: "Wears her late mother's pearl earrings to every family gathering, regardless of the occasion.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "nathaniel",
      name: "Nathaniel Pemberton",
      age: 35,
      role: "Augustus's Son",
      initials: "NP",
      bio: "Nathaniel has struggled for years with gambling debts he's hidden from the family, and Augustus recently learned the extent of it. A loud, drunken argument between father and son was overheard by nearly everyone at dinner.",
      motive: "Augustus had threatened, days before, to cut Nathaniel out of the will entirely over his debts.",
      alibi: "Says he drank himself into a stupor after the argument and passed out in the study, where a maid found him snoring at half past midnight.",
      relationshipToVictim: "Only son; primary heir under the current will.",
      quirk: "Keeps a hidden flask in nearly every jacket he owns.",
      suspicionLevel: 4,
      isCulprit: false,
    },
    {
      id: "gerald",
      name: "Gerald Finch",
      age: 63,
      role: "Family Lawyer & Old Friend",
      initials: "GF",
      bio: "Gerald has managed the Pemberton family trust for over twenty years and drafted every version of Augustus's will. He and Augustus were once close, though recent months have grown strained over a scheduled audit of the trust's accounts.",
      motive: "Had been quietly diverting funds from the family trust for years and faced imminent exposure once Augustus's planned audit began.",
      alibi: "Says he retired to his guest room around 10:30 PM to prepare documents for the will reading and didn't leave until breakfast.",
      relationshipToVictim: "Family lawyer and trustee; friend of over two decades.",
      quirk: "Still uses a manual typewriter for all his personal correspondence, insisting it's 'more honest' than typing on a machine that remembers.",
      suspicionLevel: 2,
      isCulprit: true,
    },
    {
      id: "agnes",
      name: "Agnes Merrow",
      age: 52,
      role: "Longtime Housekeeper",
      initials: "AM",
      bio: "Agnes has served the Pemberton household for over twenty-five years. A recently discovered old letter reveals she is, in fact, Augustus's illegitimate daughter from a relationship decades before his first marriage — a secret Augustus had always refused to acknowledge publicly.",
      motive: "Decades of being denied acknowledgment or inheritance despite being Augustus's own daughter.",
      alibi: "Says she left the estate that evening to tend to a sick relative in the village and didn't return until the next morning.",
      relationshipToVictim: "Housekeeper; secretly Augustus's biological daughter.",
      quirk: "Keeps a small, faded photograph of her late mother tucked inside her apron pocket.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "oswald",
      name: "Oswald Krane",
      age: 57,
      role: "Business Rival & Old Associate",
      initials: "OK",
      bio: "Oswald and Augustus were business partners decades ago before a bitter falling-out. He visited that day uninvited, and staff overheard a tense conversation in Augustus's study about 'the Hartwell matter.'",
      motive: "Augustus was preparing to publicly expose old fraud committed by Oswald in a shared business venture, which would have ruined him.",
      alibi: "Says he left the estate by car around 9:00 PM, confirmed by the gatehouse log.",
      relationshipToVictim: "Former business partner; recent visitor with unresolved history.",
      quirk: "Always arrives precisely on time and leaves precisely when he says he will — a point of personal pride.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "clementine",
      name: "Clementine Pemberton",
      age: 19,
      role: "Nathaniel's Daughter",
      initials: "CP",
      bio: "Clementine was seen sneaking around the grounds late that night, which immediately drew suspicion. The truth is far less dramatic than the family assumed.",
      motive: "None discovered — her behavior that night was unrelated to Augustus's death.",
      alibi: "Says she slipped out to meet a boy from the village she isn't supposed to be seeing, and was back in her room well before midnight.",
      relationshipToVictim: "Granddaughter.",
      quirk: "Hides a small stack of romance novels under her mattress that she insists no one has found.",
      suspicionLevel: 2,
      isCulprit: false,
    },
  ],
  locations: [
    {
      id: "study",
      name: "Augustus's Study",
      description: "Where Augustus was found dead, the midnight letter still on his desk.",
      evidenceIds: ["theletter", "pillbottle"],
    },
    {
      id: "guestroom",
      name: "Gerald's Guest Room",
      description: "The room Gerald stayed in during his visit for the will reading.",
      evidenceIds: ["typewriter", "ledger"],
    },
    {
      id: "pharmacy",
      name: "Village Pharmacy",
      description: "Where Augustus's heart medication was regularly refilled.",
      evidenceIds: ["pharmacyrecord"],
    },
    {
      id: "gatehouse",
      name: "Estate Gatehouse",
      description: "Where all vehicle comings and goings are logged by the night attendant.",
      evidenceIds: ["gatelog"],
    },
    {
      id: "attic",
      name: "Attic Storage",
      description: "Where old family letters and records are kept, largely forgotten.",
      evidenceIds: ["oldletter", "trainticket"],
    },
  ],
  evidence: [
    {
      id: "theletter",
      name: "The Midnight Letter",
      type: "letter",
      locationId: "study",
      summary: "A typed, unsigned letter found on Augustus's desk, demanding he sign over trust control by morning.",
      details:
        "The letter threatens to expose an old secret unless Augustus transfers control of the family trust by morning. It's typed, not handwritten — and typed on a machine with a distinctly worn lowercase 'e' that strikes slightly higher than the other letters, a flaw unique to whichever typewriter produced it.",
      isRedHerring: false,
      relatedSuspectIds: ["gerald"],
    },
    {
      id: "pillbottle",
      name: "Heart Medication Bottle",
      type: "forensic",
      locationId: "study",
      summary: "Augustus's prescription bottle, found beside his chair.",
      details:
        "The bottle's label matches Augustus's regular prescription, but several of the pills inside are subtly different in color and texture from the rest — later identified as inert placebo tablets, meaning his real dosage had been quietly reduced over recent weeks.",
      isRedHerring: false,
      relatedSuspectIds: ["gerald"],
    },
    {
      id: "typewriter",
      name: "Gerald's Personal Typewriter",
      type: "object",
      locationId: "guestroom",
      summary: "The manual typewriter Gerald brought with him, as he does everywhere.",
      details:
        "A test typing sample from this exact machine shows the same distinctly high-striking lowercase 'e' found in the midnight letter — an identical mechanical flaw. This typewriter produced the threatening letter.",
      isRedHerring: false,
      relatedSuspectIds: ["gerald"],
      requiresEvidenceIds: ["theletter"],
    },
    {
      id: "ledger",
      name: "Trust Account Ledger",
      type: "document",
      locationId: "guestroom",
      summary: "A private ledger tucked in Gerald's briefcase, showing years of trust account entries.",
      details:
        "Careful cross-referencing reveals small, consistent discrepancies over several years — money quietly diverted from the family trust into accounts that don't match any Pemberton family member. Augustus had scheduled a full audit for the following week.",
      isRedHerring: false,
      relatedSuspectIds: ["gerald"],
    },
    {
      id: "pharmacyrecord",
      name: "Pharmacy Pickup Record",
      type: "log",
      locationId: "pharmacy",
      summary: "The village pharmacy's log of who picked up Augustus's heart medication refill.",
      details:
        "Gerald Finch personally picked up Augustus's most recent prescription refill ten days before his death — something Gerald had occasionally done as a family friend over the years, giving him direct, unquestioned access to the medication before it ever reached Augustus.",
      isRedHerring: false,
      relatedSuspectIds: ["gerald"],
    },
    {
      id: "gatelog",
      name: "Gatehouse Vehicle Log",
      type: "log",
      locationId: "gatehouse",
      summary: "The night attendant's log of every vehicle entering and leaving the estate.",
      details:
        "Confirms Oswald Krane's car left the estate at 9:04 PM, hours before Augustus's death — corroborated independently by the gate attendant's own account.",
      isRedHerring: true,
      redHerringExplanation:
        "Oswald had a serious motive to silence Augustus, but the gatehouse log — kept by a night attendant with no reason to lie — confirms he was long gone before the letter even appeared.",
      relatedSuspectIds: ["oswald"],
    },
    {
      id: "oldletter",
      name: "Old Family Letter",
      type: "letter",
      locationId: "attic",
      summary: "A decades-old letter revealing Agnes's true parentage.",
      details:
        "A private letter, decades old, confirming Agnes Merrow is Augustus's biological daughter from a relationship before his first marriage — the very secret referenced in the midnight letter. This gives Agnes a real, sympathetic motive, but the letter itself was written and hidden away long before the threat, and offers no clue as to who sent the recent one.",
      isRedHerring: true,
      redHerringExplanation:
        "This confirms Agnes's painful motive is real, but her alibi — tending a sick relative off the property, corroborated by a phone log — holds firm, and nothing ties her to the letter or the medication tampering.",
      relatedSuspectIds: ["agnes"],
    },
    {
      id: "trainticket",
      name: "Beatrice's Train Ticket Stub",
      type: "document",
      locationId: "attic",
      summary: "A used train ticket stub found among Beatrice's belongings.",
      details:
        "Confirms Beatrice traveled to her sister's home the afternoon before Augustus's death and returned only the following morning — consistent with her stated alibi and independently corroborated by her sister.",
      isRedHerring: true,
      redHerringExplanation:
        "Beatrice's financial motive was real and substantial, but her travel is independently documented for the entire window of the crime.",
      relatedSuspectIds: ["beatrice"],
    },
  ],
  timeline: [
    { id: "t1", time: "9:00 PM", sortKey: 2100, description: "Oswald Krane's car leaves the estate, confirmed by the gatehouse log.", isKeyEvent: false },
    { id: "t2", time: "9:30 PM", sortKey: 2130, description: "A loud argument between Augustus and Nathaniel is overheard by several guests.", isKeyEvent: false },
    { id: "t3", time: "10:15 PM", sortKey: 2215, description: "Nathaniel drinks heavily and retreats to the study, later found passed out there.", isKeyEvent: false },
    { id: "t4", time: "10:30 PM", sortKey: 2230, description: "Gerald retires to his guest room, ostensibly to prepare documents.", isKeyEvent: false },
    { id: "t5", time: "11:45 PM", sortKey: 2345, description: "Gerald is later found to have slipped the typed letter under Augustus's study door around this time.", isKeyEvent: true },
    { id: "t6", time: "12:00 AM", sortKey: 2400, description: "Augustus discovers the midnight letter on his desk.", isKeyEvent: true },
    { id: "t7", time: "12:15 AM", sortKey: 2415, description: "A maid hears Augustus pacing and speaking sharply, alone, in his study.", isKeyEvent: false },
    { id: "t8", time: "1:00 AM", sortKey: 2500, description: "Augustus is found unresponsive in his study chair.", isKeyEvent: true },
    { id: "t9", time: "1:20 AM", sortKey: 2520, description: "The village doctor arrives and pronounces Augustus dead of an apparent heart attack.", isKeyEvent: true },
  ],
  interrogations: [
    {
      suspectId: "beatrice",
      intro: "Beatrice touches her mother's pearl earrings absently, eyes distant.",
      questions: [
        {
          id: "q1",
          label: "Ask about the marriage",
          answer:
            "\"We'd grown apart, yes. I won't pretend otherwise. But I never wished him dead, whatever the staff may whisper.\"",
        },
        {
          id: "q2",
          label: "Ask about the prenuptial agreement",
          answer:
            "\"In three months my settlement would have changed considerably, yes. I'm aware how that looks. It doesn't make it true.\"",
        },
        {
          id: "q3",
          label: "Ask about her whereabouts that night",
          answer:
            "\"I was at my sister's the entire evening and night. She'll confirm it, and I believe you'll find a train ticket among my things if you look.\"",
          unlocksEvidenceId: "trainticket",
        },
        {
          id: "q4",
          label: "Ask about the midnight letter",
          answer:
            "\"I never saw it, never wrote it. I wasn't even in the house. Whatever secret it threatens to expose, I imagine it isn't mine.\"",
        },
      ],
    },
    {
      suspectId: "nathaniel",
      intro: "Nathaniel reeks faintly of brandy even now, his eyes bloodshot.",
      questions: [
        {
          id: "q1",
          label: "Ask about the argument",
          answer:
            "\"He said he'd cut me out entirely if I didn't sort myself out. I said some things I shouldn't have. Then I drank until I couldn't feel any of it.\"",
        },
        {
          id: "q2",
          label: "Ask about his debts",
          answer:
            "\"Yes, fine, I owe more than I should. He found out and it broke something between us. I never got the chance to fix it.\"",
        },
        {
          id: "q3",
          label: "Ask about that night",
          answer:
            "\"I passed out in the study around half ten. A maid found me still snoring there past midnight. Ask her — I doubt I moved an inch.\"",
        },
        {
          id: "q4",
          label: "Ask about the midnight letter",
          answer:
            "\"I don't know a thing about any letter. If I'd wanted to threaten him I'd have done it to his face — I did enough of that already that night.\"",
        },
      ],
    },
    {
      suspectId: "gerald",
      intro: "Gerald folds his hands with lawyerly composure, though something behind his eyes is calculating.",
      questions: [
        {
          id: "q1",
          label: "Ask about the trust audit",
          answer:
            "\"Routine, Augustus said. Every few years he liked to review the accounts personally. Nothing out of the ordinary.\"",
        },
        {
          id: "q2",
          label: "Ask about his relationship with Augustus",
          answer:
            "\"Twenty years of friendship and trust. I drafted every will he ever wrote. I can't imagine this family without him.\"",
        },
        {
          id: "q3",
          label: "Ask about the typewriter",
          answer:
            "\"I bring it everywhere, yes, force of habit. I don't trust typing machines that keep records of everything you write. Rather old-fashioned of me, I know.\"",
          unlocksEvidenceId: "typewriter",
        },
        {
          id: "q4",
          label: "Challenge him with the ledger discrepancies",
          answer:
            "Gerald's composure finally cracks. \"...The audit would have ended me, Detective. Twenty years of work, gone, in front of everyone I've ever respected. I only meant to buy time — to convince him to let it go quietly. I never intended for it to go this far.\"",
          isContradiction: true,
          contradictionNote:
            "Gerald claimed the audit was 'nothing out of the ordinary,' but confronted with the ledger's discrepancies, he admits the audit would have exposed years of diverted trust funds — directly contradicting his earlier calm dismissal and revealing both motive and consciousness of guilt.",
          requiresEvidenceId: "ledger",
          requiresQuestionIds: ["q1"],
        },
      ],
    },
    {
      suspectId: "agnes",
      intro: "Agnes keeps her hand pressed against her apron pocket, where the old photograph rests.",
      questions: [
        {
          id: "q1",
          label: "Ask about her years of service",
          answer:
            "\"Twenty-five years in this house. I've raised his grandchildren nearly as much as their own parents have.\"",
        },
        {
          id: "q2",
          label: "Ask about her true parentage",
          answer:
            "She goes very quiet. \"...He never once acknowledged me. Not publicly, not privately, not even at the end. I made my peace with it long ago. Mostly.\"",
        },
        {
          id: "q3",
          label: "Ask about that night",
          answer:
            "\"My cousin took ill in the village. I left before supper and didn't return until morning. You can ask the doctor who attended her — I was there the whole night.\"",
        },
        {
          id: "q4",
          label: "Ask about the midnight letter",
          answer:
            "\"I know nothing of any letter. If someone finally told the truth about who I am, I'd have wanted it said with my name attached, not hidden behind threats.\"",
        },
      ],
    },
    {
      suspectId: "oswald",
      intro: "Oswald checks his pocket watch even now, a man of precise habits.",
      questions: [
        {
          id: "q1",
          label: "Ask about the Hartwell matter",
          answer:
            "\"An old business dispute, decades old. Augustus threatened to drag it into the light again, purely out of spite, I always believed.\"",
        },
        {
          id: "q2",
          label: "Ask about his visit that day",
          answer:
            "\"We spoke, argued a little, as old rivals do. I left at nine sharp, as I told the gatehouse attendant myself. I'm a punctual man.\"",
          unlocksEvidenceId: "gatelog",
        },
        {
          id: "q3",
          label: "Ask about the fraud allegations",
          answer:
            "\"Allegations, yes. Proof, less certain. I've spent thirty years building a reputation I won't let one old grudge destroy.\"",
        },
        {
          id: "q4",
          label: "Ask about the midnight letter",
          answer:
            "\"I was home in bed by the time anyone claims that letter appeared. Whoever wrote it, it wasn't me — I prefer confrontation to anonymous notes.\"",
        },
      ],
    },
    {
      suspectId: "clementine",
      intro: "Clementine fidgets, clearly relieved to finally explain herself to someone who isn't her father.",
      questions: [
        {
          id: "q1",
          label: "Ask why she was seen outside so late",
          answer:
            "She flushes. \"...There's a boy in the village. My father would never approve, so we meet after everyone's asleep. It's not exactly a state secret, just an embarrassing one.\"",
        },
        {
          id: "q2",
          label: "Ask about her grandfather",
          answer:
            "\"He could be difficult, but he was still my grandfather. I keep thinking about the last thing I said to him, which was honestly just 'goodnight.'\"",
        },
        {
          id: "q3",
          label: "Ask about the midnight letter",
          answer:
            "\"I never saw any letter. I was halfway across the garden by midnight, thinking about entirely different things, I promise you.\"",
        },
        {
          id: "q4",
          label: "Ask about her father Nathaniel",
          answer:
            "\"He was a wreck that night, shouting, then drinking himself unconscious. I checked on him around eleven — he was already out cold on the study sofa.\"",
        },
      ],
    },
  ],
  boardNodes: [
    { id: "n1", kind: "evidence", refId: "theletter", label: "Midnight Letter — Worn Typewriter 'e'" },
    { id: "n2", kind: "evidence", refId: "typewriter", label: "Gerald's Typewriter — Matching Flaw" },
    { id: "n3", kind: "evidence", refId: "ledger", label: "Trust Ledger Discrepancies" },
    { id: "n4", kind: "evidence", refId: "pharmacyrecord", label: "Gerald Picked Up Medication" },
    { id: "n5", kind: "evidence", refId: "pillbottle", label: "Placebo Pills in Bottle" },
    { id: "n6", kind: "evidence", refId: "gatelog", label: "Oswald's Car Leaves at 9:04 PM" },
    { id: "n7", kind: "evidence", refId: "oldletter", label: "Agnes's True Parentage" },
    { id: "n8", kind: "evidence", refId: "trainticket", label: "Beatrice's Train Ticket" },
  ],
  boardLinks: [
    {
      id: "link1",
      nodeIds: ["n1", "n2"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The midnight letter's distinctive high-striking lowercase 'e' matches, letter for letter, a sample typed on Gerald's own personal typewriter — placing its authorship directly with him.",
    },
    {
      id: "link2",
      nodeIds: ["n3", "n1"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The trust ledger's years of diverted funds explain exactly why Gerald needed to stall Augustus's planned audit — the midnight letter was his desperate attempt to regain control before exposure.",
    },
    {
      id: "link3",
      nodeIds: ["n4", "n5"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "Gerald personally picked up Augustus's medication refill ten days prior — and the bottle now contains placebo pills mixed in with the real ones, quietly weakening Augustus's heart medication in the days before his death.",
    },
    {
      id: "link4",
      nodeIds: ["n6", "n7"],
      type: "connection",
      title: "NO MEANINGFUL CONNECTION",
      explanation:
        "Oswald's documented early departure and Agnes's painful but unrelated parentage secret are both dead ends — real motives that simply don't connect to what actually happened that night.",
    },
  ],
  solution: {
    culpritId: "gerald",
    methodId: "medication-tampering",
    motiveId: "embezzlement-coverup",
    methodOptions: [
      { id: "medication-tampering", label: "Quietly replaced Augustus's heart medication with placebo pills over the preceding days, then pressured him at midnight to induce a fatal cardiac strain" },
      { id: "direct-poisoning", label: "Poisoned Augustus's drink that same night" },
      { id: "physical-altercation", label: "A direct physical struggle in the study" },
      { id: "left-untreated", label: "Withheld emergency medical help once Augustus fell ill" },
    ],
    motiveOptions: [
      { id: "embezzlement-coverup", label: "To prevent an imminent audit from exposing years of embezzled trust funds" },
      { id: "inheritance-jealousy", label: "Jealousy over being excluded from the will" },
      { id: "old-grudge", label: "Revenge for an old personal betrayal" },
      { id: "protect-agnes", label: "To protect Agnes's secret from being exposed" },
    ],
    narrative:
      "For years, Gerald Finch quietly diverted funds from the Pemberton family trust he'd been entrusted to manage. When Augustus announced a full audit, Gerald began weakening him in the only way that wouldn't raise suspicion: swapping a portion of his heart medication for inert placebo pills during a routine pharmacy pickup, ten days before the will reading weekend. Still needing more time, Gerald typed an anonymous midnight letter on his own well-worn typewriter, threatening to expose an old secret unless Augustus surrendered trust control by morning — hoping the shock and confrontation, combined with the weakened medication, would either buy him time or hasten the inevitable. It did the latter. Augustus, already under strain from the family argument and now blindsided by an anonymous threat in his own locked study, suffered a fatal cardiac event alone at his desk — his heart no longer protected by medication that had quietly stopped working days before. The 'secret' the letter threatened to expose was real, and painful — Agnes's true parentage — but it was never Gerald's secret to weaponize for anything but leverage; he simply used the family's oldest wound as a blunt instrument to protect his own.",
    keyEvidenceIds: ["theletter", "typewriter", "ledger", "pharmacyrecord", "pillbottle"],
    redHerringNotes: [
      {
        evidenceId: "gatelog",
        explanation:
          "Oswald Krane had a real motive to silence Augustus, but the gatehouse log confirms he left the estate hours before the letter even appeared.",
      },
      {
        evidenceId: "oldletter",
        explanation:
          "Agnes's decades-old parentage secret is genuine and painful, but her alibi holds and nothing ties her to the letter, the typewriter, or the medication.",
      },
      {
        evidenceId: "trainticket",
        explanation:
          "Beatrice's financial motive was real, but her train travel is independently confirmed for the entire night in question.",
      },
    ],
  },
};
