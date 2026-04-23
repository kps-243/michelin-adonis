import { Link, router } from '@inertiajs/react'
import BottomNav from '../../components/NavBar'

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

function starBadge(star: Restaurant['michelinStar']) {
  if (star === 'THREE') return '⭐⭐⭐'
  if (star === 'TWO') return '⭐⭐'
  if (star === 'ONE') return '⭐'
  return null
}

export default function RestaurantIndex({ restaurants }: Props) {
  const handleDelete = (id: number, name: string) => {
    if (confirm(`Supprimer "${name}" ?`)) {
      router.delete(`/restaurants/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-[26px] font-semibold leading-tight">Restaurants</h1>
          <p className="text-[11px] text-gray-400 tracking-wide">{restaurants.length} établissement{restaurants.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/restaurants/create"
          className="bg-[#E4002B] text-white text-[11px] font-medium px-4 py-2 rounded-full tracking-wider hover:bg-[#c4001e] transition-colors"
        >
          + Ajouter
        </Link>
      </header>

      <div className="px-5 py-4 flex flex-col gap-3">
        {restaurants.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🍽</div>
            <p className="font-cormorant text-2xl text-gray-400 mb-1">Aucun restaurant</p>
            <p className="text-[13px] text-gray-400 mb-6">Commencez par en ajouter un</p>
            <Link
              href="/restaurants/create"
              className="inline-block bg-[#E4002B] text-white text-xs font-medium px-6 py-3 rounded-full tracking-wider"
            >
              Créer un restaurant
            </Link>
          </div>
        ) : (
          restaurants.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-4 shadow-[0_1px_8px_rgba(0,0,0,0.06)] flex items-center gap-4"
            >
              {/* Star indicator */}
              <div className="w-10 h-10 rounded-full bg-[#FAF8F4] flex items-center justify-center text-base flex-shrink-0">
                {starBadge(r.michelinStar) ?? '🍽'}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-cormorant text-[16px] font-semibold leading-tight truncate">{r.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {r.cuisine} · {r.city}, {r.country}
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="font-cormorant text-[14px] font-semibold text-[#E4002B] mr-1">
                  {r.maxPrice}€
                </span>
                <Link
                  href={`/restaurants/${r.id}`}
                  className="text-[11px] text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#1A1A1A] transition-colors"
                >
                  Voir
                </Link>
                <Link
                  href={`/restaurants/${r.id}/edit`}
                  className="text-[11px] text-[#E4002B] border border-[#E4002B]/40 px-3 py-1.5 rounded-full hover:border-[#E4002B] transition-colors"
                >
                  Éditer
                </Link>
                <button
                  onClick={() => handleDelete(r.id, r.name)}
                  className="text-[11px] text-gray-400 border border-gray-200 px-2 py-1.5 rounded-full hover:text-[#E4002B] hover:border-red-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav active="home" />
    </div>
  )
}
