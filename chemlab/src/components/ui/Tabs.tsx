interface TabsProps<T extends string> {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}

export function Tabs<T extends string>({ value, onChange, options }: TabsProps<T>) {
  return (
    <div role="tablist" className="inline-flex rounded-md border border-line bg-paper-sunken p-0.5">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-[4px] px-3 py-1.5 text-[13px] font-medium transition-colors ${
              active ? 'bg-paper-raised text-ink shadow-flat' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
