export function PageLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-ink-soft" role="status" aria-live="polite">
      <div className="chem-spinner" aria-hidden="true" />
      <span className="text-sm">{label}…</span>
    </div>
  )
}
