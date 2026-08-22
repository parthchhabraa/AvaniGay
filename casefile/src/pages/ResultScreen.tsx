import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../state/CaseContext";
import { computeScore } from "../state/progress";
import { recordCaseResult } from "../state/useDetectiveRecord";
import { CheckIcon, XIcon, GavelIcon, StarIcon } from "../components/icons";

const OUTCOME_COPY: Record<string, { title: string; sub: string; cls: string }> = {
  solved: {
    title: "CASE SOLVED",
    sub: "Every piece fit. The truth holds.",
    cls: "text-brass-300 border-brass-500/50 bg-brass-400/10",
  },
  partial: {
    title: "CLOSE, BUT NOT QUITE.",
    sub: "Part of your case was right. Part of it wasn't.",
    cls: "text-paper-200 border-paper-400/30 bg-paper-200/5",
  },
  unsolved: {
    title: "CASE UNSOLVED",
    sub: "Your accusation didn't hold up to the evidence.",
    cls: "text-burgundy-300 border-burgundy-500/50 bg-burgundy-500/10",
  },
};

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-paper-300/70">{label}</span>
        <span className="font-type text-paper-400/60">
          {value}/{max}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-noir-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brass-500 to-brass-300 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  correct,
  yourAnswer,
  correctAnswer,
}: {
  label: string;
  correct: boolean;
  yourAnswer: string;
  correctAnswer: string;
}) {
  return (
    <div className="rounded-sm border border-noir-600/60 bg-noir-900/40 p-4">
      <div className="flex items-center gap-2">
        {correct ? (
          <CheckIcon className="h-4 w-4 text-brass-400" />
        ) : (
          <XIcon className="h-4 w-4 text-burgundy-400" />
        )}
        <span className="stamp text-[10px] text-paper-400/60">{label}</span>
      </div>
      <p className={`mt-1.5 text-sm ${correct ? "text-brass-200" : "text-paper-200"}`}>{yourAnswer}</p>
      {!correct && (
        <p className="mt-1 text-xs text-paper-400/60">
          Correct answer: <span className="text-brass-300/90">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
}

export default function ResultScreen() {
  const { kase, progress } = useCaseContext();
  const navigate = useNavigate();
  const acc = progress.accusation;

  const breakdown = useMemo(() => computeScore(kase, progress), [kase, progress]);

  useEffect(() => {
    if (!acc) return;
    recordCaseResult({
      caseId: kase.id,
      outcome: acc.outcome,
      rank: breakdown.rank,
      score: breakdown.total,
      cluesDiscovered: progress.discoveredEvidenceIds.length,
      contradictionsFound: progress.foundLinkIds.length,
      submittedAt: acc.submittedAt,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acc?.submittedAt]);

  if (!acc) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-paper-300/70">You haven't made an accusation for this case yet.</p>
        <button
          onClick={() => navigate(`/case/${kase.id}/investigate?tab=accuse`)}
          className="btn-press rounded-sm border border-brass-500/50 px-5 py-2.5 text-sm font-semibold text-brass-300 hover:bg-brass-400/10"
        >
          Go Make Your Accusation
        </button>
      </div>
    );
  }

  const sol = kase.solution;
  const copy = OUTCOME_COPY[acc.outcome];
  const culpritName = kase.suspects.find((s) => s.id === sol.culpritId)?.name ?? "Unknown";
  const yourSuspectName = kase.suspects.find((s) => s.id === acc.suspectId)?.name ?? "Unknown";
  const correctMethod = sol.methodOptions.find((m) => m.id === sol.methodId)?.label ?? "";
  const yourMethod = sol.methodOptions.find((m) => m.id === acc.methodId)?.label ?? "";
  const correctMotive = sol.motiveOptions.find((m) => m.id === sol.motiveId)?.label ?? "";
  const yourMotive = sol.motiveOptions.find((m) => m.id === acc.motiveId)?.label ?? "";

  const keyEvidence = sol.keyEvidenceIds
    .map((id) => kase.evidence.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="animate-stamp mb-8 flex flex-col items-center text-center">
          <span className={`stamp inline-block rounded-sm border-2 px-6 py-3 text-2xl font-bold sm:text-3xl ${copy.cls}`}>
            {copy.title}
          </span>
          <p className="mt-4 text-paper-300/70">{copy.sub}</p>
        </div>

        {/* Rank + score */}
        <div className="animate-fade-in mb-8 rounded-sm border border-brass-500/40 bg-brass-400/5 p-6 text-center sm:p-8">
          <div className="stamp text-xs text-brass-400/70">FINAL DETECTIVE RANK</div>
          <div className="font-display mt-2 text-4xl font-extrabold text-brass-200 sm:text-5xl">
            {breakdown.rank}
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${i < Math.round(breakdown.total / 20) ? "text-brass-400" : "text-noir-600"}`}
              />
            ))}
          </div>
          <div className="font-type mt-2 text-sm text-paper-300/70">Detective Score: {breakdown.total} / 100</div>
        </div>

        {/* Your accusation vs. truth */}
        <div className="animate-fade-in mb-8">
          <h2 className="font-display mb-4 text-xl font-bold text-paper-100">Your Accusation</h2>
          <div className="space-y-3">
            <ComparisonRow
              label="WHO"
              correct={acc.suspectId === sol.culpritId}
              yourAnswer={yourSuspectName}
              correctAnswer={culpritName}
            />
            <ComparisonRow
              label="HOW"
              correct={acc.methodId === sol.methodId}
              yourAnswer={yourMethod}
              correctAnswer={correctMethod}
            />
            <ComparisonRow
              label="WHY"
              correct={acc.motiveId === sol.motiveId}
              yourAnswer={yourMotive}
              correctAnswer={correctMotive}
            />
          </div>
        </div>

        {/* Full reveal */}
        <div className="animate-fade-in mb-8 rounded-sm border border-noir-600/70 bg-noir-800/50 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-brass-300">
            <GavelIcon className="h-5 w-5" />
            <span className="stamp text-sm">The Solution</span>
          </div>
          <p className="font-serif-flavor mt-4 text-lg leading-relaxed text-paper-100/90">{sol.narrative}</p>

          <div className="brass-divider my-6" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="stamp mb-2 text-xs text-brass-400/80">Key Evidence</h3>
              <ul className="space-y-1.5 text-sm text-paper-200/85">
                {keyEvidence.map((e) => (
                  <li key={e!.id} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass-400" />
                    {e!.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="stamp mb-2 text-xs text-burgundy-400/80">Red Herrings, Explained</h3>
              <ul className="space-y-2 text-sm text-paper-300/75">
                {sol.redHerringNotes.map((rh) => {
                  const ev = kase.evidence.find((e) => e.id === rh.evidenceId);
                  return (
                    <li key={rh.evidenceId}>
                      <span className="text-paper-200">{ev?.name ?? rh.evidenceId}:</span>{" "}
                      {rh.explanation}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="animate-fade-in mb-10 rounded-sm border border-noir-600/70 bg-noir-800/40 p-6 sm:p-8">
          <h3 className="stamp mb-4 text-xs text-paper-400/60">Score Breakdown</h3>
          <div className="space-y-3">
            <ScoreBar label="Accusation Accuracy" value={breakdown.accusationPoints} max={45} />
            <ScoreBar label="Evidence Uncovered" value={breakdown.discoveryPoints} max={20} />
            <ScoreBar label="Contradictions Found" value={breakdown.contradictionPoints} max={15} />
            <ScoreBar label="Investigation Thoroughness" value={breakdown.thoroughnessPoints} max={15} />
            <ScoreBar label="Efficiency" value={breakdown.efficiencyPoints} max={10} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/cases")}
            className="btn-press rounded-sm border border-brass-500/50 px-6 py-3 text-sm font-semibold text-brass-300 transition-colors hover:bg-brass-400/10"
          >
            Back to Case Files
          </button>
          <button
            onClick={() => navigate("/record")}
            className="btn-press rounded-sm border border-noir-600 px-6 py-3 text-sm font-semibold text-paper-300/80 transition-colors hover:border-noir-500 hover:text-paper-200"
          >
            View Detective Record
          </button>
        </div>
      </div>
    </div>
  );
}
