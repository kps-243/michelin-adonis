import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  get initials() {
    if (this.firstName && this.lastName) {
      return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase()
    }
    const [part] = this.email.split('@')
    return part.slice(0, 2).toUpperCase()
  }
}
