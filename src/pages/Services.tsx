import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import CardCornerArrows from '@/components/CardCornerArrows'
import { services } from '@/content/pages'
import { asset } from '@/lib/asset'

// Faint blueprint texture on each service card.
const cardTexture = {
  backgroundImage:
    'linear-gradient(rgba(21,49,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21,49,94,0.05) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
}

export default function Services() {
  return (
    <>
      <Seo {...seo.services} />

      {/* Hero: SERVICES | intro */}
      <section className="bg-white">
        <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-brand-dark sm:text-6xl lg:text-7xl">
            {services.heading}
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            {services.intro.before}
            <span className="font-bold text-brand">{services.intro.highlight}</span>
            {services.intro.after}
          </p>
        </Container>
      </section>

      {/* Core statement */}
      <section className="bg-white pb-16 sm:pb-20">
        <Container>
          <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-slate-500">
            {services.coreStatement}
          </p>
        </Container>
      </section>

      {/* Service cards on a dark background.
          NOTE: the live site uses an aerial facility photo here — drop one in
          /design-assets/photos and replace `bg-brand-dark` with a bg-image. */}
      <section className="relative overflow-hidden bg-brand-dark py-20">
        <img
          src={asset('/cmc-logo.png')}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 w-2/5 max-w-md -translate-y-1/2 opacity-[0.06]"
        />
        <Container className="relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.cards.map((card) => (
              <div
                key={card.title}
                className="relative flex flex-col overflow-hidden rounded-lg bg-white p-6 pb-7 shadow-xl ring-1 ring-slate-200"
                style={cardTexture}
              >
                <CardCornerArrows className="pointer-events-none absolute left-1.5 top-1.5 h-14 w-14" />
                <CardCornerArrows className="pointer-events-none absolute bottom-1.5 right-1.5 h-14 w-14 rotate-180" />
                <h2 className="relative z-10 mb-6 mt-8 text-center text-xl font-bold text-brand-dark">
                  {card.title}
                </h2>
                <p className="relative z-10 mt-auto rounded bg-brand-dark px-5 py-4 text-sm leading-relaxed text-white">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7Brew partnership */}
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <img
              src={asset('/pictures/7_Brew_Logo_Hi_Res.jpg')}
              alt="Seven Brew Coffee"
              className="w-full max-w-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
              {services.partnership.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{services.partnership.body}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
