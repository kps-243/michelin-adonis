import { Link } from '@inertiajs/react'
import { useState } from 'react'
import NewSection from '~/components/NewSection'
import SearchBar from '~/components/SearchBar'
import PrimaryTitle from '~/components/PrimaryTitle'

interface RestaurantItem {
  id: number
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  street: string | null
  city: string | null
  country: string | null
  maxPrice: number | null
  cuisine: string | null
  image: string
}

interface Props {
  restaurants: RestaurantItem[]
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80'

export default function RestaurantsIndex({ restaurants }: Props) {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(restaurants)

  const handleSearch = (q: string) => {
    const lower = q.toLowerCase()
    setFiltered(
      restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(lower) ||
          r.city?.toLowerCase().includes(lower) ||
          r.cuisine?.toLowerCase().includes(lower)
      )
    )
  }

  const handleChange = (val: string) => {
    setQuery(val)
    if (!val.trim()) setFiltered(restaurants)
  }

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* Hero */}
      <div className="px-4 pt-4 lg:px-8 lg:pt-6 lg:max-w-6xl lg:mx-auto">
        <NewSection image={restaurants[0]?.image ?? HERO_IMAGE} />
      </div>

      {/* Title + Search */}
      <div className="px-4 pt-6 pb-4 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <PrimaryTitle>Restaurants</PrimaryTitle>
        <div className="mt-5">
          <SearchBar
            placeholder="Destination ou nom de l'hôtel ..."
            value={query}
            onChange={handleChange}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 flex flex-col gap-4 lg:px-8 lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-5">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center py-16 text-gray-400 text-[14px]">
            Aucun restaurant trouvé
          </p>
        )}
      </div>

    </div>
  )
}

function RestaurantCard({ r }: { r: RestaurantItem }) {
  const address = [r.street, r.city, r.country].filter(Boolean).join(', ')
  const primaryCuisine = r.cuisine?.split(',')[0].trim() ?? ''

  return (
    <Link
      href={`/restaurants/${r.id}`}
      className="block relative rounded-2xl overflow-hidden h-64 lg:h-72 shadow-[0_2px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.16)] transition-shadow"
    >
      {/* Image */}
      <img
        src={r.image}
        alt={r.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay — assombri pour lisibilité du texte */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

      {/* Top-right : checkmark + bookmark */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className="w-8 h-8 rounded-full bg-red-primary flex items-center justify-center shadow-md">
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <button
          aria-label="Sauvegarder"
          className="w-8 h-8 flex items-center justify-center text-white/70"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Bottom content — tout sur l'image */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5">
        <p className="font-title text-[17px] font-semibold text-white leading-snug line-clamp-1 mb-0.5">
          {r.name}
        </p>
        {address && (
          <p className="text-[12px] text-white/75 truncate mb-0.5">{address}</p>
        )}
        <p className="text-[12px] text-white/75 mb-3">
          {r.maxPrice ? `~${r.maxPrice}€` : ''}
          {r.maxPrice && primaryCuisine ? ' • ' : ''}
          {primaryCuisine}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gray-400 border-[1.5px] border-white/50" />
            <div className="w-7 h-7 rounded-full bg-gray-500 border-[1.5px] border-white/50 -ml-2.5" />
            <button
              className="w-7 h-7 rounded-full bg-white/20 border border-white/30 text-white text-sm leading-none flex items-center justify-center -ml-2.5"
              onClick={(e) => e.preventDefault()}
            >
              +
            </button>
          </div>

          <button
            aria-label="Voir sur la carte"
            className="w-11 h-11 rounded-full bg-red-primary flex items-center justify-center text-white shadow-lg"
            onClick={(e) => e.preventDefault()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
