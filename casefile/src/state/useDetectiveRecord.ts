import { useEffect, useState } from "react";
import type { DetectiveRecord } from "../types";
import { loadJSON, saveJSON } from "./storage";

const KEY = "detective-record";

function emptyRecord(): DetectiveRecord {
  return {
    casesAttempted: [],
    casesSolved: [],
    casesFailed: [],
    casesPartial: [],
    bestRank: "—",
    bestScore: 0,
    totalCluesDiscovered: 0,
    totalContradictionsFound: 0,
    history: [],
  };
}

let memoryRecord: DetectiveRecord | null = null;
const listeners = new Set<(r: DetectiveRecord) => void>();

function getRecord(): DetectiveRecord {
  if (!memoryRecord) memoryRecord = loadJSON(KEY, emptyRecord());
  return memoryRecord;
}

function setRecord(next: DetectiveRecord) {
  memoryRecord = next;
  saveJSON(KEY, next);
  listeners.forEach((l) => l(next));
}

export function recordCaseStart(caseId: string) {
  const r = getRecord();
  if (r.casesAttempted.includes(caseId)) return;
  setRecord({ ...r, casesAttempted: [...r.casesAttempted, caseId] });
}

export function recordCaseResult(params: {
  caseId: string;
  outcome: "solved" | "partial" | "unsolved";
  rank: string;
  score: number;
  cluesDiscovered: number;
  contradictionsFound: number;
  submittedAt: number;
}) {
  const r = getRecord();
  const already = r.history.some(
    (h) => h.caseId === params.caseId && h.completedAt === params.submittedAt
  );
  if (already) return;

  const history = [
    ...r.history,
    {
      caseId: params.caseId,
      outcome: params.outcome,
      rank: params.rank,
      score: params.score,
      completedAt: params.submittedAt,
    },
  ];

  // Recompute per-case buckets from latest history entry per case.
  const latestByCase = new Map<string, (typeof history)[number]>();
  for (const h of history) {
    const prev = latestByCase.get(h.caseId);
    if (!prev || h.completedAt >= prev.completedAt) latestByCase.set(h.caseId, h);
  }
  const casesSolved: string[] = [];
  const casesPartial: string[] = [];
  const casesFailed: string[] = [];
  latestByCase.forEach((h, caseId) => {
    if (h.outcome === "solved") casesSolved.push(caseId);
    else if (h.outcome === "partial") casesPartial.push(caseId);
    else casesFailed.push(caseId);
  });

  const bestScore = Math.max(r.bestScore, params.score);
  const bestRank = params.score >= r.bestScore ? params.rank : r.bestRank === "—" ? params.rank : r.bestRank;

  setRecord({
    ...r,
    casesAttempted: r.casesAttempted.includes(params.caseId)
      ? r.casesAttempted
      : [...r.casesAttempted, params.caseId],
    casesSolved,
    casesPartial,
    casesFailed,
    bestScore,
    bestRank,
    totalCluesDiscovered: r.totalCluesDiscovered + params.cluesDiscovered,
    totalContradictionsFound: r.totalContradictionsFound + params.contradictionsFound,
    history,
  });
}

export function resetDetectiveRecord() {
  setRecord(emptyRecord());
}

export function useDetectiveRecord(): DetectiveRecord {
  const [record, setLocal] = useState<DetectiveRecord>(() => getRecord());

  useEffect(() => {
    const listener = (r: DetectiveRecord) => setLocal(r);
    listeners.add(listener);
    setLocal(getRecord());
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return record;
}
