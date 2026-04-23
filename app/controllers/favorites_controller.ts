import type { HttpContext } from '@adonisjs/core/http'
import RestaurantFavorite from '#models/restaurant_favorite'

export default class FavoritesController {
  async toggle({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const restaurantId = Number(params.id)

    const existing = await RestaurantFavorite.query()
      .where('user_id', user.id)
      .where('restaurant_id', restaurantId)
      .first()

    if (existing) {
      await existing.delete()
      return response.json({ favorited: false })
    }

    await RestaurantFavorite.create({ userId: user.id, restaurantId })
    return response.json({ favorited: true })
  }
}
