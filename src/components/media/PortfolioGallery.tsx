import { useState, useEffect, useCallback, useRef } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { asset } from '@/lib/asset'

type Props = {
  /** Image filenames served from the public folder */
  images: string[]
  /** Folder under public/ the images live in */
  folder?: string
  /** Base alt text; the photo number is appended for uniqueness */
  alt?: string
}

/**
 * Masonry photo grid with a hover zoom and a click-to-open full-screen
 * lightbox (keyboard: ←/→ to navigate, Esc to close; click backdrop to close).
 */
export default function PortfolioGallery({
  images,
  folder = '/pictures',
  alt = 'Creative Modular Construction project',
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  // While the lightbox is open: keyboard controls, body-scroll lock, focus.
  useEffect(() => {
    if (!isOpen) return

    closeBtnRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {images.map((file, i) => (
          <button
            key={file}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${alt} ${i + 1} full screen`}
            className="group relative block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <img
              src={asset(`${folder}/${file}`)}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              className="w-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-dark/0 transition-colors duration-300 group-hover:bg-brand-dark/40">
              <Maximize2
                className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </span>
          </button>
        ))}
      </div>

      {/* Full-screen lightbox */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous photo"
                className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next photo"
                className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}

          <img
            src={asset(`${folder}/${images[openIndex]}`)}
            alt={`${alt} ${openIndex + 1}`}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
