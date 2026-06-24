/**
 * The CMC chevron motif — layered blue arrows that frame the hero, pointing
 * inward toward the center (matching the live cmcmod.com landing page).
 * Geometry is kept inside the viewBox so the arrow tips are never clipped;
 * the artwork is designed to bleed gracefully off the top/bottom and outer edge.
 * `side="right"` mirrors the same artwork.
 */
type Props = {
  side?: 'left' | 'right'
  className?: string
}

// Back-to-front: outer arrows are darker navy, inner arrows brighter blue.
// Each band has a top-lit → bottom-shadowed gradient for a subtle 3D feel.
const bands = [
  { x: -50, top: '#1E4E91', bottom: '#0F2547' },
  { x: 10, top: '#2C6BC0', bottom: '#173A6E' },
  { x: 70, top: '#4D96E6', bottom: '#2257A0' },
  { x: 130, top: '#7DB6F2', bottom: '#3F86D6' },
]

const ARM = 145 // horizontal reach from the open end to the tip
const W = 46 // band thickness

export default function HeroChevrons({ side = 'left', className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 300 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`${side === 'right' ? '-scale-x-100' : ''} ${className}`}
    >
      <defs>
        {bands.map((b, i) => (
          <linearGradient key={i} id={`chev-${side}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={b.top} />
            <stop offset="100%" stopColor={b.bottom} />
          </linearGradient>
        ))}
      </defs>
      {bands.map((b, i) => (
        <polyline
          key={i}
          points={`${b.x},70 ${b.x + ARM},300 ${b.x},530`}
          fill="none"
          stroke={`url(#chev-${side}-${i})`}
          strokeWidth={W}
          strokeLinejoin="miter"
        />
      ))}
    </svg>
  )
}
