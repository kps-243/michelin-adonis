import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['user', 'expert', 'influencer']).notNullable().defaultTo('user')
      table.string('bio', 500).nullable()
      table.string('avatar', 500).nullable()
      table.string('country', 100).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
      table.dropColumn('bio')
      table.dropColumn('avatar')
      table.dropColumn('country')
    })
  }
}
