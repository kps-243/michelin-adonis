import type { HttpContext } from '@adonisjs/core/http'
import { getSocialFeed, getFeatured } from '#services/restaurant_service'

export default class PourToiController {
  async index({ inertia }: HttpContext) {
    const { socialImages, featured } = getSocialFeed()
    const { threeStars, twoStars } = getFeatured()
    return inertia.render('PourToi', { socialImages, featured, spotlight: [...threeStars, ...twoStars] })
  }
}
