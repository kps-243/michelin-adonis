import { useForm, Link } from '@inertiajs/react'
import NavBar from '../../components/NavBar'

interface User {
  id: number
  firstName: string | null
  lastName: string | null
  username: string
  email: string
  role: 'user' | 'influencer'
  bio: string | null
  avatar: string | null
  country: string | null
}

interface Props {
  user: User
}

type FormData = {
  firstName: string
  lastName: string
  username: string
  bio: string
  avatar: string
  country: string
  role: 'user' | 'influencer'
}

const ROLES: { value: FormData['role']; label: string; desc: string; locked?: boolean }[] = [
  { value: 'user', label: 'Utilisateur', desc: 'Membre de la communauté Michelin' },
  { value: 'influencer', label: 'Influenceur', desc: 'Créateur de contenu culinaire' },
]

function inputCls(hasError: boolean) {
  return [
    'w-full px-4 py-3 rounded-xl bg-white border text-[13px] outline-none transition-colors',
    hasError ? 'border-red-primary' : 'border-gray-200 focus:border-gray-900',
  ].join(' ')
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-1.5 font-medium">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-primary mt-1">{error}</p>}
    </div>
  )
}

export default function ProfileEdit({ user }: Props) {
  const form = useForm<FormData>({
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    username: user.username,
    bio: user.bio ?? '',
    avatar: user.avatar ?? '',
    country: user.country ?? '',
    role: user.role,
  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.put('/profile')
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-24">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-3">
        <Link
          href="/profile"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors"
        >
          ←
        </Link>
        <div>
          <h1 className="font-title text-[1.125rem] font-semibold text-gray-900 leading-tight">Modifier le profil</h1>
          <p className="text-[11px] text-gray-400">{user.username}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-4">

        {/* Avatar */}
        <Field label="Photo de profil (URL)" error={form.errors.avatar}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 overflow-hidden">
              {form.data.avatar ? (
                <img src={form.data.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <input
              type="url"
              value={form.data.avatar}
              onChange={(e) => form.setData('avatar', e.target.value)}
              className={inputCls(!!form.errors.avatar) + ' flex-1'}
              placeholder="https://..."
            />
          </div>
        </Field>

        {/* Prénom + Nom */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" error={form.errors.firstName}>
            <input
              type="text"
              value={form.data.firstName}
              onChange={(e) => form.setData('firstName', e.target.value)}
              className={inputCls(!!form.errors.firstName)}
              placeholder="Jean"
            />
          </Field>
          <Field label="Nom" error={form.errors.lastName}>
            <input
              type="text"
              value={form.data.lastName}
              onChange={(e) => form.setData('lastName', e.target.value)}
              className={inputCls(!!form.errors.lastName)}
              placeholder="Dupont"
            />
          </Field>
        </div>

        {/* Username */}
        <Field label="Nom d'utilisateur" error={form.errors.username}>
          <input
            type="text"
            value={form.data.username}
            onChange={(e) => form.setData('username', e.target.value)}
            className={inputCls(!!form.errors.username)}
            placeholder="jean.dupont"
          />
        </Field>

        {/* Bio */}
        <Field label="À propos de moi" error={form.errors.bio}>
          <textarea
            value={form.data.bio}
            onChange={(e) => form.setData('bio', e.target.value)}
            rows={3}
            className={inputCls(!!form.errors.bio) + ' resize-none'}
            placeholder="Parlez-nous de vous…"
          />
        </Field>

        {/* Pays */}
        <Field label="Pays" error={form.errors.country}>
          <input
            type="text"
            value={form.data.country}
            onChange={(e) => form.setData('country', e.target.value)}
            className={inputCls(!!form.errors.country)}
            placeholder="France"
          />
        </Field>

        {/* Rôle */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-2 font-medium">Rôle</label>
          <div className="space-y-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => form.setData('role', r.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                  form.data.role === r.value
                    ? 'border-red-primary bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  form.data.role === r.value ? 'border-red-primary' : 'border-gray-300'
                }`}>
                  {form.data.role === r.value && (
                    <div className="w-2 h-2 rounded-full bg-red-primary" />
                  )}
                </div>
                <div>
                  <p className={`text-[13px] font-medium ${form.data.role === r.value ? 'text-red-primary' : 'text-gray-700'}`}>
                    {r.label}
                  </p>
                  <p className="text-[11px] text-gray-400">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={form.processing}
          className="w-full py-4 bg-red-primary text-white text-[13px] font-semibold rounded-2xl hover:bg-[#8f1025] transition-colors disabled:opacity-50 mt-2"
        >
          {form.processing ? '...' : 'Enregistrer les modifications'}
        </button>

        <Link
          href="/profile"
          className="block text-center text-[12px] text-gray-400 py-2 hover:text-gray-600 transition-colors"
        >
          Annuler
        </Link>
      </form>

      <NavBar active="profile" />
    </div>
  )
}
