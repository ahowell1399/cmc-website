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
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand">
          {about.ministry.eyebrow}
        </p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          {about.ministry.heading}
        </h2>

        <div className="prose-cmc mx-auto mt-10 max-w-3xl text-center">
          {about.ministry.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
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

        <div className="prose-cmc mx-auto mt-10 max-w-3xl text-center">
          {about.ministry.closing.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* C.H.R.I.S.T. core value banners — horizontal row */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
      </Section>
    </>
  )
}
