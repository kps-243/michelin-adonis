import { Link } from '@inertiajs/react'
import MapLogo from '../ressources/images/logos/map-logo.svg'
import MapOutlineLogo from '../ressources/images/logos/map-outline-logo.svg'

interface Props {
  isMapView: boolean
}

export default function MapSwitch({ isMapView }: Props) {
  const targetHref = isMapView ? '/restaurants' : '/map'
  const icon = isMapView ? MapLogo : MapOutlineLogo
  const ariaLabel = isMapView ? 'Revenir a la liste des restaurants' : 'Afficher la carte'

  return (
    <Link
      href={targetHref}
      aria-label={ariaLabel}
      className="fixed bottom-21.5 right-4 z-40 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-transparent shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-transform hover:scale-[1.03] active:scale-95"
    >
      <img src={icon} alt="" className="h-full w-full object-cover" />
    </Link>
  )
}
