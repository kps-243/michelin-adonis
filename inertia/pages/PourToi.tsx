import { useState } from 'react'
import { Link } from '@inertiajs/react'
import BottomNav from '../components/BottomNav'
import type { Restaurant } from '../../app/services/restaurant_service'

interface SocialImage {
  src: string
  tag: string
  likes: string
  badge?: string
}

interface Props {
  socialImages: SocialImage[]
  featured: Restaurant[]
  spotlight: Restaurant[]
}

const gridSizes = ['large', 'small', 'small', 'medium', 'medium', 'small', 'large', 'small', 'small', 'large'] as const
type GridSize = 'large' | 'medium' | 'small'

const spotlightImgs = [
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
  'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
  'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=400&q=80',
  'https://images.unsplash.com/photo-1473093226555-0b91f13a545e?w=400&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
]

const trendImgs = [
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&q=80',
  'https://images.unsplash.com/photo-1479838721440-a36a25f9cf76?w=100&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&q=80',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=100&q=80',
  'https://images.unsplash.com/photo-1473093226555-0b91f13a545e?w=100&q=80',
]

const trendTags = ['#Trending', '#Viral', '#BuzzFood', '#Incontournable', '#ÀTester']

const reels = [
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80', label: 'Pasta maison en 60s' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80', label: 'Brunch aesthetic' },
  { src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80', label: 'Sushi masterclass' },
  { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80', label: 'Desserts étoilés' },
  { src: 'https://images.unsplash.com/photo-1473093226555-0b91f13a545e?w=200&q=80', label: 'Pizza Napolitaine' },
]

const tags = ['#ToutPourToi', '#PlatsDuMoment', '#ChefsTendance', '#BibGourmand', '#FineDining', '#StreetFood', '#Végétal']

function GridItem({ item, size, saved, onSave }: { item: SocialImage; size: GridSize; saved: boolean; onSave: () => void }) {
  const sizeClass: Record<GridSize, string> = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-2',
    small: 'col-span-1 row-span-1',
  }
  const heightClass: Record<GridSize, string> = {
    large: 'h-[180px]',
    medium: 'h-[180px]',
    small: 'h-[90px]',
  }

  return (
    <div className={`relative overflow-hidden rounded-xl cursor-pointer ${sizeClass[size]} ${heightClass[size]}`}>
      <img src={item.src} alt={item.tag} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {item.badge && (
        <div className="absolute top-2 left-2 bg-[#E4002B] text-white text-[9px] font-barlow font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
          {item.badge}
        </div>
      )}
      <button
        onClick={onSave}
        className={`absolute top-2 right-2 text-sm transition-colors ${saved ? 'text-[#E4002B]' : 'text-white/80'}`}
      >
        {saved ? '♥' : '♡'}
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="text-[10px] font-medium text-white/90">{item.tag}</div>
        <div className="text-[9px] text-white/60">❤ {item.likes}</div>
      </div>
    </div>
  )
}

