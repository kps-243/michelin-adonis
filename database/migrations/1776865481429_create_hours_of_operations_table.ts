import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hours_of_operation'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.time('opens').nullable()
      table.time('closes').nullable()
      table.integer('day').notNullable().checkBetween([0, 6]) // 0=Lundi, 6=Dimanche
      table.boolean('closed').notNullable().defaultTo(false)
      table.integer('restaurant_id').unsigned().references('id').inTable('restaurants').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['restaurant_id'], 'idx_hours_restaurant')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}