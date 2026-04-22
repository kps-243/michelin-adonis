import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('michelin_star', ['ONE', 'TWO', 'THREE'], {
        useNative: true,
        enumName: 'michelin_star_enum',
        existingType: false,
      }).nullable()
      table.string('street', 255).nullable()
      table.string('postcode', 20).nullable()
      table.string('city', 255).nullable()
      table.string('country', 255).nullable()
      table.integer('code_postal').nullable()
      table.decimal('max_price', 10, 2).nullable()
      table.string('cuisine', 255).nullable()
      table.decimal('lat', 10, 7).nullable()
      table.decimal('lng', 10, 7).nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['city'], 'idx_restaurant_city')
      table.index(['cuisine'], 'idx_restaurant_cuisine')
      table.index(['michelin_star'], 'idx_restaurant_star')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS michelin_star_enum')
  }
}