import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'swiped_restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('restaurant_id').unsigned().references('id').inTable('restaurants').onDelete('CASCADE')
      table.boolean('matched').notNullable().defaultTo(false)

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'restaurant_id'])
      table.index(['user_id'], 'idx_swiped_user')
      table.index(['restaurant_id'], 'idx_swiped_restaurant')
      table.index(['matched'], 'idx_swiped_matched')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}