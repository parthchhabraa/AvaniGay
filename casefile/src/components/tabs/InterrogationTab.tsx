import { useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import type { InterrogationQuestion } from "../../types";
import { LockIcon, AlertIcon } from "../icons";

export default function InterrogationTab() {
  const { kase, progress, askQuestion } = useCaseContext();
  const [activeSuspectId, setActiveSuspectId] = useState(kase.suspects[0]?.id ?? "");

  const interrogation = kase.interrogations.find((i) => i.suspectId === activeSuspectId);
  const suspect = kase.suspects.find((s) => s.id === activeSuspectId);

  const isAsked = (qid: string) => progress.askedQuestionIds.includes(`${activeSuspectId}:${qid}`);

  const isLocked = (q: InterrogationQuestion) => {
    if (q.requiresEvidenceId && !progress.discoveredEvidenceIds.includes(q.requiresEvidenceId)) return true;
    if (q.requiresQuestionIds && !q.requiresQuestionIds.every((id) => isAsked(id))) return true;
    return false;
  };

  const lockHint = (q: InterrogationQuestion) => {
    if (q.requiresEvidenceId && !progress.discoveredEvidenceIds.includes(q.requiresEvidenceId)) {
      const evName = kase.evidence.find((e) => e.id === q.requiresEvidenceId)?.name ?? "certain evidence";
      return `Requires evidence: ${evName}`;
    }
    if (q.requiresQuestionIds) {
      return "Ask another question first";
    }
    return "";
  };

  const askedList = interrogation?.questions.filter((q) => isAsked(q.id)) ?? [];
  const availableList = interrogation?.questions.filter((q) => !isAsked(q.id)) ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Interrogation Room</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          Question each suspect. What they say — and what they avoid saying — matters.
        </p>
      </div>

      {/* Suspect selector */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {kase.suspects.map((s) => {
          const suspectInterrogation = kase.interrogations.find((i) => i.suspectId === s.id);
          const askedCount =
            suspectInterrogation?.questions.filter((q) => isAsked(q.id)).length ?? 0;
          const total = suspectInterrogation?.questions.length ?? 0;
          const active = activeSuspectId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSuspectId(s.id)}
              className={`btn-press flex shrink-0 items-center gap-2.5 rounded-sm border px-4 py-2.5 transition-colors ${
                active
                  ? "border-brass-400/70 bg-brass-400/10 text-brass-200"
                  : "border-noir-600/70 bg-noir-800/40 text-paper-300/70 hover:border-noir-500"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                {s.initials}
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium">{s.name}</span>
                <span className="block text-[10px] opacity-60">
                  {askedCount}/{total} asked
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {suspect && interrogation && (
        <div className="rounded-sm border border-noir-600/70 bg-noir-800/40 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="stamp text-[10px] text-brass-400/70">INTERROGATING</span>
              <h2 className="font-display text-xl font-bold text-paper-100">{suspect.name}</h2>
            </div>
          </div>
          <p className="font-serif-flavor mt-3 italic text-paper-300/70">{interrogation.intro}</p>

          <div className="brass-divider my-6" />

          {/* Transcript */}
          {askedList.length > 0 && (
            <div className="mb-6 space-y-4">
              {askedList.map((q) => (
                <div
                  key={q.id}
                  className={`animate-fade-in-fast rounded-sm border p-4 ${
                    q.isContradiction
                      ? "border-burgundy-500/50 bg-burgundy-500/10"
                      : "border-noir-600/60 bg-noir-900/40"
                  }`}
                >
                  <div className="stamp text-[10px] text-brass-400/70">{q.label}</div>
                  <p className="font-serif-flavor mt-1.5 text-paper-100/90">{q.answer}</p>
                  {q.isContradiction && q.contradictionNote && (
                    <div className="mt-3 flex gap-2 rounded-sm bg-noir-950/40 p-3 text-xs text-burgundy-300">
                      <AlertIcon className="h-4 w-4 shrink-0" />
                      <div>
                        <div className="stamp mb-1 text-burgundy-400">Contradiction Noted</div>
                        {q.contradictionNote}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Available questions */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {availableList.map((q) => {
              const locked = isLocked(q);
              return (
                <button
                  key={q.id}
                  disabled={locked}
                  onClick={() => askQuestion(activeSuspectId, q.id)}
                  className={`btn-press rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                    locked
                      ? "cursor-not-allowed border-noir-700 bg-noir-800/20 text-paper-400/40"
                      : "border-brass-500/40 bg-brass-400/5 text-paper-200 hover:bg-brass-400/15"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {locked && <LockIcon className="h-3.5 w-3.5 shrink-0" />}
                    [{q.label}]
                  </span>
                  {locked && <span className="mt-1 block text-[11px] text-paper-400/40">{lockHint(q)}</span>}
                </button>
              );
            })}
            {availableList.length === 0 && (
              <div className="col-span-full rounded-sm border border-dashed border-noir-600 p-4 text-center text-sm text-paper-400/60">
                You've asked everything you can, for now.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
