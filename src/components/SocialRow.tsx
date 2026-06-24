import { Facebook, Linkedin, Mail } from 'lucide-react'
import { site } from '@/content/site'

const items = [
  {
    label: 'LinkedIn',
    href: site.social.linkedin,
    Icon: Linkedin,
    style: { backgroundColor: '#0A66C2' },
    external: true,
  },
  {
    label: 'Facebook',
    href: site.social.facebook,
    Icon: Facebook,
    style: { backgroundColor: '#1877F2' },
    external: true,
  },
  {
    label: 'Email',
    href: `mailto:${site.email.inquiries}`,
    Icon: Mail,
    style: { backgroundColor: '#2C6BC0' },
    external: false,
  },
]

/** Full-color circular social icons (LinkedIn, Facebook, Email). */
export default function SocialRow({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {items.map(({ label, href, Icon, style, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            style={style}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
