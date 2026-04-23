import type { HttpContext } from '@adonisjs/core/http'
import Restaurant from '#models/restaurant'
import { restaurantValidator } from '#validators/restaurant'

function toPlain(r: Restaurant) {
  return {
    id: r.id,
    name: r.name,
    michelinStar: r.michelinStar,
    street: r.street,
    postcode: r.postcode,
    city: r.city,
    country: r.country,
    codePostal: r.codePostal,
    maxPrice: r.maxPrice,
    cuisine: r.cuisine,
    lat: r.lat,
    lng: r.lng,
    createdAt: r.createdAt?.toISO() ?? null,
    updatedAt: r.updatedAt?.toISO() ?? null,
  }
}

const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

export default class AdminRestaurantsController {
  async index({ inertia }: HttpContext) {
    const restaurants = await Restaurant.all()
    return render(inertia, 'admin/restaurant/index', { restaurants: restaurants.map(toPlain) })
  }

  async create({ inertia }: HttpContext) {
    return render(inertia, 'admin/restaurant/edit', { restaurant: null })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(restaurantValidator)
    await Restaurant.create(payload)
    session.flash('success', 'Restaurant créé avec succès')
    return response.redirect('/admin/restaurants')
  }

  async show({ params, inertia }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    return render(inertia, 'admin/restaurant/single', { restaurant: toPlain(restaurant) })
  }

  async edit({ params, inertia }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    return render(inertia, 'admin/restaurant/edit', { restaurant: toPlain(restaurant) })
  }

  async update({ params, request, response, session }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    const payload = await request.validateUsing(restaurantValidator)
    await restaurant.merge(payload).save()
    session.flash('success', 'Restaurant mis à jour avec succès')
    return response.redirect(`/admin/restaurants/${params.id}`)
  }

  async destroy({ params, response, session }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    await restaurant.delete()
    session.flash('success', 'Restaurant supprimé')
    return response.redirect('/admin/restaurants')
  }
}
