import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { partners } from '@/content/pages'

export default function Partners() {
  return (
    <>
      <Seo {...seo.partners} />
      <PageHero title={partners.heading} eyebrow="Partners">
        {partners.intro}
      </PageHero>

      <Section className="bg-slate-50">
        <div className="grid gap-6 lg:grid-cols-3">
          {partners.categories.map((c) => (
            <Card key={c.title} className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{c.tagline}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{c.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-slate-600">{c.body}</p>
              <div className="mt-5">
                <Button to="/community-partners" variant="outline">
                  Learn more
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
