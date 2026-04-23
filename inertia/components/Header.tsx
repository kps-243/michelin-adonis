import { Link } from '@inertiajs/react'

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center h-14">
        <Link href="/" aria-label="Guide Michelin - Accueil" className="inline-flex items-baseline gap-1.5">
          <span className="font-title font-bold text-xl tracking-tight text-red-primary">
            MICHELIN
          </span>
          <span className="font-title font-normal text-xl tracking-tight text-red-primary">
            GUIDE
          </span>
        </Link>
      </div>
    </header>
  )
}