/**
 * Decorative corner chevrons for the service cards — three nested arrows
 * pointing inward (toward the card center). Place in the top-left corner;
 * add `rotate-180` to mirror it into the bottom-right corner.
 */
const cornerColors = ['#4D96E6', '#2C6BC0', '#15315E']

export default function CardCornerArrows({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      {[0, 1, 2].map((i) => {
        const v = 30 + i * 22
        const arm = 22
        return (
          <polyline
            key={i}
            points={`${v},${v - arm} ${v},${v} ${v - arm},${v}`}
            fill="none"
            stroke={cornerColors[i]}
            strokeWidth={8}
            strokeLinejoin="miter"
          />
        )
      })}
    </svg>
  )
}
