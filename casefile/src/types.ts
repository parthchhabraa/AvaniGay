// ---------------------------------------------------------------------------
// CASEFILE — core data model
// ---------------------------------------------------------------------------

export interface Suspect {
  id: string;
  name: string;
  age: number;
  role: string;
  initials: string;
  bio: string;
  motive: string;
  alibi: string;
  relationshipToVictim: string;
  quirk: string;
  suspicionLevel: 1 | 2 | 3 | 4 | 5;
  isCulprit: boolean;
}

export type EvidenceType = "object" | "document" | "photograph" | "log" | "letter" | "forensic";

export interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  locationId: string;
  summary: string;
  details: string;
  isRedHerring: boolean;
  redHerringExplanation?: string;
  relatedSuspectIds: string[];
  requiresEvidenceIds?: string[];
  requiresInterrogation?: { suspectId: string; questionId: string };
}

export interface CaseLocation {
  id: string;
  name: string;
  description: string;
  evidenceIds: string[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  sortKey: number;
  description: string;
  isKeyEvent: boolean;
}

export interface InterrogationQuestion {
  id: string;
  label: string;
  answer: string;
  followUp?: string;
  unlocksEvidenceId?: string;
  isContradiction?: boolean;
  contradictionNote?: string;
  requiresEvidenceId?: string;
  requiresQuestionIds?: string[];
}

export interface Interrogation {
  suspectId: string;
  intro: string;
  questions: InterrogationQuestion[];
}

export type BoardNodeKind = "evidence" | "statement" | "timeline";

export interface BoardNode {
  id: string;
  kind: BoardNodeKind;
  refId: string;
  label: string;
}

export interface BoardLink {
  id: string;
  nodeIds: [string, string];
  type: "contradiction" | "connection";
  title: string;
  explanation: string;
}

export interface MethodOption {
  id: string;
  label: string;
}

export interface MotiveOption {
  id: string;
  label: string;
}

export interface RedHerringExplanation {
  evidenceId: string;
  explanation: string;
}

export interface CaseSolution {
  culpritId: string;
  methodId: string;
  motiveId: string;
  methodOptions: MethodOption[];
  motiveOptions: MotiveOption[];
  narrative: string;
  keyEvidenceIds: string[];
  redHerringNotes: RedHerringExplanation[];
}

export interface Case {
  id: string;
  number: string;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  location: string;
  date: string;
  victim: string;
  synopsis: string;
  objectiveNote: string;
  suspects: Suspect[];
  evidence: Evidence[];
  locations: CaseLocation[];
  timeline: TimelineEvent[];
  interrogations: Interrogation[];
  boardNodes: BoardNode[];
  boardLinks: BoardLink[];
  solution: CaseSolution;
}

// ---------------------------------------------------------------------------
// Save / progress state (persisted to localStorage per case)
// ---------------------------------------------------------------------------

export interface NoteEntry {
  id: string;
  text: string;
  createdAt: number;
  source: "manual" | "evidence";
  refId?: string;
}

export interface AccusationRecord {
  suspectId: string;
  methodId: string;
  motiveId: string;
  submittedAt: number;
  outcome: "solved" | "partial" | "unsolved";
  correctCount: number;
}

export interface CaseProgress {
  caseId: string;
  startedAt: number;
  discoveredEvidenceIds: string[];
  importantEvidenceIds: string[];
  viewedSuspectIds: string[];
  askedQuestionIds: string[];
  foundLinkIds: string[];
  exploredLocationIds: string[];
  notes: NoteEntry[];
  accusation: AccusationRecord | null;
  accusationAttempts: number;
}

export interface DetectiveRecord {
  casesAttempted: string[];
  casesSolved: string[];
  casesFailed: string[];
  casesPartial: string[];
  bestRank: string;
  bestScore: number;
  totalCluesDiscovered: number;
  totalContradictionsFound: number;
  history: {
    caseId: string;
    outcome: "solved" | "partial" | "unsolved";
    rank: string;
    score: number;
    completedAt: number;
  }[];
}
