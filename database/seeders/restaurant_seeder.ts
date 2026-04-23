import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Restaurant from '#models/restaurant'
import Image from '#models/image'
import HoursOfOperation from '#models/hours_of_operation'
import fs from 'node:fs'
import readline from 'node:readline'
import path from 'node:path'

export default class RestaurantSeeder extends BaseSeeder {
  async run() {
    const filePath = path.join(process.cwd(), 'data/all_restaurants.jsonl')
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Fichier non trouvé : ${filePath}`)
      return
    }

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Number.POSITIVE_INFINITY,
    })

    console.log('Début de l\'importation des restaurants depuis all_restaurants.jsonl...')

    for await (const line of rl) {
      if (!line.trim()) continue

      try {
        const data = JSON.parse(line)

        // 1. Création du restaurant
        const restaurant = await Restaurant.create({
          name: data.name,
          michelinStar: data.michelin_star || null,
          street: data.street || null,
          postcode: data.postcode || null,
          city: data.city?.name || null,
          country: data.country?.name || null,
          cuisine: data.cuisines?.[0]?.label || null,
          lat: data._geoloc?.lat?.toString() || null,
          lng: data._geoloc?.lng?.toString() || null,
          maxPrice: data.price?.high?.toString() || null,
        })

        // 2. Ajout des images
        if (data.images && Array.isArray(data.images)) {
          const imagesData = data.images.map((img: any) => ({
            restaurantId: restaurant.id,
            url: img.url,
            copyright: img.copyright || null,
            topic: img.topic || null,
          }))
          await Image.createMany(imagesData)
        }

        // 3. Ajout des horaires
        if (data.hours_of_operation) {
          const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
          const hoursData: any[] = []

          days.forEach((dayName, index) => {
            const dayData = data.hours_of_operation[dayName]
            if (dayData && Array.isArray(dayData)) {
              dayData.forEach((slot: any) => {
                hoursData.push({
                  restaurantId: restaurant.id,
                  day: index,
                  opens: slot.opens?.replace('T', '') || null,
                  closes: slot.closes?.replace('T', '') || null,
                  closed: slot.closed || false,
                })
              })
            }
          })

          if (hoursData.length > 0) {
            await HoursOfOperation.createMany(hoursData)
          }
        }
      } catch (error) {
        console.error(`Erreur sur une ligne :`, error)
      }
    }

    console.log('Importation des restaurants terminée !')
  }
}

