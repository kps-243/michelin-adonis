import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    const users = [
      { firstName: 'Alice', lastName: 'Dupont', username: 'alice.dupont', email: 'alice.dupont@example.com', password: 'password123' },
      { firstName: 'Bob', lastName: 'Martin', username: 'bob.martin', email: 'bob.martin@example.com', password: 'password123' },
      { firstName: 'Claire', lastName: 'Bernard', username: 'claire.bernard', email: 'claire.bernard@example.com', password: 'password123' },
    ]

    for (const user of users) {
      await User.updateOrCreate({ email: user.email }, user)
    }
  }
}
