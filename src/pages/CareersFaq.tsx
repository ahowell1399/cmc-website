import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Accordion from '@/components/ui/Accordion'
import { careersFaq } from '@/content/pages'
import { site } from '@/content/site'

export default function CareersFaq() {
  return (
    <>
      <Seo {...seo.careersFaq} />
      <PageHero title="Career FAQ" eyebrow="Careers">
        {careersFaq.intro}
      </PageHero>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <Accordion items={careersFaq.items} />

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-center">
            <p className="font-semibold text-slate-900">{careersFaq.stillHaveQuestion}</p>
            <div className="mt-4">
              <Button href={`mailto:${site.email.hr}`}>Email HR Dept.</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
