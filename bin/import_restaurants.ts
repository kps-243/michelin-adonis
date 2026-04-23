import fs from 'node:fs'
import readline from 'node:readline'
import Restaurant from '#models/restaurant'
import Image from '#models/image'
import HoursOfOperation from '#models/hours_of_operation'

async function run() {
  const filePath = 'data/all_restaurants.jsonl'
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Number.POSITIVE_INFINITY,
  })

  console.log('Début de l\'importation des restaurants...')

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
                day: index + 1, // 1 for Monday, etc.
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

      console.log(`Importé : ${restaurant.name}`)
    } catch (error) {
      console.error(`Erreur lors de l'import d'une ligne :`, error)
    }
  }

  console.log('Importation terminée !')
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
