import { ImageIcon } from 'lucide-react'

/**
 * Placeholder image block. Marks every spot where real photography goes.
 * Swap this component for a real <img>/<picture> once the owner supplies photos
 * (drop them in /design-assets/photos — see design-assets/README.md).
 */
type Props = {
  label: string
  className?: string
  /** Tailwind aspect ratio utility, e.g. 'aspect-video' */
  aspect?: string
  rounded?: string
}

export default function Picture({
  label,
  className = '',
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-xl',
}: Props) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${aspect} ${rounded} bg-gradient-to-br from-brand-light/15 via-brand/15 to-brand-dark/25 ring-1 ring-inset ring-brand/15 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 p-4 text-center text-brand-dark/70">
        <ImageIcon className="h-7 w-7" aria-hidden="true" />
        <span className="max-w-[18rem] text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
    </div>
  )
}
