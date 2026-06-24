import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'
import SocialLinks from './SocialLinks'
import { site, nav } from '@/content/site'
import { asset } from '@/lib/asset'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-white p-1.5">
              <img src={asset('/cmc-logo.png')} alt="Creative Modular Construction" className="h-10 w-auto" />
            </span>
            <span className="text-sm font-bold leading-tight">We Are CMC.</span>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Visit</h2>
          <p className="flex items-start gap-2 text-sm text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </span>
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Contact</h2>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email.inquiries}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email.inquiries}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Connect</h2>
          <SocialLinks iconClassName="bg-white/10 text-white hover:bg-white/20" />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {year} Creative Modular Construction. All rights reserved.</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-4">
              {nav
                .filter((n) => n.to)
                .map((n) => (
                  <li key={n.label}>
                    <Link to={n.to!} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  )
}
