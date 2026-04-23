import type { Restaurant } from '../../app/services/restaurant_service'
import SecondaryTitle from '~/components/SecondaryTitle'
import { router } from '@inertiajs/react'
import SearchBar from '../components/SearchBar'

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

const ARTICLES = [
  {
    id: 1,
    title: 'Tour du monde des restaurants les plus étoilés',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
    full: true,
  },
  {
    id: 2,
    title: 'La liste complète des restaurants étoilés au monde',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    full: true,
  },
  {
    id: 3,
    title: "Pourquoi l'Allemagne voue un culte aux restaurants gastronomiques",
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    full: false,
  },
  {
    id: 4,
    title: 'Tout sur la pomme : recettes et adresses incontournables',
    img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
    full: false,
  },
  {
    id: 5,
    title: 'Le végétal, star des menus de printemps',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',
    full: true,
  },
  {
    id: 6,
    title: '8 plages cachées en France et les tables qui les entourent',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    full: false,
  },
  {
    id: 7,
    title: 'Les adresses pour redécouvrir les saveurs du Maghreb',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    full: false,
  },
]

// Desktop: index 0 → hero 2-col, index 1 → tall side, rest → equal
function articleDesktopCls(i: number) {
  if (i === 0) return 'lg:col-span-2 lg:h-[440px]'
  if (i === 1) return 'lg:col-span-1 lg:h-[440px]'
  return 'lg:col-span-1 lg:h-64'
}

export default function Home({ featured }: Props) {
  return (
    <div className="min-h-screen pb-24 container mx-auto px-4 lg:px-0">
      {/* ── SEARCH ── */}
      <div className="mt-4">
        <SearchBar
          placeholder="Destination ou nom de l'hôtel ..."
          onSearch={(q) => console.log('Recherche:', q)}
        />
      </div>
      {/* ── A LA UNE ── */}
      <section className="pt-6 pb-4 lg:px-8 lg:pt-8 lg:pb-6 lg:max-w-6xl lg:mx-auto">
        <SecondaryTitle className="mb-4">A la Une</SecondaryTitle>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {ARTICLES.map((article, i) => (
            <div
              key={article.id}
              className={[
                'group relative overflow-hidden rounded-2xl cursor-pointer',
                article.full ? 'col-span-2 h-52' : 'col-span-1 h-44',
                articleDesktopCls(i),
              ].join(' ')}
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
              <p className={[
                'absolute bottom-0 left-0 right-0 px-3 pb-3 text-white font-medium leading-snug line-clamp-2',
                i === 0 ? 'text-[16px] lg:text-[18px] lg:pb-5 lg:px-5' : 'text-[13px]',
              ].join(' ')}>
                {article.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOS ESSENTIELS ── */}
      <section className="pt-4 pb-8 lg:px-8 lg:pt-8 lg:pb-12 lg:max-w-6xl lg:mx-auto">
        <SecondaryTitle className="mb-4">Nos essentiels</SecondaryTitle>

        <div className="flex flex-col gap-3 lg:gap-4">

          {/* 1 – Hero pleine largeur */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-56 lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80"
              alt="À propos du Guide MICHELIN"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
            <p className="absolute bottom-0 left-0 px-3 pb-3 text-white font-medium text-[15px] lg:text-[18px] lg:pb-5 lg:px-5">
              À propos du Guide MICHELIN
            </p>
          </div>

          {/* 2 – Deux cartes égales */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {[
              {
                title: 'Inspiration : guides best-of',
                img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
              },
              {
                title: 'Nos magazines',
                img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
              },
            ].map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-2xl cursor-pointer h-44 lg:h-60">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 px-3 pb-3 text-white font-medium text-[13px] leading-snug lg:text-[15px] lg:pb-4 lg:px-4">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* 3 – Pleine largeur */}
          <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-44 lg:h-64">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
              alt="Nos nouvelles sélections du guide"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
            <p className="absolute bottom-0 left-0 px-3 pb-3 text-white font-medium text-[15px] lg:text-[18px] lg:pb-5 lg:px-5">
              Nos nouvelles sélections du guide
            </p>
          </div>

          {/* 4 – Coulisses + Partenaires */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">

            {/* Coulisses */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-44 lg:h-60">
              <img
                src="https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&q=80"
                alt="Les coulisses de notre histoire"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 px-3 pb-3 text-white font-medium text-[13px] leading-snug lg:text-[15px] lg:pb-4 lg:px-4">
                Les coulisses de notre histoire
              </p>
            </div>

            {/* Partenaires – grille 2×2 de logos */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-44 lg:h-60 cursor-pointer">
              <div className="grid grid-cols-2 gap-1.5 h-full p-1.5">
                <div className="bg-white rounded-xl flex items-center justify-center px-2">
                  <span className="text-[9px] font-bold tracking-widest text-[#1B2B6B] text-center">BLANCPAIN</span>
                </div>
                <div className="bg-white rounded-xl flex flex-col items-center justify-center gap-0.5 px-2">
                  <span className="text-[11px] font-bold tracking-wider text-gray-900">LAFONT</span>
                  <span className="text-[6px] tracking-widest text-gray-400 uppercase">Manufacture</span>
                  <div className="flex gap-0.5 mt-0.5">
                    <div className="w-4 h-[2px] bg-red-primary rounded-full" />
                    <div className="w-4 h-[2px] bg-red-primary rounded-full" />
                  </div>
                </div>
                <div className="bg-[#8B1A2E] rounded-xl flex items-center justify-center px-2">
                  <span className="text-[9px] font-semibold text-white text-center leading-tight">les halles</span>
                </div>
                <div className="bg-[#00A87E] rounded-xl flex items-center justify-center px-2">
                  <span className="text-[10px] font-bold text-white text-center">TheFork</span>
                </div>
              </div>
              <p className="absolute bottom-2.5 right-3 text-[10px] font-semibold text-gray-500 lg:text-[12px]">
                Nos partenaires
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
