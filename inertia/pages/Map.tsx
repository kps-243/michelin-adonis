import { useEffect, useRef, useState } from 'react'
import { Head } from '@inertiajs/react'
import PinRestau from '../ressources/images/logos/pin-restau.svg'

interface RestaurantPin {
  id: number
  name: string
  lat: number
  lng: number
}

interface Props {
  restaurants: RestaurantPin[]
}

export default function MapPage({ restaurants }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return

      const defaultCenter = { lat: 48.8566, lng: 2.3522 }
      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: false,
      })

      restaurants.forEach((restaurant) => {
        new window.google.maps.Marker({
          position: { lat: Number(restaurant.lat), lng: Number(restaurant.lng) },
          map,
          title: restaurant.name,
          icon: {
            url: PinRestau,
            scaledSize: new window.google.maps.Size(28, 36),
          },
        })
      })

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            map.setCenter(userPosition)

            new window.google.maps.Marker({
              position: userPosition,
              map,
              title: 'Votre position',
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
              },
            })
          },
          () => {
            setError('Impossible de récupérer votre position.')
          }
        )
      } else {
        setError("La géolocalisation n'est pas supportée par votre navigateur.")
      }
    }

    if (window.google?.maps) {
      initMap()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcMgkTPJA7fgLC-HtPKl1zO-yKq-oEwUY'
    script.async = true
    script.defer = true
    script.onload = initMap
    script.onerror = () => setError("Impossible de charger Google Maps.")

    document.head.appendChild(script)

    return () => {
      script.onload = null
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }
  }, [restaurants])

  return (
    <>
      <Head title="Carte" />
      <div className="relative h-[calc(100dvh-56px-68px+22px)] overflow-hidden">
        {error && (
          <div className="absolute top-0 z-10 w-full bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </>
  )
}

declare global {
  interface Window {
    google: any
  }
}
