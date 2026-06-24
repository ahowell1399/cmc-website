import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import { about } from '@/content/pages'
import { asset } from '@/lib/asset'

export default function About() {
  return (
    <>
      <Seo {...seo.about} />
      <PageHero title={about.heading} eyebrow="About">
        {about.intro}
      </PageHero>

      {/* Overview */}
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="prose-cmc">
            {about.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-10 sm:p-14">
            <img
              src={asset('/cmc-logo.png')}
              alt="Creative Modular Construction"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </div>
        </div>
      </Section>

      {/* Ministry */}
      <Section id="Ministry" className="bg-slate-50">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          {about.ministry.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-brand-dark sm:text-4xl">
          {about.ministry.heading}
        </h2>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {['C', 'H', 'R', 'I', 'S', 'T'].map((letter) => (
              <img
                key={letter}
                src={asset(`/pictures/${letter}.png`)}
                alt={`CMC core value — ${letter}`}
                loading="lazy"
                className="w-full rounded-lg shadow-sm ring-1 ring-slate-200"
              />
            ))}
          </div>

          <div>
            <div className="prose-cmc">
              {about.ministry.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="text-xl font-bold text-brand-dark">{about.ministry.valuesHeading}</h3>
            <ul className="mt-4 space-y-3">
              {about.ministry.values.map((v) => (
                <li key={v.name} className="flex gap-3 leading-relaxed text-slate-600">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-brand-dark">{v.name}:</span> {v.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="prose-cmc mt-10 max-w-3xl mx-auto text-center">
          {about.ministry.closing.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  )
}
