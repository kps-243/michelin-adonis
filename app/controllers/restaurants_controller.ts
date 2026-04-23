import type { HttpContext } from '@adonisjs/core/http'
import Restaurant from '#models/restaurant'
import RestaurantFavorite from '#models/restaurant_favorite'
import RestaurantVisit from '#models/restaurant_visit'

const CUISINE_IMAGES: Record<string, string> = {
  french: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  japanese: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
  italian: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  spanish: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=600&q=80',
  seafood: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80',
  vegetarian: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  creative: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80',
]

function getCuisineImage(cuisine: string | null): string {
  if (!cuisine) return DEFAULT_IMAGE
  const lower = cuisine.toLowerCase()
  for (const [key, url] of Object.entries(CUISINE_IMAGES)) {
    if (lower.includes(key)) return url
  }
  return DEFAULT_IMAGE
}

function buildGallery(r: Restaurant, dbImages: string[]): string[] {
  const primary = getCuisineImage(r.cuisine)
  const base = dbImages.length > 0 ? dbImages : [primary]
  if (base.length >= 6) return base.slice(0, 6)

  const offset = r.id % GALLERY_POOL.length
  const rotated = [...GALLERY_POOL.slice(offset), ...GALLERY_POOL.slice(0, offset)]
  const supplements = rotated.filter((img) => !base.includes(img))

  return [...base, ...supplements].slice(0, 6)
}

function toPlain(r: Restaurant, favIds: Set<number> = new Set()) {
  const imageUrl = (r.images ?? []).length > 0 ? r.images[0].url : getCuisineImage(r.cuisine)
  return {
    id: r.id,
    name: r.name,
    michelinStar: r.michelinStar,
    street: r.street,
    postcode: r.postcode,
    city: r.city,
    country: r.country,
    maxPrice: r.maxPrice,
    cuisine: r.cuisine,
    lat: r.lat,
    lng: r.lng,
    image: imageUrl,
    isFavorited: favIds.has(r.id),
  }
}

function toPlainDetail(r: Restaurant, isFavorited: boolean, isVisited: boolean) {
  const dbImages = (r.images ?? []).map((img) => img.url)
  const gallery = buildGallery(r, dbImages)
  return {
    id: r.id,
    name: r.name,
    michelinStar: r.michelinStar,
    street: r.street,
    postcode: r.postcode,
    city: r.city,
    country: r.country,
    maxPrice: r.maxPrice,
    cuisine: r.cuisine,
    lat: r.lat,
    lng: r.lng,
    image: gallery[0],
    gallery,
    isFavorited,
    isVisited,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

export default class RestaurantsController {
  async index({ inertia, auth }: HttpContext) {
    const restaurants = await Restaurant.query().preload('images').orderBy('name', 'asc')

    let favIds = new Set<number>()
    try {
      await auth.check()
      if (auth.user) {
        const favs = await RestaurantFavorite.query().where('user_id', auth.user.id).select('restaurant_id')
        favIds = new Set(favs.map((f) => f.restaurantId))
      }
    } catch {}

    return render(inertia, 'restaurants/index', { restaurants: restaurants.map((r) => toPlain(r, favIds)) })
  }

  async show({ params, inertia, auth }: HttpContext) {
    const restaurant = await Restaurant.query()
      .preload('images')
      .where('id', params.id)
      .firstOrFail()

    let isFavorited = false
    let isVisited = false
    try {
      await auth.check()
      if (auth.user) {
        const [fav, visit] = await Promise.all([
          RestaurantFavorite.query()
            .where('user_id', auth.user.id)
            .where('restaurant_id', restaurant.id)
            .first(),
          RestaurantVisit.query()
            .where('user_id', auth.user.id)
            .where('restaurant_id', restaurant.id)
            .first(),
        ])
        isFavorited = !!fav
        isVisited = !!visit
      }
    } catch {}

    return render(inertia, 'restaurants/single', {
      restaurant: toPlainDetail(restaurant, isFavorited, isVisited),
    })
  }
}
