export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-noir-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brass-500 to-brass-300 transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="font-type text-xs tabular-nums text-brass-300/90">{percent}%</span>
    </div>
  );
}
