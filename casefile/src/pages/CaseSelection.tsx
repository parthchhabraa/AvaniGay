import { useNavigate } from "react-router-dom";
import { cases } from "../data/cases";
import { useDetectiveRecord } from "../state/useDetectiveRecord";
import { StarIcon, ChevronRightIcon } from "../components/icons";

function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-3.5 w-3.5 ${i < level ? "text-brass-400" : "text-noir-600"}`}
        />
      ))}
    </span>
  );
}

function statusFor(caseId: string, solved: string[], partial: string[], failed: string[]) {
  if (solved.includes(caseId)) return { label: "SOLVED", cls: "text-brass-300 border-brass-500/50 bg-brass-400/10" };
  if (partial.includes(caseId)) return { label: "PARTIALLY SOLVED", cls: "text-paper-300 border-paper-400/30 bg-paper-200/5" };
  if (failed.includes(caseId)) return { label: "UNSOLVED", cls: "text-burgundy-400 border-burgundy-500/40 bg-burgundy-500/10" };
  return { label: "OPEN", cls: "text-paper-400/70 border-noir-600 bg-noir-800/40" };
}

export default function CaseSelection() {
  const navigate = useNavigate();
  const record = useDetectiveRecord();

  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="animate-fade-in mb-10">
          <div className="stamp text-xs text-brass-400/80">ARCHIVE</div>
          <h1 className="font-display mt-2 text-4xl font-bold text-paper-100 sm:text-5xl">Case Files</h1>
          <p className="mt-3 max-w-xl text-paper-300/70">
            Every file below is open for investigation. Choose one to begin — read the dossier,
            question the suspects, and see whether the truth holds up to scrutiny.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cases.map((kase, i) => {
            const status = statusFor(kase.id, record.casesSolved, record.casesPartial, record.casesFailed);
            return (
              <div
                key={kase.id}
                className="card-lift animate-fade-in group flex flex-col justify-between rounded-sm border border-noir-600/70 bg-noir-800/60 p-6 shadow-file"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="stamp text-xs text-brass-400/80">{kase.number}</span>
                    <span className={`stamp rounded-sm border px-2 py-0.5 text-[10px] ${status.cls}`}>
                      {status.label}
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-2xl font-bold text-paper-100">{kase.title}</h2>
                  <p className="mt-2 text-sm text-paper-300/70">{kase.location}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-paper-400/70">{kase.synopsis}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-noir-700 pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Difficulty</div>
                    <DifficultyStars level={kase.difficulty} />
                  </div>
                  <button
                    onClick={() => navigate(`/case/${kase.id}`)}
                    className="btn-press inline-flex items-center gap-1.5 rounded-sm border border-brass-500/50 px-4 py-2 text-sm font-semibold text-brass-300 transition-colors hover:bg-brass-400/10"
                  >
                    Start Case
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
