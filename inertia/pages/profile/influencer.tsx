import { useState } from 'react'
import SecondaryTitle from '~/components/SecondaryTitle'
import VlogModal, { type Vlog } from '~/components/VlogModal'

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
}

const VLOG_THUMBNAILS = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
]

const VLOG_BADGES = [
  'BEST OF LONDON',
  'BEST OF PARIS',
  'TOKYO EATS',
  'NEW YORK FOOD',
  'BEST OF TOKYO',
  'SECRETS ROME',
]

function buildVlogs(user: User): Vlog[] {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
  return VLOG_THUMBNAILS.map((thumb, i) => ({
    id: i + 1,
    title: VLOG_BADGES[i],
    thumbnail: thumb,
    badge: VLOG_BADGES[i],
    creatorName: name.toUpperCase(),
    creatorAvatar: user.avatar ?? undefined,
  }))
}

export default function InfluencerProfile({ user }: Props) {
  const [selectedVlog, setSelectedVlog] = useState<Vlog | null>(null)
  const [following, setFollowing] = useState(false)

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
  const vlogs = buildVlogs(user)

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* Profile card */}
      <div className="bg-white rounded-b-3xl shadow-sm px-6 pt-6 pb-8">
        <div className="flex flex-col items-center">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 shadow-md">
            {user.avatar ? (
              <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-3xl font-semibold text-gray-500">{user.initials}</span>
              </div>
            )}
          </div>

          {/* Name + verified */}
          <div className="flex items-center gap-2 mb-3">
            <p className="font-title text-[20px] font-semibold text-gray-900">{displayName}</p>
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <svg width="9" height="9" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Follow button */}
          <button
            onClick={() => setFollowing(!following)}
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

      {/* Bio */}
      <section className="px-5 pt-6 pb-2">
        <SecondaryTitle hidden>A propos de moi :</SecondaryTitle>
        <p className="text-[14px] text-gray-700 leading-relaxed mt-2">
          {user.bio || 'Créateur de contenu passionné par les voyages et la gastronomie, je partage des restaurants, des lieux inspirants et des expériences authentiques.'}
        </p>
      </section>

      {/* Vlogs grid */}
      <section className="px-5 pt-5">
        <SecondaryTitle hidden>Mes vlogs :</SecondaryTitle>
        <div className="grid grid-cols-2 gap-2 mt-3 lg:grid-cols-3">
          {vlogs.map((vlog) => (
            <button
              key={vlog.id}
              className="relative aspect-square rounded-xl overflow-hidden group"
              onClick={() => setSelectedVlog(vlog)}
            >
              <img
                src={vlog.thumbnail}
                alt={vlog.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Play icon */}
              <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                <svg width="12" height="12" fill="#111" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Vlog popup */}
      <VlogModal vlog={selectedVlog} onClose={() => setSelectedVlog(null)} />
    </div>
  )
}
