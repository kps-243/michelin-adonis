import { Link, router } from '@inertiajs/react'
import NavBar from '../components/NavBar'
import SecondaryTitle from '~/components/SecondaryTitle'

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

interface Props {
  user: User
}

const LISTS = [
  { id: 1, label: 'Favoris' },
  { id: 2, label: 'À visiter' },
]

export default function Profile({ user }: Props) {
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.username

  return (
    <div className="min-h-screen bg-[#EFEFEF] pb-24">

      {/* ── CARD ── */}
      <div className="bg-white rounded-b-4xl px-6 pt-6 pb-10 relative shadow-sm">

        {/* Large avatar */}
        <div className="flex flex-col items-center pt-4">
          <div className="relative mb-5">
            <div className="w-44 h-44 rounded-full bg-[#D9D9D9] overflow-hidden flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-semibold text-gray-400">{user.initials}</span>
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

          {/* Name badge */}
          <div className="px-6 py-2 mb-7 w-full max-w-xs">
            <p className="font-helvetica text-[1.5rem] font-semibold text-gray-900 text-center tracking-tight leading-tight">
              {displayName}
            </p>
          </div>

          {/* Action circles */}
          <div className="flex items-start justify-around w-full px-2">
            <div
              className="flex flex-col items-center gap-2.5"
            >
              <div className="w-17.5 h-17.5 rounded-full border border-gray-300 bg-white" />
              <span className="text-[13px] font-semibold text-gray-800">Paramètre</span>
            </div>

            <Link href="/profile/edit" className="flex flex-col items-center gap-2.5 no-underline">
              <div className="w-17.5 h-17.5 rounded-full border border-gray-300 bg-white" />
              <span className="text-[13px] font-semibold text-gray-800">Modifier profil</span>
            </Link>

            <div className="flex flex-col items-center gap-2.5">
              <div className="w-17.5 h-17.5 rounded-full border-[2.5px] bg-white" />
              <span className="text-[13px] font-semibold text-gray-800">
                {user.country || 'Pays'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BIO ── */}
      <section className="px-5 pt-7 pb-1">
        <SecondaryTitle children="A propos de moi :" hidden/>
        <p className="text-[14px] text-gray-700">{user.bio || '...'}</p>
      </section>

      {/* ── MES LISTES ── */}
      <div className="px-5 pt-6">
        <SecondaryTitle children="Mes listes" hidden/>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {LISTS.map((list) => (
            <div
              key={list.id}
              className="shrink-0 w-[45vw] max-w-50 aspect-square bg-[#EBEBEB] rounded-2xl flex flex-col items-start justify-end p-4 gap-2"
            >
              <div className="w-14 h-14 bg-[#D4D4D4] rounded-lg" />
              <p className="text-[11px] text-gray-400 leading-tight">Votre liste est vide</p>
            </div>
          ))}
        </div>
      </div>

      <NavBar active="profile" />
    </div>
  )
}
