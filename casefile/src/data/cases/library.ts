import type { Case } from "../../types";

export const libraryCase: Case = {
  id: "library",
  number: "#0052",
  title: "The Locked Library",
  difficulty: 3,
  location: "Rothmore University — Ashcombe Rare Books Library",
  date: "3 November",
  victim: "Professor Edmund Thorne",
  synopsis:
    "Professor Edmund Thorne, curator of Rothmore University's rare manuscript collection, was found dead at his desk behind a locked office door. It looked, at first, like his weak heart had finally given out. But the office window was found broken from the inside, a rare document he'd been guarding appears to be missing, and the campus physician noticed something the family doctor missed: this was no natural death.",
  objectiveNote:
    "Determine who reached Professor Thorne before he locked his own door for the last time, how they killed a man in a room no one else entered that night, and why.",
  suspects: [
    {
      id: "helena",
      name: "Prof. Helena Voss",
      age: 52,
      role: "Rival Medieval Studies Scholar",
      initials: "HV",
      bio: "Helena has spent a decade building a reputation that Thorne nearly destroyed with a single public accusation of plagiarism last spring — an accusation she insists was false and vindictive. Her tenure review is in three weeks.",
      motive: "Believed the Ashcombe Codex, which Thorne refused her access to, contained the only proof that would clear her name.",
      alibi: "Says she was grading papers alone in her office across campus until well past 9 PM.",
      relationshipToVictim: "Academic rival and former friend; co-authored two papers with Thorne years ago before their falling out.",
      quirk: "Never without a thermos of Earl Grey tea, even during exams.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "peter",
      name: "Peter Lindqvist",
      age: 26,
      role: "Thorne's Graduate Research Assistant",
      initials: "PL",
      bio: "Peter has worked under Thorne for three years, cataloguing the rare manuscript collection. Quiet, exhausted, and increasingly desperate — his student visa depends on maintaining good academic standing, which Thorne recently threatened to end.",
      motive: "Thorne discovered Peter had fabricated a citation in his thesis draft and threatened to report him to the dean, which would end both his degree and his visa status.",
      alibi: "Claims he delivered documents and tea to Thorne's office around 6:45 PM, then went straight to the campus library to study until closing.",
      relationshipToVictim: "Graduate assistant; worked closely with Thorne for three years.",
      quirk: "Also works part-time in the university's botanical greenhouse, tending the medicinal plant collection.",
      suspicionLevel: 2,
      isCulprit: true,
    },
    {
      id: "miriam",
      name: "Miriam Thorne",
      age: 55,
      role: "Estranged Sister",
      initials: "MT",
      bio: "Miriam and Edmund hadn't spoken in nearly a decade after a bitter dispute over their late father's estate. She is, somewhat awkwardly, his sole living relative and legal heir to his considerable book collection.",
      motive: "Stands to inherit Edmund's entire personal library and estate — reportedly worth a great deal to the right collector.",
      alibi: "Says she arrived at his office around 8:10 PM, hoping to reconcile, and found the door locked with no answer.",
      relationshipToVictim: "Younger sister; sole heir; estranged for nine years prior to that night.",
      quirk: "Keeps every letter Edmund ever sent her, even the angry ones, in a box she never opens.",
      suspicionLevel: 3,
      isCulprit: false,
    },
    {
      id: "charles",
      name: "Charles Whitfield",
      age: 61,
      role: "Rare Book Dealer",
      initials: "CW",
      bio: "A well-known dealer in rare manuscripts who made Thorne a substantial offer for the Ashcombe Codex months ago — publicly and humiliatingly rejected. He has a reputation for acquiring things through channels that don't ask too many questions.",
      motive: "Financial — the codex would fetch an extraordinary price from a private collector, offer or no offer.",
      alibi: "Says he was across town at an evening rare-book auction, bidding on an unrelated lot until nearly 9 PM.",
      relationshipToVictim: "Professional acquaintance; rejected business partner.",
      quirk: "Always wears white cotton gloves when handling any book older than fifty years — including, allegedly, his own dinner napkin.",
      suspicionLevel: 4,
      isCulprit: false,
    },
    {
      id: "anselm",
      name: "Father Anselm Grey",
      age: 68,
      role: "Old Friend & Parish Priest",
      initials: "AG",
      bio: "A lifelong friend of Thorne's from seminary days, though their paths diverged decades ago. He visited more frequently in recent months, always asking after 'that old book' with visible unease.",
      motive: "Believed the Ashcombe Codex contained heretical material that could scandalize the church and wanted it destroyed or permanently sealed away.",
      alibi: "Says he was hearing evening confession at his parish from 6:30 to well past 8 PM, as he does every Tuesday.",
      relationshipToVictim: "Lifelong friend since seminary.",
      quirk: "Always carries rosary beads, worn smooth from decades of use.",
      suspicionLevel: 2,
      isCulprit: false,
    },
  ],
  locations: [
    {
      id: "office",
      name: "Thorne's Office",
      description: "A cramped, book-lined office where Thorne was found dead at his desk, door locked from the inside.",
      evidenceIds: ["teacup", "brokenwindow", "hiddencompartment"],
    },
    {
      id: "greenhouse",
      name: "Botanical Greenhouse",
      description: "The university's greenhouse, where rare and occasionally toxic plants are cultivated for the botany department.",
      evidenceIds: ["foxglove", "greenhouselog"],
    },
    {
      id: "archives",
      name: "Manuscript Archive Room",
      description: "The secure room where the university's most valuable manuscripts are stored and catalogued.",
      evidenceIds: ["deliverylog", "citationletter"],
    },
    {
      id: "corridor",
      name: "Library Corridor",
      description: "The hallway outside Thorne's office, where the campus janitor does his evening rounds.",
      evidenceIds: ["janitorstatement"],
    },
    {
      id: "auctionhouse",
      name: "City Auction House",
      description: "Where a rare-book auction was held that same evening.",
      evidenceIds: ["auctionticket"],
    },
  ],
  evidence: [
    {
      id: "teacup",
      name: "Thorne's Teacup",
      type: "forensic",
      locationId: "office",
      summary: "A half-finished cup of tea on Thorne's desk, with an unusual bitter residue at the bottom.",
      details:
        "The residue in the cup, once tested, matches an extract of foxglove — a common but highly toxic plant. In small doses over a short window it can trigger a fatal cardiac event, especially in someone with an existing heart condition. The dose was delayed enough that Thorne had time to lock his own door out of habit before symptoms took hold.",
      isRedHerring: false,
      relatedSuspectIds: ["peter"],
    },
    {
      id: "brokenwindow",
      name: "Broken Office Window",
      type: "forensic",
      locationId: "office",
      summary: "A window pane broken outward, initially suspected as a forced point of entry.",
      details:
        "Closer examination shows the glass fragments landed outside on the courtyard grass, meaning the window broke outward, not inward — consistent with a storm-snapped tree branch striking it from inside a draft, not anyone climbing in or out. Campus maintenance later confirms a branch was found jammed against the frame.",
      isRedHerring: true,
      redHerringExplanation:
        "This looked like a forced entry point suggesting an outside intruder, but the direction of the broken glass proves nobody used this window to enter or leave — it was ordinary storm damage.",
      relatedSuspectIds: [],
    },
    {
      id: "hiddencompartment",
      name: "Hidden Desk Compartment",
      type: "object",
      locationId: "office",
      summary: "A false-bottomed drawer in Thorne's desk, discovered after careful search.",
      details:
        "Inside, carefully wrapped in cloth, is the Ashcombe Codex itself — safe, undamaged, and very much not stolen. Thorne evidently hid it here himself, perhaps sensing how many people wanted it. Whatever happened to him that night, it wasn't a robbery.",
      isRedHerring: false,
      relatedSuspectIds: [],
    },
    {
      id: "foxglove",
      name: "Foxglove Extract Bottle",
      type: "object",
      locationId: "greenhouse",
      summary: "A small, mostly-empty glass bottle tucked behind a shelf of botany supplies.",
      details:
        "A homemade extract of foxglove (digitalis), the same toxin found in Thorne's teacup. Greenhouse sign-out records show only botany staff and part-time student workers have keys — including Peter, who works there most weekday evenings.",
      isRedHerring: false,
      relatedSuspectIds: ["peter"],
    },
    {
      id: "greenhouselog",
      name: "Greenhouse Access Log",
      type: "log",
      locationId: "greenhouse",
      summary: "A sign-in log for the university's greenhouse.",
      details:
        "Peter signed into the greenhouse three days before Thorne's death, listed reason: 'plant inventory.' It was the only visit that week by anyone with access to the foxglove supply.",
      isRedHerring: false,
      relatedSuspectIds: ["peter"],
    },
    {
      id: "deliverylog",
      name: "Archive Delivery Log",
      type: "log",
      locationId: "archives",
      summary: "A sign-out sheet tracking who delivered materials to Thorne's office that evening.",
      details:
        "Peter signed out a folder of grading materials and 'tea service' for delivery to Thorne's office at 6:45 PM — the exact window before Thorne was last seen alive by the janitor.",
      isRedHerring: false,
      relatedSuspectIds: ["peter"],
    },
    {
      id: "citationletter",
      name: "Draft Report Letter",
      type: "letter",
      locationId: "archives",
      summary: "An unsent letter in Thorne's handwriting, addressed to the Dean of Graduate Studies.",
      details:
        "Thorne's draft letter accuses Peter of fabricating a source citation in his thesis and recommends immediate academic disciplinary action — which, given Peter's visa status, would likely mean deportation and the end of his academic career. The letter was never sent.",
      isRedHerring: false,
      relatedSuspectIds: ["peter"],
    },
    {
      id: "janitorstatement",
      name: "Janitor's Statement",
      type: "document",
      locationId: "corridor",
      summary: "A written statement from the night janitor, Mr. Oduya.",
      details:
        "Mr. Oduya says he saw Thorne alive and seated at his desk through the office window at approximately 7:15 PM, appearing normal. He heard nothing unusual, and the door was already closed by then.",
      isRedHerring: false,
      relatedSuspectIds: [],
    },
    {
      id: "auctionticket",
      name: "Auction House Bidding Ticket",
      type: "document",
      locationId: "auctionhouse",
      summary: "A timestamped paddle registration from the city rare-book auction.",
      details:
        "Confirms Charles Whitfield registered and actively bid at the auction from 6:50 PM to 9:05 PM that evening — a twenty-minute drive from campus, making it essentially impossible for him to have been in Thorne's office during the critical window.",
      isRedHerring: true,
      redHerringExplanation:
        "Charles had a strong financial motive and a public grudge, but his alibi is airtight and independently documented — he simply wasn't there.",
      relatedSuspectIds: ["charles"],
    },
  ],
  timeline: [
    { id: "t1", time: "6:30 PM", sortKey: 1830, description: "Thorne finishes his evening seminar and returns to his office.", isKeyEvent: false },
    { id: "t2", time: "6:45 PM", sortKey: 1845, description: "Peter delivers documents and a tea service to Thorne's office.", isKeyEvent: true },
    { id: "t3", time: "6:50 PM", sortKey: 1850, description: "Peter leaves; Charles registers to bid at the city auction house.", isKeyEvent: false },
    { id: "t4", time: "7:15 PM", sortKey: 1915, description: "The night janitor sees Thorne alive at his desk through the office window.", isKeyEvent: true },
    { id: "t5", time: "7:40 PM", sortKey: 1940, description: "Estimated onset of symptoms; Thorne is believed to have locked his office door around this time, as was his habit when unwell.", isKeyEvent: true },
    { id: "t6", time: "8:10 PM", sortKey: 2010, description: "Miriam arrives hoping to reconcile, finds the door locked, and gets no answer.", isKeyEvent: false },
    { id: "t7", time: "8:20 PM", sortKey: 2020, description: "Campus security is called and opens the locked door, finding Thorne dead.", isKeyEvent: true },
    { id: "t8", time: "9:05 PM", sortKey: 2105, description: "Charles's auction bidding concludes, confirmed by the paddle log.", isKeyEvent: false },
  ],
  interrogations: [
    {
      suspectId: "helena",
      intro: "Helena sets down her thermos of tea with deliberate calm.",
      questions: [
        {
          id: "q1",
          label: "Ask about the plagiarism accusation",
          answer:
            "\"Edmund destroyed my reputation over something I never did. I've spent a year trying to clear my name. That codex might have proven my sources were legitimate all along.\"",
        },
        {
          id: "q2",
          label: "Ask about her alibi",
          answer:
            "\"I was in my office grading until well past nine. My teaching assistant can confirm — she dropped off a stack of exams around eight and we spoke for a few minutes.\"",
        },
        {
          id: "q3",
          label: "Ask about the codex",
          answer:
            "\"Edmund wouldn't even let me look at it. Guarded it like it was cursed. I'll admit, I resented that deeply.\"",
        },
        {
          id: "q4",
          label: "Ask about Peter",
          answer:
            "\"That poor boy. Edmund worked him half to death and threatened his career over the smallest things. I always thought Edmund was harder on him than he deserved.\"",
        },
      ],
    },
    {
      suspectId: "peter",
      intro: "Peter's hands won't quite stay still. He keeps glancing at the door.",
      questions: [
        {
          id: "q1",
          label: "Ask about the delivery",
          answer:
            "\"I brought his grading materials and made him tea, like most evenings. He was fine when I left — tired, maybe, but fine.\"",
        },
        {
          id: "q2",
          label: "Ask about the greenhouse",
          answer:
            "\"I work there part-time, yes. Inventory, watering, that sort of thing. I know the plants there better than most of the botany staff, honestly.\"",
        },
        {
          id: "q3",
          label: "Ask about his thesis",
          answer:
            "\"My thesis is fine. Nearly finished, actually.\" His voice is too fast, too flat.",
        },
        {
          id: "q4",
          label: "Challenge him about the citation",
          answer:
            "Peter goes very still. \"...He found one source I couldn't verify in time. I panicked and cited it anyway. He said he'd report me. Do you understand what that would mean for me? Everything, gone, over one citation.\"",
          isContradiction: true,
          contradictionNote:
            "Peter initially claimed his thesis was 'fine' and 'nearly finished,' but once confronted with Thorne's draft disciplinary letter, he admits to fabricating a citation and that Thorne intended to report him — directly contradicting his earlier composure and giving him a powerful, urgent motive.",
          requiresEvidenceId: "citationletter",
          requiresQuestionIds: ["q3"],
        },
      ],
    },
    {
      suspectId: "miriam",
      intro: "Miriam sits with her hands folded tightly in her lap, as if bracing for something.",
      questions: [
        {
          id: "q1",
          label: "Ask about the estrangement",
          answer:
            "\"Nine years. Over our father's estate, of all things. I came that night hoping we could finally put it behind us. I never got the chance.\"",
        },
        {
          id: "q2",
          label: "Ask about the inheritance",
          answer:
            "\"I suppose I inherit his collection now. I'd trade every book in it to have had one more real conversation with my brother.\"",
        },
        {
          id: "q3",
          label: "Ask about finding the door locked",
          answer:
            "\"I knocked for several minutes. No answer, no sound. I assumed he'd stepped out, or was avoiding me. It never crossed my mind that he was already gone.\"",
        },
        {
          id: "q4",
          label: "Ask about the codex",
          answer:
            "\"I don't know the first thing about rare books. That was always his world, not mine.\"",
        },
      ],
    },
    {
      suspectId: "charles",
      intro: "Charles adjusts his white cotton gloves before speaking, as always.",
      questions: [
        {
          id: "q1",
          label: "Ask about the rejected offer",
          answer:
            "\"Edmund turned me down in front of half the faculty. Embarrassing, yes. Criminal, no. That's simply business.\"",
        },
        {
          id: "q2",
          label: "Ask about the codex's value",
          answer:
            "\"Immense, to the right buyer. I won't insult your intelligence by pretending otherwise. But I have other ways of making a living.\"",
        },
        {
          id: "q3",
          label: "Ask about the auction",
          answer:
            "\"I was bidding on a first-edition atlas the entire evening. Dozens of witnesses, a paddle number, a timestamped receipt. Check it yourself.\"",
          unlocksEvidenceId: "auctionticket",
        },
        {
          id: "q4",
          label: "Challenge his alibi",
          answer:
            "\"I understand the suspicion, truly. But I was nowhere near campus that night. You'll find the auction house keeps very precise records.\"",
        },
      ],
    },
    {
      suspectId: "anselm",
      intro: "Father Anselm turns his rosary beads slowly between his fingers.",
      questions: [
        {
          id: "q1",
          label: "Ask about the codex",
          answer:
            "\"Edmund believed it was simply history. I feared it was something darker — heretical material that could cause real harm if it ever reached the public. We disagreed on this often, gently.\"",
        },
        {
          id: "q2",
          label: "Ask about his recent visits",
          answer:
            "\"I visited more often lately, yes, hoping to convince him to seal it away, or destroy it. He always refused. He was stubborn that way, God rest him.\"",
        },
        {
          id: "q3",
          label: "Ask about that evening",
          answer:
            "\"I heard confession at St. Aldric's from half past six until well after eight, as I do every Tuesday. My parishioners can confirm this, and so can the confessional sign-in sheet.\"",
        },
        {
          id: "q4",
          label: "Ask about Thorne's death",
          answer:
            "\"I've prayed for his soul every day since. Whatever tensions existed between us, I never wished him harm. I wished him caution.\"",
        },
      ],
    },
  ],
  boardNodes: [
    { id: "n1", kind: "evidence", refId: "teacup", label: "Foxglove Residue in Teacup" },
    { id: "n2", kind: "evidence", refId: "foxglove", label: "Foxglove Extract Bottle" },
    { id: "n3", kind: "evidence", refId: "deliverylog", label: "Delivery Log — Peter, 6:45 PM" },
    { id: "n4", kind: "evidence", refId: "citationletter", label: "Draft Disciplinary Letter" },
    { id: "n5", kind: "evidence", refId: "brokenwindow", label: "Broken Window (outward)" },
    { id: "n6", kind: "evidence", refId: "auctionticket", label: "Auction Bidding Ticket" },
    { id: "n7", kind: "evidence", refId: "hiddencompartment", label: "Hidden Codex — not stolen" },
    { id: "n8", kind: "statement", refId: "peter", label: "Peter: \"Thesis is fine\"" },
  ],
  boardLinks: [
    {
      id: "link1",
      nodeIds: ["n1", "n2"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "The foxglove residue in Thorne's teacup matches the homemade extract found in the greenhouse — the same toxin, the same source, and Peter had access to both the tea service and the greenhouse.",
    },
    {
      id: "link2",
      nodeIds: ["n3", "n4"],
      type: "connection",
      title: "CONNECTION CONFIRMED",
      explanation:
        "Peter delivered tea directly to Thorne at 6:45 PM — the same evening Thorne had drafted a letter that would have ended Peter's academic career and visa status. Opportunity and motive line up precisely.",
    },
    {
      id: "link3",
      nodeIds: ["n8", "n4"],
      type: "contradiction",
      title: "CONTRADICTION DETECTED",
      explanation:
        "Peter claimed his thesis was 'fine' and 'nearly finished' — but Thorne's draft letter proves he'd fabricated a citation and was about to be reported. Peter's calm denial doesn't match the desperation the letter reveals.",
    },
    {
      id: "link4",
      nodeIds: ["n5", "n6"],
      type: "connection",
      title: "NO MEANINGFUL CONNECTION",
      explanation:
        "The broken window and the auction ticket both turn out to be dead ends — ordinary storm damage and a legitimate alibi, neither pointing toward the actual killer.",
    },
    {
      id: "link5",
      nodeIds: ["n7", "n6"],
      type: "connection",
      title: "NO MEANINGFUL CONNECTION",
      explanation:
        "The hidden, undisturbed codex proves this was never a theft at all — which means every theft-motivated suspect, including Charles, was chasing the wrong crime entirely.",
    },
  ],
  solution: {
    culpritId: "peter",
    methodId: "poisoned-tea-delayed",
    motiveId: "career-desperation",
    methodOptions: [
      { id: "poisoned-tea-delayed", label: "Laced Thorne's tea with a slow-acting foxglove extract during the evening delivery" },
      { id: "climbed-window", label: "Broke in through the office window and staged a struggle" },
      { id: "strangled-direct", label: "A direct physical altercation in the office that night" },
      { id: "poisoned-food-earlier", label: "Poisoned food Thorne ate earlier that day at the faculty dining hall" },
    ],
    motiveOptions: [
      { id: "career-desperation", label: "To stop Thorne from reporting a fabricated citation that would end his career and visa status" },
      { id: "codex-theft", label: "To steal the Ashcombe Codex for its immense black-market value" },
      { id: "revenge-plagiarism", label: "Revenge for a public plagiarism accusation" },
      { id: "inheritance", label: "To claim Thorne's valuable personal book collection" },
    ],
    narrative:
      "Peter Lindqvist had spent three years as Edmund Thorne's most trusted assistant — until Thorne discovered a fabricated citation in his thesis and drafted a letter that would end both his degree and his visa status in one stroke. With access to the university greenhouse's foxglove supply and a routine excuse to deliver tea each evening, Peter laced Thorne's cup with a carefully measured, slow-acting dose during his 6:45 PM delivery. The delay was deliberate — Thorne was seen alive and well by the janitor at 7:15, giving Peter a clean window away from the office. When the toxin finally took hold around 7:40, Thorne, feeling unwell, did what he always did: locked his door out of habit before the true severity hit him, sealing his own office as his last act. The missing codex was a false trail entirely — Thorne had hidden it himself in a desk compartment, meaning the theft motive investigators initially chased led nowhere. The truth was smaller, and sadder: a young man protecting his entire future from one letter that was never sent.",
    keyEvidenceIds: ["teacup", "foxglove", "deliverylog", "citationletter", "greenhouselog"],
    redHerringNotes: [
      {
        evidenceId: "brokenwindow",
        explanation:
          "The broken window looked like forced entry, but the glass fell outward — ordinary storm damage from a branch, not an intruder's path.",
      },
      {
        evidenceId: "auctionticket",
        explanation:
          "Charles Whitfield had a public grudge and an obvious financial motive, but his auction bidding ticket places him firmly across town for the entire critical window.",
      },
      {
        evidenceId: "hiddencompartment",
        explanation:
          "The codex was never actually stolen — Thorne hid it himself, which quietly eliminates theft as a motive for anyone chasing the manuscript, including Charles and Helena.",
      },
    ],
  },
};
