import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Restaurant from '#models/restaurant'

export default class RestaurantVisit extends BaseModel {
  static table = 'restaurant_visits'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare restaurantId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>
}
