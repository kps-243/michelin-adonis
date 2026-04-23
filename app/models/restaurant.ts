import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Image from '#models/image'
import { DateTime } from 'luxon'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare michelinStar: 'THREE' | 'TWO' | 'ONE' | null

  @column()
  declare street: string

  @column()
  declare postcode: string

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare codePostal: number

  @column()
  declare maxPrice: number

  @column()
  declare cuisine: string

  @column()
  declare lat: number

  @column()
  declare lng: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Image)
  declare images: HasMany<typeof Image>
}
