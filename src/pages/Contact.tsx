import { Phone, Mail, MapPin } from 'lucide-react'
import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import ContactForm from '@/components/forms/ContactForm'
import MapEmbed from '@/components/media/MapEmbed'
import SectionChevrons from '@/components/SectionChevrons'
import SocialRow from '@/components/SocialRow'
import { contact } from '@/content/pages'
import { site } from '@/content/site'

const channels = [
  {
    label: 'Visit Us',
    value: site.address.full,
    href: site.social.maps,
    Icon: MapPin,
    external: true,
  },
  {
    label: 'Call Us',
    value: site.phone.display,
    href: `tel:${site.phone.tel}`,
    Icon: Phone,
    external: false,
  },
  {
    label: 'Email Us',
    value: site.email.inquiries,
    href: `mailto:${site.email.inquiries}`,
    Icon: Mail,
    external: false,
  },
]

// Faint blueprint grid for the dark band.
const blueprintDark = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
}

export default function Contact() {
  return (
    <>
      <Seo {...seo.contact} />
      <PageHero title={contact.hero.title} eyebrow="Contact">
        {contact.hero.body}
      </PageHero>

      {/* Form + map, equal height side by side */}
      <Section className="bg-slate-50">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-brand-dark">Send Us a Message</h2>
            <p className="mt-2 text-slate-600">
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Map card — stretches to match the form height */}
          <div className="flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-brand px-5 py-3 text-white">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="font-semibold">Springfield, MO</span>
            </div>
            <MapEmbed className="min-h-0 flex-1" />
          </div>
        </div>
      </Section>

      {/* Get in touch — branded navy band */}
      <section className="relative overflow-hidden bg-brand-dark py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0" style={blueprintDark} aria-hidden="true" />
        <SectionChevrons
          corner="bl"
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 opacity-30"
        />
        <SectionChevrons
          corner="br"
          className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-30"
        />

        <Container className="relative">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">Reach Us</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Get in Touch</h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-brand-light">
                  {label}
                </span>
                <span className="text-white/85">{value}</span>
              </a>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">Follow Us</p>
            <SocialRow />
          </div>
        </Container>
      </section>
    </>
  )
}
