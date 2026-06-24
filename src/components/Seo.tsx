import { Helmet } from 'react-helmet-async'
import type { SeoMeta } from '@/content/seo'

export default function Seo({ title, description }: SeoMeta) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
