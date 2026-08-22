import { useNavigate } from "react-router-dom";
import { useDetectiveRecord, resetDetectiveRecord } from "../state/useDetectiveRecord";
import { casesById } from "../data/cases";
import { GavelIcon, MagnifierIcon, CheckIcon, AlertIcon } from "../components/icons";

function StatTile({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-noir-600/70 bg-noir-800/60 p-5">
      <div className="flex items-center gap-2 text-brass-400/80">{icon}</div>
      <div className="font-display mt-3 text-3xl font-bold text-paper-100">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-paper-400/60">{label}</div>
    </div>
  );
}

const outcomeStyle: Record<string, string> = {
  solved: "text-brass-300 border-brass-500/50 bg-brass-400/10",
  partial: "text-paper-300 border-paper-400/30 bg-paper-200/5",
  unsolved: "text-burgundy-400 border-burgundy-500/40 bg-burgundy-500/10",
};

const outcomeLabel: Record<string, string> = {
  solved: "SOLVED",
  partial: "PARTIAL",
  unsolved: "UNSOLVED",
};

export default function DetectiveRecordPage() {
  const record = useDetectiveRecord();
  const navigate = useNavigate();

  const attempted = record.casesAttempted.length;
  const solved = record.casesSolved.length;
  const failed = record.casesFailed.length;
  const avgAccuracy =
    record.history.length === 0
      ? 0
      : Math.round(record.history.reduce((s, h) => s + h.score, 0) / record.history.length);

  const sortedHistory = [...record.history].sort((a, b) => b.completedAt - a.completedAt);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-in mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="stamp text-xs text-brass-400/80">PERSONNEL FILE</div>
            <h1 className="font-display mt-2 text-4xl font-bold text-paper-100 sm:text-5xl">
              Detective Record
            </h1>
            <p className="mt-3 max-w-xl text-paper-300/70">
              A running record of every case you've opened in this browser, kept for your eyes
              only.
            </p>
          </div>
        </div>

        <div className="animate-fade-in grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Cases Attempted" value={attempted} icon={<MagnifierIcon className="h-5 w-5" />} />
          <StatTile label="Cases Solved" value={solved} icon={<CheckIcon className="h-5 w-5" />} />
          <StatTile label="Cases Failed" value={failed} icon={<AlertIcon className="h-5 w-5" />} />
          <StatTile label="Best Rank" value={record.bestRank} icon={<GavelIcon className="h-5 w-5" />} />
        </div>

        <div className="animate-fade-in mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatTile label="Average Accuracy" value={`${avgAccuracy}%`} icon={<MagnifierIcon className="h-5 w-5" />} />
          <StatTile label="Clues Discovered" value={record.totalCluesDiscovered} icon={<MagnifierIcon className="h-5 w-5" />} />
          <StatTile label="Contradictions Found" value={record.totalContradictionsFound} icon={<MagnifierIcon className="h-5 w-5" />} />
        </div>

        <div className="brass-divider my-10" />

        <h2 className="font-display text-2xl font-bold text-paper-100">Case History</h2>

        {sortedHistory.length === 0 ? (
          <div className="mt-6 rounded-sm border border-dashed border-noir-600 bg-noir-800/30 p-10 text-center">
            <p className="text-paper-400/70">
              No cases completed yet. Your first accusation will appear here.
            </p>
            <button
              onClick={() => navigate("/cases")}
              className="btn-press mt-5 rounded-sm border border-brass-500/50 px-5 py-2.5 text-sm font-semibold text-brass-300 transition-colors hover:bg-brass-400/10"
            >
              Open a Case
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {sortedHistory.map((h, i) => {
              const kase = casesById[h.caseId];
              return (
                <div
                  key={`${h.caseId}-${h.completedAt}`}
                  className="animate-fade-in-fast flex flex-col gap-3 rounded-sm border border-noir-600/70 bg-noir-800/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div>
                    <div className="stamp text-[10px] text-brass-400/70">{kase?.number ?? "#????"}</div>
                    <div className="font-display text-lg font-semibold text-paper-100">
                      {kase?.title ?? "Unknown Case"}
                    </div>
                    <div className="text-xs text-paper-400/60">
                      {new Date(h.completedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`stamp rounded-sm border px-2.5 py-1 text-[10px] ${outcomeStyle[h.outcome]}`}>
                      {outcomeLabel[h.outcome]}
                    </span>
                    <span className="text-sm text-paper-300/70">{h.rank}</span>
                    <span className="font-display text-lg font-bold text-brass-300">{h.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {record.history.length > 0 && (
          <div className="mt-10 text-right">
            <button
              onClick={() => {
                if (window.confirm("Erase your entire detective record? This cannot be undone.")) {
                  resetDetectiveRecord();
                }
              }}
              className="text-xs text-paper-400/40 underline decoration-dotted hover:text-burgundy-400"
            >
              Erase detective record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
