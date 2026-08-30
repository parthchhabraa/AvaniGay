interface SettingsModalProps {
  reducedMotion: boolean
  onChangeReducedMotion: (value: boolean) => void
  onClose: () => void
}

export function SettingsModal({ reducedMotion, onChangeReducedMotion, onClose }: SettingsModalProps) {
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Settings">
        <h2>Settings</h2>
        <div className="settings-row">
          <span>Reduce motion</span>
          <input
            type="checkbox"
            className="toggle"
            checked={reducedMotion}
            onChange={(e) => onChangeReducedMotion(e.target.checked)}
            aria-label="Reduce motion"
          />
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
