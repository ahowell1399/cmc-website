import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On navigation: scroll to top, or to the hash target (e.g. /about#Ministry)
 * after layout settles. react-router v6 does not handle hash scrolling itself.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
