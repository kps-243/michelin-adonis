import type { Restaurant } from '../../app/services/restaurant_service'

interface Props {
  restaurant: Restaurant
}

function starsHtml(n: number) {
  return '⭐'.repeat(n)
}

export default function RestaurantCard({ restaurant: r }: Props) {
  return (
    <a
      href={r.michelinUrl}
      target="_blank"
      rel="noreferrer"
      className="flex-shrink-0 w-[220px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.13)] cursor-pointer block"
    >
      <img
        src={r.image}
        alt={r.name}
        className="w-full h-[140px] object-cover bg-gray-100"
        loading="lazy"
      />
      <div className="p-3">
        {/* Award */}
        <div className="flex items-center gap-1 mb-1.5">
          {r.stars > 0 ? (
            <>
              <span className="text-[#E4002B] text-xs">{starsHtml(r.stars)}</span>
              <span className="text-[10px] tracking-wider text-gray-500 uppercase">
                {r.stars} Étoile{r.stars > 1 ? 's' : ''}
              </span>
            </>
          ) : r.isBib ? (
            <>
              <span className="text-sm">🍽</span>
              <span className="text-[10px] tracking-wider text-gray-500 uppercase">Bib Gourmand</span>
            </>
          ) : (
            <span className="text-[10px] tracking-wider text-gray-500 uppercase">Sélectionné</span>
          )}
        </div>

        <div className="font-cormorant text-base font-semibold leading-tight mb-1">{r.name}</div>
        <div className="text-[11px] text-gray-500 mb-2">{r.cuisine}</div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            📍 {r.location.split(',').slice(-1)[0].trim()}
          </span>
          <span className="font-cormorant text-[13px] text-[#E4002B] font-semibold">{r.price}</span>
        </div>
      </div>
    </a>
  )
}
