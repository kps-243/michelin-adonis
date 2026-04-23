import { Link, usePage } from '@inertiajs/react'

import PlatIcon from '../ressources/images/icons/plat-icon.svg'
import PlatOutlineIcon from '../ressources/images/icons/plat-outline-icon.svg'
import HeartIcon from '../ressources/images/icons/heart-icon.svg'
import HeartOutlineIcon from '../ressources/images/icons/heart-outline-icon.svg'
import BedIcon from '../ressources/images/icons/bed-icon.svg'
import BedOutlineIcon from '../ressources/images/icons/bed-outline-icon.svg'
import ProfileIcon from '../ressources/images/icons/profile-icon.svg'
import ProfileOutlineIcon from '../ressources/images/icons/profile-outline-icon.svg'
import HomeIcon from '../ressources/images/icons/home-icon.svg'
import HomeOutlineIcon from '../ressources/images/icons/home-outline-icon.svg'

export default function NavBar() {
  const { url } = usePage()

  const navItems = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: HomeIcon,
      outlineIcon: HomeOutlineIcon,
    },
    {
      id: 'pour-toi',
      label: 'PourToi',
      href: '/decouverte',
      icon: HeartIcon,
      outlineIcon: HeartOutlineIcon,
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      href: '/restaurants',
      icon: PlatIcon,
      outlineIcon: PlatOutlineIcon,
    },
    {
      id: 'sejours',
      label: 'Séjours',
      href: '/sejours',
      icon: BedIcon,
      outlineIcon: BedOutlineIcon,
    },
    {
      id: 'profile',
      label: 'Profil',
      href: '/profile',
      icon: ProfileIcon,
      outlineIcon: ProfileOutlineIcon,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-17 bg-(--navbar-bg) flex items-center justify-around px-4 z-50">
      {navItems.map((item) => {
        const isActive = url === item.href || (item.href !== '/' && url.startsWith(item.href))
        return (
          <Link
            key={item.id}
            href={item.href}
          >
            <img
              src={isActive ? item.icon : item.outlineIcon}
              alt={item.label}
              className="w-10 h-7 object-contain"
            />
          </Link>
        )
      })}
    </nav>
  )
}
