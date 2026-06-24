import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Picture from '@/components/ui/Picture'
import Button from '@/components/ui/Button'
import { partners } from '@/content/pages'
import { site } from '@/content/site'

export default function CommunityPartners() {
  return (
    <>
      <Seo {...seo.communityPartners} />
      <PageHero title="Partners" eyebrow="Stronger Together">
        {partners.intro}
      </PageHero>

      {partners.categories.map((c, i) => (
        <Section key={c.title} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">{c.tagline}</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{c.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-600">{c.body}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <Picture key={j} label="Partner logo" aspect="aspect-[3/2]" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href={`mailto:${site.email.inquiries}`}>Become a partner</Button>
          </div>
        </Section>
      ))}
    </>
  )
}
