import { Link, router } from '@inertiajs/react'
import BottomNav from '../../components/BottomNav'

interface Restaurant {
  id: string
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  street: string
  postcode: string
  city: string
  country: string
  codePostal: number
  maxPrice: number
  cuisine: string
  lat: number
  lng: number
  createdAt: string
  updatedAt: string | null
}

interface Props {
  restaurant: Restaurant
}

const STAR_INFO = {
  THREE: { label: '3 Étoiles Michelin', badge: '⭐⭐⭐', bg: 'bg-amber-50 text-amber-700' },
  TWO: { label: '2 Étoiles Michelin', badge: '⭐⭐', bg: 'bg-amber-50 text-amber-700' },
  ONE: { label: '1 Étoile Michelin', badge: '⭐', bg: 'bg-amber-50 text-amber-700' },
}

export default function RestaurantSingle({ restaurant: r }: Props) {
  const star = r.michelinStar ? STAR_INFO[r.michelinStar] : null

  const handleDelete = () => {
    if (confirm(`Supprimer "${r.name}" définitivement ?`)) {
      router.delete(`/restaurants/${r.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-gray-100 px-5 py-3 flex items-center gap-3">
        <Link
          href="/restaurants"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-[#E4002B] hover:text-[#E4002B] transition-colors"
        >
          ←
        </Link>
        <h1 className="font-cormorant text-xl font-semibold flex-1 truncate">{r.name}</h1>
        <Link
          href={`/restaurants/${r.id}/edit`}
          className="text-[11px] text-[#E4002B] border border-[#E4002B]/50 px-3 py-1.5 rounded-full hover:border-[#E4002B] transition-colors"
        >
          Éditer
        </Link>
      </header>

      <div className="px-5 py-6 space-y-4">
        {/* Hero card */}
        <div className="bg-[#1A1A1A] text-white rounded-[20px] p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#E4002B] rounded-full opacity-10 pointer-events-none" />
          <div className="absolute bottom-0 right-6 text-[80px] opacity-[0.05] pointer-events-none leading-none">⭐</div>

          {star ? (
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full mb-4 ${star.bg}`}>
              {star.badge} {star.label}
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full mb-4 bg-white/10 text-white/60">
              🍽 Sélectionné Michelin
            </span>
          )}

          <h2 className="font-cormorant text-[32px] font-light leading-tight mb-1">{r.name}</h2>
          <p className="text-white/60 text-[13px] mb-5">{r.cuisine}</p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Localisation</p>
              <p className="text-[13px] text-white/80">📍 {r.city}, {r.country}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Prix max</p>
              <p className="font-cormorant text-[#C8A96E] text-2xl font-semibold">{r.maxPrice} €</p>
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          <h3 className="font-cormorant text-[18px] font-semibold mb-3">Adresse</h3>
          <div className="space-y-1.5 text-[13px] text-gray-600">
            <p>{r.street}</p>
            <p>
              {r.postcode} {r.city}
              {r.codePostal && r.codePostal !== parseInt(r.postcode) ? (
                <span className="text-gray-400 ml-1">(CP: {r.codePostal})</span>
              ) : null}
            </p>
            <p className="font-medium text-[#1A1A1A]">{r.country}</p>
          </div>
        </div>

        {/* GPS */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          <h3 className="font-cormorant text-[18px] font-semibold mb-3">Coordonnées GPS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Latitude</p>
              <p className="font-mono text-[13px] text-[#1A1A1A]">{r.lat}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Longitude</p>
              <p className="font-mono text-[13px] text-[#1A1A1A]">{r.lng}</p>
            </div>
          </div>
          <a
            href={`https://maps.google.com/?q=${r.lat},${r.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[11px] text-[#E4002B] tracking-wide"
          >
            Voir sur Google Maps →
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Link
            href={`/restaurants/${r.id}/edit`}
            className="flex-1 py-3 text-center rounded-2xl border-[1.5px] border-[#1A1A1A] text-[#1A1A1A] text-[13px] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-2xl border-[1.5px] border-red-200 text-[#E4002B] text-[13px] font-medium hover:bg-red-50 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
