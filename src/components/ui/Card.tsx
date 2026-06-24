import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </div>
  )
}
