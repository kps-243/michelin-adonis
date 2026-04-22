import { useState, useRef, useCallback } from 'react'
import { Link } from '@inertiajs/react'
import BottomNav from '../components/BottomNav'
import type { Restaurant } from '../../app/services/restaurant_service'

interface Props {
  cards: Restaurant[]
}

interface HistoryEntry {
  direction: 'left' | 'right' | 'up'
  restaurant: Restaurant
  index: number
}

interface Toast {
  msg: string
  type: 'like' | 'nope' | 'super'
  visible: boolean
}

export default function Swipe({ cards: initialCards }: Props) {
  const [cards] = useState<Restaurant[]>(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Restaurant[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [toast, setToast] = useState<Toast>({ msg: '', type: 'like', visible: false })
  const [showLikedPill, setShowLikedPill] = useState(false)
  const [stampState, setStampState] = useState<'none' | 'like' | 'nope' | 'super'>('none')
  const [stampOpacity, setStampOpacity] = useState(0)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [outDirection, setOutDirection] = useState<'left' | 'right' | 'up' | null>(null)

  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, currentX: 0, currentY: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const remaining = cards.slice(currentIndex, currentIndex + 3)
  const isEmpty = remaining.length === 0

  function starsLabel(n: number) {
    if (n === 3) return '⭐⭐⭐ 3 Étoiles'
    if (n === 2) return '⭐⭐ 2 Étoiles'
    if (n === 1) return '⭐ 1 Étoile'
    return null
  }

  function showToast(msg: string, type: Toast['type']) {
    clearTimeout(toastTimer.current)
    setToast({ msg, type, visible: true })
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000)
  }

  const animateOut = useCallback(
    (direction: 'left' | 'right' | 'up') => {
      if (isAnimatingOut) return
      setOutDirection(direction)
      setIsAnimatingOut(true)
      setStampOpacity(0)

      const r = cards[currentIndex]
      setHistory((h) => [...h, { direction, restaurant: r, index: currentIndex }])

      if (direction === 'right') {
        setLiked((l) => [...l, r])
        showToast(`❤ Sauvegardé : ${r.name}`, 'like')
        setShowLikedPill(true)
        setTimeout(() => setShowLikedPill(false), 2500)
      } else if (direction === 'up') {
        setLiked((l) => [...l, { ...r, award: r.award + ' [SUPER]' }])
        showToast(`⭐ Super Like : ${r.name}`, 'super')
        setShowLikedPill(true)
        setTimeout(() => setShowLikedPill(false), 2500)
      } else {
        showToast('✕ Passé', 'nope')
      }

      setTimeout(() => {
        setCurrentIndex((i) => i + 1)
        setIsAnimatingOut(false)
        setOutDirection(null)
        setStampState('none')
        if (cardRef.current) {
          cardRef.current.style.transform = ''
        }
      }, 380)
    },
    [cards, currentIndex, isAnimatingOut]
  )

  // ─── TOUCH/MOUSE HANDLERS ───
  function onStart(e: React.TouchEvent | React.MouseEvent) {
    if (isAnimatingOut) return
    const point = 'touches' in e ? e.touches[0] : e
    dragRef.current = {
      isDragging: true,
      startX: point.clientX,
      startY: point.clientY,
      currentX: 0,
      currentY: 0,
    }
    if (cardRef.current) cardRef.current.style.transition = 'none'
  }

  function onMove(e: React.TouchEvent | React.MouseEvent) {
    if (!dragRef.current.isDragging || isAnimatingOut) return
    if ('cancelable' in e && e.cancelable) e.preventDefault()
    const point = 'touches' in e ? e.touches[0] : e
    const dx = point.clientX - dragRef.current.startX
    const dy = point.clientY - dragRef.current.startY
    dragRef.current.currentX = dx
    dragRef.current.currentY = dy

    const rotate = dx * 0.08
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${dx}px) translateY(${dy * 0.3}px) rotate(${rotate}deg)`
    }

    if (dx > 30) {
      setStampState('like')
      setStampOpacity(Math.min(dx / 80, 1))
    } else if (dx < -30) {
      setStampState('nope')
      setStampOpacity(Math.min(-dx / 80, 1))
    } else {
      setStampState('none')
      setStampOpacity(0)
    }
  }

  function onEnd() {
    if (!dragRef.current.isDragging) return
    dragRef.current.isDragging = false
    const { currentX, currentY } = dragRef.current

    if (currentX > 80) {
      animateOut('right')
    } else if (currentX < -80) {
      animateOut('left')
    } else if (currentY < -120) {
      animateOut('up')
    } else {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        cardRef.current.style.transform = 'none'
      }
      setStampState('none')
      setStampOpacity(0)
    }
  }

  function rewind() {
    if (history.length === 0) return
    const last = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    if (last.direction === 'right' || last.direction === 'up') {
      setLiked((l) => l.filter((r) => r.id !== last.restaurant.id))
    }
    setCurrentIndex(last.index)
    showToast('↩ Annulé', 'like')
  }

  function triggerSwipe(dir: 'left' | 'right' | 'up') {
    if (isEmpty || isAnimatingOut) return
    if (dir === 'right') setStampState('like')
    else if (dir === 'left') setStampState('nope')
    else setStampState('super')
    setStampOpacity(1)
    setTimeout(() => animateOut(dir), 100)
  }

  // ─── OUT ANIMATION TRANSFORM ───
  function getOutTransform() {
    if (!isAnimatingOut) return undefined
    const W = window.innerWidth
    const H = window.innerHeight
    if (outDirection === 'right') return `translateX(${W * 1.5}px) rotate(30deg)`
    if (outDirection === 'left') return `translateX(${-W * 1.5}px) rotate(-30deg)`
    if (outDirection === 'up') return `translateY(${-H * 1.2}px)`
    return undefined
  }

  const topCard = remaining[0]

  return (
    <div className="h-[100dvh] bg-[#0D0D0D] text-[#F5F0E8] font-dm flex flex-col overflow-hidden">
      {/* ── HEADER ── */}
      <header className="h-[60px] flex items-center justify-between px-5 border-b border-white/[0.06] z-10 flex-shrink-0">
        <Link
          href="/"
          className="w-[38px] h-[38px] bg-white/[0.06] rounded-full flex items-center justify-center text-lg text-[#F5F0E8] no-underline"
        >
          ←
        </Link>
        <div className="text-center">
          <div className="font-bebas text-[18px] tracking-[0.15em]">DÉCOUVERTE</div>
          <div className="text-[10px] text-gray-500 tracking-widest">Swipez pour explorer</div>
        </div>
        <div className="bg-white/[0.08] rounded-full px-3.5 py-1.5 text-xs text-[#C8A96E] font-medium">
          ❤ {liked.length}
        </div>
      </header>

      {/* ── SWIPE AREA ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-2 relative min-h-0">
        {/* Card Stack */}
        <div className="relative w-full max-w-[360px] flex-1 min-h-0">

          {/* Background cards (stack effect) */}
          {remaining[2] && (
            <div className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#1A1A1A] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ transform: 'scale(0.9) translateY(32px)', zIndex: 0 }}>
              <img src={remaining[2].image} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
          )}
          {remaining[1] && (
            <div className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#1A1A1A] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ transform: 'scale(0.95) translateY(16px)', zIndex: 1 }}>
              <img src={remaining[1].image} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
          )}

          {/* Top card */}
          {topCard && (
            <div
              ref={cardRef}
              className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#1A1A1A] cursor-grab active:cursor-grabbing shadow-[0_20px_60px_rgba(0,0,0,0.5)] select-none"
              style={{
                zIndex: 3,
                transition: isAnimatingOut ? 'transform 0.4s ease' : undefined,
                transform: isAnimatingOut ? getOutTransform() : undefined,
                willChange: 'transform',
              }}
              onTouchStart={onStart}
              onTouchMove={onMove as any}
              onTouchEnd={onEnd}
              onMouseDown={onStart}
              onMouseMove={onMove as any}
              onMouseUp={onEnd}
              onMouseLeave={onEnd}
            >
              <img
                src={topCard.image}
                alt={topCard.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95 pointer-events-none" />

              {/* LIKE stamp */}
              <div
                className="absolute top-8 left-6 font-bebas text-[42px] tracking-widest border-4 border-green-500 text-green-500 px-4 py-1 rounded-lg pointer-events-none -rotate-12"
                style={{ opacity: stampState === 'like' ? stampOpacity : 0, transition: 'opacity 0.1s', zIndex: 10 }}
              >
                OUVRE
              </div>

              {/* NOPE stamp */}
              <div
                className="absolute top-8 right-6 font-bebas text-[42px] tracking-widest border-4 border-[#E4002B] text-[#E4002B] px-4 py-1 rounded-lg pointer-events-none rotate-12"
                style={{ opacity: stampState === 'nope' ? stampOpacity : 0, transition: 'opacity 0.1s', zIndex: 10 }}
              >
                NOPE
              </div>

              {/* SUPER stamp */}
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 font-bebas text-[42px] tracking-widest border-4 border-amber-500 text-amber-500 px-4 py-1 rounded-lg pointer-events-none -rotate-3"
                style={{ opacity: stampState === 'super' ? stampOpacity : 0, transition: 'opacity 0.1s', zIndex: 10 }}
              >
                SUPER ⭐
              </div>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-[5]">
                <div className="flex gap-2 mb-2.5 flex-wrap">
                  {topCard.stars > 0 && (
                    <div className="bg-[rgba(228,0,43,0.85)] backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-full tracking-wide">
                      {starsLabel(topCard.stars)}
                    </div>
                  )}
                  {topCard.isBib && !topCard.stars && (
                    <div className="bg-[rgba(200,169,110,0.9)] text-[#1A1A1A] text-[11px] font-semibold px-3 py-1.5 rounded-full">
                      🍽 Bib Gourmand
                    </div>
                  )}
                  {topCard.greenStar && (
                    <div className="bg-[rgba(34,197,94,0.85)] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                      🌿 Green Star
                    </div>
                  )}
                </div>

                <div className="font-cormorant text-[clamp(24px,6vw,32px)] font-semibold leading-tight mb-2 text-white">
                  {topCard.name}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-white/80">
                    {(topCard.cuisine || '').split(',')[0].trim()}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="font-cormorant text-sm text-[#C8A96E] font-semibold">{topCard.price}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  📍 {topCard.location}
                </div>

                {topCard.description && (
                  <p className="mt-2.5 text-xs text-white/55 leading-relaxed line-clamp-2">
                    {topCard.description.substring(0, 120)}...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
              <div className="text-6xl mb-4">🍽</div>
              <div className="font-cormorant text-3xl mb-2">Vous avez tout vu !</div>
              <div className="text-sm text-gray-500 mb-6">
                Revenez pour de nouvelles sélections de nos inspecteurs.
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#E4002B] text-white border-none px-7 py-3 rounded-full text-sm font-medium cursor-pointer"
              >
                Recharger ✨
              </button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {!isEmpty && (
          <div className="flex items-center justify-center gap-5 pt-4 pb-2 flex-shrink-0">
            <button
              onClick={rewind}
              className="w-[42px] h-[42px] rounded-full bg-[#1E1E1E] border-[1.5px] border-white/10 text-gray-500 text-base flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              ↩
            </button>
            <button
              onClick={() => triggerSwipe('left')}
              className="w-[58px] h-[58px] rounded-full bg-[#1E1E1E] border-2 border-[rgba(228,0,43,0.3)] text-[#E4002B] text-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(228,0,43,0.15)] transition-all hover:scale-110 active:scale-95"
            >
              ✕
            </button>
            <button
              onClick={() => triggerSwipe('up')}
              className="w-[48px] h-[48px] rounded-full bg-[#1E1E1E] border-2 border-[rgba(245,158,11,0.3)] text-amber-500 text-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              ⭐
            </button>
            <button
              onClick={() => triggerSwipe('right')}
              className="w-[58px] h-[58px] rounded-full bg-[#E4002B] text-white text-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(228,0,43,0.4)] transition-all hover:scale-110 active:scale-95"
            >
              ♥
            </button>
          </div>
        )}
      </div>

      {/* ── TOAST ── */}
      <div
        className={`fixed top-[70px] left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white pointer-events-none z-[1000] whitespace-nowrap transition-all duration-300 ${
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        } ${
          toast.type === 'nope'
            ? 'bg-[rgba(228,0,43,0.9)]'
            : toast.type === 'super'
            ? 'bg-[rgba(245,158,11,0.95)]'
            : 'bg-[rgba(34,197,94,0.9)]'
        }`}
      >
        {toast.msg}
      </div>

      {/* ── LIKED PILL ── */}
      <div
        className={`fixed bottom-[76px] right-4 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold pointer-events-none z-50 transition-all duration-300 ${
          showLikedPill ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
        }`}
      >
        ❤ {liked.length} table{liked.length > 1 ? 's' : ''} sauvegardée{liked.length > 1 ? 's' : ''}
      </div>

      <BottomNav active="swipe" dark />
    </div>
  )
}
