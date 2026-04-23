/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import Restaurant from '#models/restaurant'
import router from '@adonisjs/core/services/router'

//router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

const HomeController = () => import('#controllers/home_controller')
const SwipeController = () => import('#controllers/swipe_controller')
const PourToiController = () => import('#controllers/pour_toi_controller')

router.get('/', [HomeController, 'index']).as('home')
router.get('/decouverte', [SwipeController, 'index']).as('Swipe')
router.get('/pour-toi', [PourToiController, 'index']).as('PourToi')
router
  .get('/map', async ({ inertia }) => {
    const restaurants = await Restaurant.query()
      .whereNotNull('lat')
      .whereNotNull('lng')
      .select(['id', 'name', 'lat', 'lng'])

    return (inertia as any).render('Map', {
      restaurants: restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        lat: Number(restaurant.lat),
        lng: Number(restaurant.lng),
      })),
    })
  })
  .as('map')

// Search
const SearchController = () => import('#controllers/search_controller')
router.get('/search', [SearchController, 'index']).as('search')

// Public profiles (influencers & experts)
const PublicProfilesController = () => import('#controllers/public_profiles_controller')
router.get('/users/:id', [PublicProfilesController, 'show']).as('users.show')

// Public restaurant pages
const RestaurantsController = () => import('#controllers/restaurants_controller')
router.get('/restaurants', [RestaurantsController, 'index']).as('restaurants.index')
router.get('/restaurants/:id', [RestaurantsController, 'show']).as('restaurants.show')

// Admin CRUD
const AdminRestaurantsController = () => import('#controllers/admin_restaurants_controller')
router
  .group(() => {
    router.resource('restaurants', AdminRestaurantsController)
  })
  .prefix('/admin')
  .as('admin')

const ProfileController = () => import('#controllers/profile_controller')
router
  .group(() => {
    router.get('/profile', [ProfileController, 'show']).as('profile.show')
    router.get('/profile/edit', [ProfileController, 'edit']).as('profile.edit')
    router.put('/profile', [ProfileController, 'update']).as('profile.update')
  })
  .use(middleware.auth())