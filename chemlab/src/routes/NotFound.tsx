import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="font-mono text-[13px] text-ink-faint">404</p>
      <h1 className="text-xl font-semibold text-ink">This page isn't in the lab.</h1>
      <p className="max-w-sm text-[14px] text-ink-soft">The page or experiment you're looking for doesn't exist or may have moved.</p>
      <Link to="/">
        <Button variant="primary" className="mt-2">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
