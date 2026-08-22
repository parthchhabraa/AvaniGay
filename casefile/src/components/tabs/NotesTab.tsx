import { useState } from "react";
import { useCaseContext } from "../../state/CaseContext";
import { NotebookIcon, XIcon } from "../icons";

export default function NotesTab() {
  const { progress, addNote, deleteNote } = useCaseContext();
  const [draft, setDraft] = useState("");

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    addNote(text, "manual");
    setDraft("");
  };

  const sorted = [...progress.notes].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-paper-100">Detective's Notes</h1>
        <p className="mt-1 text-sm text-paper-400/70">
          Your own reasoning, saved automatically. Nobody else will ever read this notebook.
        </p>
      </div>

      <div className="rounded-sm border border-noir-600/70 bg-noir-800/50 p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
          placeholder="e.g. Marcus's timeline doesn't match the clock..."
          rows={3}
          className="font-serif-flavor w-full resize-none rounded-sm border border-noir-600 bg-noir-900/60 p-3 text-base text-paper-100 placeholder:text-paper-400/40 focus:border-brass-400/60 focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-paper-400/40">⌘/Ctrl + Enter to save</span>
          <button
            onClick={submit}
            disabled={!draft.trim()}
            className="btn-press rounded-sm border border-brass-500/50 px-4 py-2 text-xs font-semibold text-brass-300 transition-colors hover:bg-brass-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-noir-600 bg-noir-800/20 py-12 text-center">
            <NotebookIcon className="h-8 w-8 text-paper-400/30" />
            <p className="text-sm text-paper-400/50">
              No notes yet. Write down anything that seems off — you can always add evidence here
              too.
            </p>
          </div>
        ) : (
          sorted.map((note, i) => (
            <div
              key={note.id}
              className="animate-fade-in-fast group flex items-start justify-between gap-3 rounded-sm border border-noir-600/60 bg-noir-800/40 p-4"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div>
                {note.source === "evidence" && (
                  <span className="stamp mb-1 inline-block text-[9px] text-brass-400/70">
                    FROM EVIDENCE
                  </span>
                )}
                <p className="font-serif-flavor text-base leading-relaxed text-paper-100/90">
                  {note.text}
                </p>
                <p className="mt-1 text-[10px] text-paper-400/40">
                  {new Date(note.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                aria-label="Delete note"
                className="btn-press shrink-0 rounded-full p-1.5 text-paper-400/30 opacity-0 transition-opacity hover:bg-noir-700 hover:text-burgundy-400 group-hover:opacity-100"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
