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