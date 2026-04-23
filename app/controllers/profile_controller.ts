import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'
import UserFollow from '#models/user_follow'
import RestaurantFavorite from '#models/restaurant_favorite'
import RestaurantVisit from '#models/restaurant_visit'

const profileValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1).maxLength(100).optional(),
    lastName: vine.string().trim().minLength(1).maxLength(100).optional(),
    username: vine.string().trim().minLength(2).maxLength(50),
    bio: vine.string().trim().maxLength(500).optional(),
    avatar: vine.string().trim().url().optional(),
    country: vine.string().trim().maxLength(100).optional(),
    role: vine.enum(['user', 'expert', 'influencer'] as const),
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

function toPlain(user: InstanceType<typeof User>) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role ?? 'user',
    bio: user.bio,
    avatar: user.avatar,
    country: user.country,
    initials: user.initials,
  }
}

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
]

function restaurantImage(r: { id: number; images?: { url: string }[] }) {
  if (r.images && r.images.length > 0) return r.images[0].url
  return GALLERY_POOL[r.id % GALLERY_POOL.length]
}

export default class ProfileController {
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const [follows, favorites, visits] = await Promise.all([
      UserFollow.query()
        .where('follower_id', user.id)
        .preload('followed'),
      RestaurantFavorite.query()
        .where('user_id', user.id)
        .preload('restaurant', (q) => q.preload('images')),
      RestaurantVisit.query()
        .where('user_id', user.id)
        .preload('restaurant', (q) => q.preload('images')),
    ])

    const followedUsers = follows.map((f) => ({
      id: f.followed.id,
      username: f.followed.username,
      firstName: f.followed.firstName,
      lastName: f.followed.lastName,
      role: f.followed.role,
      avatar: f.followed.avatar,
      initials: f.followed.initials,
    }))

    const favoriteRestaurants = favorites.map((fav) => ({
      id: fav.restaurant.id,
      name: fav.restaurant.name,
      city: fav.restaurant.city,
      country: fav.restaurant.country,
      image: restaurantImage({ id: fav.restaurant.id, images: fav.restaurant.images }),
    }))

    const visitedRestaurants = visits.map((v) => ({
      id: v.restaurant.id,
      name: v.restaurant.name,
      city: v.restaurant.city,
      country: v.restaurant.country,
      michelinStar: v.restaurant.michelinStar,
      image: restaurantImage({ id: v.restaurant.id, images: v.restaurant.images }),
    }))

    return render(inertia, 'Profile', {
      user: toPlain(user),
      followedUsers,
      favoriteRestaurants,
      visitedRestaurants,
    })
  }

  async edit({ inertia, auth }: HttpContext) {
    const user = auth.user!
    return render(inertia, 'profile/edit', { user: toPlain(user) })
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(profileValidator)
    await user.merge(payload).save()
    session.flash('success', 'Profil mis à jour avec succès')
    return response.redirect().toRoute('profile.show')
  }
}
