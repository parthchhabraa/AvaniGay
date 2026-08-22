import type { Case, CaseProgress } from "../types";

/** Total number of meaningful discoverable "beats" in a case. */
export function totalDiscoverables(kase: Case): number {
  const questionCount = kase.interrogations.reduce((sum, i) => sum + i.questions.length, 0);
  return (
    kase.evidence.length +
    kase.suspects.length +
    kase.locations.length +
    questionCount +
    kase.boardLinks.length
  );
}

export function discoveredCount(progress: CaseProgress): number {
  return (
    progress.discoveredEvidenceIds.length +
    progress.viewedSuspectIds.length +
    progress.exploredLocationIds.length +
    progress.askedQuestionIds.length +
    progress.foundLinkIds.length
  );
}

/** Investigation progress percentage, 0-100, based on meaningful discoveries only. */
export function investigationProgress(kase: Case, progress: CaseProgress): number {
  const total = totalDiscoverables(kase);
  if (total === 0) return 0;
  const done = discoveredCount(progress);
  return Math.min(100, Math.round((done / total) * 100));
}

export type Outcome = "solved" | "partial" | "unsolved";

export function scoreAccusation(kase: Case, suspectId: string, methodId: string, motiveId: string) {
  const sol = kase.solution;
  let correctCount = 0;
  if (suspectId === sol.culpritId) correctCount++;
  if (methodId === sol.methodId) correctCount++;
  if (motiveId === sol.motiveId) correctCount++;

  let outcome: Outcome;
  if (correctCount === 3) outcome = "solved";
  else if (correctCount > 0) outcome = "partial";
  else outcome = "unsolved";

  return { correctCount, outcome };
}

export interface ScoreBreakdown {
  accusationPoints: number;
  discoveryPoints: number;
  contradictionPoints: number;
  thoroughnessPoints: number;
  efficiencyPoints: number;
  total: number;
  rank: string;
}

const RANKS: { min: number; label: string }[] = [
  { min: 93, label: "CASEFILE ELITE" },
  { min: 80, label: "MASTER DETECTIVE" },
  { min: 65, label: "INSPECTOR" },
  { min: 45, label: "DETECTIVE" },
  { min: 20, label: "INVESTIGATOR" },
  { min: 0, label: "ROOKIE" },
];

export function rankForScore(score: number): string {
  for (const r of RANKS) {
    if (score >= r.min) return r.label;
  }
  return "ROOKIE";
}

export function computeScore(kase: Case, progress: CaseProgress): ScoreBreakdown {
  const acc = progress.accusation;

  // Accusation correctness — worth up to 45 points, culprit weighted heaviest.
  let accusationPoints = 0;
  if (acc) {
    const culpritRight = acc.suspectId === kase.solution.culpritId;
    const methodRight = acc.methodId === kase.solution.methodId;
    const motiveRight = acc.motiveId === kase.solution.motiveId;
    accusationPoints = (culpritRight ? 25 : 0) + (methodRight ? 10 : 0) + (motiveRight ? 10 : 0);
  }

  // Discovery thoroughness — evidence found, weighted for finding key evidence over red herrings.
  const totalEvidence = kase.evidence.length;
  const keyIds = new Set(kase.solution.keyEvidenceIds);
  const foundKey = progress.discoveredEvidenceIds.filter((id) => keyIds.has(id)).length;
  const discoveryPoints =
    totalEvidence === 0 ? 0 : Math.round((foundKey / keyIds.size) * 15) +
    Math.round((progress.discoveredEvidenceIds.length / totalEvidence) * 5);

  // Contradictions / connections found on the board — up to 15 points.
  const totalLinks = kase.boardLinks.length;
  const contradictionPoints = totalLinks === 0 ? 0 : Math.round((progress.foundLinkIds.length / totalLinks) * 15);

  // General thoroughness — suspects interviewed, locations explored, questions asked — up to 15 points.
  const totalQuestions = kase.interrogations.reduce((sum, i) => sum + i.questions.length, 0);
  const suspectRatio = kase.suspects.length === 0 ? 0 : progress.viewedSuspectIds.length / kase.suspects.length;
  const locationRatio = kase.locations.length === 0 ? 0 : progress.exploredLocationIds.length / kase.locations.length;
  const questionRatio = totalQuestions === 0 ? 0 : progress.askedQuestionIds.length / totalQuestions;
  const thoroughnessPoints = Math.round(((suspectRatio + locationRatio + questionRatio) / 3) * 15);

  // Efficiency — penalize repeated/unnecessary accusation attempts. Up to 10 points.
  const attempts = Math.max(1, progress.accusationAttempts);
  const efficiencyPoints = Math.max(0, 10 - (attempts - 1) * 5);

  const total = Math.min(
    100,
    accusationPoints + discoveryPoints + contradictionPoints + thoroughnessPoints + efficiencyPoints
  );

  return {
    accusationPoints,
    discoveryPoints,
    contradictionPoints,
    thoroughnessPoints,
    efficiencyPoints,
    total,
    rank: rankForScore(total),
  };
}

export function emptyProgress(caseId: string): CaseProgress {
  return {
    caseId,
    startedAt: Date.now(),
    discoveredEvidenceIds: [],
    importantEvidenceIds: [],
    viewedSuspectIds: [],
    askedQuestionIds: [],
    foundLinkIds: [],
    exploredLocationIds: [],
    notes: [],
    accusation: null,
    accusationAttempts: 0,
  };
}
