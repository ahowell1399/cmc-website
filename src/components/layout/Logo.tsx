import { Link } from 'react-router-dom'
import { asset } from '@/lib/asset'

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Creative Modular Construction — home"
      className="inline-flex items-center"
    >
      <img src={asset('/cmc-logo.png')} alt="Creative Modular Construction" className="h-16 w-auto" />
    </Link>
  )
}
