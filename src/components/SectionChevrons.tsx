/**
 * Large diagonal chevron motif for section corners (e.g. the "Our Vision"
 * band on the home page). Arrows point inward toward the center.
 * corner="bl" → bottom-left, pointing up-right. corner="br" mirrors it.
 */
type Props = {
  corner?: 'bl' | 'br'
  className?: string
}

const bands = [
  { color: '#15315E' },
  { color: '#1E4E91' },
  { color: '#2C6BC0' },
  { color: '#4D96E6' },
]

const ARM = 70

export default function SectionChevrons({ corner = 'bl', className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`${corner === 'br' ? '-scale-x-100' : ''} ${className}`}
    >
      {bands.map((b, i) => {
        const ex = 60 + i * 55
        const ey = 240 - i * 55
        return (
          <polyline
            key={i}
            points={`${ex},${ey + ARM} ${ex},${ey} ${ex - ARM},${ey}`}
            fill="none"
            stroke={b.color}
            strokeWidth={26}
            strokeLinejoin="miter"
          />
        )
      })}
    </svg>
  )
}
