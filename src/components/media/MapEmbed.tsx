import { site } from '@/content/site'

/**
 * Google Maps embed (keyless) of the CMC office, shown directly.
 * Height is controlled by the caller (via className) so it can stretch to fill
 * its card — pass e.g. `flex-1 min-h-0` inside a flex column.
 */
export default function MapEmbed({ className = '' }: { className?: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&z=15&output=embed`

  return (
    <iframe
      title={`Map to ${site.name}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`block w-full border-0 ${className}`}
    />
  )
}
