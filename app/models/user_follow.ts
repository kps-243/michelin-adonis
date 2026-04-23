import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from '#models/user'

export default class UserFollow extends BaseModel {
  static table = 'user_follows'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare followerId: number

  @column()
  declare followedId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, { foreignKey: 'followedId' })
  declare followed: BelongsTo<typeof User>
}
