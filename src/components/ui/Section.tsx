import type { ReactNode } from 'react'
import Container from './Container'

type Props = {
  children: ReactNode
  id?: string
  /** classes for the <section> element (e.g. background colors) */
  className?: string
  /** classes for the inner container */
  containerClassName?: string
}

export default function Section({ children, id, className = '', containerClassName = '' }: Props) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
