import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import SecondaryTitle from '~/components/SecondaryTitle'

interface Restaurant {
  id: number
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  street: string
  postcode: string
  city: string
  country: string
  codePostal: number
  maxPrice: number
  cuisine: string
  lat: number
  lng: number
}

interface Props {
  restaurant: Restaurant | null
}

type FormData = {
  name: string
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  street: string
  postcode: string
  city: string
  country: string
  codePostal: number | string
  maxPrice: number | string
  cuisine: string
  lat: number | string
  lng: number | string
}

export default function AdminRestaurantEdit({ restaurant }: Props) {
  const isEdit = restaurant !== null

  const form = useForm<FormData>({
    name: restaurant?.name ?? '',
    michelinStar: restaurant?.michelinStar ?? null,
    street: restaurant?.street ?? '',
    postcode: restaurant?.postcode ?? '',
    city: restaurant?.city ?? '',
    country: restaurant?.country ?? '',
    codePostal: restaurant?.codePostal ?? '',
    maxPrice: restaurant?.maxPrice ?? '',
    cuisine: restaurant?.cuisine ?? '',
    lat: restaurant?.lat ?? '',
    lng: restaurant?.lng ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit) {
      form.put(`/admin/restaurants/${restaurant.id}`)
    } else {
      form.post('/admin/restaurants')
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-gray-900 pb-24 transition-colors">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 border-b border-transparent dark:border-gray-700">
        <div className="px-4 py-3 flex items-center gap-3 lg:max-w-5xl lg:mx-auto lg:px-8 lg:py-4">
          <Link
            href={isEdit ? `/admin/restaurants/${restaurant.id}` : '/admin/restaurants'}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-red-primary hover:text-red-primary transition-colors shrink-0"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <SecondaryTitle hidden>
              {isEdit ? 'Modifier le restaurant' : 'Nouveau restaurant'}
            </SecondaryTitle>
            {isEdit && (
              <p className="text-[11px] text-gray-400 truncate">{restaurant.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-5 flex flex-col gap-4 lg:max-w-5xl lg:mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:items-start">

        <div className="lg:col-span-2">
          <Field label="Nom du restaurant" error={form.errors.name}>
            <input
              type="text"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              className={inputCls(!!form.errors.name)}
              placeholder="Ex: Le Grand Véfour"
            />
          </Field>
        </div>

        <Field label="Cuisine" error={form.errors.cuisine}>
          <input
            type="text"
            value={form.data.cuisine}
            onChange={(e) => form.setData('cuisine', e.target.value)}
            className={inputCls(!!form.errors.cuisine)}
            placeholder="Ex: Française, Japonaise..."
          />
        </Field>

        <Field label="Distinction Michelin" error={form.errors.michelinStar}>
          <select
            value={form.data.michelinStar ?? ''}
            onChange={(e) =>
              form.setData('michelinStar', (e.target.value as 'THREE' | 'TWO' | 'ONE') || null)
            }
            className={inputCls(!!form.errors.michelinStar)}
          >
            <option value="">— Pas d'étoile —</option>
            <option value="ONE">✦ 1 Étoile Michelin</option>
            <option value="TWO">✦✦ 2 Étoiles Michelin</option>
            <option value="THREE">✦✦✦ 3 Étoiles Michelin</option>
          </select>
        </Field>

        <Field label="Prix maximum (€)" error={form.errors.maxPrice}>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.data.maxPrice}
            onChange={(e) => form.setData('maxPrice', e.target.value)}
            className={inputCls(!!form.errors.maxPrice)}
            placeholder="Ex: 120"
          />
        </Field>

        <Field label="Rue" error={form.errors.street}>
          <input
            type="text"
            value={form.data.street}
            onChange={(e) => form.setData('street', e.target.value)}
            className={inputCls(!!form.errors.street)}
            placeholder="Ex: 17 rue du Bac"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Code postal" error={form.errors.postcode}>
            <input
              type="text"
              value={form.data.postcode}
              onChange={(e) => form.setData('postcode', e.target.value)}
              className={inputCls(!!form.errors.postcode)}
              placeholder="75007"
            />
          </Field>
          <Field label="Code postal (n°)" error={form.errors.codePostal}>
            <input
              type="number"
              value={form.data.codePostal}
              onChange={(e) => form.setData('codePostal', e.target.value)}
              className={inputCls(!!form.errors.codePostal)}
              placeholder="75007"
            />
          </Field>
        </div>

        <Field label="Ville" error={form.errors.city}>
          <input
            type="text"
            value={form.data.city}
            onChange={(e) => form.setData('city', e.target.value)}
            className={inputCls(!!form.errors.city)}
            placeholder="Ex: Paris"
          />
        </Field>

        <Field label="Pays" error={form.errors.country}>
          <input
            type="text"
            value={form.data.country}
            onChange={(e) => form.setData('country', e.target.value)}
            className={inputCls(!!form.errors.country)}
            placeholder="Ex: France"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Latitude" error={form.errors.lat}>
            <input
              type="number"
              step="any"
              value={form.data.lat}
              onChange={(e) => form.setData('lat', e.target.value)}
              className={inputCls(!!form.errors.lat)}
              placeholder="48.8566"
            />
          </Field>
          <Field label="Longitude" error={form.errors.lng}>
            <input
              type="number"
              step="any"
              value={form.data.lng}
              onChange={(e) => form.setData('lng', e.target.value)}
              className={inputCls(!!form.errors.lng)}
              placeholder="2.3522"
            />
          </Field>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3">
          <button
            type="submit"
            disabled={form.processing}
            className="w-full py-4 bg-red-primary text-white text-[14px] font-semibold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {form.processing
              ? '...'
              : isEdit
                ? 'Enregistrer les modifications'
                : 'Créer le restaurant'}
          </button>
          {isEdit && (
            <Link
              href={`/admin/restaurants/${restaurant.id}`}
              className="block text-center text-[12px] text-gray-400 py-2 hover:text-gray-600 transition-colors"
            >
              Annuler
            </Link>
          )}
        </div>

      </form>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-[1.5px] text-[13px] text-gray-900 dark:text-gray-100 outline-none transition-colors focus:ring-0',
    hasError
      ? 'border-red-primary focus:border-red-primary'
      : 'border-gray-200 dark:border-gray-600 focus:border-gray-700 dark:focus:border-gray-400',
  ].join(' ')
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-primary mt-1">{error}</p>}
    </div>
  )
}
