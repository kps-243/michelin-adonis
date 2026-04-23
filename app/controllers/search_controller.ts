import type { HttpContext } from '@adonisjs/core/http'
import Restaurant from '#models/restaurant'
import User from '#models/user'

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

export default class SearchController {
  async index({ inertia, request }: HttpContext) {
    const term = request.input('q', '').trim()

    if (!term) {
      return render(inertia, 'Search', { query: '', restaurants: [], users: [] })
    }

    const like = `%${term}%`

    const [restaurants, users] = await Promise.all([
      Restaurant.query()
        .where((q) => {
          q.where('name', 'ilike', like)
            .orWhere('city', 'ilike', like)
            .orWhere('cuisine', 'ilike', like)
        })
        .preload('images')
        .limit(8),
      User.query()
        .whereIn('role', ['influencer', 'expert'])
        .where((q) => {
          q.where('username', 'ilike', like)
            .orWhereRaw('first_name ILIKE ?', [like])
            .orWhereRaw('last_name ILIKE ?', [like])
        })
        .limit(6),
    ])

    return render(inertia, 'Search', {
      query: term,
      restaurants: restaurants.map((r) => ({
        id: r.id,
        name: r.name,
        city: r.city,
        country: r.country,
        cuisine: r.cuisine,
        maxPrice: r.maxPrice,
        image: r.images?.[0]?.url ?? DEFAULT_IMG,
      })),
      users: users.map((u) => ({
        id: u.id,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role,
        avatar: u.avatar,
        bio: u.bio,
        initials: u.initials,
      })),
    })
  }
}
