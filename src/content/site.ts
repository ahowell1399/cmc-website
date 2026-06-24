/**
 * Global site data — single source of truth for contact info, socials, and nav.
 * Pulled verbatim from the live cmcmod.com (Duda) site.
 */

export const site = {
  name: 'Creative Modular Construction',
  shortName: 'CMC',
  tagline: 'Our vision is to continue to lead the way in modular construction',
  description:
    'Creative Modular Construction is a Springfield, Missouri–based manufacturer specializing in commercial modular buildings.',
  phone: {
    display: '1-417-832-1160',
    tel: '+14178321160',
  },
  email: {
    inquiries: 'inquiries@cmcmod.com',
    hr: 'hr@cmcmod.com',
  },
  address: {
    line1: '319 North Main Ave, Suite 200',
    city: 'Springfield',
    state: 'MO',
    zip: '65802',
    full: '319 North Main Ave, Suite 200, Springfield, MO 65802',
  },
  geo: { lat: 37.2124029, lng: -93.2367381 },
  // External job application portal (EasyApply / GetHired)
  applyUrl: 'https://creativemodularconstructionllc.easyapply.co/',
  social: {
    facebook: 'https://www.facebook.com/cmcmod/',
    linkedin: 'https://www.linkedin.com/company/cmcmod/',
    maps: 'https://www.google.com/maps?q=319+North+Main+Ave,+Suite+200,+Springfield,+MO+65802',
  },
} as const

export type NavItem = {
  label: string
  to?: string
  href?: string
  external?: boolean
  children?: NavItem[]
}

export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Careers',
    to: '/careers',
    children: [
      { label: 'Career FAQ', to: '/careers-faq' },
      { label: 'Apply', href: site.applyUrl, external: true },
    ],
  },
  { label: 'Services', to: '/services' },
  {
    label: 'About',
    to: '/about',
    children: [{ label: 'Ministry', to: '/about#Ministry' }],
  },
  { label: 'Contact', to: '/contact' },
]
