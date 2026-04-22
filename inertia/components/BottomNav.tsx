import { Link } from '@inertiajs/react'

interface BottomNavProps {
  active: 'home' | 'swipe' | 'pour-toi' | 'map' | 'profile'
  dark?: boolean
}

export default function BottomNav({ active, dark = false }: BottomNavProps) {
  const base = dark
    ? 'bg-[rgba(13,13,13,0.95)] backdrop-blur-xl border-t border-white/[0.07]'
    : 'bg-white border-t border-gray-100'

  const inactiveColor = dark ? 'text-white/40' : 'text-gray-400'
  const activeColor = 'text-[#E4002B]'

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 h-[64px] flex items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] ${base}`}
    >
      {/* Accueil */}
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${active === 'home' ? activeColor : inactiveColor}`}
      >
        <span className="text-[22px] leading-none">🏠</span>
        <span className="text-[10px] tracking-wider font-medium">Accueil</span>
      </Link>

      {/* Carte */}
      <button
        className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${active === 'map' ? activeColor : inactiveColor}`}
      >
        <span className="text-[22px] leading-none">🗺</span>
        <span className="text-[10px] tracking-wider font-medium">Carte</span>
      </button>

      {/* Swipe (central FAB) */}
      <div className="flex-1 flex flex-col items-center relative">
        <Link
          href="/decouverte"
          className="w-[52px] h-[52px] bg-[#E4002B] rounded-full flex items-center justify-center text-[22px] -mt-[22px] shadow-[0_4px_16px_rgba(228,0,43,0.4)]"
        >
          🔥
        </Link>
        <span className={`text-[10px] font-medium mt-0.5 ${active === 'swipe' ? activeColor : 'text-[#E4002B]'}`}>
          Swipe
        </span>
      </div>

      {/* Pour Toi */}
      <Link
        href="/pour-toi"
        className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${active === 'pour-toi' ? activeColor : inactiveColor}`}
      >
        <span className="text-[22px] leading-none">✨</span>
        <span className="text-[10px] tracking-wider font-medium">Pour Toi</span>
      </Link>

      {/* Profil */}
      <button
        className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${active === 'profile' ? activeColor : inactiveColor}`}
      >
        <span className="text-[22px] leading-none">👤</span>
        <span className="text-[10px] tracking-wider font-medium">Profil</span>
      </button>
    </nav>
  )
}
