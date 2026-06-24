import { Facebook, Linkedin, Mail } from 'lucide-react'
import { site } from '@/content/site'

const links = [
  { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin, external: true },
  { label: 'Facebook', href: site.social.facebook, Icon: Facebook, external: true },
  { label: 'Email', href: `mailto:${site.email.inquiries}`, Icon: Mail, external: false },
]

type Props = {
  className?: string
  iconClassName?: string
}

export default function SocialLinks({ className = '', iconClassName = '' }: Props) {
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${iconClassName}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
