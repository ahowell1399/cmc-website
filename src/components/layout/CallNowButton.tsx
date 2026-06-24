import { Phone } from 'lucide-react'
import { site } from '@/content/site'

export default function CallNowButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={`tel:${site.phone.tel}`}
      aria-label="Call CMC now"
      className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      {!compact && <span>Call Now</span>}
    </a>
  )
}
