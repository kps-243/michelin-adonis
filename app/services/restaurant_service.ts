import { readFileSync } from 'node:fs'
import { parse } from 'csv-parse/sync'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export interface Restaurant {
  id: number
  name: string
  address: string
  location: string
  price: string
  cuisine: string
  cuisines: string[]
  longitude: number
  latitude: number
  phone: string
  michelinUrl: string
  websiteUrl: string
  stars: number
  isBib: boolean
  isSelected: boolean
  award: string
  greenStar: boolean
  facilities: string[]
  description: string
  image: string
}

const cuisineImages: Record<string, string> = {
  French: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'Classic French': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  'Modern French': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  'Creative French': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  Japanese: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
  'Japanese Contemporary': 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80',
  Italian: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'Italian Contemporary': 'https://images.unsplash.com/photo-1473093226555-0b91f13a545e?w=800&q=80',
  Creative: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  'Modern Cuisine': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  Spanish: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&q=80',
  Seafood: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80',
  Vegetarian: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
}

const swipeImages = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=85',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700&q=85',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=85',
  'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=700&q=85',
  'https://images.unsplash.com/photo-1473093226555-0b91f13a545e?w=700&q=85',
  'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=700&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=700&q=85',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700&q=85',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=85',
  'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=700&q=85',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85',
]

let cached: Restaurant[] | null = null

export function loadRestaurants(): Restaurant[] {
  if (cached) return cached

  const csvPath = join(__dirname, '../../data/restaurants.csv')
  const content = readFileSync(csvPath, 'utf-8')
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    relaxQuotes: true,
    trim: true,
  })

  cached = records.map((r: any, i: number): Restaurant => {
    const cuisines = r.Cuisine ? r.Cuisine.split(',').map((c: string) => c.trim()) : []
    const primaryCuisine = cuisines[0] || 'default'
    const imageKey =
      Object.keys(cuisineImages).find(
        (k) => primaryCuisine.includes(k) || cuisines.some((c: string) => c.includes(k))
      ) || 'default'

    let stars = 0
    const award = r.Award || ''
    if (award.includes('3 Stars') || award.includes('3 MICHELIN')) stars = 3
    else if (award.includes('2 Stars') || award.includes('2 MICHELIN')) stars = 2
    else if (award.includes('1 Star') || award.includes('1 MICHELIN')) stars = 1

    const isBib = award.toLowerCase().includes('bib')
    const isSelected = award.toLowerCase().includes('selected')

    return {
      id: i + 1,
      name: r.Name,
      address: r.Address,
      location: r.Location,
      price: r.Price || '€€',
      cuisine: r.Cuisine,
      cuisines,
      longitude: parseFloat(r.Longitude) || 0,
      latitude: parseFloat(r.Latitude) || 0,
      phone: r.PhoneNumber,
      michelinUrl: r.Url,
      websiteUrl: r.WebsiteUrl,
      stars,
      isBib,
      isSelected,
      award,
      greenStar: r.GreenStar === '1',
      facilities: r.FacilitiesAndServices
        ? r.FacilitiesAndServices.split(',').map((f: string) => f.trim())
        : [],
      description: r.Description || '',
      image: cuisineImages[imageKey],
    }
  })

  return cached!
}

export function getFeatured() {
  const all = loadRestaurants()
  return {
    threeStars: all.filter((r) => r.stars === 3).slice(0, 8),
    twoStars: all.filter((r) => r.stars === 2).slice(0, 6),
    bibs: all.filter((r) => r.isBib).slice(0, 6),
  }
}

export function getSwipeCards(count = 40): Restaurant[] {
  const all = loadRestaurants()
  const starred = all.filter((r) => r.stars > 0 || r.isBib)
  const shuffled = [...starred].sort(() => Math.random() - 0.5).slice(0, count)
  return shuffled.map((r, i) => ({ ...r, image: swipeImages[i % swipeImages.length] }))
}

export function getSocialFeed() {
  const all = loadRestaurants()
  const featured = all.filter((r) => r.stars > 0).slice(0, 20)
  const socialImages = [
    { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', tag: '#PastaNight', likes: '12.4k', badge: '🔥 VIRAL' },
    { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', tag: '#BrunchVibes', likes: '9.8k' },
    { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', tag: '#BurgerLovers', likes: '22.1k', badge: '📈 TOP' },
    { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80', tag: '#DessertPorn', likes: '18.6k' },
    { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80', tag: '#FoodArt', likes: '14.3k', badge: '⭐ MICHELIN' },
    { src: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80', tag: '#HealthyEats', likes: '11.2k' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', tag: '#ChefTable', likes: '31.5k', badge: '🏆 COUP DE COEUR' },
    { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', tag: '#PlatingGoals', likes: '16.9k' },
    { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80', tag: '#BreakfastClub', likes: '8.4k' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', tag: '#FineFood', likes: '27.2k', badge: '✨ ÉTOILÉ' },
    { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', tag: '#SaladSzn', likes: '6.1k' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', tag: '#FrenchFood', likes: '13.7k' },
  ]
  return { socialImages, featured }
}

export function getStats() {
  const all = loadRestaurants()
  return {
    total: all.length,
    threeStars: all.filter((r) => r.stars === 3).length,
    twoStars: all.filter((r) => r.stars === 2).length,
    oneStar: all.filter((r) => r.stars === 1).length,
    bibs: all.filter((r) => r.isBib).length,
    countries: [...new Set(all.map((r) => r.location.split(',').pop()!.trim()))].length,
  }
}
