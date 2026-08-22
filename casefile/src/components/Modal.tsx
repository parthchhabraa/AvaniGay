import { useEffect } from "react";
import { XIcon } from "./icons";

export default function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in-fast fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-noir-950/80 px-4 py-8 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="animate-file-open relative w-full max-w-2xl rounded-sm border border-noir-600 bg-noir-850 shadow-file"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="btn-press absolute right-3 top-3 z-10 rounded-full p-1.5 text-paper-400/60 transition-colors hover:bg-noir-700 hover:text-paper-200"
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
