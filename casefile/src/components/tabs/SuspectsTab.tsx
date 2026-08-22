import { useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import Modal from "../Modal";
import type { Suspect } from "../../types";

function SuspectAvatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-16 w-16 text-xl" : "h-12 w-12 text-sm";
  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full border border-brass-500/40 bg-noir-700 font-display font-semibold text-brass-300`}
    >
      {initials}
    </div>
  );
}

function SuspicionMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wide text-paper-400/50">Suspicion</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-3.5 rounded-sm ${
              i < level ? "bg-burgundy-500/80" : "bg-noir-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SuspectsTab() {
  const { kase, progress, viewSuspect } = useCaseContext();
  const [openId, setOpenId] = useState<string | null>(null);

  const openSuspect = (s: Suspect) => {
    setOpenId(s.id);
    viewSuspect(s.id);
  };

  const active = kase.suspects.find((s) => s.id === openId) ?? null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Suspects</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          {kase.suspects.length} people were present or connected to the case. Review each dossier
          carefully — suspicion level reflects circumstance, not guilt.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kase.suspects.map((s, i) => {
          const viewed = progress.viewedSuspectIds.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => openSuspect(s)}
              className="card-lift animate-fade-in-fast btn-press flex flex-col items-start rounded-sm border border-noir-600/70 bg-noir-800/50 p-5 text-left"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex w-full items-start justify-between">
                <SuspectAvatar initials={s.initials} />
                {!viewed && (
                  <span className="stamp rounded-sm border border-brass-500/40 bg-brass-400/10 px-2 py-0.5 text-[9px] text-brass-300">
                    NEW
                  </span>
                )}
              </div>
              <h3 className="font-display mt-3 text-lg font-semibold text-paper-100">{s.name}</h3>
              <p className="text-xs text-paper-400/60">{s.role}</p>
              <p className="mt-2 line-clamp-2 text-xs text-paper-400/70">{s.bio}</p>
              <div className="mt-3">
                <SuspicionMeter level={s.suspicionLevel} />
              </div>
            </button>
          );
        })}
      </div>

      <Modal open={!!active} onClose={() => setOpenId(null)} labelledBy="suspect-name">
        {active && (
          <div>
            <div className="flex items-start gap-4">
              <SuspectAvatar initials={active.initials} size="lg" />
              <div>
                <h2 id="suspect-name" className="font-display text-2xl font-bold text-paper-100">
                  {active.name}
                </h2>
                <p className="text-sm text-paper-400/70">
                  {active.role} · Age {active.age}
                </p>
                <div className="mt-2">
                  <SuspicionMeter level={active.suspicionLevel} />
                </div>
              </div>
            </div>

            <div className="brass-divider my-5" />

            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <div className="stamp mb-1 text-[10px] text-brass-400/80">Biography</div>
                <p className="text-paper-200/85">{active.bio}</p>
              </div>
              <div>
                <div className="stamp mb-1 text-[10px] text-brass-400/80">Relationship to Case</div>
                <p className="text-paper-200/85">{active.relationshipToVictim}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-noir-600/60 bg-noir-900/40 p-3.5">
                  <div className="stamp mb-1 text-[10px] text-paper-400/60">Possible Motive</div>
                  <p className="text-paper-200/85">{active.motive}</p>
                </div>
                <div className="rounded-sm border border-noir-600/60 bg-noir-900/40 p-3.5">
                  <div className="stamp mb-1 text-[10px] text-paper-400/60">Claimed Alibi</div>
                  <p className="text-paper-200/85">{active.alibi}</p>
                </div>
              </div>
              <div>
                <div className="stamp mb-1 text-[10px] text-brass-400/80">Notable Detail</div>
                <p className="text-paper-200/85">{active.quirk}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
