import { Link, router } from '@inertiajs/react'
import SecondaryTitle from '~/components/SecondaryTitle'

interface Restaurant {
  id: number
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  city: string
  country: string
  cuisine: string
  maxPrice: number
}

interface Props {
  restaurants: Restaurant[]
}

function starLabel(star: Restaurant['michelinStar']) {
  if (star === 'THREE') return { text: '⭐⭐⭐', cls: 'bg-amber-50 text-amber-700' }
  if (star === 'TWO') return { text: '⭐⭐', cls: 'bg-amber-50 text-amber-700' }
  if (star === 'ONE') return { text: '⭐', cls: 'bg-amber-50 text-amber-700' }
  return null
}

export default function AdminRestaurantIndex({ restaurants }: Props) {
  const handleDelete = (id: number, name: string) => {
    if (confirm(`Supprimer "${name}" ?`)) {
      router.delete(`/admin/restaurants/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] pb-24">

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-5 py-4 flex items-center justify-between lg:max-w-5xl lg:mx-auto lg:px-8 lg:py-5">
          <div>
            <SecondaryTitle hidden>Administration</SecondaryTitle>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {restaurants.length} établissement{restaurants.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin/restaurants/create"
            className="bg-red-primary text-white text-[12px] font-semibold px-5 py-2 rounded-full flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Ajouter
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5 lg:max-w-5xl lg:mx-auto lg:px-8">
        {restaurants.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm flex flex-col items-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EFEFEF] flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-400">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </div>
            <p className="font-title text-[18px] font-semibold text-gray-700 mb-1">Aucun restaurant</p>
            <p className="text-[13px] text-gray-400 mb-6">Commencez par en ajouter un</p>
            <Link
              href="/admin/restaurants/create"
              className="bg-red-primary text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Créer un restaurant
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {restaurants.map((r) => {
              const star = starLabel(r.michelinStar)
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center gap-4"
                >
                  {/* Star badge */}
                  <div className="w-11 h-11 rounded-full bg-[#EFEFEF] flex items-center justify-center shrink-0 text-[15px]">
                    {star ? star.text[0] + '⭐' : '🍽'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-title text-[15px] font-semibold text-gray-900 truncate">{r.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {r.cuisine} · {r.city}, {r.country}
                    </p>
                    {star && (
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${star.cls}`}>
                        {star.text}
                      </span>
                    )}
                  </div>

                  {/* Price + actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-title text-[15px] font-semibold text-red-primary">{r.maxPrice}€</span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/restaurants/${r.id}`}
                        className="text-[11px] text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full hover:border-gray-400 transition-colors"
                      >
                        Voir
                      </Link>
                      <Link
                        href={`/admin/restaurants/${r.id}/edit`}
                        className="text-[11px] text-red-primary border border-red-primary/30 px-2.5 py-1 rounded-full hover:border-red-primary transition-colors"
                      >
                        Éditer
                      </Link>
                      <button
                        onClick={() => handleDelete(r.id, r.name)}
                        className="text-[11px] text-gray-400 border border-gray-200 w-7 h-7 rounded-full flex items-center justify-center hover:text-red-primary hover:border-red-200 transition-colors"
                      >
                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
