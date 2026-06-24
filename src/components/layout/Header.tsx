import Logo from './Logo'
import Nav from './Nav'
import MobileNav from './MobileNav'
import CallNowButton from './CallNowButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-20 items-center gap-4 pl-3 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8">
        <div className="flex-1">
          <Logo />
        </div>

        {/* Centered primary nav (desktop) */}
        <div className="hidden lg:block">
          <Nav />
        </div>
        <div className="hidden flex-1 lg:block" aria-hidden="true" />

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <CallNowButton compact />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
