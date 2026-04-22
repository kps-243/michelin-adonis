import type { HttpContext } from '@adonisjs/core/http'
import Restaurant from '#models/restaurant'
import { restaurantValidator } from '#validators/restaurant'

export default class RestaurantsController {
  async index({ inertia }: HttpContext) {
    const restaurants = await Restaurant.all()
    return inertia.render('restaurant/index', { restaurants })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('restaurant/edit', { restaurant: null })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(restaurantValidator)
    await Restaurant.create(payload)
    session.flash('success', 'Restaurant créé avec succès')
    return response.redirect().toRoute('restaurants.index')
  }

  async show({ params, inertia }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    return inertia.render('restaurant/single', { restaurant })
  }

  async edit({ params, inertia }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    return inertia.render('restaurant/edit', { restaurant })
  }

  async update({ params, request, response, session }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    const payload = await request.validateUsing(restaurantValidator)
    await restaurant.merge(payload).save()
    session.flash('success', 'Restaurant mis à jour avec succès')
    return response.redirect().toRoute('restaurants.show', { id: params.id })
  }

  async destroy({ params, response, session }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    await restaurant.delete()
    session.flash('success', 'Restaurant supprimé')
    return response.redirect().toRoute('restaurants.index')
  }
}
