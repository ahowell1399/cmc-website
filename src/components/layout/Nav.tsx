import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { nav } from '@/content/site'

const linkBase =
  'inline-flex items-center gap-1 px-2 py-2 text-[15px] font-semibold transition-colors'

export default function Nav() {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center">
        {nav.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && (
              <li aria-hidden="true" className="px-2 text-slate-300">
                |
              </li>
            )}
            <li className="group relative">
              {item.to ? (
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? 'text-brand' : 'text-brand/80 hover:text-brand'}`
                  }
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" aria-hidden="true" />}
                </NavLink>
              ) : (
                <span className={`${linkBase} text-brand/80`}>{item.label}</span>
              )}

              {item.children && (
                <ul className="invisible absolute left-1/2 top-full z-50 min-w-[12rem] -translate-x-1/2 -translate-y-1 rounded-lg border border-slate-200 bg-white p-1.5 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) =>
                    child.external && child.href ? (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand"
                        >
                          {child.label}
                        </a>
                      </li>
                    ) : (
                      <li key={child.label}>
                        <NavLink
                          to={child.to!}
                          className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand"
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  )
}
