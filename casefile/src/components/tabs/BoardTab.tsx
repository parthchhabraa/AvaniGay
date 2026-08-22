import { useMemo, useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import type { BoardLink } from "../../types";
import { LinkIcon, AlertIcon, LockIcon } from "../icons";

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-2", "rotate-1", "rotate-0"];

type ResultState = { link: BoardLink | null; attempted: [string, string] } | null;

export default function BoardTab() {
  const { kase, progress, foundLink } = useCaseContext();
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<ResultState>(null);

  const isNodeUnlocked = (refId: string, kind: string) => {
    if (kind === "evidence") return progress.discoveredEvidenceIds.includes(refId);
    if (kind === "statement" || kind === "timeline") {
      return progress.askedQuestionIds.some((q) => q.startsWith(`${refId}:`)) || progress.viewedSuspectIds.includes(refId);
    }
    return true;
  };

  const findLink = (a: string, b: string) =>
    kase.boardLinks.find(
      (l) => (l.nodeIds[0] === a && l.nodeIds[1] === b) || (l.nodeIds[0] === b && l.nodeIds[1] === a)
    );

  const clickNode = (id: string) => {
    const node = kase.boardNodes.find((n) => n.id === id);
    if (!node || !isNodeUnlocked(node.refId, node.kind)) return;

    setResult(null);

    if (selected.includes(id)) {
      setSelected((s) => s.filter((x) => x !== id));
      return;
    }

    if (selected.length === 0) {
      setSelected([id]);
      return;
    }

    if (selected.length === 1) {
      const [first] = selected;
      const link = findLink(first, id);
      setSelected([first, id]);
      setResult({ link: link ?? null, attempted: [first, id] });
      if (link) foundLink(link.id);
      return;
    }

    // Already have 2 selected — start a fresh selection.
    setSelected([id]);
  };

  const clear = () => {
    setSelected([]);
    setResult(null);
  };

  const foundLinksSet = useMemo(() => new Set(progress.foundLinkIds), [progress.foundLinkIds]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-paper-100">Investigation Board</h1>
          <p className="mt-1 max-w-2xl text-sm text-paper-400/70">
            Select two pins to test whether they connect — or contradict. Locked pins need to be
            discovered elsewhere first.
          </p>
        </div>
        {selected.length > 0 && (
          <button
            onClick={clear}
            className="btn-press rounded-sm border border-noir-600 px-3 py-1.5 text-xs text-paper-300/70 hover:border-brass-500/40"
          >
            Clear Selection
          </button>
        )}
      </div>

      <div className="corkboard rounded-sm border border-noir-700 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {kase.boardNodes.map((node, i) => {
            const unlocked = isNodeUnlocked(node.refId, node.kind);
            const isSelected = selected.includes(node.id);
            const isResolved = kase.boardLinks.some(
              (l) => foundLinksSet.has(l.id) && l.nodeIds.includes(node.id)
            );
            return (
              <button
                key={node.id}
                onClick={() => clickNode(node.id)}
                disabled={!unlocked}
                className={`btn-press relative flex min-h-[92px] flex-col justify-between rounded-sm border p-3.5 text-left shadow-file transition-all ${
                  ROTATIONS[i % ROTATIONS.length]
                } ${
                  !unlocked
                    ? "cursor-not-allowed border-noir-700 bg-noir-800/40 opacity-50"
                    : isSelected
                    ? "border-brass-300 bg-paper-200 text-ink-900 rotate-0 scale-105"
                    : "border-paper-300/80 bg-paper-200 text-ink-900 hover:rotate-0"
                }`}
              >
                <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-burgundy-500 shadow-sm" />
                {unlocked ? (
                  <>
                    <span className="font-type text-[9px] uppercase tracking-wide text-ink-700/60">
                      {node.kind}
                    </span>
                    <span className="font-serif-flavor text-sm font-semibold leading-snug">
                      {node.label}
                    </span>
                  </>
                ) : (
                  <span className="flex h-full items-center justify-center gap-1.5 text-paper-400/50">
                    <LockIcon className="h-4 w-4" />
                    <span className="text-xs">Locked</span>
                  </span>
                )}
                {isResolved && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass-400 text-[9px] text-noir-900">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {result && (
        <div
          className={`animate-fade-in mt-6 rounded-sm border p-5 ${
            !result.link
              ? "border-noir-600 bg-noir-800/50"
              : result.link.type === "contradiction"
              ? "border-burgundy-500/60 bg-burgundy-500/10"
              : "border-brass-500/50 bg-brass-400/10"
          }`}
        >
          <div className="flex items-center gap-2">
            {result.link ? (
              result.link.type === "contradiction" ? (
                <AlertIcon className="h-5 w-5 text-burgundy-400" />
              ) : (
                <LinkIcon className="h-5 w-5 text-brass-300" />
              )
            ) : (
              <LinkIcon className="h-5 w-5 text-paper-400/50" />
            )}
            <span
              className={`stamp text-sm ${
                !result.link
                  ? "text-paper-300/70"
                  : result.link.type === "contradiction"
                  ? "text-burgundy-300"
                  : "text-brass-300"
              }`}
            >
              {result.link ? result.link.title : "NO CLEAR CONNECTION"}
            </span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-paper-200/85">
            {result.link
              ? result.link.explanation
              : "These two don't appear to be related. That doesn't mean either is unimportant on its own — just not to each other."}
          </p>
        </div>
      )}
    </div>
  );
}
