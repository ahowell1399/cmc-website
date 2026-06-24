import { ChevronDown } from 'lucide-react'

type Item = { q: string; a: string }

export default function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <details key={i} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-5 pr-8 leading-relaxed text-slate-600">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
