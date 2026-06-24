import { Newspaper } from 'lucide-react'
import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import { news } from '@/content/pages'

export default function News() {
  return (
    <>
      <Seo {...seo.news} />
      <PageHero title={news.heading} eyebrow="Updates">
        {news.intro}
      </PageHero>

      <Section className="bg-slate-50">
        {news.items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">News coming soon</h2>
            <p className="mt-2 text-slate-600">
              We’re working on sharing the latest from CMC. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.items.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-sm text-slate-500">{item.date}</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
