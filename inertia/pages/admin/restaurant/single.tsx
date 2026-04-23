import { Link, router } from '@inertiajs/react'
import SecondaryTitle from '~/components/SecondaryTitle'
import { MichelinStars } from '~/components/MichelinStar'

interface Restaurant {
  id: number
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
  THREE: { label: '3 Étoiles Michelin', count: 3, cls: 'bg-amber-50 text-amber-700' },
  TWO: { label: '2 Étoiles Michelin', count: 2, cls: 'bg-amber-50 text-amber-700' },
  ONE: { label: '1 Étoile Michelin', count: 1, cls: 'bg-amber-50 text-amber-700' },
}

export default function AdminRestaurantSingle({ restaurant: r }: Props) {
  const star = r.michelinStar ? STAR_INFO[r.michelinStar] : null

  const handleDelete = () => {
    if (confirm(`Supprimer "${r.name}" définitivement ?`)) {
      router.delete(`/admin/restaurants/${r.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] pb-24">

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center gap-3 lg:max-w-5xl lg:mx-auto lg:px-8 lg:py-4">
          <Link
            href="/admin/restaurants"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors shrink-0"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="font-title text-[18px] lg:text-[22px] font-semibold flex-1 truncate">{r.name}</h1>
          <Link
            href={`/admin/restaurants/${r.id}/edit`}
            className="text-[12px] text-red-primary border border-red-primary/30 px-4 py-1.5 rounded-full hover:border-red-primary transition-colors font-medium"
          >
            Éditer
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 flex flex-col gap-4 lg:max-w-5xl lg:mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:items-start">

        {/* Hero card */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden lg:col-span-2">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-red-primary rounded-full opacity-10 pointer-events-none" />
          <div className="absolute bottom-2 right-4 opacity-5 pointer-events-none select-none">
            <MichelinStars count={3} size={72} />
          </div>

          {star ? (
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full mb-4 ${star.cls}`}>
              <MichelinStars count={star.count} size={11} /> {star.label}
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full mb-4 bg-white/10 text-white/60">
              🍽 Sélectionné Michelin
            </span>
          )}

          <h2 className="font-title text-[28px] lg:text-[36px] font-semibold leading-tight mb-1">{r.name}</h2>
          <p className="text-white/60 text-[13px] mb-6">{r.cuisine}</p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Localisation</p>
              <p className="text-[13px] text-white/80">📍 {r.city}, {r.country}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Prix max</p>
              <p className="font-title text-red-primary text-[26px] font-semibold">{r.maxPrice} €</p>
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <SecondaryTitle hidden>Adresse</SecondaryTitle>
          <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-gray-600">
            <p>{r.street}</p>
            <p>{r.postcode} {r.city}</p>
            <p className="font-medium text-gray-900">{r.country}</p>
          </div>
        </div>

        {/* GPS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <SecondaryTitle hidden>Coordonnées GPS</SecondaryTitle>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Latitude</p>
              <p className="font-mono text-[13px] text-gray-900">{r.lat}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Longitude</p>
              <p className="font-mono text-[13px] text-gray-900">{r.lng}</p>
            </div>
          </div>
          <a
            href={`https://maps.google.com/?q=${r.lat},${r.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-red-primary font-medium"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
            </svg>
            Voir sur Google Maps
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-3 lg:col-span-2">
          <Link
            href={`/admin/restaurants/${r.id}/edit`}
            className="flex-1 py-3.5 text-center rounded-2xl border-[1.5px] border-gray-900 text-gray-900 text-[13px] font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 py-3.5 rounded-2xl border-[1.5px] border-red-200 text-red-primary text-[13px] font-semibold hover:bg-red-50 transition-colors"
          >
            Supprimer
          </button>
        </div>

      </div>
    </div>
  )
}
