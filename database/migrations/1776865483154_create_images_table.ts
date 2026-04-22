import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('url').notNullable()
      table.string('copyright', 255).nullable()
      table.string('topic', 255).nullable()
      table.integer('restaurant_id').unsigned().references('id').inTable('restaurants').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['restaurant_id'], 'idx_image_restaurant')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}