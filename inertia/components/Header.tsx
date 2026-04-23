import { Link, usePage } from '@inertiajs/react'
import LogoutIcon from '../ressources/images/icons/Log-Out--Streamline-Lucide.svg'

export default function Header() {
  const { user } = usePage().props as any

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-14">
        <Link href="/" aria-label="Guide Michelin - Accueil" className="inline-flex items-baseline gap-1.5">
          <span className="font-title font-bold text-xl tracking-tight text-[#E4002B]">
            MICHELIN
          </span>
          <span className="font-title font-normal text-xl tracking-tight text-[#E4002B]">
            GUIDE
          </span>
        </Link>

        {user && (
          <Link
            href="/logout"
            method="post"
            as="button"
            className="flex items-center justify-center w-10! h-10 transition-colors bg-transparent! border-none! rounded-md hover:bg-gray-100! active:bg-gray-200! cursor-pointer"
            title="Se déconnecter"
          >
            <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
          </Link>
        )}
      </div>
    </header>
  )
}