import { useState } from 'react'
import { Play } from 'lucide-react'

type Props = {
  /** YouTube video id (the part after `watch?v=`) */
  id: string
  /** Accessible title for the player + play button label */
  title: string
  className?: string
}

/**
 * Click-to-load YouTube embed (the "lite" pattern). Until the visitor clicks,
 * only a thumbnail + play button render — no YouTube player JS or cookies load
 * on initial page view, which keeps the page fast and avoids consent
 * obligations. Once activated it loads via the privacy-enhanced
 * youtube-nocookie.com domain. Mirrors the click-to-load approach intended for
 * third-party embeds in the rebuild plan.
 */
export default function VideoEmbed({ id, title, className = '' }: Props) {
  const [activated, setActivated] = useState(false)

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200 ${className}`}
    >
      {activated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
            }}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-brand-dark/20 transition-colors group-hover:bg-brand-dark/30" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  )
}
