import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60'

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-brand text-brand hover:bg-brand hover:text-white',
  ghost: 'text-brand hover:bg-brand/10',
  light: 'bg-white text-brand hover:bg-slate-100',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  to?: string
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  'aria-label'?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  external,
  onClick,
  type = 'button',
  ...aria
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...aria}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...aria}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cls} {...aria}>
      {children}
    </button>
  )
}
