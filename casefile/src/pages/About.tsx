import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl animate-fade-in">
        <div className="stamp text-xs text-brass-400/80">FIELD MANUAL</div>
        <h1 className="font-display mt-2 text-4xl font-bold text-paper-100">About CASEFILE</h1>

        <div className="mt-8 space-y-5 leading-relaxed text-paper-300/85">
          <p>
            CASEFILE is a collection of self-contained detective mysteries. Each case drops you into
            a fictional investigation with real suspects, real alibis, and a solution that is always
            logically determined by the evidence — never random.
          </p>
          <p>
            Your job is not to guess. It's to look closely. Read every suspect's account carefully,
            visit every location, and pay attention to what people say when they think no one is
            checking. Some evidence will matter enormously. Some of it — the bloodstained
            handkerchief, the suspicious-looking letter — will turn out to mean nothing at all. Part
            of the craft of detective work is knowing the difference.
          </p>
          <p>
            The Investigation Board lets you connect two pieces of evidence or testimony directly.
            When two things genuinely contradict each other, the board will tell you. Use it to test
            your theories before you commit to an accusation — once you accuse, the case is closed.
          </p>
          <p>
            Your Detective Record tracks every case you attempt across this browser: which you
            solved, which you didn't, and the rank you earned along the way. No account, no server —
            everything lives locally in this browser, the same way a detective's own private files
            might sit in a locked drawer.
          </p>
        </div>

        <div className="brass-divider my-10" />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/cases")}
            className="btn-press rounded-sm border border-brass-500/50 px-6 py-3 text-sm font-semibold text-brass-300 transition-colors hover:bg-brass-400/10"
          >
            Browse Case Files
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
