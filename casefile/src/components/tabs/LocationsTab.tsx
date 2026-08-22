import { useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import { MapIcon, ChevronRightIcon, MagnifierIcon } from "../icons";

export default function LocationsTab({ onNavigateTab }: { onNavigateTab: (t: any) => void }) {
  const { kase, progress, exploreLocation } = useCaseContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded((cur) => (cur === id ? null : id));
    exploreLocation(id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Locations</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          {kase.locations.length} places connected to the case. Search each one to see what turned
          up.
        </p>
      </div>

      <div className="space-y-3">
        {kase.locations.map((loc, i) => {
          const explored = progress.exploredLocationIds.includes(loc.id);
          const isOpen = expanded === loc.id;
          return (
            <div
              key={loc.id}
              className="animate-fade-in-fast overflow-hidden rounded-sm border border-noir-600/70 bg-noir-800/50"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => toggle(loc.id)}
                className="btn-press flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass-500/40 text-brass-300">
                    <MapIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-paper-100">{loc.name}</div>
                    <div className="text-xs text-paper-400/60">
                      {loc.evidenceIds.length} evidence item{loc.evidenceIds.length !== 1 ? "s" : ""}
                      {!explored && " · unsearched"}
                    </div>
                  </div>
                </div>
                <ChevronRightIcon
                  className={`h-4 w-4 shrink-0 text-paper-400/50 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="animate-fade-in-fast border-t border-noir-700 px-5 py-4">
                  <p className="text-sm leading-relaxed text-paper-300/80">{loc.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {loc.evidenceIds.map((evId) => {
                      const ev = kase.evidence.find((e) => e.id === evId);
                      if (!ev) return null;
                      const discovered = progress.discoveredEvidenceIds.includes(ev.id);
                      return (
                        <span
                          key={evId}
                          className={`inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 text-xs ${
                            discovered
                              ? "border-brass-500/40 bg-brass-400/10 text-brass-300"
                              : "border-noir-600 text-paper-400/60"
                          }`}
                        >
                          {ev.name}
                        </span>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => onNavigateTab("evidence")}
                    className="btn-press mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brass-300 hover:text-brass-200"
                  >
                    <MagnifierIcon className="h-3.5 w-3.5" />
                    Examine Evidence
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
