import type { ReactNode } from 'react'
import Container from './ui/Container'

type Props = {
  title: string
  eyebrow?: string
  children?: ReactNode
}

/**
 * Inner-page hero. White background with a large navy heading on the left and
 * optional intro copy on the right — matching the live cmcmod.com page style.
 */
export default function PageHero({ title, eyebrow, children }: Props) {
  return (
    <section className="border-b border-slate-100 bg-white">
      <Container
        className={`grid items-center gap-x-10 gap-y-5 py-14 sm:py-20 ${children ? 'lg:grid-cols-2' : ''}`}
      >
        <div>
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
        {children && <div className="text-lg leading-relaxed text-slate-600">{children}</div>}
      </Container>
    </section>
  )
}
