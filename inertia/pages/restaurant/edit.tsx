import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import BottomNav from '../../components/BottomNav'

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

export default function RestaurantEdit({ restaurant }: Props) {
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
      form.put(`/restaurants/${restaurant.id}`)
    } else {
      form.post('/restaurants')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-gray-100 px-5 py-3 flex items-center gap-3">
        <Link
          href={isEdit ? `/restaurants/${restaurant.id}` : '/restaurants'}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-[#E4002B] hover:text-[#E4002B] transition-colors"
        >
          ←
        </Link>
        <div className="flex-1">
          <h1 className="font-cormorant text-xl font-semibold leading-tight">
            {isEdit ? 'Modifier le restaurant' : 'Nouveau restaurant'}
          </h1>
          {isEdit && (
            <p className="text-[11px] text-gray-400 truncate">{restaurant.name}</p>
          )}
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-4">

        {/* Nom */}
        <Field label="Nom du restaurant" error={form.errors.name}>
          <input
            type="text"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
            className={inputCls(!!form.errors.name)}
            placeholder="Ex: Le Grand Véfour"
          />
        </Field>

        {/* Cuisine */}
        <Field label="Cuisine" error={form.errors.cuisine}>
          <input
            type="text"
            value={form.data.cuisine}
            onChange={(e) => form.setData('cuisine', e.target.value)}
            className={inputCls(!!form.errors.cuisine)}
            placeholder="Ex: Française, Japonaise, Italienne..."
          />
        </Field>

        {/* Étoile Michelin */}
        <Field label="Distinction Michelin" error={form.errors.michelinStar}>
          <select
            value={form.data.michelinStar ?? ''}
            onChange={(e) =>
              form.setData('michelinStar', (e.target.value as 'THREE' | 'TWO' | 'ONE') || null)
            }
            className={inputCls(!!form.errors.michelinStar)}
          >
            <option value="">— Pas d'étoile —</option>
            <option value="ONE">⭐ 1 Étoile</option>
            <option value="TWO">⭐⭐ 2 Étoiles</option>
            <option value="THREE">⭐⭐⭐ 3 Étoiles</option>
          </select>
        </Field>

        {/* Prix max */}
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

        {/* Rue */}
        <Field label="Rue" error={form.errors.street}>
          <input
            type="text"
            value={form.data.street}
            onChange={(e) => form.setData('street', e.target.value)}
            className={inputCls(!!form.errors.street)}
            placeholder="Ex: 17 rue du Bac"
          />
        </Field>

        {/* Postcode + Code postal */}
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

        {/* Ville */}
        <Field label="Ville" error={form.errors.city}>
          <input
            type="text"
            value={form.data.city}
            onChange={(e) => form.setData('city', e.target.value)}
            className={inputCls(!!form.errors.city)}
            placeholder="Ex: Paris"
          />
        </Field>

        {/* Pays */}
        <Field label="Pays" error={form.errors.country}>
          <input
            type="text"
            value={form.data.country}
            onChange={(e) => form.setData('country', e.target.value)}
            className={inputCls(!!form.errors.country)}
            placeholder="Ex: France"
          />
        </Field>

        {/* GPS */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={form.processing}
          className="w-full py-4 bg-[#E4002B] text-white text-[13px] font-medium rounded-2xl tracking-wider hover:bg-[#c4001e] transition-colors disabled:opacity-50 mt-2"
        >
          {form.processing
            ? '...'
            : isEdit
              ? 'Enregistrer les modifications'
              : 'Créer le restaurant'}
        </button>

        {isEdit && (
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="block text-center text-[12px] text-gray-400 py-2 hover:text-gray-600 transition-colors"
          >
            Annuler
          </Link>
        )}
      </form>

      <BottomNav active="home" />
    </div>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-4 py-3 rounded-xl bg-white border-[1.5px] text-[13px] outline-none transition-colors',
    hasError
      ? 'border-[#E4002B] focus:border-[#E4002B]'
      : 'border-gray-200 focus:border-[#1A1A1A]',
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
      <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-500 mb-1.5 font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-[#E4002B] mt-1">{error}</p>}
    </div>
  )
}
