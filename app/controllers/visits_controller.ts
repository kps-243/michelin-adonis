import type { HttpContext } from '@adonisjs/core/http'
import RestaurantVisit from '#models/restaurant_visit'

export default class VisitsController {
  async toggle({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const restaurantId = Number(params.id)

    const existing = await RestaurantVisit.query()
      .where('user_id', user.id)
      .where('restaurant_id', restaurantId)
      .first()

    if (existing) {
      await existing.delete()
      return response.json({ visited: false })
    }

    await RestaurantVisit.create({ userId: user.id, restaurantId })
    return response.json({ visited: true })
  }
}
