import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import SearchBar from '~/components/SearchBar'
import SecondaryTitle from '~/components/SecondaryTitle'

interface SearchRestaurant {
  id: number
  name: string
  city: string | null
  country: string | null
  cuisine: string | null
  maxPrice: number | null
  image: string
}

interface SearchUser {
  id: number
  username: string
  firstName: string | null
  lastName: string | null
  role: 'influencer' | 'expert'
  avatar: string | null
  bio: string | null
  initials: string
}

interface Props {
  query: string
  restaurants: SearchRestaurant[]
  users: SearchUser[]
}

const ROLE_LABEL: Record<string, string> = {
  influencer: 'Influenceur',
  expert: 'Expert Michelin',
}

const ROLE_COLOR: Record<string, string> = {
  influencer: 'bg-blue-100 text-blue-700',
  expert: 'bg-red-100 text-red-primary',
}

export default function Search({ query, restaurants, users }: Props) {
  const [q, setQ] = useState(query)
  const total = restaurants.length + users.length

  const handleSearch = (val: string) => {
    router.visit(`/search?q=${encodeURIComponent(val)}`)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-24 transition-colors">
      <div className="px-4 pt-4 pb-4 lg:px-8 lg:max-w-3xl lg:mx-auto">
        <SearchBar
          placeholder="Restaurants, influenceurs, experts..."
          value={q}
          onChange={setQ}
          onSearch={handleSearch}
        />
      </div>

      {query && (
        <div className="px-4 pb-2 lg:px-8 lg:max-w-3xl lg:mx-auto">
          <p className="text-[12px] text-gray-400">
            {total} résultat{total !== 1 ? 's' : ''} pour « {query} »
          </p>
        </div>
      )}

      {/* No results */}
      {query && total === 0 && (
        <div className="flex flex-col items-center py-20 gap-3 text-center px-6">
          <p className="text-4xl">🔍</p>
          <p className="text-gray-500 text-[14px]">
            Aucun résultat pour « {query} »
          </p>
        </div>
      )}

      {/* Restaurants */}
      {restaurants.length > 0 && (
        <section className="px-4 pt-4 lg:px-8 lg:max-w-3xl lg:mx-auto">
          <SecondaryTitle className="mb-3" hidden>Restaurants</SecondaryTitle>
          <div className="flex flex-col gap-3">
            {restaurants.map((r) => (
              <Link
                key={r.id}
                href={`/restaurants/${r.id}`}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title text-[14px] font-semibold text-gray-900 dark:text-white truncate">{r.name}</p>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {[r.cuisine?.split(',')[0].trim(), r.city, r.country].filter(Boolean).join(' · ')}
                  </p>
                </div>
                {r.maxPrice && (
                  <span className="text-[12px] text-red-primary font-semibold shrink-0">~{r.maxPrice}€</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Influenceurs & Experts */}
      {users.length > 0 && (
        <section className="px-4 pt-6 lg:px-8 lg:max-w-3xl lg:mx-auto">
          <SecondaryTitle className="mb-3" hidden>Influenceurs & Experts</SecondaryTitle>
          <div className="flex flex-col gap-3">
            {users.map((u) => {
              const displayName = [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username
              return (
                <Link
                  key={u.id}
                  href={`/users/${u.id}`}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center overflow-hidden ${u.role === 'expert' ? 'bg-red-primary' : 'bg-gray-200 dark:bg-gray-600'}`}>
                    {u.avatar ? (
                      <img src={u.avatar} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className={`text-[15px] font-semibold ${u.role === 'expert' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                        {u.initials}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-title text-[14px] font-semibold text-gray-900 dark:text-white truncate">{displayName}</p>
                      <VerifiedBadge />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {u.bio?.slice(0, 60) || ROLE_LABEL[u.role]}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${ROLE_COLOR[u.role]}`}>
                    {ROLE_LABEL[u.role]}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function VerifiedBadge() {
  return (
    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
      <svg width="8" height="8" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  )
}
