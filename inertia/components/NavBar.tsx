import { Link } from '@inertiajs/react'

import PlatIcon from '../ressources/images/icons/plat-icon.svg'
import PlatOutlineIcon from '../ressources/images/icons/plat-outline-icon.svg'
import HeartIcon from '../ressources/images/icons/heart-icon.svg'
import HeartOutlineIcon from '../ressources/images/icons/heart-outline-icon.svg'
import BedIcon from '../ressources/images/icons/bed-icon.svg'
import BedOutlineIcon from '../ressources/images/icons/bed-outline-icon.svg'
import ProfileIcon from '../ressources/images/icons/profile-icon.svg'
import ProfileOutlineIcon from '../ressources/images/icons/profile-outline-icon.svg'

interface NavBarProps {
  active: 'home' | 'restaurants' | 'sejours' | 'pour-toi' | 'profile'
}

export default function NavBar({ active }: NavBarProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: PlatIcon,
      outlineIcon: PlatOutlineIcon,
    },
    {
      id: 'pour-toi',
      label: 'PourToi',
      href: '/pour-toi',
      icon: HeartIcon,
      outlineIcon: HeartOutlineIcon,
    },
    {
      id: 'sejours',
      label: 'Séjours',
      href: '/sejours',
      icon: BedIcon,
      outlineIcon: BedOutlineIcon,
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      href: '/restaurants',
      icon: HeartIcon,
      outlineIcon: HeartOutlineIcon,
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
        const isActive = active === item.id
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
