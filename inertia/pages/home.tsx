import { useState } from 'react'
import { Link } from '@inertiajs/react'
import BottomNav from '../components/NavBar'
import RestaurantCard from '../components/RestaurantCard'
import type { Restaurant } from '../../app/services/restaurant_service'
import PrimaryTitle from '~/components/PrimaryTitle'
import SecondaryTitle from '~/components/SecondaryTitle'

interface Props {
  featured: {
    threeStars: Restaurant[]
    twoStars: Restaurant[]
    bibs: Restaurant[]
  }
  stats: {
    total: number
    threeStars: number
    twoStars: number
    oneStar: number
    bibs: number
    countries: number
  }
}

const bibImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80',
]

export default function Home({ featured, stats }: Props) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: '3', label: '⭐⭐⭐ 3 Étoiles' },
    { key: '2', label: '⭐⭐ 2 Étoiles' },
    { key: '1', label: '⭐ 1 Étoile' },
    { key: 'bib', label: '🍽 Bib Gourmand' },
    { key: 'green', label: '🌿 Green Star' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] pb-20 overflow-x-hidden">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4] border-b border-gray-100 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] bg-[#E4002B] rounded-full flex items-center justify-center text-xl">
            🌟
          </div>
          <div>
            <PrimaryTitle children="Michelin"/>
            <SecondaryTitle hidden={true} children="Yes"/>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-base hover:border-[#E4002B] transition-colors">
          🔍
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="bg-[#1A1A1A] text-white px-5 py-10 relative overflow-hidden fade-up">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#E4002B] rounded-full opacity-10 pointer-events-none" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A96E] mb-3">
          ✦ L'excellence gastronomique
        </p>
        <h1 className="font-cormorant text-[clamp(38px,10vw,52px)] font-light leading-[1.05] mb-4">
          Découvrez<br />
          les tables{' '}
          <em className="italic text-[#C8A96E]">d'exception</em>
        </h1>
        <p className="text-[13px] text-white/65 leading-relaxed max-w-xs mb-7">
          Plus de 18 000 restaurants sélectionnés par nos inspecteurs à travers le monde entier.
        </p>
        <div className="flex gap-7">
          <div>
            <div className="font-bebas text-3xl text-[#C8A96E] leading-none">
              {stats.total.toLocaleString('fr')}
            </div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Restaurants</div>
          </div>
          <div>
            <div className="font-bebas text-3xl text-[#C8A96E] leading-none">{stats.threeStars}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">3 Étoiles</div>
          </div>
          <div>
            <div className="font-bebas text-3xl text-[#C8A96E] leading-none">{stats.countries}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Pays</div>
          </div>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <div className="px-5 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5 bg-[#FAF8F4] border-[1.5px] border-gray-200 rounded-full px-4 py-2.5">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Cuisine, ville, restaurant..."
            className="flex-1 border-none bg-transparent font-dm text-sm text-[#1A1A1A] outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`whitespace-nowrap px-4 py-[7px] rounded-full text-xs font-medium border-[1.5px] transition-all tracking-tight ${
              activeFilter === f.key
                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                : 'bg-white border-gray-200 text-[#1A1A1A] hover:border-[#E4002B] hover:text-[#E4002B]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── 3 STARS ── */}
      <section className="px-5 pt-6 pb-2 fade-up">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-cormorant text-2xl font-semibold">⭐ Trois Étoiles</h2>
          <a href="#" className="text-xs text-[#E4002B] tracking-wide">Voir tout →</a>
        </div>
        <div className="flex gap-3.5 overflow-x-auto scrollbar-none pb-1">
          {featured.threeStars.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* ── INSPIRATION BAND ── */}
      <div className="mx-5 my-6 bg-[#E4002B] text-white rounded-[20px] p-7 relative overflow-hidden">
        <div className="absolute right-5 bottom-[-10px] text-[80px] opacity-[0.08] pointer-events-none">⭐</div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-2">✦ Nouvelle fonctionnalité</p>
        <h3 className="font-cormorant text-[26px] font-light leading-tight mb-4">
          Swipez votre prochain<br />repas de rêve
        </h3>
        <Link
          href="/decouverte"
          className="inline-block bg-white text-[#E4002B] text-xs font-medium px-5 py-2.5 rounded-full tracking-wider"
        >
          Découvrir →
        </Link>
      </div>

      {/* ── 2 STARS ── */}
      <section className="px-5 pt-2 pb-2">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-cormorant text-2xl font-semibold">⭐ Deux Étoiles</h2>
          <a href="#" className="text-xs text-[#E4002B] tracking-wide">Voir tout →</a>
        </div>
        <div className="flex gap-3.5 overflow-x-auto scrollbar-none pb-1">
          {featured.twoStars.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* ── BIB GOURMAND ── */}
      <section className="px-5 pt-6 pb-2">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-cormorant text-2xl font-semibold">🍽 Bib Gourmand</h2>
          <a href="#" className="text-xs text-[#E4002B] tracking-wide">Voir tout →</a>
        </div>
      </section>
      <div className="flex flex-col gap-3 px-5 mb-4">
        {featured.bibs.map((r, i) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl flex gap-3.5 p-3.5 items-center shadow-[0_1px_8px_rgba(0,0,0,0.06)] cursor-pointer transition-transform hover:translate-x-1"
          >
            <img
              src={bibImages[i % bibImages.length]}
              alt={r.name}
              className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0 bg-gray-100"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1 tracking-wide">
                🍽 Bib Gourmand
              </div>
              <div className="font-cormorant text-[15px] font-semibold truncate">{r.name}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {r.cuisine} · {r.location.split(',').slice(-1)[0].trim()}
              </div>
            </div>
            <div className="font-cormorant text-base font-semibold text-[#E4002B] flex-shrink-0 ml-auto">
              {r.price}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  )
}
