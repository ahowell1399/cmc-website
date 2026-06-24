import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ExternalLink } from 'lucide-react'
import { nav, site } from '@/content/site'

const topLink = 'block rounded-lg px-4 py-3.5 text-base font-semibold transition-colors'
const subLink =
  'flex items-center gap-1.5 rounded-lg px-4 py-3 text-[15px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand active:bg-brand/10'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  // Lock body scroll + allow Escape to close while open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Always mounted (rendered into <body>) so it can slide in/out smoothly.
  // The header's backdrop-blur would otherwise trap a fixed overlay inside it.
  const drawer = (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <span className="text-lg font-bold text-slate-900">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `${topLink} ${
                        isActive ? 'bg-brand/10 text-brand' : 'text-slate-800 hover:bg-slate-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <span className={`${topLink} text-slate-800`}>{item.label}</span>
                )}

                {item.children && (
                  <ul className="mt-1 space-y-0.5 border-l-2 border-slate-100 pl-3">
                    {item.children.map((child) =>
                      child.external && child.href ? (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={subLink}
                          >
                            {child.label}
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </li>
                      ) : (
                        <li key={child.label}>
                          <NavLink to={child.to!} className={subLink}>
                            {child.label}
                          </NavLink>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Quick call CTA */}
          <div className="mt-6 border-t border-slate-200 pt-4">
            <a
              href={`tel:${site.phone.tel}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </nav>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {createPortal(drawer, document.body)}
    </>
  )
}
