import { useId, useState, type ReactNode } from 'react'

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId()
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children /* the trigger is expected to accept aria-describedby via cloning at call sites, or simply sit adjacent */}
      <span id={id} role="tooltip" className={`chem-tooltip ${visible ? 'chem-tooltip-visible' : ''}`}>
        {label}
      </span>
    </span>
  )
}
