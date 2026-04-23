import { useState } from 'react'
import SecondaryTitle from '~/components/SecondaryTitle'
import { csrfPost } from '~/utils/api'
import { MichelinStars } from '~/components/MichelinStar'

interface User {
  id: number
  username: string
  firstName: string | null
  lastName: string | null
  role: string
  avatar: string | null
  bio: string | null
  country: string | null
  initials: string
}

interface Props {
  user: User
  isFollowing?: boolean
}

const CRITIQUE_IMAGES = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&q=80',
]

const CRITIQUE_NAMES = [
  'Le Grand Véfour',
  'Kodawari Ramen',
  'Osteria Francescana',
  'El Celler de Can Roca',
]

const CRITIQUE_STARS = [3, 2, 3, 3]


export default function ExpertProfile({ user, isFollowing = false }: Props) {
  const [following, setFollowing] = useState(isFollowing)
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
  const bio = user.bio || "Spécialisé dans la recommandation d'adresses gastronomiques, je propose une sélection rigoureuse de restaurants et d'établissements remarquables. Certifié par Michelin, j'évalue chaque adresse selon des critères exigeants de qualité, de régularité, d'identité et d'expérience globale."

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">

      {/* ── DESKTOP WRAPPER ── */}
      <div className="lg:max-w-4xl lg:mx-auto">

        {/* Profile card */}
        <div className="bg-white shadow-sm px-6 pt-6 pb-8 lg:rounded-2xl lg:mt-8 lg:shadow-md lg:flex lg:items-center lg:gap-8 lg:px-10 lg:py-10">

          {/* Avatar */}
          <div className="flex justify-center mb-4 lg:mb-0 lg:shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-red-primary flex items-center justify-center shadow-md lg:w-40 lg:h-40">
                {user.avatar ? (
                  <img src={user.avatar} alt={displayName} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <svg width="72" height="72" viewBox="0 0 100 100" fill="white">
                    <ellipse cx="50" cy="32" rx="26" ry="5" />
                    <rect x="32" y="10" width="36" height="24" rx="6" />
                    <circle cx="50" cy="48" r="12" />
                    <path d="M22 100 Q26 68 50 65 Q74 68 78 100 Z" />
                  </svg>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-white shadow-md border-2 border-gray-100 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AB152E" strokeWidth="2">
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16" y1="16" x2="21" y2="21" />
                  <circle cx="11" cy="11" r="2" fill="#AB152E" stroke="none" />
                </svg>
              </div>
            </div>
          </div>

          {/* Name + bio + follow */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1">
            <div className="flex items-center gap-2 mb-3">
              <p className="font-title text-[20px] lg:text-[28px] font-semibold text-gray-900">{displayName}</p>
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                <svg width="9" height="9" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <p className="hidden lg:block text-[13px] text-gray-500 leading-relaxed mb-4 max-w-md">
              {bio}
            </p>

            <button
              onClick={async () => {
                try {
                  const data = await csrfPost<{ following: boolean }>(`/users/${user.id}/follow`)
                  setFollowing(data.following)
                } catch {
                  setFollowing((f) => !f)
                }
              }}
              className={`px-8 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                following
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-red-primary text-white'
              }`}
            >
              {following ? 'Suivi ✓' : 'Suivre'}
            </button>
          </div>
        </div>

        {/* Bio (mobile) */}
        <section className="px-5 pt-6 pb-2 lg:hidden">
          <SecondaryTitle hidden>A propos de moi :</SecondaryTitle>
          <p className="text-[14px] text-gray-700 leading-relaxed mt-2">{bio}</p>
        </section>

        {/* Critiques */}
        <section className="px-5 pt-5 lg:px-0 lg:pt-6">
          <SecondaryTitle hidden>Mes critiques :</SecondaryTitle>
          <div className="flex flex-col gap-3 mt-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {CRITIQUE_NAMES.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={CRITIQUE_IMAGES[i]} alt={name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title text-[14px] font-semibold text-gray-900 truncate">{name}</p>
                  <MichelinStars count={CRITIQUE_STARS[i]} size={11} />
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">
                    Une expérience gastronomique exceptionnelle, digne des plus grandes tables.
                  </p>
                </div>
                <svg width="16" height="16" fill="none" stroke="#ccc" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
