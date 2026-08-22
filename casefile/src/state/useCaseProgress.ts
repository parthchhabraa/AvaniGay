import { useCallback, useEffect, useState } from "react";
import type { CaseProgress, NoteEntry, AccusationRecord } from "../types";
import { loadJSON, saveJSON } from "./storage";
import { emptyProgress } from "./progress";

function keyFor(caseId: string) {
  return `progress:${caseId}`;
}

export function useCaseProgress(caseId: string) {
  const [progress, setProgress] = useState<CaseProgress>(() =>
    loadJSON(keyFor(caseId), emptyProgress(caseId))
  );

  // Reload if caseId changes.
  useEffect(() => {
    setProgress(loadJSON(keyFor(caseId), emptyProgress(caseId)));
  }, [caseId]);

  useEffect(() => {
    saveJSON(keyFor(caseId), progress);
  }, [caseId, progress]);

  const discoverEvidence = useCallback((evidenceId: string) => {
    setProgress((p) =>
      p.discoveredEvidenceIds.includes(evidenceId)
        ? p
        : { ...p, discoveredEvidenceIds: [...p.discoveredEvidenceIds, evidenceId] }
    );
  }, []);

  const toggleImportant = useCallback((evidenceId: string) => {
    setProgress((p) => {
      const has = p.importantEvidenceIds.includes(evidenceId);
      return {
        ...p,
        importantEvidenceIds: has
          ? p.importantEvidenceIds.filter((id) => id !== evidenceId)
          : [...p.importantEvidenceIds, evidenceId],
      };
    });
  }, []);

  const viewSuspect = useCallback((suspectId: string) => {
    setProgress((p) =>
      p.viewedSuspectIds.includes(suspectId) ? p : { ...p, viewedSuspectIds: [...p.viewedSuspectIds, suspectId] }
    );
  }, []);

  const askQuestion = useCallback((suspectId: string, questionId: string) => {
    const id = `${suspectId}:${questionId}`;
    setProgress((p) =>
      p.askedQuestionIds.includes(id) ? p : { ...p, askedQuestionIds: [...p.askedQuestionIds, id] }
    );
  }, []);

  const exploreLocation = useCallback((locationId: string) => {
    setProgress((p) =>
      p.exploredLocationIds.includes(locationId)
        ? p
        : { ...p, exploredLocationIds: [...p.exploredLocationIds, locationId] }
    );
  }, []);

  const foundLink = useCallback((linkId: string) => {
    setProgress((p) =>
      p.foundLinkIds.includes(linkId) ? p : { ...p, foundLinkIds: [...p.foundLinkIds, linkId] }
    );
  }, []);

  const addNote = useCallback((text: string, source: NoteEntry["source"] = "manual", refId?: string) => {
    setProgress((p) => {
      const entry: NoteEntry = {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        createdAt: Date.now(),
        source,
        refId,
      };
      return { ...p, notes: [...p.notes, entry] };
    });
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setProgress((p) => ({ ...p, notes: p.notes.filter((n) => n.id !== noteId) }));
  }, []);

  const submitAccusation = useCallback((record: AccusationRecord) => {
    setProgress((p) => ({ ...p, accusation: record, accusationAttempts: p.accusationAttempts + 1 }));
  }, []);

  const resetAccusation = useCallback(() => {
    setProgress((p) => ({ ...p, accusation: null }));
  }, []);

  return {
    progress,
    discoverEvidence,
    toggleImportant,
    viewSuspect,
    askQuestion,
    exploreLocation,
    foundLink,
    addNote,
    deleteNote,
    submitAccusation,
    resetAccusation,
  };
}
