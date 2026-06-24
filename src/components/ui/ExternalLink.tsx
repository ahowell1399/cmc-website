import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }

/** Anchor that always opens safely in a new tab. */
export default function ExternalLink({ children, ...rest }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}
