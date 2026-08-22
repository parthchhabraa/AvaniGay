import { useCaseContext } from "../../state/CaseContext";
import { UsersIcon, MagnifierIcon, MapIcon, PinboardIcon, ChevronRightIcon } from "../icons";

function StatRow({
  icon,
  label,
  done,
  total,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  done: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card-lift btn-press flex w-full items-center justify-between rounded-sm border border-noir-600/70 bg-noir-800/50 px-4 py-3.5 text-left transition-colors hover:border-brass-500/40"
    >
      <div className="flex items-center gap-3">
        <span className="text-brass-400/80">{icon}</span>
        <span className="text-sm text-paper-200">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-type text-xs tabular-nums text-paper-400/70">
          {done} / {total}
        </span>
        <ChevronRightIcon className="h-4 w-4 text-paper-400/50" />
      </div>
    </button>
  );
}

export default function CaseTab({ onNavigateTab }: { onNavigateTab: (t: any) => void }) {
  const { kase, progress } = useCaseContext();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-sm border border-noir-600/70 bg-noir-800/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="stamp text-xs text-brass-400/80">CASE {kase.number}</span>
            <span className="stamp rounded-sm border border-burgundy-500/50 bg-burgundy-500/10 px-3 py-1 text-[10px] text-burgundy-400">
              UNSOLVED
            </span>
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold text-paper-100">{kase.title}</h1>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Location</div>
              <div className="mt-0.5 text-paper-200">{kase.location}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Date</div>
              <div className="mt-0.5 text-paper-200">{kase.date}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Subject</div>
              <div className="mt-0.5 text-paper-200">{kase.victim}</div>
            </div>
          </div>

          <div className="brass-divider my-6" />

          <p className="font-serif-flavor text-lg leading-relaxed text-paper-200/90">{kase.synopsis}</p>

          <div className="mt-7 rounded-sm border border-brass-500/30 bg-brass-400/5 p-5">
            <span className="stamp text-xs text-brass-300">Your Objective</span>
            <p className="mt-2 text-sm leading-relaxed text-paper-200/85">{kase.objectiveNote}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="stamp mb-1 text-xs text-paper-400/60">Investigation Sections</h2>
        <StatRow
          icon={<UsersIcon className="h-4 w-4" />}
          label="Suspects Interviewed"
          done={progress.viewedSuspectIds.length}
          total={kase.suspects.length}
          onClick={() => onNavigateTab("suspects")}
        />
        <StatRow
          icon={<MagnifierIcon className="h-4 w-4" />}
          label="Evidence Discovered"
          done={progress.discoveredEvidenceIds.length}
          total={kase.evidence.length}
          onClick={() => onNavigateTab("evidence")}
        />
        <StatRow
          icon={<MapIcon className="h-4 w-4" />}
          label="Locations Explored"
          done={progress.exploredLocationIds.length}
          total={kase.locations.length}
          onClick={() => onNavigateTab("locations")}
        />
        <StatRow
          icon={<PinboardIcon className="h-4 w-4" />}
          label="Connections Found"
          done={progress.foundLinkIds.length}
          total={kase.boardLinks.length}
          onClick={() => onNavigateTab("board")}
        />

        <div className="mt-4 rounded-sm border border-dashed border-noir-600 bg-noir-800/30 p-4 text-xs leading-relaxed text-paper-400/60">
          Ready to name a culprit? Head to the <span className="text-brass-300">Accuse</span> tab
          when your case feels solid — but you can only submit once per attempt, so make it count.
        </div>
      </div>
    </div>
  );
}
