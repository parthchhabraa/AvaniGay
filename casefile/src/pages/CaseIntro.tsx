import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../state/CaseContext";
import { recordCaseStart } from "../state/useDetectiveRecord";
import { ChevronRightIcon, TargetIcon } from "../components/icons";

export default function CaseIntro() {
  const { kase } = useCaseContext();
  const navigate = useNavigate();

  const begin = () => {
    recordCaseStart(kase.id);
    navigate(`/case/${kase.id}/investigate`);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="animate-file-open rounded-sm border border-noir-600/70 bg-noir-800/60 shadow-file">
          {/* Dossier header stamp bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-noir-700 px-6 py-4 sm:px-10">
            <span className="stamp text-xs text-brass-400/80">CASE {kase.number}</span>
            <span className="stamp rounded-sm border border-burgundy-500/50 bg-burgundy-500/10 px-3 py-1 text-[10px] text-burgundy-400">
              STATUS: UNSOLVED
            </span>
          </div>

          <div className="px-6 py-10 sm:px-10">
            <h1 className="font-display text-3xl font-bold leading-tight text-paper-100 sm:text-4xl">
              {kase.title}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-6 border-y border-noir-700/70 py-5 text-sm sm:grid-cols-4">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Location</div>
                <div className="mt-1 text-paper-200">{kase.location}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Date</div>
                <div className="mt-1 text-paper-200">{kase.date}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Suspects</div>
                <div className="mt-1 text-paper-200">{kase.suspects.length}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-paper-400/50">Difficulty</div>
                <div className="mt-1 text-paper-200">{"★".repeat(kase.difficulty)}{"☆".repeat(5 - kase.difficulty)}</div>
              </div>
            </div>

            <p className="font-serif-flavor mt-7 text-lg leading-relaxed text-paper-200/90">
              {kase.synopsis}
            </p>

            <div className="mt-9 rounded-sm border border-brass-500/30 bg-brass-400/5 p-5">
              <div className="flex items-center gap-2 text-brass-300">
                <TargetIcon className="h-4 w-4" />
                <span className="stamp text-xs">Your Objective</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-paper-200/85">{kase.objectiveNote}</p>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-paper-300/80 sm:grid-cols-3">
                <div className="rounded-sm bg-noir-900/40 px-3 py-2">
                  <span className="text-brass-400">WHO</span> committed the act?
                </div>
                <div className="rounded-sm bg-noir-900/40 px-3 py-2">
                  <span className="text-brass-400">HOW</span> was it done?
                </div>
                <div className="rounded-sm bg-noir-900/40 px-3 py-2">
                  <span className="text-brass-400">WHY</span> did they do it?
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={begin}
                className="btn-press card-lift group inline-flex items-center gap-3 rounded-sm border border-brass-400/70 bg-brass-400/10 px-8 py-4 font-display text-lg font-semibold tracking-wide text-brass-200 transition-colors hover:bg-brass-400/20 hover:text-brass-100"
              >
                BEGIN INVESTIGATION
                <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
