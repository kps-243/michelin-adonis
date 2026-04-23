import { useState, useRef, useCallback } from 'react'
import { Link } from '@inertiajs/react'
import type { Restaurant } from '../../app/services/restaurant_service'
import { MichelinStar, MichelinStars } from '~/components/MichelinStar'

interface Props {
  cards: Restaurant[]
}

export default function Swipe({ cards: initialCards }: Props) {
  const [cards] = useState<Restaurant[]>(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [outDirection, setOutDirection] = useState<'left' | 'right' | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [sheetVisible, setSheetVisible] = useState(false)

  const dragRef = useRef({ startX: 0, startY: 0, currentX: 0, moved: false })
  const isTouchSession = useRef(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const remaining = cards.slice(currentIndex, currentIndex + 3)
  const isEmpty = remaining.length === 0
  const topCard = remaining[0]

  const animateOut = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimatingOut) return
      setOutDirection(direction)
      setIsAnimatingOut(true)
      setTimeout(() => {
        setCurrentIndex((i) => i + 1)
        setIsAnimatingOut(false)
        setOutDirection(null)
        if (cardRef.current) cardRef.current.style.transform = ''
      }, 380)
    },
    [isAnimatingOut]
  )

  function snapBack() {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      cardRef.current.style.transform = 'none'
    }
  }

  // ── TOUCH handlers (mobile) ──
  function onTouchStart(e: React.TouchEvent) {
    if (isAnimatingOut || sheetVisible) return
    isTouchSession.current = true
    const t = e.touches[0]
    dragRef.current = { startX: t.clientX, startY: t.clientY, currentX: 0, moved: false }
    if (cardRef.current) cardRef.current.style.transition = 'none'
  }

  function onTouchMove(e: React.TouchEvent) {
    if (isAnimatingOut) return
    const t = e.touches[0]
    const dx = t.clientX - dragRef.current.startX
    const dy = t.clientY - dragRef.current.startY
    dragRef.current.currentX = dx
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) dragRef.current.moved = true
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${dx}px) translateY(${dy * 0.2}px) rotate(${dx * 0.06}deg)`
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    const { currentX, moved } = dragRef.current
    if (!moved) {
      e.preventDefault() // bloque le ghost click synthétique du navigateur mobile
      snapBack()
      openSheet(topCard)
    } else if (currentX > 80) {
      animateOut('right')
    } else if (currentX < -80) {
      animateOut('left')
    } else {
      snapBack()
    }
  }

  // ── MOUSE handlers (desktop only) ──
  const mouseActive = useRef(false)

  function onMouseDown(e: React.MouseEvent) {
    if (isTouchSession.current || isAnimatingOut || sheetVisible) return
    mouseActive.current = true
    dragRef.current = { startX: e.clientX, startY: e.clientY, currentX: 0, moved: false }
    if (cardRef.current) cardRef.current.style.transition = 'none'
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!mouseActive.current || isAnimatingOut) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    dragRef.current.currentX = dx
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) dragRef.current.moved = true
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${dx}px) translateY(${dy * 0.2}px) rotate(${dx * 0.06}deg)`
    }
  }

  function onMouseUp() {
    if (!mouseActive.current) return
    mouseActive.current = false
    const { currentX, moved } = dragRef.current
    if (!moved) {
      snapBack()
      openSheet(topCard)
    } else if (currentX > 80) {
      animateOut('right')
    } else if (currentX < -80) {
      animateOut('left')
    } else {
      snapBack()
    }
  }

  function onMouseLeave() {
    if (!mouseActive.current) return
    mouseActive.current = false
    snapBack()
  }

  function openSheet(r: Restaurant) {
    setSelectedRestaurant(r)
    setSheetVisible(true)
  }

  function closeSheet() {
    setSheetVisible(false)
    setTimeout(() => setSelectedRestaurant(null), 350)
  }

  function getOutTransform() {
    if (!isAnimatingOut) return undefined
    const W = window.innerWidth
    if (outDirection === 'right') return `translateX(${W * 1.5}px) rotate(25deg)`
    if (outDirection === 'left') return `translateX(${-W * 1.5}px) rotate(-25deg)`
    return undefined
  }

  function getOutTransform() {
    if (!isAnimatingOut) return undefined
    const W = window.innerWidth
    if (outDirection === 'right') return `translateX(${W * 1.5}px) rotate(25deg)`
    if (outDirection === 'left') return `translateX(${-W * 1.5}px) rotate(-25deg)`
    return undefined
  }

  function starsLabel(n: number) {
    if (n === 3) return '3 étoiles Michelin'
    if (n === 2) return '2 étoiles Michelin'
    if (n === 1) return '1 étoile Michelin'
    return null
  }

  return (
    <div className="h-dvh bg-white text-[#1A1A1A] flex flex-col overflow-hidden" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* HEADER */}
      <header className="shrink-0 px-5 pt-4 pb-3">
        <h1 className="text-[20px] font-semibold text-[#1A1A1A] leading-tight">
          Recommandation du jour
        </h1>
      </header>

      {/* SWIPE AREA */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-2 min-h-0">
        <div className="relative w-full" style={{ maxWidth: 400, height: 'min(480px, calc(100dvh - 210px))' }}>

          {/* Background cards */}
          {remaining[2] && (
            <div
              className="absolute inset-0 overflow-hidden bg-gray-200"
              style={{ borderRadius: 12, transform: 'scale(0.91) translateY(28px)', zIndex: 0 }}
            >
              <img src={remaining[2].image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          {remaining[1] && (
            <div
              className="absolute inset-0 overflow-hidden bg-gray-200"
              style={{ borderRadius: 12, transform: 'scale(0.955) translateY(14px)', zIndex: 1 }}
            >
              <img src={remaining[1].image} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Top card */}
          {topCard && (
            <div
              ref={cardRef}
              className="absolute inset-0 overflow-hidden cursor-pointer select-none"
              style={{
                zIndex: 3,
                borderRadius: 12,
                transition: isAnimatingOut ? 'transform 0.38s ease' : undefined,
                transform: isAnimatingOut ? getOutTransform() : undefined,
                willChange: 'transform',
                boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <img
                src={topCard.image}
                alt={topCard.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 35%, rgba(0,0,0,0.75) 100%)' }}
              />

              {/* Award badge */}
              {topCard.stars > 0 && (
                <div className="absolute top-3 right-3 bg-[#E4002B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  <MichelinStars count={topCard.stars} size={10} /> {topCard.stars} étoile{topCard.stars > 1 ? 's' : ''}
                </div>
              )}
              {topCard.isBib && !topCard.stars && (
                <div className="absolute top-3 right-3 bg-[#E4002B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  🍽 Bib Gourmand
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 pointer-events-none">
                <div className="text-white font-semibold leading-tight mb-1" style={{ fontSize: 20 }}>
                  {topCard.name}
                </div>
                <div className="text-white/80 mb-1" style={{ fontSize: 12 }}>
                  {topCard.address}
                </div>
                <div className="flex items-center gap-2 text-white/70" style={{ fontSize: 12 }}>
                  <span>{topCard.price}</span>
                  <span>·</span>
                  <span>{(topCard.cuisine || '').split(',')[0].trim()}</span>
                </div>

                {/* Avatars */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex" style={{ marginRight: 2 }}>
                    <div
                      className="w-7 h-7 rounded-full border-2 border-white bg-gray-400"
                      style={{ backgroundImage: 'url(https://i.pravatar.cc/48?img=1)', backgroundSize: 'cover', marginRight: -8 }}
                    />
                    <div
                      className="w-7 h-7 rounded-full border-2 border-white bg-gray-400"
                      style={{ backgroundImage: 'url(https://i.pravatar.cc/48?img=5)', backgroundSize: 'cover' }}
                    />
                  </div>
                  <div
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-light"
                    style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)', fontSize: 18, pointerEvents: 'all', cursor: 'pointer' }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gray-50"
              style={{ borderRadius: 12 }}
            >
              <div className="text-5xl mb-4">🍽</div>
              <div className="text-xl font-semibold mb-2">Vous avez tout vu !</div>
              <div className="text-sm text-gray-400 mb-6">
                Revenez pour de nouvelles sélections de nos inspecteurs.
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#E4002B] text-white px-7 py-3 rounded-full text-sm font-medium"
              >
                Recharger
              </button>
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav className="shrink-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-4">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-gray-400 no-underline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-0.5 text-[#E4002B] no-underline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </Link>
        <Link href="/restaurants" className="flex flex-col items-center gap-0.5 text-gray-400 no-underline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
            <path d="M7 2v20"/>
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
          </svg>
        </Link>
        <Link href="/sejours" className="flex flex-col items-center gap-0.5 text-gray-400 no-underline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 4v16"/>
            <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
            <path d="M2 17h20"/>
            <path d="M6 8v9"/>
          </svg>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-0.5 text-gray-400 no-underline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>
      </nav>

      {/* MODAL — Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{
          background: 'rgba(0,0,0,0.4)',
          opacity: sheetVisible ? 1 : 0,
          pointerEvents: sheetVisible ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        onClick={closeSheet}
      />

      {/* MODAL — Card (Figma: 362×532, radius 10px, padding 16px, shadow 0/4/4/0 25%) */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
      >
        <div
          className="bg-white w-full pointer-events-auto overflow-y-auto"
          style={{
            maxWidth: 362,
            maxHeight: 'min(532px, calc(100dvh - 80px))',
            borderRadius: 10,
            boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
            transform: sheetVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(16px)',
            opacity: sheetVisible ? 1 : 0,
            transition: 'transform 0.28s cubic-bezier(0.32,0.72,0,1), opacity 0.22s ease',
          }}
        >
          {selectedRestaurant && (
            <>
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-8 h-1 bg-gray-200 rounded-full" />
              </div>

              {/* Hero image */}
              <div className="relative mx-4 mt-3 overflow-hidden" style={{ borderRadius: 8, height: 190 }}>
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                />
                {selectedRestaurant.stars > 0 && (
                  <div
                    className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ background: '#E4002B' }}
                  >
                    <MichelinStar size={13} />
                    <span>{starsLabel(selectedRestaurant.stars)}</span>
                  </div>
                )}
                {selectedRestaurant.isBib && !selectedRestaurant.stars && (
                  <div
                    className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1.5 rounded-full"
                    style={{ background: '#E4002B' }}
                  >
                    🍽 Bib Gourmand
                  </div>
                )}
              </div>

              {/* Content — 16px padding comme Figma */}
              <div style={{ padding: 16 }}>
                <h2
                  className="text-[#1A1A1A] leading-snug mb-1"
                  style={{ fontSize: 22, fontWeight: 600 }}
                >
                  {selectedRestaurant.name}
                </h2>

                <p className="text-gray-500 mb-1" style={{ fontSize: 13 }}>
                  {selectedRestaurant.address}
                </p>

                <div className="flex items-center gap-2 mb-4" style={{ fontSize: 13 }}>
                  <span className="text-[#1A1A1A]">{selectedRestaurant.price}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">{(selectedRestaurant.cuisine || '').split(',')[0].trim()}</span>
                  {selectedRestaurant.greenStar && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span className="text-green-600" style={{ fontSize: 12 }}>🌿 Green Star</span>
                    </>
                  )}
                </div>

                {selectedRestaurant.description && (
                  <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: 14 }}>
                    {selectedRestaurant.description}
                  </p>
                )}

                {/* Téléphone + site web */}
                <div className="flex items-center gap-5 mb-4">
                  {selectedRestaurant.phone && (
                    <a
                      href={`tel:${selectedRestaurant.phone}`}
                      className="flex items-center gap-2 no-underline"
                      style={{ fontSize: 13, color: '#555' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E4002B" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span>{selectedRestaurant.phone}</span>
                    </a>
                  )}
                  {selectedRestaurant.websiteUrl && (
                    <a
                      href={selectedRestaurant.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 no-underline"
                      style={{ fontSize: 13, color: '#E4002B' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      <span>Site web</span>
                    </a>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={selectedRestaurant.michelinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center text-white font-semibold no-underline"
                  style={{ background: '#E4002B', borderRadius: 8, padding: '13px 0', fontSize: 14 }}
                >
                  Réserver sur Michelin
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
