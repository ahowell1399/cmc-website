import { Check } from 'lucide-react'
import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { careers } from '@/content/pages'
import { site } from '@/content/site'

export default function Careers() {
  return (
    <>
      <Seo {...seo.careers} />
      <PageHero title={careers.hero.title} eyebrow="Careers">
        {careers.hero.body}
      </PageHero>

      {/* Apply CTA */}
      <Section className="bg-white">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="max-w-2xl text-lg text-slate-600">{careers.coreMessage}</p>
          <Button href={site.applyUrl} external size="lg">
            {careers.cta}
          </Button>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-slate-50">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Benefits &amp; Perks</h2>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {careers.benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-medium text-slate-800">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Build something */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{careers.buildSomething.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{careers.buildSomething.body}</p>
          <div className="mt-8">
            <Button href={site.applyUrl} external size="lg">
              Apply Here
            </Button>
          </div>
        </div>
      </Section>

      {/* EOE */}
      <Section className="bg-slate-50">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-slate-500">
          {careers.eoe}
        </p>
      </Section>
    </>
  )
}
