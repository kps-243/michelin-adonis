import { Link } from '@inertiajs/react'
import NavBar from '../components/NavBar'
import SecondaryTitle from '~/components/SecondaryTitle'
import { MichelinStars } from '~/components/MichelinStar'

interface User {
  id: number
  firstName: string | null
  lastName: string | null
  username: string
  email: string
  role: 'user' | 'expert' | 'influencer'
  bio: string | null
  avatar: string | null
  country: string | null
  initials: string
}

interface FollowedUser {
  id: number
  username: string
  firstName: string | null
  lastName: string | null
  role: string
  avatar: string | null
  initials: string
}

interface FavoriteRestaurant {
  id: number
  name: string
  city: string | null
  country: string | null
  image: string
}

interface VisitedRestaurant {
  id: number
  name: string
  city: string | null
  country: string | null
  michelinStar: 'THREE' | 'TWO' | 'ONE' | null
  image: string
}

interface Props {
  user: User
  followedUsers: FollowedUser[]
  favoriteRestaurants: FavoriteRestaurant[]
  visitedRestaurants: VisitedRestaurant[]
}

const STAR_COUNT: Record<string, number> = { THREE: 3, TWO: 2, ONE: 1 }


export default function Profile({ user, followedUsers, favoriteRestaurants, visitedRestaurants }: Props) {
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-gray-900 pb-24 transition-colors">

      {/* ── PROFILE CARD ── */}
      <div className="bg-white dark:bg-gray-800 rounded-b-4xl shadow-sm lg:rounded-2xl lg:mx-auto lg:max-w-3xl lg:mt-8 lg:shadow-md">
        <div className="px-6 pt-6 pb-10 flex flex-col items-center lg:pt-10 lg:pb-12">

          {/* Avatar */}
          <div className="relative mb-5">
            <div className="w-44 h-44 rounded-full bg-[#D9D9D9] dark:bg-gray-600 overflow-hidden flex items-center justify-center lg:w-52 lg:h-52">
              {user.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-semibold text-gray-400 lg:text-5xl">{user.initials}</span>
              )}
            </div>
            {user.role === 'influencer' && (
              <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-red-primary shadow-md" />
            )}
            {user.role === 'expert' && (
              <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-amber-400 shadow-md flex items-center justify-center text-white text-base leading-none">
                ★
              </div>
            )}
          </div>

          {/* Name */}
          <p className="font-title text-[1.5rem] lg:text-[2rem] font-semibold text-gray-900 dark:text-white text-center tracking-tight leading-tight mb-7">
            {displayName}
          </p>

          {/* Action circles */}
          <div className="flex items-start justify-around w-full px-2 lg:max-w-sm lg:gap-12 lg:justify-center">

            {/* Paramètre */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-17.5 h-17.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-primary">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">Paramètre</span>
            </div>

            {/* Modifier profil */}
            <Link href="/profile/edit" className="flex flex-col items-center gap-2.5 no-underline">
              <div className="w-17.5 h-17.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-primary">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">Modifier profil</span>
            </Link>

            {/* Pays */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-17.5 h-17.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-primary">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{user.country || 'Pays'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-4 pt-4 flex flex-col gap-4 lg:max-w-5xl lg:mx-auto lg:px-8 lg:pt-6 lg:grid lg:grid-cols-2 lg:gap-6">

        {/* ── BIO ── */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm lg:p-6 lg:self-start">
          <SecondaryTitle children="A propos de moi :" hidden />
          <p className="text-[14px] text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{user.bio || '...'}</p>
        </section>

        {/* ── SUIVI ── */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm lg:p-6 lg:self-start">
          <SecondaryTitle children="Mes abonnements :" hidden />
          {followedUsers.length === 0 ? (
            <p className="text-[13px] text-gray-400 mt-2">Vous ne suivez personne pour l'instant.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 mt-3">
              {followedUsers.map((u) => {
                const name = [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username
                return (
                  <Link key={u.id} href={`/users/${u.id}`} className="shrink-0 flex flex-col items-center gap-1.5 no-underline">
                    <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center ${u.role === 'expert' ? 'bg-red-primary' : 'bg-gray-200'}`}>
                      {u.avatar ? (
                        <img src={u.avatar} alt={name} className="w-full h-full object-cover" />
                      ) : (
                        <span className={`text-[15px] font-semibold ${u.role === 'expert' ? 'text-white' : 'text-gray-600'}`}>
                          {u.initials}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-700 dark:text-gray-300 font-medium text-center w-16 truncate">{name}</p>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* ── FAVORIS ── */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm lg:p-6 lg:col-span-2">
          <SecondaryTitle children="Mes favoris :" hidden />
          {favoriteRestaurants.length === 0 ? (
            <p className="text-[13px] text-gray-400 mt-2">Aucun restaurant en favori.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 mt-3 lg:grid lg:grid-cols-4 lg:overflow-x-visible">
              {favoriteRestaurants.map((r) => (
                <Link key={r.id} href={`/restaurants/${r.id}`} className="shrink-0 w-[42vw] max-w-48 lg:w-auto lg:max-w-none no-underline">
                  <div className="relative h-28 lg:h-36 rounded-xl overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-white text-[12px] font-semibold line-clamp-1">{r.name}</p>
                  </div>
                  {(r.city || r.country) && (
                    <p className="text-[11px] text-gray-400 mt-1 truncate">{[r.city, r.country].filter(Boolean).join(', ')}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── DÉJÀ VISITÉS ── */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm lg:p-6 lg:col-span-2">
          <SecondaryTitle children="Déjà visités :" hidden />
          {visitedRestaurants.length === 0 ? (
            <p className="text-[13px] text-gray-400 mt-2">Aucun restaurant visité pour l'instant.</p>
          ) : (
            <div className="flex flex-col gap-3 mt-3 lg:grid lg:grid-cols-2 lg:gap-4">
              {visitedRestaurants.map((r) => (
                <Link
                  key={r.id}
                  href={`/restaurants/${r.id}`}
                  className="flex items-center gap-3 bg-[#FAFAFA] dark:bg-gray-700 rounded-2xl p-3 border border-gray-100 dark:border-gray-600 no-underline"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-title text-[14px] font-semibold text-gray-900 dark:text-white truncate">{r.name}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{[r.city, r.country].filter(Boolean).join(', ')}</p>
                    {r.michelinStar && (
                      <MichelinStars count={STAR_COUNT[r.michelinStar] ?? 1} size={11} />
                    )}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-red-primary flex items-center justify-center shrink-0">
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>

      <NavBar active="profile" />
    </div>
  )
}
