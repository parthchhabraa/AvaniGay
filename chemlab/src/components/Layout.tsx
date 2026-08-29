import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/experiments', label: 'Experiments' },
  { to: '/practical', label: 'Practical Challenge' },
  { to: '/reference', label: 'Reference' },
  { to: '/progress', label: 'Progress' },
]

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 text-[15px] font-semibold text-ink" end>
            <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="6" fill="#175c50" />
              <path
                d="M13 6h6v7.2l5.4 9.6a2.2 2.2 0 0 1-1.9 3.3H9.5a2.2 2.2 0 0 1-1.9-3.3L13 13.2V6z"
                fill="none"
                stroke="#eef6f2"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="22.5" r="1.15" fill="#7fd6b8" />
            </svg>
            ChemLab
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
                    isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink-soft hover:bg-paper-sunken hover:text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="grid h-9 w-9 place-items-center rounded-md text-ink-soft hover:bg-paper-sunken md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-line bg-paper px-4 py-2 md:hidden" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink-soft'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
