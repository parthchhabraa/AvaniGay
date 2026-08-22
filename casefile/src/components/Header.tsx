import { NavLink } from "react-router-dom";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative py-1 text-sm tracking-wide transition-colors ${
          isActive ? "text-brass-300" : "text-paper-300/70 hover:text-paper-200"
        }`
      }
    >
      {({ isActive }) => (
        <span className="relative">
          {children}
          {isActive && (
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-brass-400" />
          )}
        </span>
      )}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-noir-700/80 bg-noir-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 sm:flex-nowrap sm:px-8">
        <NavLink to="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass-500/60 text-brass-300 transition-colors group-hover:border-brass-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="10.5" cy="10.5" r="6.2" />
              <path d="M19.5 19.5 15 15" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display whitespace-nowrap text-lg font-semibold tracking-[0.08em] text-paper-100">
            CASEFILE
          </span>
        </NavLink>

        <nav className="flex items-center gap-4 sm:gap-8">
          <NavItem to="/cases">Cases</NavItem>
          <NavItem to="/record">
            <span className="hidden sm:inline">Detective Record</span>
            <span className="sm:hidden">Record</span>
          </NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>
      </div>
    </header>
  );
}
