import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { csrfPost } from '~/utils/api'

interface Restaurant {
  id: number
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  street: string | null
  postcode: string | null
  city: string | null
  country: string | null
  maxPrice: number | null
  cuisine: string | null
  lat: number | null
  lng: number | null
  image: string
  gallery: string[]
  isFavorited: boolean
  isVisited: boolean
}

interface Props {
  restaurant: Restaurant
}

async function toggle(url: string): Promise<boolean | null> {
  try {
    const data = await csrfPost<{ favorited?: boolean; visited?: boolean }>(url)
    return data.favorited ?? data.visited ?? null
  } catch {
    return null
  }
}

export default function RestaurantSingle({ restaurant: r }: Props) {
  const [favorited, setFavorited] = useState(r.isFavorited)
  const [visited, setVisited] = useState(r.isVisited)

  const address = [r.street, r.city, r.postcode, r.country].filter(Boolean).join(', ')
  const gallery = r.gallery ?? [r.image]
  const primaryCuisine = r.cuisine?.split(',')[0].trim() ?? ''

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    const result = await toggle(`/restaurants/${r.id}/favorite`)
    if (result !== null) setFavorited(result)
  }

  const handleVisit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const result = await toggle(`/restaurants/${r.id}/visit`)
    if (result !== null) setVisited(result)
  }

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[52vw] min-h-65 max-h-95 lg:max-h-130">
        <img
          src={r.image}
          alt={r.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

        {/* Back */}
        <Link
          href="/restaurants"
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white lg:top-6 lg:left-6"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        {/* Nom + adresse + prix */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 lg:px-8 lg:pb-8 lg:max-w-4xl">
          <h1 className="font-title text-[26px] lg:text-[38px] font-semibold text-white leading-tight mb-1">
            {r.name}
          </h1>
          {address && (
            <p className="text-white/80 text-[13px] lg:text-[15px] mb-0.5">{address}</p>
          )}
          <p className="text-white/80 text-[13px] lg:text-[15px]">
            {r.maxPrice ? `~${r.maxPrice}€` : ''}
            {r.maxPrice && primaryCuisine ? ' · ' : ''}
            {primaryCuisine ? `Cuisine ${primaryCuisine.toLowerCase()}` : ''}
          </p>
        </div>
      </div>

      {/* ── WRAPPER CENTRÉ DESKTOP ── */}
      <div className="lg:max-w-3xl lg:mx-auto">

        {/* ── ACTIONS ── */}
        <div className="px-4 pt-8 pb-2 grid grid-cols-4 gap-2.5 lg:px-8 lg:gap-4">

          {/* Favori */}
          <button
            onClick={handleFavorite}
            className={[
              'flex flex-col items-center gap-2 py-3 lg:py-4 rounded-2xl border transition-colors',
              favorited ? 'border-red-200 bg-red-50 text-red-primary' : 'border-gray-100 bg-white text-gray-400',
            ].join(' ')}
          >
            <svg width="22" height="22" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[10px] lg:text-[11px] leading-tight text-center font-medium">Favori</span>
          </button>

          {/* Déjà visité */}
          <button
            onClick={handleVisit}
            className={[
              'flex flex-col items-center gap-2 py-3 lg:py-4 rounded-2xl border transition-colors',
              visited ? 'border-gray-200 bg-white text-gray-900' : 'border-gray-100 bg-white text-gray-400',
            ].join(' ')}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${visited ? 'bg-red-primary' : 'bg-gray-200'}`}>
              <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className={`text-[10px] lg:text-[11px] leading-tight text-center font-medium ${visited ? 'text-gray-900' : 'text-gray-400'}`}>
              Déjà visité
            </span>
          </button>

          {/* Enregistrer */}
          <button
            className="flex flex-col items-center gap-2 py-3 lg:py-4 rounded-2xl border border-gray-100 bg-white text-gray-400 transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[10px] lg:text-[11px] leading-tight text-center font-medium">Enregistrer</span>
          </button>

          {/* Mes notes */}
          <button
            className="flex flex-col items-center gap-2 py-3 lg:py-4 rounded-2xl border border-gray-100 bg-white text-gray-400 transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span className="text-[10px] lg:text-[11px] leading-tight text-center font-medium">Mes notes</span>
          </button>
        </div>

        {/* ── GALERIE BERSHKA-STYLE ── */}
        <div className="overflow-x-auto scrollbar-none mt-4">
          <div className="flex gap-0.5">
            {gallery.map((img, i) => (
              <div key={i} className="relative shrink-0 w-[42vw] max-w-52.5 h-[54vw] max-h-67.5 lg:w-52 lg:h-64">
                <img
                  src={img}
                  alt={`${r.name} ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {i === 0 && (
                  <button className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-black/40 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTENU ── */}
        <div className="px-5 pt-5 flex flex-col gap-5 lg:px-8 lg:pt-7 lg:gap-6">

          {/* Description */}
          <p className="text-[14px] lg:text-[15px] text-gray-700 leading-relaxed">
            {r.cuisine
              ? `Un restaurant spécialisé en cuisine ${primaryCuisine.toLowerCase()} proposant une expérience gastronomique unique dans un cadre soigné.`
              : 'Informations détaillées à venir.'}
          </p>

          {/* Equipement & services */}
          <div className="border-t border-gray-100 pt-5 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="text-[14px] font-medium text-gray-800 mb-1">Equipement et services</p>
              <p className="text-[13px] text-gray-400">—</p>
            </div>
            {r.lat && r.lng && (
              <div>
                <p className="text-[14px] font-medium text-gray-800 mb-1 mt-4 lg:mt-0">Localisation</p>
                <a
                  href={`https://maps.google.com/?q=${r.lat},${r.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-gray-500"
                >
                  Voir sur Maps
                </a>
              </div>
            )}
          </div>

          {/* Localisation */}
          <div className="border-t border-gray-100 pt-5 pb-4">
            <p className="text-[14px] font-medium text-gray-800 mb-2">Adresse</p>
            {address && (
              <p className="text-[13px] text-gray-500 leading-relaxed">{address}</p>
            )}
            {r.lat && r.lng && (
              <a
                href={`https://maps.google.com/?q=${r.lat},${r.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[12px] text-red-primary font-medium"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
                </svg>
                Ouvrir dans Google Maps
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
