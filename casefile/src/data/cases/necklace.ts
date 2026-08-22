import type { Case } from "../../types";

export const necklaceCase: Case = {
  id: "necklace",
  number: "#0047",
  title: "The Missing Necklace",
  difficulty: 2,
  location: "Blackwood Manor",
  date: "14 October",
  victim: "Lady Vivian Ashworth (theft victim)",
  synopsis:
    "During an exclusive dinner at Blackwood Manor, the Ashworth Star — a diamond necklace worth a small fortune — vanished from Lady Vivian Ashworth's locked upstairs bedroom while six guests dined below. The bedroom door was found still locked. Nothing was forced. Someone in that house has the necklace, and everyone at the table swears they never left it.",
  objectiveNote:
    "Determine who slipped away from the dinner long enough to take the necklace, how they got past a locked door, and why they needed it badly enough to risk everything.",
  suspects: [
    {
      id: "marcus",
      name: "Marcus Vale",
      age: 41,
      role: "Lady Ashworth's Private Secretary",
      initials: "MV",
      bio: "Marcus has managed Vivian's household accounts and correspondence for nine years. Precise, soft-spoken, and always impeccably dressed — guests describe him as 'the man who knows where everything is.' He personally knows the combination to the household safe.",
      motive: "Rumored to be deep in debt to a private lender after a string of bad wagers.",
      alibi: "Claims he was in the kitchen the entire time, plating dessert for the dinner party.",
      relationshipToVictim: "Trusted employee of eleven years; handles Vivian's finances and correspondence.",
      quirk: "Wears a distinctive pair of engraved silver cufflinks, a gift from Vivian herself.",
      suspicionLevel: 3,
      isCulprit: true,
    },
    {
      id: "eleanor",
      name: "Eleanor Hartley",
      age: 29,
      role: "Vivian's Niece",
      initials: "EH",
      bio: "Eleanor runs her late father's failing textile business and had hoped her aunt would help cover a critical loan. She arrived at the manor a day early and was seen arguing quietly with Vivian that afternoon.",
      motive: "Recently learned Vivian planned to donate the necklace to a museum rather than leave it to her — and desperately needs money to save the family business.",
      alibi: "Says she stepped onto the balcony for air between 11:05 and 11:25 to cool off after the argument.",
      relationshipToVictim: "Niece; presumed heir to a portion of the estate.",
      quirk: "Chain-smokes when anxious; the balcony ashtray was full that night.",
      suspicionLevel: 4,
      isCulprit: false,
    },
    {
      id: "julian",
      name: "Julian Reyes",
      age: 47,
      role: "Antiques & Jewelry Appraiser",
      initials: "JR",
      bio: "Invited that afternoon specifically to formally appraise the Ashworth Star for insurance purposes. Charming, well-traveled, and a little too interested in who else might want to buy it.",
      motive: "Had privately arranged a buyer for a 'similar' necklace and stood to profit handsomely from a quiet sale.",
      alibi: "Says he was on a long-distance telephone call in the study from around 11:00 to 11:35.",
      relationshipToVictim: "Professional acquaintance; hired for a single evening's work.",
      quirk: "Carries a jeweler's loupe everywhere, even to dinner.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "simon",
      name: "Dr. Simon Cole",
      age: 58,
      role: "Family Physician & Old Friend",
      initials: "SC",
      bio: "Vivian's physician and friend of thirty years. He founded a small charity hospital that Vivian has funded for over a decade — until she quietly cut the annual donation last month.",
      motive: "Furious about the withdrawn hospital funding and reportedly said the necklace 'should belong to people who need it, not a display case.'",
      alibi: "Playing cards with Vivian's husband, Lord Ashworth, in the smoking room from 10:50 until midnight.",
      relationshipToVictim: "Close friend and personal physician for three decades.",
      quirk: "Suffers frequent nosebleeds in stressful situations and always carries a handkerchief.",
      suspicionLevel: 2,
      isCulprit: false,
    },
    {
      id: "rosalind",
      name: "Rosalind Vale",
      age: 38,
      role: "Marcus's Wife, Socialite",
      initials: "RV",
      bio: "Rosalind married Marcus eight years ago and has expensive taste that has strained their finances. She is well-liked at parties but privately anxious about money — and about her husband's recent moods.",
      motive: "Known gambling debts of her own, and open envy of Vivian's wealth and jewelry, often remarked on within earshot of staff.",
      alibi: "Says she was in the powder room reapplying her makeup from roughly 11:05 to 11:20.",
      relationshipToVictim: "Guest; wife of the household secretary.",
      quirk: "Keeps meticulous track of who is wearing what jewelry at any given party.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "thomas",
      name: "Thomas Reed",
      age: 34,
      role: "Groundskeeper",
      initials: "TR",
      bio: "Thomas has worked the manor grounds for six years. Quiet and watchful, he's recently taken to keeping a small notebook of 'irregularities' around the estate — dates, times, comings and goings.",
      motive: "Discovered discrepancies suggesting Vivian had been quietly diverting funds from a local charity trust, and wanted proof before deciding what to do about it.",
      alibi: "Says he was outside near the front gate for most of the evening and saw 'someone' pass an upstairs window.",
      relationshipToVictim: "Employee; six years of service.",
      quirk: "Never without his weathered notebook, which he is reluctant to show anyone.",
      suspicionLevel: 2,
      isCulprit: false,
    },
  ],
  locations: [
    {
      id: "diningroom",
      name: "Dining Room",
      description:
        "Where the six guests gathered for dinner. A tall grandfather clock stands in the adjoining hallway, visible through the open doors.",
      evidenceIds: ["clock", "seatingchart"],
    },
    {
      id: "bedroom",
      name: "Vivian's Bedroom (Upstairs)",
      description:
        "The locked room where the necklace was kept in a wall safe behind a painting. The door shows no signs of forced entry.",
      evidenceIds: ["safe", "windowlatch"],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      description: "Where Marcus claimed to be preparing dessert. A servant staircase leads directly upstairs from here.",
      evidenceIds: ["flourtin", "kitchenlog"],
    },
    {
      id: "servantstairs",
      name: "Servant Staircase",
      description: "A narrow back staircase connecting the kitchen directly to the upstairs hallway, rarely used by guests.",
      evidenceIds: ["cufflink"],
    },
    {
      id: "study",
      name: "Study",
      description: "A quiet room with the household's only long-distance telephone line.",
      evidenceIds: ["phonelog"],
    },
    {
      id: "balcony",
      name: "Balcony",
      description: "Overlooks the garden; a popular spot for guests seeking fresh air.",
      evidenceIds: ["handkerchief", "debtletter"],
    },
  ],
  evidence: [
    {
      id: "clock",
      name: "The Stopped Hallway Clock",
      type: "object",
      locationId: "diningroom",
      summary: "A tall grandfather clock, its hands frozen at 11:17.",
      details:
        "The household's grandfather clock has stopped dead at 11:17 PM — its pendulum jarred still, as if bumped hard by someone passing in a hurry. Staff confirm it was working and chiming normally earlier that evening. It has not chimed since.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus"],
    },
    {
      id: "seatingchart",
      name: "Dinner Seating Chart",
      type: "document",
      locationId: "diningroom",
      summary: "A handwritten chart showing who sat where during dinner.",
      details:
        "Confirms the dining arrangement: Lord Ashworth, Dr. Cole, and later Rosalind were visible to each other for most of the evening. Marcus, as staff, was not seated at all — he moved freely between kitchen and dining room serving courses.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus", "simon", "rosalind"],
    },
    {
      id: "safe",
      name: "The Wall Safe",
      type: "forensic",
      locationId: "bedroom",
      summary: "A small wall safe hidden behind a landscape painting, found unlocked but undamaged.",
      details:
        "The safe was opened with its correct combination, not forced — no scratches, no pry marks. Only Vivian and Marcus, who manages her affairs and correspondence, have ever been told the combination.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus"],
    },
    {
      id: "windowlatch",
      name: "Bedroom Window Latch",
      type: "forensic",
      locationId: "bedroom",
      summary: "The window latch, examined for signs of outside entry.",
      details:
        "The latch is old and stiff with paint — it has clearly not been opened in months. This rules out anyone entering or leaving through the window. Whoever took the necklace came and went through the door.",
      isRedHerring: false,
      relatedSuspectIds: [],
    },
    {
      id: "flourtin",
      name: "Flour Tin",
      type: "object",
      locationId: "kitchen",
      summary: "An ordinary flour tin, oddly heavier than it should be.",
      details:
        "Buried in the flour at the bottom of the tin is a small velvet pouch — empty, but the exact size and shape to hold a necklace. It smells faintly of Vivian's rosewater perfume, the same scent kept in her bedroom.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus"],
      requiresEvidenceIds: ["cufflink"],
    },
    {
      id: "kitchenlog",
      name: "Kitchen Staff Log",
      type: "log",
      locationId: "kitchen",
      summary: "A junior kitchen maid's informal log of who came and went.",
      details:
        "The maid's log notes Marcus stepping out of the kitchen 'for a few minutes, maybe closer to ten' around 11:15, saying he needed to fetch something from upstairs. She didn't think much of it at the time.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus"],
    },
    {
      id: "cufflink",
      name: "Engraved Silver Cufflink",
      type: "object",
      locationId: "servantstairs",
      summary: "A single silver cufflink, found wedged in the servant staircase carpet runner.",
      details:
        "The cufflink is engraved with a small 'M.V.' — matching the distinctive pair Marcus was seen wearing earlier that evening. It's the kind of detail no one would notice missing from a matched set until they looked closely.",
      isRedHerring: false,
      relatedSuspectIds: ["marcus"],
    },
    {
      id: "phonelog",
      name: "Telephone Exchange Log",
      type: "log",
      locationId: "study",
      summary: "The local exchange operator's log of long-distance calls that night.",
      details:
        "Confirms a long-distance call was connected to the manor's study line at 11:02 PM and remained connected until 11:38 PM — consistent with Julian's account of being on the phone during the theft window.",
      isRedHerring: true,
      redHerringExplanation:
        "This clears Julian rather than implicating him — his suspicious financial motive doesn't hold up once his alibi is confirmed by an independent, unforgeable record.",
      relatedSuspectIds: ["julian"],
    },
    {
      id: "handkerchief",
      name: "Bloodstained Handkerchief",
      type: "object",
      locationId: "balcony",
      summary: "A gentleman's handkerchief, spotted with blood, found tucked behind a balcony planter.",
      details:
        "At first glance this looks alarming — until you recall Dr. Cole's frequent nosebleeds. He later confirms, and Lord Ashworth corroborates, that Cole stepped onto the balcony briefly around 10:40, well before the theft window, to deal with exactly this.",
      isRedHerring: true,
      redHerringExplanation:
        "A dramatic-looking clue with a mundane explanation — Dr. Cole's nosebleed occurred before the theft window and his alibi for the theft itself (cards with Lord Ashworth) is solid.",
      relatedSuspectIds: ["simon"],
    },
    {
      id: "debtletter",
      name: "Unsigned Debt Letter",
      type: "letter",
      locationId: "balcony",
      summary: "A crumpled, unsigned letter demanding repayment of a debt 'by the end of the month, or else.'",
      details:
        "A threatening, unsigned letter demanding repayment 'by the end of the month.' It was found on the balcony where Eleanor says she smoked most of the evening — but the handwriting doesn't match anyone at the party. It's addressed to 'M.V.'",
      isRedHerring: false,
      relatedSuspectIds: ["marcus", "eleanor"],
    },
  ],
  timeline: [
    { id: "t1", time: "10:00 PM", sortKey: 1000, description: "Guests arrive at Blackwood Manor for dinner.", isKeyEvent: false },
    { id: "t2", time: "10:15 PM", sortKey: 1015, description: "Vivian shows off the Ashworth Star necklace before locking it back in her bedroom safe.", isKeyEvent: false },
    { id: "t3", time: "10:45 PM", sortKey: 1045, description: "Dinner begins in the dining room.", isKeyEvent: false },
    { id: "t4", time: "11:00 PM", sortKey: 1100, description: "Julian's long-distance call connects in the study.", isKeyEvent: false },
    { id: "t5", time: "11:05 PM", sortKey: 1105, description: "Eleanor steps onto the balcony; Rosalind excuses herself to the powder room.", isKeyEvent: false },
    { id: "t6", time: "11:15 PM", sortKey: 1115, description: "Kitchen maid notes Marcus stepping out 'to fetch something from upstairs.'", isKeyEvent: true },
    { id: "t7", time: "11:17 PM", sortKey: 1117, description: "The hallway grandfather clock stops, as if bumped by someone rushing past.", isKeyEvent: true },
    { id: "t8", time: "11:22 PM", sortKey: 1122, description: "Marcus returns to the kitchen and resumes plating dessert.", isKeyEvent: true },
    { id: "t9", time: "11:30 PM", sortKey: 1130, description: "Vivian goes upstairs to change and discovers the necklace missing from the open safe.", isKeyEvent: true },
  ],
  interrogations: [
    {
      suspectId: "marcus",
      intro: "Marcus straightens his cuffs and offers a composed, practiced smile.",
      questions: [
        {
          id: "q1",
          label: "Ask about the kitchen",
          answer:
            "\"I was plating the dessert course the entire time, from eleven until half past. Ask any of the kitchen staff — they'll tell you the same.\"",
        },
        {
          id: "q2",
          label: "Ask about the necklace",
          answer:
            "\"A terrible business. Lady Ashworth trusted very few people with that safe combination. I can't imagine who would dare.\"",
        },
        {
          id: "q3",
          label: "Ask about the hallway clock",
          answer:
            "\"Odd thing, that. I actually heard it strike half past eleven from the kitchen — right on schedule, chiming clear as day while I finished the plates.\"",
          isContradiction: true,
          contradictionNote:
            "The hallway clock physically stopped at 11:17 and has not chimed since. If Marcus truly heard it strike 11:30, he could not have been in the kitchen the whole time — he was close enough to the hallway to know its usual schedule, which means he's lying about never leaving.",
          requiresEvidenceId: "clock",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "Marcus's composure slips, just briefly. \"...I may have stepped out for a moment. To check on Lady Ashworth's tea service upstairs. It was only a minute.\" He will not meet your eyes.",
          requiresEvidenceId: "kitchenlog",
          requiresQuestionIds: ["q1"],
        },
      ],
    },
    {
      suspectId: "eleanor",
      intro: "Eleanor's eyes are red-rimmed, though she insists it's just the smoke.",
      questions: [
        {
          id: "q1",
          label: "Ask about the argument with Vivian",
          answer:
            "\"Yes, we argued. She told me she's donating the necklace to some museum instead of — instead of helping the family. I was upset. I'm allowed to be upset.\"",
        },
        {
          id: "q2",
          label: "Ask about the balcony",
          answer:
            "\"I smoked through half a pack out there, if you must know. Rosalind can confirm — she waved to me from the hallway window around eleven fifteen or so.\"",
        },
        {
          id: "q3",
          label: "Ask about the necklace",
          answer:
            "\"I won't pretend I don't need the money. But I didn't touch that safe. I don't even know the combination.\"",
        },
        {
          id: "q4",
          label: "Ask about the debt letter",
          answer:
            "\"That's not mine — I found it tucked under the planter and honestly assumed it was rubbish. Odd that it's addressed 'M.V.' Isn't that Marcus's monogram, not mine?\"",
          requiresEvidenceId: "debtletter",
        },
      ],
    },
    {
      suspectId: "julian",
      intro: "Julian sets down his loupe and gives you his full, easy attention.",
      questions: [
        {
          id: "q1",
          label: "Ask about the appraisal",
          answer:
            "\"A remarkable piece. Old-cut diamonds, platinum setting, quite valuable. I gave Lady Ashworth my written appraisal that very afternoon.\"",
        },
        {
          id: "q2",
          label: "Ask about the phone call",
          answer:
            "\"A client in the city, if you must know — a rather delicate negotiation over a different piece entirely. The exchange operator can confirm the timing.\"",
        },
        {
          id: "q3",
          label: "Ask about other buyers",
          answer:
            "\"I know several collectors who'd pay handsomely for something like the Ashworth Star. That's my business. It doesn't make me a thief.\"",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "\"Check the telephone exchange log if you doubt me. I was on that call from eleven o'clock until well past the half hour. I never left the study.\"",
          requiresEvidenceId: "phonelog",
        },
      ],
    },
    {
      suspectId: "simon",
      intro: "Dr. Cole dabs at his nose out of habit before he's even sat down.",
      questions: [
        {
          id: "q1",
          label: "Ask about the hospital funding",
          answer:
            "\"Vivian cut our donation without warning. Thirty years of friendship and she couldn't even discuss it with me first. I was angry. I still am.\"",
        },
        {
          id: "q2",
          label: "Ask about the handkerchief",
          answer:
            "\"Ah — yes, that would be mine. Stepped onto the balcony around ten forty for a nosebleed, dreadfully embarrassing. Lord Ashworth can vouch I was back at cards within minutes.\"",
          unlocksEvidenceId: "handkerchief",
        },
        {
          id: "q3",
          label: "Ask about the necklace",
          answer:
            "\"I said something rash at dinner about it belonging to people who need it more. I meant it as a point about charity, not a confession.\"",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "\"Lord Ashworth and I played cards from before eleven until well past midnight. Ask him yourself — he'll tell you I never once left that table after my nose settled.\"",
        },
      ],
    },
    {
      suspectId: "rosalind",
      intro: "Rosalind smooths her dress and glances toward the door, as if expecting Marcus.",
      questions: [
        {
          id: "q1",
          label: "Ask about the powder room",
          answer:
            "\"I was fixing my makeup, that's all. Eleanor saw me pass the hallway window on my way — she can confirm the time, roughly quarter past eleven.\"",
        },
        {
          id: "q2",
          label: "Ask about Marcus",
          answer:
            "\"My husband works very hard for that family. If you're implying something, I'd rather you just say it.\" She's suddenly guarded.",
        },
        {
          id: "q3",
          label: "Ask about their finances",
          answer:
            "\"We manage. Everyone has debts, Detective. That's hardly a crime.\" Her hands tighten around her clutch.",
        },
        {
          id: "q4",
          label: "Ask about the necklace",
          answer:
            "\"It's a beautiful piece. I've always said Vivian wears more diamonds to breakfast than most women own in a lifetime. That's not an accusation — just an observation.\"",
        },
      ],
    },
    {
      suspectId: "thomas",
      intro: "Thomas keeps his weathered notebook close, thumb marking a page.",
      questions: [
        {
          id: "q1",
          label: "Ask about the notebook",
          answer:
            "\"Just my own record-keeping. I noticed the charity trust ledgers didn't add up a few months back. Wanted proof before I said anything to anyone.\"",
        },
        {
          id: "q2",
          label: "Ask about the front gate",
          answer:
            "\"I was out there most of the night, minding the grounds. Saw a shape pass an upstairs window around the time everyone's asking about, but it was dark — couldn't say who.\"",
        },
        {
          id: "q3",
          label: "Ask about Vivian",
          answer:
            "\"She's been generous to me over the years. Whatever I found in those ledgers, I hadn't decided what to do with it yet. This theft isn't my doing.\"",
        },
        {
          id: "q4",
          label: "Ask about the necklace",
          answer:
            "\"Never touched it, never wanted it. If I were after money, there are quieter ways than robbing my own employer under a house full of witnesses.\"",
        },
      ],
    },
  ],
  boardNodes: [
    { id: "n1", kind: "evidence", refId: "clock", label: "Clock Stopped 11:17" },
    { id: "n2", kind: "statement", refId: "marcus", label: "Marcus: \"Heard it strike 11:30\"" },
    { id: "n3", kind: "evidence", refId: "cufflink", label: "Cufflink on Servant Stairs" },
    { id: "n4", kind: "evidence", refId: "flourtin", label: "Velvet Pouch in Flour Tin" },
    { id: "n5", kind: "evidence", refId: "handkerchief", label: "Bloodstained Handkerchief" },
    { id: "n6", kind: "evidence", refId: "phonelog", label: "Telephone Exchange Log" },
    { id: "n7", kind: "evidence", refId: "kitchenlog", label: "Kitchen Staff Log" },
    { id: "n8", kind: "evidence", refId: "debtletter", label: "Unsigned Debt Letter (M.V.)" },
  ],
  boardLinks: [
    {
      id: "link1",
      nodeIds: ["n1", "n2"],
      type: "contradiction",
      title: "CONTRADICTION DETECTED",
      explanation:
        "The hallway clock physically stopped at 11:17 PM and has not chimed since — yet Marcus claims he heard it strike 11:30 from the kitchen. He could not have heard a chime that never happened. This places him near the hallway, not the kitchen, during the theft.",
    },
    {
      id: "link2",
      nodeIds: ["n3", "n7"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The kitchen log notes Marcus stepping out toward the upstairs around 11:15. His cufflink, found on the servant staircase that connects the kitchen directly to the upstairs hallway, confirms exactly which route he took.",
    },
    {
      id: "link3",
      nodeIds: ["n4", "n8"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The empty velvet pouch hidden in the flour tin and the threatening debt letter addressed to 'M.V.' both point toward Marcus — a man with both the means to reach the safe and a very pressing reason to need money quickly.",
    },
    {
      id: "link4",
      nodeIds: ["n5", "n6"],
      type: "connection",
      title: "NO MEANINGFUL CONNECTION",
      explanation:
        "The handkerchief and the phone log both check out as innocent — Dr. Cole's nosebleed and Julian's phone call are unrelated coincidences that happened to occur the same evening. Neither points toward the theft.",
    },
  ],
  solution: {
    culpritId: "marcus",
    methodId: "safe-servantstairs",
    motiveId: "gambling-debt",
    methodOptions: [
      { id: "safe-servantstairs", label: "Used his knowledge of the safe combination and slipped up the servant staircase during a brief absence from the kitchen" },
      { id: "forced-window", label: "Climbed in through the bedroom window while the party was distracted" },
      { id: "stole-daytime", label: "Took the necklace earlier in the day before the dinner even began" },
      { id: "accomplice-swap", label: "Had an accomplice swap the necklace for a fake during the appraisal" },
    ],
    motiveOptions: [
      { id: "gambling-debt", label: "To pay off a pressing personal debt to a private lender" },
      { id: "inheritance-resentment", label: "Resentment over being excluded from Vivian's will" },
      { id: "charity-protest", label: "A moral protest against Vivian withdrawing charitable funding" },
      { id: "blackmail", label: "To use the necklace as leverage in a blackmail scheme" },
    ],
    narrative:
      "Marcus Vale, trusted for nine years with Vivian Ashworth's household accounts, was quietly drowning in debt to a private lender who had grown impatient. When the kitchen staff's attention turned to dessert, he slipped away using the one route only he — as a member of staff who knew every inch of the house — would think to use: the servant staircase connecting the kitchen directly to the upstairs hallway. He used the safe combination Vivian herself had trusted him with, took the necklace, and hid it in a velvet pouch buried in an ordinary flour tin, intending to retrieve it quietly once the search had died down. In his hurry back down the servant stairs, he brushed the hallway clock hard enough to stop its pendulum at 11:17 — and later made one small, fatal error: claiming he'd heard the clock chime 11:30 from the kitchen, a chime that, thanks to his own carelessness, could never have happened.",
    keyEvidenceIds: ["clock", "cufflink", "flourtin", "kitchenlog", "debtletter"],
    redHerringNotes: [
      {
        evidenceId: "handkerchief",
        explanation:
          "The bloodstained handkerchief looked alarming but belonged to Dr. Cole, the result of a nosebleed well before the theft window — confirmed by Lord Ashworth's alibi for the theft itself.",
      },
      {
        evidenceId: "phonelog",
        explanation:
          "Julian's suspicious business motive collapsed once the telephone exchange log confirmed he was on a documented call for the entire theft window.",
      },
    ],
  },
};
