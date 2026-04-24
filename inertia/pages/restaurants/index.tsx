import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { csrfPost } from '~/utils/api'
import { MichelinStars } from '~/components/MichelinStar'
import NewSection from '~/components/NewSection'
import SearchBar from '~/components/SearchBar'
import PrimaryTitle from '~/components/PrimaryTitle'
import MapSwitch from '~/components/MapSwitch'

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
  isFavorited: boolean
}

interface Props {
  restaurants: RestaurantItem[]
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80'

type StarFilter = 'ALL' | 'THREE' | 'TWO' | 'ONE' | 'BIB'

const FILTER_CHIPS: { key: StarFilter; label: React.ReactNode }[] = [
  { key: 'ALL', label: 'Tous' },
  { key: 'THREE', label: <MichelinStars count={3} size={11} /> },
  { key: 'TWO', label: <MichelinStars count={2} size={11} /> },
  { key: 'ONE', label: <MichelinStars count={1} size={11} /> },
  { key: 'BIB', label: '🍽 Bib Gourmand' },
]

function matchesFilter(r: RestaurantItem, filter: StarFilter): boolean {
  if (filter === 'ALL') return true
  if (filter === 'BIB') return r.michelinStar === null && (r.maxPrice === null || r.maxPrice <= 40)
  return r.michelinStar === filter
}

export default function RestaurantsIndex({ restaurants }: Props) {
  const [query, setQuery] = useState('')
  const [starFilter, setStarFilter] = useState<StarFilter>('ALL')
  const [favMap, setFavMap] = useState<Record<number, boolean>>(
    Object.fromEntries(restaurants.map((r) => [r.id, r.isFavorited]))
  )

  const filtered = restaurants.filter(
    (r) =>
      matchesFilter(r, starFilter) &&
      (!query.trim() ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.city?.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine?.toLowerCase().includes(query.toLowerCase()))
  )

  const handleChange = (val: string) => setQuery(val)

  const toggleFavorite = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    try {
      const data = await csrfPost<{ favorited: boolean }>(`/restaurants/${id}/favorite`)
      setFavMap((prev) => ({ ...prev, [id]: data.favorited }))
    } catch {
      setFavMap((prev) => ({ ...prev, [id]: !prev[id] }))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-24 transition-colors">

      {/* Hero */}
      <div className="px-4 pt-4 lg:px-8 lg:pt-6 lg:max-w-6xl lg:mx-auto">
        <NewSection image={restaurants[0]?.image ?? HERO_IMAGE} />
      </div>

      {/* Title + Search */}
      <div className="px-4 pt-6 pb-4 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <PrimaryTitle>Restaurants</PrimaryTitle>
        <div className="mt-5">
          <SearchBar
            placeholder="Nom, cuisine ou ville..."
            value={query}
            onChange={handleChange}
            onSearch={handleChange}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-4 pb-4 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setStarFilter(chip.key)}
              className={[
                'shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold border transition-colors whitespace-nowrap',
                starFilter === chip.key
                  ? chip.key === 'BIB'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-red-primary text-white border-red-primary'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700',
              ].join(' ')}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 flex flex-col gap-4 lg:px-8 lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-5">
        {filtered.map((r) => (
          <RestaurantCard
            key={r.id}
            r={r}
            isFavorited={favMap[r.id] ?? false}
            onFavorite={toggleFavorite}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center py-16 text-gray-400 text-[14px]">
            Aucun restaurant trouvé
          </p>
        )}
      </div>

      <MapSwitch isMapView={false} />

    </div>
  )
}

function RestaurantCard({
  r,
  isFavorited,
  onFavorite,
}: {
  r: RestaurantItem
  isFavorited: boolean
  onFavorite: (e: React.MouseEvent, id: number) => void
}) {
  const address = [r.city, r.country].filter(Boolean).join(', ')
  const primaryCuisine = r.cuisine?.split(',')[0].trim() ?? ''
  const isBib = r.michelinStar === null && (r.maxPrice === null || r.maxPrice <= 40)

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

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

      {/* Top-right: Bib tag + favorite */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isBib && (
          <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Bib
          </span>
        )}
        <button
          aria-label="Sauvegarder"
          className={`w-8 h-8 flex items-center justify-center transition-colors ${isFavorited ? 'text-red-400' : 'text-white/70'}`}
          onClick={(e) => onFavorite(e, r.id)}
        >
          <svg width="18" height="18" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Bottom content */}
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

        <div className="flex items-center justify-start">
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
        </div>
      </div>
    </Link>
  )
}
