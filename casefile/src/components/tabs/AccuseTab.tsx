import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../../state/CaseContext";
import { CheckIcon, GavelIcon, AlertIcon } from "../icons";

const ANALYZE_LINES = ["ANALYZING EVIDENCE...", "CHECKING TIMELINE...", "COMPARING STATEMENTS...", "REACHING A VERDICT..."];

function OptionCard({
  selected,
  onClick,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-press flex w-full items-center justify-between gap-3 rounded-sm border px-4 py-3.5 text-left transition-colors ${
        selected
          ? "border-brass-400/70 bg-brass-400/10"
          : "border-noir-600/70 bg-noir-800/40 hover:border-noir-500"
      }`}
    >
      <div>
        <div className={`text-sm font-medium ${selected ? "text-brass-200" : "text-paper-200"}`}>{title}</div>
        {subtitle && <div className="mt-0.5 text-xs text-paper-400/60">{subtitle}</div>}
      </div>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-brass-400 bg-brass-400 text-noir-900" : "border-noir-500"
        }`}
      >
        {selected && <CheckIcon className="h-3 w-3" />}
      </span>
    </button>
  );
}

export default function AccuseTab() {
  const { kase, progress, submitAccusation } = useCaseContext();
  const navigate = useNavigate();

  const [suspectId, setSuspectId] = useState<string | null>(progress.accusation?.suspectId ?? null);
  const [methodId, setMethodId] = useState<string | null>(progress.accusation?.methodId ?? null);
  const [motiveId, setMotiveId] = useState<string | null>(progress.accusation?.motiveId ?? null);
  const [analyzing, setAnalyzing] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  const alreadySubmitted = !!progress.accusation;
  const ready = !!suspectId && !!methodId && !!motiveId;

  useEffect(() => {
    if (!analyzing) return;
    if (lineIndex >= ANALYZE_LINES.length) {
      const t = setTimeout(() => navigate(`/case/${kase.id}/result`), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 700);
    return () => clearTimeout(t);
  }, [analyzing, lineIndex, kase.id, navigate]);

  const submit = () => {
    if (!ready || !suspectId || !methodId || !motiveId) return;
    const sol = kase.solution;
    let correctCount = 0;
    if (suspectId === sol.culpritId) correctCount++;
    if (methodId === sol.methodId) correctCount++;
    if (motiveId === sol.motiveId) correctCount++;
    const outcome = correctCount === 3 ? "solved" : correctCount > 0 ? "partial" : "unsolved";

    submitAccusation({
      suspectId,
      methodId,
      motiveId,
      submittedAt: Date.now(),
      outcome,
      correctCount,
    });
    setAnalyzing(true);
    setLineIndex(0);
  };

  if (analyzing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-noir-950">
        <div className="bg-noise absolute inset-0" />
        <GavelIcon className="animate-pulse-soft relative z-10 mb-8 h-10 w-10 text-brass-400" />
        <div className="relative z-10 space-y-3 text-center">
          {ANALYZE_LINES.map((line, i) => (
            <p
              key={line}
              className={`font-type text-sm tracking-[0.15em] transition-opacity duration-500 ${
                i <= lineIndex ? "opacity-100" : "opacity-0"
              } ${i === lineIndex ? "text-brass-300" : "text-paper-400/50"}`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="mx-auto max-w-lg rounded-sm border border-noir-600/70 bg-noir-800/50 p-8 text-center">
        <GavelIcon className="mx-auto mb-4 h-8 w-8 text-brass-400" />
        <h2 className="font-display text-xl font-bold text-paper-100">Accusation Already Filed</h2>
        <p className="mt-2 text-sm text-paper-300/70">
          You've already made your case. Head to the result to see how it played out.
        </p>
        <button
          onClick={() => navigate(`/case/${kase.id}/result`)}
          className="btn-press mt-5 rounded-sm border border-brass-500/50 px-6 py-2.5 text-sm font-semibold text-brass-300 hover:bg-brass-400/10"
        >
          View Result
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-start gap-3 rounded-sm border border-burgundy-500/40 bg-burgundy-500/10 p-4">
        <AlertIcon className="h-5 w-5 shrink-0 text-burgundy-400" />
        <p className="text-sm text-burgundy-200/90">
          Once you submit, the case closes. Make sure you've examined everything you need to before
          naming a culprit.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="stamp mb-3 text-xs text-brass-400/80">WHO DID IT?</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {kase.suspects.map((s) => (
            <OptionCard
              key={s.id}
              selected={suspectId === s.id}
              onClick={() => setSuspectId(s.id)}
              title={s.name}
              subtitle={s.role}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="stamp mb-3 text-xs text-brass-400/80">HOW DID THEY DO IT?</h2>
        <div className="space-y-2">
          {kase.solution.methodOptions.map((m) => (
            <OptionCard key={m.id} selected={methodId === m.id} onClick={() => setMethodId(m.id)} title={m.label} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="stamp mb-3 text-xs text-brass-400/80">WHY DID THEY DO IT?</h2>
        <div className="space-y-2">
          {kase.solution.motiveOptions.map((m) => (
            <OptionCard key={m.id} selected={motiveId === m.id} onClick={() => setMotiveId(m.id)} title={m.label} />
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <button
          onClick={submit}
          disabled={!ready}
          className="btn-press card-lift inline-flex items-center gap-3 rounded-sm border border-burgundy-500/60 bg-burgundy-500/15 px-8 py-4 font-display text-lg font-semibold tracking-wide text-burgundy-200 transition-colors hover:bg-burgundy-500/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <GavelIcon className="h-5 w-5" />
          SUBMIT ACCUSATION
        </button>
      </div>
    </div>
  );
}
