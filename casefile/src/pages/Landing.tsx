import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "../components/icons";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100vh-73px)] flex-col overflow-hidden bg-noir-900">
      {/* Ambient background texture */}
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% 8%, rgba(201,162,75,0.10), transparent 60%), radial-gradient(ellipse 1200px 700px at 50% 110%, rgba(125,36,50,0.10), transparent 60%)",
        }}
      />

      {/* Decorative floating file corners (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-[8%] top-[22%] w-40 -rotate-6 rounded-sm border border-noir-600/60 bg-noir-800/40 p-3 opacity-30 shadow-file backdrop-blur-sm">
          <div className="stamp text-[9px] text-brass-400/70">EVIDENCE — 03</div>
          <div className="mt-2 h-16 rounded-sm bg-paper-200/10" />
        </div>
        <div className="absolute right-[10%] top-[30%] w-36 rotate-6 rounded-sm border border-noir-600/60 bg-noir-800/40 p-3 opacity-25 shadow-file backdrop-blur-sm">
          <div className="stamp text-[9px] text-burgundy-400/70">CONFIDENTIAL</div>
          <div className="mt-2 h-14 rounded-sm bg-paper-200/10" />
        </div>
        <div className="absolute bottom-[14%] left-[14%] w-32 rotate-3 rounded-sm border border-noir-600/60 bg-noir-800/40 p-3 opacity-20 shadow-file backdrop-blur-sm">
          <div className="stamp text-[9px] text-paper-300/60">CASE FILE</div>
          <div className="mt-2 h-10 rounded-sm bg-paper-200/10" />
        </div>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="animate-fade-in stamp mb-6 inline-flex items-center gap-2 rounded-full border border-brass-500/40 px-4 py-1.5 text-[11px] text-brass-300/90">
          <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
          Classified Investigation Files
        </div>

        <h1
          className="animate-fade-in font-display text-[15vw] font-extrabold leading-none tracking-tight text-paper-100 sm:text-8xl md:text-9xl"
          style={{ animationDelay: "80ms" }}
        >
          CASEFILE
        </h1>

        <p
          className="animate-fade-in font-serif-flavor mt-7 max-w-xl text-xl italic text-paper-300/80 sm:text-2xl"
          style={{ animationDelay: "160ms" }}
        >
          "Every mystery has a culprit.
          <br />
          Every clue has a story."
        </p>

        <button
          onClick={() => navigate("/cases")}
          className="animate-fade-in btn-press card-lift group mt-12 inline-flex items-center gap-3 rounded-sm border border-brass-400/70 bg-brass-400/10 px-8 py-4 font-display text-lg font-semibold tracking-wide text-brass-200 shadow-file transition-colors hover:bg-brass-400/20 hover:text-brass-100"
          style={{ animationDelay: "240ms" }}
        >
          OPEN A CASE
          <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p
          className="animate-fade-in stamp mt-6 text-xs text-paper-400/50"
          style={{ animationDelay: "320ms" }}
        >
          6 suspects. Multiple clues. One truth.
        </p>
      </main>

      <div className="vignette absolute inset-0" />
    </div>
  );
}
