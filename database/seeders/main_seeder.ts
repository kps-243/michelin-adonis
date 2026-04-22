import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MainSeeder extends BaseSeeder {
  async run() {
    const { default: UserSeeder } = await import('./user_seeder.js')
    const { default: RestaurantSeeder } = await import('./restaurant_seeder.js')

    await new UserSeeder(this.client).run()
    await new RestaurantSeeder(this.client).run()
  }
}
