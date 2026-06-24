import type { RouteObject } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Careers from '@/pages/Careers'
import CareersFaq from '@/pages/CareersFaq'
import Contact from '@/pages/Contact'
import Projects from '@/pages/Projects'
import Partners from '@/pages/Partners'
import CommunityPartners from '@/pages/CommunityPartners'
import News from '@/pages/News'
import NotFound from '@/pages/NotFound'

/**
 * Single source of truth for routing.
 * Every live cmcmod.com path is preserved here so nothing 404s after launch.
 * (This same list will later feed the SSG prerender + sitemap generation.)
 */
export const routePaths = [
  '/',
  '/services',
  '/about',
  '/careers',
  '/careers-faq',
  '/contact',
  '/projects',
  '/partners',
  '/community-partners',
  '/news',
] as const

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'careers', element: <Careers /> },
      { path: 'careers-faq', element: <CareersFaq /> },
      { path: 'contact', element: <Contact /> },
      { path: 'projects', element: <Projects /> },
      { path: 'partners', element: <Partners /> },
      { path: 'community-partners', element: <CommunityPartners /> },
      { path: 'news', element: <News /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
