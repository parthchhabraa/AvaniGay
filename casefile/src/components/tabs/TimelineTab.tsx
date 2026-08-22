import { useCaseContext } from "../../state/CaseContext";

export default function TimelineTab() {
  const { kase } = useCaseContext();
  const sorted = [...kase.timeline].sort((a, b) => a.sortKey - b.sortKey);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Timeline</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          A chronological reconstruction of the night. Compare it against every suspect's claimed
          alibi — the gaps are where the truth hides.
        </p>
      </div>

      <div className="relative max-w-2xl pl-8">
        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-noir-600" />
        <div className="space-y-6">
          {sorted.map((ev, i) => (
            <div key={ev.id} className="animate-fade-in-fast relative" style={{ animationDelay: `${i * 45}ms` }}>
              <span
                className={`absolute -left-8 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                  ev.isKeyEvent
                    ? "border-brass-400 bg-brass-400/20"
                    : "border-noir-500 bg-noir-800"
                }`}
              >
                {ev.isKeyEvent && <span className="h-1.5 w-1.5 rounded-full bg-brass-300" />}
              </span>
              <div
                className={`rounded-sm border px-4 py-3 ${
                  ev.isKeyEvent
                    ? "border-brass-500/40 bg-brass-400/5"
                    : "border-noir-600/60 bg-noir-800/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-type text-xs text-brass-300">{ev.time}</span>
                  {ev.isKeyEvent && (
                    <span className="stamp rounded-sm border border-brass-500/40 px-1.5 py-0.5 text-[9px] text-brass-300">
                      KEY EVENT
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-200/85">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
