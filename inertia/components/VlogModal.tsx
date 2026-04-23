import { useEffect } from 'react'

export interface Vlog {
  id: number
  title: string
  thumbnail: string
  badge: string
  creatorName: string
  creatorAvatar?: string
}

interface Props {
  vlog: Vlog | null
  onClose: () => void
}

export default function VlogModal({ vlog, onClose }: Props) {
  useEffect(() => {
    if (!vlog) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [vlog, onClose])

  if (!vlog) return null

  const [badgePart1, ...rest] = vlog.badge.split(' ')
  const badgePart2 = rest.join(' ')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="relative w-[88vw] max-w-xs h-[78vh] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background image */}
        <img
          src={vlog.thumbnail}
          alt={vlog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/30" />

        {/* Creator avatar — top center, overflows slightly */}
        {vlog.creatorAvatar && (
          <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img src={vlog.creatorAvatar} alt={vlog.creatorName} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Play button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
          <svg width="16" height="16" fill="#111" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>

        {/* Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="border-2 border-green-400 px-4 py-1.5 rounded-md bg-black/40 backdrop-blur-sm">
            <span className="text-green-400 text-[11px] font-semibold tracking-widest uppercase">
              {badgePart1}{' '}
            </span>
            <span className="text-green-400 text-[11px] font-black tracking-widest uppercase italic">
              {badgePart2}
            </span>
          </div>
        </div>

        {/* Creator name */}
        <div className="absolute bottom-6 left-5 right-5">
          <p className="font-barlow text-[34px] font-black text-white uppercase leading-none tracking-wide">
            {vlog.creatorName}
          </p>
        </div>
      </div>
    </div>
  )
}