export default function PourToi({ socialImages, featured, spotlight }: Props) {
  const [activeTag, setActiveTag] = useState('#ToutPourToi')
  const [saved, setSaved] = useState<Set<number>>(new Set())

  const toggleSave = (i: number) => {
    setSaved((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0EBE0] font-dm pb-20 overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-[rgba(10,10,10,0.92)] backdrop-blur-xl border-b border-white/[0.06] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="w-9 h-9 bg-white/[0.05] rounded-full flex items-center justify-center text-base text-[#F0EBE0] no-underline"
          >
            ←
          </Link>
          <div className="font-barlow text-[22px] font-black uppercase tracking-wide">
            M<span className="text-[#E4002B]">ICHELIN</span> · POUR TOI
          </div>
        </div>
        <div className="flex gap-2.5">
          <button className="w-9 h-9 bg-white/[0.05] rounded-full flex items-center justify-center text-base">🔍</button>
          <button className="w-9 h-9 bg-white/[0.05] rounded-full flex items-center justify-center text-base">♡</button>
        </div>
      </header>

      {/* ── EDITORIAL HERO ── */}
      <div className="relative h-[55vw] min-h-[220px] max-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=85"
          alt="Hero"
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0A0A0A]/70" />
        <div className="absolute top-5 left-5 bg-[#E4002B] text-white font-barlow text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm">
          ✦ TENDANCE
        </div>
        <div className="absolute bottom-6 left-5 right-5">
          <div className="text-[11px] text-[#C8A96E] tracking-widest uppercase mb-1.5">Cette semaine sur les réseaux</div>
          <div className="font-barlow text-[clamp(32px,8vw,52px)] font-black uppercase leading-none mb-3">
            Les plats qui<br />font le buzz
          </div>
          <div className="text-xs text-white/60">Sélectionnés par nos inspecteurs &amp; la communauté</div>
        </div>
      </div>

      {/* ── TAGS STRIP ── */}
      <div className="flex gap-2 px-5 py-3.5 overflow-x-auto scrollbar-none border-b border-white/[0.05]">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all tracking-tight border ${
              activeTag === t
                ? 'bg-[#E4002B] border-[#E4002B] text-white'
                : 'bg-white/[0.04] border-white/[0.12] text-white/70 hover:border-white/30 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── CREATOR BANNER ── */}
      <div className="mx-5 mt-5 bg-[#141414] rounded-2xl flex items-center gap-3.5 p-4 border border-white/[0.06]">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&q=80"
          alt="Chef"
          className="w-[52px] h-[52px] rounded-full object-cover border-2 border-[#E4002B] flex-shrink-0"
        />
        <div className="flex-1">
          <div className="font-semibold text-sm mb-0.5">Chef Adrien Moles</div>
          <div className="text-[11px] text-gray-500">@adrien_inspecteur · 2 Étoiles Michelin</div>
        </div>
        <button className="bg-[#E4002B] text-white text-[11px] font-medium px-3 py-1.5 rounded-full">Suivre</button>
      </div>

      {/* ── SECTION: TRENDING ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <h2 className="font-barlow text-xl font-black uppercase tracking-wide">🔥 Trending Now</h2>
        <a href="#" className="text-xs text-[#E4002B] tracking-wide">Tout voir →</a>
      </div>

      {/* ── BERSHKA EDITORIAL GRID ── */}
      <div className="px-3 grid grid-cols-3 gap-1.5" style={{ gridAutoRows: 'auto' }}>
        {socialImages.map((item, i) => (
          <GridItem
            key={i}
            item={item}
            size={gridSizes[i % gridSizes.length]}
            saved={saved.has(i)}
            onSave={() => toggleSave(i)}
          />
        ))}
      </div>

      {/* ── FULL BANNER ── */}
      <div className="mx-3 mt-4 rounded-2xl overflow-hidden relative h-[42vw] min-h-[160px]">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85"
          alt="Fine dining"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
          <div className="text-[11px] text-[#C8A96E] tracking-widest uppercase mb-2">✦ Nouvelles tables · 2025</div>
          <div className="font-barlow text-[clamp(22px,6vw,36px)] font-black uppercase leading-none mb-3">
            Les étoiles<br />montantes
          </div>
          <Link
            href="/"
            className="bg-white text-[#1A1A1A] font-barlow font-bold text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm no-underline"
          >
            Découvrir le guide
          </Link>
        </div>
      </div>

      {/* ── REELS ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <h2 className="font-barlow text-xl font-black uppercase tracking-wide">📱 Reels Food</h2>
        <a href="#" className="text-xs text-[#E4002B] tracking-wide">Tout voir →</a>
      </div>
      <div className="flex gap-2.5 px-5 overflow-x-auto scrollbar-none">
        {reels.map((reel, i) => (
          <div key={i} className="relative flex-shrink-0 w-[100px] h-[170px] rounded-xl overflow-hidden cursor-pointer">
            <img src={reel.src} alt={reel.label} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white/90 text-xl">▶</div>
            <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 font-medium leading-tight">
              {reel.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── SPOTLIGHT ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <h2 className="font-barlow text-xl font-black uppercase tracking-wide">⭐ Inspiré par ta liste</h2>
        <a href="#" className="text-xs text-[#E4002B] tracking-wide">Voir tout →</a>
      </div>
      <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none">
        {spotlight.slice(0, 8).map((r, i) => (
          <a
            key={r.id}
            href={r.michelinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-[140px] bg-[#141414] rounded-2xl overflow-hidden no-underline text-[#F0EBE0]"
          >
            <img
              src={spotlightImgs[i % spotlightImgs.length]}
              alt={r.name}
              className="w-full h-[100px] object-cover"
              loading="lazy"
            />
            <div className="p-2.5">
              <div className="text-xs mb-0.5">{'⭐'.repeat(r.stars)}</div>
              <div className="font-cormorant text-sm font-semibold leading-tight truncate">{r.name}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                📍 {r.location.split(',').pop()?.trim()}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── TRENDING RANKING ── */}
      <div className="mx-5 mt-6 bg-[#141414] rounded-2xl overflow-hidden border border-white/[0.05]">
        <div className="px-4 py-4 border-b border-white/[0.05]">
          <div className="font-barlow text-lg font-black uppercase tracking-wide">Top Tables du Moment</div>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {featured.slice(0, 5).map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 px-4 py-3">
              <div className="font-bebas text-2xl text-[#E4002B] w-6 text-center">{i + 1}</div>
              <img
                src={trendImgs[i]}
                alt={r.name}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="font-cormorant text-sm font-semibold truncate">{r.name}</div>
                <div className="text-[10px] text-gray-500">
                  {r.cuisine.split(',')[0].trim()} · {r.location.split(',').pop()?.trim()}
                </div>
              </div>
              <div className="text-[10px] text-[#E4002B] font-medium flex-shrink-0">{trendTags[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="mx-3 my-6 rounded-2xl overflow-hidden relative h-[42vw] min-h-[160px]">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85"
          className="w-full h-full object-cover brightness-50"
          alt="Swipe CTA"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="font-barlow text-[clamp(22px,6vw,36px)] font-black uppercase leading-none mb-3">
            Swipe ta prochaine<br />table d'exception
          </div>
          <Link
            href="/decouverte"
            className="bg-[#E4002B] text-white font-barlow font-bold text-[12px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-sm no-underline"
          >
            Découvrir →
          </Link>
        </div>
      </div>

      <BottomNav active="pour-toi" dark />
    </div>
  )
}
