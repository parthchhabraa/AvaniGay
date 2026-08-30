import { useState } from 'react'
import { openingBeats } from '../data/opening'

interface OpeningSequenceProps {
  onComplete: () => void
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [beatIndex, setBeatIndex] = useState(0)
  const beat = openingBeats[beatIndex]
  const isLast = beatIndex === openingBeats.length - 1

  const advance = () => {
    if (isLast) {
      onComplete()
    } else {
      setBeatIndex((i) => i + 1)
    }
  }

  return (
    <div
      className="opening-screen"
      onClick={advance}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') advance()
      }}
    >
      <div className="opening-beat" key={beat.id}>
        {beat.lines.map((line, i) => {
          const isQuote = line.startsWith('"')
          const isAttribution = line.startsWith('—')
          return (
            <p key={i} className={isQuote ? 'quote' : isAttribution ? 'attribution' : undefined}>
              {line}
            </p>
          )
        })}
        <p className="opening-continue">{isLast ? 'Click to enter the house' : 'Click to continue'}</p>
      </div>
    </div>
  )
}
