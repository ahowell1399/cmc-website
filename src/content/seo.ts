/**
 * Per-page SEO metadata.
 * Titles mirror the existing live cmcmod.com pages to preserve search parity.
 * NOTE: verify each <title>/description against the live origin before launch
 * (SEO parity is load-bearing — see REACT-VITE-REBUILD-PLAN.md §10).
 */

export type SeoMeta = {
  title: string
  description: string
}

export const seo = {
  home: {
    title: 'Offsite Volumetric Construction | Creative Modular Construction',
    description:
      'Creative Modular Construction specializes in innovative commercial modular buildings. Contact us for efficient, high-quality construction solutions.',
  },
  services: {
    title: 'Offsite Volumetric Construction | Creative Modular Construction',
    description:
      'From design assistance and in-house fabrication to direct-to-client delivery, CMC delivers high-performance commercial modular buildings.',
  },
  about: {
    title: 'Modular Construction | Creative Modular Construction',
    description:
      "Learn about Creative Modular Construction — who we are, our ministry heart, and what drives our work in commercial modular construction.",
  },
  careers: {
    title: 'Careers in Offsite Volumetric Construction | Creative Modular Construction',
    description:
      'Join a team built on craftsmanship, integrity, and excellence. Explore careers and benefits at Creative Modular Construction.',
  },
  careersFaq: {
    title: 'Career FAQ | Creative Modular Construction',
    description:
      'Answers about applying, interviews, benefits, and what it is like to work at Creative Modular Construction.',
  },
  contact: {
    title: 'Offsite Volumetric Construction | Creative Modular Construction',
    description:
      'Share your vision with Creative Modular Construction. Contact our Springfield, Missouri team to start your modular building project.',
  },
  projects: {
    title: 'Creative Modular Projects | Creative Modular Construction',
    description:
      'Explore the quality and craftsmanship behind Creative Modular Construction projects, delivered from concept to completion.',
  },
  partners: {
    title: 'Partnerships in Offsite Construction | Creative Modular Construction',
    description:
      'Our success is built on strong partnerships — community partners, supply partners, and client partners of Creative Modular Construction.',
  },
  communityPartners: {
    title: 'Community Partners in Offsite Construction | Creative Modular Construction',
    description:
      'Stronger together. Discover the community, client, and supply partnerships behind Creative Modular Construction.',
  },
  news: {
    title: 'News on Offsite Volumetric Construction | Creative Modular Construction',
    description:
      'The latest news and updates from Creative Modular Construction.',
  },
  notFound: {
    title: 'Page Not Found | Creative Modular Construction',
    description: 'The page you are looking for could not be found.',
  },
} as const satisfies Record<string, SeoMeta>
