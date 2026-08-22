import { useMemo, useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import Modal from "../Modal";
import type { Evidence } from "../../types";
import { LockIcon, StarIcon } from "../icons";

const typeLabel: Record<Evidence["type"], string> = {
  object: "Physical Object",
  document: "Document",
  photograph: "Photograph",
  log: "Record / Log",
  letter: "Letter",
  forensic: "Forensic Finding",
};

function findUnlockQuestion(kase: ReturnType<typeof useCaseContext>["kase"], evidenceId: string) {
  for (const interrogation of kase.interrogations) {
    const q = interrogation.questions.find((q) => q.unlocksEvidenceId === evidenceId);
    if (q) return { suspectId: interrogation.suspectId, questionId: q.id };
  }
  return null;
}

export default function EvidenceTab() {
  const { kase, progress, discoverEvidence, toggleImportant, addNote } = useCaseContext();
  const [openId, setOpenId] = useState<string | null>(null);
  const [noteConfirm, setNoteConfirm] = useState(false);

  const locationName = (id: string) => kase.locations.find((l) => l.id === id)?.name ?? "Unknown";

  const lockInfo = useMemo(() => {
    const map = new Map<string, { locked: boolean; hint: string }>();
    for (const ev of kase.evidence) {
      const requiredEvidence = ev.requiresEvidenceIds ?? [];
      const missingEvidence = requiredEvidence.filter((id) => !progress.discoveredEvidenceIds.includes(id));
      const unlockQ = findUnlockQuestion(kase, ev.id);
      let locked = false;
      let hint = "";
      if (missingEvidence.length > 0) {
        locked = true;
        hint = "Uncover related evidence elsewhere first.";
      } else if (unlockQ && !progress.askedQuestionIds.includes(`${unlockQ.suspectId}:${unlockQ.questionId}`)) {
        const suspectName = kase.suspects.find((s) => s.id === unlockQ.suspectId)?.name ?? "a suspect";
        locked = true;
        hint = `Ask ${suspectName} the right question during interrogation.`;
      }
      map.set(ev.id, { locked, hint });
    }
    return map;
  }, [kase, progress.discoveredEvidenceIds, progress.askedQuestionIds]);

  const openEvidence = (ev: Evidence) => {
    if (lockInfo.get(ev.id)?.locked) return;
    setOpenId(ev.id);
    setNoteConfirm(false);
    discoverEvidence(ev.id);
  };

  const active = kase.evidence.find((e) => e.id === openId) ?? null;
  const activeImportant = active ? progress.importantEvidenceIds.includes(active.id) : false;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Evidence Locker</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          {kase.evidence.length} items recovered from the scene. Not everything here matters — read
          carefully before deciding what to trust.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kase.evidence.map((ev, i) => {
          const discovered = progress.discoveredEvidenceIds.includes(ev.id);
          const important = progress.importantEvidenceIds.includes(ev.id);
          const { locked, hint } = lockInfo.get(ev.id)!;

          return (
            <button
              key={ev.id}
              onClick={() => openEvidence(ev)}
              disabled={locked}
              className={`animate-fade-in-fast relative flex flex-col items-start rounded-sm border p-5 text-left transition-colors ${
                locked
                  ? "cursor-not-allowed border-noir-700 bg-noir-800/25 opacity-60"
                  : "card-lift btn-press border-noir-600/70 bg-noir-800/50 hover:border-brass-500/40"
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {important && !locked && (
                <StarIcon className="absolute right-4 top-4 h-4 w-4 text-brass-400" />
              )}
              <span className="stamp text-[10px] text-brass-400/70">{typeLabel[ev.type]}</span>
              <h3 className="font-display mt-2 text-base font-semibold text-paper-100">
                {locked ? "??? Unidentified Evidence" : ev.name}
              </h3>
              <p className="mt-1 text-xs text-paper-400/60">{locationName(ev.locationId)}</p>
              {locked ? (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-paper-400/50">
                  <LockIcon className="h-3.5 w-3.5" />
                  {hint}
                </p>
              ) : (
                <p className="mt-3 line-clamp-2 text-xs text-paper-400/70">{ev.summary}</p>
              )}
              {!locked && !discovered && (
                <span className="stamp mt-3 rounded-sm border border-brass-500/40 bg-brass-400/10 px-2 py-0.5 text-[9px] text-brass-300">
                  UNREVIEWED
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Modal open={!!active} onClose={() => setOpenId(null)} labelledBy="evidence-name">
        {active && (
          <div>
            <span className="stamp text-[10px] text-brass-400/80">{typeLabel[active.type]}</span>
            <h2 id="evidence-name" className="font-display mt-1 text-2xl font-bold text-paper-100">
              {active.name}
            </h2>
            <p className="mt-1 text-xs text-paper-400/60">
              Found at: {locationName(active.locationId)}
            </p>

            <div className="brass-divider my-5" />

            <p className="text-sm leading-relaxed text-paper-200/90">{active.details}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => toggleImportant(active.id)}
                className={`btn-press inline-flex items-center gap-1.5 rounded-sm border px-4 py-2 text-xs font-semibold transition-colors ${
                  activeImportant
                    ? "border-brass-400/70 bg-brass-400/15 text-brass-300"
                    : "border-noir-600 text-paper-300/80 hover:border-brass-500/40"
                }`}
              >
                <StarIcon className="h-3.5 w-3.5" />
                {activeImportant ? "Marked Important" : "Mark as Important"}
              </button>
              <button
                onClick={() => {
                  addNote(`Evidence — ${active.name}: ${active.summary}`, "evidence", active.id);
                  setNoteConfirm(true);
                }}
                className="btn-press rounded-sm border border-noir-600 px-4 py-2 text-xs font-semibold text-paper-300/80 transition-colors hover:border-brass-500/40"
              >
                {noteConfirm ? "Added to Notes ✓" : "Add to Notes"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
