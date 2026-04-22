import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    const users = [
      { fullName: 'Alice Dupont', email: 'alice.dupont@example.com', password: 'password123' },
      { fullName: 'Bob Martin', email: 'bob.martin@example.com', password: 'password123' },
      { fullName: 'Claire Bernard', email: 'claire.bernard@example.com', password: 'password123' },
    ]

    for (const user of users) {
      await User.updateOrCreate({ email: user.email }, user)
    }
  }
}
