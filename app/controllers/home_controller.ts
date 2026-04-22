import type { HttpContext } from '@adonisjs/core/http'
import { getFeatured, getStats } from '#services/restaurant_service'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    const featured = getFeatured()
    const stats = getStats()
    return inertia.render('home', { featured, stats })
  }
}
