import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SkipLink from './SkipLink'
import ScrollManager from './ScrollManager'

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <SkipLink />
      <Header />
      <main id="main" className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
