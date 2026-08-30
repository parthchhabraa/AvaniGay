interface TitleScreenProps {
  hasStartedGame: boolean
  onBegin: () => void
  onContinue: () => void
  onOpenSettings: () => void
}

export function TitleScreen({ hasStartedGame, onBegin, onContinue, onOpenSettings }: TitleScreenProps) {
  return (
    <div className="title-screen">
      <svg className="title-emblem" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M32 12c-8 10-13 17-13 24a13 13 0 0 0 26 0c0-7-5-14-13-24Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
      <h1>THE HOUSE OF LAST LIGHT</h1>
      <p className="subtitle">Some inherit a fortune. Others inherit a question.</p>
      <div className="title-actions">
        <button className="btn" onClick={onBegin}>
          Begin
        </button>
        <button className="btn" onClick={onContinue} disabled={!hasStartedGame}>
          Continue
        </button>
        <button className="btn" onClick={onOpenSettings}>
          Settings
        </button>
      </div>
      <p className="title-footnote">Blackwood House · Est. unknown</p>
    </div>
  )
}
