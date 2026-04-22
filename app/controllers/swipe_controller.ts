import type { HttpContext } from '@adonisjs/core/http'
import { getSwipeCards } from '#services/restaurant_service'

export default class SwipeController {
  async index({ inertia }: HttpContext) {
    const cards = getSwipeCards(40)
    return inertia.render('Swipe', { cards })
  }
}
