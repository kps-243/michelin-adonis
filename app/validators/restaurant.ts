import vine from '@vinejs/vine'

export const restaurantValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    michelinStar: vine.enum(['THREE', 'TWO', 'ONE'] as const).nullable().optional(),
    street: vine.string().trim().maxLength(255),
    postcode: vine.string().trim().maxLength(20),
    city: vine.string().trim().maxLength(100),
    country: vine.string().trim().maxLength(100),
    codePostal: vine.number().withoutDecimals().positive(),
    maxPrice: vine.number().positive(),
    cuisine: vine.string().trim().maxLength(100),
    lat: vine.number().min(-90).max(90),
    lng: vine.number().min(-180).max(180),
  })
)
