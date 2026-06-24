import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import HeroChevrons from '@/components/HeroChevrons'
import SectionChevrons from '@/components/SectionChevrons'
import SocialRow from '@/components/SocialRow'
import VideoEmbed from '@/components/media/VideoEmbed'
import PortfolioGallery from '@/components/media/PortfolioGallery'
import { home } from '@/content/pages'
import { asset } from '@/lib/asset'

// Project photos from /public/pictures (the C/H/R/I/S/T value graphics are
// intentionally excluded — those belong to the About page's core values).
// Interleaved by camera type so the masonry layout mixes orientations.
const portfolioImages = [
  'DJI_0004.jpg',
  '5D4A0065.jpg',
  '20210618_183535.jpg',
  'DSC05904.jpg',
  'DJI_0018.jpg',
  '5D4A0111.jpg',
  'DSC05907.jpg',
  '20210810_133751.jpg',
  'DJI_0031.jpg',
  'DSC05909.jpg',
  'project-image-4.jpg',
  'DJI_0101.jpg',
  'DSC05911.jpg',
  'project-image-6.jpg',
  'DJI_0178.jpg',
  'Media.jpg',
  'inside-top-box-hvac-1.jpg',
]

// Faint blueprint grid behind the hero (placeholder for the real blueprint art).
const blueprintStyle = {
  backgroundImage:
    'linear-gradient(rgba(21,49,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21,49,94,0.05) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
}

export default function Home() {
  return (
    <>
      <Seo {...seo.home} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="pointer-events-none absolute inset-0" style={blueprintStyle} aria-hidden="true" />
        {/* Decorative side chevrons frame the hero on wide screens. On phones/
            tablets they'd cover ~84% of the width and sit under the intro text,
            so they're hidden below lg — the centered logo carries the brand. */}
        <HeroChevrons
          side="left"
          className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[42%] max-w-[440px] lg:block"
        />
        <HeroChevrons
          side="right"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[42%] max-w-[440px] lg:block"
        />

        <Container className="relative z-10 flex flex-col items-center py-20 text-center sm:py-28">
          <img
            src={asset('/cmc-logo.png')}
            alt="Creative Modular Construction"
            width={454}
            height={454}
            className="mx-auto w-64 max-w-full sm:w-96"
          />

          <div className="mt-12 max-w-2xl space-y-5 text-slate-700">
            <p className="leading-relaxed">
              <span className="font-semibold text-brand">{home.hero.introLead}</span>
              {home.hero.introRest}
            </p>
            <p className="leading-relaxed">{home.hero.introP2}</p>
          </div>
        </Container>
      </section>

      {/* Social row */}
      <section className="flex justify-center bg-white py-12">
        <SocialRow />
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0" style={blueprintStyle} aria-hidden="true" />
        {/* Corner chevrons: small + faint on mobile/tablet so they read as a
            subtle accent and never sit behind the vision copy; full size on lg. */}
        <SectionChevrons
          corner="bl"
          className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 opacity-30 sm:h-40 sm:w-40 lg:h-96 lg:w-96 lg:opacity-100"
        />
        <SectionChevrons
          corner="br"
          className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 opacity-30 sm:h-40 sm:w-40 lg:h-96 lg:w-96 lg:opacity-100"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl rounded-sm border-2 border-white/50 bg-brand py-5 text-center shadow-lg ring-1 ring-brand-dark/10">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{home.vision.heading}</h2>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center font-medium leading-relaxed text-slate-800">
            {home.vision.before}
            <span className="font-bold text-brand">{home.vision.highlight}</span>
            {home.vision.after}
          </p>
        </Container>
      </section>

      {/* Portfolio */}
      <Section className="bg-white">
        <div className="mx-auto mb-12 max-w-5xl">
          <div className="h-px w-full bg-brand/50" />
          <h2 className="py-6 text-center text-2xl font-bold uppercase tracking-[0.2em] text-brand-dark sm:text-3xl">
            Portfolio
          </h2>
          <div className="h-px w-full bg-brand/50" />
        </div>

        {/* Masonry gallery of project photos from /public/pictures */}
        <PortfolioGallery images={portfolioImages} />
      </Section>

      {/* Video */}
      <Section className="bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <VideoEmbed id="TWtiiRLUvZM" title="Creative Modular Construction" />
        </div>
      </Section>

      {/* Featured concept render */}
      <Section className="bg-white">
        <img
          src={asset('/pictures/concept-render.png')}
          alt="Creative Modular Construction concept rendering"
          className="mx-auto w-full rounded-xl shadow-lg ring-1 ring-slate-200"
        />
      </Section>
    </>
  )
}
