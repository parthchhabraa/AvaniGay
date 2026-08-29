import type { HTMLAttributes, ReactNode } from 'react'

interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  action?: ReactNode
  padded?: boolean
}

export function Panel({ title, action, padded = true, className = '', children, ...rest }: PanelProps) {
  return (
    <div className={`rounded-lg border border-line bg-paper-raised shadow-flat ${className}`} {...rest}>
      {title && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-ink-soft">{title}</h3>
          {action}
        </div>
      )}
      <div className={padded ? 'p-4' : ''}>{children}</div>
    </div>
  )
}
